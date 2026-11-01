import sys, json, csv, os, re
from pathlib import Path

def run_audit():
    report = []
    def log(msg=''):
        report.append(msg)
        try:
            print(msg.encode('ascii', 'replace').decode('ascii'))
        except:
            pass

    log("=== AUDIT I18N ===")
    langs = ['it', 'en', 'fr', 'es']
    data = {l: json.load(open(f'assets/einstein/i18n/{l}.json', encoding='utf-8')) for l in langs}
    def get_keys(d, prefix=''):
        keys = {}
        for k, v in d.items():
            p = f'{prefix}.{k}' if prefix else k
            if isinstance(v, dict):
                keys.update(get_keys(v, p))
            else:
                keys[p] = v
        return keys
    flat = {l: get_keys(data[l]) for l in langs}
    
    for l in ['en', 'fr', 'es']:
        log(f"\n--- Comparing {l} against 'it' ---")
        same_count = 0
        for k in sorted(flat[l].keys()):
            val_l = flat[l][k]
            val_it = flat['it'][k]
            if val_l == val_it and len(val_l) > 3 and not any(x in k.lower() for x in ['code', 'url', 'id', 'doi', 'isbn', 'email', 'phone', 'version', 'age', 'author', 'publisher']):
                log(f"  [SAME] {k} -> '{val_l}'")
                same_count += 1
        if same_count == 0:
            log(f"  All keys are distinct from Italian!")

    log("\n=== AUDIT FONTI CSV ===")
    rows = {}
    for l in langs:
        path = f'assets/einstein/content/fonti_{l}.csv'
        with open(path, encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows[l] = {r['codice']: r for r in reader}
    
    it_codes = set(rows['it'].keys())
    for l in ['en', 'fr', 'es']:
        same_titles = []
        for code in it_codes:
            r_it = rows['it'][code]
            r_l = rows[l].get(code)
            if not r_l: continue
            if r_it['titolo'] == r_l['titolo'] and len(r_it['titolo']) > 5:
                same_titles.append((code, r_it['titolo']))
        log(f"  {l} identical titles to IT: {len(same_titles)} / {len(it_codes)}")

    log("\n=== AUDIT HTML & JS STRINGS IN BONUS ===")
    
    fr_forbidden = [
        ('Inizia', 'Commencer / Démarrer'),
        ('Sfida', 'Défi'),
        ('Punteggio', 'Score'),
        ('Continua', 'Continuer'),
        ('Livello', 'Niveau'),
        ('Vero', 'Vrai'),
        ('Falso', 'Faux'),
        ('Non lo sappiamo', 'On ne sait pas encore'),
        ('Scegli', 'Choisis / Choisir'),
        ('Mostra', 'Afficher / Montrer'),
        ('Nascondi', 'Masquer / Cacher'),
        ('Indietro', 'Retour'),
        ('Avanti', 'Suivant'),
        ('Tocca per', 'Touche pour / Cliquer pour'),
        ('Cosa puoi fare', 'Ce que tu peux faire'),
        ('Come funziona', 'Comment ça marche'),
        ('Cosa c’è dentro', 'Ce qu’il y a à l’intérieur'),
        ('Perché conta', 'Pourquoi c’est important'),
        ('Curiosità', 'Curiosité')
    ]
    
    fr_path = Path('assets/einstein/bonus/fr')
    log("--- Checking French files for Italian residue ---")
    fr_issues = 0
    for f in sorted(list(fr_path.rglob('*.html')) + list(fr_path.rglob('*.js'))):
        txt = f.read_text(encoding='utf-8')
        clean = re.sub(r'https?://\S+', '', txt)
        for word, replacement in fr_forbidden:
            matches = list(re.finditer(r'(?<![a-zA-ZÀ-ÿ])' + re.escape(word) + r'(?![a-zA-ZÀ-ÿ])', clean))
            for m in matches:
                snippet = clean[max(0, m.start()-30):min(len(clean), m.end()+30)].replace('\n', ' ')
                if any(x in snippet for x in ['id=', 'class=', 'href=', 'src=', 'var ', 'let ', 'const ', 'function']):
                    continue
                log(f"  [{f.relative_to(fr_path)}] Found '{word}' (suggest: {replacement}) in: ...{snippet}...")
                fr_issues += 1
    log(f"Total French issues: {fr_issues}")

    es_forbidden = [
        ('Inizia', 'Empieza / Comenzar'),
        ('Sfida', 'Desafío / Reto'),
        ('Punteggio', 'Puntuación'),
        ('Continua', 'Continuar'),
        ('Livello', 'Nivel'),
        ('Non lo sappiamo', 'No lo sabemos todavía'),
        ('Scegli', 'Elige / Escoge'),
        ('Mostra', 'Mostrar'),
        ('Nascondi', 'Ocultar'),
        ('Indietro', 'Atrás / Volver'),
        ('Avanti', 'Siguiente'),
        ('Tocca per', 'Toca para'),
        ('Cosa puoi fare', 'Qué puedes hacer'),
        ('Come funziona', 'Cómo funciona'),
        ('Cosa c’è dentro', 'Qué hay dentro'),
        ('Perché conta', 'Por qué importa'),
        ('Curiosità', 'Curiosidad'),
        ('Guida', 'Guía')
    ]
    
    es_path = Path('assets/einstein/bonus/es')
    log("\n--- Checking Spanish files for Italian residue ---")
    es_issues = 0
    for f in sorted(list(es_path.rglob('*.html')) + list(es_path.rglob('*.js'))):
        txt = f.read_text(encoding='utf-8')
        clean = re.sub(r'https?://\S+', '', txt)
        for word, replacement in es_forbidden:
            matches = list(re.finditer(r'(?<![a-zA-ZÀ-ÿ])' + re.escape(word) + r'(?![a-zA-ZÀ-ÿ])', clean))
            for m in matches:
                snippet = clean[max(0, m.start()-30):min(len(clean), m.end()+30)].replace('\n', ' ')
                if any(x in snippet for x in ['id=', 'class=', 'href=', 'src=', 'var ', 'let ', 'const ', 'function']):
                    continue
                log(f"  [{f.relative_to(es_path)}] Found '{word}' (suggest: {replacement}) in: ...{snippet}...")
                es_issues += 1
    log(f"Total Spanish issues: {es_issues}")

    # Write report
    Path('scripts/audit_report.txt').write_text('\n'.join(report), encoding='utf-8')
    log("\nFull report written to scripts/audit_report.txt")

if __name__ == '__main__':
    run_audit()
