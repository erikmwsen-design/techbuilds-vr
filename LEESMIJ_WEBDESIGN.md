# TechBuilds VR — Publieke Website (`webdesign` v2.1)

**Merknaam:** TechBuilds VR  
**Tagline:** *Veilig trainen. Vakbekwaam bouwen.*  
**Domein & E-mail:** `https://www.techbuildsvr.nl` · `info@techbuildsvr.nl`  
**Designsysteem:** `v2.1 — Visual 5 Bento-Tegels (Apple Education) × Officiële TechBuilds VR Engineering Blue Huisstijl` (`#0B5ED7` Engineering Cobalt, `#0849AC` Cobalt Hover, `#0B192C` Deep Steel Navy, `#122640` Machined Navy, `#F2F6FA` Blueprint Paper, `#FFFFFF` Pure Surface)

---

## 1. Overzicht van Website `v2.1` (Uitwerking Visual 5 + UX Upgrade)

Deze map vormt een 100% zelfstandig, direct te publiceren webpakket in **Vanilla HTML5 + Vanilla CSS + Vanilla JS** (inclusief lokale OFL-lettertypen `Space Grotesk`, `Inter` en `JetBrains Mono`, uitsluitend officiële `.svg`-merklogo's uit `assets/img/logo/`, merkzuivere `.webp`-werkplaats- en studiobeelden, PDF-documentatie, `CNAME` en `.nojekyll`):

| Bestand | Inhoud, Visual 5 Architectuur & UX Upgrade (`v2.1`) |
| :--- | :--- |
| `index.html` | **Home (Visual 5 Bento-Tegel Hero & Productverhaal):** Luchtige `70px` witte frosted-glass sticky header met prominent officieel **`TechBuildsVR_Logo_Primary_LightBG.svg`** (`39px`) en `2px` Cobalt scroll-progress indicator. Asymmetrische 2-koloms Bento-Tegel Hero op sneeuwwit `#FFFFFF` met grote `#F2F6FA` statement-tegel (*"Veilig oefenen in VR. Vakbekwaam aan de machine."*), **3 interactieve kerncijfer-tegels** (`6 Modules`, `1× 230V Stekker`, `10 of 20 Brillen`) én grote afgeronde praktijkfoto-tegel met frosted-glass scène-dock (`Praktijklokaal` · `6 Modules` · `1× 230V VR-Kar` · `13,1" Tablet`), Bento-workflow, `#0B192C` maatwerk-podium, 3 pakket-tegels met directe `?optie=1\|2\|3` doorstroom en lichte `#F2F6FA` footer met `AC24`. |
| `training-draaibank.html` | **De 6 Modules op de WEILER Praktikant 140 (`Quest APK v2.2.0`):** Visual 5 Bento-Tegel Hero met klikbare module-snelkoppelingen, vernieuwde **Module-Studio (`M1`–`M6`)** met stap-voortgangsbalk (`Module 1 van 6`), `← Vorige module` / `Volgende module →` knoppen + pijltoetsnavigatie (`ArrowLeft`/`ArrowRight`), en uitgebreide **`M1: 3D Buddy Check & Eigen PBM` (`AV_COMBO_1..5`) Voor/Na vergelijker** met 4 klikbare PBM-hotspots en live vrijgavestatus. |
| `docentapp-tablet.html` | **13,1" Android Docenten Dashboard (`v2.3.0`):** Visual 5 Bento-Tegel Hero gevolgd door het afgeronde `#0B192C` Pro-Podium met de interactieve **13,1-inch Samsung Galaxy Tab S10 FE+ (`SM-X620`) Simulator** (`VR-Kar 10 (2×5)`, `VR-Kar 20 (4×5)`, `Eigen Brillen (Onbeperkt)`), directe visuele feedback-toast bovenin het tabletscherm, **live meebewegende 2D CAD-draaibankslede (`carriage_x_mm`) + afspeelknop** op de `4 Hz` Black-Box tijdlijn, én het printbare **A4 Praktijkvrijgaverapport (`PHYS_01..05` + S Pen handtekening-canvas)** voorzien van het officiële **`TechBuildsVR_Logo_Primary_LightBG.svg`**. |
| `maatwerk.html` | **Maatwerk VR-Machinesimulaties:** Visual 5 Bento-Tegel Hero met live 4-domein switcher (`Elektro & LOTO` · `Metaal & CNC` · `Klimaat & Proces` · `Productiecellen`), 4-stappen ontwikkeltraject (6–10 weken) en de **Interactieve Maatwerk-Scoper** gekoppeld aan `info@techbuildsvr.nl` en het aanvraagformulier. |
| `prijzen-contact.html` | **Transparante Pakketten, Meerjaren-TCO & Demo/Offerte:** Visual 5 Bento-Tegel Hero met snelkiezers, automatische `?optie=1\|2\|3` pakketselectie met bevestigingsbanner (**Optie 1:** € 10.000,- incl. 1e jr service + € 1.500,-/jr va. jr 2 · **Optie 2 Turnkey VR-Kar 10:** € 15.000,- + € 2.500,-/jr · **Optie 3 Turnkey VR-Kar 20:** € 25.000,- + € 3.500,-/jr excl. BTW), **Meerjaren TCO-Calculator (1–5 jaar) met klikbare visuele vergelijkingsbalken**, officiële PDF-documenttegel, FAQ en Demo-/Offerteformulier. |

---

## 2. Lokaal Bekijken of Publiceren

1. **Direct lokaal testen:**
   ```bash
   python3 -m http.server 8123 --directory .
   ```
2. **Standalone 1-bestand preview:** `TechBuilds_VR_Website_Open_Direct_In_Browser.html` bundelt alle 5 pagina's, lokale fonts, officiële SVG-logo's en geoptimaliseerde WebP-afbeeldingen in één zelfstandig `.html`-bestand.
3. **GitHub Pages & Custom Domain (`www.techbuildsvr.nl`):** `CNAME` en `.nojekyll` zijn standaard aanwezig in de hoofdmap voor directe uitrol op `erikmwsen-design/techbuilds-vr` (`main`).
4. **Verplichte `AC24` Onderwijs- & Veiligheidsdisclaimer:** Op alle 5 pagina's en in het printbare A4-vrijgaverapport verankerd.
