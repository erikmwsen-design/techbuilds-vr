/**
 * TechBuilds VR — Interactieve Website Logica (v2.2)
 * Onderdelen:
 * 1. Vaste navigatiebalk, leesbalk, mobiele snelbalk, terug-naar-boven & subtiele scroll-animatie
 * 2. Interactieve Hero-tegels & fotowisselaar op de startpagina (index.html)
 * 3. Interactief stappenoverzicht voor Draaibank VR (1–6) én Elektrotechniek VR (1–6)
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
      '.section .apple-card, .section .bento-card, .section .step-card, .section .domain-card, .section .official-doc-tile, .section .module-showcase-card, .section .addon-module-tile'
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
   * 2. Interactieve Hero-Tegels & Fotowisselaar (index.html)
   * ------------------------------------------------------------------ */
  const HERO_SCENES = {
    praktijklokaal: {
      img: 'assets/img/brand/hero_techbuilds_vr_werkplaats.webp',
      alt: 'Praktijklokaal waar een student met een VR-bril oefent bij de draaibank terwijl de vakdocent meekijkt op de tablet',
      caption: 'Oefenen op één vaste plek in het lokaal · simpele bediening met twee knoppen · docent kijkt live mee',
      linkText: 'Alle modules →',
      linkHref: 'modules.html'
    },
    modules: {
      img: 'assets/img/weiler/weiler_03_vr_trapdraaien_werktekening.webp',
      alt: 'Zicht in de VR-bril op de WEILER Praktikant 140 draaibank met gesloten beschermkap, schaalverdeling en werktekening',
      caption: 'Draaibank VR op de WEILER Praktikant 140: van Buddy Check en opspannen tot draaien op maat en noodstop',
      linkText: 'Bekijk Draaibank VR →',
      linkHref: 'training-draaibank.html'
    },
    elektro: {
      img: 'assets/img/elektro/hero_elektro_werkplaats.webp',
      alt: 'Elektrotechnieklokaal waar een student met een VR-bril oefent voor een 400V-schakelkast terwijl de vakdocent meekijkt op de tablet',
      caption: 'Elektrotechniek VR (NEN 3140): veilig afschakelen, vergrendelen met hangslot en tweepolig nameten met de Duspol',
      linkText: 'Bekijk Elektrotechniek VR →',
      linkHref: 'training-elektrotechniek.html'
    },
    kar: {
      img: 'assets/img/brand/pakket_zioxi_vr_kar_werkplaats.webp',
      alt: 'Mobiele Zioxi VR-kar met genummerde Meta Quest 3S brillen, 13,1-inch Samsung tablet en eigen 5G-verbinding op één stekker',
      caption: 'Slechts één gewoon stopcontact nodig · ingebouwde KPN Onbeperkt 5G · geen belasting op de school-wifi',
      linkText: 'Bekijk de VR-Karren →',
      linkHref: 'prijzen-contact.html?optie=2#pakket-keuze'
    },
    tablet: {
      img: 'assets/img/brand/pakket_regietablet_vr_set.webp',
      alt: '13,1-inch Samsung tablet met het Teacher Dashboard naast de S Pen, een Meta Quest 3S bril en een schuifmaat',
      caption: '13,1-inch Samsung tablet met S Pen: Draaibank VR én Elektrotechniek VR overzichtelijk op één scherm',
      linkText: 'Probeer het Dashboard →',
      linkHref: 'docentapp-tablet.html#live-simulator'
    }
  };

  const heroSceneTriggers = document.querySelectorAll('[data-hero-scene]');
  if (heroSceneTriggers.length > 0) {
    const elHeroImg = document.getElementById('heroStageImg');
    const elHeroCaption = document.getElementById('heroSceneCaption');
    const elHeroLink = document.getElementById('heroSceneLink');
    let currentHeroScene = 'praktijklokaal';
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
        if (btn.classList.contains('bento-metric-tile') && currentHeroScene === targetScene) {
          setHeroScene('praktijklokaal');
        } else {
          setHeroScene(targetScene);
        }
      });
    });
  }

  /* ------------------------------------------------------------------
   * 3. Interactief Stappenoverzicht Draaibank VR (M1–M6) & Elektrotechniek VR (E1–E6)
   * ------------------------------------------------------------------ */
  const DRAAIBANK_MODULE_ORDER = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  const DRAAIBANK_MODULES_DATA = {
    M1: {
      code: 'ONDERDEEL 1 · PERSOONLIJKE VEILIGHEID',
      standplaats: 'Voorbereiding · Vóór de machine',
      title: 'Buddy Check & eigen beschermingsmiddelen',
      summary: 'Voordat een leerling in de buurt van de draaibank komt, controleert hij eerst een klasgenoot in 3D op onveilige kleding of sieraden en brengt hij zijn eigen beschermingsmiddelen op orde.',
      image: 'assets/img/weiler/weiler_00b_buddy_check_compleet.webp',
      altImage: 'assets/img/weiler/weiler_00a_buddy_check_start.webp',
      caption: 'Na de controle: klasgenoot netjes gecorrigeerd, eigen veiligheidsbril op en werkhandschoenen uitgedaan.',
      altCaption: 'Vóór de controle: loshangend haar, sieraden om de pols en werkhandschoenen aan bij een draaiende machine.',
      hasBuddyToggle: true,
      gateSafeMsg: 'punten in orde — Leerling mag door naar de draaibank',
      gateWarnMsg: 'punten gecontroleerd — Vink alle 4 de veiligheidspunten aan voor toegang tot de machine',
      telRpm: 'Stilstand (vooraf)',
      telTol: '5 praktijksituaties',
      telPos: 'Vaste plek · 2 knoppen',
      checks: [
        'Klasgenoot in 3D nalopen op los haar, openstaande mouwen, sieraden en veiligheidsschoenen',
        'Zelf een veiligheidsbril opzetten en werkhandschoenen uittrekken vanwege het gevaar van intrekken',
        'Pas als alle punten kloppen, gaat de training verder bij de WEILER draaibank'
      ]
    },
    M2: {
      code: 'ONDERDEEL 2 · WERKPLEK & VOORCONTROLE',
      standplaats: 'Bij de WEILER Praktikant 140',
      title: 'Machine- en werkplekcontrole vóór de start',
      summary: 'Recht voor de WEILER Praktikant 140 kijkt de leerling of de vloer schoon is, er geen gereedschap op het bed ligt en de beschermkappen goed sluiten.',
      image: 'assets/img/weiler/weiler_02_vr_werkplaats_overzicht.webp',
      caption: 'Zicht recht voor de draaibank met vaste kop, beitelhouder, koelslang en overzichtelijke camerahoeken.',
      hasBuddyToggle: false,
      telRpm: '0 RPM (controle)',
      telTol: '4 aandachtspunten',
      telPos: 'Slede in ruststand',
      checks: [
        'Olie- of koelmiddelplassen op de vloer en rondslingerend materiaal opmerken en opruimen',
        'Los gereedschap van het machinebed halen en de werking van de klauwplaatkap testen',
        'Controleren dat de automatische voeding uitstaat voordat de hoofdschakelaar omgaat'
      ]
    },
    M3: {
      code: 'ONDERDEEL 3 · OPSPANNEN & TOERENTAL',
      standplaats: 'Drieklauw & toerentabel',
      title: 'Netjes opspannen en sleutel direct uit de klauwplaat',
      summary: 'De leerling klemt het werkstuk recht in de drieklauw, controleert de uitsteeklengte en leert één vaste gewoonte: de klauwplaatsleutel gaat meteen terug in de houder.',
      image: 'assets/img/weiler/weiler_01_machine_3d_model.webp',
      caption: 'De WEILER Praktikant 140 in VR met drieklauw, vaste sleutelhouder en leesbare toerentabel.',
      hasBuddyToggle: false,
      telRpm: '710 RPM (gekozen)',
      telTol: 'Slingering ≤ 0,02 mm',
      telPos: 'Sleutel in houder',
      checks: [
        'Werkstuk kort en recht opspannen en controleren of het zuiver rondloopt',
        'Probeert iemand te starten met de sleutel nog in de klauwplaat? Dan pauzeert het beeld rustig met uitleg',
        'Het juiste toerental kiezen bij stilstaande spil en de opstelling laten vrijgeven'
      ]
    },
    M4: {
      code: 'ONDERDEEL 4 · VEILIG STARTEN & DRAAIEN',
      standplaats: 'Snijzone & werktekening',
      title: 'Vlak- en trapdraaien aan de hand van de werktekening',
      summary: 'Met gesloten beschermkap draait de leerling het kopvlak vlak en werkt met de handwielen en schaalverdeling rustig naar de maten op de tekening toe.',
      image: 'assets/img/weiler/weiler_03_vr_trapdraaien_werktekening.webp',
      caption: 'Draaien met gesloten beschermkap, afleesbare nonius en duidelijke werktekening (Ø 29,4 ±0,2 mm en trap Ø 28,0 mm).',
      hasBuddyToggle: false,
      telRpm: '710 RPM (in bedrijf)',
      telTol: 'Ø 29,4 ±0,2 mm',
      telPos: 'Langsslede: 64,5 mm',
      checks: [
        'Pas starten nadat de klauwplaatkap dicht zit en de draaizone helemaal vrij is',
        'Bij een te diepe snede voelt en ziet de leerling direct dat de beitel gaat trillen en heet wordt',
        'Stapsgewijs werken met langs- en dwarsslede naar Ø 29,4 mm en een trap van Ø 28,0 mm'
      ]
    },
    M5: {
      code: 'ONDERDEEL 5 · STOPPEN, METEN & OPRUIMEN',
      standplaats: 'Volledige stilstand (0 RPM)',
      title: 'Wachten op stilstand en nameten met de schuifmaat',
      summary: 'Grijpen of meten terwijl de klauwplaat nog uitloopt wordt direct tegengehouden. Pas bij volledige stilstand meet de leerling het werkstuk na en maakt de bank veilig schoon.',
      image: 'assets/img/weiler/weiler_04_vr_schuifmaat_nameten.webp',
      caption: 'Pas als de spil helemaal stilstaat (0 RPM) meet de leerling Ø 29,4 mm na met de schuifmaat.',
      hasBuddyToggle: false,
      telRpm: '0 RPM (stilstand)',
      telTol: 'Schuifmaat ± 0,1 mm',
      telPos: 'Spanenhaak & kwast',
      checks: [
        'Rustig wachten tot de klauwplaat volledig stilstaat voordat de kap opengaat',
        'Spanen weghalen met spanenhaak en kwast — nooit met blote handen of perslucht',
        'De draaibank schoon en uitgeschakeld achterlaten voor de volgende leerling'
      ]
    },
    M6: {
      code: 'ONDERDEEL 6 · STORINGEN & NOODSTOP',
      standplaats: 'Ingrijpen bij afwijkingen',
      title: 'Snel en kalm handelen bij een storing of noodstop',
      summary: 'De leerling oefent wat je doet als een werkstuk plotseling gaat slingeren of een gewone stopknop dienst weigert: direct de noodstop indrukken en veilig uitschakelen.',
      image: 'assets/img/weiler/weiler_05_vr_veiligheidsstop_m6.webp',
      caption: 'Zodra het werkstuk zichtbaar gaat slingeren, drukt de leerling direct op de rode paddenstoel-noodstop.',
      hasBuddyToggle: false,
      telRpm: '0 RPM (noodstop)',
      telTol: 'Direct ingrijpen',
      telPos: 'Veilig uitgeschakeld',
      checks: [
        'Meteen de noodstop indrukken bij onverwachte trillingen, geluid of slingering',
        'Ervaren dat de machine na het ontgrendelen van de noodstop nooit zomaar vanzelf weer aanloopt',
        'Het verschil kennen tussen normaal stoppen, de noodstop en de hoofdschakelaar vergrendelen'
      ]
    }
  };

  const ELEKTRO_MODULE_ORDER = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
  const ELEKTRO_MODULES_DATA = {
    E1: {
      code: 'ONDERDEEL 1 · VOORBEREIDING & GEREEDSCHAP',
      standplaats: 'Voorbereiding · Kast nog gesloten',
      title: 'Buddy Check & geïsoleerd gereedschap',
      summary: 'Voordat de schakelkast opengaat, controleert de student een klasgenoot op sieraden en open kleding en kijkt hij zijn eigen beschermingsmiddelen, VDE-gereedschap en hangslot na.',
      image: 'assets/img/elektro/elektro_00b_buddy_check_na.webp',
      altImage: 'assets/img/elektro/elektro_00a_buddy_check_voor.webp',
      caption: 'Na de controle: horloge af, mouwen dicht, veiligheidsbril op en VDE 1000V meetset gecontroleerd.',
      altCaption: 'Vóór de controle: metalen horloge om, opgerolde mouwen, bril nog op tafel en geen gekeurd hangslot.',
      hasBuddyToggle: true,
      gateSafeMsg: 'punten in orde — Leerling mag door naar de verdeelkast',
      gateWarnMsg: 'punten gecontroleerd — Vink alle 4 de punten aan voor toegang tot de verdeelkast',
      telRpm: 'Werkbank · Kast dicht',
      telTol: 'NEN 3140 · PBM & VDE',
      telPos: 'Vaste plek · 2 knoppen',
      checks: [
        'Klasgenoot controleren op metalen horloge, ringen, kettingen en openstaande mouwen',
        'Eigen veiligheidsbril of gelaatsscherm opzetten en kijken of de isolatie van het VDE-gereedschap heel is',
        'Persoonlijk hangslot met naamkaart en tweepolige spanningzoeker (Duspol) klaarleggen'
      ]
    },
    E2: {
      code: 'ONDERDEEL 2 · SCHEMA & WERKPLEK',
      standplaats: 'Bij de 400V-verdeelkast',
      title: 'Installatieschema lezen en werkplek controleren',
      summary: 'Voor de 400V-kast vergelijkt de student het schema in de deur met de groepen in de kast en kijkt hij of de vloer droog en vrij van obstakels is.',
      image: 'assets/img/elektro/elektro_03_afschermen_schema.webp',
      caption: 'Het installatieschema in de kastdeur vergelijken met de hoofdschakelaar en de juiste groep.',
      hasBuddyToggle: false,
      telRpm: '400V · Nog in bedrijf',
      telTol: 'Schema & vrije ruimte',
      telPos: 'Droge, vrije vloer',
      checks: [
        'Het installatieschema en de groepenverklaring lezen om de juiste groep en eventuele terugvoeding te vinden',
        'Controleren of de vloer droog is en er genoeg vrije ruimte rond de kast is',
        'Afstemmen met de docent of werkverantwoordelijke voordat de voeding wordt uitgeschakeld'
      ]
    },
    E3: {
      code: 'ONDERDEEL 3 · STAP 1 & 2 · LOCKOUT-TAGOUT',
      standplaats: 'Hoofdschakelaar & hangslot',
      title: 'Uitschakelen en direct vergrendelen met een eigen slot',
      summary: 'De student schakelt in de juiste volgorde af, zet de lastscheider op nul en plaatst direct een vergrendelbeugel met eigen hangslot en naamkaartje.',
      image: 'assets/img/elektro/elektro_01_loto_vergrendelen.webp',
      caption: 'Lockout-Tagout in VR: hoofdschakelaar op 0 en vergrendeld met beugel, persoonlijk hangslot en label.',
      hasBuddyToggle: false,
      telRpm: 'Schakelaar op 0 (UIT)',
      telTol: 'Vergrendeld met slot',
      telPos: 'Sleutel op zak',
      checks: [
        'Eerst de afgaande belasting uitschakelen en daarna rustig de hoofdschakelaar op 0 zetten',
        'Vergrendelbeugel, persoonlijk hangslot en naamkaart plaatsen zodat niemand de stroom per ongeluk aanzet',
        'Wie in de kast wil werken zonder slot, krijgt direct een rustige melding met uitleg waarom dat gevaarlijk is'
      ]
    },
    E4: {
      code: 'ONDERDEEL 4 · STAP 3 · TWEEPOLIG NAMETEN',
      standplaats: 'Klemmenstrook & rails',
      title: 'Spanningsloosheid aantonen met een tweepolige Duspol',
      summary: 'Niet gokken en nooit op een enkelpolige spanningszoeker vertrouwen: de student voert de volledige meting uit met een tweepolige Duspol.',
      image: 'assets/img/elektro/elektro_02_tweepolig_meten.webp',
      caption: 'Tweepolige meting met de Duspol tussen fase en aarde laat duidelijk 0 V zien.',
      hasBuddyToggle: false,
      telRpm: '0 V (alle geleiders)',
      telTol: 'Voor-, hoofd- & nameting',
      telPos: 'Tweepolige Duspol',
      checks: [
        'Eerst de Duspol testen op een bekende spanningsbron om zeker te weten dat het meetinstrument werkt',
        'Tweepolig meten tussen alle fasen onderling, tussen elke fase en nul én tussen elke fase en aarde',
        'Daarna opnieuw testen op de bekende spanningsbron zodat zeker is dat de meter onderweg niet kapot ging'
      ]
    },
    E5: {
      code: 'ONDERDEEL 5 · STAP 4 & 5 · AFSCHERMEN',
      standplaats: 'Naastgelegen spanningsdelen',
      title: 'Rekening houden met terugvoeding en delen afschermen',
      summary: 'Zitten er naast het werkgebied nog rails of voedingen waar spanning op staat? Dan schermt de student die netjes en aanrakingsveilig af met isolatieplaten.',
      image: 'assets/img/elektro/elektro_03_afschermen_schema.webp',
      caption: 'Plaatsen van een gele isolerende afschermplaat over naastgelegen rails met isolerende handschoenen.',
      hasBuddyToggle: false,
      telRpm: '0 V · Veilig afgeschermd',
      telTol: 'Geen aanrakingsgevaar',
      telPos: '1000V handschoenen',
      checks: [
        'Controleren op mogelijke terugvoeding vanuit bijvoorbeeld zonnepanelen of noodstroom',
        'Isolerende afschermplaten plaatsen voor delen die niet uitgeschakeld konden worden',
        'De werkplek netjes en overzichtelijk klaarzetten voor de eigenlijke werkzaamheden'
      ]
    },
    E6: {
      code: 'ONDERDEEL 6 · CONTROLE & VEILIG INSCHAKELEN',
      standplaats: 'Eindcontrole & praktijkvrijgave',
      title: 'Gereedschap tellen, slot weghalen en samen afronden',
      summary: 'Na het werk kijkt de student of er geen gereedschap in de kast is achtergebleven, haalt zijn eigen hangslot weg en rondt het praktijkrapport af met de vakdocent.',
      image: 'assets/img/elektro/elektro_01_loto_vergrendelen.webp',
      caption: 'Veilige afronding: kast gecontroleerd en gesloten, eigen slot verwijderd en klaar voor het gesprek met de docent.',
      hasBuddyToggle: false,
      telRpm: 'Klaar voor vrijgave',
      telTol: 'Kast schoon & dicht',
      telPos: 'A4-rapport op tablet',
      checks: [
        'Rustig stoppen en melden als tijdens het werk toch een beschadigde kabel of onverwachte spanning opvalt',
        'Controleren dat al het gereedschap uit de kast is en alle afdekplaten weer op hun plek zitten',
        'Alleen het eigen hangslot verwijderen en bij de echte kast de praktijkpunten doornemen met de docent'
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
   * 4. 13,1-inch Teacher Dashboard Voorbeeld + A4-Praktijkrapport
   * ------------------------------------------------------------------ */
  const cockpitRoot = document.getElementById('docentCockpitSim');
  if (cockpitRoot) {
    const initialSlots = parseInt(cockpitRoot.getAttribute('data-slots') || '10', 10);
    const BASE_HEADSETS = [
      {
        slotNum: 1, id: 'Bril 01', student: 'Daan Bakker', klas: 'MBO-2 Verspanen', mod: 'Onderdeel 4 · Trapdraaien',
        status: 'BEZIG', statusClass: 'status-safe', rpm: 710, diaMain: 29.4, diaStep: 28.0,
        carriageX: 64.5, overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 88,
        note: 'Kopvlak netjes gevlakt · Hoofdmaat Ø 29,4 mm binnen de marge (±0,2 mm), langsslede op 64,5 mm.',
        bookmarks: [
          { frame: 8, label: 'Opstelling goedgekeurd', warn: false },
          { frame: 22, label: 'Kopvlak vlakgedraaid', warn: false },
          { frame: 35, label: 'Maat Ø 29,4 mm bereikt', warn: false }
        ]
      },
      {
        slotNum: 2, id: 'Bril 02', student: 'Sara Yilmaz', klas: 'MBO-2 Verspanen', mod: 'Onderdeel 3 · Opspannen',
        status: 'GEPAUZEERD', statusClass: 'status-danger', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        carriageX: 118.0, overheated: false, guardClosed: false, chuckKeyIn: true, runout: 0.03, reactionSec: '0,7 sec', battery: 92,
        note: 'VEILIGHEIDSSTOP: Wilde starten met de klauwplaatsleutel nog in de drieklauw — rustige uitleg in beeld.',
        bookmarks: [
          { frame: 14, label: 'Werkstuk Ø 30 mm ingeklemd', warn: false },
          { frame: 28, label: 'Gepauzeerd: sleutel nog in klauwplaat', warn: true }
        ]
      },
      {
        slotNum: 3, id: 'Bril 03', student: 'Lucas van Dijk', klas: 'VMBO-PIE Klas 4', mod: 'Onderdeel 4 · Langsdraaien',
        status: 'LET OP', statusClass: 'status-warn', rpm: 1000, diaMain: 29.6, diaStep: 28.4,
        carriageX: 82.0, overheated: true, guardClosed: true, chuckKeyIn: false, runout: 0.04, reactionSec: '0,7 sec', battery: 76,
        note: 'LET OP: Te diepe aanzet gekozen bij 1000 RPM — de beitel begint merkbaar te trillen.',
        bookmarks: [
          { frame: 12, label: 'Gestart op 1000 RPM (kap dicht)', warn: false },
          { frame: 31, label: 'Te diepe snede: trilling op beitel', warn: true }
        ]
      },
      {
        slotNum: 4, id: 'Bril 04', student: 'Noor Jansen', klas: 'MBO-3 Allround', mod: 'Onderdeel 6 · Noodstop',
        status: 'VEILIG GESTOPT', statusClass: 'status-info', rpm: 0, diaMain: 29.4, diaStep: 28.0,
        carriageX: 96.0, overheated: false, guardClosed: true, chuckKeyIn: false, runout: 1.85, reactionSec: '0,6 sec', battery: 84,
        note: 'Goed gehandeld: direct de noodstop ingedrukt (0,6 sec) toen het werkstuk begon te slingeren.',
        bookmarks: [
          { frame: 19, label: 'Storing gestart: werkstuk slingert', warn: true },
          { frame: 25, label: 'Noodstop direct ingedrukt (0,6 sec)', warn: false }
        ]
      },
      {
        slotNum: 5, id: 'Bril 05', student: 'Sem de Vries', klas: 'MBO-2 Verspanen', mod: 'Onderdeel 1 · Buddy Check',
        status: 'BEZIG', statusClass: 'status-safe', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        carriageX: 140.0, overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,7 sec', battery: 95,
        note: 'Voorbereiding: klasgenoot gecontroleerd op losse kleding, eigen veiligheidsbril op en handschoenen uit.',
        bookmarks: [
          { frame: 16, label: 'Buddy Check & eigen PBM afgerond', warn: false }
        ]
      },
      {
        slotNum: 6, id: 'Bril 06', student: 'Mila Koster', klas: 'MBO-2 Verspanen', mod: 'Onderdeel 5 · Nameten',
        status: 'BEZIG', statusClass: 'status-safe', rpm: 0, diaMain: 29.3, diaStep: 28.0,
        carriageX: 132.0, overheated: false, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 81,
        note: 'Netjes gewacht op volledige stilstand · schuifmaat afgelezen op Ø 29,3 mm (binnen ±0,2 mm).',
        bookmarks: [
          { frame: 20, label: 'Volledige stilstand (0 RPM) afgewacht', warn: false },
          { frame: 33, label: 'Schuifmaat gemeten: Ø 29,3 mm', warn: false }
        ]
      },
      {
        slotNum: 7, id: 'Bril 07', student: 'Bram Peters', klas: 'MBO-3 Allround', mod: 'Onderdeel 2 · Werkplek',
        status: 'BEZIG', statusClass: 'status-safe', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        carriageX: 140.0, overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,7 sec', battery: 79,
        note: 'Controle vooraf: plas koelmiddel op de vloer opgemerkt en los gereedschap van het bed gehaald.',
        bookmarks: [
          { frame: 18, label: 'Vloer en machinebed vrijgemaakt', warn: false }
        ]
      },
      {
        slotNum: 8, id: 'Bril 08', student: 'Aya El Amrani', klas: 'MBO-2 Verspanen', mod: 'Onderdeel 4 · Eindopdracht',
        status: 'BEZIG', statusClass: 'status-safe', rpm: 710, diaMain: 29.5, diaStep: 28.1,
        carriageX: 58.2, overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 90,
        note: 'Zelfstandige eindopdracht zonder voorzeggen — rustige, gelijkmatige langsvoeding.',
        bookmarks: [
          { frame: 10, label: 'Voorcontrole zelfstandig behaald', warn: false },
          { frame: 30, label: 'Trap Ø 28,1 mm in bewerking', warn: false }
        ]
      },
      {
        slotNum: 9, id: 'Bril 09', student: 'Finn Hendriks', klas: 'MBO-2 Verspanen', mod: 'Onderdeel 3 · Toerental',
        status: 'BEZIG', statusClass: 'status-safe', rpm: 710, diaMain: 30.0, diaStep: 30.0,
        carriageX: 112.0, overheated: false, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 87,
        note: 'Juiste toerental opgezocht op de tabel en 710 RPM ingeschakeld bij stilstaande spil.',
        bookmarks: [{ frame: 24, label: '710 RPM veilig gekozen', warn: false }]
      },
      {
        slotNum: 10, id: 'Bril 10', student: 'Zoë Vermeer', klas: 'MBO-3 Allround', mod: 'Onderdeel 5 · Opruimen',
        status: 'BEZIG', statusClass: 'status-safe', rpm: 0, diaMain: 29.4, diaStep: 28.0,
        carriageX: 138.0, overheated: false, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionSec: '0,6 sec', battery: 93,
        note: 'Hoofdschakelaar uitgeschakeld en spanen netjes weggehaald met spanenhaak en kwast.',
        bookmarks: [{ frame: 30, label: 'Spanenhaak en kwast gebruikt', warn: false }]
      }
    ];

    const EXTRA_NAMES = [
      'Jesse Mulder', 'Eva Bos', 'Timo Dekker', 'Lotte Brouwer', 'Ruben Kok',
      'Sanne de Groot', 'Milan Visser', 'Nina Meijer', 'Luuk Willems', 'Tess Vos',
      'Sam Kuijpers', 'Fleur Schouten'
    ];
    for (let n = 11; n <= 22; n++) {
      const tpl = BASE_HEADSETS[(n - 1) % 10];
      const padId = 'Bril ' + (n < 10 ? '0' + n : String(n));
      BASE_HEADSETS.push({
        slotNum: n,
        id: padId,
        student: EXTRA_NAMES[n - 11] || ('Leerling ' + n),
        klas: tpl.klas,
        mod: tpl.mod,
        status: tpl.status,
        statusClass: tpl.statusClass,
        rpm: tpl.rpm,
        diaMain: tpl.diaMain,
        diaStep: tpl.diaStep,
        carriageX: tpl.carriageX,
        overheated: tpl.overheated,
        guardClosed: tpl.guardClosed,
        chuckKeyIn: tpl.chuckKeyIn,
        runout: tpl.runout,
        reactionSec: tpl.reactionSec,
        battery: Math.max(72, 98 - n),
        note: tpl.note,
        bookmarks: tpl.bookmarks
      });
    }

    let currentProfile = initialSlots === 20 ? 'kar20' : 'kar10';
    let activeCount = initialSlots;
    let HEADSETS = BASE_HEADSETS.slice(0, activeCount);
    let selectedIdx = 0;
    let groupPaused = false;
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
    const btnGroupPause = document.getElementById('btnCockpitGroupPause');
    const btnNextStudent = document.getElementById('btnCockpitNextStudent');
    const btnOpenReport = document.getElementById('btnCockpitOpenReport');
    const btnHeroOpenReport = document.getElementById('tabletHeroReportBtn');
    const heroProfileBtns = document.querySelectorAll('[data-hero-profile]');
    let toastFlashTimer = null;

    const CAM_LABELS = {
      OVERVIEW_3Q: 'Overzicht',
      CUT_ZONE: 'Dicht op werkstuk',
      CHUCK_CLOSE: 'Klauwplaat & kap',
      SPEED_CHART: 'Toerentabel'
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
        if (protocolLine) protocolLine.textContent = 'KLASOVERZICHT · VR-KAR 10 (10 BRILLEN VERBONDEN)';
      } else if (profKey === 'kar20') {
        activeCount = 20;
        if (protocolLine) protocolLine.textContent = 'KLASOVERZICHT · VR-KAR 20 (20 BRILLEN VERBONDEN)';
      } else {
        activeCount = 12;
        if (protocolLine) protocolLine.textContent = 'KLASOVERZICHT · EIGEN BRILLEN (' + activeCount + ' BRILLEN VERBONDEN)';
      }
      HEADSETS = BASE_HEADSETS.slice(0, activeCount);
      if (selectedIdx >= HEADSETS.length) selectedIdx = 0;
      updateCockpit();
      showToast(
        'Groepsweergave gewisseld naar ' +
        (profKey === 'kar10' ? 'VR-Kar 10 (10 brillen)' : profKey === 'kar20' ? 'VR-Kar 20 (20 brillen)' : 'Eigen brillen van school') +
        ' — klik op een leerling om direct mee te kijken.'
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
        showToast('Weergave gewisseld naar "' + CAM_LABELS[activeSpectatorCam] + '" bij ' + h.student + ' (' + h.id + ').');
      });
    });

    function renderSlots() {
      if (!slotsContainer) return;
      let html = HEADSETS.map(function (h, idx) {
        if (statusFilter === 'attention' && h.status !== 'GEPAUZEERD' && h.status !== 'LET OP') {
          return '';
        }
        if (statusFilter === 'active' && h.status !== 'BEZIG') {
          return '';
        }
        const badgeText = groupPaused ? 'PAUZE' : h.status;
        const badgeCls = groupPaused ? 'status-warn' : h.statusClass;
        const isSel = idx === selectedIdx;
        return (
          '<button type="button" class="quest-slot ' + (isSel ? 'is-selected' : '') + '" data-slot-idx="' + idx + '" id="slotBtn_' + h.slotNum + '">' +
            '<div class="quest-slot-top">' +
              '<span class="mono" style="font-size:0.72rem;font-weight:600;color:' + (isSel ? '#38BDF8' : '#94A3B8') + ';">' + h.id + ' · ' + h.battery + '%</span>' +
              '<span class="status-badge ' + badgeCls + '">' + badgeText + '</span>' +
            '</div>' +
            '<span class="quest-slot-name">' + h.student + '</span>' +
            '<span class="quest-slot-meta">' + h.mod + (isSel ? ' · MEEKIJKEN' : '') + '</span>' +
          '</button>'
        );
      }).join('');

      if (currentProfile === 'unlimited' && activeCount < BASE_HEADSETS.length && statusFilter === 'all') {
        html +=
          '<button type="button" class="quest-slot" id="btnAddUnlimitedHeadset" style="border-style:dashed;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">' +
            '<span class="mono" style="font-size:0.76rem;color:#38BDF8;font-weight:600;">+ EIGEN BRIL KOPPELEN</span>' +
            '<span class="quest-slot-meta">Verschijnt automatisch op nummer</span>' +
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
          showToast('Je kijkt nu live mee met ' + HEADSETS[selectedIdx].student + ' (' + HEADSETS[selectedIdx].id + ').');
        });
      });

      const addBtn = document.getElementById('btnAddUnlimitedHeadset');
      if (addBtn) {
        addBtn.addEventListener('click', function () {
          if (activeCount < BASE_HEADSETS.length) {
            activeCount += 1;
            HEADSETS = BASE_HEADSETS.slice(0, activeCount);
            selectedIdx = activeCount - 1;
            if (protocolLine) {
              protocolLine.textContent = 'KLASOVERZICHT · EIGEN BRILLEN (' + activeCount + ' BRILLEN VERBONDEN)';
            }
            updateCockpit();
            showToast('Extra bril (' + HEADSETS[selectedIdx].id + ' · ' + HEADSETS[selectedIdx].student + ') automatisch toegevoegd aan het overzicht.');
          }
        });
      }
    }

    function drawBlueprint(h, frameRatio) {
      if (!canvas || !canvas.getContext) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const ht = canvas.height;

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
        ctx.fillText('WEILER PRAKTIKANT 140 — TOERENTABEL', 56, 54);

        const speeds = [250, 355, 500, 710, 1000, 1400];
        speeds.forEach(function (sp, idx) {
          const bx = 56 + idx * 88;
          const isCurrent = sp === h.rpm || (h.rpm === 0 && sp === 710);
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
        ctx.fillText('Ingesteld door leerling: ' + (groupPaused ? 0 : h.rpm) + ' RPM  ·  Richtwaarde staal Ø 30 mm: 710 RPM', 56, 154);
        ctx.restore();
      } else {
        /* Bedbanen van de WEILER Praktikant 140 onderlangs */
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
          ctx.fillText('SLEUTEL NOG IN KLAUWPLAAT (GEPAUZEERD)', 130, 24);
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
        'WEERGAVE: ' + CAM_LABELS[activeSpectatorCam] +
        '  ·  SLEDE: ' + dynCarriage + ' mm' +
        '  ·  ' + (h.guardClosed ? 'KAP DICHT' : 'KAP OPEN') +
        '  ·  KOELING: ' + (coolantActive ? 'AAN' : 'UIT') +
        '  ·  NOODSTOP: ' + h.reactionSec,
        14,
        ht - 9
      );
    }

    function updateCockpit() {
      const h = HEADSETS[selectedIdx];
      const ratio = scrubFrame / 35;
      renderSlots();

      if (elSelHeader) {
        elSelHeader.textContent = h.id + ' — ' + h.student + ' (' + h.klas + ') · ' + h.mod;
      }
      if (elStreamBadge) {
        elStreamBadge.textContent = 'MEEKIJKEN MET: ' + h.id.toUpperCase();
      }
      if (elSelNote) {
        elSelNote.textContent = groupPaused
          ? 'KLAS GEPAUZEERD: Alle brillen staan even op pauze zodat je rustig klassikaal uitleg kunt geven.'
          : h.note;
      }
      const liveRpm = groupPaused ? 0 : Math.round(h.rpm * (scrubFrame < 35 ? 0.85 : 1));
      const dynCarriage = (h.carriageX + (35 - scrubFrame) * 1.2).toFixed(1).replace('.', ',');
      if (elTelRpm) elTelRpm.textContent = liveRpm + ' RPM';
      if (elTelCarriage) elTelCarriage.textContent = dynCarriage + ' mm';
      if (elTelDia) elTelDia.textContent = 'Ø ' + h.diaMain.toFixed(1).replace('.', ',') + ' mm';
      if (elTelGate) {
        elTelGate.textContent = h.chuckKeyIn ? 'SLEUTEL ERIN' : (h.guardClosed ? 'KAP DICHT ✓' : 'KAP OPEN');
      }
      if (elReplayReadout) {
        elReplayReadout.textContent = scrubFrame >= 35
          ? '● LIVE MEEKIJKEN'
          : '⏪ TERUGKIJKEN (-' + ((35 - scrubFrame) * 0.5).toFixed(1).replace('.', ',') + ' sec)';
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
            scrubFrame = parseInt(btn.getAttribute('data-bm-frame'), 10);
            if (elReplaySlider) elReplaySlider.value = String(scrubFrame);
            updateCockpit();
            showToast('Teruggespoeld naar een gemarkeerd moment bij ' + h.student + ' (' + h.id + ').');
          });
        });
      }

      drawBlueprint(h, ratio);

      /* Werk het A4-praktijkrapport bij met de gekozen leerling */
      const repStudent = document.getElementById('repModalStudent');
      const repKlas = document.getElementById('repModalKlas');
      const repReaction = document.getElementById('repModalReaction');
      const printStudent = document.getElementById('printRepStudent');
      if (repStudent) repStudent.textContent = h.student + ' (' + h.id + ')';
      if (repKlas) repKlas.textContent = h.klas;
      if (repReaction) repReaction.textContent = 'Direct ingedrukt (' + h.reactionSec + ')';
      if (printStudent) printStudent.textContent = h.student + ' (' + h.id + ' · ' + h.klas + ')';
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
        showToast('Laatste handelingen worden rustig opnieuw afgespeeld.');
        updateCockpit();
        replayInterval = setInterval(function () {
          scrubFrame += 1;
          if (elReplaySlider) elReplaySlider.value = String(scrubFrame);
          updateCockpit();
          if (scrubFrame >= 35) {
            stopReplayLoop();
            showToast('Je kijkt weer live mee.');
          }
        }, 180);
      });
    }

    if (btnGroupPause) {
      btnGroupPause.addEventListener('click', function () {
        groupPaused = !groupPaused;
        btnGroupPause.textContent = groupPaused ? 'Hervat klas' : 'Pauzeer klas';
        updateCockpit();
        showToast(groupPaused
          ? 'Hele klas gepauzeerd: alle VR-brillen staan stil voor korte uitleg van de docent.'
          : 'Les hervat: alle leerlingen kunnen weer verder werken.');
      });
    }

    if (btnNextStudent) {
      btnNextStudent.addEventListener('click', function () {
        const h = HEADSETS[selectedIdx];
        showToast('Voortgang opgeslagen op ' + h.id + ' — bril staat weer klaar voor de volgende leerling.');
      });
    }

    cockpitRoot.querySelectorAll('[data-teacher-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cmd = btn.getAttribute('data-teacher-cmd');
        const h = HEADSETS[selectedIdx];
        if (cmd === 'COOLANT') {
          coolantActive = !coolantActive;
          updateCockpit();
          showToast('Koeling ' + (coolantActive ? 'aangezet' : 'uitgezet') + ' bij ' + h.student + ' (' + h.id + ').');
          return;
        }
        const messages = {
          AC21: 'Opstelling goedgekeurd bij ' + h.student + ' (' + h.id + ') — leerling kan veilig starten.',
          WOBBLE: 'Noodstop-oefening gestart bij ' + h.student + ' (' + h.id + '): werkstuk gaat merkbaar slingeren.',
          CALIBRATE: 'Werkhoogte van de machine netjes afgestemd voor ' + h.student + ' (' + h.id + ').',
          TTS: 'Rustige gesproken aanwijzing afgespeeld op ' + h.id + '.'
        };
        showToast(messages[cmd] || ('Actie uitgevoerd op ' + h.id + '.'));
      });
    });

    /* A4-Praktijkrapport Modal & Handtekeningveld */
    const reportModal = document.getElementById('a4ReportModal');
    const btnCloseReport = document.getElementById('btnCloseReportModal');
    const btnPrintReport = document.getElementById('btnPrintA4Report');
    const sigCanvas = document.getElementById('spenSignatureCanvas');
    const btnClearSig = document.getElementById('btnClearSignature');
    const btnDemoSig = document.getElementById('btnDemoSignature');
    const sigStatus = document.getElementById('spenSignatureStatus');
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
      sctx.fillText('Getekend met S Pen · Vakdocent', 38, 96);
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
        if (sigStatus) sigStatus.textContent = 'Zet hierboven een handtekening met muis, vinger of S Pen';
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
            : 'Nog samen bij de echte machine langs te lopen: Punt 1 t/m Punt 5';
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
      alt: 'Elektrotechniek & Schakelkasten VR-training volgens NEN 3140 en Lockout-Tagout',
      caption: '400V Lockout-Tagout & NEN 3140 · standaard beschikbaar of op maat voor jullie eigen verdeler',
      domeinOption: 'Elektrotechniek & Energie (LOTO / NEN 3140)'
    },
    metaal: {
      img: 'assets/img/brand/domein_01_metaal_en_verspaning.webp',
      alt: 'Metaal, Verspaning & Constructie VR-maatwerktraining voor eigen werkplaatsmachines',
      caption: 'Metaal & Verspaning: conventioneel en CNC draaien of frezen, opspannen en veiligheid aan de bank',
      domeinOption: 'Metaalbewerking & Verspaning'
    },
    klimaat: {
      img: 'assets/img/brand/domein_04_installatie_en_klimaat.webp',
      alt: 'Installatie- & Klimaattechniek VR-maatwerktraining op warmtepomp- en klimaatinstallaties',
      caption: 'Installatie & Klimaat: veilig inbedrijfstellen, drukcontroles en stap voor stap storingzoeken',
      domeinOption: 'Installatie- & Klimaattechniek'
    },
    mechatronica: {
      img: 'assets/img/brand/domein_03_mechatronica_en_industrie.webp',
      alt: 'Mechatronica, Robotcellen & Procesindustrie VR-maatwerktraining voor lijnveiligheid en vrijgave',
      caption: 'Mechatronica & Industrie: veilig betreden van robotcellen, hekwerkbeveiliging en lijnvrijgave',
      domeinOption: 'Mechatronica & Industriële Machineveiligheid'
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
      const machine = document.getElementById('scopeMachine').value.trim() || 'Eigen machine of praktijkopstelling';
      const doelgroep = document.getElementById('scopeDoelgroep').value;
      const pakketStatus = document.getElementById('scopeTabletBezit').value;

      const checkedGoals = Array.from(scoperForm.querySelectorAll('input[name="scopeGoal"]:checked')).map(function (el) {
        return el.value;
      });
      const goalsList = checkedGoals.length > 0
        ? checkedGoals.join(', ')
        : 'Kleding- en PBM-check, veilig opstarten en rustig uitschakelen';

      const fullText =
        'SAMENVATTING MAATWERK-IDEE — TECHBUILDS VR\n' +
        '----------------------------------------------------\n' +
        'Vakgebied       : ' + domein + '\n' +
        'Machine / kast  : ' + machine + '\n' +
        'Voor wie        : ' + doelgroep + '\n' +
        'Leerdoelen      : ' + goalsList + '\n' +
        'Gewenste vorm   : ' + pakketStatus + '\n' +
        'Begeleiding     : Gewoon zichtbaar op het 13,1-inch Teacher Dashboard + A4-rapport\n' +
        'Doorlooptijd    : Gemiddeld 6 tot 10 weken van bezoek op school tot oplevering';

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
          encodeURIComponent('Maatwerk VR-idee — ' + data.machine) +
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
        a.download = 'TechBuilds_VR_Maatwerk_Overzicht.txt';
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
      sub: '1 module inbegrepen: Draaibank VR — WEILER Praktikant 140',
      feeText: '€ 0,- (inbegrepen)',
      formValue: 'Draaibank VR — WEILER Praktikant 140 (inbegrepen)'
    },
    elektro: {
      fee: 0,
      sub: '1 module inbegrepen: Elektrotechniek VR — Veilig stellen (NEN 3140)',
      feeText: '€ 0,- (inbegrepen)',
      formValue: 'Elektrotechniek VR — Veilig stellen NEN 3140 & LOTO (inbegrepen)'
    },
    beide: {
      fee: EXTRA_MODULE_PRICE,
      sub: 'Draaibank VR + Elektrotechniek VR samen op dezelfde tablet en brillen',
      feeText: '+ € 5.000,- (eenmalig)',
      formValue: 'Beide modules: Draaibank VR + Elektrotechniek VR (+ € 5.000,- eenmalig excl. BTW)'
    }
  };

  const PACKAGES = {
    'optie-1-eigen-brillen': {
      num: '1',
      shortLabel: 'Optie 1 · Eigen Brillen',
      title: 'Optie 1 — Teacher Dashboard & Eigen Brillen',
      bannerTitle: 'Optie 1 (€ 10.000,- excl. BTW · 1e jaar service inbegrepen)',
      upfront: 10000,
      annual: 1500,
      firstYearIncluded: true,
      heroImg: 'assets/img/brand/pakket_regietablet_vr_set.webp',
      heroCaption: 'Optie 1 (€ 10.000,-): 13,1-inch Samsung tablet met Teacher Dashboard + onbeperkt eigen brillen (incl. 1 VR-module)',
      unitSingle: '1 Teacher Dashboard-set (eigen brillen)',
      unitPlural: 'Teacher Dashboard-sets (eigen brillen)',
      hwSub: '13,1-inch Samsung Tab S10 FE+ (waterdicht, S Pen & stevige hoes) + onbeperkt eigen brillen koppelen',
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
      heroImg: 'assets/img/brand/pakket_zioxi_vr_kar_werkplaats.webp',
      heroCaption: 'Optie 2 (€ 15.000,-): Mobiele Zioxi VR-kar met 10× Meta Quest 3S, eigen KPN 5G en 13,1-inch tablet op één stopcontact',
      unitSingle: '1 VR-Kar 10 (10× Meta Quest 3S)',
      unitPlural: 'VR-Karren 10',
      hwSub: 'Mobiele Zioxi oplaadkar (1 stekker) + 10× Meta Quest 3S + eigen KPN 5G-router + 13,1-inch Samsung tablet',
      srvSub: 'Beheer van alle brillen, onbeperkt KPN 5G én elk jaar onderhoud op school',
      ruleHint: 'Inclusief onbeperkt KPN 5G in de kar en onze jaarlijkse onderhoudsbeurt op school (€ 2.500,-/jr excl. BTW).',
      formValue: 'Optie 2: Complete VR-Kar 10 (€ 15.000,- excl. BTW + € 2.500,-/jr service & KPN 5G)'
    },
    'optie-3-vr-kar-20': {
      num: '3',
      shortLabel: 'Optie 3 · VR-Kar 20',
      title: 'Optie 3 — Complete VR-Kar 20',
      bannerTitle: 'Optie 3 — Complete VR-Kar 20 (€ 25.000,- excl. BTW)',
      upfront: 25000,
      annual: 3500,
      firstYearIncluded: false,
      heroImg: 'assets/img/brand/pakket_zioxi_vr_kar_werkplaats.webp',
      heroCaption: 'Optie 3 (€ 25.000,-): Mobiele Zioxi VR-kar met 20× Meta Quest 3S, eigen KPN 5G en 13,1-inch tablet voor hele klassen',
      unitSingle: '1 VR-Kar 20 (20× Meta Quest 3S)',
      unitPlural: 'VR-Karren 20',
      hwSub: 'Mobiele Zioxi oplaadkar (1 stekker) + 20× Meta Quest 3S + eigen KPN 5G-router + 13,1-inch Samsung tablet',
      srvSub: 'Beheer van alle 20 brillen, onbeperkt KPN 5G én elk jaar onderhoud op school',
      ruleHint: 'Voor hele klassen tegelijk, inclusief onbeperkt KPN 5G en jaarlijks onderhoud op school (€ 3.500,-/jr excl. BTW).',
      formValue: 'Optie 3: Complete VR-Kar 20 (€ 25.000,- excl. BTW + € 3.500,-/jr service & KPN 5G)'
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
      selType.value = 'Maatwerk VR-training ontwikkelen + Pakketkeuze';
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
      const modChoiceText = selReqMod ? selReqMod.value : 'Draaibank VR';
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
