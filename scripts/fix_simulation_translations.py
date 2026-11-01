from pathlib import Path

REPLACEMENTS = {
    'fr': [
        ('1 · Inizia il giro', '1 · Commencer la ronde'),
        ('La Balena e le Bolle: Come funziona davvero?', 'La Baleine et les Bulles : Comment ça marche vraiment ?'),
        ('presa nelle sue cellule. Tocca per avvicinarti.', 'surprise dans ses cellules. Touche pour t’approcher.'),
        ('cellule</strong>. Tocca per avvicinarti.', 'cellules</strong>. Touche pour t’approcher.'),
        ("next:'Esplora il DNA'", "next:'Explorer l’ADN'"),
        ('aria-label="Scegli un nuovo punto di partenza"', 'aria-label="Choisis un nouveau point de départ"'),
        ('aria-label="Guida il pesce con un tocco alla volta"', 'aria-label="Guide le poisson une touche à la fois"'),
        ("text:'Scegli una nuova partenza. Il pesce", "text:'Choisis un nouveau point de départ. Le poisson"),
        ("setTelemetry('Scegli una nuova partenza')", "setTelemetry('Choisis un nouveau point de départ')"),
        ("status('Scegli una condizione e osserva il sistema')", "status('Choisis une condition et observe le système')"),
        ("setStatus('Scegli un movimento illustrativo')", "setStatus('Choisis un mouvement illustratif')"),
        ('MIT Media Lab · Come funziona l’interfaccia AMI ↗', 'MIT Media Lab · Comment fonctionne l’interface AMI ↗'),
        ("MIT Media Lab · Come funziona l'interfaccia AMI ↗", 'MIT Media Lab · Comment fonctionne l’interface AMI ↗'),
        ("textContent='Scegli quante misure confrontare'", "textContent='Choisis combien de mesures comparer'")
    ],
    'es': [
        ('1 · Inizia il giro', '1 · Iniciar la ronda'),
        ('La Balena e le Bolle: Come funziona davvero?', 'La Ballena y las Burbujas: ¿Cómo funciona realmente?'),
        ('presa nelle sue cellule. Tocca per avvicinarti.', 'sorpresa en sus células. Toca para acercarte.'),
        ('cellule</strong>. Tocca per avvicinarti.', 'células</strong>. Toca para acercarte.'),
        ("next:'Esplora il DNA'", "next:'Explorar el ADN'"),
        ('aria-label="Scegli un nuovo punto di partenza"', 'aria-label="Elige un nuevo punto de partida"'),
        ('aria-label="Guida il pesce con un tocco alla volta"', 'aria-label="Guía al pez un toque a la vez"'),
        ("text:'Scegli una nuova partenza. Il pesce", "text:'Elige un nuevo punto de partida. El pez"),
        ("setTelemetry('Scegli una nuova partenza')", "setTelemetry('Elige un nuevo punto de partida')"),
        ("status('Scegli una condizione e osserva il sistema')", "status('Elige una condición y observa el sistema')"),
        ("setStatus('Scegli un movimento illustrativo')", "setStatus('Elige un movimiento ilustrativo')"),
        ('MIT Media Lab · Come funziona l’interfaccia AMI ↗', 'MIT Media Lab · ¿Cómo funciona la interfaz AMI? ↗'),
        ("MIT Media Lab · Come funziona l'interfaccia AMI ↗", 'MIT Media Lab · ¿Cómo funciona la interfaz AMI? ↗'),
        ("textContent='Scegli quante misure confrontare'", "textContent='Elige cuántas medidas comparar'")
    ],
    'en': [
        ("setTelemetry('Scegli una nuova partenza')", "setTelemetry('Choose a new starting point')"),
        ("textContent='Scegli quante misure confrontare'", "textContent='Choose how many measurements to compare'")
    ]
}

def apply_fixes():
    total_fixed = 0
    for lang, repls in REPLACEMENTS.items():
        base = Path(f'assets/einstein/bonus/{lang}/animazioni')
        if not base.exists(): continue
        for f in base.rglob('*.html'):
            txt = f.read_text(encoding='utf-8')
            changed = False
            for target, repl in repls:
                if target in txt:
                    txt = txt.replace(target, repl)
                    changed = True
                    total_fixed += 1
                    print(f"[{lang}] Fixed '{target[:30]}...' in {f.name}")
            if changed:
                f.write_text(txt, encoding='utf-8')
    print(f"\nTotal replacements made: {total_fixed}")

if __name__ == '__main__':
    apply_fixes()
