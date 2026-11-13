# TechBuilds VR — Publieke Website (`webdesign` v2.2)

**Merknaam:** TechBuilds VR  
**Tagline:** *Veilig trainen. Vakbekwaam bouwen.*  
**Domein & E-mail:** `https://www.techbuildsvr.nl` · `info@techbuildsvr.nl`  
**Vormgeving:** Heldere afgeronde tegels in de officiële TechBuilds VR *Engineering Blue* huisstijl (`#0B5ED7` Engineering Cobalt, `#0849AC` Cobalt Hover, `#0B192C` Deep Steel Navy, `#122640` Machined Navy, `#F2F6FA` Blueprint Paper, `#FFFFFF` Pure Surface)

---

## 1. Overzicht van de pagina's

Deze map bevat de volledige, zelfstandige website in **HTML5, CSS en JavaScript** (inclusief lokale lettertypen `Space Grotesk`, `Inter` en `JetBrains Mono`, officiële `.svg`-logo's in `assets/img/logo/`, geoptimaliseerde `.webp`-werkplaatsbeelden, PDF-documentatie, `CNAME` en `.nojekyll`). Alle teksten zijn geschreven in natuurlijk, helder Nederlands voor vakdocenten, teamleiders en praktijkopleiders — zonder intern ontwikkeljargon.

| Bestand | Inhoud |
| :--- | :--- |
| `index.html` | **Over ons (`1e menu-item`):** Overzichtelijk hoofdmenu met 4 onderdelen (`Over ons` · `Modules` · `Teacher Dashboard` · `Pakketten en prijzen`), introductie van TechBuilds VR, overzicht van beide standaardmodules (**Draaibank VR** & **Elektrotechniek VR**) en de drie pakketten. |
| `modules.html` | **Modules (`2e menu-item`):** Centrale overzichtspagina voor alle VR-modules met snelle keuze tussen **Draaibank VR**, **Elektrotechniek VR**, de combinatiekorting/meerprijs voor een extra module (`+ € 5.000,-` eenmalig excl. BTW) en **Maatwerk**. |
| `training-draaibank.html` | **Draaibank VR — WEILER Praktikant 140:** Overzicht van alle zes de onderdelen (van de 3D Buddy Check en veilig opspannen tot draaien op maat, nameten bij stilstand en de noodstop), inclusief Voor/Na-vergelijker. |
| `training-elektrotechniek.html` | **Elektrotechniek VR — Veilig stellen (`NEN 3140` & `Lockout-Tagout`):** Overzicht van alle zes de stappen bij een 400V-verdeelkast en groepenkast (van VDE-gereedschap en vergrendelen met een eigen hangslot tot tweepolig nameten met de Duspol en veilig afschermen). |
| `docentapp-tablet.html` | **Teacher Dashboard (`3e menu-item`):** Uitleg en interactief klikvoorbeeld van de 13,1-inch Samsung-tablet voor de vakdocent (`VR-Kar 10`, `VR-Kar 20` of `Eigen brillen`), inclusief terugkijken en het printbare A4-praktijkrapport met S Pen-handtekening. |
| `maatwerk.html` | **Maatwerk VR-trainingen:** Uitleg van het ontwikkeltraject (gemiddeld 6 tot 10 weken) voor een eigen machine of installatie op school of in het bedrijf, met een kort hulpmiddel om direct een aanvraag klaar te zetten. |
| `prijzen-contact.html` | **Pakketten en prijzen (`4e menu-item`):** Heldere uitleg van **Optie 1** (`€ 10.000,-` incl. 1e jaar service, daarna `€ 1.500,-/jr`), **Optie 2 VR-Kar 10** (`€ 15.000,-` + `€ 2.500,-/jr`) en **Optie 3 VR-Kar 20** (`€ 25.000,-` + `€ 3.500,-/jr`), de losse extra module (`+ € 5.000,-` eenmalig excl. BTW), het meerjarenoverzicht, veelgestelde vragen en het aanvraagformulier. |

---

## 2. Lokaal bekijken of publiceren

1. **Direct lokaal testen:**
   ```bash
   python3 -m http.server 8123 --directory .
   ```
2. **Zelfstandig 1-bestand overzicht:** `TechBuilds_VR_Website_Open_Direct_In_Browser.html` bundelt alle 7 pagina's, lettertypen, SVG-logo's en afbeeldingen in één direct te openen HTML-bestand.
3. **GitHub Pages (`www.techbuildsvr.nl`):** `CNAME` en `.nojekyll` staan klaar in de hoofdmap voor directe publicatie op `erikmwsen-design/techbuilds-vr` (`main`).
4. **Onderwijs- & veiligheidsmelding:** Op elke pagina en op het A4-praktijkrapport staat duidelijk vermeld dat VR dient als veilige voorbereiding en nooit de persoonlijke instructie, begeleiding en vrijgave door een vakdocent bij de echte machine vervangt.
