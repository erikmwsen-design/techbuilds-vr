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
| `index.html` | **Over ons (`Over ons` · 1e menu-item):** Luchtige `70px` witte frosted-glass sticky header met een simpel **4-item hoofdmenu** (`Over ons` · `Modules` · `Teacher Dashboard` · `Pakketten en prijzen`), officieel **`TechBuildsVR_Logo_Primary_LightBG.svg`** (`39px`), Bento-Tegel Hero, `#over-ons` sectie (*Over TechBuilds VR*), `#vakmodules` Bento-showcase (**Draaibank VR** + **Elektrotechniek VR**) en 3 pakket-tegels met `+ € 5.000,-` losse module callout. |
| `modules.html` | **Modules Overzicht (`Modules` · 2e menu-item):** Centrale Apple-Bento hub voor alle VR-modules met snelle pilwisselaar (`Alle modules` · `Draaibank VR (M1–M6)` · `Elektrotechniek VR (E1–E6)` · `Maatwerk`), naast elkaar geplaatste modulekaarten, de `+ € 5.000,-` combinatie-tegel en het `#0B192C` maatwerk-podium. |
| `training-draaibank.html` | **De 6 Modules op de WEILER Praktikant 140 (`Quest APK v2.2.0`):** Visual 5 Bento-Tegel Hero met module-pilwisselaar, interactieve **Module-Studio (`M1`–`M6`)**, **`M1: 3D Buddy Check & Eigen PBM` (`AV_COMBO_1..5`) Voor/Na vergelijker**, en cross-link naar Elektrotechniek VR (`+ € 5.000,-` excl. BTW). |
| `training-elektrotechniek.html` | **De 6 Modules Elektrotechniek VR (`NEN 3140` & `LOTO` aan 400V-verdeler & groepenkast):** Volledige Visual 5 Bento-productpagina met module-pilwisselaar, interactieve **Module-Studio (`E1`–`E6`)**, **`E1: 3D Buddy Check & Elektrische PBM/VDE` Voor/Na inspector**, combinatie-tegel (`+ € 5.000,-` eenmalig excl. BTW), normenkader (`NEN 3140` & `Arbobesluit H3`) en `AC24`-disclaimer. |
| `docentapp-tablet.html` | **Teacher Dashboard (`Teacher Dashboard` · 3e menu-item):** Visual 5 Bento-Tegel Hero gevolgd door het `#0B192C` Pro-Podium met de interactieve **13,1-inch Samsung Galaxy Tab S10 FE+ (`SM-X620`) Simulator** (`VR-Kar 10 (2×5)`, `VR-Kar 20 (4×5)`, `Eigen Brillen (Onbeperkt)`), live `4 Hz` Black-Box tijdlijn én printbaar **A4 Praktijkvrijgaverapport (`PHYS_01..05` + S Pen handtekening)**. |
| `maatwerk.html` | **Maatwerk VR-Machinesimulaties:** Visual 5 Bento-Tegel Hero met module-pilwisselaar, live 4-domein switcher (`Elektro & LOTO` · `Metaal & CNC` · `Klimaat & Proces` · `Productiecellen`), 4-stappen ontwikkeltraject (6–10 weken) en de **Interactieve Maatwerk-Scoper**. |
| `prijzen-contact.html` | **Pakketten en prijzen (`Pakketten en prijzen` · 4e menu-item):** Alle 3 pakketten (**Optie 1:** € 10.000,- incl. 1e jr service + € 1.500,-/jr va. jr 2 · **Optie 2 Turnkey VR-Kar 10:** € 15.000,- + € 2.500,-/jr · **Optie 3 Turnkey VR-Kar 20:** € 25.000,- + € 3.500,-/jr excl. BTW) zijn inclusief **1 VR-vakmodule naar keuze**. De **`#losse-module` Bento-tegel (`+ € 5.000,-` eenmalig excl. BTW)**, vergelijkingstabel, **Meerjaren TCO-Calculator**, FAQ en het Demo-/Offerteformulier rekenen de 2e vakmodule direct door. |

---

## 2. Lokaal Bekijken of Publiceren

1. **Direct lokaal testen:**
   ```bash
   python3 -m http.server 8123 --directory .
   ```
2. **Standalone 1-bestand preview:** `TechBuilds_VR_Website_Open_Direct_In_Browser.html` bundelt alle 7 pagina's, lokale fonts, officiële SVG-logo's en geoptimaliseerde WebP-afbeeldingen in één zelfstandig `.html`-bestand.
3. **GitHub Pages & Custom Domain (`www.techbuildsvr.nl`):** `CNAME` en `.nojekyll` zijn standaard aanwezig in de hoofdmap voor directe uitrol op `erikmwsen-design/techbuilds-vr` (`main`).
4. **Verplichte `AC24` Onderwijs- & Veiligheidsdisclaimer:** Op alle 7 pagina's en in het printbare A4-vrijgaverapport verankerd.
