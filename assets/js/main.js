/**
 * TechBuilds VR — Interactieve Website Logica (v2.7.0)
 * Onderdelen:
 * 1. Vaste navigatiebalk, leesbalk, mobiele snelbalk, terug-naar-boven & subtiele scroll-animatie
 * 2. Interactieve Hero-tegels & fotowisselaar op het overzicht van VR-applicaties (modules.html)
 * 3. Interactief stappenoverzicht voor Elektrotechniek VR (1–6) én Draaibank VR v2.5.6 (3 onderdelen + sub-views) volgens NL & EU-richtlijnen
 * 4. Interactief Docent Dashboard v2.4.0 (multi-app regie, 10/20/eigen brillen, AVG ‘Hulp nodig’-knop met echte VR-renders + A4-rapport)
 * 5. Vakgebied-wisselaar & Maatwerk-overzicht met directe e-mailkoppeling (maatwerk.html)
 * 6. Pakket- en VR-applicatiekeuze (Elektrotechniek VR eerst, extra app + € 5.000,-), meerjarenoverzicht & aanvraagformulier (prijzen-contact.html)
 */

(function () {
  'use strict';

  if (typeof window.__tbCleanup === 'function') {
    try {
      window.__tbCleanup();
    } catch (_) { /* ignore */ }
  }
  const cleanupFns = [];
  window.__tbCleanup = function () {
    while (cleanupFns.length > 0) {
      const fn = cleanupFns.pop();
      try {
        fn();
      } catch (_) { /* ignore */ }
    }
  };

  function navigateInternal(href) {
    if (typeof window.__tbNavigate === 'function') {
      window.__tbNavigate(href);
    } else {
      window.location.href = href;
    }
  }

  /* ------------------------------------------------------------------
   * 1. Navigatie, Scroll-Progress, Mobiele Snelbalk, Back-to-Top & Reveal
   * ------------------------------------------------------------------ */
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const mobileStickyBar = document.getElementById('mobileStickyBar');
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', function () {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.classList.toggle('is-open', !expanded);
    });
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('is-open');
      });
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));

    if (siteHeader) {
      siteHeader.classList.toggle('is-scrolled', scrollTop > 12);
    }
    if (scrollProgressBar) {
      scrollProgressBar.style.width = pct.toFixed(1) + '%';
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('is-visible', scrollTop > 420);
    }
    if (mobileStickyBar) {
      const formTarget = document.getElementById('aanvraag');
      const footerEl = document.querySelector('.site-footer');
      let hideSticky = false;
      if (formTarget) {
        const r = formTarget.getBoundingClientRect();
        if (r.top < window.innerHeight - 80 && r.bottom > 120) {
          hideSticky = true;
        }
      }
      if (footerEl) {
        const fr = footerEl.getBoundingClientRect();
        if (fr.top < window.innerHeight - 40) {
          hideSticky = true;
        }
      }
      mobileStickyBar.classList.toggle('is-hidden', hideSticky);
    }
  }

  window.addEventListener('scroll', onWindowScroll, { passive: true });
  cleanupFns.push(function () {
    window.removeEventListener('scroll', onWindowScroll);
  });
  onWindowScroll();

  /* Subtiele Scroll-Reveal (uitgeschakeld bij prefers-reduced-motion of HeadlessChrome QA) */
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isHeadless = /HeadlessChrome/i.test(navigator.userAgent || '');
  if (!prefersReducedMotion && !isHeadless && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.section .apple-card, .section .bento-card, .section .step-card, .section .domain-card, .section .official-doc-tile, .section .module-showcase-card, .section .addon-module-tile, .section .part-step-card, .section .school-choice-card'
    );
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

    revealTargets.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.92) {
        el.classList.add('will-reveal');
        revealObserver.observe(el);
      }
    });

    cleanupFns.push(function () {
      revealObserver.disconnect();
    });
  }

  /* ------------------------------------------------------------------
   * 2. Interactieve Hero-Tegels & Fotowisselaar (modules.html)
   * ------------------------------------------------------------------ */
  const HERO_SCENES = {
    praktijklokaal: {
      img: 'assets/img/brand/hero_techbuilds_vr_werkplaats.webp',
      alt: 'Modern technisch praktijklokaal voor elektrotechniek, installatietechniek en mechatronica met studenten in VR en een vakdocent met het Docent Dashboard op de tablet',
      caption: 'Technische VR-applicaties volgens NL- en EU-richtlijnen · geen typetraining · AVG-vriendelijk begeleiden',
      linkText: 'Alle VR-applicaties →',
      linkHref: 'modules.html'
    },
    elektro: {
      img: 'assets/img/elektro/hero_elektro_werkplaats.webp',
      alt: 'Elektrotechnieklokaal waar een student met een VR-bril oefent bij een meterkast en schakelkast',
      caption: 'Elektrotechniek VR (NEN 3140 & EN 50110): veilig afschakelen, vergrendelen en tweepolig 0 V nameten bij meterkast en schakelkast',
      linkText: 'Bekijk Elektrotechniek VR →',
      linkHref: 'training-elektrotechniek.html'
    },
    tablet: {
      img: 'assets/img/dashboard/dashboard_01_klasoverzicht_v2_4.webp',
      alt: 'Tabblad 1 Klasoverzicht van het lichte Docent Dashboard v2.4.0 op de 13,1-inch docenttablet met 10 genummerde brillen en keuze tussen VR-applicaties',
      caption: 'Docent Dashboard v2.4.0: meerdere VR-applicaties klaarzetten, pas meekijken zodra een student rechtsboven in VR op ‘Hulp nodig’ tikt (AVG) en gezamenlijk afsluiten',
      linkText: 'Bekijk het Docent Dashboard →',
      linkHref: 'docentapp-tablet.html#live-simulator'
    },
    modules: {
      img: 'assets/img/draaibank/draaibank_06_vr_keuzemenu_3_onderdelen.webp',
      alt: 'Vernieuwd XL-startmenu in Draaibank VR v2.5.6 met vector-iconen voor 1. De Buddy Check, 2. Voorbereiden en Veiligheid, 3. Gebruik: 5 Objecten en de knop Hulp nodig rechtsboven',
      caption: 'Draaibank VR (v2.5.6): 1. De Buddy Check (1-klik sieraden) · 2. Voorbereiden & noodstop · 3. Praktijkgebruik (5 werkstukken in 2 fasen)',
      linkText: 'Bekijk Draaibank VR →',
      linkHref: 'training-draaibank.html'
    },
    kar: {
      img: 'assets/img/hardware/hardware_02_mobiele_vr_kar_10_en_tablet.webp',
      alt: 'Verrijdbare mobiele VR-Kar 10 met exact 10 opgeladen VR-brillen, één 230V-stekker, ingebouwde 5G-verbinding en de 13,1-inch docenttablet bovenop',
      caption: 'Slechts één gewoon stopcontact nodig · ingebouwde wifi- en 5G-verbinding · los van de school-wifi',
      linkText: 'Bekijk de VR-Karren →',
      linkHref: 'prijzen-contact.html?optie=2#pakket-keuze'
    }
  };

  const heroSceneTriggers = document.querySelectorAll('[data-hero-scene]');
  if (heroSceneTriggers.length > 0) {
    const elHeroImg = document.getElementById('heroStageImg');
    const elHeroCaption = document.getElementById('heroSceneCaption');
    const elHeroLink = document.getElementById('heroSceneLink');
    let currentHeroScene = 'elektro';
    let switchTimer = null;

    function setHeroScene(sceneKey) {
      const sc = HERO_SCENES[sceneKey];
      if (!sc) return;
      currentHeroScene = sceneKey;

      heroSceneTriggers.forEach(function (el) {
        const key = el.getAttribute('data-hero-scene');
        const active = key === sceneKey;
        if (el.classList.contains('bento-metric-tile')) {
          el.classList.toggle('is-active', active);
          el.setAttribute('aria-pressed', String(active));
        } else {
          el.classList.toggle('is-active', active);
          el.setAttribute('aria-selected', String(active));
        }
      });

      if (elHeroImg) {
        elHeroImg.classList.add('is-switching');
        if (switchTimer) clearTimeout(switchTimer);
        switchTimer = setTimeout(function () {
          elHeroImg.src = sc.img;
          elHeroImg.alt = sc.alt;
          elHeroImg.classList.remove('is-switching');
        }, 105);
      }
      if (elHeroCaption) elHeroCaption.textContent = sc.caption;
      if (elHeroLink) {
        elHeroLink.textContent = sc.linkText;
        elHeroLink.setAttribute('href', sc.linkHref);
      }
    }

    heroSceneTriggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetScene = btn.getAttribute('data-hero-scene');
        setHeroScene(targetScene);
      });
    });
  }

  /* ------------------------------------------------------------------
   * 3. Interactief Overzicht Elektrotechniek VR (E1–E6) & Draaibank VR v2.5.6 (3 onderdelen)
   * ------------------------------------------------------------------ */
  const DRAAIBANK_MODULE_ORDER = ['M1', 'M2', 'M3'];
  const DRAAIBANK_MODULES_DATA = {
    M1: {
      code: 'ONDERDEEL 1 · PERSOONLIJKE VEILIGHEID (BUILD V2.5.6)',
      standplaats: 'Persoonlijke veiligheid · Breed 6-tegels scherm rechts',
      title: 'De Buddy Check (handschoenen uit & 1-klik sieraden)',
      summary: 'Voordat een student in de buurt van een draaibank komt, controleert hij of zij op het brede 16:10 scherm rechts eerst een medestudent in 3D en brengt daarna de eigen PBM op orde: oranje werkhandschoenen verplicht uittrekken bij Stap 5 en oorbellen, polshorloge en ringen bij Stap 6 met één klik in het bakje Sieraden leggen.',
      image: 'assets/img/draaibank/draaibank_00b_buddy_check_compleet.webp',
      altImage: 'assets/img/draaibank/draaibank_00a_buddy_check_start.webp',
      caption: 'Na de controle (v2.5.6): medestudent gecorrigeerd, werkhandschoenen uit bij Stap 5, oorbellen/horloge/ringen met 1 klik in Sieraden bij Stap 6 en eigen veiligheidsbril op.',
      altCaption: 'Start van Onderdeel 1 (v2.5.6): 6-tegels scherm rechts, medestudent met los haar en open mouwen, en speler start met oranje werkhandschoenen aan en 3D sieraden om.',
      hasBuddyToggle: true,
      hasObjectsBox: false,
      gateSafeMsg: 'punten in orde — Student mag door naar Onderdeel 2 bij de draaibank',
      gateWarnMsg: 'punten gecontroleerd — Vink alle 4 de veiligheidspunten aan voor toegang tot Onderdeel 2',
      telRpm: 'Stilstand · 6 tegels',
      telTol: 'Arbobesluit & 1-klik sieraden',
      telPos: 'Rechts 16:10 scherm',
      subViews: [
        {
          img: 'assets/img/draaibank/draaibank_00b_buddy_check_compleet.webp',
          label: 'Na controle (6/6 gereed)',
          caption: 'Na de controle (v2.5.6): medestudent gecorrigeerd, werkhandschoenen uit, oorbellen/horloge/ringen met 1 klik in Sieraden en eigen veiligheidsbril op.',
          state: 'after'
        },
        {
          img: 'assets/img/draaibank/draaibank_00a_buddy_check_start.webp',
          label: 'Start (handschoenen & sieraden aan)',
          caption: 'Start van Onderdeel 1 (v2.5.6): 6-tegels scherm rechts, oranje werkhandschoenen nog aan en subtiele gouden oorbellen, polshorloge en ringen zichtbaar.',
          state: 'before'
        }
      ],
      checks: [
        'Medestudent van top tot teen nalopen op loshangend haar, losse mouwen, sieraden en open schoenen via het brede 6-tegels scherm rechts',
        'Bij Stap 5 verplicht de eigen oranje werkhandschoenen uittrekken (intrekgevaar) en bij Stap 6 oplichtende 3D oorbellen, polshorloge en ringen met 1 klik op Sieraden afleggen',
        'Eigen veiligheidsbril opzetten; pas wanneer alle 6 tegels groen zijn, gaat de student door naar de draaibank'
      ]
    },
    M2: {
      code: 'ONDERDEEL 2 · OPBOUWEN, INTERLOCK & NOODSTOP (BUILD V2.5.6)',
      standplaats: 'Compacte draaibank · Zittend of staand oefenen',
      title: 'Voorbereiden & veiligheidstraining',
      summary: 'Recht voor de compacte draaibank — met volledig vrij zicht op het 16:10 6-tegels instructiescherm rechts en gespiegelde 3D VR-controllers — oefent de student het veilig vrijmaken, opspannen en ingrijpen volgens (EU) 2023/1230, EN ISO 23125 en EN ISO 13850.',
      image: 'assets/img/draaibank/draaibank_05_vr_veiligheidsstop_m6.webp',
      caption: 'Onderdeel 2 — Stap 5 (v2.5.6): bank vrijgemaakt, sleutel in houder, kap gesloten, 500 RPM proefdraaien en direct op de rode noodstop drukken bij zichtbare slingering.',
      hasBuddyToggle: false,
      hasObjectsBox: false,
      telRpm: '500 RPM → Noodstop',
      telTol: '(EU) 2023/1230 & ISO 23125',
      telPos: 'Zittend of staand',
      subViews: [
        {
          img: 'assets/img/draaibank/draaibank_05_vr_veiligheidsstop_m6.webp',
          label: 'Stap 5 · Slingering & noodstop',
          caption: 'Onderdeel 2 — Stap 5 (v2.5.6): proefdraaien op 500 RPM en direct op de noodstop drukken zodra het werkstuk zichtbaar slingert.'
        },
        {
          img: 'assets/img/draaibank/draaibank_02_vr_werkplaats_overzicht.webp',
          label: 'Werkplek & 3D-controllers',
          caption: 'Onderdeel 2 — Overzicht (v2.5.6): compacte draaibank met vrij zicht op het 16:10 6-tegels scherm rechts en gespiegelde 3D-controllers (zittend of staand).'
        },
        {
          img: 'assets/img/draaibank/draaibank_01_machine_3d_model.webp',
          label: '3D Draaibank & interlocks',
          caption: 'Onderdeel 2 — Close-up (v2.5.6): drieklauwplaat met beschermkap-interlock, klauwplaatsleutelhouder, noodstop en handwielen met schaalverdeling.'
        }
      ],
      checks: [
        'Los gereedschap van het machinebed halen, vrij zicht op het 6-tegels instructiescherm rechts houden en het werkstuk spanningsloos kort opspannen',
        'De klauwplaatsleutel direct terug in de houder plaatsen en de beschermkap sluiten (anders start de draaibank niet)',
        'Comfortabel zittend of staand oefenen met gespiegelde 3D-controllers, 500 RPM instellen en direct de noodstop indrukken bij slingering'
      ]
    },
    M3: {
      code: 'ONDERDEEL 3 · VERPLICHTE 2-FASEN OPBOUW (BUILD V2.5.6)',
      standplaats: '5 werkstukken · Fase 1/2 Check + Fase 2/2 Draaien & Meten',
      title: 'Praktijkgebruik: 5 werkstukken in 2 fasen',
      summary: 'In Onderdeel 3 start élk van de vijf werkstukken (3.1 t/m 3.5) bewust op een onvoorbereide draaibank met Fase 1/2 — Voorbereidende check (verplicht), gevolgd door Fase 2/2 — Object draaien, volledige stilstand (0 RPM) afwachten en nameten met de 3D-schuifmaat en 2,5× Nonius-loep.',
      image: 'assets/img/draaibank/draaibank_03_vr_trapdraaien_werktekening.webp',
      caption: 'Onderdeel 3 — Fase 2/2 (v2.5.6): na de verplichte voorbereidende check draait de student het werkstuk volgens de live werktekening op het 16:10 scherm rechts.',
      hasBuddyToggle: false,
      hasObjectsBox: true,
      telRpm: 'Fase 1/2 + 2/2 → 0 RPM',
      telTol: '3D Schuifmaat + 2,5× loep',
      telPos: '5 werkstukken · AVG',
      subViews: [
        {
          img: 'assets/img/draaibank/draaibank_03_vr_trapdraaien_werktekening.webp',
          label: 'Fase 2/2 · Trapdraaien & tekening',
          caption: 'Onderdeel 3 — Fase 2/2 (v2.5.6): werken met handwielen, schaalverdeling en live werktekening nadat Fase 1/2 (voorbereidende check) groen is afgerond.'
        },
        {
          img: 'assets/img/draaibank/draaibank_04_vr_schuifmaat_nameten.webp',
          label: '0 RPM · 3D Schuifmaat + 2,5× loep',
          caption: 'Onderdeel 3 — Nameten (v2.5.6): pas bij 0 RPM stilstand opent de kap en meet de student bij de klauwplaat na met de 3D-schuifmaat en 2,5× Nonius-loep.'
        },
        {
          img: 'assets/img/draaibank/draaibank_07_vr_vijf_objecten.webp',
          label: 'XL Keuzemenu · 5 werkstukken',
          caption: 'Onderdeel 3 — XL Keuzescherm (v2.5.6): keuze uit de 5 oplopende praktijkwerkstukken (3.1 Gladde Paspen t/m 3.5 Centerpen met storing).'
        }
      ],
      checks: [
        'Elk werkstuk begint verplicht met Fase 1/2 — Voorbereidende check (6 tegels op een onvoorbereide bank), zodat veilig voorbereiden een vaste gewoonte wordt',
        'In Fase 2/2 draait de student het gekozen werkstuk volgens de werktekening en wacht rustig tot de klauwplaat volledig stilstaat (0 RPM)',
        'Nauwkeurig nameten bij de klauwplaat met de 3D-schuifmaat en 2,5× Nonius-loep, en spanen veilig verwijderen met spanenhaak en kwast'
      ]
    }
  };

  const ELEKTRO_MODULE_ORDER = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
  const ELEKTRO_MODULES_DATA = {
    E1: {
      code: 'ONDERDEEL 1 · VOORBEREIDING & GEREEDSCHAP',
      standplaats: 'Voorbereiding · Meterkast nog dicht',
      title: 'Buddy Check & geïsoleerd gereedschap (1000V)',
      summary: 'Voordat een meterkast, groepenkast of schakelkast opengaat, controleert de student een klasgenoot op sieraden en open kleding en kijkt hij zijn eigen beschermingsmiddelen, geïsoleerde gereedschap en hangslot na.',
      image: 'assets/img/elektro/elektro_00b_buddy_check_na.webp',
      altImage: 'assets/img/elektro/elektro_00a_buddy_check_voor.webp',
      caption: 'Na de controle: horloge af, mouwen dicht, veiligheidsbril op en geïsoleerde 1000V-set gecontroleerd.',
      altCaption: 'Vóór de controle: metalen horloge om, opgerolde mouwen, bril nog op tafel en geen persoonlijk hangslot.',
      hasBuddyToggle: true,
      gateSafeMsg: 'punten in orde — Leerling mag door naar de meterkast en schakelkast',
      gateWarnMsg: 'punten gecontroleerd — Vink alle 4 de punten aan voor toegang tot de kast',
      telRpm: 'Werkbank · Kast dicht',
      telTol: 'NEN 3140 & EN 50110',
      telPos: 'Vaste plek · 2 knoppen',
      checks: [
        'Klasgenoot controleren op metalen horloge, ringen, kettingen en openstaande mouwen',
        'Eigen veiligheidsbril of gelaatsscherm opzetten en kijken of de isolatie van het gereedschap (1000V) onbeschadigd is',
        'Persoonlijk hangslot met naamkaart en gekeurde tweepolige spanningzoeker klaarleggen'
      ]
    },
    E2: {
      code: 'ONDERDEEL 2 · SCHEMA & WERKPLEK',
      standplaats: 'Bij de meterkast & groepenkast',
      title: 'Installatieschema lezen en werkplek controleren',
      summary: 'Voor de meterkast of schakelkast vergelijkt de student het installatieschema en de groepenverklaring met de groepen in de kast en controleert hij of de vloer droog en vrij van obstakels is.',
      image: 'assets/img/elektro/elektro_03_afschermen_schema.webp',
      caption: 'Het installatieschema in de kastdeur vergelijken met de hoofdschakelaar en de juiste groep.',
      hasBuddyToggle: false,
      telRpm: 'Kast nog in bedrijf',
      telTol: 'Arbobesluit Hfdst. 3',
      telPos: 'Droge, vrije vloer',
      checks: [
        'Het installatieschema en de groepenverklaring lezen om de juiste groep en eventuele terugvoeding te herkennen',
        'Controleren of de vloer droog is en er voldoende veilige werkruimte rond de meterkast of schakelkast is',
        'Afstemmen met de vakdocent of werkverantwoordelijke voordat de voeding wordt uitgeschakeld'
      ]
    },
    E3: {
      code: 'ONDERDEEL 3 · SCHEIDEN & VERGRENDELEN',
      standplaats: 'Hoofdschakelaar & eigen hangslot',
      title: 'Volledig scheiden en vergrendelen tegen herinschakelen',
      summary: 'Volgens de vaste stappen uit NEN 3140 en EN 50110 schakelt de student eerst de belasting af, zet de hoofdschakelaar op nul en plaatst direct een vergrendelbeugel met eigen hangslot en waarschuwingskaart.',
      image: 'assets/img/elektro/elektro_01_loto_vergrendelen.webp',
      caption: 'Veilig vergrendelen in VR: hoofdschakelaar op 0 en geborgd met beugel, persoonlijk hangslot en naamkaart.',
      hasBuddyToggle: false,
      telRpm: 'Schakelaar op 0 (UIT)',
      telTol: 'NEN 3140 · Stap 1 & 2',
      telPos: 'Sleutel bij student',
      checks: [
        'Eerst de afgaande groepen of belasting uitschakelen en daarna rustig de hoofdschakelaar op 0 zetten',
        'Vergrendelbeugel, persoonlijk hangslot en naamkaart plaatsen zodat niemand de groepenkast per ongeluk inschakelt',
        'Wie zonder vergrendeling in de kast wil werken, krijgt direct een rustige melding met uitleg waarom dat onveilig is'
      ]
    },
    E4: {
      code: 'ONDERDEEL 4 · TWEEPOLIG NAMETEN',
      standplaats: 'Klemmenstrook & groepen',
      title: 'Spanningsloosheid aantonen met een tweepolige spanningzoeker',
      summary: 'Nooit vertrouwen op een enkelpolig fittingschroevendraaiertje of een lampje op de kast: de student voert de volledige controle uit met een tweepolige spanningzoeker volgens EN 61243-3.',
      image: 'assets/img/elektro/elektro_02_tweepolig_meten.webp',
      caption: 'Tweepolige meting met de spanningzoeker tussen fase, nul en aarde toont duidelijk 0 V aan.',
      hasBuddyToggle: false,
      telRpm: '0 V (alle geleiders)',
      telTol: 'EN 61243-3 · Voor/na-test',
      telPos: 'Tweepolige meter',
      checks: [
        'Eerst de tweepolige spanningzoeker testen op een bekende spanningsbron om zeker te weten dat het instrument werkt',
        'Tweepolig meten tussen alle fasen onderling, tussen elke fase en nul én tussen elke fase en aarde',
        'Direct daarna opnieuw testen op de bekende spanningsbron zodat zeker is dat de meter tijdens het meten intact bleef'
      ]
    },
    E5: {
      code: 'ONDERDEEL 5 · TERUGVOEDING & AFSCHERMEN',
      standplaats: 'Naastgelegen actieve delen',
      title: 'Rekening houden met terugvoeding en delen afschermen',
      summary: 'Zitten er in de meterkast of schakelkast nog naastgelegen rails, zonnepaneelgroepen of voedingen waar spanning op kan staan? Dan schermt de student die aanrakingsveilig af met isolatieplaten.',
      image: 'assets/img/elektro/elektro_03_afschermen_schema.webp',
      caption: 'Plaatsen van een isolerende afschermplaat over naastgelegen delen met isolerende handschoenen (1000V).',
      hasBuddyToggle: false,
      telRpm: '0 V · Veilig afgeschermd',
      telTol: 'EN 50110 · Stap 4 & 5',
      telPos: 'Isolatieplaat geplaatst',
      checks: [
        'Controleren op mogelijke terugvoeding vanuit bijvoorbeeld zonnepanelen, accu-opslag of noodstroom',
        'Isolerende afschermplaten plaatsen voor naastgelegen delen die onder spanning blijven',
        'De werkplek overzichtelijk en aanrakingsveilig klaarzetten voor de werkzaamheden'
      ]
    },
    E6: {
      code: 'ONDERDEEL 6 · AFRONDEN & PRAKTIJKVRIJGAVE',
      standplaats: 'Eindcontrole & overdracht',
      title: 'Gereedschap natellen, slot verwijderen en samen vrijgeven',
      summary: 'Na afloop kijkt de student of er geen gereedschap in de kast is achtergebleven, brengt alle afdekkingen terug aan, verwijdert zijn eigen hangslot en bespreekt het praktijkrapport met de vakdocent.',
      image: 'assets/img/elektro/elektro_01_loto_vergrendelen.webp',
      caption: 'Veilige afronding: meterkast of schakelkast gecontroleerd, eigen slot verwijderd en klaar voor controle door de docent.',
      hasBuddyToggle: false,
      telRpm: 'Klaar voor vrijgave',
      telTol: 'Kast compleet & dicht',
      telPos: 'A4-rapport op tablet',
      checks: [
        'Rustig stoppen en direct melden als tijdens het werk een beschadigde ader of onverwachte spanning opvalt',
        'Controleren dat al het gereedschap uit de kast is en alle aanrakingsbescherming weer vastzit',
        'Alleen het eigen hangslot weghalen en bij de echte meterkast of schakelkast de vijf praktijkpunten nalopen met de docent'
      ]
    }
  };

  const moduleTabs = document.querySelectorAll('[data-module-tab]');
  if (moduleTabs.length > 0) {
    const studioSec = document.getElementById('module-studio');
    const isElektroStudio = Boolean(
      (studioSec && studioSec.getAttribute('data-studio-domain') === 'elektro') ||
      document.querySelector('[data-module-tab="E1"]')
    );
    const MODULE_ORDER = isElektroStudio ? ELEKTRO_MODULE_ORDER : DRAAIBANK_MODULE_ORDER;
    const MODULES_DATA = isElektroStudio ? ELEKTRO_MODULES_DATA : DRAAIBANK_MODULES_DATA;
    const FIRST_MOD_KEY = MODULE_ORDER[0];

    let activeModKey = FIRST_MOD_KEY;
    let m1State = 'after';
    let activeSubViewIdx = 0;

    const elStepCounter = document.getElementById('modStepCounter');
    const elStandplaatsHint = document.getElementById('modStandplaatsHint');
    const elProgressFill = document.getElementById('modProgressFill');
    const btnPrevModule = document.getElementById('btnPrevModule');
    const btnNextModule = document.getElementById('btnNextModule');

    const elCode = document.getElementById('modViewCode');
    const elTitle = document.getElementById('modViewTitle');
    const elSummary = document.getElementById('modViewSummary');
    const elImg = document.getElementById('modViewImg');
    const elSubViewBar = document.getElementById('modSubViewBar');
    const elCaption = document.getElementById('modViewCaption');
    const elTelRpm = document.getElementById('modTelRpm');
    const elTelTol = document.getElementById('modTelTol');
    const elTelPos = document.getElementById('modTelPos');
    const elChecks = document.getElementById('modViewChecks');
    const elM1Box = document.getElementById('m1BuddyInspector');
    const elM3Box = document.getElementById('m3ObjectsInspector');
    const btnM1Before = document.getElementById('btnM1StateBefore');
    const btnM1After = document.getElementById('btnM1StateAfter');
    const m1Chips = document.querySelectorAll('[data-m1-chip]');
    const elM1GateBanner = document.getElementById('m1GateBanner');
    const jumpModuleBtns = document.querySelectorAll('[data-jump-module]');

    function renderSubViews(m) {
      if (!elSubViewBar) return;
      if (!m || !Array.isArray(m.subViews) || m.subViews.length === 0) {
        elSubViewBar.style.display = 'none';
        elSubViewBar.innerHTML = '';
        return;
      }
      elSubViewBar.style.display = 'flex';
      elSubViewBar.innerHTML = m.subViews.map(function (sv, idx) {
        const isAct = idx === activeSubViewIdx;
        return (
          '<button type="button" class="studio-subview-pill' + (isAct ? ' is-active' : '') + '" data-subview-idx="' + idx + '">' +
            sv.label +
          '</button>'
        );
      }).join('');

      elSubViewBar.querySelectorAll('[data-subview-idx]').forEach(function (pill) {
        pill.addEventListener('click', function () {
          const idx = parseInt(pill.getAttribute('data-subview-idx'), 10) || 0;
          const sv = m.subViews[idx];
          if (!sv) return;
          activeSubViewIdx = idx;
          if (sv.state && activeModKey === FIRST_MOD_KEY) {
            m1State = sv.state;
            m1Chips.forEach(function (c) {
              c.classList.toggle('is-checked', sv.state === 'after');
            });
            syncM1View();
          } else {
            if (elImg) elImg.src = sv.img;
            if (elCaption) elCaption.textContent = sv.caption;
            renderSubViews(m);
          }
        });
      });
    }

    function syncM1View() {
      const m = MODULES_DATA[FIRST_MOD_KEY];
      const checkedCount = Array.from(m1Chips).filter(function (c) {
        return c.classList.contains('is-checked');
      }).length;
      const totalChips = m1Chips.length || 4;
      const isBefore = m1State === 'before';

      if (Array.isArray(m.subViews) && m.subViews.length >= 2) {
        activeSubViewIdx = isBefore ? 1 : 0;
      }

      if (elImg && activeModKey === FIRST_MOD_KEY) {
        elImg.src = isBefore ? m.altImage : m.image;
      }
      if (elCaption && activeModKey === FIRST_MOD_KEY) {
        elCaption.textContent = isBefore ? m.altCaption : m.caption;
      }
      if (btnM1Before && btnM1After) {
        btnM1Before.classList.toggle('is-active', isBefore);
        btnM1Before.setAttribute('aria-selected', String(isBefore));
        btnM1After.classList.toggle('is-active', !isBefore);
        btnM1After.setAttribute('aria-selected', String(!isBefore));
      }
      if (elM1GateBanner) {
        if (!isBefore && checkedCount === totalChips) {
          elM1GateBanner.className = 'm1-gate-banner is-safe';
          elM1GateBanner.textContent = '✓ ' + checkedCount + '/' + totalChips + ' ' + m.gateSafeMsg;
        } else {
          elM1GateBanner.className = 'm1-gate-banner is-open';
          elM1GateBanner.textContent = '⚠ ' + checkedCount + '/' + totalChips + ' ' + m.gateWarnMsg;
        }
      }
      if (activeModKey === FIRST_MOD_KEY) {
        renderSubViews(m);
      }
    }

    function renderModule(key) {
      const m = MODULES_DATA[key];
      if (!m) return;
      activeModKey = key;
      activeSubViewIdx = (key === FIRST_MOD_KEY && m1State === 'before' && Array.isArray(m.subViews) && m.subViews.length >= 2) ? 1 : 0;
      const idx = MODULE_ORDER.indexOf(key);
      const stepNum = idx >= 0 ? idx + 1 : 1;

      moduleTabs.forEach(function (btn) {
        const selected = btn.getAttribute('data-module-tab') === key;
        btn.setAttribute('aria-selected', String(selected));
        btn.classList.toggle('is-active', selected);
      });
      jumpModuleBtns.forEach(function (jb) {
        jb.classList.toggle('is-active', jb.getAttribute('data-jump-module') === key);
      });

      if (elStepCounter) elStepCounter.textContent = 'Onderdeel ' + stepNum + ' van ' + MODULE_ORDER.length;
      if (elStandplaatsHint) elStandplaatsHint.textContent = m.standplaats;
      if (elProgressFill) {
        elProgressFill.style.width = ((stepNum / MODULE_ORDER.length) * 100).toFixed(2) + '%';
      }

      if (elCode) elCode.textContent = m.code;
      if (elTitle) elTitle.textContent = m.title;
      if (elSummary) elSummary.textContent = m.summary;
      if (elImg) {
        elImg.src = (key === FIRST_MOD_KEY && m1State === 'before') ? m.altImage : m.image;
        elImg.alt = m.title;
      }
      if (elCaption) {
        elCaption.textContent = (key === FIRST_MOD_KEY && m1State === 'before') ? m.altCaption : m.caption;
      }
      if (elTelRpm) elTelRpm.textContent = m.telRpm;
      if (elTelTol) elTelTol.textContent = m.telTol;
      if (elTelPos) elTelPos.textContent = m.telPos;
      if (elChecks) {
        elChecks.innerHTML = m.checks.map(function (c) {
          return '<li>' + c + '</li>';
        }).join('');
      }
      if (elM1Box) {
        elM1Box.style.display = m.hasBuddyToggle ? 'block' : 'none';
      }
      if (elM3Box) {
        elM3Box.style.display = m.hasObjectsBox ? 'block' : 'none';
      }
      if (key === FIRST_MOD_KEY) {
        syncM1View();
      } else {
        renderSubViews(m);
      }
    }

    function stepModule(delta) {
      const curIdx = MODULE_ORDER.indexOf(activeModKey);
      const nextIdx = (curIdx + delta + MODULE_ORDER.length) % MODULE_ORDER.length;
      renderModule(MODULE_ORDER[nextIdx]);
    }

    moduleTabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        renderModule(btn.getAttribute('data-module-tab'));
      });
    });

    jumpModuleBtns.forEach(function (jb) {
      jb.addEventListener('click', function () {
        const mod = jb.getAttribute('data-jump-module');
        renderModule(mod);
        const studioEl = document.getElementById('module-studio');
        if (studioEl) {
          studioEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    if (btnPrevModule) {
      btnPrevModule.addEventListener('click', function () {
        stepModule(-1);
      });
    }
    if (btnNextModule) {
      btnNextModule.addEventListener('click', function () {
        stepModule(1);
      });
    }

    function onModuleKeyDown(ev) {
      const tag = (ev.target && ev.target.tagName) ? ev.target.tagName.toUpperCase() : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (ev.key === 'ArrowLeft') {
        stepModule(-1);
      } else if (ev.key === 'ArrowRight') {
        stepModule(1);
      }
    }
    document.addEventListener('keydown', onModuleKeyDown);
    cleanupFns.push(function () {
      document.removeEventListener('keydown', onModuleKeyDown);
    });

    if (btnM1Before && btnM1After) {
      btnM1Before.addEventListener('click', function () {
        m1State = 'before';
        m1Chips.forEach(function (c) { c.classList.remove('is-checked'); });
        syncM1View();
      });
      btnM1After.addEventListener('click', function () {
        m1State = 'after';
        m1Chips.forEach(function (c) { c.classList.add('is-checked'); });
        syncM1View();
      });
    }

    if (m1Chips.length > 0) {
      m1Chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chip.classList.toggle('is-checked');
          const allChecked = Array.from(m1Chips).every(function (c) {
            return c.classList.contains('is-checked');
          });
          m1State = allChecked ? 'after' : 'before';
          syncM1View();
        });
      });
    }

    const modParams = new URLSearchParams(window.location.search);
    const initialMod = modParams.get('module');
    renderModule(MODULES_DATA[initialMod] ? initialMod : FIRST_MOD_KEY);
  }

  /* ------------------------------------------------------------------
   * 4. Docent Dashboard v2.4.0 (Lichte Blueprint-UI · Multi-App · 3 Tabbladen · AVG ‘Hulp nodig’)
   * ------------------------------------------------------------------ */
  const DD_HERO_SHOTS = {
    '1': {
      img: 'assets/img/dashboard/dashboard_01_klasoverzicht_v2_4.webp',
      alt: 'Tabblad 1 Klasoverzicht van het lichte Docent Dashboard v2.4.0 met 10 genummerde VR-brillen (Bril 01 t/m Bril 10), keuze uit Elektrotechniek VR en Draaibank VR en oranje melding bij Hulp nodig',
      caption: '<strong>Tab 1 — Klasoverzicht (Bril 01 t/m 10):</strong> VR-applicaties openen, een oefening klaarzetten voor de groep en direct zien wie rechtsboven in VR op ‘Hulp nodig’ tikt.'
    },
    '2': {
      img: 'assets/img/dashboard/dashboard_02_avg_zelfstudie_klaarzetten_v2_4.webp',
      alt: 'Tabblad 2 Leerling en Klaarzetten met 10 genummerde brillen in AVG-zelfstudiemodus zonder live videobeeld zolang de student niet op Hulp nodig heeft getikt',
      caption: '<strong>Tab 2a — Zelfstandig (AVG):</strong> geen ongevraagde videostream; de docent ziet per brilnummer (01–10) alleen het actieve onderdeel en zet VR-applicaties klaar.'
    },
    '3': {
      img: 'assets/img/dashboard/dashboard_03_live_meekijken_hulp_nodig_v2_4.webp',
      alt: 'Tabblad 2 Live meekijken geopend nadat de student rechtsboven in VR op Hulp nodig tikte, met 1e-persoons VR-beeld naast het 2D-schema of de werktekening',
      caption: '<strong>Tab 2b — Na ‘Hulp nodig’ in VR:</strong> live 1e-persoons VR-beeld (max. 1 bril tegelijk) naast het 2D-schema of de werktekening en groene knop ‘Hulp afgerond’.'
    },
    '4': {
      img: 'assets/img/dashboard/dashboard_04_vrijgave_a4_rapport_v2_4.webp',
      alt: 'Tabblad 3 Vrijgave en A4 Rapport met geoefende onderdelen, 5-punts controlelijst voor de echte installatie of machine, handtekeningveld voor de tekenpen en A4-voorbeeld',
      caption: '<strong>Tab 3 — Vrijgave &amp; A4 Rapport:</strong> geoefende onderdelen en 5 vaste veiligheidspunten bij de echte kast of machine nalopen, ondertekenen met de tekenpen en lokaal printen.'
    }
  };

  const ddShotBtns = document.querySelectorAll('[data-dd-shot]');
  if (ddShotBtns.length > 0) {
    const elDdHeroImg = document.getElementById('ddHeroShotImg');
    const elDdHeroCap = document.getElementById('ddHeroShotCaption');
    let ddHeroTimer = null;

    ddShotBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-dd-shot');
        const shot = DD_HERO_SHOTS[key];
        if (!shot) return;

        ddShotBtns.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });

        if (elDdHeroImg) {
          elDdHeroImg.classList.add('is-switching');
          if (ddHeroTimer) clearTimeout(ddHeroTimer);
          ddHeroTimer = setTimeout(function () {
            elDdHeroImg.src = shot.img;
            elDdHeroImg.alt = shot.alt;
            elDdHeroImg.classList.remove('is-switching');
          }, 95);
        }
        if (elDdHeroCap) {
          elDdHeroCap.innerHTML = shot.caption;
        }
      });
    });
  }

  const cockpitRoot = document.getElementById('docentCockpitSim');
  if (cockpitRoot) {
    const DD_EXERCISES = {
      EL_1: {
        key: 'EL_1',
        domain: 'elektro',
        short: 'Elektro · 1. Buddy Check',
        title: 'Elektrotechniek VR · 1. Buddy Check & 1000V-set',
        vrImg: 'assets/img/elektro/elektro_00b_buddy_check_na.webp',
        voltageV: 230,
        circuitCode: 'Q4 · KRACHTGROEP 400/230 V',
        note: 'Sieraden en horloge afdoen, veiligheidsbril opzetten en het 1000V-geïsoleerde gereedschap plus de tweepolige spanningzoeker vooraf controleren (NEN 3140).'
      },
      EL_3: {
        key: 'EL_3',
        domain: 'elektro',
        short: 'Elektro · 3. Vergrendelen (LOTO)',
        title: 'Elektrotechniek VR · 3. Scheiden & vergrendelen (LOTO)',
        vrImg: 'assets/img/elektro/elektro_01_loto_vergrendelen.webp',
        voltageV: 0,
        circuitCode: 'Q0 + Q4 · HOOFDSCHAKELAAR 0 + HANGSLOT',
        note: 'Belasting rustig afschakelen, de juiste groep en hoofdschakelaar op 0 zetten en direct vergrendelen met persoonlijk hangslot en naamkaart (EN 50110).'
      },
      EL_4: {
        key: 'EL_4',
        domain: 'elektro',
        short: 'Elektro · 4. Tweepolig 0 V',
        title: 'Elektrotechniek VR · 4. Tweepolig nameten (0 V)',
        vrImg: 'assets/img/elektro/elektro_02_tweepolig_meten.webp',
        voltageV: 0,
        circuitCode: 'Q4 · L1-L2-L3-N-PE = 0,0 V',
        note: 'Tweepolige spanningzoeker vooraf en achteraf op een bekende spanningsbron testen en tussen alle geleiders onderling én tegen aarde 0 V aantonen.'
      },
      M1: {
        key: 'M1',
        domain: 'draaibank',
        short: 'Draaibank · 1. Buddy Check',
        title: 'Draaibank VR v2.5.6 · 1. De Buddy Check (1-klik sieraden)',
        vrImg: 'assets/img/draaibank/draaibank_00b_buddy_check_compleet.webp',
        diaStart: 30.0, diaTarget: 30.0, stepTarget: null, lenMm: 80, rpm: 0,
        note: 'Medestudent in 3D controleren, eigen veiligheidsbril opzetten, werkhandschoenen bij stap 5 uittrekken en 3D-oorbellen, horloge en ringen met 1 klik in het bakje leggen.'
      },
      P2: {
        key: 'P2',
        domain: 'draaibank',
        short: 'Draaibank · 2. Voorbereiden',
        title: 'Draaibank VR v2.5.6 · 2. Voorbereiden & noodstop',
        vrImg: 'assets/img/draaibank/draaibank_05_vr_veiligheidsstop_m6.webp',
        diaStart: 30.0, diaTarget: 30.0, stepTarget: null, lenMm: 84, rpm: 500,
        note: 'Bank vrijmaken, spanningsloos opspannen, klauwplaatsleutel direct terug in houder, beschermkap sluiten en bij slingerend werkstuk direct de noodstop indrukken.'
      },
      OBJ_1: {
        key: 'OBJ_1',
        domain: 'draaibank',
        short: 'Draaibank · 3.1 Gladde Paspen',
        title: 'Draaibank VR v2.5.6 · 3.1 Gladde Paspen (Fase 1/2 + 2/2 · Ø 29,4 mm)',
        vrImg: 'assets/img/draaibank/draaibank_04_vr_schuifmaat_nameten.webp',
        diaStart: 30.0, diaTarget: 29.4, stepTarget: null, lenMm: 76, rpm: 500,
        note: 'Verplichte Fase 1/2 voorbereidende check op onvoorbereide bank, gevolgd door Fase 2/2 draaien naar Ø 29,4 mm, wachten tot 0 RPM en nameten met 2,5× Nonius-loep.'
      },
      OBJ_3: {
        key: 'OBJ_3',
        domain: 'draaibank',
        short: 'Draaibank · 3.3 Getrapte As',
        title: 'Draaibank VR v2.5.6 · 3.3 Getrapte As (Fase 1/2 + 2/2 · Ø 29,4 & 28,0 mm)',
        vrImg: 'assets/img/draaibank/draaibank_03_vr_trapdraaien_werktekening.webp',
        diaStart: 30.0, diaTarget: 29.4, stepTarget: 28.0, lenMm: 90, rpm: 710,
        note: 'Eerst Fase 1/2 voorbereidende check afronden; daarna twee diameters volgens werktekening draaien (Ø 29,4 mm en trap Ø 28,0 mm over 34 mm lengte).'
      },
      OBJ_5: {
        key: 'OBJ_5',
        domain: 'draaibank',
        short: 'Draaibank · 3.5 Centerpen',
        title: 'Draaibank VR v2.5.6 · 3.5 Centerpen (Fase 1/2 + 2/2 · met storing)',
        vrImg: 'assets/img/draaibank/draaibank_02_vr_werkplaats_overzicht.webp',
        diaStart: 30.0, diaTarget: 28.4, stepTarget: null, lenMm: 82, rpm: 500,
        note: 'Fase 1/2 voorbereidende check + Fase 2/2 draaien naar Ø 28,4 mm en rustig uitschakelen wanneer halverwege de machinelamp uitvalt.'
      }
    };
    const DD_EX_ORDER = ['EL_1', 'EL_3', 'EL_4', 'M1', 'P2', 'OBJ_1', 'OBJ_3', 'OBJ_5'];

    const DEFAULT_EX_CYCLE = ['EL_4', 'EL_3', 'OBJ_3', 'EL_1', 'P2', 'M1', 'OBJ_1', 'EL_4', 'OBJ_5', 'EL_3'];

    const DD_DOMAIN_PHYS = {
      elektro: {
        cardTitle: '✅ 5-Punts Praktijkvrijgave (Echte Meterkast of Schakelkast)',
        cardIntro: 'Loop deze vijf vaste veiligheidspunten samen met de student na bij de echte oefenkast of verdeler in het praktijklokaal:',
        boxTitle: 'PRAKTIJKVRIJGAVE ECHTE SCHAKELKAST:',
        appSub: 'Elektrotechniek VR · Algemene voorbereiding (NL & EU-richtlijnen) · Docent Dashboard v2.4.0',
        prepName: 'Elektrotechniek VR (NEN 3140 & EN 50110)',
        printTitle: 'TechBuilds VR — Praktijkoverzicht & Vrijgave (Elektrotechniek VR)',
        items: [
          { val: 'Punt 1: Veiligheidsbril op, sieraden af en 1000V-gereedschap gecontroleerd', html: '<strong>Punt 1:</strong> Veiligheidsbril op, sieraden af en 1000V-gereedschap gecontroleerd' },
          { val: 'Punt 2: Juiste groep en installatieschema op jullie schakelkast aangewezen', html: '<strong>Punt 2:</strong> Juiste groep en installatieschema op jullie schakelkast aangewezen' },
          { val: 'Punt 3: Hoofdschakelaar op 0 en eigen hangslot met naamkaart geplaatst', html: '<strong>Punt 3:</strong> Hoofdschakelaar op 0 en eigen hangslot met naamkaart geplaatst' },
          { val: 'Punt 4: Tweepolige spanningzoeker vooraf en achteraf getest (0 V aangetoond)', html: '<strong>Punt 4:</strong> Tweepolige spanningzoeker vooraf en achteraf getest (0 V aangetoond)' },
          { val: 'Punt 5: Naastgelegen delen afgeschermd en vrijgegeven door vakdocent', html: '<strong>Punt 5:</strong> Naastgelegen delen afgeschermd en vrijgegeven door vakdocent' }
        ],
        rowsHtml:
          '<tr>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;font-weight:700;">1–2 · Buddy &amp; Schema</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;">Sieraden af, 1000V-gereedschap gecontroleerd &amp; installatieschema gelezen</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;color:#15803D;font-weight:700;">✓ Doorlopen</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;font-weight:700;">3 · Vergrendelen (LOTO)</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;">Belasting afgeschakeld, hoofdschakelaar op 0 &amp; persoonlijk hangslot geplaatst</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;color:#15803D;font-weight:700;">✓ Doorlopen</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;font-weight:700;">4–6 · Nameten &amp; Afronden</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;">Tweepolig 0 V aangetoond (voor/na-test), naastgelegen delen afgeschermd</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;color:#0B5ED7;font-weight:700;">✓ Geoefend</td>' +
          '</tr>'
      },
      draaibank: {
        cardTitle: '✅ 5-Punts Praktijkvrijgave (Echte Draaibank op School)',
        cardIntro: 'Loop deze vijf vaste veiligheidspunten samen met de student na bij de echte draaibank in het praktijklokaal:',
        boxTitle: 'PRAKTIJKVRIJGAVE ECHTE DRAAIBANK:',
        appSub: 'Draaibank VR v2.5.6 · Algemene voorbereiding (NL & EU-richtlijnen) · Docent Dashboard v2.4.0',
        prepName: 'Draaibank VR v2.5.6 (Machinerichtlijn & EN ISO 23125)',
        printTitle: 'TechBuilds VR — Praktijkoverzicht & Vrijgave (Draaibank VR v2.5.6)',
        items: [
          { val: 'Punt 1: Veiligheidsbril op, mouwen strak, werkhandschoenen uit en sieraden af', html: '<strong>Punt 1:</strong> Veiligheidsbril op, mouwen strak, werkhandschoenen uit en sieraden af' },
          { val: 'Punt 2: Noodstop, hoofdschakelaar en beschermkappen op echte draaibank aangewezen', html: '<strong>Punt 2:</strong> Noodstop, hoofdschakelaar en beschermkappen op echte draaibank aangewezen' },
          { val: 'Punt 3: Werkstuk spanningsloos opgespannen en klauwplaatsleutel direct teruggehangen', html: '<strong>Punt 3:</strong> Werkstuk spanningsloos opgespannen en klauwplaatsleutel direct teruggehangen' },
          { val: 'Punt 4: Juist toerental gekozen op echte bank en vrije loop gecontroleerd', html: '<strong>Punt 4:</strong> Juist toerental gekozen op echte bank en vrije loop gecontroleerd' },
          { val: 'Punt 5: Wachten op 0 RPM stilstand vóór meten met schuifmaat (vrijgegeven door docent)', html: '<strong>Punt 5:</strong> Wachten op 0 RPM stilstand vóór meten met schuifmaat (vrijgegeven)' }
        ],
        rowsHtml:
          '<tr>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;font-weight:700;">1 · De Buddy Check</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;">3D-medestudent gecontroleerd, bril op, handschoenen uit &amp; 1-klik sieradenbakje</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;color:#15803D;font-weight:700;">✓ Doorlopen</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;font-weight:700;">2 · Voorbereiden &amp; Noodstop</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;">Bank vrijgemaakt, sleutel direct in houder, kap dicht &amp; noodstop geoefend</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;color:#15803D;font-weight:700;">✓ Doorlopen</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;font-weight:700;">3 · Werkstuk (Fase 1/2 + 2/2)</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;">Verplichte voorbereidende check + draaien op maat &amp; meten bij 0 RPM (Nonius 2,5×)</td>' +
            '<td style="padding:6px 8px;border:1px solid #DCE6F1;color:#0B5ED7;font-weight:700;">✓ Geoefend</td>' +
          '</tr>'
      }
    };

    /* Preload echte VR-renders voor het live meekijkpaneel op Tabblad 2 */
    const ddVrImgCache = {};
    function getPreloadedVrImage(srcPath) {
      if (!srcPath) return null;
      if (ddVrImgCache[srcPath]) return ddVrImgCache[srcPath];
      const img = new Image();
      ddVrImgCache[srcPath] = img;
      img.onload = function () {
        const liveCnv = document.getElementById('ddLiveVrCanvas');
        if (liveCnv && activeTab === 'LEERLING') {
          drawLiveVrScene(liveCnv, getSelectedHeadset());
        }
      };
      img.src = srcPath;
      return img;
    }

    function makeHeadset(slotNum) {
      const padded = slotNum < 10 ? ('0' + slotNum) : String(slotNum);
      const exKey = DEFAULT_EX_CYCLE[(slotNum - 1) % DEFAULT_EX_CYCLE.length];
      return {
        slot: slotNum,
        name: 'Bril ' + padded,
        appOpen: true,
        paused: false,
        help: slotNum === 2,
        freeze: slotNum === 5,
        exKey: exKey,
        mode: slotNum <= 2 ? 'Stap-voor-stap' : 'Begeleid',
        battery: 96 - ((slotNum * 3) % 24),
        coolant: exKey === 'OBJ_3',
        testerChecked: true,
        carriageX: 46 + ((slotNum * 7) % 36),
        camView: 'OVERVIEW_3Q'
      };
    }

    const allHeadsets = [];
    for (let i = 1; i <= 24; i += 1) {
      allHeadsets.push(makeHeadset(i));
    }

    let currentProfile = 'kar10';
    let customUnlimitedCount = 12;
    let activeTab = 'KLAS';
    let activeFilter = 'ALL';
    let selectedSlot = 1;
    let stagedExKey = 'EL_4';
    let stagedMode = 'Begeleid';
    let isDarkTheme = false;
    let bpHoverNormX = null;
    let lastChecklistDomain = 'elektro';

    const elSubtitle = document.getElementById('ddSubtitleLine');
    const elStatusText = document.getElementById('ddStatusText');
    const elHelpNavBadge = document.getElementById('ddHelpNavBadge');
    const elThemeBtn = document.getElementById('ddThemeBtn');

    const tabBtns = cockpitRoot.querySelectorAll('[data-dd-tab]');
    const elTabKlas = document.getElementById('ddTabKlas');
    const elTabLeerling = document.getElementById('ddTabLeerling');
    const elTabRapport = document.getElementById('ddTabRapport');

    const profileBtns = cockpitRoot.querySelectorAll('[data-cockpit-profile]');
    const heroProfileBtns = document.querySelectorAll('[data-hero-profile]');
    const filterBtns = cockpitRoot.querySelectorAll('[data-dd-filter]');
    const elCntAll = document.getElementById('ddCntAll');
    const elCntSelf = document.getElementById('ddCntSelf');
    const elCntHelp = document.getElementById('ddCntHelp');
    const elCntFreeze = document.getElementById('ddCntFreeze');

    const btnOpenGroup = document.getElementById('ddBtnOpenGroup');
    const selGroupEx = document.getElementById('ddGroupExSelect');
    const btnStageGroup = document.getElementById('ddBtnStageGroup');
    const btnPauseGroup = document.getElementById('ddBtnPauseGroup');
    const btnCloseGroup = document.getElementById('ddBtnCloseGroup');
    const elBentoGrid = document.getElementById('ddBentoGrid');

    const elStudentStrip = document.getElementById('ddStudentStrip');
    const btnSimHelp = document.getElementById('ddSimHelpBtn');
    const elLeftPane = document.getElementById('ddLeftGuidancePane');
    const elRightStudentSub = document.getElementById('ddRightStudentSub');
    const elAppOpenBadge = document.getElementById('ddAppOpenBadge');
    const btnOpenOne = document.getElementById('ddBtnOpenOne');
    const btnCloseOne = document.getElementById('ddBtnCloseOne');
    const elExerciseGrid = document.getElementById('ddExerciseGrid');
    const modeBtns = cockpitRoot.querySelectorAll('[data-dd-mode]');
    const btnStageOne = document.getElementById('ddBtnStageOne');
    const elContextTools = document.getElementById('ddContextToolsCard');

    const physChecks = cockpitRoot.querySelectorAll('input[name="physCheck"]');
    const elPhysCardTitle = document.getElementById('ddPhysCardTitle');
    const elPhysCardIntro = document.getElementById('ddPhysCardIntro');
    const elPhysCounter = document.getElementById('physCheckedCounter');
    const elA4AppSub = document.getElementById('ddA4AppSub');
    const elA4PrepName = document.getElementById('ddA4PrepName');
    const elA4TableBody = document.getElementById('ddA4TableBody');
    const elA4PhysBoxTitle = document.getElementById('ddA4PhysBoxTitle');
    const elA4SlotLabel = document.getElementById('ddA4SlotLabel');
    const elA4StudentLine = document.getElementById('ddA4StudentLine');
    const elA4ActiveEx = document.getElementById('ddA4ActiveEx');
    const elA4PhysSummary = document.getElementById('ddA4PhysSummary');
    const sigCanvas = document.getElementById('penSignatureCanvas');
    const a4SigPreview = document.getElementById('ddA4SigPreview');
    const elSigStatus = document.getElementById('penSignatureStatus');
    const btnDemoSig = document.getElementById('btnDemoSignature');
    const btnClearSig = document.getElementById('btnClearSignature');
    const btnPrintA4 = document.getElementById('btnPrintA4Report');
    const btnHeroReport = document.getElementById('tabletHeroReportBtn');

    const printRepTitle = document.getElementById('printRepTitle');
    const printRepStudent = document.getElementById('printRepStudent');
    const printPhysSummary = document.getElementById('printPhysSummary');
    const printSigImg = document.getElementById('printSignaturePreview');

    function getActiveSlotsCount() {
      if (currentProfile === 'kar10') return 10;
      if (currentProfile === 'kar20') return 20;
      return customUnlimitedCount;
    }

    function getVisibleRoster() {
      return allHeadsets.slice(0, getActiveSlotsCount());
    }

    function getSelectedHeadset() {
      const roster = getVisibleRoster();
      let found = roster.find(function (h) { return h.slot === selectedSlot; });
      if (!found) {
        found = roster[0];
        selectedSlot = found.slot;
      }
      return found;
    }

    function setStatusMsg(msg) {
      if (elStatusText) {
        elStatusText.textContent = msg;
      }
    }

    function setTab(tabKey) {
      activeTab = tabKey;
      tabBtns.forEach(function (b) {
        const isAct = b.getAttribute('data-dd-tab') === tabKey;
        b.classList.toggle('is-active', isAct);
        b.setAttribute('aria-selected', String(isAct));
      });
      if (elTabKlas) elTabKlas.style.display = tabKey === 'KLAS' ? 'block' : 'none';
      if (elTabLeerling) elTabLeerling.style.display = tabKey === 'LEERLING' ? 'block' : 'none';
      if (elTabRapport) elTabRapport.style.display = tabKey === 'RAPPORT' ? 'block' : 'none';
      renderAll();
    }

    function setProfile(profKey) {
      currentProfile = profKey;
      profileBtns.forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-cockpit-profile') === profKey);
      });
      heroProfileBtns.forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-hero-profile') === profKey);
      });
      if (elSubtitle) {
        if (profKey === 'kar10') {
          elSubtitle.textContent = 'TechBuilds VR · 13,1-inch docenttablet · VR-Kar 10 (Bril 01 t/m 10 · geen leerlingaccounts)';
        } else if (profKey === 'kar20') {
          elSubtitle.textContent = 'TechBuilds VR · 13,1-inch docenttablet · VR-Kar 20 (Bril 01 t/m 20 · geen leerlingaccounts)';
        } else {
          elSubtitle.textContent = 'TechBuilds VR · Losse 13,1-inch docenttablet · Eigen brillen (' + customUnlimitedCount + ' gekoppeld)';
        }
      }
      renderAll();
    }

    function enforceSingleHelpStream(activeHelpSlot) {
      /* Bandbreedte- & AVG-afspraak: maximaal 1 actieve meekijkstream tegelijk */
      allHeadsets.forEach(function (h) {
        if (h.slot !== activeHelpSlot && h.help && activeTab === 'LEERLING' && selectedSlot === activeHelpSlot) {
          /* Andere hulpvragen blijven zichtbaar in wachtrij op Tab 1, maar we streamen alleen de geselecteerde bril */
        }
      });
    }

    function drawLiveVrScene(canvas, h) {
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const ht = canvas.height;
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.EL_4;
      const vrImg = getPreloadedVrImage(ex.vrImg);

      /* Donkere achtergrond tijdens laden + zoom-ondersteuning */
      const sky = ctx.createLinearGradient(0, 0, 0, ht);
      sky.addColorStop(0, '#162840');
      sky.addColorStop(1, '#0B1726');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, ht);

      const zoom = h.camView === 'CUT_ZONE' ? 1.24 : (h.camView === 'CHUCK_CLOSE' ? 1.18 : 1.0);
      ctx.save();
      if (zoom > 1.0) {
        const focusX = h.camView === 'CHUCK_CLOSE' ? w * 0.32 : w * 0.54;
        const focusY = ht * 0.52;
        ctx.translate(focusX, focusY);
        ctx.scale(zoom, zoom);
        ctx.translate(-focusX, -focusY);
      }

      if (vrImg && vrImg.complete && vrImg.naturalWidth > 0) {
        /* Teken echte 1e-persoons VR-render (object-fit: cover) */
        const srcRatio = vrImg.naturalWidth / vrImg.naturalHeight;
        const dstRatio = w / ht;
        let sx = 0;
        let sy = 0;
        let sw = vrImg.naturalWidth;
        let sh = vrImg.naturalHeight;
        if (srcRatio > dstRatio) {
          sw = Math.round(vrImg.naturalHeight * dstRatio);
          sx = Math.round((vrImg.naturalWidth - sw) / 2);
        } else {
          sh = Math.round(vrImg.naturalWidth / dstRatio);
          sy = Math.round((vrImg.naturalHeight - sh) / 2);
        }
        ctx.drawImage(vrImg, sx, sy, sw, sh, 0, 0, w, ht);
      } else {
        /* Directe vector-fallback voordat de afbeelding geladen is */
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
        ctx.lineWidth = 1;
        for (let gx = 0; gx < w; gx += 36) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, ht);
          ctx.stroke();
        }
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '600 13px Inter, sans-serif';
        ctx.fillText('1e-persoons VR-beeld laden (' + ex.short + ')…', 24, Math.round(ht / 2));
      }
      ctx.restore();

      /* Bovenbalk in VR: links actieve bril & status, rechtsboven de knop ‘Hulp nodig’ */
      ctx.fillStyle = 'rgba(11, 25, 44, 0.84)';
      ctx.fillRect(10, 10, 266, 28);
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '600 11px Inter, sans-serif';
      const rightStat = ex.domain === 'elektro'
        ? (h.paused ? 'Gepauzeerd' : (ex.voltageV + ' V · NEN 3140'))
        : (h.paused ? '0 RPM' : (ex.rpm + ' RPM · v2.5.6'));
      ctx.fillText('1e-persoon VR · ' + h.name + ' · ' + rightStat, 18, 28);

      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(w - 138, 10, 128, 28, 7) : ctx.rect(w - 138, 10, 128, 28);
      ctx.fill();
      ctx.fillStyle = '#0B192C';
      ctx.font = '700 11px Inter, sans-serif';
      ctx.fillText('🙋 Hulp actief (VR)', w - 129, 28);

      /* Onderbalk telemetrie passend bij de gekozen VR-applicatie */
      ctx.fillStyle = 'rgba(11, 25, 44, 0.88)';
      ctx.fillRect(0, ht - 30, w, 30);
      ctx.fillStyle = '#93C5FD';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      if (ex.domain === 'elektro') {
        const elTele = h.freeze
          ? '⚠ Veiligheidsmelding: eerst hoofdschakelaar vergrendelen (LOTO)'
          : (ex.circuitCode + ' · Voor/na-test ' + (h.testerChecked ? 'OK ✓' : 'open'));
        ctx.fillText(elTele, 12, ht - 11);
      } else {
        const capLabel = h.freeze
          ? '⚠ Veiligheidsstop actief in VR'
          : ('Fase 1/2 ✓ · Kap dicht · Koeling ' + (h.coolant ? 'AAN' : 'UIT'));
        ctx.fillText(capLabel + ' · X = ' + h.carriageX.toFixed(1) + ' mm', 12, ht - 11);
      }
    }

    function drawBlueprint2D(canvas, h) {
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const ht = canvas.height;
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.EL_4;

      /* Lichte Blueprint Paper achtergrond (#F8FBFF) */
      ctx.fillStyle = '#F8FBFF';
      ctx.fillRect(0, 0, w, ht);

      /* Fijn technisch millimeter-raster */
      ctx.strokeStyle = '#E4EEF8';
      ctx.lineWidth = 1;
      for (let gx = 20; gx < w; gx += 24) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, ht);
        ctx.stroke();
      }
      for (let gy = 20; gy < ht; gy += 24) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      /* Binnenkader technisch schema / werktekening */
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(10, 10, w - 20, ht - 20);

      if (ex.domain === 'elektro') {
        /* 2D Installatieschema (NEN 3140 & EN 50110) */
        ctx.fillStyle = '#0B192C';
        ctx.font = '700 11.5px "Space Grotesk", sans-serif';
        ctx.fillText('2D INSTALLATIESCHEMA · ' + ex.short.toUpperCase(), 20, 29);
        ctx.fillStyle = '#0B5ED7';
        ctx.font = '600 10.5px "JetBrains Mono", monospace';
        ctx.fillText('NEN 3140 & EN 50110', w - 142, 29);

        const rails = ['L1', 'L2', 'L3', 'N', 'PE'];
        const railColors = ['#0B192C', '#0B192C', '#0B192C', '#0B5ED7', '#15803D'];
        const xStart = 76;
        const xSpacing = 74;

        /* Hoofdschakelaar Q0 balk */
        ctx.fillStyle = '#E6F0FC';
        ctx.strokeStyle = '#0B5ED7';
        ctx.lineWidth = 1.5;
        ctx.fillRect(52, 66, w - 104, 34);
        ctx.strokeRect(52, 66, w - 104, 34);
        ctx.fillStyle = '#0B192C';
        ctx.font = '700 10.5px "JetBrains Mono", monospace';
        const lotoState = ex.voltageV === 0 ? 'Q0 = 0 (VERGRENDELD · LOTO HANGSLOT ✓)' : 'Q0 = 1 (VOORBEREIDING & 1000V-CHECK)';
        ctx.fillText(lotoState, 64, 87);

        /* Geleiders L1, L2, L3, N, PE + klemmenstrook X4 */
        rails.forEach(function (lbl, idx) {
          const rx = xStart + idx * xSpacing;
          ctx.strokeStyle = railColors[idx];
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(rx, 46);
          ctx.lineTo(rx, 66);
          ctx.moveTo(rx, 100);
          ctx.lineTo(rx, 198);
          ctx.stroke();

          /* Klemcirkel op klemmenstrook */
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(rx, 152, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = railColors[idx];
          ctx.font = '700 11px "JetBrains Mono", monospace';
          ctx.fillText(lbl, rx - 7, 214);
        });

        /* Interactieve 2-polige meetpen-indicator */
        const activeIdx = bpHoverNormX !== null
          ? Math.max(0, Math.min(4, Math.floor(bpHoverNormX * 5)))
          : 0;
        const probeX = xStart + activeIdx * xSpacing;
        const refX = xStart + 3 * xSpacing; /* N-rail */

        ctx.save();
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(probeX, 152);
        ctx.quadraticCurveTo((probeX + refX) / 2, 118, refX, 152);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#D97706';
        ctx.font = '700 10.5px "JetBrains Mono", monospace';
        ctx.fillText('2-polige meting (' + rails[activeIdx] + '–N): ' + ex.voltageV + ',0 V', 64, 128);

        /* Titelblok onderaan */
        ctx.fillStyle = '#0B192C';
        ctx.fillRect(10, ht - 34, w - 20, 24);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '600 10.5px "JetBrains Mono", monospace';
        ctx.fillText('TechBuilds VR · Tweepolig testen voor/na meting · 0 V aantonen', 18, ht - 18);
        return;
      }

      /* 2D Werktekening Draaibank VR v2.5.6 */
      ctx.fillStyle = '#0B192C';
      ctx.font = '700 11.5px "Space Grotesk", sans-serif';
      ctx.fillText('2D WERKTEKENING · ' + ex.short.toUpperCase(), 20, 29);
      ctx.fillStyle = '#0B5ED7';
      ctx.font = '600 10.5px "JetBrains Mono", monospace';
      ctx.fillText('FASE 1/2 + 2/2 · ±0,1 MM', w - 168, 29);

      /* Hartlijn (streep-punt) */
      const cy = 136;
      ctx.save();
      ctx.strokeStyle = '#64748B';
      ctx.setLineDash([12, 4, 2, 4]);
      ctx.beginPath();
      ctx.moveTo(34, cy);
      ctx.lineTo(w - 34, cy);
      ctx.stroke();
      ctx.restore();

      /* Orthografisch werkstukaanzicht */
      const x0 = 78;
      const totalW = 276;
      const hMain = Math.round(ex.diaTarget * 2.45);
      ctx.fillStyle = '#E6F0FC';
      ctx.strokeStyle = '#0B192C';
      ctx.lineWidth = 2;

      if (ex.stepTarget) {
        const w1 = Math.round(totalW * 0.58);
        const w2 = totalW - w1;
        const hStep = Math.round(ex.stepTarget * 2.15);
        ctx.fillRect(x0, cy - hMain / 2, w1, hMain);
        ctx.strokeRect(x0, cy - hMain / 2, w1, hMain);
        ctx.fillRect(x0 + w1, cy - hStep / 2, w2, hStep);
        ctx.strokeRect(x0 + w1, cy - hStep / 2, w2, hStep);

        ctx.fillStyle = '#0B5ED7';
        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillText('Ø ' + ex.stepTarget.toFixed(1).replace('.', ',') + ' mm', x0 + w1 + 14, cy - hStep / 2 - 8);
      } else {
        ctx.fillRect(x0, cy - hMain / 2, totalW, hMain);
        ctx.strokeRect(x0, cy - hMain / 2, totalW, hMain);
      }

      /* Hoofdmaatlijnen in Engineering Cobalt */
      ctx.strokeStyle = '#0B5ED7';
      ctx.fillStyle = '#0B5ED7';
      ctx.lineWidth = 1.4;
      const dimY = cy + hMain / 2 + 24;
      ctx.beginPath();
      ctx.moveTo(x0, cy + hMain / 2 + 4);
      ctx.lineTo(x0, dimY + 5);
      ctx.moveTo(x0 + totalW, cy + hMain / 2 + 4);
      ctx.lineTo(x0 + totalW, dimY + 5);
      ctx.moveTo(x0, dimY);
      ctx.lineTo(x0 + totalW, dimY);
      ctx.stroke();

      ctx.font = '700 11px "JetBrains Mono", monospace';
      ctx.fillText('L = ' + ex.lenMm + ',0 mm', x0 + totalW / 2 - 38, dimY - 5);
      ctx.fillText('Doelmaat: Ø ' + ex.diaTarget.toFixed(1).replace('.', ',') + ' mm (ruw Ø 30,0)', x0, cy - hMain / 2 - 10);

      /* Live beitelpositie-indicator of muis-hover meetlijn */
      const markerX = bpHoverNormX !== null
        ? Math.max(x0, Math.min(x0 + totalW, Math.round(bpHoverNormX * w)))
        : Math.max(x0, Math.min(x0 + totalW, x0 + Math.round((h.carriageX / 100) * totalW)));

      ctx.save();
      ctx.strokeStyle = '#D97706';
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(markerX, cy - hMain / 2 - 6);
      ctx.lineTo(markerX, cy + hMain / 2 + 6);
      ctx.stroke();
      ctx.restore();

      /* Titelblok onderaan */
      ctx.fillStyle = '#0B192C';
      ctx.fillRect(10, ht - 34, w - 20, 24);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 10.5px "JetBrains Mono", monospace';
      const relMm = (((markerX - x0) / totalW) * ex.lenMm).toFixed(1).replace('.', ',');
      ctx.fillText('TechBuilds VR · Positie Z: ' + relMm + ' mm · Meten bij 0 RPM (2,5× Nonius)', 18, ht - 18);
    }

    function renderTab1() {
      const roster = getVisibleRoster();
      const cntAll = roster.length;
      const cntHelp = roster.filter(function (h) { return h.appOpen && h.help; }).length;
      const cntFreeze = roster.filter(function (h) { return h.appOpen && h.freeze; }).length;
      const cntSelf = roster.filter(function (h) { return h.appOpen && !h.help && !h.freeze; }).length;

      if (elCntAll) elCntAll.textContent = String(cntAll);
      if (elCntSelf) elCntSelf.textContent = String(cntSelf);
      if (elCntHelp) elCntHelp.textContent = String(cntHelp);
      if (elCntFreeze) elCntFreeze.textContent = String(cntFreeze);

      if (elHelpNavBadge) {
        elHelpNavBadge.textContent = '🙋 ' + cntHelp;
        elHelpNavBadge.style.background = cntHelp > 0 ? '#D97706' : '#64748B';
      }

      filterBtns.forEach(function (b) {
        b.classList.toggle('is-soft-active', b.getAttribute('data-dd-filter') === activeFilter);
      });

      if (!elBentoGrid) return;

      const filtered = roster.filter(function (h) {
        if (activeFilter === 'HELP') return h.appOpen && h.help;
        if (activeFilter === 'FREEZE') return h.appOpen && h.freeze;
        if (activeFilter === 'SELF') return h.appOpen && !h.help && !h.freeze;
        return true;
      });

      let cardsHtml = filtered.map(function (h) {
        const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.EL_4;
        let cardCls = 'dd-headset-card';
        let badgeStyle = 'background:var(--dd-ok-bg);color:var(--dd-ok);border:1px solid var(--dd-ok-border);';
        let badgeText = '✓ Zelfstandig';
        let subHint = 'AVG: geen live video · rustig bezig';

        if (!h.appOpen) {
          badgeStyle = 'background:var(--dd-subtle);color:var(--dd-muted);border:1px solid var(--dd-border);';
          badgeText = '⏹ App gesloten';
          subHint = 'Tik om VR-applicatie klaar te zetten';
        } else if (h.paused) {
          badgeStyle = 'background:var(--dd-cobalt-soft);color:var(--dd-cobalt);border:1px solid var(--dd-cobalt);';
          badgeText = '⏸ Gepauzeerd';
          subHint = 'Groepspauze actief voor klassikale uitleg';
        } else if (h.help) {
          cardCls += ' is-help';
          badgeStyle = 'background:#F59E0B;color:#0B192C;';
          badgeText = '🙋 Hulp nodig';
          subHint = 'Student tikte rechtsboven in VR → meekijken klaar';
        } else if (h.freeze) {
          cardCls += ' is-freeze';
          badgeStyle = 'background:var(--dd-err-bg);color:var(--dd-err);border:1px solid var(--dd-err-border);';
          badgeText = '⚠ Veiligheidsstop';
          subHint = ex.domain === 'elektro'
            ? 'Eerst vergrendelen (LOTO) · leest uitleg in VR'
            : 'Sleutel nog in klauwplaat · leest uitleg in VR';
        }

        if (h.slot === selectedSlot) {
          cardCls += ' is-selected';
        }

        return (
          '<button type="button" class="' + cardCls + '" data-dd-select-slot="' + h.slot + '">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%;">' +
              '<strong class="mono" style="font-size:13px;">' + h.name + '</strong>' +
              '<span class="dd-badge" style="' + badgeStyle + '">' + badgeText + '</span>' +
            '</div>' +
            '<div style="margin:8px 0 6px 0;">' +
              '<div style="font-weight:700;font-size:12.5px;line-height:1.3;">' + ex.short + '</div>' +
              '<div style="font-size:11px;color:var(--dd-muted);margin-top:2px;line-height:1.32;">' + subHint + '</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding-top:6px;border-top:1px solid var(--dd-border);font-size:11px;color:var(--dd-muted);">' +
              '<span class="mono">Accu ' + h.battery + '%</span>' +
              '<span style="color:var(--dd-cobalt);font-weight:700;">Openen →</span>' +
            '</div>' +
          '</button>'
        );
      }).join('');

      if (currentProfile === 'unlimited' && activeFilter === 'ALL' && customUnlimitedCount < 24) {
        cardsHtml += (
          '<button type="button" class="dd-headset-card" id="ddAddExtraHeadsetBtn" style="border-style:dashed;align-items:center;justify-content:center;text-align:center;gap:6px;">' +
            '<span style="font-size:20px;color:var(--dd-cobalt);font-weight:700;">+</span>' +
            '<strong style="font-size:12.5px;color:var(--dd-cobalt);">Eigen bril koppelen</strong>' +
            '<span style="font-size:11px;color:var(--dd-muted);">Geen licentie per bril</span>' +
          '</button>'
        );
      }

      if (!cardsHtml) {
        cardsHtml = '<div class="dd-card" style="grid-column:1 / -1;padding:18px;text-align:center;color:var(--dd-muted);font-size:13px;">Geen brillen in dit filter. Klik op <strong>Alle</strong> om het volledige klasoverzicht te zien.</div>';
      }

      elBentoGrid.innerHTML = cardsHtml;

      elBentoGrid.querySelectorAll('[data-dd-select-slot]').forEach(function (cardBtn) {
        cardBtn.addEventListener('click', function () {
          selectedSlot = parseInt(cardBtn.getAttribute('data-dd-select-slot'), 10) || 1;
          const sel = getSelectedHeadset();
          stagedExKey = sel.exKey;
          stagedMode = sel.mode;
          setTab('LEERLING');
        });
      });

      const addBtn = document.getElementById('ddAddExtraHeadsetBtn');
      if (addBtn) {
        addBtn.addEventListener('click', function () {
          if (customUnlimitedCount < 24) {
            customUnlimitedCount += 1;
            setProfile('unlimited');
            setStatusMsg('✓ Bril ' + (customUnlimitedCount < 10 ? '0' + customUnlimitedCount : customUnlimitedCount) + ' gekoppeld op het Docent Dashboard.');
          }
        });
      }
    }

    function renderTab2() {
      const roster = getVisibleRoster();
      const h = getSelectedHeadset();
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.EL_4;

      if (elStudentStrip) {
        elStudentStrip.innerHTML = roster.map(function (item) {
          const act = item.slot === h.slot;
          const suffix = (item.appOpen && item.help) ? ' 🙋' : ((item.appOpen && item.freeze) ? ' ⚠' : '');
          return (
            '<button type="button" class="dd-pill ' + (act ? 'is-active' : '') + '" data-dd-strip-slot="' + item.slot + '" style="flex-shrink:0;">' +
              item.name + suffix +
            '</button>'
          );
        }).join('');

        elStudentStrip.querySelectorAll('[data-dd-strip-slot]').forEach(function (b) {
          b.addEventListener('click', function () {
            selectedSlot = parseInt(b.getAttribute('data-dd-strip-slot'), 10) || 1;
            const nextH = getSelectedHeadset();
            stagedExKey = nextH.exKey;
            stagedMode = nextH.mode;
            renderAll();
          });
        });
      }

      if (btnSimHelp) {
        if (!h.appOpen) {
          btnSimHelp.className = 'dd-btn-outline';
          btnSimHelp.textContent = 'Open eerst de VR-applicatie om ‘Hulp nodig’ te testen';
        } else if (h.help) {
          btnSimHelp.className = 'dd-btn-ok';
          btnSimHelp.textContent = '✓ Hulp afgerond — Sluit meekijken (AVG)';
        } else {
          btnSimHelp.className = 'dd-btn-warn';
          btnSimHelp.textContent = '🙋 Simuleer VR-klik rechtsboven: ‘Hulp nodig’';
        }
      }

      if (elRightStudentSub) {
        elRightStudentSub.textContent = h.name + ' · Hulpniveau: ' + h.mode;
      }
      if (elAppOpenBadge) {
        if (h.appOpen) {
          elAppOpenBadge.style.cssText = 'background:var(--dd-ok-bg);color:var(--dd-ok);border:1px solid var(--dd-ok-border);';
          elAppOpenBadge.textContent = '✓ VR-App Open';
        } else {
          elAppOpenBadge.style.cssText = 'background:var(--dd-subtle);color:var(--dd-muted);border:1px solid var(--dd-border);';
          elAppOpenBadge.textContent = '⏹ VR-App Gesloten';
        }
      }

      if (elExerciseGrid) {
        elExerciseGrid.innerHTML = DD_EX_ORDER.map(function (k) {
          const item = DD_EXERCISES[k];
          const chosen = k === stagedExKey;
          const running = h.appOpen && k === h.exKey;
          return (
            '<button type="button" class="dd-pill ' + (chosen ? 'is-soft-active' : '') + '" data-dd-pick-ex="' + k + '" style="justify-content:space-between;text-align:left;padding:7px 9px;">' +
              '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + item.short + '</span>' +
              (running ? '<span class="mono" style="font-size:10px;color:var(--dd-ok);">ACTIEF</span>' : '') +
            '</button>'
          );
        }).join('');

        elExerciseGrid.querySelectorAll('[data-dd-pick-ex]').forEach(function (eb) {
          eb.addEventListener('click', function () {
            stagedExKey = eb.getAttribute('data-dd-pick-ex');
            renderTab2();
          });
        });
      }

      modeBtns.forEach(function (mb) {
        mb.classList.toggle('is-soft-active', mb.getAttribute('data-dd-mode') === stagedMode);
      });

      if (btnStageOne) {
        const stEx = DD_EXERCISES[stagedExKey] || DD_EXERCISES.EL_4;
        btnStageOne.textContent = '📋 Zet ‘' + stEx.short + '’ Klaar op ' + h.name;
      }

      /* Linkerkolom: AVG-gate vs. Live Meekijken na klik op ‘Hulp nodig’ in VR */
      if (elLeftPane) {
        if (!h.appOpen) {
          elLeftPane.innerHTML =
            '<div class="dd-card" style="padding:20px;">' +
              '<span class="dd-badge mono" style="background:var(--dd-subtle);color:var(--dd-muted);border:1px solid var(--dd-border);margin-bottom:8px;">⏹ VR-APPLICATIE NOG GESLOTEN</span>' +
              '<h3 style="font-family:var(--tb-font-display);font-size:17px;margin:4px 0 8px 0;">' + h.name + ' staat klaar in het keuzescherm</h3>' +
              '<p style="font-size:13px;color:var(--dd-muted);margin:0 0 14px 0;">Open de gewenste VR-applicatie op deze bril of kies rechts direct een onderdeel van Elektrotechniek VR of Draaibank VR om klaar te zetten.</p>' +
              '<button type="button" class="dd-btn-primary" id="ddQuickOpenLeftBtn">🚀 VR-Applicatie Openen op ' + h.name + '</button>' +
            '</div>';
          const qBtn = document.getElementById('ddQuickOpenLeftBtn');
          if (qBtn) {
            qBtn.addEventListener('click', function () {
              h.appOpen = true;
              setStatusMsg('✓ VR-applicatie geopend op ' + h.name + ' (' + ex.title + ').');
              renderAll();
            });
          }
        } else if (!h.help) {
          /* AVG-zelfstudiemodus: GEEN live videostream zolang student niet op ‘Hulp nodig’ tikt */
          elLeftPane.innerHTML =
            '<div class="dd-card" style="padding:16px;">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding-bottom:11px;border-bottom:1px solid var(--dd-border);">' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                  '<span class="dd-badge" style="background:var(--dd-ok-bg);color:var(--dd-ok);border:1px solid var(--dd-ok-border);">🔒 AVG Privacy-by-Design</span>' +
                  '<strong style="font-size:14px;">' + h.name + ' oefent zelfstandig</strong>' +
                '</div>' +
                '<span class="mono" style="font-size:11px;color:var(--dd-muted);">Geen live videostream actief</span>' +
              '</div>' +

              '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0;">' +
                '<div style="background:var(--dd-bg);border:1px solid var(--dd-border);border-radius:9px;padding:9px 10px;">' +
                  '<div class="mono" style="font-size:10.5px;color:var(--dd-muted);">ACTIEVE VR-APPLICATIE</div>' +
                  '<div style="font-weight:700;font-size:12.5px;margin-top:2px;">' + ex.short + '</div>' +
                '</div>' +
                '<div style="background:var(--dd-bg);border:1px solid var(--dd-border);border-radius:9px;padding:9px 10px;">' +
                  '<div class="mono" style="font-size:10.5px;color:var(--dd-muted);">STATUS IN VR</div>' +
                  '<div style="font-weight:700;font-size:12.5px;margin-top:2px;color:' + (h.freeze ? 'var(--dd-err)' : 'var(--dd-ok)') + ';">' + (h.freeze ? '⚠ Veiligheidsstop' : '✓ Rustig bezig') + '</div>' +
                '</div>' +
                '<div style="background:var(--dd-bg);border:1px solid var(--dd-border);border-radius:9px;padding:9px 10px;">' +
                  '<div class="mono" style="font-size:10.5px;color:var(--dd-muted);">HULPNIVEAU &amp; ACCU</div>' +
                  '<div style="font-weight:700;font-size:12.5px;margin-top:2px;">' + h.mode + ' · ' + h.battery + '%</div>' +
                '</div>' +
              '</div>' +

              '<div style="background:#0F1E33;color:#F8FAFC;border-radius:11px;padding:15px 16px;border:1px solid #253B59;">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:12px;">' +
                  '<span class="mono" style="font-size:11px;color:#93C5FD;">SCHERM VAN DE STUDENT IN VR (' + h.name.toUpperCase() + ')</span>' +
                  '<button type="button" class="dd-btn-warn" id="ddInVrHelpTrigger" style="background:#F59E0B;color:#0B192C;border-color:#F59E0B;padding:5px 11px;font-size:11.5px;">🙋 Hulp nodig (rechtsboven in VR)</button>' +
                '</div>' +
                '<p style="font-size:12.5px;color:#CBD5E1;margin:0;line-height:1.5;">' +
                  'Zolang de student zelfstandig oefent, blijft de videostream uitgeschakeld. Zo voelt elke leerling zich vrij om rustig te oefenen in VR. <strong>Klik hierboven op ‘🙋 Hulp nodig’</strong> om te zien hoe het live 1e-persoons VR-beeld en het 2D-schema of de werktekening openen.' +
                '</p>' +
              '</div>' +
            '</div>';

          const vrTrig = document.getElementById('ddInVrHelpTrigger');
          if (vrTrig) {
            vrTrig.addEventListener('click', function () {
              h.help = true;
              enforceSingleHelpStream(h.slot);
              setStatusMsg('🙋 Student op ' + h.name + ' tikte rechtsboven in VR op ‘Hulp nodig’ — live meekijken geopend.');
              renderAll();
            });
          }
        } else {
          /* Student tikte op ‘Hulp nodig’ rechtsboven in VR -> Live Split-Studio actief! */
          const camMidLabel = ex.domain === 'elektro' ? 'Meetpunt' : 'Snijzone';
          const camCloseLabel = ex.domain === 'elektro' ? 'Vergrendeling' : 'Drieklauw';
          const bpHoverHint = ex.domain === 'elektro'
            ? 'Beweeg over het installatieschema om een geleider te meten'
            : 'Beweeg over de werktekening om de Z-positie af te lezen';

          elLeftPane.innerHTML =
            '<div class="dd-card" style="padding:14px;border:2px solid var(--dd-warn-border);">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:9px 12px;background:var(--dd-warn-bg);border:1px solid var(--dd-warn-border);border-radius:9px;margin-bottom:12px;">' +
                '<div>' +
                  '<strong style="font-size:13px;color:var(--dd-warn);">🙋 ' + h.name + ' tikte rechtsboven in VR op ‘Hulp nodig’</strong>' +
                  '<div style="font-size:11.5px;color:var(--dd-fg);">Live meekijken tijdelijk geopend met toestemming van student (max. 1 bril tegelijk)</div>' +
                '</div>' +
                '<button type="button" class="dd-btn-ok" id="ddFinishHelpBtn">✓ Hulp afgerond — Sluit meekijken</button>' +
              '</div>' +

              '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px;">' +
                '<span style="font-size:12px;font-weight:700;">Actief: ' + ex.title + '</span>' +
                '<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">' +
                  '<span class="mono" style="font-size:10.5px;color:var(--dd-muted);">KIJKHOEK:</span>' +
                  '<button type="button" class="dd-pill ' + (h.camView === 'OVERVIEW_3Q' ? 'is-soft-active' : '') + '" data-dd-cam="OVERVIEW_3Q" style="padding:3px 8px;font-size:11px;">Overzicht</button>' +
                  '<button type="button" class="dd-pill ' + (h.camView === 'CUT_ZONE' ? 'is-soft-active' : '') + '" data-dd-cam="CUT_ZONE" style="padding:3px 8px;font-size:11px;">' + camMidLabel + '</button>' +
                  '<button type="button" class="dd-pill ' + (h.camView === 'CHUCK_CLOSE' ? 'is-soft-active' : '') + '" data-dd-cam="CHUCK_CLOSE" style="padding:3px 8px;font-size:11px;">' + camCloseLabel + '</button>' +
                '</div>' +
              '</div>' +

              '<div class="dd-split-canvases">' +
                '<div>' +
                  '<canvas id="ddLiveVrCanvas" width="460" height="270" style="width:100%;height:auto;border-radius:9px;display:block;border:1px solid var(--dd-border);"></canvas>' +
                '</div>' +
                '<div>' +
                  '<canvas id="ddLiveBpCanvas" width="460" height="270" style="width:100%;height:auto;border-radius:9px;display:block;border:1px solid var(--dd-border);cursor:crosshair;" title="' + bpHoverHint + '"></canvas>' +
                '</div>' +
              '</div>' +
              '<p style="font-size:11.5px;color:var(--dd-muted);margin:8px 0 0 0;">' + ex.note + '</p>' +
            '</div>';

          const finBtn = document.getElementById('ddFinishHelpBtn');
          if (finBtn) {
            finBtn.addEventListener('click', function () {
              h.help = false;
              h.freeze = false;
              setStatusMsg('✓ Hulpvraag op ' + h.name + ' afgerond — live meekijken weer netjes gesloten (AVG).');
              renderAll();
            });
          }

          elLeftPane.querySelectorAll('[data-dd-cam]').forEach(function (cb) {
            cb.addEventListener('click', function () {
              h.camView = cb.getAttribute('data-dd-cam');
              renderTab2();
            });
          });

          const vrCnv = document.getElementById('ddLiveVrCanvas');
          const bpCnv = document.getElementById('ddLiveBpCanvas');
          drawLiveVrScene(vrCnv, h);
          drawBlueprint2D(bpCnv, h);

          if (bpCnv) {
            bpCnv.addEventListener('mousemove', function (ev) {
              const r = bpCnv.getBoundingClientRect();
              bpHoverNormX = (ev.clientX - r.left) / Math.max(1, r.width);
              drawBlueprint2D(bpCnv, h);
            });
            bpCnv.addEventListener('mouseleave', function () {
              bpHoverNormX = null;
              drawBlueprint2D(bpCnv, h);
            });
          }
        }
      }

      /* Rechterkolom onderkaart: directe begeleidingsknoppen tijdens ‘Hulp nodig’ */
      if (elContextTools) {
        if (h.appOpen && h.help) {
          const primaryToolLabel = ex.domain === 'elektro'
            ? ('⚡ Voor/na-test ' + (h.testerChecked ? 'bevestigd ✓' : 'markeren'))
            : ('💧 Koeling ' + (h.coolant ? 'Uitzetten' : 'Aanzetten'));

          elContextTools.innerHTML =
            '<div style="font-family:var(--tb-font-display);font-weight:700;font-size:14px;margin-bottom:6px;">🛠 Directe Hulpknoppen tijdens Meekijken</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;">' +
              '<button type="button" class="dd-btn-outline" id="ddToolPrimary">' + primaryToolLabel + '</button>' +
              '<button type="button" class="dd-btn-outline" id="ddToolHeight">📏 Werkhoogte ijken</button>' +
              '<button type="button" class="dd-btn-outline" id="ddToolResetStop">🔄 Veiligheidsstop vrijgeven</button>' +
              '<button type="button" class="dd-btn-outline" id="ddToolToRapport">✅ Naar Vrijgave (Tab 3)</button>' +
            '</div>';

          const bPrim = document.getElementById('ddToolPrimary');
          const bHeight = document.getElementById('ddToolHeight');
          const bReset = document.getElementById('ddToolResetStop');
          const bToRap = document.getElementById('ddToolToRapport');

          if (bPrim) {
            bPrim.addEventListener('click', function () {
              if (ex.domain === 'elektro') {
                h.testerChecked = !h.testerChecked;
                setStatusMsg('⚡ Tweepolige voor/na-test op ' + h.name + ' besproken (' + (h.testerChecked ? 'bevestigd ✓' : 'opnieuw uitvoeren') + ').');
              } else {
                h.coolant = !h.coolant;
                setStatusMsg('💧 Koeling op ' + h.name + ' ' + (h.coolant ? 'ingeschakeld' : 'uitgeschakeld') + '.');
              }
              renderTab2();
            });
          }
          if (bHeight) {
            bHeight.addEventListener('click', function () {
              setStatusMsg('📏 Werkhoogte van de VR-opstelling automatisch afgestemd voor ' + h.name + '.');
            });
          }
          if (bReset) {
            bReset.addEventListener('click', function () {
              h.freeze = false;
              setStatusMsg('✓ Veiligheidsmelding besproken en vrijgegeven op ' + h.name + '.');
              renderAll();
            });
          }
          if (bToRap) {
            bToRap.addEventListener('click', function () {
              setTab('RAPPORT');
            });
          }
        } else {
          elContextTools.innerHTML =
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">' +
              '<div>' +
                '<div style="font-family:var(--tb-font-display);font-weight:700;font-size:13.5px;">✅ Klaar met VR-oefenen?</div>' +
                '<div style="font-size:12px;color:var(--dd-muted);">Loop samen de 5 punten bij de echte schakelkast of machine na op Tabblad 3.</div>' +
              '</div>' +
              '<button type="button" class="dd-btn-outline" id="ddJumpToRapportBtn">Naar Tab 3: Vrijgave →</button>' +
            '</div>';
          const jBtn = document.getElementById('ddJumpToRapportBtn');
          if (jBtn) {
            jBtn.addEventListener('click', function () {
              setTab('RAPPORT');
            });
          }
        }
      }
    }

    function syncA4ChecklistAndHeader() {
      const h = getSelectedHeadset();
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.EL_4;
      const domKey = ex.domain === 'draaibank' ? 'draaibank' : 'elektro';
      const domCfg = DD_DOMAIN_PHYS[domKey];

      /* Werk de 5 controlepunten en A4-tabel bij wanneer tussen VR-applicaties wordt gewisseld */
      if (domKey !== lastChecklistDomain) {
        lastChecklistDomain = domKey;
        physChecks.forEach(function (chk, idx) {
          const item = domCfg.items[idx];
          if (!item) return;
          chk.value = item.val;
          chk.checked = true;
          const lbl = document.getElementById('lblPhys0' + (idx + 1));
          if (lbl) lbl.innerHTML = item.html;
        });
      }

      if (elPhysCardTitle) elPhysCardTitle.textContent = domCfg.cardTitle;
      if (elPhysCardIntro) elPhysCardIntro.textContent = domCfg.cardIntro;
      if (elA4AppSub) elA4AppSub.textContent = domCfg.appSub;
      if (elA4PrepName) elA4PrepName.textContent = domCfg.prepName;
      if (elA4TableBody) elA4TableBody.innerHTML = domCfg.rowsHtml;
      if (elA4PhysBoxTitle) elA4PhysBoxTitle.textContent = domCfg.boxTitle;
      if (printRepTitle) printRepTitle.textContent = domCfg.printTitle;

      if (elA4SlotLabel) elA4SlotLabel.textContent = h.name.toUpperCase() + ' · AVG-BEWUST';
      if (elA4StudentLine) elA4StudentLine.textContent = h.name + ' (naam pas op papier invullen · AVG)';
      if (elA4ActiveEx) elA4ActiveEx.textContent = ex.title;
      if (printRepStudent) {
        printRepStudent.textContent = h.name + ' · VR-applicatie: ' + domCfg.prepName + ' · Onderdeel: ' + ex.short + ' · Naam student (op papier): ______________________';
      }

      const total = physChecks.length || 5;
      const checkedList = [];
      const summaryLines = [];
      const realTargetWord = domKey === 'elektro' ? 'de echte schakelkast' : 'de echte draaibank';

      physChecks.forEach(function (chk, idx) {
        const num = idx + 1;
        if (chk.checked) {
          checkedList.push(chk.value);
          summaryLines.push('<div style="color:#15803D;font-weight:600;">✓ ' + chk.value + '</div>');
        } else {
          summaryLines.push('<div style="color:#B45309;">○ Punt ' + num + ': nog samen nalopen bij ' + realTargetWord + '</div>');
        }
      });

      if (elPhysCounter) {
        elPhysCounter.textContent = checkedList.length + '/' + total + ' afgevinkt' + (checkedList.length === total ? ' ✓' : '');
      }
      if (elA4PhysSummary) {
        elA4PhysSummary.innerHTML = summaryLines.join('');
      }
      if (printPhysSummary) {
        printPhysSummary.textContent = checkedList.length > 0
          ? ('Afgetekende praktijkpunten bij ' + realTargetWord + ' (' + checkedList.length + '/' + total + '): ' + checkedList.join(' · '))
          : ('Nog samen bij ' + realTargetWord + ' langs te lopen: Punt 1 t/m Punt 5');
      }
    }

    /* Tekenpen-handtekening op Tabblad 3 + live kopie op het A4-voorbeeld */
    let hasSignature = false;
    let isDrawingSig = false;

    function mirrorSignatureToA4() {
      if (!sigCanvas || !a4SigPreview || !a4SigPreview.getContext) return;
      const pCtx = a4SigPreview.getContext('2d');
      pCtx.clearRect(0, 0, a4SigPreview.width, a4SigPreview.height);
      pCtx.fillStyle = '#FFFFFF';
      pCtx.fillRect(0, 0, a4SigPreview.width, a4SigPreview.height);
      if (hasSignature) {
        pCtx.drawImage(sigCanvas, 0, 0, a4SigPreview.width, a4SigPreview.height);
      } else {
        pCtx.fillStyle = '#94A3B8';
        pCtx.font = '500 11px Inter, sans-serif';
        pCtx.fillText('(Nog niet ondertekend)', 14, 36);
      }
    }

    function drawSampleSignature() {
      if (!sigCanvas || !sigCanvas.getContext) return;
      const sCtx = sigCanvas.getContext('2d');
      sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      sCtx.strokeStyle = '#0B5ED7';
      sCtx.lineWidth = 2.4;
      sCtx.lineCap = 'round';
      sCtx.lineJoin = 'round';

      sCtx.beginPath();
      sCtx.moveTo(44, 78);
      sCtx.bezierCurveTo(68, 28, 108, 30, 96, 74);
      sCtx.bezierCurveTo(88, 92, 128, 48, 152, 66);
      sCtx.bezierCurveTo(174, 82, 198, 42, 224, 64);
      sCtx.bezierCurveTo(248, 82, 286, 52, 336, 62);
      sCtx.stroke();

      sCtx.beginPath();
      sCtx.moveTo(40, 90);
      sCtx.quadraticCurveTo(188, 78, 356, 86);
      sCtx.stroke();

      hasSignature = true;
      if (elSigStatus) {
        elSigStatus.textContent = 'Handtekening vakdocent geplaatst ✓ (teken gerust zelf in het vak)';
      }
      mirrorSignatureToA4();
    }

    function clearSignaturePad() {
      if (!sigCanvas || !sigCanvas.getContext) return;
      const sCtx = sigCanvas.getContext('2d');
      sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      hasSignature = false;
      if (elSigStatus) {
        elSigStatus.textContent = 'Zet hieronder met muis, vinger of tekenpen de handtekening voor praktijkvrijgave:';
      }
      mirrorSignatureToA4();
    }

    if (sigCanvas && sigCanvas.getContext) {
      const sCtx = sigCanvas.getContext('2d');
      const getSigPos = function (ev) {
        const rect = sigCanvas.getBoundingClientRect();
        const scaleX = sigCanvas.width / Math.max(1, rect.width);
        const scaleY = sigCanvas.height / Math.max(1, rect.height);
        return {
          x: (ev.clientX - rect.left) * scaleX,
          y: (ev.clientY - rect.top) * scaleY
        };
      };

      sigCanvas.addEventListener('pointerdown', function (ev) {
        if (!hasSignature) {
          sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
        }
        isDrawingSig = true;
        const p = getSigPos(ev);
        sCtx.strokeStyle = '#0B5ED7';
        sCtx.lineWidth = 2.4;
        sCtx.lineCap = 'round';
        sCtx.lineJoin = 'round';
        sCtx.beginPath();
        sCtx.moveTo(p.x, p.y);
        if (sigCanvas.setPointerCapture) {
          try { sigCanvas.setPointerCapture(ev.pointerId); } catch (_) { /* ignore */ }
        }
      });

      sigCanvas.addEventListener('pointermove', function (ev) {
        if (!isDrawingSig) return;
        const p = getSigPos(ev);
        sCtx.lineTo(p.x, p.y);
        sCtx.stroke();
        hasSignature = true;
        if (elSigStatus) {
          elSigStatus.textContent = 'Handtekening vakdocent geplaatst ✓';
        }
        mirrorSignatureToA4();
      });

      const stopDrawing = function () {
        isDrawingSig = false;
      };
      sigCanvas.addEventListener('pointerup', stopDrawing);
      sigCanvas.addEventListener('pointercancel', stopDrawing);
      sigCanvas.addEventListener('pointerleave', stopDrawing);

      drawSampleSignature();
    }

    if (btnDemoSig) btnDemoSig.addEventListener('click', drawSampleSignature);
    if (btnClearSig) btnClearSig.addEventListener('click', clearSignaturePad);

    physChecks.forEach(function (chk) {
      chk.addEventListener('change', syncA4ChecklistAndHeader);
    });

    if (btnPrintA4) {
      btnPrintA4.addEventListener('click', function () {
        syncA4ChecklistAndHeader();
        if (sigCanvas && printSigImg && hasSignature) {
          printSigImg.src = sigCanvas.toDataURL('image/png');
          printSigImg.style.display = 'block';
        } else if (printSigImg) {
          printSigImg.style.display = 'none';
        }
        window.print();
      });
    }

    function renderAll() {
      renderTab1();
      if (activeTab === 'LEERLING') {
        renderTab2();
      }
      syncA4ChecklistAndHeader();
      mirrorSignatureToA4();
    }

    /* Event-listeners voor Tabbladen, Profielen, Filters & Groepsacties */
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTab(btn.getAttribute('data-dd-tab'));
      });
    });

    profileBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setProfile(btn.getAttribute('data-cockpit-profile'));
      });
    });

    heroProfileBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setProfile(btn.getAttribute('data-hero-profile'));
        const simSec = document.getElementById('live-simulator');
        if (simSec && !isHeadless) {
          simSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-dd-filter');
        renderTab1();
      });
    });

    if (elThemeBtn) {
      elThemeBtn.addEventListener('click', function () {
        isDarkTheme = !isDarkTheme;
        cockpitRoot.classList.toggle('is-dark', isDarkTheme);
        elThemeBtn.textContent = isDarkTheme ? '☀ Licht' : '☾ Donker';
      });
    }

    if (btnOpenGroup) {
      btnOpenGroup.addEventListener('click', function () {
        getVisibleRoster().forEach(function (h) {
          h.appOpen = true;
          h.paused = false;
        });
        setStatusMsg('🚀 VR-applicaties geopend op alle ' + getActiveSlotsCount() + ' brillen in de groep.');
        renderAll();
      });
    }

    if (btnStageGroup) {
      btnStageGroup.addEventListener('click', function () {
        const chosenKey = (selGroupEx && DD_EXERCISES[selGroupEx.value]) ? selGroupEx.value : 'EL_4';
        const chosenEx = DD_EXERCISES[chosenKey];
        getVisibleRoster().forEach(function (h) {
          h.appOpen = true;
          h.paused = false;
          h.exKey = chosenKey;
          h.freeze = false;
        });
        stagedExKey = chosenKey;
        setStatusMsg('📋 Klaargezet voor alle ' + getActiveSlotsCount() + ' brillen: ' + chosenEx.title + '.');
        renderAll();
      });
    }

    if (btnPauseGroup) {
      btnPauseGroup.addEventListener('click', function () {
        const roster = getVisibleRoster();
        const anyUnpaused = roster.some(function (h) { return h.appOpen && !h.paused; });
        roster.forEach(function (h) {
          if (h.appOpen) h.paused = anyUnpaused;
        });
        btnPauseGroup.textContent = anyUnpaused ? '▶ Hervat Groep' : '⏸ Pauzeer Groep';
        setStatusMsg(anyUnpaused
          ? '⏸ Alle brillen rustig gepauzeerd voor klassikale toelichting door de docent.'
          : '▶ Groep hervat — studenten oefenen weer verder in VR.');
        renderAll();
      });
    }

    if (btnCloseGroup) {
      btnCloseGroup.addEventListener('click', function () {
        getVisibleRoster().forEach(function (h) {
          h.appOpen = false;
          h.help = false;
          h.paused = false;
        });
        btnPauseGroup.textContent = '⏸ Pauzeer Groep';
        setStatusMsg('⏹ Alle VR-applicaties netjes afgesloten — brillen staan klaar voor de volgende klas.');
        renderAll();
      });
    }

    if (btnSimHelp) {
      btnSimHelp.addEventListener('click', function () {
        const h = getSelectedHeadset();
        if (!h.appOpen) {
          h.appOpen = true;
        }
        h.help = !h.help;
        if (h.help) {
          enforceSingleHelpStream(h.slot);
          setStatusMsg('🙋 Student op ' + h.name + ' tikte rechtsboven in VR op ‘Hulp nodig’ — live meekijkbeeld geopend.');
        } else {
          setStatusMsg('✓ Hulpvraag op ' + h.name + ' afgerond — live meekijken weer gesloten (AVG).');
        }
        renderAll();
      });
    }

    if (btnOpenOne) {
      btnOpenOne.addEventListener('click', function () {
        const h = getSelectedHeadset();
        h.appOpen = true;
        h.paused = false;
        setStatusMsg('🚀 VR-applicatie geopend op ' + h.name + '.');
        renderAll();
      });
    }

    if (btnCloseOne) {
      btnCloseOne.addEventListener('click', function () {
        const h = getSelectedHeadset();
        h.appOpen = false;
        h.help = false;
        setStatusMsg('⏹ VR-applicatie netjes gesloten op ' + h.name + '.');
        renderAll();
      });
    }

    modeBtns.forEach(function (mb) {
      mb.addEventListener('click', function () {
        stagedMode = mb.getAttribute('data-dd-mode');
        renderTab2();
      });
    } );

    if (btnStageOne) {
      btnStageOne.addEventListener('click', function () {
        const h = getSelectedHeadset();
        const ex = DD_EXERCISES[stagedExKey] || DD_EXERCISES.EL_4;
        h.appOpen = true;
        h.paused = false;
        h.exKey = stagedExKey;
        h.mode = stagedMode;
        h.freeze = false;
        setStatusMsg('📋 Klaargezet op ' + h.name + ': ' + ex.title + ' (' + stagedMode + ').');
        renderAll();
      });
    }

    if (btnHeroReport) {
      btnHeroReport.addEventListener('click', function () {
        setTab('RAPPORT');
        const simSec = document.getElementById('live-simulator');
        if (simSec) {
          simSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    renderAll();

    const docParams = new URLSearchParams(window.location.search);
    if (docParams.get('rapport') === 'open') {
      setTab('RAPPORT');
    } else if (docParams.get('tab') === 'leerling') {
      setTab('LEERLING');
    }
  }

  /* ------------------------------------------------------------------
   * 5. Vakgebied-Wisselaar & Maatwerk-Samenvatting (maatwerk.html)
   * ------------------------------------------------------------------ */
  const MW_SCENES = {
    klimaat: {
      img: 'assets/img/brand/domein_04_installatie_en_klimaat.webp',
      alt: 'Algemene technische VR-applicatie voor installatie- en klimaattechniek bij warmtepomp en leidingwerk',
      caption: 'Installatie & Klimaat: algemene technische VR-applicatie voor drukloos stellen, afsluiters bedienen en veilig controleren',
      domeinOption: 'Installatie- & Klimaattechniek'
    },
    elektro: {
      img: 'assets/img/elektro/elektro_01_loto_vergrendelen.webp',
      alt: 'Algemene technische VR-applicatie voor meterkast, groepenkast en schakelkast volgens NEN 3140 en EN 50110',
      caption: 'Elektrotechniek & Energie: spanningsloos werken bij meterkast en schakelkast (NEN 3140 & EN 50110) · ook uitbreidbaar op maat',
      domeinOption: 'Elektrotechniek & Energie (Meterkast & Schakelkast)'
    },
    mechatronica: {
      img: 'assets/img/brand/domein_03_mechatronica_en_industrie.webp',
      alt: 'Algemene technische VR-applicatie voor oefenlijnen en machineveiligheid volgens Europese richtlijnen',
      caption: 'Mechatronica & Industrie: algemene voorbereiding op afscherming, vergrendeling en veilig vrijgeven van oefenlijnen',
      domeinOption: 'Mechatronica & Machineveiligheid'
    },
    metaal: {
      img: 'assets/img/brand/domein_01_metaal_en_verspaning.webp',
      alt: 'Algemene technische VR-applicatie voor metaalbewerking en verspaning op freesbank, kolomboormachine en draaibank',
      caption: 'Metaal & Verspaning: algemene voorbereiding op veilig opspannen, afscherming en werken aan freesbank, boormachine of draaibank',
      domeinOption: 'Metaalbewerking & Verspaning'
    }
  };

  const mwSceneBtns = document.querySelectorAll('[data-mw-scene]');
  if (mwSceneBtns.length > 0) {
    const elMwImg = document.getElementById('maatwerkHeroImg');
    const elMwCaption = document.getElementById('maatwerkHeroCaption');
    const elScopeDomein = document.getElementById('scopeDomein');
    let mwTimer = null;

    mwSceneBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-mw-scene');
        const sc = MW_SCENES[key];
        if (!sc) return;

        mwSceneBtns.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });

        if (elMwImg) {
          elMwImg.classList.add('is-switching');
          if (mwTimer) clearTimeout(mwTimer);
          mwTimer = setTimeout(function () {
            elMwImg.src = sc.img;
            elMwImg.alt = sc.alt;
            elMwImg.classList.remove('is-switching');
          }, 100);
        }
        if (elMwCaption) elMwCaption.textContent = sc.caption;
        if (elScopeDomein) {
          elScopeDomein.value = sc.domeinOption;
          elScopeDomein.dispatchEvent(new Event('change'));
        }
      });
    });
  }

  const scoperForm = document.getElementById('maatwerkScoperForm');
  if (scoperForm) {
    const outSummary = document.getElementById('scoperOutputBox');
    const btnDownloadScope = document.getElementById('btnDownloadMaatwerkScope');
    const btnSendToQuote = document.getElementById('btnScopeToQuote');
    const btnMailScope = document.getElementById('btnMailMaatwerkScope');

    function buildScopeText() {
      const domein = document.getElementById('scopeDomein').value;
      const machine = document.getElementById('scopeMachine').value.trim() || 'Aanvullende installatie, kast of werkplek';
      const doelgroep = document.getElementById('scopeDoelgroep').value;
      const pakketStatus = document.getElementById('scopeTabletBezit').value;

      const checkedGoals = Array.from(scoperForm.querySelectorAll('input[name="scopeGoal"]:checked')).map(function (el) {
        return el.value;
      });
      const goalsList = checkedGoals.length > 0
        ? checkedGoals.join(', ')
        : 'Kleding- en PBM-check, veilig opstarten en rustig uitschakelen';

      const fullText =
        'SAMENVATTING TECHNISCHE VR-APPLICATIE OP MAAT — TECHBUILDS VR\n' +
        '--------------------------------------------------------------\n' +
        'Uitgangspunt    : Algemene technische VR-applicatie (NL & EU-richtlijnen, geen typetraining)\n' +
        'Vakgebied       : ' + domein + '\n' +
        'Opstelling/kast : ' + machine + '\n' +
        'Voor wie        : ' + doelgroep + '\n' +
        'Onderdelen      : ' + goalsList + '\n' +
        'Gewenste vorm   : ' + pakketStatus + '\n' +
        'Begeleiding     : Gewoon zichtbaar op het 13,1-inch Docent Dashboard v2.4.0 + A4-rapport\n' +
        'Doorlooptijd    : Gemiddeld 6 tot 10 weken van inventarisatie tot gebruik in de les';

      return { domein: domein, machine: machine, fullText: fullText };
    }

    function refreshScoper() {
      const data = buildScopeText();
      if (outSummary) {
        outSummary.textContent = data.fullText;
      }
      if (btnMailScope) {
        btnMailScope.href =
          'mailto:info@techbuildsvr.nl?subject=' +
          encodeURIComponent('Technische VR-applicatie op maat — ' + data.machine) +
          '&body=' +
          encodeURIComponent(data.fullText);
      }
    }

    scoperForm.addEventListener('input', refreshScoper);
    scoperForm.addEventListener('change', refreshScoper);

    if (btnDownloadScope) {
      btnDownloadScope.addEventListener('click', function () {
        const data = buildScopeText();
        const blob = new Blob([data.fullText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'TechBuilds_VR_Applicatie_Op_Maat_Overzicht.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
    }

    if (btnSendToQuote) {
      btnSendToQuote.addEventListener('click', function () {
        const data = buildScopeText();
        try {
          sessionStorage.setItem('tb_maatwerk_scope', data.fullText);
        } catch (_) { /* ignore */ }
        navigateInternal('prijzen-contact.html?onderwerp=maatwerk#aanvraag');
      });
    }

    refreshScoper();
  }

  /* ------------------------------------------------------------------
   * 6. Pakket- & VR-Applicatiekeuze (+ € 5.000,- losse VR-app), Kostenoverzicht & Offerte
   * ------------------------------------------------------------------ */
  const EXTRA_MODULE_PRICE = 5000;
  const MODULE_CHOICES = {
    elektro: {
      fee: 0,
      sub: '1 VR-applicatie inbegrepen: Elektrotechniek VR — Meterkast & schakelkast (NEN 3140 & EN 50110)',
      feeText: '€ 0,- (inbegrepen)',
      formValue: 'Elektrotechniek VR — Meterkast, groepenkast & schakelkast (inbegrepen)'
    },
    draaibank: {
      fee: 0,
      sub: '1 VR-applicatie inbegrepen: Draaibank VR (v2.5.6) — 3 onderdelen (Buddy Check, Voorbereiden & 5 werkstukken)',
      feeText: '€ 0,- (inbegrepen)',
      formValue: 'Draaibank VR — Algemene voorbereiding draaibank (inbegrepen)'
    },
    beide: {
      fee: EXTRA_MODULE_PRICE,
      sub: 'Elektrotechniek VR + Draaibank VR (v2.5.6) samen op dezelfde docenttablet en VR-brillen',
      feeText: '+ € 5.000,- (eenmalig)',
      formValue: 'Beide modules: Draaibank VR + Elektrotechniek VR (+ € 5.000,- eenmalig excl. BTW)'
    }
  };

  const PACKAGES = {
    'optie-1-eigen-brillen': {
      num: '1',
      shortLabel: 'Optie 1 · Losse Tablet',
      title: 'Optie 1 — Losse Docenttablet & Eigen Brillen',
      bannerTitle: 'Optie 1 — Losse Docenttablet (€ 10.000,- excl. BTW · 1e jaar service inbegrepen)',
      upfront: 10000,
      annual: 1500,
      firstYearIncluded: true,
      heroImg: 'assets/img/hardware/hardware_01_regietablet_13_eigen_brillen.webp',
      heroCaption: 'Optie 1 (€ 10.000,-): Losse 13,1-inch docenttablet met tekenpen en Docent Dashboard v2.4.0 voor eigen VR-brillen (incl. 1 VR-applicatie naar keuze & 1e jaar service)',
      unitSingle: '1 Losse docenttablet-set (eigen brillen)',
      unitPlural: 'Losse docenttablet-sets (eigen brillen)',
      hwSub: 'Losse 13,1-inch docenttablet (tekenpen & stevige hoes) met Docent Dashboard v2.4.0 om eigen VR-brillen op te starten, AVG-bewust te begeleiden en af te sluiten',
      srvSub: 'Hulp op afstand en software-updates (1e jaar bij de aanschaf inbegrepen)',
      ruleHint: 'Het 1e jaar service zit bij de prijs in; vanaf jaar 2 betaal je € 1.500,- per jaar excl. BTW.',
      formValue: 'Optie 1: Docent Dashboard & Eigen Brillen (€ 10.000,- excl. BTW, 1e jr incl., daarna € 1.500,-/jr)'
    },
    'optie-2-vr-kar-10': {
      num: '2',
      shortLabel: 'Optie 2 · VR-Kar 10',
      title: 'Optie 2 — Complete VR-Kar 10 (Meest gekozen)',
      bannerTitle: 'Optie 2 — Complete VR-Kar 10 (€ 15.000,- excl. BTW)',
      upfront: 15000,
      annual: 2500,
      firstYearIncluded: false,
      heroImg: 'assets/img/hardware/hardware_02_mobiele_vr_kar_10_en_tablet.webp',
      heroCaption: 'Optie 2 (€ 15.000,-): Mobiele VR-Kar 10 met exact 10 VR-brillen (Bril 01 t/m 10), ingebouwde 5G-verbinding en 13,1-inch docenttablet op één stopcontact',
      unitSingle: '1 VR-Kar 10 (10 VR-brillen)',
      unitPlural: 'VR-Karren 10',
      hwSub: 'Verrijdbare oplaadkar (1 stekker) + 10 VR-brillen + ingebouwde wifi- en 5G-router + 13,1-inch docenttablet (v2.4.0)',
      srvSub: 'Centraal beheer van alle brillen, onbeperkt 5G én elk jaar onderhoud op school',
      ruleHint: 'Inclusief onbeperkt 5G in de kar en onze jaarlijkse onderhoudsbeurt op school (€ 2.500,-/jr excl. BTW).',
      formValue: 'Optie 2: Complete VR-Kar 10 (€ 15.000,- excl. BTW + € 2.500,-/jr service & 5G)'
    },
    'optie-3-vr-kar-20': {
      num: '3',
      shortLabel: 'Optie 3 · VR-Kar 20',
      title: 'Optie 3 — Complete VR-Kar 20',
      bannerTitle: 'Optie 3 — Complete VR-Kar 20 (€ 25.000,- excl. BTW)',
      upfront: 25000,
      annual: 3500,
      firstYearIncluded: false,
      heroImg: 'assets/img/hardware/hardware_03_mobiele_vr_kar_20_en_tablet.webp',
      heroCaption: 'Optie 3 (€ 25.000,-): Brede mobiele VR-Kar 20 met exact 20 VR-brillen (Bril 01 t/m 20), ingebouwde 5G-verbinding en 13,1-inch docenttablet voor hele klassen',
      unitSingle: '1 VR-Kar 20 (20 VR-brillen)',
      unitPlural: 'VR-Karren 20',
      hwSub: 'Verrijdbare 20-vaks oplaadkar (1 stekker) + 20 VR-brillen + ingebouwde wifi- en 5G-router + 13,1-inch docenttablet (v2.4.0)',
      srvSub: 'Centraal beheer van alle 20 brillen, onbeperkt 5G én elk jaar onderhoud op school',
      ruleHint: 'Voor hele klassen tegelijk, inclusief onbeperkt 5G en jaarlijks onderhoud op school (€ 3.500,-/jr excl. BTW).',
      formValue: 'Optie 3: Complete VR-Kar 20 (€ 25.000,- excl. BTW + € 3.500,-/jr service & 5G)'
    }
  };

  const OPTIE_NUM_TO_KEY = {
    '1': 'optie-1-eigen-brillen',
    '2': 'optie-2-vr-kar-10',
    '3': 'optie-3-vr-kar-20',
    'optie1': 'optie-1-eigen-brillen',
    'optie2': 'optie-2-vr-kar-10',
    'optie3': 'optie-3-vr-kar-20'
  };

  function calcTotalForPkg(pkg, sets, years, extraModFee) {
    const upfrontBase = sets * pkg.upfront;
    const modFee = extraModFee || 0;
    const billedYears = pkg.firstYearIncluded ? Math.max(0, years - 1) : years;
    const srv = billedYears * sets * pkg.annual;
    return {
      upfrontBase: upfrontBase,
      modFee: modFee,
      upfront: upfrontBase + modFee,
      billedYears: billedYears,
      srv: srv,
      total: upfrontBase + modFee + srv
    };
  }

  function formatEuro(amount) {
    return '€ ' + amount.toLocaleString('nl-NL') + ',-';
  }

  const calcRoot = document.getElementById('pakketCalculator');
  if (calcRoot) {
    const selPkg = document.getElementById('calcPackageOption');
    const pkgSegBtns = calcRoot.querySelectorAll('[data-calc-pkg]');
    const selModChoice = document.getElementById('calcModuleChoice');
    const modSegBtns = calcRoot.querySelectorAll('[data-calc-mod]');
    const btnAddExtraModule = document.getElementById('btnAddExtraModule');
    const inpSets = document.getElementById('calcTabletSets');
    const inpYears = document.getElementById('calcYears');
    const chkCustom = document.getElementById('calcIncludeCustom');

    const elTitle = document.getElementById('calcSelectedTitle');
    const elHwSub = document.getElementById('calcHardwareSub');
    const elModSub = document.getElementById('calcModuleSub');
    const elExtraModFee = document.getElementById('calcExtraModuleFee');
    const elSrvSub = document.getElementById('calcServiceSub');
    const elRuleHint = document.getElementById('calcServiceRuleHint');
    const elSetsOut = document.getElementById('calcSetsLabel');
    const elYearsOut = document.getElementById('calcYearsLabel');
    const elYear1Out = document.getElementById('calcYear1Total');
    const elServiceAnnual = document.getElementById('calcServicePerYear');
    const elFollowYears = document.getElementById('calcFollowYearsTotal');
    const elGrandTotal = document.getElementById('calcMultiYearTotal');
    const elCustomNote = document.getElementById('calcCustomBadge');
    const elComparisonBars = document.getElementById('tcoComparisonBars');
    const btnPrintCalc = document.getElementById('btnPrintBudget');
    const btnCalcToQuote = document.getElementById('btnCalcToQuote');

    const pkgCards = document.querySelectorAll('[data-pkg-card]');
    const quickOptieBtns = document.querySelectorAll('[data-quick-optie]');
    const elSelectedBanner = document.getElementById('selectedPkgBanner');
    const elSelectedBannerTitle = document.getElementById('selectedPkgBannerTitle');
    const elPricingHeroImg = document.getElementById('pricingHeroImg');
    const elPricingHeroCaption = document.getElementById('pricingHeroCaption');

    function syncModuleSelection(modKey) {
      const mInfo = MODULE_CHOICES[modKey] || MODULE_CHOICES.elektro;
      if (selModChoice) selModChoice.value = modKey;
      modSegBtns.forEach(function (b) {
        const active = b.getAttribute('data-calc-mod') === modKey;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      const reqModSel = document.getElementById('reqModule');
      if (reqModSel) {
        reqModSel.value = mInfo.formValue;
      }
    }

    function syncVisualSelection(pkgKey, showBanner) {
      const pkg = PACKAGES[pkgKey];
      if (!pkg) return;

      pkgSegBtns.forEach(function (b) {
        const active = b.getAttribute('data-calc-pkg') === pkgKey;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      pkgCards.forEach(function (card) {
        card.classList.toggle('is-selected-pkg', card.getAttribute('data-pkg-card') === pkgKey);
      });

      quickOptieBtns.forEach(function (qb) {
        const active = qb.getAttribute('data-quick-optie') === pkg.num;
        qb.classList.toggle('is-active', active);
      });

      if (elPricingHeroImg) {
        elPricingHeroImg.src = pkg.heroImg;
      }
      if (elPricingHeroCaption) {
        elPricingHeroCaption.textContent = pkg.heroCaption;
      }

      const reqSel = document.getElementById('reqType');
      if (reqSel) {
        reqSel.value = pkg.formValue;
      }

      if (showBanner && elSelectedBanner && elSelectedBannerTitle) {
        const curMod = (selModChoice && MODULE_CHOICES[selModChoice.value]) ? selModChoice.value : 'elektro';
        const modSuffix = curMod === 'beide' ? ' + extra VR-applicatie (€ 5.000,-)' : (curMod === 'elektro' ? ' · Elektrotechniek VR' : ' · Draaibank VR v2.5.6');
        elSelectedBannerTitle.textContent = '✓ ' + pkg.bannerTitle + modSuffix;
        elSelectedBanner.style.display = 'flex';
      }
    }

    function renderTcoBars(activeKey, sets, years, extraModFee) {
      if (!elComparisonBars) return;
      const keys = ['optie-1-eigen-brillen', 'optie-2-vr-kar-10', 'optie-3-vr-kar-20'];
      const totals = keys.map(function (k) {
        return calcTotalForPkg(PACKAGES[k], sets, years, extraModFee).total;
      });
      const maxTotal = Math.max.apply(null, totals.concat([1]));

      const rowsHtml = keys.map(function (k, idx) {
        const p = PACKAGES[k];
        const t = totals[idx];
        const widthPct = Math.max(14, Math.round((t / maxTotal) * 100));
        const isActive = k === activeKey;
        return (
          '<div class="tco-bar-row ' + (isActive ? 'is-active' : '') + '" data-tco-bar-pkg="' + k + '">' +
            '<div class="tco-bar-meta">' +
              '<span>' + p.shortLabel + '</span>' +
              '<span class="mono">' + formatEuro(t) + '</span>' +
            '</div>' +
            '<div class="tco-bar-track">' +
              '<div class="tco-bar-fill" style="width:' + widthPct + '%;"></div>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      elComparisonBars.innerHTML =
        '<span class="tco-bars-title">Vergelijking over ' + years + ' jaar' + (extraModFee > 0 ? ' (incl. + € 5.000,- extra VR-applicatie)' : '') + '</span>' +
        rowsHtml;

      elComparisonBars.querySelectorAll('[data-tco-bar-pkg]').forEach(function (row) {
        row.addEventListener('click', function () {
          const targetKey = row.getAttribute('data-tco-bar-pkg');
          if (selPkg && PACKAGES[targetKey]) {
            selPkg.value = targetKey;
            syncVisualSelection(targetKey, true);
            updateCalc();
          }
        });
      });
    }

    function updateCalc() {
      const pkgKey = (selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10';
      const pkg = PACKAGES[pkgKey];
      const modKey = (selModChoice && MODULE_CHOICES[selModChoice.value]) ? selModChoice.value : 'elektro';
      const modInfo = MODULE_CHOICES[modKey];
      const sets = parseInt(inpSets.value, 10) || 1;
      const years = parseInt(inpYears.value, 10) || 3;
      const wantsCustom = chkCustom && chkCustom.checked;

      const res = calcTotalForPkg(pkg, sets, years, modInfo.fee);
      const annualRate = sets * pkg.annual;

      pkgSegBtns.forEach(function (b) {
        const active = b.getAttribute('data-calc-pkg') === pkgKey;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      modSegBtns.forEach(function (b) {
        const active = b.getAttribute('data-calc-mod') === modKey;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      if (elTitle) elTitle.textContent = pkg.title;
      if (elHwSub) elHwSub.textContent = pkg.hwSub;
      if (elModSub) elModSub.textContent = modInfo.sub;
      if (elExtraModFee) {
        elExtraModFee.textContent = modInfo.feeText;
        elExtraModFee.style.fontWeight = modInfo.fee > 0 ? '600' : '400';
        elExtraModFee.style.color = modInfo.fee > 0 ? 'var(--tb-cobalt)' : '';
      }
      if (elSrvSub) elSrvSub.textContent = pkg.srvSub;
      if (elRuleHint) elRuleHint.textContent = pkg.ruleHint;
      if (elSetsOut) {
        elSetsOut.textContent = sets === 1 ? pkg.unitSingle : (sets + ' ' + pkg.unitPlural);
      }
      if (elYearsOut) elYearsOut.textContent = years + ' jaar';
      if (elYear1Out) elYear1Out.textContent = formatEuro(res.upfrontBase);
      if (elServiceAnnual) {
        elServiceAnnual.textContent = formatEuro(annualRate) + '/jr' + (pkg.firstYearIncluded ? ' (vanaf jaar 2)' : '');
      }
      if (elFollowYears) {
        if (pkg.firstYearIncluded && res.billedYears === 0) {
          elFollowYears.textContent = '€ 0,- (1e jaar inbegrepen)';
        } else if (pkg.firstYearIncluded) {
          elFollowYears.textContent = formatEuro(res.srv) + ' (' + res.billedYears + ' vervolgjaar × ' + formatEuro(annualRate) + ')';
        } else {
          elFollowYears.textContent = formatEuro(res.srv) + ' (' + res.billedYears + ' jaar × ' + formatEuro(annualRate) + ')';
        }
      }
      if (elGrandTotal) {
        elGrandTotal.textContent = formatEuro(res.total) + (wantsCustom ? ' + maatwerk' : '');
      }
      if (elCustomNote) {
        elCustomNote.style.display = wantsCustom ? 'block' : 'none';
      }

      renderTcoBars(pkgKey, sets, years, modInfo.fee);
    }

    function selectPackageAndScroll(pkgKey, scrollTargetId) {
      if (!PACKAGES[pkgKey]) return;
      if (selPkg) selPkg.value = pkgKey;
      syncVisualSelection(pkgKey, true);
      updateCalc();
      if (scrollTargetId) {
        const el = document.getElementById(scrollTargetId);
        if (el) {
          setTimeout(function () {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 40);
        }
      }
    }

    pkgSegBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const k = btn.getAttribute('data-calc-pkg');
        if (selPkg && PACKAGES[k]) {
          selPkg.value = k;
          syncVisualSelection(k, true);
          updateCalc();
        }
      });
    });

    modSegBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const mk = btn.getAttribute('data-calc-mod');
        if (MODULE_CHOICES[mk]) {
          syncModuleSelection(mk);
          const curPkg = (selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10';
          syncVisualSelection(curPkg, Boolean(elSelectedBanner && elSelectedBanner.style.display === 'flex'));
          updateCalc();
        }
      });
    });

    if (btnAddExtraModule) {
      btnAddExtraModule.addEventListener('click', function () {
        syncModuleSelection('beide');
        const curPkg = (selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10';
        syncVisualSelection(curPkg, true);
        updateCalc();
        calcRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    quickOptieBtns.forEach(function (qb) {
      qb.addEventListener('click', function () {
        const num = qb.getAttribute('data-quick-optie');
        const key = OPTIE_NUM_TO_KEY[num];
        selectPackageAndScroll(key, 'pakketCalculator');
      });
    });

    document.querySelectorAll('[data-select-pkg]').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        const key = btn.getAttribute('data-select-pkg');
        if (PACKAGES[key]) {
          ev.preventDefault();
          selectPackageAndScroll(key, 'pakketCalculator');
        }
      });
    });

    [selPkg, selModChoice, inpSets, inpYears, chkCustom].forEach(function (el) {
      if (el) {
        el.addEventListener('input', function () {
          if (el === selPkg) syncVisualSelection(selPkg.value, true);
          if (el === selModChoice) syncModuleSelection(selModChoice.value);
          updateCalc();
        });
        el.addEventListener('change', function () {
          if (el === selPkg) syncVisualSelection(selPkg.value, true);
          if (el === selModChoice) syncModuleSelection(selModChoice.value);
          updateCalc();
        });
      }
    });

    if (btnCalcToQuote) {
      btnCalcToQuote.addEventListener('click', function () {
        const key = (selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10';
        const mk = (selModChoice && MODULE_CHOICES[selModChoice.value]) ? selModChoice.value : 'elektro';
        syncModuleSelection(mk);
        syncVisualSelection(key, true);
      });
    }

    if (btnPrintCalc) {
      btnPrintCalc.addEventListener('click', function () {
        window.print();
      });
    }

    /* Lees eventuele URL-keuzes (?optie=1|2|3 & ?module=elektro|draaibank|beide) */
    const urlParams = new URLSearchParams(window.location.search);
    const optieParam = urlParams.get('optie') || urlParams.get('pakket');
    const modParam = (urlParams.get('module') || '').toLowerCase();
    const initialPkgKey = optieParam && OPTIE_NUM_TO_KEY[optieParam] ? OPTIE_NUM_TO_KEY[optieParam] : null;
    const initialModKey = MODULE_CHOICES[modParam] ? modParam : null;

    if (initialModKey) {
      syncModuleSelection(initialModKey);
    }

    if (initialPkgKey || initialModKey) {
      const targetPkg = initialPkgKey || ((selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10');
      if (selPkg) selPkg.value = targetPkg;
      syncVisualSelection(targetPkg, true);
      updateCalc();
      if (!window.location.hash) {
        const targetSec = initialModKey ? calcRoot : (document.getElementById('pakket-keuze') || calcRoot);
        if (targetSec && !isHeadless) {
          setTimeout(function () {
            targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }
      }
    } else {
      updateCalc();
    }
  }

  /* ------------------------------------------------------------------
   * 7. Demo- & Offerteformulier (prijzen-contact.html)
   * ------------------------------------------------------------------ */
  const contactForm = document.getElementById('techbuildsContactForm');
  if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const onderwerpParam = params.get('onderwerp');
    const optieOrPakket = params.get('optie') || params.get('pakket');
    const modParamForm = (params.get('module') || '').toLowerCase();
    const selType = document.getElementById('reqType');
    const selReqMod = document.getElementById('reqModule');
    const txtMessage = document.getElementById('reqMessage');

    if (optieOrPakket && OPTIE_NUM_TO_KEY[optieOrPakket] && selType) {
      selType.value = PACKAGES[OPTIE_NUM_TO_KEY[optieOrPakket]].formValue;
    } else if (onderwerpParam === 'maatwerk' && selType) {
      selType.value = 'Aanvullende praktijkvoorbereiding op maat bespreken';
    } else if (onderwerpParam === 'demo' && selType) {
      selType.value = 'Vrijblijvende demo op school of bedrijf';
    }

    if (modParamForm && MODULE_CHOICES[modParamForm] && selReqMod) {
      selReqMod.value = MODULE_CHOICES[modParamForm].formValue;
    }

    try {
      const savedScope = sessionStorage.getItem('tb_maatwerk_scope');
      if (savedScope && txtMessage && !txtMessage.value) {
        txtMessage.value = savedScope;
      }
    } catch (_) { /* ignore */ }

    const feedbackBox = document.getElementById('contactFormFeedback');
    const btnDownloadReq = document.getElementById('btnDownloadAanvraag');
    let lastRequestContent = '';

    contactForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const naam = document.getElementById('reqName').value.trim();
      const org = document.getElementById('reqOrg').value.trim();
      const email = document.getElementById('reqEmail').value.trim();
      const tel = document.getElementById('reqPhone').value.trim();
      const type = document.getElementById('reqType').value;
      const modChoiceText = selReqMod ? selReqMod.value : 'Elektrotechniek VR — Meterkast, groepenkast & schakelkast (inbegrepen)';
      const msg = document.getElementById('reqMessage').value.trim();

      if (!naam || !org || !email) {
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.className = 'ac24-notice status-danger';
          feedbackBox.textContent = 'Vul je naam, school of bedrijf en je e-mailadres even in.';
        }
        return;
      }

      lastRequestContent =
        'AANVRAAG TECHBUILDS VR (EXCL. BTW)\n' +
        '----------------------------------\n' +
        'Datum        : ' + new Date().toISOString().slice(0, 10) + '\n' +
        'Naam         : ' + naam + '\n' +
        'Organisatie  : ' + org + '\n' +
        'E-mail       : ' + email + '\n' +
        'Telefoon     : ' + (tel || '-') + '\n' +
        'Voorkeur     : ' + type + '\n' +
        'VR-app(s)    : ' + modChoiceText + '\n\n' +
        'Toelichting:\n' + (msg || '(Geen extra opmerkingen)');

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.className = 'ac24-notice';
        feedbackBox.innerHTML =
          '<strong>Je aanvraag staat klaar voor ' + org.replace(/</g, '&lt;') + '.</strong><br>' +
          'Klik hier om hem direct via je e-mailprogramma te versturen naar <a href="mailto:info@techbuildsvr.nl?subject=' +
          encodeURIComponent('Aanvraag TechBuilds VR — ' + org) + '&body=' + encodeURIComponent(lastRequestContent) + '"><strong>info@techbuildsvr.nl</strong></a>, of bewaar hieronder een kopie voor je eigen administratie.';
      }
      if (btnDownloadReq) {
        btnDownloadReq.style.display = 'inline-flex';
      }
    });

    if (btnDownloadReq) {
      btnDownloadReq.addEventListener('click', function () {
        if (!lastRequestContent) return;
        const blob = new Blob([lastRequestContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Aanvraag_TechBuilds_VR.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
    }
  }
})();
