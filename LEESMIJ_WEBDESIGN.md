# TechBuilds VR — Publieke Website (`webdesign` v2.5)

**Merknaam:** TechBuilds VR  
**Tagline:** *Veilig trainen. Vakbekwaam bouwen.*  
**Domein & E-mail:** `https://www.techbuildsvr.nl` · `info@techbuildsvr.nl`  
**Positionering:** Rustige, overzichtelijke voorpagina (*Less is more* / KISS), algemene VR-praktijkvoorbereidingen volgens Nederlandse en Europese veiligheidsrichtlijnen (géén merk- of typespecifieke knoppencursussen), heldere opbouw van de **3 onderdelen bij Draaibank VR** (inclusief de knop **‘Hulp nodig’ rechtsboven in VR**) en het vernieuwde **Docent Dashboard `v2.4.0`** (lichte Blueprint-weergave in 3 tabbladen) voor zowel **mobiele VR-kar** als **losse docenttablet**.  
**Vormgeving:** Heldere afgeronde vlakken in de officiële TechBuilds VR *Engineering Blue* huisstijl (`#0B5ED7` Engineering Cobalt, `#0849AC` Cobalt Hover, `#0B192C` Deep Steel Navy, `#122640` Machined Navy, `#F2F6FA` Blueprint Paper, `#FFFFFF` Pure Surface)

---

## 1. Overzicht van de pagina's

Deze map bevat de volledige, zelfstandige website in **HTML5, CSS en JavaScript** (inclusief lokale lettertypen `Space Grotesk`, `Inter` en `JetBrains Mono`, officiële `.svg`-logo's in `assets/img/logo/`, geoptimaliseerde `.webp`-werkplaats- en dashboardbeelden, PDF-productblad, `CNAME` en `.nojekyll`). Alle teksten en schermafbeeldingen zijn geschreven in natuurlijk, helder Nederlands voor vakdocenten, teamleiders en praktijkopleiders — 100% vrij van externe merknamen of intern ontwikkeljargon.

| Bestand | Inhoud |
| :--- | :--- |
| `index.html` | **Over ons (`1e menu-item`, KISS-indeling):** Overzichtelijke en rustige landingspagina met één duidelijke introductie, **de 3 onderdelen die een student doorloopt bij de draaibank-app** (*1. De Buddy Check*, *2. Voorbereiden & veiligheid*, *3. Praktijkgebruik met 5 werkstukken*) en de **keuze voor school tussen mobiele VR-kar of losse docenttablet** met het nieuwe lichte **Docent Dashboard `v2.4.0`** (apps en scenario klaarzetten, pas meekijken zodra de student rechtsboven in VR op *Hulp nodig* tikt, en apps gezamenlijk afsluiten). |
| `modules.html` | **Modules (`2e menu-item`):** Centrale overzichtspagina met snelle keuze tussen **Draaibank VR** (de 3 onderdelen + optionele 2-minuten rondleiding *Wegwijs op de draaibank*), **Elektrotechniek VR** (meterkast, groepenkast en schakelkast), de losse extra module (`+ € 5.000,-` eenmalig excl. BTW) en aanvullende praktijkvoorbereidingen op maat. |
| `training-draaibank.html` | **Draaibank VR — De 3 onderdelen (NL & EU-richtlijnen):** Duidelijke uitwerking van **Onderdeel 1 — De Buddy Check** (inclusief interactieve Voor/Na-vergelijker), **Onderdeel 2 — Voorbereiden & veiligheid** en **Onderdeel 3 — Praktijkgebruik (5 werkstukken)**, inclusief de bijgewerkte VR-schermen met de knop **‘Hulp nodig’ rechtsboven in VR** en aansluiting op Nederlandse en Europese richtlijnen (*Arbobesluit Hoofdstuk 7*, *Machinerichtlijn 2006/42/EG*, *Richtlijn 2009/104/EG*, *EN ISO 23125* en *EN ISO 13850*). |
| `training-elektrotechniek.html` | **Elektrotechniek VR — Meterkast, groepenkast & schakelkast:** Algemene voorbereiding op veilig spanningsloos werken volgens Nederlandse en Europese richtlijnen (*Arbobesluit Hoofdstuk 3*, *NEN 3140*, *EN 50110* en *EN 61243-3*), van geïsoleerd gereedschap en persoonlijk hangslot tot tweepolig nameten met de spanningzoeker en veilig afschermen. |
| `docentapp-tablet.html` | **Docent Dashboard (`3e menu-item`, `v2.4.0`):** Volledige presentatie én live klikbare simulator van het nieuwe lichte **Docent Dashboard `v2.4.0`** in 3 overzichtelijke tabbladen: **1. Klasoverzicht** (`VR-Kar 10`, `VR-Kar 20`, `Losse tablet`, groepsgewijs openen/klaarzetten/sluiten), **2. Leerling & Klaarzetten** (AVG Privacy-by-Design: zonder hulpvraag géén live video, pas na klik op *‘Hulp nodig’* rechtsboven in VR opent 1st-person meekijkbeeld naast de lichte 2D-werktekening) en **3. Vrijgave & A4 Rapport** (5-punts praktijkvrijgave bij de echte draaibank + handtekening met tekenpen + lokaal printen). |
| `maatwerk.html` | **Aanvullende praktijkvoorbereidingen op maat:** Uitleg van het ontwikkeltraject (gemiddeld 6 tot 10 weken) voor aanvullende algemene werkplekvoorbereidingen (zoals freesbank, kolomboormachine, warmtepomp of oefenlijn) volgens NL- en EU-richtlijnen, klaar op hetzelfde Docent Dashboard. |
| `prijzen-contact.html` | **Pakketten en prijzen (`4e menu-item`):** Heldere keuze tussen **Optie 1 Losse docenttablet** (`€ 10.000,-` incl. 1e jaar service, daarna `€ 1.500,-/jr`), **Optie 2 VR-Kar 10** (`€ 15.000,-` + `€ 2.500,-/jr`) en **Optie 3 VR-Kar 20** (`€ 25.000,-` + `€ 3.500,-/jr`), de losse extra module (`+ € 5.000,-` eenmalig excl. BTW), het meerjarenoverzicht, veelgestelde vragen (incl. AVG) en het aanvraagformulier. |

---

## 2. Lokaal bekijken of publiceren

1. **Direct lokaal testen:**
   ```bash
   python3 -m http.server 8123 --directory .
   ```
2. **Zelfstandig 1-bestand overzicht:** `TechBuilds_VR_Website_Open_Direct_In_Browser.html` bundelt alle 7 pagina's, lettertypen, SVG-logo's en afbeeldingen in één direct te openen HTML-bestand.
3. **GitHub Pages (`www.techbuildsvr.nl`):** `CNAME` en `.nojekyll` staan klaar in de hoofdmap voor directe publicatie op `erikmwsen-design/techbuilds-vr` (`main`).
4. **Onderwijs- & veiligheidsmelding (`AC24`):** Op elke pagina, in het PDF-productblad en op het A4-praktijkoverzicht staat duidelijk vermeld dat VR dient als algemene praktijkvoorbereiding en nooit de persoonlijke instructie, begeleiding en vrijgave door een bevoegd vakdocent bij de echte machine of installatie vervangt.
