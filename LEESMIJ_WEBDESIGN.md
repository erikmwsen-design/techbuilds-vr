# TechBuilds VR — Publieke Website (`webdesign` v2.2)

**Merknaam:** TechBuilds VR  
**Tagline:** *Veilig trainen. Vakbekwaam bouwen.*  
**Domein & E-mail:** `https://www.techbuildsvr.nl` · `info@techbuildsvr.nl`  
**Designsysteem:** `v2.2 — Visual 5 Bento-Tegels (Apple Education) × Officiële TechBuilds VR Engineering Blue Huisstijl` (`#0B5ED7` Engineering Cobalt, `#0849AC` Cobalt Hover, `#0B192C` Deep Steel Navy, `#122640` Machined Navy, `#F2F6FA` Blueprint Paper, `#FFFFFF` Pure Surface)

---

## 1. Overzicht van Website `v2.2` (Uitbreiding Elektrotechniek VR `E1–E6` & Losse Module `+ € 5.000,-`)

Deze map vormt een 100% zelfstandig, direct te publiceren webpakket in **Vanilla HTML5 + Vanilla CSS + Vanilla JS** (inclusief lokale OFL-lettertypen `Space Grotesk`, `Inter` en `JetBrains Mono`, uitsluitend officiële `.svg`-merklogo's uit `assets/img/logo/`, merkzuivere `.webp`-werkplaats- en studiobeelden inclusief `assets/img/elektro/*.webp`, PDF-documentatie, `CNAME` en `.nojekyll`):

| Bestand | Inhoud, Visual 5 Architectuur & Vakmodules (`v2.2`) |
| :--- | :--- |
| `index.html` | **Home (Visual 5 Bento-Tegel Hero & 2 Standaard Vakmodules):** Luchtige `70px` witte frosted-glass sticky header (6 menu-items) met officieel **`TechBuildsVR_Logo_Primary_LightBG.svg`** (`39px`) en `2px` Cobalt scroll-progress indicator. Asymmetrische 2-koloms Bento-Tegel Hero (`2×6 VR-Modules`, `1× 230V Stekker`, `10 of 20 Brillen`), scène-dock (`Praktijklokaal` · `Draaibank VR` · `Elektro VR` · `1× 230V VR-Kar` · `13,1" Tablet`), nieuwe `#vakmodules` Bento-showcase voor **Draaibank VR (`M1–M6`)** en **Elektrotechniek VR (`E1–E6`)**, 3 pakket-tegels inclusief 1 vakmodule naar keuze én de losse extra module callout (`+ € 5.000,-` eenmalig excl. BTW). |
| `training-draaibank.html` | **De 6 Modules op de WEILER Praktikant 140 (`Quest APK v2.2.0`):** Visual 5 Bento-Tegel Hero met klikbare module-snelkoppelingen, interactieve **Module-Studio (`M1`–`M6`)** met stap-voortgangsbalk, pijltoetsnavigatie, uitgebreide **`M1: 3D Buddy Check & Eigen PBM` (`AV_COMBO_1..5`) Voor/Na vergelijker** met 4 klikbare PBM-hotspots, én cross-link tegel naar Elektrotechniek VR (`+ € 5.000,-` excl. BTW). |
| `training-elektrotechniek.html` | **NIEUW — De 6 Modules Elektrotechniek VR (`NEN 3140` & `LOTO` aan 400V-verdeler & groepenkast):** Volledige Visual 5 Bento-productpagina met klikbare metric-tegels (`E1`, `E3`, `E4`), interactieve **Module-Studio (`E1`–`E6`, `data-studio-domain="elektro"`)**, **`E1: 3D Buddy Check & Elektrische PBM/VDE` Voor/Na inspector** met 4 klikbare controlepunten, combinatie-tegel (`Draaibank VR + Elektrotechniek VR` op dezelfde 13,1" Regietablet voor `+ € 5.000,-` eenmalig excl. BTW), normenkader (`NEN 3140` & `Arbobesluit H3`) en verplichte `AC24`-disclaimer. |
| `docentapp-tablet.html` | **13,1" Android Docenten Dashboard (`v2.3.0`):** Visual 5 Bento-Tegel Hero (voor zowel Draaibank VR `M1–M6` als Elektrotechniek VR `E1–E6` op dezelfde 13,1" Knox Regietablet) gevolgd door het `#0B192C` Pro-Podium met de interactieve **13,1-inch Samsung Galaxy Tab S10 FE+ (`SM-X620`) Simulator** (`VR-Kar 10 (2×5)`, `VR-Kar 20 (4×5)`, `Eigen Brillen (Onbeperkt)`), live `4 Hz` Black-Box tijdlijn én printbaar **A4 Praktijkvrijgaverapport (`PHYS_01..05` + S Pen handtekening)**. |
| `maatwerk.html` | **Maatwerk VR-Machinesimulaties:** Visual 5 Bento-Tegel Hero met live 4-domein switcher (`Elektro & LOTO` · `Metaal & CNC` · `Klimaat & Proces` · `Productiecellen`), directe verwijzing naar de 2 standaard vakmodules (`Draaibank VR` & `Elektrotechniek VR · los + € 5.000,-`), 4-stappen ontwikkeltraject (6–10 weken) en de **Interactieve Maatwerk-Scoper**. |
| `prijzen-contact.html` | **Transparante Pakketten, Losse Module (`+ € 5.000,-`), Meerjaren-TCO & Demo/Offerte:** Alle 3 pakketten (**Optie 1:** € 10.000,- incl. 1e jr service + € 1.500,-/jr va. jr 2 · **Optie 2 Turnkey VR-Kar 10:** € 15.000,- + € 2.500,-/jr · **Optie 3 Turnkey VR-Kar 20:** € 25.000,- + € 3.500,-/jr excl. BTW) zijn inclusief **1 VR-vakmodule naar keuze** (`Draaibank VR` óf `Elektrotechniek VR`). De **`#losse-module` Bento-tegel (`+ € 5.000,-` eenmalig excl. BTW)**, vergelijkingstabel, **Meerjaren TCO-Calculator (`?module=draaibank\|elektro\|beide`)**, FAQ en het Demo-/Offerteformulier (`#reqModule`) rekenen de 2e vakmodule direct door zonder extra jaarlijkse kar-servicekosten. |

---

## 2. Lokaal Bekijken of Publiceren

1. **Direct lokaal testen:**
   ```bash
   python3 -m http.server 8123 --directory .
   ```
2. **Standalone 1-bestand preview:** `TechBuilds_VR_Website_Open_Direct_In_Browser.html` bundelt alle 6 pagina's, lokale fonts, officiële SVG-logo's en geoptimaliseerde WebP-afbeeldingen in één zelfstandig `.html`-bestand.
3. **GitHub Pages & Custom Domain (`www.techbuildsvr.nl`):** `CNAME` en `.nojekyll` zijn standaard aanwezig in de hoofdmap voor directe uitrol op `erikmwsen-design/techbuilds-vr` (`main`).
4. **Verplichte `AC24` Onderwijs- & Veiligheidsdisclaimer:** Op alle 6 pagina's en in het printbare A4-vrijgaverapport verankerd.
