/**
 * TechBuilds VR — Interactieve Website Logica (v2.1 — Visual 5 Bento Tiles × Engineering Blue)
 * Onderdelen:
 * 1. Sticky Frosted Navigatie, Scroll-Progress, Mobiele Quick-CTA, Back-to-Top & Scroll-Reveal
 * 2. Visual 5 Interactieve Hero Bento-Tegels & Frosted Scène-Dock (index.html)
 * 3. Verbeterde M1–M6 Module-Studio met Voortgangsbalk, Pijltoetsen & M1 Voor/Na PBM-Inspector (training-draaibank.html)
 * 4. 13,1" Android Docenten Dashboard v2.3.0 Simulator met Meebewegende 2D CAD-Slede, 4 Hz Replay & A4 S Pen Rapport (docentapp-tablet.html)
 * 5. Vakdomein Hero-Switcher & Maatwerk-Scoper met info@techbuildsvr.nl koppeling (maatwerk.html)
 * 6. Naadloze Pakket-Keuzereis (?optie=1|2|3), Visuele Meerjaren TCO-Calculator (1–5 jr) & Offerteformulier (prijzen-contact.html)
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
   * 1. Navigatie, Scroll-Progress, Mobiele Quick-CTA, Back-to-Top & Reveal
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
      '.section .apple-card, .section .bento-card, .section .step-card, .section .domain-card, .section .official-doc-tile'
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
   * 2. Visual 5 Interactieve Hero Bento-Tegels & Scène-Dock (index.html)
   * ------------------------------------------------------------------ */
  const HERO_SCENES = {
    praktijklokaal: {
      img: 'assets/img/brand/hero_techbuilds_vr_werkplaats.webp',
      alt: 'Vakdocent met 13,1-inch regietablet kijkt live mee met een student die in VR veilig oefent voor de draaibank in het praktijklokaal',
      caption: 'Vaste oefenzone in het praktijklokaal · 0% loopmisselijkheid · 1 vakdocent houdt overzicht',
      linkText: '6 modules bekijken →',
      linkHref: 'training-draaibank.html'
    },
    modules: {
      img: 'assets/img/weiler/weiler_03_vr_trapdraaien_werktekening.webp',
      alt: 'In-VR zicht op de WEILER Praktikant 140 met gesloten klauwplaatkap, nonius-schaalverdeling en live 2D-werktekening Ø 29,4 ±0,2 mm',
      caption: '6 modules (M1–M6) op de WEILER Praktikant 140: van 3D Buddy Check tot Ø 29,4 ±0,2 mm en noodstop',
      linkText: 'Open Module-Studio →',
      linkHref: 'training-draaibank.html#module-studio'
    },
    kar: {
      img: 'assets/img/brand/pakket_zioxi_vr_kar_werkplaats.webp',
      alt: 'Turnkey Zioxi VR-Kar met genummerde Meta Quest 3S brillen, 13,1-inch Samsung regietablet en eigen KPN 5G Wi-Fi 7 router op één 230V stekker',
      caption: '1× 230V stekker · Nighthawk M7 Pro Wi-Fi 7 + KPN Onbeperkt 5G · 0% belasting op school-IT',
      linkText: 'Vergelijk VR-Kar 10 & 20 →',
      linkHref: 'prijzen-contact.html?optie=2#pakket-keuze'
    },
    tablet: {
      img: 'assets/img/brand/pakket_regietablet_vr_set.webp',
      alt: '13,1-inch Samsung Galaxy Tab S10 FE+ regietablet met TechBuilds VR klaslokaaldashboard naast S Pen, Meta Quest 3S en stalen schuifmaat',
      caption: '13,1" Tab S10 FE+ (IP68 + S Pen): 10 brillen (2×5), 20 brillen (4×5) of onbeperkt eigen brillen',
      linkText: 'Test 13,1" Simulator →',
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
   * 3. Interactieve Module-Studio M1–M6 (training-draaibank.html)
   * ------------------------------------------------------------------ */
  const MODULE_ORDER = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  const MODULES_DATA = {
    M1: {
      code: 'MODULE M1 · STANDPLAATS A · AV_COMBO_1..5',
      standplaats: 'Standplaats A · Vaste vloerzone',
      title: '3D Buddy Check & Eigen PBM',
      summary: 'Vóór de machine wordt aangeraakt controleert de student oog in oog een levensgrote 3D-medestudent met de twee wijsvingertriggers én stelt de eigen PBM veilig.',
      image: 'assets/img/weiler/weiler_00b_buddy_check_compleet.webp',
      altImage: 'assets/img/weiler/weiler_00a_buddy_check_start.webp',
      caption: '3D Buddy Check voltooid: medestudent gecorrigeerd, eigen veiligheidsbril op en eigen werkhandschoenen uit.',
      altCaption: 'Beginsituatie M1 (AV_COMBO_1..5): los haar, sieraden en verboden werkhandschoenen vóór vrijgave naar de machine.',
      hasBuddyToggle: true,
      telRpm: '0 RPM (Standplaats A)',
      telTol: '5 Varianten (AV_COMBO_1..5)',
      telPos: 'L + R Trigger · 0% lopen',
      checks: [
        'Levensgrote 3D-medestudent controleren op los haar, open mouwen, sieraden en veiligheidsschoeisel',
        'Eigen veiligheidsbril opzetten en eigen werkhandschoenen verplicht afleggen (intrekkingsgevaar)',
        'Pas na foutloze 3D Buddy Check & Eigen PBM volgt toegang tot Standplaats B bij de WEILER'
      ]
    },
    M2: {
      code: 'MODULE M2 · STANDPLAATS B · ARBOBESLUIT 7.5 & 7.7',
      standplaats: 'Standplaats B · WEILER Praktikant 140',
      title: 'Machine- & Werkplekcontrole vóór start',
      summary: 'Recht vóór de WEILER Praktikant 140 inspecteert de student de vloerzone, het machinebed, de beschermkappen en de nulstand van de sleden.',
      image: 'assets/img/weiler/weiler_02_vr_werkplaats_overzicht.webp',
      caption: 'Operatorzicht op Standplaats B met vaste kop, beitelhouder, koelslang en 4-camera inspectiepaneel.',
      hasBuddyToggle: false,
      telRpm: '0 RPM (Prestart)',
      telTol: '4/4 Inspectiepunten',
      telPos: 'carriage_x: 140,0 mm',
      checks: [
        'Olie- en koelmiddelplassen of losliggende obstakels rond de draaibank herkennen en opruimen',
        'Machinebed vrijmaken van los gereedschap en klauwplaatbeschermkap op werking controleren',
        'Controleren dat automatische langsvoeding uitgeschakeld staat vóór inschakeling hoofdschakelaar'
      ]
    },
    M3: {
      code: 'MODULE M3 · OPSPANNEN & TOERENTABEL',
      standplaats: 'Standplaats B · Drieklauw & Spil',
      title: 'Zuiver opspannen & klauwplaatsleutel-discipline',
      summary: 'Het stafmateriaal wordt ingeklemd in de drieklauw met rondloopcontrole en één onwrikbare hoofdregel: de klauwplaatsleutel gaat direct terug in de houder.',
      image: 'assets/img/weiler/weiler_01_machine_3d_model.webp',
      caption: 'WEILER Praktikant 140 digital twin (82 PBR-onderdelen) met drieklauw, sleutelhouder en toerentabel.',
      hasBuddyToggle: false,
      telRpm: '710 RPM (Gekozen)',
      telTol: 'Rondloop ≤ 0,02 mm',
      telPos: 'carriage_x: 118,0 mm',
      checks: [
        'Maximale uitsteeklengte bewaken en rondloop controleren vóór vrijgave',
        'Startpoging met klauwplaatsleutel in de drieklauw activeert direct een rustige Freeze met uitleg',
        'Juiste toerental schakelen bij volledig stilstaande hoofdspil en AC21 docent-vrijgave aanvragen'
      ]
    },
    M4: {
      code: 'MODULE M4 · VEILIG STARTEN & VERSPANEN',
      standplaats: 'Standplaats B · Snijzone & Nonius',
      title: 'Vlak- en trapdraaien op live 2D-werktekening',
      summary: 'Met gesloten klauwplaatkap draait de student het kopvlak schoon en werkt op nonius-schaalverdeling naar de gevraagde maattolerantie toe.',
      image: 'assets/img/weiler/weiler_03_vr_trapdraaien_werktekening.webp',
      caption: 'Gesloten beschermkap, nonius-uitlezing en 2D-werktekening (Ø 29,4 ±0,2 mm & trap Ø 28,0 × 24 mm).',
      hasBuddyToggle: false,
      telRpm: '710 RPM (Snijzone)',
      telTol: 'Ø 29,4 ±0,2 mm',
      telPos: 'carriage_x: 64,5 mm',
      checks: [
        'Opzettelijke spindelstart pas na gesloten beschermkap en vrije draaizone (Arbobesluit 7.14)',
        'Directe fysica-feedback bij te diepe aanzet: trilling (chatter), oplopende snijtemperatuur en stop',
        'Nauwkeurig werken met langs- en dwarsslede richting Ø 29,4 mm hoofdmaat en Ø 28,0 mm trap'
      ]
    },
    M5: {
      code: 'MODULE M5 · STOPPEN, METEN & SCHOONMAKEN',
      standplaats: 'Standplaats B · 0 RPM Stilstand',
      title: 'Volledige stilstand (0 RPM) & 3D-schuifmaat',
      summary: 'Meten of spanen verwijderen tijdens uitloop wordt direct onderschept. Pas bij 0 RPM meet de student na met de 3D-schuifmaat en ruimt veilig op.',
      image: 'assets/img/weiler/weiler_04_vr_schuifmaat_nameten.webp',
      caption: 'Na volledige stilstand (0 RPM) meet de student Ø 29,4 mm na met de 3D-schuifmaat.',
      hasBuddyToggle: false,
      telRpm: '0 RPM (Stilstand)',
      telTol: 'Nonius ± 0,1 mm',
      telPos: 'carriage_x: 132,0 mm',
      checks: [
        'Volledige spindelstilstand (0 RPM) afwachten vóór openen van de kap of pakken van de schuifmaat',
        'Spanen verwijderen met spanenhaak en kwast — nooit met blote hand of perslucht',
        'Draaibank spanningsveilig, schoon en gereed voor de volgende leerling achterlaten'
      ]
    },
    M6: {
      code: 'MODULE M6 · STORINGEN & NOODSTOP',
      standplaats: 'Standplaats B · Noodstop & LOTO',
      title: 'Afwijkingen herkennen, noodstop & LOTO-isolatie',
      summary: 'Kalm en trefzeker ingrijpen bij plotselinge werkstukslingering of een weigerende stopknop, inclusief exacte reactietijdmeting in milliseconden.',
      image: 'assets/img/weiler/weiler_05_vr_veiligheidsstop_m6.webp',
      caption: 'Zichtbare werkstukslingering (1,85 mm) met directe bediening van de paddenstoel-noodstop.',
      hasBuddyToggle: false,
      telRpm: '0 RPM (Noodstop)',
      telTol: 'Reactie < 750 ms',
      telPos: 'Slingering 1,85 mm',
      checks: [
        'Onmiddellijk indrukken van de paddenstoel-noodstop bij slingering of mechanische afwijking',
        'Geen automatische herstart na ontgrendelen noodstop (bewuste herstarteis Arbobesluit 7.14)',
        'Onderscheid toepassen tussen normale stop, noodstop en spanningsloos maken (LOTO)'
      ]
    }
  };

  const moduleTabs = document.querySelectorAll('[data-module-tab]');
  if (moduleTabs.length > 0) {
    let activeModKey = 'M1';
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
      const m = MODULES_DATA.M1;
      const checkedCount = Array.from(m1Chips).filter(function (c) {
        return c.classList.contains('is-checked');
      }).length;
      const totalChips = m1Chips.length || 4;
      const isBefore = m1State === 'before';

      if (elImg && activeModKey === 'M1') {
        elImg.src = isBefore ? m.altImage : m.image;
      }
      if (elCaption && activeModKey === 'M1') {
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
          elM1GateBanner.textContent = '✓ ' + checkedCount + '/' + totalChips + ' PBM-punten veilig — Toegang tot Standplaats B (WEILER 140) vrijgegeven';
        } else {
          elM1GateBanner.className = 'm1-gate-banner is-open';
          elM1GateBanner.textContent = '⚠ ' + checkedCount + '/' + totalChips + ' PBM-punten gekeurd — Klik alle 4 veiligheidspunten aan voor vrijgave naar Standplaats B';
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

      if (elStepCounter) elStepCounter.textContent = 'Module ' + stepNum + ' van ' + MODULE_ORDER.length;
      if (elStandplaatsHint) elStandplaatsHint.textContent = m.standplaats;
      if (elProgressFill) {
        elProgressFill.style.width = ((stepNum / MODULE_ORDER.length) * 100).toFixed(2) + '%';
      }

      if (elCode) elCode.textContent = m.code;
      if (elTitle) elTitle.textContent = m.title;
      if (elSummary) elSummary.textContent = m.summary;
      if (elImg) {
        elImg.src = (key === 'M1' && m1State === 'before') ? m.altImage : m.image;
        elImg.alt = m.title;
      }
      if (elCaption) {
        elCaption.textContent = (key === 'M1' && m1State === 'before') ? m.altCaption : m.caption;
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
      if (key === 'M1') {
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
    renderModule(MODULES_DATA[initialMod] ? initialMod : 'M1');
  }

  /* ------------------------------------------------------------------
   * 4. 13,1" Android Docenten Dashboard (v2.3.0) Simulator + S Pen A4 Rapport
   * ------------------------------------------------------------------ */
  const cockpitRoot = document.getElementById('docentCockpitSim');
  if (cockpitRoot) {
    const initialSlots = parseInt(cockpitRoot.getAttribute('data-slots') || '10', 10);
    const BASE_HEADSETS = [
      {
        id: 'QUEST-01', student: 'Daan Bakker', klas: 'MBO-2 Verspanen', mod: 'M4 · Trapdraaien',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 710, diaMain: 29.4, diaStep: 28.0,
        carriageX: 64.5, temp: 74, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 640, battery: 88,
        note: 'Kopvlak gevlakt · Hoofdmaat Ø 29,4 mm binnen tolerantie (±0,2 mm), langsslede op 64,5 mm.',
        bookmarks: [
          { frame: 8, label: 'M3 Opstelling vrijgegeven (AC21)', warn: false },
          { frame: 22, label: 'Kopvlak vlakdraaien voltooid', warn: false },
          { frame: 35, label: 'Maat Ø 29,4 mm bereikt', warn: false }
        ]
      },
      {
        id: 'QUEST-02', student: 'Sara Yilmaz', klas: 'MBO-2 Verspanen', mod: 'M3 · Opspannen',
        status: 'FREEZE', statusClass: 'status-danger', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        carriageX: 118.0, temp: 24, guardClosed: false, chuckKeyIn: true, runout: 0.03, reactionMs: 710, battery: 92,
        note: 'VEILIGHEIDSSTOP: Startpoging met klauwplaatsleutel nog in drieklauw — rustige uitleg getoond.',
        bookmarks: [
          { frame: 14, label: 'Werkstuk Ø 30 mm ingeklemd', warn: false },
          { frame: 28, label: 'FREEZE: Sleutel nog in klauwplaat', warn: true }
        ]
      },
      {
        id: 'QUEST-03', student: 'Lucas van Dijk', klas: 'VMBO-PIE Klas 4', mod: 'M4 · Langsdraaien',
        status: 'LET OP', statusClass: 'status-warn', rpm: 1000, diaMain: 29.6, diaStep: 28.4,
        carriageX: 82.0, temp: 234, guardClosed: true, chuckKeyIn: false, runout: 0.04, reactionMs: 690, battery: 76,
        note: 'LET OP: Te diepe aanzet (1,45 mm) bij 1000 RPM veroorzaakt chatter en 234 °C aanloopkleur.',
        bookmarks: [
          { frame: 12, label: 'Start spindel 1000 RPM (kap dicht)', warn: false },
          { frame: 31, label: 'Chatter & snijtemp 234 °C', warn: true }
        ]
      },
      {
        id: 'QUEST-04', student: 'Noor Jansen', klas: 'MBO-3 Allround', mod: 'M6 · Noodsituatie',
        status: 'VEILIG GESTOPT', statusClass: 'status-info', rpm: 0, diaMain: 29.4, diaStep: 28.0,
        carriageX: 96.0, temp: 52, guardClosed: true, chuckKeyIn: false, runout: 1.85, reactionMs: 580, battery: 84,
        note: 'M6 Geslaagd: Paddenstoel-noodstop bediend binnen 580 ms bij 1,85 mm werkstukslingering.',
        bookmarks: [
          { frame: 19, label: 'Storingsinjectie: Slingering 1,85 mm', warn: true },
          { frame: 25, label: 'Noodstop bediend (580 ms)', warn: false }
        ]
      },
      {
        id: 'QUEST-05', student: 'Sem de Vries', klas: 'MBO-2 Verspanen', mod: 'M1 · 3D Buddy Check',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        carriageX: 140.0, temp: 21, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 660, battery: 95,
        note: 'Standplaats A: 3D-medestudent gecorrigeerd (AV_COMBO_2) & eigen werkhandschoenen afgelegd.',
        bookmarks: [
          { frame: 16, label: '3D Buddy Check & Eigen PBM gekeurd', warn: false }
        ]
      },
      {
        id: 'QUEST-06', student: 'Mila Koster', klas: 'MBO-2 Verspanen', mod: 'M5 · Nameten',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 29.3, diaStep: 28.0,
        carriageX: 132.0, temp: 41, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionMs: 615, battery: 81,
        note: 'Spindel op 0 RPM · 3D-schuifmaat geklemd op Ø 29,3 mm (binnen ±0,2 mm).',
        bookmarks: [
          { frame: 20, label: 'Volledige stilstand 0 RPM afgewacht', warn: false },
          { frame: 33, label: '3D-Schuifmaat meting: 29,3 mm', warn: false }
        ]
      },
      {
        id: 'QUEST-07', student: 'Bram Peters', klas: 'MBO-3 Allround', mod: 'M2 · Inspectie',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        carriageX: 140.0, temp: 22, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 705, battery: 79,
        note: 'Prestart: koelmiddelplas op vloer gemeld en machinebed volledig vrijgemaakt.',
        bookmarks: [
          { frame: 18, label: 'Vloerobstakel & koelmiddel gemeld', warn: false }
        ]
      },
      {
        id: 'QUEST-08', student: 'Aya El Amrani', klas: 'MBO-2 Verspanen', mod: 'M4 · Examen EX-4821',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 710, diaMain: 29.5, diaStep: 28.1,
        carriageX: 58.2, temp: 68, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 595, battery: 90,
        note: 'Individueel praktijkexamen (Real Deal zonder hints) — stabiele langsvoeding.',
        bookmarks: [
          { frame: 10, label: 'Prestart 100% zelfstandig behaald', warn: false },
          { frame: 30, label: 'Trap-as Ø 28,1 mm in bewerking', warn: false }
        ]
      },
      {
        id: 'QUEST-09', student: 'Finn Hendriks', klas: 'MBO-2 Verspanen', mod: 'M3 · Toerentabel',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 710, diaMain: 30.0, diaStep: 30.0,
        carriageX: 112.0, temp: 38, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 630, battery: 87,
        note: 'Snijsnelheid berekend · 710 RPM veilig geschakeld bij stilstaande hoofdspil.',
        bookmarks: [{ frame: 24, label: '710 RPM veilig geschakeld', warn: false }]
      },
      {
        id: 'QUEST-10', student: 'Zoë Vermeer', klas: 'MBO-3 Allround', mod: 'M5 · Schoonmaken',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 29.4, diaStep: 28.0,
        carriageX: 138.0, temp: 33, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionMs: 605, battery: 93,
        note: 'Hoofdschakelaar op 0 · Spanen verwijderd met spanenhaak en kwast.',
        bookmarks: [{ frame: 30, label: 'Spanenhaak gebruikt', warn: false }]
      }
    ];

    const EXTRA_NAMES = [
      'Jesse Mulder', 'Eva Bos', 'Timo Dekker', 'Lotte Brouwer', 'Ruben Kok',
      'Sanne de Groot', 'Milan Visser', 'Nina Meijer', 'Luuk Willems', 'Tess Vos',
      'Sam Kuijpers', 'Fleur Schouten'
    ];
    for (let n = 11; n <= 22; n++) {
      const tpl = BASE_HEADSETS[(n - 1) % 10];
      const padId = 'QUEST-' + (n < 10 ? '0' + n : String(n));
      BASE_HEADSETS.push({
        id: padId,
        student: EXTRA_NAMES[n - 11] || ('Student ' + n),
        klas: tpl.klas,
        mod: tpl.mod,
        status: tpl.status,
        statusClass: tpl.statusClass,
        rpm: tpl.rpm,
        diaMain: tpl.diaMain,
        diaStep: tpl.diaStep,
        carriageX: tpl.carriageX,
        temp: tpl.temp,
        guardClosed: tpl.guardClosed,
        chuckKeyIn: tpl.chuckKeyIn,
        runout: tpl.runout,
        reactionMs: tpl.reactionMs,
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
      OVERVIEW_3Q: 'Overzicht 3/4',
      CUT_ZONE: 'Snijzone Close-up',
      CHUCK_CLOSE: 'Klauwplaat & Kap',
      SPEED_CHART: 'Snelheidstabel'
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
        if (protocolLine) protocolLine.textContent = 'ANDROID DASHBOARD V2.3.0 · VR-KAR 10 (2×5) · 192.168.1.101..110:8765';
      } else if (profKey === 'kar20') {
        activeCount = 20;
        if (protocolLine) protocolLine.textContent = 'ANDROID DASHBOARD V2.3.0 · VR-KAR 20 (4×5) · 192.168.1.101..120:8765';
      } else {
        activeCount = 12;
        if (protocolLine) protocolLine.textContent = 'ANDROID DASHBOARD V2.3.0 · EIGEN BRILLEN (ONBEPERKT · UDP :47800)';
      }
      HEADSETS = BASE_HEADSETS.slice(0, activeCount);
      if (selectedIdx >= HEADSETS.length) selectedIdx = 0;
      updateCockpit();
      showToast(
        'Klasprofiel actief: ' +
        (profKey === 'kar10' ? 'VR-Kar 10 (2×5)' : profKey === 'kar20' ? 'VR-Kar 20 (4×5)' : 'Eigen Brillen (Onbeperkt via UDP :47800)') +
        ' — live videostream alleen op 1 geselecteerde bril.'
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
        showToast('Spectator-camera gewisseld → ' + CAM_LABELS[activeSpectatorCam] + ' op ' + h.id + ' (live stream op 1 bril).');
      });
    });

    function renderSlots() {
      if (!slotsContainer) return;
      let html = HEADSETS.map(function (h, idx) {
        if (statusFilter === 'attention' && h.status !== 'FREEZE' && h.status !== 'LET OP') {
          return '';
        }
        if (statusFilter === 'active' && h.status !== 'ACTIEF') {
          return '';
        }
        const badgeText = groupPaused ? 'PAUZE' : h.status;
        const badgeCls = groupPaused ? 'status-warn' : h.statusClass;
        const isSel = idx === selectedIdx;
        return (
          '<button type="button" class="quest-slot ' + (isSel ? 'is-selected' : '') + '" data-slot-idx="' + idx + '" id="slotBtn_' + h.id + '">' +
            '<div class="quest-slot-top">' +
              '<span class="mono" style="font-size:0.72rem;font-weight:600;color:' + (isSel ? '#38BDF8' : '#94A3B8') + ';">' + h.id + ' · ' + h.battery + '%</span>' +
              '<span class="status-badge ' + badgeCls + '">' + badgeText + '</span>' +
            '</div>' +
            '<span class="quest-slot-name">' + h.student + '</span>' +
            '<span class="quest-slot-meta">' + h.mod + (isSel ? ' · LIVE FOCUS' : '') + '</span>' +
          '</button>'
        );
      }).join('');

      if (currentProfile === 'unlimited' && activeCount < BASE_HEADSETS.length && statusFilter === 'all') {
        html +=
          '<button type="button" class="quest-slot" id="btnAddUnlimitedHeadset" style="border-style:dashed;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">' +
            '<span class="mono" style="font-size:0.76rem;color:#38BDF8;font-weight:600;">+ KOPPEL EIGEN BRIL</span>' +
            '<span class="quest-slot-meta">UDP :47800 (Onbeperkt)</span>' +
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
          showToast('Live focus op ' + HEADSETS[selectedIdx].id + ' (' + HEADSETS[selectedIdx].student + ') — overige brillen op 4 Hz telemetrie.');
        });
      });

      const addBtn = document.getElementById('btnAddUnlimitedHeadset');
      if (addBtn) {
        addBtn.addEventListener('click', function () {
          if (activeCount < BASE_HEADSETS.length) {
            activeCount += 1;
            HEADSETS = BASE_HEADSETS.slice(0, activeCount);
            selectedIdx = activeCount - 1;
            updateCockpit();
            showToast('Nieuwe eigen bril (' + HEADSETS[selectedIdx].id + ') gekoppeld via UDP :47800 Zero-Config Discovery.');
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

      /* Subtiel technisch CAD-raster op de achtergrond */
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
        ctx.fillText('WEILER PRAKTIKANT 140 — TOERENTABEL & VOEDING', 56, 54);

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
        ctx.fillText('Actief spiltoerental student: ' + (groupPaused ? 0 : h.rpm) + ' RPM  ·  Advies staal Ø 30 mm (Vc 65 m/min): 710 RPM', 56, 154);
        ctx.restore();
      } else {
        /* Bedbanen van de WEILER Praktikant 140 onderlangs */
        const bedY = cy + 64;
        ctx.fillStyle = '#0F2036';
        ctx.strokeStyle = '#254266';
        ctx.lineWidth = 1.2;
        ctx.fillRect(28, bedY, w - 56, 16);
        ctx.strokeRect(28, bedY, w - 56, 16);

        /* Technische hartlijn */
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
          ctx.fillText('SLEUTEL IN KLAUWPLAAT (FREEZE)', 130, 24);
        }

        const wobbleOffset = h.runout > 0.5 ? (scrubFrame % 2 === 0 ? 5 : -4) : 0;
        const mainHalfH = Math.round((h.diaMain / 30.0) * 30);
        const stepProgress = Math.min(1, Math.max(0.08, frameRatio));
        const stepHalfH = Math.round((h.diaStep / 30.0) * 30);

        /* Werkstuk hoofdcilinder + afgedraaide trap (groeit mee met de 4 Hz tijdlijn!) */
        const totalStockLen = 330;
        const turnedStepLen = Math.round(135 * stepProgress);
        const unturnedLen = totalStockLen - turnedStepLen;

        ctx.fillStyle = h.temp > 180 ? '#D97706' : '#94A3B8';
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1.2;
        ctx.fillRect(108, cy - mainHalfH + wobbleOffset, unturnedLen, mainHalfH * 2);
        ctx.strokeRect(108, cy - mainHalfH + wobbleOffset, unturnedLen, mainHalfH * 2);

        ctx.fillStyle = h.temp > 180 ? '#F59E0B' : '#CBD5E1';
        ctx.fillRect(108 + unturnedLen, cy - stepHalfH - wobbleOffset, turnedStepLen, stepHalfH * 2);
        ctx.strokeRect(108 + unturnedLen, cy - stepHalfH - wobbleOffset, turnedStepLen, stepHalfH * 2);

        /* Vloeiend meebewegende Beitelslede + Dwarsslede + Beitelhouder op carriage_x_mm */
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

        /* Snijpunt / gloed */
        if (!groupPaused && h.rpm > 0) {
          ctx.fillStyle = h.temp > 180 ? 'rgba(245, 158, 11, 0.65)' : 'rgba(56, 189, 248, 0.45)';
          ctx.beginPath();
          ctx.arc(toolTipX - 2, toolTipY - 2, h.temp > 180 ? 7 : 4.5, 0, Math.PI * 2);
          ctx.fill();
        }

        /* Hardmetalen wisselplaat + beitelschacht */
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

      /* HUD Statusbalk onderin */
      const dynCarriage = (h.carriageX + (35 - scrubFrame) * 1.2).toFixed(1).replace('.', ',');
      ctx.fillStyle = 'rgba(7, 17, 31, 0.90)';
      ctx.fillRect(0, ht - 26, w, 26);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '400 10.5px "JetBrains Mono", monospace';
      ctx.fillText(
        'CAM: ' + CAM_LABELS[activeSpectatorCam] +
        '  ·  carriage_x_mm: ' + dynCarriage + ' mm' +
        '  ·  ' + (h.guardClosed ? 'KAP DICHT' : 'KAP OPEN') +
        '  ·  KOELING: ' + (coolantActive ? 'AAN' : 'UIT') +
        '  ·  M6: ' + h.reactionMs + ' ms',
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
        elStreamBadge.textContent = 'LIVE FOCUS: ' + h.id + ' (1 BRIL STREAM · /api/frame)';
      }
      if (elSelNote) {
        elSelNote.textContent = groupPaused
          ? 'KLAS GEPAUZEERD: Alle verbonden Meta Quest-brillen staan stil voor klassikale toelichting door de vakdocent.'
          : h.note;
      }
      const liveRpm = groupPaused ? 0 : Math.round(h.rpm * (scrubFrame < 35 ? 0.85 : 1));
      const dynCarriage = (h.carriageX + (35 - scrubFrame) * 1.2).toFixed(1).replace('.', ',');
      if (elTelRpm) elTelRpm.textContent = liveRpm + ' RPM';
      if (elTelCarriage) elTelCarriage.textContent = dynCarriage + ' mm';
      if (elTelDia) elTelDia.textContent = 'Ø ' + h.diaMain.toFixed(1).replace('.', ',') + ' mm';
      if (elTelGate) {
        elTelGate.textContent = h.chuckKeyIn ? 'SLEUTEL ALARM' : (h.guardClosed ? 'KAP DICHT ✓' : 'KAP OPEN');
      }
      if (elReplayReadout) {
        elReplayReadout.textContent = scrubFrame >= 35
          ? '● LIVE 4 HZ (:8765)'
          : '⏪ REPLAY t = -' + ((35 - scrubFrame) * 0.5).toFixed(1).replace('.', ',') + ' s';
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
            showToast('Black-Box teruggespoeld naar gemarkeerd moment op ' + h.id + ' (carriage_x beweegt mee).');
          });
        });
      }

      drawBlueprint(h, ratio);

      /* Sync A4 Vrijgaverapport gegevens */
      const repStudent = document.getElementById('repModalStudent');
      const repKlas = document.getElementById('repModalKlas');
      const repReaction = document.getElementById('repModalReaction');
      const printStudent = document.getElementById('printRepStudent');
      if (repStudent) repStudent.textContent = h.student + ' (' + h.id + ')';
      if (repKlas) repKlas.textContent = h.klas;
      if (repReaction) repReaction.textContent = h.reactionMs + ' ms (Module M6)';
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
          showToast('4 Hz Black-Box weergave gepauzeerd op frame ' + scrubFrame + '/35.');
          return;
        }
        if (scrubFrame >= 35) {
          scrubFrame = 0;
          if (elReplaySlider) elReplaySlider.value = '0';
        }
        btnReplayPlay.textContent = '⏸ Stop';
        showToast('4 Hz Black-Box replay gestart — zie de beitelslede (carriage_x_mm) live meebewegen.');
        updateCockpit();
        replayInterval = setInterval(function () {
          scrubFrame += 1;
          if (elReplaySlider) elReplaySlider.value = String(scrubFrame);
          updateCockpit();
          if (scrubFrame >= 35) {
            stopReplayLoop();
            showToast('Terug op ● LIVE 4 HZ (:8765) telemetrie.');
          }
        }, 180);
      });
    }

    if (btnGroupPause) {
      btnGroupPause.addEventListener('click', function () {
        groupPaused = !groupPaused;
        btnGroupPause.textContent = groupPaused ? 'Hervat Klas' : 'Pauzeer Klas';
        updateCockpit();
        showToast(groupPaused
          ? 'Klas gepauzeerd (POST /api/command PAUSE): alle gekoppelde brillen staan stil voor toelichting.'
          : 'Klas hervat (POST /api/command RESUME): alle gekoppelde brillen draaien weer live.');
      });
    }

    if (btnNextStudent) {
      btnNextStudent.addEventListener('click', function () {
        const h = HEADSETS[selectedIdx];
        showToast('Volgende leerling geactiveerd op ' + h.id + ' (SAVE_AND_NEXT_STUDENT → M1 3D Buddy Check gereed).');
      });
    }

    cockpitRoot.querySelectorAll('[data-teacher-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cmd = btn.getAttribute('data-teacher-cmd');
        const h = HEADSETS[selectedIdx];
        if (cmd === 'COOLANT') {
          coolantActive = !coolantActive;
          updateCockpit();
          showToast('Koelmiddeltoevoer ' + (coolantActive ? 'ingeschakeld' : 'uitgeschakeld') + ' op ' + h.id + '.');
          return;
        }
        const messages = {
          AC21: 'AC21 Opstellingsvrijgave verzonden naar ' + h.id + ' (' + h.student + ').',
          WOBBLE: 'M6 Storingsinjectie geactiveerd op ' + h.id + ': werkstukslingering 1,85 mm + ms-meting gestart.',
          CALIBRATE: 'Werkhoogte gekalibreerd (AUTO_CALIBRATE_HEIGHT) op ' + h.id + ' voor ' + h.student + '.',
          TTS: 'Spraakinstructie (NL TTS) afgespeeld in ' + h.id + '.'
        };
        showToast(messages[cmd] || ('Docentcommando verzonden naar ' + h.id + '.'));
      });
    });

    /* A4 Vrijgaverapport Modal & Werkend S Pen Handtekening-Canvas */
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
      physCounter.textContent = checked.length + '/' + allChecks.length + ' afgevinkt';
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
      sctx.fillText('S Pen · Vakdocent Verspaning (Knox PrintManager)', 38, 96);
      hasSignature = true;
      if (sigStatus) sigStatus.textContent = 'S Pen handtekening geregistreerd ✓';
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
        if (sigStatus) sigStatus.textContent = 'S Pen handtekening geregistreerd ✓';
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
        if (sigStatus) sigStatus.textContent = 'Teken hierboven met muis, vinger of S Pen';
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
            ? ('Afgetekende fysieke vrijgavepunten: ' + checked.join(' · '))
            : 'Nog af te vinken op de echte machine: PHYS_01 t/m PHYS_05';
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
   * 5. Vakdomein Hero-Switcher & Maatwerk-Scoper (maatwerk.html)
   * ------------------------------------------------------------------ */
  const MW_SCENES = {
    elektro: {
      img: 'assets/img/brand/domein_02_elektro_en_installatie.webp',
      alt: 'Elektrotechniek & Schakelkasten VR-maatwerktraining volgens NEN 3140 en LOTO',
      caption: 'Elektrotechniek & NEN 3140: veilig spanningsloos maken, LOTO en meten aan verdeelkasten',
      domeinOption: 'Elektrotechniek & Schakelkasten (NEN 3140)'
    },
    metaal: {
      img: 'assets/img/brand/domein_01_metaal_en_verspaning.webp',
      alt: 'Metaal, Verspaning & Constructie VR-maatwerktraining op de eigen werkplaatsmachines',
      caption: 'Metaal & Verspaning: conventioneel/CNC draaien en frezen, opspanning en werkplaatsveiligheid',
      domeinOption: 'Metaal, Verspaning & Constructie'
    },
    klimaat: {
      img: 'assets/img/brand/domein_04_installatie_en_klimaat.webp',
      alt: 'Installatie- & Klimaattechniek VR-maatwerktraining op warmtepomp- en koudemiddelinstallaties',
      caption: 'Installatie & Klimaat: inbedrijfstelling, drukveiligheid en storingsdiagnose zonder installatieschade',
      domeinOption: 'Installatie- & Klimaattechniek'
    },
    mechatronica: {
      img: 'assets/img/brand/domein_03_mechatronica_en_industrie.webp',
      alt: 'Mechatronica, Robotcellen & Procesindustrie VR-maatwerktraining voor lijnveiligheid en vrijgave',
      caption: 'Mechatronica & Industrie: hekwerkbeveiliging, robotcel-vrijgave en gestructureerd storingzoeken',
      domeinOption: 'Mechatronica, Robotcellen & Procesindustrie'
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
      const machine = document.getElementById('scopeMachine').value.trim() || 'Eigen praktijkopstelling / installatie';
      const doelgroep = document.getElementById('scopeDoelgroep').value;
      const pakketStatus = document.getElementById('scopeTabletBezit').value;

      const checkedGoals = Array.from(scoperForm.querySelectorAll('input[name="scopeGoal"]:checked')).map(function (el) {
        return el.value;
      });
      const goalsList = checkedGoals.length > 0
        ? checkedGoals.join(', ')
        : '3D Buddy Check & Eigen PBM, opstartprocedure en veilig stoppen';

      const fullText =
        'TECHBUILDS VR — MAATWERK PROJECTSCHETS\n' +
        '----------------------------------------------------\n' +
        'Vakgebied       : ' + domein + '\n' +
        'Machinetype     : ' + machine + '\n' +
        'Doelgroep       : ' + doelgroep + '\n' +
        'Leerdoelen      : ' + goalsList + '\n' +
        'Oplevervorm     : ' + pakketStatus + '\n' +
        'Klasregie       : 13,1" Android Docenten Dashboard v2.3.0 + A4 PDF (PHYS_01..05)\n' +
        'Indicatie       : 6 tot 10 weken van werkplaatsopname tot Kiosk-oplevering';

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
          encodeURIComponent('Maatwerk VR-aanvraag — ' + data.machine) +
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
        a.download = 'TechBuilds_VR_Maatwerk_Projectschets.txt';
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
   * 6. Naadloze Pakket-Keuzereis (?optie=1|2|3), Visuele TCO & Offerte
   * ------------------------------------------------------------------ */
  const PACKAGES = {
    'optie-1-eigen-brillen': {
      num: '1',
      shortLabel: 'Optie 1 · Eigen Brillen',
      title: 'Optie 1 — Regietablet & Onbeperkt Eigen Brillen',
      bannerTitle: 'Optie 1 (€ 10.000,- excl. BTW · 1e jaar service inbegrepen)',
      upfront: 10000,
      annual: 1500,
      firstYearIncluded: true,
      heroImg: 'assets/img/brand/pakket_regietablet_vr_set.webp',
      heroCaption: 'Optie 1 (€ 10.000,-): 13,1" Samsung regietablet + onbeperkt eigen brillen (1e jr service inbegrepen)',
      unitSingle: '1 regietablet-systeem (onbeperkt eigen brillen)',
      unitPlural: 'regietablet-systemen (onbeperkt eigen brillen)',
      hwSub: '13,1" Tab S10 FE+ (SM-X620, IP68, S Pen) met Knox Single-App Kiosk + onbeperkt eigen brillen',
      srvSub: 'Remote support, updates & Knox MDM-beheer op afstand (1e jaar inbegrepen)',
      ruleHint: 'Het 1e jaar service is inbegrepen bij aanschaf; vanaf jaar 2 geldt € 1.500,-/jr excl. BTW.',
      formValue: 'Optie 1: Regietablet & Onbeperkt Eigen Brillen (€ 10.000,- excl. BTW, 1e jr incl., daarna € 1.500,-/jr)'
    },
    'optie-2-vr-kar-10': {
      num: '2',
      shortLabel: 'Optie 2 · Turnkey VR-Kar 10',
      title: 'Optie 2 — Turnkey VR-Kar 10 (Meest gekozen)',
      bannerTitle: 'Optie 2 — Turnkey VR-Kar 10 (€ 15.000,- excl. BTW)',
      upfront: 15000,
      annual: 2500,
      firstYearIncluded: false,
      heroImg: 'assets/img/brand/pakket_zioxi_vr_kar_werkplaats.webp',
      heroCaption: 'Optie 2 (€ 15.000,-): Zioxi VR-Kar met 10× Quest 3S, KPN Onbeperkt 5G en 13,1" regietablet op één 230V stekker',
      unitSingle: '1 Turnkey VR-Kar 10 (10× Meta Quest 3S)',
      unitPlural: 'Turnkey VR-Karren 10',
      hwSub: 'Zioxi Cart 10 (1× 230V) + 10× Quest 3S (ArborXR) + Nighthawk M7 Pro & KPN 5G + 13,1" Tab S10 FE+',
      srvSub: 'ArborXR + Knox + KPN Onbeperkt 5G + 1×/jr fysieke onderhoudscheck op locatie',
      ruleHint: 'Volledige ontzorging inclusief KPN Onbeperkt 5G en jaarlijkse fysieke locatiecheck (€ 2.500,-/jr excl. BTW).',
      formValue: 'Optie 2: Turnkey VR-Kar 10 (€ 15.000,- excl. BTW + € 2.500,-/jr service & KPN 5G)'
    },
    'optie-3-vr-kar-20': {
      num: '3',
      shortLabel: 'Optie 3 · Turnkey VR-Kar 20',
      title: 'Optie 3 — Turnkey VR-Kar 20',
      bannerTitle: 'Optie 3 — Turnkey VR-Kar 20 (€ 25.000,- excl. BTW)',
      upfront: 25000,
      annual: 3500,
      firstYearIncluded: false,
      heroImg: 'assets/img/brand/pakket_zioxi_vr_kar_werkplaats.webp',
      heroCaption: 'Optie 3 (€ 25.000,-): Zioxi VR-Kar 20 met 20× Quest 3S (4×5 klasraster), KPN Onbeperkt 5G en 13,1" regietablet',
      unitSingle: '1 Turnkey VR-Kar 20 (20× Meta Quest 3S)',
      unitPlural: 'Turnkey VR-Karren 20',
      hwSub: 'Zioxi Cart 20 (1× 230V) + 20× Quest 3S (ArborXR) + Nighthawk M7 Pro & KPN 5G + 13,1" Tab S10 FE+',
      srvSub: 'ArborXR + Knox + KPN Onbeperkt 5G + 1×/jr fysieke inspectie van kar en 20 brillen op locatie',
      ruleHint: 'Maximale klascapaciteit inclusief KPN Onbeperkt 5G en jaarlijkse fysieke locatiecheck (€ 3.500,-/jr excl. BTW).',
      formValue: 'Optie 3: Turnkey VR-Kar 20 (€ 25.000,- excl. BTW + € 3.500,-/jr service & KPN 5G)'
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

  function calcTotalForPkg(pkg, sets, years) {
    const upfront = sets * pkg.upfront;
    const billedYears = pkg.firstYearIncluded ? Math.max(0, years - 1) : years;
    const srv = billedYears * sets * pkg.annual;
    return { upfront: upfront, billedYears: billedYears, srv: srv, total: upfront + srv };
  }

  function formatEuro(amount) {
    return '€ ' + amount.toLocaleString('nl-NL') + ',-';
  }

  const calcRoot = document.getElementById('pakketCalculator');
  if (calcRoot) {
    const selPkg = document.getElementById('calcPackageOption');
    const pkgSegBtns = calcRoot.querySelectorAll('[data-calc-pkg]');
    const inpSets = document.getElementById('calcTabletSets');
    const inpYears = document.getElementById('calcYears');
    const chkCustom = document.getElementById('calcIncludeCustom');

    const elTitle = document.getElementById('calcSelectedTitle');
    const elHwSub = document.getElementById('calcHardwareSub');
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
        elSelectedBannerTitle.textContent = pkg.bannerTitle;
        elSelectedBanner.style.display = 'flex';
      }
    }

    function renderTcoBars(activeKey, sets, years) {
      if (!elComparisonBars) return;
      const keys = ['optie-1-eigen-brillen', 'optie-2-vr-kar-10', 'optie-3-vr-kar-20'];
      const totals = keys.map(function (k) {
        return calcTotalForPkg(PACKAGES[k], sets, years).total;
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
        '<span class="tco-bars-title">Meerjarenvergelijking over ' + years + ' jaar (klik om te wisselen)</span>' +
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
      const sets = parseInt(inpSets.value, 10) || 1;
      const years = parseInt(inpYears.value, 10) || 3;
      const wantsCustom = chkCustom && chkCustom.checked;

      const res = calcTotalForPkg(pkg, sets, years);
      const annualRate = sets * pkg.annual;

      pkgSegBtns.forEach(function (b) {
        const active = b.getAttribute('data-calc-pkg') === pkgKey;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      if (elTitle) elTitle.textContent = pkg.title;
      if (elHwSub) elHwSub.textContent = pkg.hwSub;
      if (elSrvSub) elSrvSub.textContent = pkg.srvSub;
      if (elRuleHint) elRuleHint.textContent = pkg.ruleHint;
      if (elSetsOut) {
        elSetsOut.textContent = sets === 1 ? pkg.unitSingle : (sets + ' ' + pkg.unitPlural);
      }
      if (elYearsOut) elYearsOut.textContent = years + (years === 1 ? ' jaar' : ' jaar looptijd');
      if (elYear1Out) elYear1Out.textContent = formatEuro(res.upfront);
      if (elServiceAnnual) {
        elServiceAnnual.textContent = formatEuro(annualRate) + '/jr' + (pkg.firstYearIncluded ? ' (va. jr 2)' : '');
      }
      if (elFollowYears) {
        if (pkg.firstYearIncluded && res.billedYears === 0) {
          elFollowYears.textContent = '€ 0,- (1e jaar inbegrepen)';
        } else if (pkg.firstYearIncluded) {
          elFollowYears.textContent = formatEuro(res.srv) + ' (' + res.billedYears + ' vervolgjr × ' + formatEuro(annualRate) + ')';
        } else {
          elFollowYears.textContent = formatEuro(res.srv) + ' (' + res.billedYears + ' jr × ' + formatEuro(annualRate) + ')';
        }
      }
      if (elGrandTotal) {
        elGrandTotal.textContent = formatEuro(res.total) + (wantsCustom ? ' + maatwerk' : '');
      }
      if (elCustomNote) {
        elCustomNote.style.display = wantsCustom ? 'block' : 'none';
      }

      renderTcoBars(pkgKey, sets, years);
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

    [selPkg, inpSets, inpYears, chkCustom].forEach(function (el) {
      if (el) {
        el.addEventListener('input', function () {
          if (el === selPkg) syncVisualSelection(selPkg.value, true);
          updateCalc();
        });
        el.addEventListener('change', function () {
          if (el === selPkg) syncVisualSelection(selPkg.value, true);
          updateCalc();
        });
      }
    });

    if (btnCalcToQuote) {
      btnCalcToQuote.addEventListener('click', function () {
        const key = (selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10';
        syncVisualSelection(key, true);
      });
    }

    if (btnPrintCalc) {
      btnPrintCalc.addEventListener('click', function () {
        window.print();
      });
    }

    /* Check URL-parameters (?optie=1|2|3 of ?pakket=optie1|optie2|optie3) */
    const urlParams = new URLSearchParams(window.location.search);
    const optieParam = urlParams.get('optie') || urlParams.get('pakket');
    const initialPkgKey = optieParam && OPTIE_NUM_TO_KEY[optieParam] ? OPTIE_NUM_TO_KEY[optieParam] : null;

    if (initialPkgKey) {
      if (selPkg) selPkg.value = initialPkgKey;
      syncVisualSelection(initialPkgKey, true);
      updateCalc();
      if (!window.location.hash) {
        const targetSec = document.getElementById('pakket-keuze') || calcRoot;
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
    const selType = document.getElementById('reqType');
    const txtMessage = document.getElementById('reqMessage');

    if (optieOrPakket && OPTIE_NUM_TO_KEY[optieOrPakket] && selType) {
      selType.value = PACKAGES[OPTIE_NUM_TO_KEY[optieOrPakket]].formValue;
    } else if (onderwerpParam === 'maatwerk' && selType) {
      selType.value = 'Maatwerk VR-training ontwikkelen + Pakketkeuze';
    } else if (onderwerpParam === 'demo' && selType) {
      selType.value = 'Praktijkdemonstratie op school of bedrijf (13,1" Tablet + Quest 3S)';
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
      const msg = document.getElementById('reqMessage').value.trim();

      if (!naam || !org || !email) {
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.className = 'ac24-notice status-danger';
          feedbackBox.textContent = 'Vul uw naam, school of organisatie en zakelijk e-mailadres in.';
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
        'Voorkeur     : ' + type + '\n\n' +
        'Toelichting:\n' + (msg || '(Geen aanvullende opmerkingen)');

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.className = 'ac24-notice';
        feedbackBox.innerHTML =
          '<strong>Aanvraag gereedgezet voor ' + org.replace(/</g, '&lt;') + '.</strong><br>' +
          'Verstuur uw aanvraag nu met één klik via uw e-mailprogramma naar <a href="mailto:info@techbuildsvr.nl?subject=' +
          encodeURIComponent('Aanvraag TechBuilds VR — ' + org) + '&body=' + encodeURIComponent(lastRequestContent) + '"><strong>info@techbuildsvr.nl</strong></a> of download hieronder een kopie voor uw eigen administratie.';
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
