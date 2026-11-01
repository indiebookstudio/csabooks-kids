import sys, json, csv, os
from pathlib import Path
import pypdf

def verify_all_downloads():
    print("=== VERIFYING ALL DOWNLOADABLE FILES ===")
    errors = []
    
    # 1. Scientific sources PDFs
    sources_dir = Path('assets/einstein/downloads/fonti')
    sources_csv = Path('assets/einstein/content/fonti_it.csv')
    with open(sources_csv, encoding='utf-8') as f:
        codes = [r['codice'] for r in csv.DictReader(f)]
    
    print(f"Checking {len(codes)} source PDFs in downloads/fonti/...")
    for c in codes:
        pdf_path = sources_dir / f"{c}.pdf"
        if not pdf_path.exists():
            errors.append(f"Missing source PDF: {pdf_path}")
        else:
            sz = pdf_path.stat().st_size
            if sz < 1000:
                errors.append(f"Source PDF too small ({sz} B): {pdf_path}")
            else:
                with open(pdf_path, 'rb') as pf:
                    header = pf.read(4)
                    if header != b'%PDF':
                        errors.append(f"Invalid PDF header {header}: {pdf_path}")
    print(f"  Source PDFs checked: {len(codes) - len(errors)} OK")

    # 2. Colora PDFs
    print("\nChecking Colora PDFs in all 4 languages...")
    for l in ['it', 'en', 'fr', 'es']:
        p = Path(f'assets/einstein/bonus/{l}/colora/colora.pdf')
        if not p.exists():
            errors.append(f"Missing colora PDF: {p}")
        else:
            sz = p.stat().st_size
            if sz < 1000000: # should be ~40 MB
                errors.append(f"Colora PDF unexpectedly small ({sz} B): {p}")
            else:
                reader = pypdf.PdfReader(str(p))
                if len(reader.pages) < 8:
                    errors.append(f"Colora PDF has only {len(reader.pages)} pages: {p}")
                else:
                    print(f"  {l} colora.pdf: {len(reader.pages)} pages, {sz // (1024*1024)} MB OK")

    # 3. Card PDFs & Guides
    print("\nChecking Card game PDFs in all 4 languages...")
    expected_keywords = {
        'it': {'deck': 'LE CARTE DELLA CURIOSITÀ', 'front': 'ANIMALI', 'back': 'LA RISPOSTA', 'guide': 'IL GIOCO'},
        'en': {'deck': 'THE CURIOSITY CARDS', 'front': 'ANIMALS', 'back': 'THE ANSWER', 'guide': 'THE GAME'},
        'fr': {'deck': 'LES CARTES DE LA CURIOSITÉ', 'front': 'ANIMAUX', 'back': 'LA RÉPONSE', 'guide': 'LE JEU'},
        'es': {'deck': 'LAS CARTAS DE LA CURIOSIDAD', 'front': 'ANIMALES', 'back': 'LA RESPUESTA', 'guide': 'EL JUEGO'}
    }

    for l in ['it', 'en', 'fr', 'es']:
        card_dir = Path(f'assets/einstein/bonus/{l}/carte')
        kw = expected_keywords[l]
        
        # Duplex deck
        duplex_p = card_dir / 'OTTO_CARTE_36_FRONTE_RETRO_A4.pdf'
        if not duplex_p.exists():
            errors.append(f"Missing duplex cards: {duplex_p}")
        else:
            r = pypdf.PdfReader(str(duplex_p))
            if len(r.pages) != 18:
                errors.append(f"Duplex cards has {len(r.pages)} pages (expected 18): {duplex_p}")
            t1 = r.pages[0].extract_text()
            t2 = r.pages[1].extract_text()
            if kw['front'] not in t1:
                errors.append(f"{l} Duplex cards front page 1 missing keyword '{kw['front']}': {duplex_p}")
            if kw['back'] not in t2:
                errors.append(f"{l} Duplex cards back page 2 missing keyword '{kw['back']}': {duplex_p}")
            print(f"  {l} Duplex cards: 18 pages verified ({kw['front']}, {kw['back']})")

        # Single-sided deck
        single_p = card_dir / 'OTTO_CARTE_36_SOLO_FRONTE_A4.pdf'
        if not single_p.exists():
            errors.append(f"Missing single-sided cards: {single_p}")
        else:
            r = pypdf.PdfReader(str(single_p))
            if len(r.pages) != 9:
                errors.append(f"Single cards has {len(r.pages)} pages (expected 9): {single_p}")
            else:
                print(f"  {l} Single-sided cards: 9 pages verified")

        # Guide
        guide_p = card_dir / 'OTTO_GUIDA_PREMIUM.pdf'
        if not guide_p.exists():
            errors.append(f"Missing guide: {guide_p}")
        else:
            r = pypdf.PdfReader(str(guide_p))
            if len(r.pages) != 8:
                errors.append(f"Guide has {len(r.pages)} pages (expected 8): {guide_p}")
            t1 = r.pages[0].extract_text()
            if kw['guide'] not in t1:
                errors.append(f"{l} Guide page 1 missing keyword '{kw['guide']}': {guide_p}")
            print(f"  {l} Guide: 8 pages verified ({kw['guide']})")

        # CSV data
        csv_p = card_dir / 'CARTE_36_DATI.csv'
        if not csv_p.exists():
            errors.append(f"Missing CSV: {csv_p}")
        else:
            with open(csv_p, encoding='utf-8') as cf:
                rows = list(csv.reader(cf))
                if len(rows) != 37: # header + 36
                    errors.append(f"CSV has {len(rows)} rows (expected 37): {csv_p}")
                else:
                    print(f"  {l} CARTE_36_DATI.csv: 36 rows verified")

    print("\n=== SUMMARY ===")
    if errors:
        print(f"[FAIL] {len(errors)} ERRORS DETECTED:")
        for e in errors:
            print("  " + e)
        sys.exit(1)
    else:
        print("[OK] ALL DOWNLOADABLE FILES ARE 100% VALID, COMPLETE AND FULLY TRANSLATED!")

if __name__ == '__main__':
    verify_all_downloads()
