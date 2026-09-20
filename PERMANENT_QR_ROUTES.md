# ⚠️ REGOLA IMMUTABILE: ROTTE QR CODE STAMPATE NEI LIBRI CARTACEI

> **IMPORTANTE PER QUALSIASI SVILUPPATORE O AGENTE AI:**
> I file e gli URL elencati in questo documento sono stati **stampati fisicamente in formato QR Code all'interno dei libri cartacei in commercio**.
> 
> **NON DEVONO MAI ESSERE:**
> - Ridenominati
> - Spostati di directory
> - Eliminati
> - Sostituiti con altri slug o percorsi
> 
> Qualsiasi modifica a questi percorsi renderebbe istantaneamente non funzionanti i libri fisici acquistati dai lettori nel mondo reale!

---

## 📌 Registro Ufficiale Rotte QR Code

| Elemento Libro | File HTML Principale | URL Pubblico Stampato nei QR | Fallback Diretto | Note |
| :--- | :--- | :--- | :--- | :--- |
| **Bonus Disegni da Colorare (Raccolta Vol. 1)** | `csa-vol1-bonus-8f2e91b7d4a6.html` | `https://csabookskids.com/csa-vol1-bonus-8f2e91b7d4a6` | `csa-vol1-bonus-8f2e91b7d4a6/index.html` | Include form raccolta dati con invio email PDF via Brevo API v3. |
| **Episodio 1: Benny e la Collina (Audio + Video ITA)** | `csa-vol1-ep1-ita-7b3f91a8d2c4.html` | `https://csabookskids.com/csa-vol1-ep1-ita-7b3f91a8d2c4` | `csa-vol1-ep1-ita-7b3f91a8d2c4/index.html` | Audio e video read-aloud integrati. |

---

## 🛡️ Meccanismi di Protezione Attivi

1. **Doppia Gestione File/Directory:**
   - Ciascuna rotta esiste come file `.html` alla radice (es. `csa-vol1-bonus-8f2e91b7d4a6.html`).
   - Ciascuna rotta esiste come cartella con `index.html` (es. `csa-vol1-bonus-8f2e91b7d4a6/index.html`) per garantire che anche gli scanner QR che forzano uno slash finale (`/`) ricevano HTTP 200 immediato.
2. **Interceptor Intelligente 404 (`404.html`):**
   - GitHub Pages reindirizza automaticamente a `404.html` in caso di discrepanze di percorso.
   - Lo script in `404.html` intercetta qualsiasi richiesta contenente gli slug dei QR code (anche con maiuscole/minuscole o parametri URL imprevisti) e la instrada all'URL corretto.
3. **Regole Vercel (`vercel.json`):**
   - Regole di `rewrites` e `cleanUrls` configurate per gestire indistintamente chiamate con o senza estensione e con o senza slash.
4. **Test Automatico di Integrità (`test-qr-routes.js`):**
   - Script di verifica automatico che fallisce se uno qualsiasi di questi file o endpoint viene modificato o rimosso.
