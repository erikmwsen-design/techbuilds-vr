/**
 * TechBuilds VR — Interactieve Website Logica (v2.5)
 * Onderdelen:
 * 1. Vaste navigatiebalk, leesbalk, mobiele snelbalk, terug-naar-boven & subtiele scroll-animatie
 * 2. Interactieve Hero-tegels & fotowisselaar op de modulepagina (modules.html)
 * 3. Interactief stappenoverzicht voor Draaibank VR (3 onderdelen) én Elektrotechniek VR (1–6) volgens NL & EU-richtlijnen
 * 4. Interactief Docent Dashboard v2.4.0 (lichte Blueprint-UI in 3 tabbladen + AVG ‘Hulp nodig’-knop + A4-rapport)
 * 5. Vakgebied-wisselaar & Maatwerk-overzicht met directe e-mailkoppeling (maatwerk.html)
 * 6. Pakket- en modulekeuze (losse extra module + € 5.000,-), meerjarenoverzicht & aanvraagformulier (prijzen-contact.html)
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
      alt: 'Praktijklokaal waar een student met een VR-bril oefent voor de draaibank terwijl de vakdocent begeleidt met de docenttablet',
      caption: 'Algemene praktijkvoorbereiding volgens NL- en EU-richtlijnen · geen typetraining · AVG-vriendelijk begeleiden',
      linkText: 'Alle modules →',
      linkHref: 'modules.html'
    },
    modules: {
      img: 'assets/img/draaibank/draaibank_06_vr_keuzemenu_3_onderdelen.webp',
      alt: 'Startmenu in de Draaibank VR-app met de 3 onderdelen: 1. De Buddy Check, 2. Voorbereiden en Veiligheid, 3. Gebruik: 5 Objecten',
      caption: 'Draaibank VR: 1. De Buddy Check · 2. Voorbereiden & veiligheid · 3. Praktijkgebruik (5 werkstukken)',
      linkText: 'Bekijk Draaibank VR →',
      linkHref: 'training-draaibank.html'
    },
    elektro: {
      img: 'assets/img/elektro/hero_elektro_werkplaats.webp',
      alt: 'Elektrotechnieklokaal waar een student met een VR-bril oefent bij een meterkast en schakelkast',
      caption: 'Elektrotechniek VR (NEN 3140 & EN 50110): veilig afschakelen, vergrendelen en tweepolig nameten bij meterkast en schakelkast',
      linkText: 'Bekijk Elektrotechniek VR →',
      linkHref: 'training-elektrotechniek.html'
    },
    kar: {
      img: 'assets/img/brand/pakket_mobiele_vr_kar_werkplaats.webp',
      alt: 'Verrijdbare mobiele VR-kar met genummerde VR-brillen, 13,1-inch docenttablet en eigen 5G-verbinding op één stekker',
      caption: 'Slechts één gewoon stopcontact nodig · ingebouwde wifi- en 5G-verbinding · los van de school-wifi',
      linkText: 'Bekijk de VR-Karren →',
      linkHref: 'prijzen-contact.html?optie=2#pakket-keuze'
    },
    tablet: {
      img: 'assets/img/dashboard/dashboard_01_klasoverzicht_v2_4.webp',
      alt: 'Tabblad 1 Klasoverzicht van het lichte Docent Dashboard v2.4.0 op de 13,1-inch docenttablet met genummerde brillen en AVG-vriendelijke knop Hulp nodig',
      caption: 'Docent Dashboard v2.4.0: oefeningen klaarzetten, pas meekijken zodra een student rechtsboven in VR op ‘Hulp nodig’ tikt (AVG) en gezamenlijk afsluiten',
      linkText: 'Bekijk het Docent Dashboard →',
      linkHref: 'docentapp-tablet.html#live-simulator'
    }
  };

  const heroSceneTriggers = document.querySelectorAll('[data-hero-scene]');
  if (heroSceneTriggers.length > 0) {
    const elHeroImg = document.getElementById('heroStageImg');
    const elHeroCaption = document.getElementById('heroSceneCaption');
    const elHeroLink = document.getElementById('heroSceneLink');
    let currentHeroScene = 'modules';
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
   * 3. Interactief Overzicht Draaibank VR (3 onderdelen) & Elektrotechniek VR (E1–E6)
   * ------------------------------------------------------------------ */
  const DRAAIBANK_MODULE_ORDER = ['M1', 'M2', 'M3'];
  const DRAAIBANK_MODULES_DATA = {
    M1: {
      code: 'ONDERDEEL 1 · PERSOONLIJKE VEILIGHEID',
      standplaats: 'Persoonlijke veiligheid · Vóór de draaibank',
      title: 'De Buddy Check (PBM & kledingkeuring)',
      summary: 'Voordat een student in de buurt van een draaibank komt, controleert hij of zij eerst een medestudent in 3D op zes verplichte aandachtspunten en brengt daarna de eigen beschermingsmiddelen op orde volgens de Nederlandse en Europese werkplaatsregels.',
      image: 'assets/img/draaibank/draaibank_00b_buddy_check_compleet.webp',
      altImage: 'assets/img/draaibank/draaibank_00a_buddy_check_start.webp',
      caption: 'Na de controle: medestudent gecorrigeerd, eigen veiligheidsbril op en werkhandschoenen verplicht uitgetrokken.',
      altCaption: 'Vóór de controle: loshangend haar, sieraden om de pols en werkhandschoenen aan bij draaiende delen.',
      hasBuddyToggle: true,
      hasObjectsBox: false,
      gateSafeMsg: 'punten in orde — Student mag door naar Onderdeel 2 bij de draaibank',
      gateWarnMsg: 'punten gecontroleerd — Vink alle 4 de veiligheidspunten aan voor toegang tot Onderdeel 2',
      telRpm: 'Stilstand (vooraf)',
      telTol: 'Arbobesluit & PBM',
      telPos: 'Vaste plek · 2 knoppen',
      checks: [
        'Medestudent van top tot teen nalopen op los haar, openstaande mouwen, sieraden, gehoorbescherming en veiligheidsschoenen',
        'Zelf een veiligheidsbril opzetten en werkhandschoenen verplicht uittrekken vanwege intrekgevaar bij draaiende delen',
        'Pas wanneer alle punten kloppen, gaat de student door naar de draaibank'
      ]
    },
    M2: {
      code: 'ONDERDEEL 2 · OPBOUWEN, OPSPANNEN & NOODSTOP',
      standplaats: 'Aan de conventionele draaibank',
      title: 'Voorbereiden & veiligheidstraining',
      summary: 'Recht voor de draaibank oefent de student het veilig klaarmaken van de werkplek en het direct ingrijpen bij gevaar — gewoontes die volgens de Europese Machinerichtlijn, EN ISO 23125 en EN ISO 13850 op elke draaibank gelden.',
      image: 'assets/img/draaibank/draaibank_05_vr_veiligheidsstop_m6.webp',
      caption: 'Onderdeel 2: bank vrijmaken, spanningsloos opspannen, sleutel direct terugplaatsen, 500 RPM instellen en direct de noodstop indrukken bij slingering.',
      hasBuddyToggle: false,
      hasObjectsBox: false,
      telRpm: '500 RPM → Noodstop',
      telTol: 'EN ISO 23125 & 13850',
      telPos: 'Sleutel direct in houder',
      checks: [
        'Los gereedschap van het machinebed halen, rondom de spil controleren en het werkstuk spanningsloos kort opspannen',
        'De klauwplaatsleutel direct terug in de houder plaatsen en de beschermkap sluiten (anders start de draaibank niet)',
        'Passend toerental (500 RPM) instellen, proefdraaien en direct op de rode noodstop drukken bij zichtbare slingering'
      ]
    },
    M3: {
      code: 'ONDERDEEL 3 · ZELFSTANDIG OEFENEN & NAMETEN',
      standplaats: '5 oplopende praktijkwerkstukken',
      title: 'Praktijkgebruik: 5 werkstukken draaien en meten',
      summary: 'In het derde onderdeel past de student alle veiligheidsregels zelfstandig toe op vijf oplopende praktijkopdrachten met werktekening — inclusief rustig wachten tot de klauwplaat volledig stilstaat (0 RPM) voordat er met de schuifmaat wordt gemeten.',
      image: 'assets/img/draaibank/draaibank_03_vr_trapdraaien_werktekening.webp',
      caption: 'Onderdeel 3: zelfstandig werken met handwielen, schaalverdeling en werktekening, gevolgd door nameten met de schuifmaat bij volledige stilstand.',
      hasBuddyToggle: false,
      hasObjectsBox: true,
      telRpm: '500 / 1000 → 0 RPM',
      telTol: '5 werkstukken + schuifmaat',
      telPos: 'Meten bij stilstand',
      checks: [
        'Keuze uit 5 opbouwende werkstukken: van een eenvoudige gladde paspen tot een getrapte as en een storingsopdracht',
        'Pas de kap openen en nameten met de schuifmaat nadat de klauwplaat na het stoppen volledig stilstaat (0 RPM)',
        'Spanen veilig verwijderen met spanenhaak en kwast en de draaibank netjes achterlaten'
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

    const elStepCounter = document.getElementById('modStepCounter');
    const elStandplaatsHint = document.getElementById('modStandplaatsHint');
    const elProgressFill = document.getElementById('modProgressFill');
    const btnPrevModule = document.getElementById('btnPrevModule');
    const btnNextModule = document.getElementById('btnNextModule');

    const elCode = document.getElementById('modViewCode');
    const elTitle = document.getElementById('modViewTitle');
    const elSummary = document.getElementById('modViewSummary');
    const elImg = document.getElementById('modViewImg');
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

    function syncM1View() {
      const m = MODULES_DATA[FIRST_MOD_KEY];
      const checkedCount = Array.from(m1Chips).filter(function (c) {
        return c.classList.contains('is-checked');
      }).length;
      const totalChips = m1Chips.length || 4;
      const isBefore = m1State === 'before';

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
    }

    function renderModule(key) {
      const m = MODULES_DATA[key];
      if (!m) return;
      activeModKey = key;
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
   * 4. Docent Dashboard v2.4.0 (Lichte Blueprint-UI · 3 Tabbladen · AVG ‘Hulp nodig’)
   * ------------------------------------------------------------------ */
  const DD_HERO_SHOTS = {
    '1': {
      img: 'assets/img/dashboard/dashboard_01_klasoverzicht_v2_4.webp',
      alt: 'Tabblad 1 Klasoverzicht van het lichte Docent Dashboard v2.4.0 met 10 genummerde VR-brillen, groepsknoppen voor opstarten en klaarzetten en oranje melding bij Hulp nodig',
      caption: '<strong>Tab 1 — Klasoverzicht:</strong> apps openen, oefening klaarzetten voor de groep en direct zien wie rechtsboven in VR op ‘Hulp nodig’ tikt.'
    },
    '2': {
      img: 'assets/img/dashboard/dashboard_02_avg_zelfstudie_klaarzetten_v2_4.webp',
      alt: 'Tabblad 2 Leerling en Klaarzetten in AVG-zelfstudiemodus zonder live videobeeld zolang de student niet op Hulp nodig heeft getikt',
      caption: '<strong>Tab 2a — Zelfstandig (AVG):</strong> geen ongevraagde videostream; de docent ziet alleen het actieve onderdeel en zet oefeningen klaar.'
    },
    '3': {
      img: 'assets/img/dashboard/dashboard_03_live_meekijken_hulp_nodig_v2_4.webp',
      alt: 'Tabblad 2 Live meekijken geopend nadat de student rechtsboven in VR op Hulp nodig tikte, met 1st-person VR-beeld naast de lichte 2D-werktekening',
      caption: '<strong>Tab 2b — Na ‘Hulp nodig’ in VR:</strong> live meekijkbeeld (max. 1 bril tegelijk) naast de 2D-werktekening en groene knop ‘Hulp afgerond’.'
    },
    '4': {
      img: 'assets/img/dashboard/dashboard_04_vrijgave_a4_rapport_v2_4.webp',
      alt: 'Tabblad 3 Vrijgave en A4 Rapport met 5-punts controlelijst voor de echte draaibank, handtekeningveld voor de tekenpen en A4-voorbeeld',
      caption: '<strong>Tab 3 — Vrijgave &amp; A4 Rapport:</strong> 5 vaste veiligheidspunten bij de echte draaibank nalopen, ondertekenen met de tekenpen en lokaal printen.'
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
      TOUR: {
        key: 'TOUR', short: '0. Wegwijs (8 delen)',
        title: 'Wegwijs op de draaibank (8 onderdelen)',
        diaStart: 30.0, diaTarget: 30.0, stepTarget: null, lenMm: 80, rpm: 0,
        note: 'Korte interactieve rondleiding langs vaste kop, beschermkap, klauwplaatsleutel, sledes en noodstop.'
      },
      M1: {
        key: 'M1', short: '1. De Buddy Check',
        title: '1. De Buddy Check (PBM & kleding)',
        diaStart: 30.0, diaTarget: 30.0, stepTarget: null, lenMm: 80, rpm: 0,
        note: 'Medestudent in 3D controleren, eigen veiligheidsbril opzetten en werkhandschoenen uittrekken.'
      },
      P2: {
        key: 'P2', short: '2. Voorbereiden',
        title: '2. Voorbereiden & veiligheidstraining',
        diaStart: 30.0, diaTarget: 30.0, stepTarget: null, lenMm: 84, rpm: 500,
        note: 'Bank vrijmaken, spanningsloos opspannen, klauwplaatsleutel direct terug in houder, kap sluiten en noodstop.'
      },
      OBJ_1: {
        key: 'OBJ_1', short: '3.1 Gladde Paspen',
        title: '3.1 Gladde Paspen (Ø 29,4 mm)',
        diaStart: 30.0, diaTarget: 29.4, stepTarget: null, lenMm: 76, rpm: 500,
        note: 'Langsdraaien van Ø 30,0 naar Ø 29,4 mm, uitloop naar 0 RPM afwachten en nameten met de schuifmaat.'
      },
      OBJ_2: {
        key: 'OBJ_2', short: '3.2 Afstandsbus',
        title: '3.2 Afstandsbus (Kopvlak + Ø 29,0 mm)',
        diaStart: 30.0, diaTarget: 29.0, stepTarget: null, lenMm: 64, rpm: 500,
        note: 'Kopvlak vlakken en buitendiameter draaien naar Ø 29,0 mm met koeling aan.'
      },
      OBJ_3: {
        key: 'OBJ_3', short: '3.3 Getrapte As',
        title: '3.3 Getrapte As (Ø 29,4 & Ø 28,0 mm)',
        diaStart: 30.0, diaTarget: 29.4, stepTarget: 28.0, lenMm: 90, rpm: 710,
        note: 'Twee diameters volgens werktekening draaien (Ø 29,4 mm en trap Ø 28,0 mm over 34 mm lengte).'
      },
      OBJ_4: {
        key: 'OBJ_4', short: '3.4 Aluminium Rol',
        title: '3.4 Aluminium Rol (Ø 28,6 mm)',
        diaStart: 30.0, diaTarget: 28.6, stepTarget: null, lenMm: 72, rpm: 1000,
        note: 'Hoger toerental (1000 RPM) op aluminium, beitelwissel en spanen veilig verwijderen.'
      },
      OBJ_5: {
        key: 'OBJ_5', short: '3.5 Centerpen (storing)',
        title: '3.5 Centerpen (met storing · Ø 28,4 mm)',
        diaStart: 30.0, diaTarget: 28.4, stepTarget: null, lenMm: 82, rpm: 500,
        note: 'Rustig handelen en veilig uitschakelen wanneer halverwege de machinelamp uitvalt.'
      }
    };
    const DD_EX_ORDER = ['TOUR', 'M1', 'P2', 'OBJ_1', 'OBJ_2', 'OBJ_3', 'OBJ_4', 'OBJ_5'];

    const DEFAULT_EX_CYCLE = ['OBJ_1', 'P2', 'OBJ_3', 'OBJ_2', 'P2', 'M1', 'OBJ_4', 'OBJ_1', 'OBJ_5', 'TOUR'];

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
        coolant: exKey === 'OBJ_2' || exKey === 'OBJ_3',
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
    let stagedExKey = 'OBJ_1';
    let stagedMode = 'Begeleid';
    let isDarkTheme = false;
    let bpHoverNormX = null;

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
    const elPhysCounter = document.getElementById('physCheckedCounter');
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
          elSubtitle.textContent = 'TechBuilds VR · 13,1-inch docenttablet · VR-Kar 10 (geen leerlingaccounts)';
        } else if (profKey === 'kar20') {
          elSubtitle.textContent = 'TechBuilds VR · 13,1-inch docenttablet · VR-Kar 20 (geen leerlingaccounts)';
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
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.OBJ_1;

      /* Lichte, rustige VR-werkplaatsachtergrond */
      const sky = ctx.createLinearGradient(0, 0, 0, ht);
      sky.addColorStop(0, '#1B2E47');
      sky.addColorStop(0.58, '#132338');
      sky.addColorStop(1, '#0C1726');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, ht);

      /* Subtiel werkplaatsraster achterwand */
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.10)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 36) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, ht * 0.65);
        ctx.stroke();
      }

      const zoom = h.camView === 'CUT_ZONE' ? 1.24 : (h.camView === 'CHUCK_CLOSE' ? 1.18 : 1.0);
      ctx.save();
      if (zoom > 1.0) {
        const focusX = h.camView === 'CHUCK_CLOSE' ? w * 0.28 : w * 0.56;
        const focusY = ht * 0.54;
        ctx.translate(focusX, focusY);
        ctx.scale(zoom, zoom);
        ctx.translate(-focusX, -focusY);
      }

      /* Draaibankbed */
      ctx.fillStyle = '#334155';
      ctx.fillRect(28, 184, w - 56, 44);
      ctx.fillStyle = '#64748B';
      ctx.fillRect(28, 178, w - 56, 8);

      /* Vaste kop links */
      ctx.fillStyle = '#1E3A5F';
      ctx.fillRect(26, 82, 92, 102);
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(26, 82, 92, 102);

      /* Noodstopknop op vaste kop */
      ctx.fillStyle = '#FACC15';
      ctx.beginPath();
      ctx.arc(62, 146, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.arc(62, 146, 9, 0, Math.PI * 2);
      ctx.fill();

      /* Drieklauwplaat */
      ctx.fillStyle = '#94A3B8';
      ctx.fillRect(118, 98, 36, 72);
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(146, 102, 12, 14);
      ctx.fillRect(146, 152, 12, 14);

      /* Werkstuk (cilinder met eventuele trap) */
      const wpLenPx = Math.round(ex.lenMm * 1.65);
      const wpDiaPx = Math.round(ex.diaTarget * 1.18);
      const wpTop = Math.round(134 - wpDiaPx / 2);
      const metalGrad = ctx.createLinearGradient(0, wpTop, 0, wpTop + wpDiaPx);
      metalGrad.addColorStop(0, '#E2E8F0');
      metalGrad.addColorStop(0.45, '#F8FAFC');
      metalGrad.addColorStop(1, '#94A3B8');
      ctx.fillStyle = metalGrad;

      if (ex.stepTarget) {
        const mainLen = Math.round(wpLenPx * 0.58);
        const stepLen = wpLenPx - mainLen;
        const stepDiaPx = Math.round(ex.stepTarget * 1.10);
        const stepTop = Math.round(134 - stepDiaPx / 2);
        ctx.fillRect(154, wpTop, mainLen, wpDiaPx);
        ctx.fillRect(154 + mainLen, stepTop, stepLen, stepDiaPx);
      } else {
        ctx.fillRect(154, wpTop, wpLenPx, wpDiaPx);
      }

      /* Transparante beschermkap over drieklauw */
      if (!h.freeze) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.72)';
        ctx.lineWidth = 1.5;
        ctx.fillRect(112, 74, 62, 96);
        ctx.strokeRect(112, 74, 62, 96);
      } else {
        /* Klauwplaatsleutel zichtbaar bij veiligheidsstop */
        ctx.fillStyle = '#F97316';
        ctx.fillRect(129, 58, 10, 44);
        ctx.fillRect(116, 56, 36, 8);
      }

      /* Beitelhouder & support op actuele X-positie */
      const toolX = 166 + Math.min(wpLenPx + 14, Math.max(18, Math.round(h.carriageX * 1.25)));
      ctx.fillStyle = '#475569';
      ctx.fillRect(toolX - 16, 152, 46, 34);
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.moveTo(toolX, 136);
      ctx.lineTo(toolX + 12, 152);
      ctx.lineTo(toolX - 6, 152);
      ctx.closePath();
      ctx.fill();

      /* Koelstraal indien ingeschakeld */
      if (h.coolant && !h.paused && ex.rpm > 0) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(toolX + 26, 78);
        ctx.quadraticCurveTo(toolX + 8, 106, toolX, 135);
        ctx.stroke();
      }

      ctx.restore();

      /* Bovenbalk in VR: links oefening, rechtsboven de ‘Hulp nodig’-knop van Draaibank VR v2.2.0 */
      ctx.fillStyle = 'rgba(11, 25, 44, 0.84)';
      ctx.fillRect(10, 10, 238, 28);
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillText('1e-persoon VR · ' + h.name + ' · ' + (h.paused ? '0 RPM' : (ex.rpm + ' RPM')), 18, 28);

      /* De prominente knop rechtsboven in VR */
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(w - 138, 10, 128, 28, 7) : ctx.rect(w - 138, 10, 128, 28);
      ctx.fill();
      ctx.fillStyle = '#0B192C';
      ctx.font = '700 11px Inter, sans-serif';
      ctx.fillText('🙋 Hulp actief (VR)', w - 129, 28);

      /* Onderbalk telemetrie */
      ctx.fillStyle = 'rgba(11, 25, 44, 0.86)';
      ctx.fillRect(0, ht - 30, w, 30);
      ctx.fillStyle = '#93C5FD';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      const capLabel = h.freeze ? '⚠ Sleutel nog in klauwplaat' : ('Kap dicht ✓ · Koeling ' + (h.coolant ? 'AAN' : 'UIT'));
      ctx.fillText(capLabel + ' · X = ' + h.carriageX.toFixed(1) + ' mm', 12, ht - 11);
    }

    function drawBlueprint2D(canvas, h) {
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const ht = canvas.height;
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.OBJ_1;

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

      /* Binnenkader technische tekening */
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(10, 10, w - 20, ht - 20);

      /* Kopregel */
      ctx.fillStyle = '#0B192C';
      ctx.font = '700 11.5px "Space Grotesk", sans-serif';
      ctx.fillText('2D WERKTEKENING · ' + ex.short.toUpperCase(), 20, 29);
      ctx.fillStyle = '#0B5ED7';
      ctx.font = '600 10.5px "JetBrains Mono", monospace';
      ctx.fillText('TOLERANTIE ±0,1 MM · NL & EU', w - 188, 29);

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

        /* Tweede maatlijn */
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
      ctx.fillText('TechBuilds VR · Positie Z: ' + relMm + ' mm · Meten bij 0 RPM (schuifmaat)', 18, ht - 18);
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
        const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.OBJ_1;
        let cardCls = 'dd-headset-card';
        let badgeStyle = 'background:var(--dd-ok-bg);color:var(--dd-ok);border:1px solid var(--dd-ok-border);';
        let badgeText = '✓ Zelfstandig';
        let subHint = 'AVG: geen live video · rustig bezig';

        if (!h.appOpen) {
          badgeStyle = 'background:var(--dd-subtle);color:var(--dd-muted);border:1px solid var(--dd-border);';
          badgeText = '⏹ App gesloten';
          subHint = 'Tik om app of oefening klaar te zetten';
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
          subHint = 'Sleutel nog in klauwplaat · leest uitleg in VR';
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
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.OBJ_1;

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
          btnSimHelp.textContent = 'Open eerst de VR-app om ‘Hulp nodig’ te testen';
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
        const stEx = DD_EXERCISES[stagedExKey] || DD_EXERCISES.OBJ_1;
        btnStageOne.textContent = '📋 Zet ‘' + stEx.short + '’ Klaar op ' + h.name;
      }

      /* Linkerkolom: AVG-gate vs. Live Meekijken na klik op ‘Hulp nodig’ in VR */
      if (elLeftPane) {
        if (!h.appOpen) {
          elLeftPane.innerHTML =
            '<div class="dd-card" style="padding:20px;">' +
              '<span class="dd-badge mono" style="background:var(--dd-subtle);color:var(--dd-muted);border:1px solid var(--dd-border);margin-bottom:8px;">⏹ VR-APP NOG GESLOTEN</span>' +
              '<h3 style="font-family:var(--tb-font-display);font-size:17px;margin:4px 0 8px 0;">' + h.name + ' staat klaar in het keuzescherm</h3>' +
              '<p style="font-size:13px;color:var(--dd-muted);margin:0 0 14px 0;">Open de VR-app op deze bril of kies rechts direct een onderdeel om klaar te zetten zodat de student zonder zoeken kan beginnen.</p>' +
              '<button type="button" class="dd-btn-primary" id="ddQuickOpenLeftBtn">🚀 VR-App Openen op ' + h.name + '</button>' +
            '</div>';
          const qBtn = document.getElementById('ddQuickOpenLeftBtn');
          if (qBtn) {
            qBtn.addEventListener('click', function () {
              h.appOpen = true;
              setStatusMsg('✓ VR-app geopend op ' + h.name + ' (' + ex.title + ').');
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
                  '<div class="mono" style="font-size:10.5px;color:var(--dd-muted);">ACTIEF ONDERDEEL</div>' +
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

              /* Schematisch voorbeeld van het VR-scherm van de student met de knop rechtsboven */
              '<div style="background:#0F1E33;color:#F8FAFC;border-radius:11px;padding:15px 16px;border:1px solid #253B59;">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:12px;">' +
                  '<span class="mono" style="font-size:11px;color:#93C5FD;">SCHERM VAN DE STUDENT IN VR (' + h.name.toUpperCase() + ')</span>' +
                  '<button type="button" class="dd-btn-warn" id="ddInVrHelpTrigger" style="background:#F59E0B;color:#0B192C;border-color:#F59E0B;padding:5px 11px;font-size:11.5px;">🙋 Hulp nodig (rechtsboven in VR)</button>' +
                '</div>' +
                '<p style="font-size:12.5px;color:#CBD5E1;margin:0;line-height:1.5;">' +
                  'Zolang de student zelfstandig oefent, blijft de videostream uitgeschakeld. Zo voelt elke leerling zich vrij om rustig te oefenen in VR. <strong>Klik hierboven op ‘🙋 Hulp nodig’</strong> om te zien hoe het live meekijkbeeld en de 2D-werktekening op de docenttablet openen.' +
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
                  '<button type="button" class="dd-pill ' + (h.camView === 'CUT_ZONE' ? 'is-soft-active' : '') + '" data-dd-cam="CUT_ZONE" style="padding:3px 8px;font-size:11px;">Snijzone</button>' +
                  '<button type="button" class="dd-pill ' + (h.camView === 'CHUCK_CLOSE' ? 'is-soft-active' : '') + '" data-dd-cam="CHUCK_CLOSE" style="padding:3px 8px;font-size:11px;">Drieklauw</button>' +
                '</div>' +
              '</div>' +

              '<div class="dd-split-canvases">' +
                '<div>' +
                  '<canvas id="ddLiveVrCanvas" width="460" height="270" style="width:100%;height:auto;border-radius:9px;display:block;border:1px solid var(--dd-border);"></canvas>' +
                '</div>' +
                '<div>' +
                  '<canvas id="ddLiveBpCanvas" width="460" height="270" style="width:100%;height:auto;border-radius:9px;display:block;border:1px solid var(--dd-border);cursor:crosshair;" title="Beweeg over de werktekening om de positie af te lezen"></canvas>' +
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
          elContextTools.innerHTML =
            '<div style="font-family:var(--tb-font-display);font-weight:700;font-size:14px;margin-bottom:6px;">🛠 Directe Hulpknoppen tijdens Meekijken</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;">' +
              '<button type="button" class="dd-btn-outline" id="ddToolCoolant">💧 Koeling ' + (h.coolant ? 'Uitzetten' : 'Aanzetten') + '</button>' +
              '<button type="button" class="dd-btn-outline" id="ddToolHeight">📏 Werkhoogte ijken</button>' +
              '<button type="button" class="dd-btn-outline" id="ddToolResetStop">🔄 Veiligheidsstop vrijgeven</button>' +
              '<button type="button" class="dd-btn-outline" id="ddToolToRapport">✅ Naar Vrijgave (Tab 3)</button>' +
            '</div>';

          const bCool = document.getElementById('ddToolCoolant');
          const bHeight = document.getElementById('ddToolHeight');
          const bReset = document.getElementById('ddToolResetStop');
          const bToRap = document.getElementById('ddToolToRapport');

          if (bCool) {
            bCool.addEventListener('click', function () {
              h.coolant = !h.coolant;
              setStatusMsg('💧 Koeling op ' + h.name + ' ' + (h.coolant ? 'ingeschakeld' : 'uitgeschakeld') + '.');
              renderTab2();
            });
          }
          if (bHeight) {
            bHeight.addEventListener('click', function () {
              setStatusMsg('📏 Werkhoogte van de draaibank automatisch afgestemd voor ' + h.name + '.');
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
                '<div style="font-size:12px;color:var(--dd-muted);">Loop samen de 5 punten bij de echte draaibank na op Tabblad 3.</div>' +
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
      const ex = DD_EXERCISES[h.exKey] || DD_EXERCISES.OBJ_1;

      if (elA4SlotLabel) elA4SlotLabel.textContent = h.name.toUpperCase() + ' · AVG-BEWUST';
      if (elA4StudentLine) elA4StudentLine.textContent = h.name + ' (naam pas op papier invullen · AVG)';
      if (elA4ActiveEx) elA4ActiveEx.textContent = ex.title;
      if (printRepStudent) {
        printRepStudent.textContent = h.name + ' · Actief onderdeel: ' + ex.title + ' · Naam student (op papier): ______________________';
      }

      const total = physChecks.length || 5;
      const checkedList = [];
      const summaryLines = [];

      physChecks.forEach(function (chk, idx) {
        const num = idx + 1;
        if (chk.checked) {
          checkedList.push(chk.value);
          summaryLines.push('<div style="color:#15803D;font-weight:600;">✓ ' + chk.value + '</div>');
        } else {
          summaryLines.push('<div style="color:#B45309;">○ Punt ' + num + ': nog samen nalopen bij de echte draaibank</div>');
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
          ? ('Afgetekende praktijkpunten bij echte draaibank (' + checkedList.length + '/' + total + '): ' + checkedList.join(' · '))
          : 'Nog samen bij de echte draaibank langs te lopen: Punt 1 t/m Punt 5';
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
        setStatusMsg('🚀 VR-app geopend op alle ' + getActiveSlotsCount() + ' brillen in de groep.');
        renderAll();
      });
    }

    if (btnStageGroup) {
      btnStageGroup.addEventListener('click', function () {
        const chosenKey = (selGroupEx && DD_EXERCISES[selGroupEx.value]) ? selGroupEx.value : 'OBJ_1';
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
        setStatusMsg('⏹ Alle VR-apps netjes afgesloten — brillen staan klaar voor de volgende klas.');
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
        setStatusMsg('🚀 VR-app geopend op ' + h.name + '.');
        renderAll();
      });
    }

    if (btnCloseOne) {
      btnCloseOne.addEventListener('click', function () {
        const h = getSelectedHeadset();
        h.appOpen = false;
        h.help = false;
        setStatusMsg('⏹ VR-app netjes gesloten op ' + h.name + '.');
        renderAll();
      });
    }

    modeBtns.forEach(function (mb) {
      mb.addEventListener('click', function () {
        stagedMode = mb.getAttribute('data-dd-mode');
        renderTab2();
      });
    });

    if (btnStageOne) {
      btnStageOne.addEventListener('click', function () {
        const h = getSelectedHeadset();
        const ex = DD_EXERCISES[stagedExKey] || DD_EXERCISES.OBJ_1;
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
    elektro: {
      img: 'assets/img/elektro/elektro_01_loto_vergrendelen.webp',
      alt: 'Algemene VR-praktijkvoorbereiding voor meterkast, groepenkast en schakelkast volgens NEN 3140 en EN 50110',
      caption: 'Spanningsloos werken bij meterkast en schakelkast (NEN 3140 & EN 50110) · ook uitbreidbaar voor aanvullende opstellingen',
      domeinOption: 'Elektrotechniek & Energie (Meterkast & Schakelkast)'
    },
    metaal: {
      img: 'assets/img/brand/domein_01_metaal_en_verspaning.webp',
      alt: 'Algemene VR-praktijkvoorbereiding voor metaalbewerking en verspaning op freesbank, kolomboormachine en draaibank',
      caption: 'Metaal & Verspaning: algemene voorbereiding op veilig opspannen, afscherming en werken aan freesbank of boormachine',
      domeinOption: 'Metaalbewerking & Verspaning'
    },
    klimaat: {
      img: 'assets/img/brand/domein_04_installatie_en_klimaat.webp',
      alt: 'Algemene VR-praktijkvoorbereiding voor installatie- en klimaattechniek bij warmtepomp en leidingwerk',
      caption: 'Installatie & Klimaat: algemene volgorde voor drukloos stellen, afsluiters bedienen en veilig controleren',
      domeinOption: 'Installatie- & Klimaattechniek'
    },
    mechatronica: {
      img: 'assets/img/brand/domein_03_mechatronica_en_industrie.webp',
      alt: 'Algemene VR-praktijkvoorbereiding voor oefenlijnen en machineveiligheid volgens Europese richtlijnen',
      caption: 'Mechatronica & Industrie: algemene voorbereiding op afscherming, vergrendeling en veilig vrijgeven van oefenlijnen',
      domeinOption: 'Mechatronica & Machineveiligheid'
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
      const machine = document.getElementById('scopeMachine').value.trim() || 'Aanvullende werkplek of installatie';
      const doelgroep = document.getElementById('scopeDoelgroep').value;
      const pakketStatus = document.getElementById('scopeTabletBezit').value;

      const checkedGoals = Array.from(scoperForm.querySelectorAll('input[name="scopeGoal"]:checked')).map(function (el) {
        return el.value;
      });
      const goalsList = checkedGoals.length > 0
        ? checkedGoals.join(', ')
        : 'Kleding- en PBM-check, veilig opstarten en rustig uitschakelen';

      const fullText =
        'SAMENVATTING AANVULLENDE VOORBEREIDING — TECHBUILDS VR\n' +
        '--------------------------------------------------------\n' +
        'Uitgangspunt    : Algemene praktijkvoorbereiding (NL & EU-richtlijnen, geen typetraining)\n' +
        'Vakgebied       : ' + domein + '\n' +
        'Werkplek / kast : ' + machine + '\n' +
        'Voor wie        : ' + doelgroep + '\n' +
        'Leerdoelen      : ' + goalsList + '\n' +
        'Gewenste vorm   : ' + pakketStatus + '\n' +
        'Begeleiding     : Gewoon zichtbaar op het 13,1-inch Docent Dashboard + A4-rapport\n' +
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
          encodeURIComponent('Aanvullende VR-praktijkvoorbereiding — ' + data.machine) +
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
        a.download = 'TechBuilds_VR_Praktijkvoorbereiding_Overzicht.txt';
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
   * 6. Pakket- & Modulekeuze (+ € 5.000,- losse module), Kostenoverzicht & Offerte
   * ------------------------------------------------------------------ */
  const EXTRA_MODULE_PRICE = 5000;
  const MODULE_CHOICES = {
    draaibank: {
      fee: 0,
      sub: '1 module inbegrepen: Draaibank VR — 3 onderdelen (Buddy Check, Voorbereiden & 5 werkstukken)',
      feeText: '€ 0,- (inbegrepen)',
      formValue: 'Draaibank VR — Algemene voorbereiding draaibank (inbegrepen)'
    },
    elektro: {
      fee: 0,
      sub: '1 module inbegrepen: Elektrotechniek VR — Meterkast & schakelkast (NEN 3140 & EU)',
      feeText: '€ 0,- (inbegrepen)',
      formValue: 'Elektrotechniek VR — Meterkast, groepenkast & schakelkast (inbegrepen)'
    },
    beide: {
      fee: EXTRA_MODULE_PRICE,
      sub: 'Draaibank VR (3 onderdelen) + Elektrotechniek VR samen op dezelfde docenttablet en VR-brillen',
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
      heroImg: 'assets/img/brand/pakket_regietablet_vr_set.webp',
      heroCaption: 'Optie 1 (€ 10.000,-): Losse 13,1-inch docenttablet met Docent Dashboard voor eigen VR-brillen — klaarzetten, AVG-meekijken en afsluiten (incl. 1 module)',
      unitSingle: '1 Losse docenttablet-set (eigen brillen)',
      unitPlural: 'Losse docenttablet-sets (eigen brillen)',
      hwSub: 'Losse 13,1-inch docenttablet (tekenpen & stevige hoes) met Docent Dashboard om eigen VR-brillen op te starten, AVG-bewust te begeleiden en af te sluiten',
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
      heroImg: 'assets/img/brand/pakket_mobiele_vr_kar_werkplaats.webp',
      heroCaption: 'Optie 2 (€ 15.000,-): Verrijdbare oplaadkar met 10 VR-brillen, ingebouwde 5G-verbinding en 13,1-inch docenttablet op één stopcontact',
      unitSingle: '1 VR-Kar 10 (10 VR-brillen)',
      unitPlural: 'VR-Karren 10',
      hwSub: 'Verrijdbare oplaadkar (1 stekker) + 10 VR-brillen + ingebouwde wifi- en 5G-router + 13,1-inch docenttablet',
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
      heroImg: 'assets/img/brand/pakket_mobiele_vr_kar_werkplaats.webp',
      heroCaption: 'Optie 3 (€ 25.000,-): Verrijdbare oplaadkar met 20 VR-brillen, ingebouwde 5G-verbinding en 13,1-inch docenttablet voor hele klassen',
      unitSingle: '1 VR-Kar 20 (20 VR-brillen)',
      unitPlural: 'VR-Karren 20',
      hwSub: 'Verrijdbare 20-vaks oplaadkar (1 stekker) + 20 VR-brillen + ingebouwde wifi- en 5G-router + 13,1-inch docenttablet',
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
      const mInfo = MODULE_CHOICES[modKey] || MODULE_CHOICES.draaibank;
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
        const curMod = (selModChoice && MODULE_CHOICES[selModChoice.value]) ? selModChoice.value : 'draaibank';
        const modSuffix = curMod === 'beide' ? ' + extra module (€ 5.000,-)' : (curMod === 'elektro' ? ' · Elektrotechniek VR' : ' · Draaibank VR');
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
        '<span class="tco-bars-title">Vergelijking over ' + years + ' jaar' + (extraModFee > 0 ? ' (incl. + € 5.000,- extra module)' : '') + '</span>' +
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
      const modKey = (selModChoice && MODULE_CHOICES[selModChoice.value]) ? selModChoice.value : 'draaibank';
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
        const mk = (selModChoice && MODULE_CHOICES[selModChoice.value]) ? selModChoice.value : 'draaibank';
        syncModuleSelection(mk);
        syncVisualSelection(key, true);
      });
    }

    if (btnPrintCalc) {
      btnPrintCalc.addEventListener('click', function () {
        window.print();
      });
    }

    /* Lees eventuele URL-keuzes (?optie=1|2|3 & ?module=draaibank|elektro|beide) */
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
      const modChoiceText = selReqMod ? selReqMod.value : 'Draaibank VR — Algemene voorbereiding draaibank';
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
        'Module(s)    : ' + modChoiceText + '\n\n' +
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
