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

### 📚 Raccolta Volume 1
| Elemento Libro | File HTML Principale | URL Pubblico Stampato nei QR | Fallback Diretto | Note |
| :--- | :--- | :--- | :--- | :--- |
| **Bonus Disegni da Colorare (Raccolta Vol. 1)** | `csa-vol1-bonus-8f2e91b7d4a6.html` | `https://csabookskids.com/csa-vol1-bonus-8f2e91b7d4a6` | `csa-vol1-bonus-8f2e91b7d4a6/index.html` | Include form raccolta dati con invio email PDF via Brevo API v3. |
| **Storia 1: Benny e la Collina (Audio + Video ITA)** | `csa-vol1-ep1-ita-7b3f91a8d2c4.html` | `https://csabookskids.com/csa-vol1-ep1-ita-7b3f91a8d2c4` | `csa-vol1-ep1-ita-7b3f91a8d2c4/index.html` | Audio e video read-aloud + doppia cover affiancata. |
| **Storia 2: Rudy e la Spiaggia (Audio + Video ITA)** | `csa-vol1-ep2-ita-4d9e16a2c8f1.html` | `https://csabookskids.com/csa-vol1-ep2-ita-4d9e16a2c8f1` | `csa-vol1-ep2-ita-4d9e16a2c8f1/index.html` | Audio e video read-aloud + doppia cover affiancata. |
| **Storia 3: Leo e la Montagna (Audio + Video ITA)** | `csa-vol1-ep3-ita-9a5c83e1f7d2.html` | `https://csabookskids.com/csa-vol1-ep3-ita-9a5c83e1f7d2` | `csa-vol1-ep3-ita-9a5c83e1f7d2/index.html` | Audio e video read-aloud + doppia cover affiancata. |
| **Storia 4: Bruno e le Papere (Audio + Video ITA)** | `csa-vol1-ep4-ita-6e2b94f0a3c5.html` | `https://csabookskids.com/csa-vol1-ep4-ita-6e2b94f0a3c5` | `csa-vol1-ep4-ita-6e2b94f0a3c5/index.html` | Audio e video read-aloud + doppia cover affiancata. |

### 📚 Raccolta Volume 2
| Elemento Libro | File HTML Principale | URL Pubblico Stampato nei QR | Fallback Diretto | Note |
| :--- | :--- | :--- | :--- | :--- |
| **Bonus Disegni da Colorare (Raccolta Vol. 2)** | `csa-vol2-bonus-46c694dc3ec4.html` | `https://csabookskids.com/csa-vol2-bonus-46c694dc3ec4` | `csa-vol2-bonus-46c694dc3ec4/index.html` | Include form raccolta dati con invio email PDF Vol. 2 via Brevo API v3. |
| **Storia 1: Benny e le Monete Romane (Audio + Video ITA)** | `csa-vol2-ep1-ita-1c683f8acb67.html` | `https://csabookskids.com/csa-vol2-ep1-ita-1c683f8acb67` | `csa-vol2-ep1-ita-1c683f8acb67/index.html` | Audio e video read-aloud + doppia cover affiancata. |
| **Storia 2: Nina e i Coniglietti (Audio + Video ITA)** | `csa-vol2-ep2-ita-ed3dabb448ca.html` | `https://csabookskids.com/csa-vol2-ep2-ita-ed3dabb448ca` | `csa-vol2-ep2-ita-ed3dabb448ca/index.html` | Audio e video read-aloud + doppia cover affiancata. |
| **Storia 3: Rino e i Ladri (Audio + Video ITA)** | `csa-vol2-ep3-ita-2779f3736b81.html` | `https://csabookskids.com/csa-vol2-ep3-ita-2779f3736b81` | `csa-vol2-ep3-ita-2779f3736b81/index.html` | Audio e video read-aloud + doppia cover affiancata. |
| **Storia 4: Leo e la Cinciallegra (Audio + Video ITA)** | `csa-vol2-ep4-ita-605c1bd7e4ce.html` | `https://csabookskids.com/csa-vol2-ep4-ita-605c1bd7e4ce` | `csa-vol2-ep4-ita-605c1bd7e4ce/index.html` | Audio e video read-aloud + doppia cover affiancata. |


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
