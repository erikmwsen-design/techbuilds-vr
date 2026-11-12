# TechBuilds VR — Volledige Website (`webdesign` v1.1)

**Merknaam:** TechBuilds VR  
**Tagline:** *Veilig trainen. Vakbekwaam bouwen.*  
**Huisstijlversie:** `v1.0 — Engineering Blue` (volledig gebaseerd op `techbuilds-tokens.css`, `Space Grotesk`, `Inter` en `JetBrains Mono`)

---

## 1. Overzicht van de Pagina's

Deze map (`webdesign/`) vormt een 100% zelfstandig, direct te publiceren webpakket zonder externe build-afhankelijkheden (alle lettertypen, `.svg`-logo's, geoptimaliseerde `.webp`-werkplaatsfoto's, in-VR Godot-screenshots en PDF-documentatie zijn lokaal meegeleverd):

| Bestand | Inhoud & Marketingdoel |
| :--- | :--- |
| `index.html` | **Startpagina:** Positionering (*Veilig trainen. Vakbekwaam bouwen.*), de 4 merkankers, interactieve M1–M6 Draaibank VR-verkenner, live 5-slot Regie-Tablet preview, de 4 maatwerkdomeinen en het overzicht van de 3 commerciële pakketten (vanaf € 10.000,- excl. BTW). |
| `training-draaibank.html` | **Standaard VR-Training (WEILER Praktikant 140):** Uitgebreide module-verkenner (`M1` t/m `M6` incl. 3D Buddy Check voor/na-wissel), Twee-Triggers ergonomie, vaste standplaats en volledige mapping op *Arbobesluit Hoofdstuk 7* en de *MBO-instructiekaart*. |
| `docentapp-tablet.html` | **13-inch Samsung Regie-Tablet (Knox MDM) & Android Docenten Dashboard (`v2.3.0`):** Interactieve klaslokaalsimulator (`VR-Kar 10` `2×5`, `VR-Kar 20` `4×5` & `Eigen Brillen Onbeperkt`), live 2D-blauwdruk canvas, 4 Hz Black-Box sessie-replay, Samsung Galaxy Tab S10 FE+ (`IP68`) met Samsung Knox MDM en printbaar **A4 Praktijkbeoordelingsrapport**. |
| `maatwerk.html` | **VR-Trainingen op Maat:** Hoe scholen en bedrijven hun eigen machines, schakelkasten (LOTO / NEN 3140) of productiecellen op dezelfde 13-inch Regie-Tablet / VR-Kar laten nabouwen, het 4-stappen ontwikkelproces én de interactieve **Maatwerk-Scoper**. |
| `prijzen-contact.html` | **Pakketten, Turnkey 5G VR-Kar & Offerte/Demo:** De 3 officiële pakketopties excl. BTW (**Optie 1:** € 10.000,- incl. 1e jr service, daarna € 1.500,-/jr · **Optie 2 Turnkey VR-Kar 10:** € 15.000,- + € 2.500,-/jr · **Optie 3 Turnkey VR-Kar 20:** € 25.000,- + € 3.500,-/jr), Zioxi + KPN Onbeperkt 5G + Wi-Fi 7 architectuur, 3-optie TCO-calculator, offerteformulier en FAQ. |

---

## 2. Mapstructuur

```text
webdesign/
├── index.html
├── training-draaibank.html
├── docentapp-tablet.html
├── maatwerk.html
├── prijzen-contact.html
├── LEESMIJ_WEBDESIGN.md
└── assets/
    ├── css/
    │   ├── techbuilds-tokens.css      # Officiële Engineering Blue design tokens + lokale @font-face
    │   ├── Design_tokens.json         # JSON-bronbestand huisstijl tokens
    │   └── styles.css                 # Volledige Vanilla CSS layout & componenten (incl. @media print)
    ├── fonts/                         # Gebundelde Space Grotesk, Inter & JetBrains Mono (.ttf + OFL)
    ├── img/
    │   ├── logo/                      # Officiële SVG-logo's (LightBG, DarkBG, Icon, Favicons, OG)
    │   ├── brand/                     # Nederlandse MBO/industrie werkplaatsfotografie (.webp)
    │   └── weiler/                    # Echte Godot 4.5 3D- en in-VR opnamen WEILER Praktikant 140 (.webp)
    ├── docs/
    │   ├── Productblad_TechBuilds_VR_v1.1.pdf
    │   └── Merkhandboek_TechBuilds_VR_v1.1.pdf
    └── js/
        └── main.js                    # Interactieve verkenners, 2D-blauwdruk canvas, replay & calculators
```

---

## 3. Lokaal Bekijken of Publiceren

1. **Direct lokaal testen met een webserver:**
   ```bash
   python3 -m http.server 8080 --directory webdesign
   ```
2. **Publiceren (Hosting):** Upload de inhoud van `webdesign/` rechtstreeks naar elke statische host (Netlify, Cloudflare Pages, Vercel, GitHub Pages of eigen Apache/Nginx schoolserver) en koppel in `assets/js/main.js` indien gewenst een eigen formulier-endpoint achter `info@techbuildsvr.nl`.
3. **Verplichte `AC24` Onderwijs- & Veiligheidsverklaring:** Opgenomen op de productpagina's, in het printbare A4-rapport en in de footer conform het TechBuilds VR Merkhandboek.
