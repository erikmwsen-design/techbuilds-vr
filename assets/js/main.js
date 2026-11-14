/**
 * TechBuilds VR — Interactieve Website Logica (v2.3)
 * Onderdelen:
 * 1. Vaste navigatiebalk, leesbalk, mobiele snelbalk, terug-naar-boven & subtiele scroll-animatie
 * 2. Interactieve Hero-tegels & fotowisselaar op de startpagina (index.html)
 * 3. Interactief stappenoverzicht voor Draaibank VR (1–6) én Elektrotechniek VR (1–6) volgens NL & EU-richtlijnen
 * 4. Interactief voorbeeld van het 13,1-inch Teacher Dashboard + printbaar A4-praktijkrapport (docentapp-tablet.html)
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
      img: 'assets/img/brand/pakket_regietablet_vr_set.webp',
      alt: '13,1-inch docenttablet met het Teacher Dashboard naast de bijbehorende tekenpen, een VR-bril en een schuifmaat',
      caption: 'School kiest voor VR-kar of tablet: apps en scenario\'s opstarten, AVG-vriendelijk meekijken op verzoek en gezamenlijk afsluiten',
      linkText: 'Bekijk het Teacher Dashboard →',
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
   * 4. 13,1-inch Teacher Dashboard (AVG-bewust) + A4-Praktijkoverzicht
   * ------------------------------------------------------------------ */
  const cockpitRoot = document.getElementById('docentCockpitSim');
  if (cockpitRoot) {
    const initialSlots = parseInt(cockpitRoot.getAttribute('data-slots') || '10', 10);
    const BASE_HEADSETS = [
      {
        slotNum: 1, id: 'Bril 01', label: 'Zelfstandig bezig', mod: 'Deel 3 · Werkstuk 3 (Getrapte as)',
        shortPart: 'Deel 3 · As', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 710, diaMain: 29.4, diaStep: 28.0, carriageX: 64.5,
        overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 88,
        note: 'Werkt zelfstandig aan Werkstuk 3 (Getrapte as). Geen leerlingnaam opgeslagen; meekijken pas bij hulpvraag (AVG).',
        bookmarks: [
          { frame: 8, label: 'Onderdeel 2 veilig afgerond', warn: false },
          { frame: 22, label: 'Kopvlak gevlakt', warn: false },
          { frame: 35, label: 'Maat Ø 29,4 mm bereikt', warn: false }
        ]
      },
      {
        slotNum: 2, id: 'Bril 02', label: 'Vraagt hulp · meekijken gewenst', mod: 'Deel 2 · Voorbereiden & veiligheid',
        shortPart: 'Deel 2 · Veilig', status: 'HULP GEVRAAGD', statusClass: 'status-danger',
        consentToView: true, appClosed: false,
        rpm: 0, diaMain: 30.0, diaStep: 30.0, carriageX: 118.0,
        overheated: false, guardClosed: false, chuckKeyIn: true, runout: 0.03, reactionSec: '0,7 sec', battery: 92,
        note: 'Student vraagt begeleiding en geeft toestemming om mee te kijken (AVG): klauwplaatsleutel zat nog in de drieklauw.',
        bookmarks: [
          { frame: 14, label: 'Werkstuk Ø 30 mm ingespannen', warn: false },
          { frame: 28, label: 'Sleutel nog in klauwplaat', warn: true }
        ]
      },
      {
        slotNum: 3, id: 'Bril 03', label: 'Vraagt hulp · meekijken gewenst', mod: 'Deel 3 · Werkstuk 4 (Aluminium rol)',
        shortPart: 'Deel 3 · Rol', status: 'HULP GEVRAAGD', statusClass: 'status-warn',
        consentToView: true, appClosed: false,
        rpm: 1000, diaMain: 29.6, diaStep: 28.4, carriageX: 82.0,
        overheated: true, guardClosed: true, chuckKeyIn: false, runout: 0.04, reactionSec: '0,7 sec', battery: 76,
        note: 'Student vraagt even mee te kijken bij Werkstuk 4: gekozen snedediepte geeft lichte trilling op de beitel.',
        bookmarks: [
          { frame: 12, label: 'Gestart met gesloten kap', warn: false },
          { frame: 31, label: 'Trilling bij diepe aanzet', warn: true }
        ]
      },
      {
        slotNum: 4, id: 'Bril 04', label: 'Zelfstandig bezig', mod: 'Deel 3 · Werkstuk 5 (Centerpen)',
        shortPart: 'Deel 3 · Pen', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 0, diaMain: 29.4, diaStep: 28.0, carriageX: 96.0,
        overheated: false, guardClosed: true, chuckKeyIn: false, runout: 1.85, reactionSec: '0,6 sec', battery: 84,
        note: 'Werkt zelfstandig aan Werkstuk 5 (Centerpen met storing). Noodstop netjes binnen 0,6 sec ingedrukt.',
        bookmarks: [
          { frame: 19, label: 'Slingering opgemerkt', warn: true },
          { frame: 25, label: 'Noodstop ingedrukt (0,6 sec)', warn: false }
        ]
      },
      {
        slotNum: 5, id: 'Bril 05', label: 'Zelfstandig bezig', mod: 'Deel 1 · De Buddy Check',
        shortPart: 'Deel 1 · Buddy', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 0, diaMain: 30.0, diaStep: 30.0, carriageX: 140.0,
        overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,7 sec', battery: 95,
        note: 'Bezig met Onderdeel 1 (De Buddy Check): kleding medestudent controleren, bril op en handschoenen uit.',
        bookmarks: [
          { frame: 16, label: 'Buddy Check & eigen PBM bezig', warn: false }
        ]
      },
      {
        slotNum: 6, id: 'Bril 06', label: 'Zelfstandig bezig', mod: 'Deel 3 · Werkstuk 1 (Paspen)',
        shortPart: 'Deel 3 · Paspen', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 0, diaMain: 29.3, diaStep: 28.0, carriageX: 132.0,
        overheated: false, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 81,
        note: 'Werkt zelfstandig aan Werkstuk 1 (Gladde paspen): stilstand afgewacht en schuifmaat gepakt.',
        bookmarks: [
          { frame: 20, label: 'Stilstand (0 RPM) afgewacht', warn: false },
          { frame: 33, label: 'Nagemeten met schuifmaat', warn: false }
        ]
      },
      {
        slotNum: 7, id: 'Bril 07', label: 'Zelfstandig bezig', mod: 'Deel 2 · Voorbereiden & veiligheid',
        shortPart: 'Deel 2 · Veilig', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 0, diaMain: 30.0, diaStep: 30.0, carriageX: 140.0,
        overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,7 sec', battery: 79,
        note: 'Bezig met Onderdeel 2: vloer en draaibank vrijgemaakt en rondom de spil gecontroleerd.',
        bookmarks: [
          { frame: 18, label: 'Draaibank vrijgemaakt', warn: false }
        ]
      },
      {
        slotNum: 8, id: 'Bril 08', label: 'Zelfstandig bezig', mod: 'Deel 3 · Werkstuk 2 (Afstandsbus)',
        shortPart: 'Deel 3 · Bus', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 710, diaMain: 29.5, diaStep: 28.1, carriageX: 58.2,
        overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 90,
        note: 'Werkt zelfstandig aan Werkstuk 2 (Afstandsbus) met rustige langsvoeding.',
        bookmarks: [
          { frame: 10, label: 'Onderdeel 2 behaald', warn: false },
          { frame: 30, label: 'Afstandsbus op lengte', warn: false }
        ]
      },
      {
        slotNum: 9, id: 'Bril 09', label: 'Zelfstandig bezig', mod: 'Wegwijs op de draaibank (2 min)',
        shortPart: 'Wegwijs · 8 ptn', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 500, diaMain: 30.0, diaStep: 30.0, carriageX: 112.0,
        overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 87,
        note: 'Bekijkt eerst rustig de korte rondleiding langs de 8 hoofdonderdelen van de draaibank.',
        bookmarks: [{ frame: 24, label: '8 onderdelen bekeken', warn: false }]
      },
      {
        slotNum: 10, id: 'Bril 10', label: 'Zelfstandig bezig', mod: 'Deel 1 · De Buddy Check',
        shortPart: 'Deel 1 · Buddy', status: 'BEZIG', statusClass: 'status-safe',
        consentToView: false, appClosed: false,
        rpm: 0, diaMain: 29.4, diaStep: 28.0, carriageX: 138.0,
        overheated: false, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 93,
        note: 'Bezig met Onderdeel 1 (De Buddy Check): eigen veiligheidsbril op en werkhandschoenen uitgedaan.',
        bookmarks: [{ frame: 30, label: 'Eigen PBM gecontroleerd', warn: false }]
      }
    ];

    for (let n = 11; n <= 22; n++) {
      const tpl = BASE_HEADSETS[(n - 1) % 10];
      const padId = 'Bril ' + (n < 10 ? '0' + n : String(n));
      BASE_HEADSETS.push({
        slotNum: n,
        id: padId,
        label: 'Zelfstandig bezig',
        mod: tpl.mod,
        shortPart: tpl.shortPart,
        status: 'BEZIG',
        statusClass: 'status-safe',
        consentToView: false,
        appClosed: false,
        rpm: tpl.rpm,
        diaMain: tpl.diaMain,
        diaStep: tpl.diaStep,
        carriageX: tpl.carriageX,
        overheated: false,
        guardClosed: true,
        chuckKeyIn: false,
        runout: 0.02,
        reactionSec: tpl.reactionSec,
        battery: Math.max(72, 98 - n),
        note: 'Werkt zelfstandig op ' + padId + ' zonder leerlingaccount (AVG).',
        bookmarks: tpl.bookmarks
      });
    }

    let currentProfile = initialSlots === 20 ? 'kar20' : 'kar10';
    let activeCount = initialSlots;
    let HEADSETS = BASE_HEADSETS.slice(0, activeCount);
    let selectedIdx = 1; /* Start op Bril 02 waar de student zelf om hulp en meekijken vraagt */
    let groupPaused = false;
    let appsClosed = false;
    let coolantActive = true;
    let scrubFrame = 35;
    let activeSpectatorCam = 'OVERVIEW_3Q';
    let statusFilter = 'all';
    let replayInterval = null;

    const slotsContainer = document.getElementById('cockpitSlotsGrid');
    const protocolLine = document.getElementById('cockpitProtocolLine');
    const canvas = document.getElementById('cockpitBlueprintCanvas');
    const elSelHeader = document.getElementById('cockpitSelHeader');
    const elSelNote = document.getElementById('cockpitSelNote');
    const elStreamBadge = document.getElementById('cockpitStreamBadge');
    const elAvgStrip = document.getElementById('cockpitAvgStrip');
    const elAvgText = document.getElementById('cockpitAvgText');
    const btnToggleAvg = document.getElementById('btnToggleAvgConsent');
    const elTelRpm = document.getElementById('telRpm');
    const elTelCarriage = document.getElementById('telCarriage');
    const elTelDia = document.getElementById('telDia');
    const elTelGate = document.getElementById('telGate');
    const elReplaySlider = document.getElementById('cockpitReplaySlider');
    const elReplayReadout = document.getElementById('cockpitReplayReadout');
    const btnReplayPlay = document.getElementById('btnReplayPlay');
    const elBookmarks = document.getElementById('cockpitBookmarks');
    const elLiveBanner = document.getElementById('cockpitLiveBanner');
    const elActionToast = document.getElementById('cockpitActionToast');
    const btnStartScenario = document.getElementById('btnCockpitStartScenario');
    const btnGroupPause = document.getElementById('btnCockpitGroupPause');
    const btnCloseApps = document.getElementById('btnCockpitCloseApps');
    const btnOpenReport = document.getElementById('btnCockpitOpenReport');
    const btnHeroOpenReport = document.getElementById('tabletHeroReportBtn');
    const heroProfileBtns = document.querySelectorAll('[data-hero-profile]');
    const startPartBtns = cockpitRoot.querySelectorAll('[data-start-part]');
    let toastFlashTimer = null;

    const CAM_LABELS = {
      OVERVIEW_3Q: 'Overzicht',
      CUT_ZONE: 'Dicht op werkstuk',
      CHUCK_CLOSE: 'Klauwplaat & kap',
      SPEED_CHART: 'Toerentabel'
    };

    const PART_CONFIGS = {
      '1': {
        mod: 'Deel 1 · De Buddy Check',
        shortPart: 'Deel 1 · Buddy',
        note: 'App & scenario opgestart op Onderdeel 1 (De Buddy Check): medestudent controleren en eigen PBM kiezen.'
      },
      '2': {
        mod: 'Deel 2 · Voorbereiden & veiligheid',
        shortPart: 'Deel 2 · Veilig',
        note: 'App & scenario opgestart op Onderdeel 2 (Voorbereiden & veiligheid): opspannen, sleutel eruit, kap dicht en noodstop.'
      },
      '3': {
        mod: 'Deel 3 · Praktijkgebruik (5 werkstukken)',
        shortPart: 'Deel 3 · 5 Obj',
        note: 'App & scenario opgestart op Onderdeel 3: student kiest één van de 5 oefenwerkstukken.'
      },
      'TOUR': {
        mod: 'Wegwijs op de draaibank (2 min)',
        shortPart: 'Wegwijs · 8 ptn',
        note: 'Korte 2-minuten rondleiding langs de 8 onderdelen van de draaibank klaargezet.'
      }
    };

    function stopReplayLoop() {
      if (replayInterval) {
        clearInterval(replayInterval);
        replayInterval = null;
      }
      if (btnReplayPlay) {
        btnReplayPlay.textContent = '▶ Afspelen';
      }
    }
    cleanupFns.push(stopReplayLoop);

    function showToast(msg) {
      if (elActionToast) elActionToast.textContent = msg;
      if (elLiveBanner) {
        elLiveBanner.classList.add('is-flash');
        if (toastFlashTimer) clearTimeout(toastFlashTimer);
        toastFlashTimer = setTimeout(function () {
          elLiveBanner.classList.remove('is-flash');
        }, 420);
      }
    }

    function refreshProtocolHeader() {
      if (!protocolLine) return;
      if (currentProfile === 'kar10') {
        protocolLine.textContent = 'OPSTELLING · VR-KAR 10 (10 BRILLEN VERBONDEN · GEEN ACCOUNTS)';
      } else if (currentProfile === 'kar20') {
        protocolLine.textContent = 'OPSTELLING · VR-KAR 20 (20 BRILLEN VERBONDEN · GEEN ACCOUNTS)';
      } else {
        protocolLine.textContent = 'OPSTELLING · LOSSE TABLET (' + activeCount + ' EIGEN BRILLEN VERBONDEN · GEEN ACCOUNTS)';
      }
    }

    function applyCockpitProfile(profKey) {
      currentProfile = profKey;
      cockpitRoot.querySelectorAll('[data-cockpit-profile]').forEach(function (b) {
        const active = b.getAttribute('data-cockpit-profile') === profKey;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      heroProfileBtns.forEach(function (hb) {
        hb.classList.toggle('is-active', hb.getAttribute('data-hero-profile') === profKey);
      });

      if (profKey === 'kar10') {
        activeCount = 10;
      } else if (profKey === 'kar20') {
        activeCount = 20;
      } else {
        activeCount = 12;
      }
      refreshProtocolHeader();
      HEADSETS = BASE_HEADSETS.slice(0, activeCount);
      if (selectedIdx >= HEADSETS.length) selectedIdx = 0;
      updateCockpit();
      showToast(
        'Gewisseld naar ' +
        (profKey === 'kar10' ? 'VR-Kar 10 (10 brillen)' : profKey === 'kar20' ? 'VR-Kar 20 (20 brillen)' : 'Losse docenttablet bij eigen brillen') +
        ' — opstarten, AVG-meekijken en afsluiten werken overal hetzelfde.'
      );
    }

    cockpitRoot.querySelectorAll('[data-cockpit-profile]').forEach(function (pBtn) {
      pBtn.addEventListener('click', function () {
        applyCockpitProfile(pBtn.getAttribute('data-cockpit-profile'));
      });
    });

    heroProfileBtns.forEach(function (hb) {
      hb.addEventListener('click', function () {
        const prof = hb.getAttribute('data-hero-profile');
        applyCockpitProfile(prof);
        const simSec = document.getElementById('live-simulator');
        if (simSec) {
          simSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    cockpitRoot.querySelectorAll('[data-cockpit-filter]').forEach(function (fBtn) {
      fBtn.addEventListener('click', function () {
        statusFilter = fBtn.getAttribute('data-cockpit-filter');
        cockpitRoot.querySelectorAll('[data-cockpit-filter]').forEach(function (b) {
          b.classList.toggle('is-active', b === fBtn);
        });
        updateCockpit();
      });
    });

    cockpitRoot.querySelectorAll('[data-spectator-cam]').forEach(function (cBtn) {
      cBtn.addEventListener('click', function () {
        activeSpectatorCam = cBtn.getAttribute('data-spectator-cam');
        cockpitRoot.querySelectorAll('[data-spectator-cam]').forEach(function (b) {
          b.classList.toggle('is-active', b === cBtn);
        });
        updateCockpit();
        const h = HEADSETS[selectedIdx];
        if (h.consentToView && !appsClosed && !h.appClosed) {
          showToast('Meekijkhoek gewisseld naar "' + CAM_LABELS[activeSpectatorCam] + '" op ' + h.id + '.');
        } else {
          showToast('Meekijkhoek klaargezet — beeld is pas zichtbaar zodra de student op ' + h.id + ' meekijken wenst (AVG).');
        }
      });
    });

    function renderSlots() {
      if (!slotsContainer) return;
      let html = HEADSETS.map(function (h, idx) {
        const isClosed = appsClosed || h.appClosed;
        const needsHelp = !isClosed && h.status === 'HULP GEVRAAGD';
        if (statusFilter === 'attention' && !needsHelp) {
          return '';
        }
        if (statusFilter === 'active' && (isClosed || needsHelp)) {
          return '';
        }
        let badgeText = h.status;
        let badgeCls = h.statusClass;
        if (isClosed) {
          badgeText = 'AFGESLOTEN';
          badgeCls = 'status-info';
        } else if (groupPaused) {
          badgeText = 'PAUZE';
          badgeCls = 'status-warn';
        }
        const isSel = idx === selectedIdx;
        const slotSub = isClosed
          ? 'App netjes afgesloten'
          : (h.consentToView ? 'Meekijken gewenst (AVG)' : 'Werkt zelfstandig (AVG)');
        return (
          '<button type="button" class="bril-slot ' + (isSel ? 'is-selected' : '') + '" data-slot-idx="' + idx + '" id="slotBtn_' + h.slotNum + '">' +
            '<div class="bril-slot-top">' +
              '<span class="mono" style="font-size:0.72rem;font-weight:600;color:' + (isSel ? '#38BDF8' : '#94A3B8') + ';">' + h.id + ' · ' + h.battery + '%</span>' +
              '<span class="status-badge ' + badgeCls + '">' + badgeText + '</span>' +
            '</div>' +
            '<span class="bril-slot-name">' + slotSub + '</span>' +
            '<span class="bril-slot-meta">' + (isClosed ? 'Klaar voor lader / volgende klas' : h.mod) + '</span>' +
          '</button>'
        );
      }).join('');

      if (currentProfile === 'unlimited' && activeCount < BASE_HEADSETS.length && statusFilter === 'all') {
        html +=
          '<button type="button" class="bril-slot" id="btnAddUnlimitedHeadset" style="border-style:dashed;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">' +
            '<span class="mono" style="font-size:0.76rem;color:#38BDF8;font-weight:600;">+ EIGEN BRIL KOPPELEN</span>' +
            '<span class="bril-slot-meta">Meldt zich op brilnummer (AVG)</span>' +
          '</button>';
      }

      slotsContainer.innerHTML = html;

      slotsContainer.querySelectorAll('[data-slot-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          stopReplayLoop();
          selectedIdx = parseInt(btn.getAttribute('data-slot-idx'), 10);
          scrubFrame = 35;
          if (elReplaySlider) elReplaySlider.value = '35';
          updateCockpit();
          const h = HEADSETS[selectedIdx];
          if (appsClosed || h.appClosed) {
            showToast(h.id + ' geselecteerd — de app op deze bril is netjes afgesloten.');
          } else if (h.consentToView) {
            showToast(h.id + ' geselecteerd — student vraagt hulp en wenst dat je even meekijkt (AVG).');
          } else {
            showToast(h.id + ' geselecteerd — student werkt zelfstandig; beeld blijft afgeschermd tot meekijken nodig en gewenst is (AVG).');
          }
        });
      });

      const addBtn = document.getElementById('btnAddUnlimitedHeadset');
      if (addBtn) {
        addBtn.addEventListener('click', function () {
          if (activeCount < BASE_HEADSETS.length) {
            activeCount += 1;
            HEADSETS = BASE_HEADSETS.slice(0, activeCount);
            selectedIdx = activeCount - 1;
            refreshProtocolHeader();
            updateCockpit();
            showToast('Extra eigen VR-bril (' + HEADSETS[selectedIdx].id + ') gekoppeld op nummer zonder leerlingaccount.');
          }
        });
      }
    }

    function drawBlueprint(h, frameRatio) {
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const ht = canvas.height;
      const isClosed = appsClosed || h.appClosed;

      ctx.clearRect(0, 0, w, ht);
      ctx.fillStyle = '#07111F';
      ctx.fillRect(0, 0, w, ht);

      /* Subtiel technisch raster op de achtergrond */
      ctx.strokeStyle = 'rgba(36, 70, 110, 0.22)';
      ctx.lineWidth = 1;
      for (let gx = 40; gx < w; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, ht - 26);
        ctx.stroke();
      }
      for (let gy = 36; gy < ht - 26; gy += 36) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      /* Toestand A: Apps zijn afgesloten */
      if (isClosed) {
        ctx.fillStyle = '#0D1E35';
        ctx.strokeStyle = '#24466E';
        ctx.lineWidth = 1.4;
        ctx.fillRect(64, 34, w - 128, ht - 84);
        ctx.strokeRect(64, 34, w - 128, ht - 84);

        ctx.fillStyle = '#38BDF8';
        ctx.font = '600 13px "JetBrains Mono", monospace';
        ctx.fillText('⏹ APPS NETJES AFGESLOTEN OP ' + (appsClosed ? 'ALLE BRILLEN' : h.id.toUpperCase()), 90, 74);

        ctx.fillStyle = '#E2E8F0';
        ctx.font = '500 13px "Inter", sans-serif';
        ctx.fillText('Geen leerlinggegevens bewaard · brillen zijn klaar voor de lader of volgende groep.', 90, 104);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '400 11.5px "JetBrains Mono", monospace';
        ctx.fillText('Klik op "▶ Start app & scenario" om een nieuw onderdeel klaar te zetten.', 90, 132);

        ctx.fillStyle = 'rgba(7, 17, 31, 0.90)';
        ctx.fillRect(0, ht - 26, w, 26);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '400 10.5px "JetBrains Mono", monospace';
        ctx.fillText('STATUS: APPS AFGESLOTEN  ·  GEEN CLOUDOPSLAG (AVG)  ·  ACCUNIVEAU ' + h.id.toUpperCase() + ': ' + h.battery + '%', 14, ht - 9);
        return;
      }

      /* Toestand B: Student werkt zelfstandig (geen meekijk-verzoek, AVG-privacy actief) */
      if (!h.consentToView) {
        ctx.fillStyle = '#0D1E35';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
        ctx.lineWidth = 1.4;
        ctx.fillRect(52, 28, w - 104, ht - 76);
        ctx.strokeRect(52, 28, w - 104, ht - 76);

        ctx.fillStyle = '#38BDF8';
        ctx.font = '600 12.5px "JetBrains Mono", monospace';
        ctx.fillText('AVG-PRIVACY ACTIEF OP ' + h.id.toUpperCase() + ' — STUDENT WERKT ZELFSTANDIG', 76, 66);

        ctx.fillStyle = '#E2E8F0';
        ctx.font = '500 13px "Inter", sans-serif';
        ctx.fillText('Actief onderdeel: ' + h.mod, 76, 95);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '400 12px "Inter", sans-serif';
        ctx.fillText('Live meekijken staat standaard uit en opent alleen indien nodig én gewenst door de student.', 76, 121);
        ctx.fillStyle = '#CBD5E1';
        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.fillText('Tip: klik hierboven op "Simuleer hulpvraag student" om met toestemming mee te kijken.', 76, 146);

        ctx.fillStyle = 'rgba(7, 17, 31, 0.90)';
        ctx.fillRect(0, ht - 26, w, 26);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '400 10.5px "JetBrains Mono", monospace';
        ctx.fillText('MODUS: ZELFSTANDIG OEFENEN  ·  GEEN LEERLINGACCOUNT  ·  ONDERDEEL: ' + h.shortPart.toUpperCase(), 14, ht - 9);
        return;
      }

      /* Toestand C: Student vraagt begeleiding en geeft toestemming om mee te kijken */
      ctx.save();
      if (activeSpectatorCam === 'CUT_ZONE') {
        ctx.translate(-145, -18);
        ctx.scale(1.28, 1.28);
      } else if (activeSpectatorCam === 'CHUCK_CLOSE') {
        ctx.translate(18, -22);
        ctx.scale(1.32, 1.32);
      }

      const cy = Math.round(ht * 0.48);

      if (activeSpectatorCam === 'SPEED_CHART') {
        ctx.fillStyle = '#0D1E35';
        ctx.strokeStyle = '#24466E';
        ctx.lineWidth = 1.2;
        ctx.fillRect(36, 28, w - 72, ht - 72);
        ctx.strokeRect(36, 28, w - 72, ht - 72);

        ctx.fillStyle = '#38BDF8';
        ctx.font = '600 12px "JetBrains Mono", monospace';
        ctx.fillText('CONVENTIONELE DRAAIBANK — TOERENTABEL', 56, 54);

        const speeds = [250, 355, 500, 710, 1000, 1400];
        speeds.forEach(function (sp, idx) {
          const bx = 56 + idx * 88;
          const isCurrent = sp === h.rpm || (h.rpm === 0 && sp === 500);
          ctx.fillStyle = isCurrent ? '#0B5ED7' : '#132946';
          ctx.fillRect(bx, 74, 76, 56);
          ctx.strokeStyle = isCurrent ? '#38BDF8' : '#26456B';
          ctx.strokeRect(bx, 74, 76, 56);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '600 13px "JetBrains Mono", monospace';
          ctx.fillText(sp + '', bx + 14, 100);
          ctx.fillStyle = '#94A3B8';
          ctx.font = '400 10px "JetBrains Mono", monospace';
          ctx.fillText('RPM', bx + 14, 118);
        });

        ctx.fillStyle = '#CBD5E1';
        ctx.font = '400 11px "JetBrains Mono", monospace';
        ctx.fillText('Ingesteld op ' + h.id + ': ' + (groupPaused ? 0 : h.rpm) + ' RPM  ·  Startwaarde Onderdeel 2: 500 RPM', 56, 154);
        ctx.restore();
      } else {
        /* Bedbanen van de draaibank onderlangs */
        const bedY = cy + 64;
        ctx.fillStyle = '#0F2036';
        ctx.strokeStyle = '#254266';
        ctx.lineWidth = 1.2;
        ctx.fillRect(28, bedY, w - 56, 16);
        ctx.strokeRect(28, bedY, w - 56, 16);

        /* Hartlijn */
        ctx.strokeStyle = '#23446B';
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 5, 2, 5]);
        ctx.beginPath();
        ctx.moveTo(24, cy);
        ctx.lineTo(w - 24, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        /* Drieklauwplaat */
        ctx.fillStyle = '#1B2B42';
        ctx.strokeStyle = '#64748B';
        ctx.lineWidth = 1.5;
        ctx.fillRect(42, cy - 56, 56, 112);
        ctx.strokeRect(42, cy - 56, 56, 112);

        ctx.fillStyle = '#334863';
        ctx.fillRect(86, cy - 45, 22, 16);
        ctx.fillRect(86, cy + 29, 22, 16);

        /* Klauwplaatbeschermkap */
        ctx.strokeStyle = h.guardClosed ? '#22C55E' : '#F59E0B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (h.guardClosed) {
          ctx.rect(35, cy - 64, 78, 128);
        } else {
          ctx.moveTo(35, cy - 64);
          ctx.lineTo(102, cy - 94);
        }
        ctx.stroke();

        if (h.chuckKeyIn) {
          ctx.fillStyle = '#EF4444';
          ctx.fillRect(60, cy - 88, 14, 34);
          ctx.fillStyle = '#FCA5A5';
          ctx.font = '600 11px "JetBrains Mono", monospace';
          ctx.fillText('SLEUTEL NOG IN KLAUWPLAAT (HULPVRAAG)', 130, 24);
        }

        const wobbleOffset = h.runout > 0.5 ? (scrubFrame % 2 === 0 ? 5 : -4) : 0;
        const mainHalfH = Math.round((h.diaMain / 30.0) * 30);
        const stepProgress = Math.min(1, Math.max(0.08, frameRatio));
        const stepHalfH = Math.round((h.diaStep / 30.0) * 30);

        /* Werkstuk hoofdcilinder + afgedraaide trap */
        const totalStockLen = 330;
        const turnedStepLen = Math.round(135 * stepProgress);
        const unturnedLen = totalStockLen - turnedStepLen;

        ctx.fillStyle = h.overheated ? '#D97706' : '#94A3B8';
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1.2;
        ctx.fillRect(108, cy - mainHalfH + wobbleOffset, unturnedLen, mainHalfH * 2);
        ctx.strokeRect(108, cy - mainHalfH + wobbleOffset, unturnedLen, mainHalfH * 2);

        ctx.fillStyle = h.overheated ? '#F59E0B' : '#CBD5E1';
        ctx.fillRect(108 + unturnedLen, cy - stepHalfH - wobbleOffset, turnedStepLen, stepHalfH * 2);
        ctx.strokeRect(108 + unturnedLen, cy - stepHalfH - wobbleOffset, turnedStepLen, stepHalfH * 2);

        /* Meebewegende beitelslede + beitelhouder */
        const toolTipX = 108 + unturnedLen + 4;
        const toolTipY = cy + stepHalfH + 2;

        if (coolantActive && !groupPaused && h.rpm > 0) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.moveTo(toolTipX + 26, cy - 58);
          ctx.lineTo(toolTipX, cy + stepHalfH - 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        /* Snijpunt */
        if (!groupPaused && h.rpm > 0) {
          ctx.fillStyle = h.overheated ? 'rgba(245, 158, 11, 0.65)' : 'rgba(56, 189, 248, 0.45)';
          ctx.beginPath();
          ctx.arc(toolTipX - 2, toolTipY - 2, h.overheated ? 7 : 4.5, 0, Math.PI * 2);
          ctx.fill();
        }

        /* Beitelpunt */
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.moveTo(toolTipX, toolTipY);
        ctx.lineTo(toolTipX + 14, toolTipY + 22);
        ctx.lineTo(toolTipX - 8, toolTipY + 22);
        ctx.closePath();
        ctx.fill();

        /* Dwarsslede & Langsslede op het bed */
        const carriageW = 68;
        const carriageLeft = Math.round(toolTipX - 24);
        ctx.fillStyle = '#1B3556';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.2;
        ctx.fillRect(carriageLeft, toolTipY + 22, 52, Math.max(14, bedY - (toolTipY + 22)));
        ctx.strokeRect(carriageLeft, toolTipY + 22, 52, Math.max(14, bedY - (toolTipY + 22)));

        ctx.fillStyle = '#24466E';
        ctx.fillRect(carriageLeft - 8, bedY - 4, carriageW, 22);
        ctx.strokeRect(carriageLeft - 8, bedY - 4, carriageW, 22);

        /* Maatvoering boven het werkstuk */
        ctx.fillStyle = '#38BDF8';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillText('Ø ' + h.diaMain.toFixed(1).replace('.', ',') + ' ±0,2 mm', 116, cy - 40);
        ctx.fillText('TRAP Ø ' + h.diaStep.toFixed(1).replace('.', ',') + ' mm', Math.max(255, toolTipX - 18), cy - 40);
        ctx.restore();
      }

      /* Overzichtsbalk onderin het scherm */
      const dynCarriage = (h.carriageX + (35 - scrubFrame) * 1.2).toFixed(1).replace('.', ',');
      ctx.fillStyle = 'rgba(7, 17, 31, 0.90)';
      ctx.fillRect(0, ht - 26, w, 26);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '400 10.5px "JetBrains Mono", monospace';
      ctx.fillText(
        'MEEKIJKEN OP VERZOEK (AVG) · ' + CAM_LABELS[activeSpectatorCam] +
        '  ·  SLEDE: ' + dynCarriage + ' mm' +
        '  ·  ' + (h.guardClosed ? 'KAP DICHT' : 'KAP OPEN') +
        '  ·  KOELING: ' + (coolantActive ? 'AAN' : 'UIT'),
        14,
        ht - 9
      );
    }

    function updateCockpit() {
      const h = HEADSETS[selectedIdx];
      const ratio = scrubFrame / 35;
      const isClosed = appsClosed || h.appClosed;
      renderSlots();

      if (elSelHeader) {
        if (isClosed) {
          elSelHeader.textContent = h.id + ' — App netjes afgesloten (klaar voor volgende groep)';
        } else if (h.consentToView) {
          elSelHeader.textContent = h.id + ' — ' + h.mod + ' (meekijken gewenst · AVG)';
        } else {
          elSelHeader.textContent = h.id + ' — ' + h.mod + ' (zelfstandig bezig)';
        }
      }
      if (elStreamBadge) {
        elStreamBadge.textContent = 'GESELECTEERD: ' + h.id.toUpperCase();
      }
      if (elAvgStrip && elAvgText && btnToggleAvg) {
        if (isClosed) {
          elAvgStrip.classList.add('is-private');
          elAvgText.textContent = '⏹ Apps op ' + (appsClosed ? 'alle brillen' : h.id) + ' zijn afgesloten. Geen sessiedata in de cloud opgeslagen.';
          btnToggleAvg.textContent = 'Start app opnieuw';
        } else if (h.consentToView) {
          elAvgStrip.classList.remove('is-private');
          elAvgText.textContent = '✓ Student op ' + h.id + ' vraagt hulp en geeft toestemming om mee te kijken (AVG).';
          btnToggleAvg.textContent = 'Meekijken sluiten';
        } else {
          elAvgStrip.classList.add('is-private');
          elAvgText.textContent = '🔒 AVG-vriendelijk: student op ' + h.id + ' werkt zelfstandig. Meekijken alleen indien nodig en gewenst.';
          btnToggleAvg.textContent = 'Simuleer hulpvraag student';
        }
      }
      if (elSelNote) {
        if (isClosed) {
          elSelNote.textContent = 'De apps zijn rustig afgesloten. Klik hieronder op één van de 3 onderdelen (of Wegwijs) om de app voor de volgende groep te starten.';
        } else if (groupPaused) {
          elSelNote.textContent = 'GROEP EVEN GEPAUZEERD: Alle brillen staan stil zodat je rustig klassikaal uitleg kunt geven.';
        } else {
          elSelNote.textContent = h.note;
        }
      }
      if (btnCloseApps) {
        btnCloseApps.textContent = appsClosed ? '▶ Apps weer gereedzetten' : '⏹ Sluit apps af';
      }

      const dynCarriage = (h.carriageX + (35 - scrubFrame) * 1.2).toFixed(1).replace('.', ',');
      if (elTelRpm) elTelRpm.textContent = isClosed ? 'Afgesloten' : h.shortPart;
      if (elTelCarriage) elTelCarriage.textContent = (!isClosed && h.consentToView) ? (dynCarriage + ' mm') : 'Afgeschermd';
      if (elTelDia) elTelDia.textContent = (!isClosed && h.consentToView) ? ('Ø ' + h.diaMain.toFixed(1).replace('.', ',') + ' mm') : 'AVG-privé';
      if (elTelGate) {
        if (isClosed) {
          elTelGate.textContent = 'UIT';
        } else if (!h.consentToView) {
          elTelGate.textContent = 'ZELFSTANDIG';
        } else {
          elTelGate.textContent = h.chuckKeyIn ? 'SLEUTEL ERIN' : (h.guardClosed ? 'KAP DICHT ✓' : 'KAP OPEN');
        }
      }
      if (elReplayReadout) {
        if (isClosed) {
          elReplayReadout.textContent = '⏹ APPS AFGESLOTEN';
          elReplayReadout.style.color = '#94A3B8';
        } else if (!h.consentToView) {
          elReplayReadout.textContent = '🔒 PRIVACY ACTIEF (AVG)';
          elReplayReadout.style.color = '#38BDF8';
        } else {
          elReplayReadout.style.color = '#22C55E';
          elReplayReadout.textContent = scrubFrame >= 35
            ? '● MEEKIJKEN OP VERZOEK'
            : '⏪ SAMEN TERUGKIJKEN (-' + ((35 - scrubFrame) * 0.5).toFixed(1).replace('.', ',') + ' sec)';
        }
      }
      if (elBookmarks) {
        elBookmarks.innerHTML = h.bookmarks.map(function (b) {
          return (
            '<button type="button" class="cmd-btn" data-bm-frame="' + b.frame + '" style="width:auto;padding:0.32rem 0.65rem;">' +
              (b.warn ? '⚠ ' : '● ') + b.label +
            '</button>'
          );
        }).join('');
        elBookmarks.querySelectorAll('[data-bm-frame]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            stopReplayLoop();
            appsClosed = false;
            h.appClosed = false;
            h.consentToView = true;
            scrubFrame = parseInt(btn.getAttribute('data-bm-frame'), 10);
            if (elReplaySlider) elReplaySlider.value = String(scrubFrame);
            updateCockpit();
            showToast('Samen met de student op ' + h.id + ' teruggespoeld naar een gemarkeerd moment.');
          });
        });
      }

      drawBlueprint(h, ratio);

      /* Werk het lokale A4-praktijkoverzicht AVG-vriendelijk bij op brilnummer */
      const repStudent = document.getElementById('repModalStudent');
      const repKlas = document.getElementById('repModalKlas');
      const repReaction = document.getElementById('repModalReaction');
      const printStudent = document.getElementById('printRepStudent');
      if (repStudent) repStudent.textContent = h.id + ' (naam pas op papier invullen · AVG)';
      if (repKlas) repKlas.textContent = 'Draaibank VR · 3 onderdelen';
      if (repReaction) repReaction.textContent = 'Direct ingedrukt (' + h.reactionSec + ')';
      if (printStudent) printStudent.textContent = h.id + ' · naam op papier (geen cloudopslag)';
    }

    if (btnToggleAvg) {
      btnToggleAvg.addEventListener('click', function () {
        const h = HEADSETS[selectedIdx];
        if (appsClosed || h.appClosed) {
          appsClosed = false;
          h.appClosed = false;
          updateCockpit();
          showToast('Draaibank-app weer opgestart op ' + h.id + '.');
          return;
        }
        h.consentToView = !h.consentToView;
        if (h.consentToView) {
          h.status = 'HULP GEVRAAGD';
          h.statusClass = 'status-warn';
          showToast('Student op ' + h.id + ' vraagt begeleiding en geeft toestemming om mee te kijken (AVG).');
        } else {
          h.status = 'BEZIG';
          h.statusClass = 'status-safe';
          showToast('Meekijken gesloten op ' + h.id + ' — student werkt weer zelfstandig verder (AVG).');
        }
        updateCockpit();
      });
    }

    function launchScenarioForGroup(partKey) {
      const cfg = PART_CONFIGS[partKey] || PART_CONFIGS['1'];
      stopReplayLoop();
      appsClosed = false;
      groupPaused = false;
      if (btnGroupPause) btnGroupPause.textContent = '⏸ Pauzeer uitleg';
      HEADSETS.forEach(function (item) {
        item.appClosed = false;
        item.mod = cfg.mod;
        item.shortPart = cfg.shortPart;
        item.note = cfg.note;
        item.chuckKeyIn = false;
        item.guardClosed = true;
        item.status = 'BEZIG';
        item.statusClass = 'status-safe';
        item.consentToView = false;
      });
      updateCockpit();
      showToast('App & scenario "' + cfg.mod + '" klaarstaan op alle verbonden brillen — studenten werken zelfstandig (AVG).');
    }

    if (btnStartScenario) {
      btnStartScenario.addEventListener('click', function () {
        launchScenarioForGroup('1');
      });
    }

    startPartBtns.forEach(function (sBtn) {
      sBtn.addEventListener('click', function () {
        const pKey = sBtn.getAttribute('data-start-part');
        launchScenarioForGroup(pKey);
      });
    });

    if (btnCloseApps) {
      btnCloseApps.addEventListener('click', function () {
        stopReplayLoop();
        appsClosed = !appsClosed;
        if (appsClosed) {
          HEADSETS.forEach(function (item) {
            item.consentToView = false;
          });
          showToast('Alle apps zijn gezamenlijk en netjes afgesloten — brillen zijn klaar voor de lader of volgende groep.');
        } else {
          HEADSETS.forEach(function (item) {
            item.appClosed = false;
          });
          showToast('Brillen staan weer klaar om een onderdeel op te starten.');
        }
        updateCockpit();
      });
    }

    if (elReplaySlider) {
      elReplaySlider.addEventListener('input', function () {
        stopReplayLoop();
        scrubFrame = parseInt(elReplaySlider.value, 10);
        updateCockpit();
      });
    }

    if (btnReplayPlay) {
      btnReplayPlay.addEventListener('click', function () {
        const h = HEADSETS[selectedIdx];
        if (appsClosed || h.appClosed) {
          showToast('Start eerst de app op ' + h.id + ' om een handeling samen terug te kijken.');
          return;
        }
        if (!h.consentToView) {
          h.consentToView = true;
          h.status = 'HULP GEVRAAGD';
          h.statusClass = 'status-warn';
        }
        if (replayInterval) {
          stopReplayLoop();
          showToast('Terugkijken even gepauzeerd.');
          return;
        }
        if (scrubFrame >= 35) {
          scrubFrame = 0;
          if (elReplaySlider) elReplaySlider.value = '0';
        }
        btnReplayPlay.textContent = '⏸ Pauze';
        showToast('Laatste handeling wordt samen met de student op ' + h.id + ' teruggekeken.');
        updateCockpit();
        replayInterval = setInterval(function () {
          scrubFrame += 1;
          if (elReplaySlider) elReplaySlider.value = String(scrubFrame);
          updateCockpit();
          if (scrubFrame >= 35) {
            stopReplayLoop();
            showToast('Terugkijken afgerond op ' + h.id + '.');
          }
        }, 180);
      });
    }

    if (btnGroupPause) {
      btnGroupPause.addEventListener('click', function () {
        appsClosed = false;
        groupPaused = !groupPaused;
        btnGroupPause.textContent = groupPaused ? '▶ Hervat groep' : '⏸ Pauzeer uitleg';
        updateCockpit();
        showToast(groupPaused
          ? 'Groep even gepauzeerd: alle VR-brillen staan stil voor korte uitleg van de docent.'
          : 'Oefening hervat: studenten werken weer verder.');
      });
    }

    cockpitRoot.querySelectorAll('[data-teacher-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cmd = btn.getAttribute('data-teacher-cmd');
        const h = HEADSETS[selectedIdx];
        if (cmd === 'CLOSE_ONE') {
          stopReplayLoop();
          h.appClosed = true;
          h.consentToView = false;
          updateCockpit();
          showToast('App op ' + h.id + ' netjes afgesloten — bril kan terug in de lader.');
          return;
        }
        if (cmd === 'COOLANT') {
          coolantActive = !coolantActive;
          updateCockpit();
          showToast('Koeling ' + (coolantActive ? 'aangezet' : 'uitgezet') + ' op ' + h.id + '.');
          return;
        }
        if (cmd === 'AC21') {
          h.appClosed = false;
          h.chuckKeyIn = false;
          h.guardClosed = true;
          h.status = 'BEZIG';
          h.statusClass = 'status-safe';
          h.note = 'Opstelling samen besproken op ' + h.id + ': sleutel terug in houder en kap gesloten.';
          updateCockpit();
          showToast('Opstelling besproken op ' + h.id + ' — student kan veilig verder.');
          return;
        }
        const messages = {
          CALIBRATE: 'Werkhoogte van de draaibank rustig afgestemd op ' + h.id + '.'
        };
        showToast(messages[cmd] || ('Begeleidingsactie uitgevoerd op ' + h.id + '.'));
      });
    });

    /* A4-Praktijkrapport Modal & Handtekeningveld */
    const reportModal = document.getElementById('a4ReportModal');
    const btnCloseReport = document.getElementById('btnCloseReportModal');
    const btnPrintReport = document.getElementById('btnPrintA4Report');
    const sigCanvas = document.getElementById('penSignatureCanvas');
    const btnClearSig = document.getElementById('btnClearSignature');
    const btnDemoSig = document.getElementById('btnDemoSignature');
    const sigStatus = document.getElementById('penSignatureStatus');
    const printSigImg = document.getElementById('printSignaturePreview');
    const printPhysSummary = document.getElementById('printPhysSummary');
    const physCounter = document.getElementById('physCheckedCounter');
    let hasSignature = false;

    function syncPhysCounter() {
      if (!reportModal || !physCounter) return;
      const allChecks = reportModal.querySelectorAll('input[name="physCheck"]');
      const checked = reportModal.querySelectorAll('input[name="physCheck"]:checked');
      physCounter.textContent = checked.length + '/' + allChecks.length + ' afgevinkt' + (checked.length === allChecks.length ? ' ✓' : '');
      physCounter.className = checked.length === allChecks.length
        ? 'status-badge status-safe'
        : 'status-badge status-info';
    }

    if (reportModal) {
      reportModal.querySelectorAll('input[name="physCheck"]').forEach(function (chk) {
        chk.addEventListener('change', syncPhysCounter);
      });
      syncPhysCounter();
    }

    function drawSampleSignature() {
      if (!sigCanvas || !sigCanvas.getContext) return;
      const sctx = sigCanvas.getContext('2d');
      sctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
      sctx.strokeStyle = '#0B5ED7';
      sctx.lineWidth = 2.4;
      sctx.lineCap = 'round';
      sctx.lineJoin = 'round';
      sctx.beginPath();
      sctx.moveTo(38, 74);
      sctx.bezierCurveTo(68, 22, 98, 86, 134, 44);
      sctx.bezierCurveTo(156, 20, 170, 78, 206, 56);
      sctx.bezierCurveTo(244, 34, 290, 68, 355, 48);
      sctx.stroke();
      sctx.fillStyle = '#52657C';
      sctx.font = '500 11px "JetBrains Mono", monospace';
      sctx.fillText('Getekend door vakdocent · Praktijkvrijgave', 38, 96);
      hasSignature = true;
      if (sigStatus) sigStatus.textContent = 'Handtekening vakdocent geplaatst ✓';
    }

    if (sigCanvas && sigCanvas.getContext) {
      const sctx = sigCanvas.getContext('2d');
      let drawing = false;

      function getPos(e) {
        const rect = sigCanvas.getBoundingClientRect();
        const scaleX = sigCanvas.width / rect.width;
        const scaleY = sigCanvas.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY
        };
      }

      sigCanvas.addEventListener('pointerdown', function (e) {
        drawing = true;
        const p = getPos(e);
        sctx.strokeStyle = '#0B5ED7';
        sctx.lineWidth = 2.4;
        sctx.lineCap = 'round';
        sctx.lineJoin = 'round';
        sctx.beginPath();
        sctx.moveTo(p.x, p.y);
        hasSignature = true;
        if (sigStatus) sigStatus.textContent = 'Handtekening vakdocent geplaatst ✓';
      });

      sigCanvas.addEventListener('pointermove', function (e) {
        if (!drawing) return;
        const p = getPos(e);
        sctx.lineTo(p.x, p.y);
        sctx.stroke();
      });

      ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (evName) {
        sigCanvas.addEventListener(evName, function () {
          drawing = false;
        });
      });

      drawSampleSignature();
    }

    if (btnClearSig && sigCanvas) {
      btnClearSig.addEventListener('click', function () {
        sigCanvas.getContext('2d').clearRect(0, 0, sigCanvas.width, sigCanvas.height);
        hasSignature = false;
        if (sigStatus) sigStatus.textContent = 'Zet hierboven een handtekening met muis, vinger of tekenpen';
      });
    }

    if (btnDemoSig) {
      btnDemoSig.addEventListener('click', drawSampleSignature);
    }

    function openReportModal() {
      if (reportModal) {
        reportModal.classList.add('is-open');
        syncPhysCounter();
      }
    }

    if (btnOpenReport) btnOpenReport.addEventListener('click', openReportModal);
    if (btnHeroOpenReport) btnHeroOpenReport.addEventListener('click', openReportModal);

    if (btnCloseReport && reportModal) {
      btnCloseReport.addEventListener('click', function () {
        reportModal.classList.remove('is-open');
      });
      reportModal.addEventListener('click', function (ev) {
        if (ev.target === reportModal) reportModal.classList.remove('is-open');
      });
    }

    if (btnPrintReport) {
      btnPrintReport.addEventListener('click', function () {
        if (sigCanvas && printSigImg && hasSignature) {
          printSigImg.src = sigCanvas.toDataURL('image/png');
          printSigImg.style.display = 'block';
        }
        if (printPhysSummary && reportModal) {
          const checked = Array.from(reportModal.querySelectorAll('input[name="physCheck"]:checked')).map(function (c) {
            return c.value;
          });
          printPhysSummary.textContent = checked.length > 0
            ? ('Afgetekende praktijkpunten: ' + checked.join(' · '))
            : 'Nog samen bij de echte draaibank langs te lopen: Punt 1 t/m Punt 5';
        }
        window.print();
      });
    }

    updateCockpit();

    const docParams = new URLSearchParams(window.location.search);
    if (docParams.get('rapport') === 'open') {
      openReportModal();
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
        'Begeleiding     : Gewoon zichtbaar op het 13,1-inch Teacher Dashboard + A4-rapport\n' +
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
      heroCaption: 'Optie 1 (€ 10.000,-): Losse 13,1-inch docenttablet voor eigen VR-brillen — opstarten, AVG-meekijken en afsluiten (incl. 1 module)',
      unitSingle: '1 Losse docenttablet-set (eigen brillen)',
      unitPlural: 'Losse docenttablet-sets (eigen brillen)',
      hwSub: 'Losse 13,1-inch docenttablet (tekenpen & stevige hoes) om eigen VR-brillen op te starten, AVG-bewust te begeleiden en af te sluiten',
      srvSub: 'Hulp op afstand en software-updates (1e jaar bij de aanschaf inbegrepen)',
      ruleHint: 'Het 1e jaar service zit bij de prijs in; vanaf jaar 2 betaal je € 1.500,- per jaar excl. BTW.',
      formValue: 'Optie 1: Teacher Dashboard & Eigen Brillen (€ 10.000,- excl. BTW, 1e jr incl., daarna € 1.500,-/jr)'
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
