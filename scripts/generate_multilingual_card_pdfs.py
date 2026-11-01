from pathlib import Path
import json, csv, math, io, shutil
from collections import Counter
from xml.sax.saxutils import escape
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader

SRC = Path(r'C:\Users\Marco\Desktop\LIBRI\Books\Einstein.Questa.Te.La.Sei.Persa\WORK\CARTE_OTTO_PREMIUM\SORGENTI')
FONTS = Path('C:/Windows/Fonts')
for name, file in [('Sans', 'calibri.ttf'), ('SansB', 'calibrib.ttf'), ('Serif', 'georgia.ttf'), ('SerifB', 'georgiab.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))

INK = HexColor('#182E38')
MUTED = HexColor('#52646B')
GOLD = HexColor('#A88143')
LINE = HexColor('#C6C4BA')
PAPER = HexColor('#FCFAF5')
PALE = HexColor('#F3F0E8')

COLOR_MAP = {
    # EN
    'ANIMALS': '#316E71', 'PLANTS': '#4C7052', 'EXPERIMENTS': '#366683',
    'DINOSAURS': '#905A3C', 'INVENTIONS': '#77623D', 'BODY': '#795D76', 'SPACE': '#4B587C',
    # FR
    'ANIMAUX': '#316E71', 'PLANTES': '#4C7052', 'EXPÉRIENCES': '#366683', 'EXPERIENCES': '#366683',
    'DINOSAURES': '#905A3C', 'INVENTIONS': '#77623D', 'CORPS': '#795D76', 'ESPACE': '#4B587C',
    # ES
    'ANIMALES': '#316E71', 'PLANTAS': '#4C7052', 'EXPERIMENTOS': '#366683',
    'DINOSAURIOS': '#905A3C', 'INVENTOS': '#77623D', 'CUERPO': '#795D76', 'ESPACIO': '#4B587C',
    # IT
    'ANIMALI': '#316E71', 'PIANTE': '#4C7052', 'ESPERIMENTI': '#366683',
    'DINOSAURI': '#905A3C', 'INVENZIONI': '#77623D', 'CORPO': '#795D76', 'SPAZIO': '#4B587C'
}

W, H = A4
CW, CH = 82 * mm, 118 * mm
GX, GY = 10 * mm, 12 * mm
MX = (W - 2 * CW - GX) / 2
MY = (H - 2 * CH - GY) / 2
P = 6 * mm
IMAGE_CACHE = {}

def text(c, s, x, y, size=9, font='Sans', color=INK, align='left'):
    c.setFillColor(color)
    c.setFont(font, size)
    {'left': c.drawString, 'right': c.drawRightString, 'center': c.drawCentredString}[align](x, y, s)

def rule(c, x, y, w, color=LINE, weight=0.45):
    c.setStrokeColor(color)
    c.setLineWidth(weight)
    c.line(x, y, x + w, y)

def para(c, s, x, top, w, size=12, font='Sans', leading=None, color=INK, maxh=None, tag=''):
    style = ParagraphStyle('p', fontName=font, fontSize=size, leading=leading or size * 1.3, textColor=color, spaceAfter=0)
    p = Paragraph(escape(s), style)
    aw, ah = p.wrap(w, 1000)
    if maxh is not None and ah > maxh + 0.01:
        for scale_down in [0.96, 0.92, 0.88, 0.84, 0.80, 0.76]:
            style.fontSize = size * scale_down
            style.leading = (leading or size * 1.3) * scale_down
            p = Paragraph(escape(s), style)
            aw, ah = p.wrap(w, 1000)
            if ah <= maxh:
                break
        if ah > maxh + 0.01:
            raise ValueError(f'Text overflow {tag}: {ah:.2f} > {maxh:.2f}')
    p.drawOn(c, x, top - ah)
    return ah

def cutmarks(c, x, y):
    c.setStrokeColor(HexColor('#8A9394'))
    c.setLineWidth(0.3)
    gap, length = 1.6 * mm, 2.3 * mm
    for xx, dx in [(x, -1), (x + CW, 1)]:
        for yy, dy in [(y, -1), (y + CH, 1)]:
            c.line(xx + dx * gap, yy, xx + dx * (gap + length), yy)
            c.line(xx, yy + dy * gap, xx, yy + dy * (gap + length))

def base(c, r, x, y):
    c.setFillColor(PAPER)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.55)
    c.rect(x, y, CW, CH, stroke=1, fill=1)
    accent = HexColor(COLOR_MAP.get(r['theme'], '#316E71'))
    text(c, r['theme'], x + P, y + CH - 9.6 * mm, 8.5, 'SansB', accent)
    text(c, f"{r['id']:02}", x + CW - P, y + CH - 10.5 * mm, 18, 'Serif', INK, 'right')
    rule(c, x + P, y + CH - 14 * mm, CW - 2 * P, GOLD, 0.65)
    cutmarks(c, x, y)
    return accent

def fitimage(c, r, x, y, w, h):
    p = SRC / r['image']
    if str(p) not in IMAGE_CACHE:
        with Image.open(p) as im:
            im.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            if im.mode == 'RGBA':
                bg = Image.new('RGB', im.size, 'white')
                bg.paste(im, mask=im.getchannel('A'))
                im = bg
            else:
                im = im.convert('RGB')
            stream = io.BytesIO()
            im.save(stream, 'JPEG', quality=95, subsampling=0)
            IMAGE_CACHE[str(p)] = (ImageReader(stream), im.size)
    reader, (iw, ih) = IMAGE_CACHE[str(p)]
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.setFillColor(white)
    c.rect(x, y, w, h, fill=1, stroke=0)
    c.drawImage(reader, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh)

STRINGS = {
    'fr': {
        'doc_title_ds': 'Otto - 36 Cartes Premium - Recto-Verso',
        'doc_title_so': 'Otto - 36 Cartes Premium - Recto seul',
        'book_title': 'Einstein, tu as manqué ça !',
        'cards_title': 'LES CARTES DE LA CURIOSITÉ',
        'recto': 'RECTO',
        'verso': 'VERSO',
        'footer_sheet': 'A4 · 100% / Taille réelle · Couper le long des repères de coupe',
        'sheet_prefix': 'PLANCHE',
        'question_label': 'LA QUESTION',
        'sc55_credit': 'Collaboration EHT / ESO · CC BY 4.0',
        'choices_label': 'VRAI / FAUX / ON NE SAIT PAS ENCORE',
        'flip_hint': 'Choisis, puis retourne la carte.',
        'answer_label': 'LA RÉPONSE',
        'answer_true': 'Vrai.',
        'answer_false': 'Faux.',
        'answer_unknown_1': 'On ne sait',
        'answer_unknown_2': 'pas encore.',
        'evidence_label': 'EXPLORE LES PREUVES',
        'evidence_hint': 'Retrouve ce code dans la bibliothèque des sources scientifiques.',
        'series_sub': 'OTTO / Les Cartes de la Curiosité',
        'guide_title': 'Otto - Guide, Impression & Solutions - Édition Premium',
        'guide_sub_top': 'OTTO / LES CARTES DE LA CURIOSITÉ',
        'companion_text': 'Un bonus du livre Einstein, tu as manqué ça !',
        'guide_p1_label': 'LE JEU',
        'guide_p1_title': 'Vrai. Faux.',
        'guide_p1_sub': 'Ou on ne sait pas encore ? 36 questions pour découvrir ce que la science sait vraiment.',
        'guide_p1_steps': [
            ('01', 'Préparer', 'Imprime et découpe les 36 cartes. Mélange le paquet et garde les réponses face cachée.'),
            ('02', 'Lire', 'Le joueur qui tire lit la question à voix haute sans montrer le verso. Les autres joueurs choisissent : vrai, faux ou on ne sait pas encore.'),
            ('03', 'Révéler', 'Retourne la carte et lis l’explication scientifique. Marque un point pour chaque bonne réponse : reconnaître ce que la science ignore encore compte aussi !'),
            ('04', 'Jouer ensemble', 'Après 10 cartes, le joueur avec le plus de points gagne la partie. En mode coopératif, travaillez ensemble pour obtenir au moins 8 bonnes réponses sur 10.')
        ],
        'guide_p1_footer': '12 VRAI / 12 FAUX / 12 QUESTIONS OUVERTES',
        'guide_p1_age': 'Âge conseillé : 7–12 ans. Chaque verso affiche son numéro et le code source SC correspondant.',
        'guide_p2_label': 'AVANT D\'IMPRIMER',
        'guide_p2_title': 'Une impression soignée.',
        'guide_p2_sub': '4 cartes par feuille A4. 9 planches pour le jeu complet recto-verso.',
        'guide_p2_sections': [
            ('Fichiers et orientation', 'Ouvre OTTO_CARTE_36_FRONTE_RETRO_A4.pdf. Utilise le format A4 portrait, imprime à 100 % ou « taille réelle » et décoche « ajuster à la page ».'),
            ('Impression recto-verso', 'Sélectionne l’impression recto-verso sur le bord long. Les versos sont déjà inversés en miroir pour que la carte 01 s’aligne parfaitement avec son verso 01.'),
            ('Test d’impression d’abord', 'Imprime d\'abord les pages 1 et 2 en test. Regarde par transparence contre la lumière pour vérifier l\'alignement. Mesure une carte : elle doit faire 82 × 118 mm.'),
            ('Papier et découpe', 'Utilise un papier mat épais compatible avec ton imprimante (160–250 g/m² conseillé). Découpe le long des repères de coupe avec une règle et un cutter ou des ciseaux.'),
            ('Option recto seul', 'Utilise OTTO_CARTE_36_SOLO_FRONTE_A4.pdf : 9 pages de questions. Les réponses et explications se trouvent dans ce guide.')
        ],
        'guide_sol_label': 'SOLUTIONS',
        'guide_sol_title': 'Cartes {start:02}–{end:02}',
        'guide_sol_sub': 'Choisis d\'abord une réponse. Vérifie ensuite avec l\'explication scientifique.',
        'guide_p8_label': 'SOURCES ET PREUVES',
        'guide_p8_title': 'Suis les preuves.',
        'guide_p8_sub': 'Les codes SC renvoient directement aux publications scientifiques du livre.',
        'guide_p8_p1': 'Les 36 questions explorent les découvertes présentées dans le livre. Chaque carte est reliée à des études scientifiques évaluées par les pairs ou à des archives institutionnelles.',
        'guide_p8_p2': 'Les illustrations sont des reconstitutions visuelles créées pour le livre. L’image de M87* sur les cartes 32 et 33 est la reconstitution photographique officielle : Collaboration EHT / ESO (2019), CC BY 4.0.',
        'guide_p8_lic_title': 'M87* / IMAGE ET LICENCE',
        'guide_p8_lic_links': [
            ('Publication officielle de l’image ESO', 'https://www.eso.org/public/images/eso1907a/'),
            ('Licence Creative Commons Attribution 4.0', 'https://creativecommons.org/licenses/by/4.0/')
        ],
        'guide_p8_dim': 'Dimensions des cartes : 82 × 118 mm. Marges : 18 mm gauche/droite, 24,5 mm haut/bas. Espacement : 10 mm horizontalement, 12 mm verticalement. Repères de coupe situés hors des cartes.'
    },
    'es': {
        'doc_title_ds': 'Otto - 36 Cartas Premium - Doble Cara',
        'doc_title_so': 'Otto - 36 Cartas Premium - Solo Anverso',
        'book_title': '¡Einstein, esta te la perdiste!',
        'cards_title': 'LAS CARTAS DE LA CURIOSIDAD',
        'recto': 'ANVERSO',
        'verso': 'REVERSO',
        'footer_sheet': 'A4 · 100% / Tamaño real · Cortar por las marcas de corte',
        'sheet_prefix': 'LÁMINA',
        'question_label': 'LA PREGUNTA',
        'sc55_credit': 'Colaboración EHT / ESO · CC BY 4.0',
        'choices_label': 'VERDADERO / FALSO / NO LO SABEMOS TODAVÍA',
        'flip_hint': 'Elige, luego gira la carta.',
        'answer_label': 'LA RESPUESTA',
        'answer_true': 'Verdadero.',
        'answer_false': 'Falso.',
        'answer_unknown_1': 'No lo sabemos',
        'answer_unknown_2': 'todavía.',
        'evidence_label': 'EXPLORA LAS PRUEBAS',
        'evidence_hint': 'Encuentra este código en la biblioteca de fuentes científicas.',
        'series_sub': 'OTTO / Las Cartas de la Curiosidad',
        'guide_title': 'Otto - Guía, Impresión y Soluciones - Edición Premium',
        'guide_sub_top': 'OTTO / LAS CARTAS DE LA CURIOSIDAD',
        'companion_text': 'Un contenido extra del libro ¡Einstein, esta te la perdiste!',
        'guide_p1_label': 'EL JUEGO',
        'guide_p1_title': 'Verdadero. Falso.',
        'guide_p1_sub': '¿O no lo sabemos todavía? 36 preguntas para descubrir lo que la ciencia sabe realmente.',
        'guide_p1_steps': [
            ('01', 'Preparar', 'Imprime y recorta las 36 cartas. Baraja el mazo y mantén las respuestas boca abajo.'),
            ('02', 'Leer', 'El jugador que toma una carta lee la pregunta en voz alta sin mostrar el reverso. Los demás jugadores eligen: verdadero, falso o no lo sabemos todavía.'),
            ('03', 'Revelar', 'Gira la carta y lee la explicación científica. Suma un punto por cada acierto: ¡reconocer lo que la ciencia aún ignora también cuenta!'),
            ('04', 'Jugar en familia', 'Tras 10 cartas, quien tenga más puntos gana la partida. En modo cooperativo, colaborad en equipo para lograr al menos 8 aciertos de 10.')
        ],
        'guide_p1_footer': '12 VERDADERO / 12 FALSO / 12 PREGUNTAS ABIERTAS',
        'guide_p1_age': 'Edad recomendada: 7–12 años. Cada reverso muestra su número y el código de fuente SC correspondiente.',
        'guide_p2_label': 'ANTES DE IMPRIMIR',
        'guide_p2_title': 'Una impresión limpia.',
        'guide_p2_sub': '4 cartas por lámina A4. 9 láminas para la baraja completa a doble cara.',
        'guide_p2_sections': [
            ('Archivos y orientación', 'Abre OTTO_CARTE_36_FRONTE_RETRO_A4.pdf. Elige formato A4 vertical, imprime al 100 % o «tamaño real» y desactiva «ajustar a la página».'),
            ('Impresión a doble cara', 'Selecciona impresión a doble cara por el borde largo. Los reversos ya están invertidos en espejo para que la carta 01 coincida con su reverso 01.'),
            ('Prueba primero', 'Imprime primero las páginas 1 y 2 de prueba. Míralas a contraluz para comprobar el alineamiento. Mide una carta: debe medir 82 × 118 mm.'),
            ('Papel y corte', 'Utiliza papel mate grueso compatible con tu impresora (160–250 g/m² recomendado). Corta siguiendo las marcas con regla y cúter o tijeras.'),
            ('Opción solo anverso', 'Utiliza OTTO_CARTE_36_SOLO_FRONTE_A4.pdf: 9 páginas solo de preguntas. Las respuestas y explicaciones están en esta guía.')
        ],
        'guide_sol_label': 'SOLUCIONES',
        'guide_sol_title': 'Cartas {start:02}–{end:02}',
        'guide_sol_sub': 'Primero elige una respuesta. Luego compruébala con la explicación científica.',
        'guide_p8_label': 'FUENTES Y PRUEBAS',
        'guide_p8_title': 'Sigue las pruebas.',
        'guide_p8_sub': 'Los códigos SC enlazan directamente con las fuentes y publicaciones del libro.',
        'guide_p8_p1': 'Las 36 preguntas exploran los descubrimientos presentados en el libro. Cada carta está conectada con estudios científicos evaluados por expertos o registros institucionales.',
        'guide_p8_p2': 'Las ilustraciones son recreaciones visuales creadas para el libro. La imagen de M87* en las cartas 32 y 33 es la reconstrucción fotográfica oficial: Colaboración EHT / ESO (2019), CC BY 4.0.',
        'guide_p8_lic_title': 'M87* / IMAGEN Y LICENCIA',
        'guide_p8_lic_links': [
            ('Publicación oficial de la imagen ESO', 'https://www.eso.org/public/images/eso1907a/'),
            ('Licencia Creative Commons Attribution 4.0', 'https://creativecommons.org/licenses/by/4.0/')
        ],
        'guide_p8_dim': 'Dimensiones de las cartas: 82 × 118 mm. Márgenes: 18 mm izquierda/derecha, 24,5 mm arriba/abajo. Espaciado: 10 mm horizontal, 12 mm vertical. Marcas de corte situadas fuera de las cartas.'
    }
}

def front(c, r, x, y, S):
    accent = base(c, r, x, y)
    fitimage(c, r, x + P, y + CH - 64 * mm, CW - 2 * P, 47 * mm)
    if r['code'] == 'SC-55':
        text(c, S['sc55_credit'], x + P, y + CH - 66.5 * mm, 5.6, color=MUTED)
    text(c, S['question_label'], x + P, y + CH - 71.5 * mm, 7.3, 'SansB', accent)
    para(c, r['question'], x + P, y + CH - 75 * mm, CW - 2 * P, 11.2, 'SerifB', 14.0, maxh=25.2 * mm, tag=f"question-{r['id']:02}")
    rule(c, x + P, y + 15.5 * mm, CW - 2 * P)
    text(c, S['choices_label'], x + P, y + 11.4 * mm, 6.7, 'SansB', INK)
    text(c, S['flip_hint'], x + P, y + 6.8 * mm, 7.2, color=MUTED)
    text(c, 'OTTO', x + CW - P, y + 6.8 * mm, 7.5, 'SansB', GOLD, 'right')

def back(c, r, x, y, S):
    accent = base(c, r, x, y)
    ans = r['answer']
    text(c, S['answer_label'], x + P, y + CH - 23 * mm, 7.3, 'SansB', accent)
    if ans in ['ON NE SAIT PAS ENCORE', 'NO LO SABEMOS TODAVÍA']:
        text(c, S['answer_unknown_1'], x + P, y + CH - 35 * mm, 21, 'Serif', INK)
        text(c, S['answer_unknown_2'], x + P, y + CH - 45 * mm, 21, 'Serif', INK)
    else:
        ans_str = S['answer_true'] if ans in ['VRAI', 'VERDADERO'] else S['answer_false']
        text(c, ans_str, x + P, y + CH - 40 * mm, 29, 'Serif', INK)
    rule(c, x + P, y + CH - 51 * mm, 12 * mm, GOLD, 1.2)
    para(c, r['explanation'], x + P, y + CH - 57 * mm, CW - 2 * P, 10.8, 'Sans', 13.8, maxh=36.0 * mm, tag=f"explanation-{r['id']:02}")
    rule(c, x + P, y + 20.5 * mm, CW - 2 * P)
    text(c, S['evidence_label'], x + P, y + 15.5 * mm, 7.3, 'SansB', accent)
    text(c, r['code'], x + CW - P, y + 15.5 * mm, 9, 'SansB', INK, 'right')
    text(c, S['evidence_hint'], x + P, y + 10.5 * mm, 7.0, color=MUTED)
    text(c, S['series_sub'], x + P, y + 6 * mm, 6.6, color=MUTED)

def sheet(c, items, sheetno, side, S):
    text(c, 'OTTO', MX, H - 13.5 * mm, 12, 'SerifB')
    text(c, S['cards_title'], MX + 18 * mm, H - 13.5 * mm, 8, 'SansB', MUTED)
    side_str = S['verso'] if side == 'retro' else S['recto']
    text(c, f"{items[0]['id']:02}-{items[-1]['id']:02} / {side_str}", W - MX, H - 13.5 * mm, 8, 'SansB', MUTED, 'right')
    for i, r in enumerate(items):
        row, col = divmod(i, 2)
        if side == 'retro':
            col = 1 - col
        x = MX + col * (CW + GX)
        y = H - MY - CH - row * (CH + GY)
        if side == 'retro':
            back(c, r, x, y, S)
        else:
            front(c, r, x, y, S)
    text(c, S['footer_sheet'], MX, 13 * mm, 7.4, color=MUTED)
    text(c, f"{S['sheet_prefix']} {sheetno:02} / 09", W - MX, 13 * mm, 7.4, 'SansB', MUTED, 'right')
    c.showPage()

def generate_deck(pdf_path, data, duplex, S):
    c = canvas.Canvas(str(pdf_path), pagesize=A4, pageCompression=1)
    c.setTitle(S['doc_title_ds'] if duplex else S['doc_title_so'])
    c.setAuthor(S['book_title'])
    for i in range(0, 36, 4):
        sheet(c, data[i:i+4], i // 4 + 1, 'fronte', S)
        if duplex:
            sheet(c, data[i:i+4], i // 4 + 1, 'retro', S)
    c.save()

def guide_page_base(c, num, label, title, sub, S):
    text(c, S['guide_sub_top'], 20 * mm, H - 17 * mm, 8, 'SansB', MUTED)
    rule(c, 20 * mm, H - 22 * mm, W - 40 * mm, GOLD, 0.7)
    text(c, label, 20 * mm, H - 35 * mm, 8, 'SansB', GOLD)
    text(c, title, 20 * mm, H - 50 * mm, 26, 'Serif', INK)
    para(c, sub, 20 * mm, H - 57 * mm, W - 40 * mm, 11, color=MUTED)
    rule(c, 20 * mm, 18 * mm, W - 40 * mm)
    text(c, S['companion_text'], 20 * mm, 12.5 * mm, 8, color=MUTED)
    text(c, f'{num:02}', W - 20 * mm, 12.5 * mm, 9, 'SansB', GOLD, 'right')

def generate_guide(pdf_path, data, S):
    c = canvas.Canvas(str(pdf_path), pagesize=A4, pageCompression=1)
    c.setTitle(S['guide_title'])
    
    # Page 1
    guide_page_base(c, 1, S['guide_p1_label'], S['guide_p1_title'], S['guide_p1_sub'], S)
    y = H - 84 * mm
    for n, title, body in S['guide_p1_steps']:
        text(c, n, 20 * mm, y - 2 * mm, 20, 'Serif', GOLD)
        text(c, title, 36 * mm, y, 12.5, 'SansB')
        h = para(c, body, 36 * mm, y - 4 * mm, W - 56 * mm, 11.0, leading=14.5)
        y -= max(35 * mm, h + 15 * mm)
    text(c, S['guide_p1_footer'], 20 * mm, 40 * mm, 9.5, 'SansB')
    para(c, S['guide_p1_age'], 20 * mm, 33 * mm, W - 40 * mm, 9.2, color=MUTED)
    c.showPage()
    
    # Page 2
    guide_page_base(c, 2, S['guide_p2_label'], S['guide_p2_title'], S['guide_p2_sub'], S)
    y = H - 83 * mm
    for title, body in S['guide_p2_sections']:
        text(c, title, 20 * mm, y, 11.5, 'SansB')
        h = para(c, body, 20 * mm, y - 4 * mm, W - 40 * mm, 10.5, leading=13.8)
        y -= h + 13 * mm
    c.showPage()
    
    # Pages 3-7 (Solutions)
    for start in range(0, 36, 8):
        group = data[start:start+8]
        page_num = start // 8 + 3
        guide_page_base(c, page_num, S['guide_sol_label'], S['guide_sol_title'].format(start=group[0]['id'], end=group[-1]['id']), S['guide_sol_sub'], S)
        y = H - 82 * mm
        for r in group:
            text(c, f"{r['id']:02}", 20 * mm, y, 15, 'Serif', GOLD)
            text(c, r['answer'], 34 * mm, y, 10.0, 'SansB')
            text(c, r['code'], W - 20 * mm, y, 9, 'SansB', MUTED, 'right')
            h = para(c, r['explanation'], 34 * mm, y - 3.5 * mm, W - 54 * mm, 10.0, leading=12.8)
            y -= max(22 * mm, h + 9.5 * mm)
            if y < 27 * mm:
                raise ValueError(f"Guide page overflow on page {page_num}")
        c.showPage()
        
    # Page 8 (Sources)
    guide_page_base(c, 8, S['guide_p8_label'], S['guide_p8_title'], S['guide_p8_sub'], S)
    para(c, S['guide_p8_p1'], 20 * mm, H - 84 * mm, W - 40 * mm, 11.2)
    para(c, S['guide_p8_p2'], 20 * mm, H - 118 * mm, W - 40 * mm, 11.2)
    text(c, S['guide_p8_lic_title'], 20 * mm, H - 152 * mm, 9, 'SansB', GOLD)
    for i, (label, url) in enumerate(S['guide_p8_lic_links']):
        yy = H - (163 + i * 10) * mm
        text(c, label, 20 * mm, yy, 10, 'Sans', INK)
        c.linkURL(url, (20 * mm, yy - 2 * mm, 150 * mm, yy + 4 * mm), relative=0, thickness=0)
    para(c, S['guide_p8_dim'], 20 * mm, H - 202 * mm, W - 40 * mm, 10.2, color=MUTED)
    c.showPage()
    c.save()

def build_language(lang):
    print(f"=== Generating {lang.upper()} Card PDFs ===")
    out_dir = Path(f'assets/einstein/bonus/{lang}/carte')
    json_path = out_dir / f'carte_{lang}.json'
    data = json.loads(json_path.read_text(encoding='utf-8'))
    S = STRINGS[lang]
    
    print("  1. Generating OTTO_CARTE_36_FRONTE_RETRO_A4.pdf (duplex)...")
    generate_deck(out_dir / 'OTTO_CARTE_36_FRONTE_RETRO_A4.pdf', data, True, S)
    
    print("  2. Generating OTTO_CARTE_36_SOLO_FRONTE_A4.pdf (single-sided)...")
    generate_deck(out_dir / 'OTTO_CARTE_36_SOLO_FRONTE_A4.pdf', data, False, S)
    
    print("  3. Generating OTTO_GUIDA_PREMIUM.pdf...")
    generate_guide(out_dir / 'OTTO_GUIDA_PREMIUM.pdf', data, S)
    
    print("  4. Copying to OTTO_GUIDA_REGOLE_E_SOLUZIONI.pdf...")
    shutil.copy2(out_dir / 'OTTO_GUIDA_PREMIUM.pdf', out_dir / 'OTTO_GUIDA_REGOLE_E_SOLUZIONI.pdf')
    print(f"[OK] Finished {lang.upper()} PDFs successfully!\n")

if __name__ == '__main__':
    for l in ['fr', 'es']:
        build_language(l)
