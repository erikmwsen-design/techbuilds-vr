# TechBuilds VR — Publieke Website (`webdesign` v2.3)

**Merknaam:** TechBuilds VR  
**Tagline:** *Veilig trainen. Vakbekwaam bouwen.*  
**Domein & E-mail:** `https://www.techbuildsvr.nl` · `info@techbuildsvr.nl`  
**Positionering:** Algemene VR-praktijkvoorbereidingen gericht op Nederlandse en Europese veiligheidsrichtlijnen (géén merk- of typespecifieke knoppencursussen), geschreven in helder Nederlands met merkneutrale benamingen van machines, kasten en leermiddelen.  
**Vormgeving:** Heldere afgeronde tegels in de officiële TechBuilds VR *Engineering Blue* huisstijl (`#0B5ED7` Engineering Cobalt, `#0849AC` Cobalt Hover, `#0B192C` Deep Steel Navy, `#122640` Machined Navy, `#F2F6FA` Blueprint Paper, `#FFFFFF` Pure Surface)

---

## 1. Overzicht van de pagina's

Deze map bevat de volledige, zelfstandige website in **HTML5, CSS en JavaScript** (inclusief lokale lettertypen `Space Grotesk`, `Inter` en `JetBrains Mono`, officiële `.svg`-logo's in `assets/img/logo/`, geoptimaliseerde `.webp`-werkplaatsbeelden, PDF-productblad, `CNAME` en `.nojekyll`). Alle teksten zijn geschreven in natuurlijk, helder Nederlands voor vakdocenten, teamleiders en praktijkopleiders — zonder merknamen van derden of intern ontwikkeljargon.

| Bestand | Inhoud |
| :--- | :--- |
| `index.html` | **Over ons (`1e menu-item`):** Overzichtelijk hoofdmenu met 4 onderdelen (`Over ons` · `Modules` · `Teacher Dashboard` · `Pakketten en prijzen`), uitleg waarom wij algemene praktijkvoorbereidingen maken in plaats van typetrainingen, overzicht van **Draaibank VR** & **Elektrotechniek VR** (volgens NL- en EU-richtlijnen) en de drie pakketten. |
| `modules.html` | **Modules (`2e menu-item`):** Centrale overzichtspagina voor alle VR-modules met snelle keuze tussen **Draaibank VR** (conventionele draaibank), **Elektrotechniek VR** (meterkast, groepenkast en schakelkast), de losse extra module (`+ € 5.000,-` eenmalig excl. BTW) en aanvullende praktijkvoorbereidingen op maat. |
| `training-draaibank.html` | **Draaibank VR — Algemene voorbereiding conventionele draaibank:** Opgebouwd rond Nederlandse en Europese richtlijnen (*Arbobesluit Hoofdstuk 7*, *Arbocatalogus*, *Europese Machinerichtlijn 2006/42/EG*, *Richtlijn 2009/104/EG*, *EN ISO 23125* en *EN ISO 13850*). Overzicht van alle zes de onderdelen inclusief Voor/Na-vergelijker. |
| `training-elektrotechniek.html` | **Elektrotechniek VR — Meterkast, groepenkast & schakelkast:** Algemene voorbereiding op veilig spanningsloos werken volgens Nederlandse en Europese richtlijnen (*Arbobesluit Hoofdstuk 3*, *NEN 3140*, *EN 50110* en *EN 61243-3*), van geïsoleerd gereedschap en persoonlijk hangslot tot tweepolig nameten met de spanningzoeker en veilig afschermen. |
| `docentapp-tablet.html` | **Teacher Dashboard (`3e menu-item`):** Uitleg en interactief klikvoorbeeld van de 13,1-inch docenttablet (`VR-Kar 10`, `VR-Kar 20` of `Eigen brillen`), inclusief terugkijken en het printbare A4-praktijkrapport met 5 fysieke controlepunten en handtekeningveld. |
| `maatwerk.html` | **Aanvullende praktijkvoorbereidingen op maat:** Uitleg van het ontwikkeltraject (gemiddeld 6 tot 10 weken) voor aanvullende algemene werkplekvoorbereidingen (zoals freesbank, kolomboormachine, warmtepomp of oefenlijn) volgens NL- en EU-richtlijnen, met direct aanvraagoverzicht. |
| `prijzen-contact.html` | **Pakketten en prijzen (`4e menu-item`):** Heldere uitleg van **Optie 1** (`€ 10.000,-` incl. 1e jaar service, daarna `€ 1.500,-/jr`), **Optie 2 VR-Kar 10** (`€ 15.000,-` + `€ 2.500,-/jr`) en **Optie 3 VR-Kar 20** (`€ 25.000,-` + `€ 3.500,-/jr`), de losse extra module (`+ € 5.000,-` eenmalig excl. BTW), het meerjarenoverzicht, veelgestelde vragen en het aanvraagformulier. |

---

## 2. Lokaal bekijken of publiceren

1. **Direct lokaal testen:**
   ```bash
   python3 -m http.server 8123 --directory .
   ```
2. **Zelfstandig 1-bestand overzicht:** `TechBuilds_VR_Website_Open_Direct_In_Browser.html` bundelt alle 7 pagina's, lettertypen, SVG-logo's en afbeeldingen in één direct te openen HTML-bestand.
3. **GitHub Pages (`www.techbuildsvr.nl`):** `CNAME` en `.nojekyll` staan klaar in de hoofdmap voor directe publicatie op `erikmwsen-design/techbuilds-vr` (`main`).
4. **Onderwijs- & veiligheidsmelding:** Op elke pagina, in het PDF-productblad en op het A4-praktijkrapport staat duidelijk vermeld dat VR dient als algemene praktijkvoorbereiding en nooit de persoonlijke instructie, begeleiding en vrijgave door een bevoegd vakdocent bij de echte machine of installatie vervangt.
