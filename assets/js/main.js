/**
 * TechBuilds VR — Interactieve Website Logica (v1.1)
 * Bevat:
 * 1. Mobiele navigatie & toegankelijkheid
 * 2. M1–M6 VR-Module Verkenner (WEILER Praktikant 140 · Quest APK v2.2.0 · 3D Buddy Check)
 * 3. Live 13,1-inch Regie-Tablet & Android Docenten Dashboard (v2.3.0) Simulator (VR-Kar 10, VR-Kar 20 & Onbeperkt)
 * 4. Maatwerk VR-Casus Scoper (Op Maat Trainingen)
 * 5. Pakket- & Meerjarencalculator (Optie 1 € 10.000, VR-Kar 10 € 15.000, VR-Kar 20 € 25.000 excl. BTW) + Offerteformulier
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
   * 1. Mobiele Navigatie
   * ------------------------------------------------------------------ */
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', function () {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.classList.toggle('is-open', !expanded);
    });
  }

  /* ------------------------------------------------------------------
   * 2. M1–M6 VR-Module Verkenner (WEILER Praktikant 140)
   * ------------------------------------------------------------------ */
  const MODULES_DATA = {
    M1: {
      code: 'MODULE M1 · STANDPLAATS A',
      title: 'Risico’s herkennen & 3D Buddy Check (PBM)',
      summary: 'Vóór de draaibank wordt aangeraakt, keurt de student oog in oog een levensgrote 3D-klasgenoot én de eigen uitrusting met alleen de twee wijsvingertriggers.',
      image: 'assets/img/weiler/weiler_00b_buddy_check_compleet.webp',
      altImage: 'assets/img/weiler/weiler_00a_buddy_check_start.webp',
      caption: 'In-engine Godot 4.5 opname: 3D Buddy Check voltooid — haar onder pet, sieraden & werkhandschoenen in vakken, veiligheidsbril op.',
      altCaption: 'Beginsituatie Module M1: herken los haar, open overall, sieraden, sneakers en verboden werkhandschoenen aan je eigen handen.',
      hasToggle: true,
      specs: 'Vaste standplaats · 5 Buddy-varianten · 0% loopmisselijkheid',
      checks: [
        'Geen werkhandschoenen bij draaiende delen (harde veiligheidsgate op intrekkingsgevaar)',
        'Sieraden, horloge en losse sjaal fysiek opbergen in de gemarkeerde tafelvakken',
        'Nauwsluitende werkkleding, vastgezet haar, S3-schoenen en eigen veiligheidsbril opzetten'
      ]
    },
    M2: {
      code: 'MODULE M2 · STANDPLAATS B',
      title: 'Machine en werkplek controleren vóór start',
      summary: 'Vanaf één comfortabele plek vóór de WEILER Praktikant 140 inspecteert de student de machine, de vloer/loopruimte en de energietoestand voordat er spanning op komt.',
      image: 'assets/img/weiler/weiler_02_vr_werkplaats_overzicht.webp',
      caption: 'Eerste-persoons operatorzicht op Standplaats B met vrij zicht op vaste kop, beitelhouder, koelslang en 4-camera inspectiepaneel.',
      hasToggle: false,
      specs: '4-camera inspectiepaneel · Arbobesluit art. 7.5 & 7.7',
      checks: [
        'Vloerobstakels, olie/koelmiddelplassen en poetsdoeken herkennen en veilig laten opruimen',
        'Machinebed vrijmaken van los gereedschap; controle op onbeschadigde beschermkap',
        'Controle op uitgeschakelde automatische langsvoeding en vrijliggende sleden'
      ]
    },
    M3: {
      code: 'MODULE M3 · OPSPANNEN & INSTELLEN',
      title: 'Werkstuk opspannen & klauwplaatsleutel-discipline',
      summary: 'De student spant het stalen stafmateriaal zuiver in de drieklauw, controleert de uitsteeklengte op de rondloopmeetklok en slijt de belangrijkste werkplaatsregel in: sleutel direct terug in de houder.',
      image: 'assets/img/weiler/weiler_01_machine_3d_model.webp',
      caption: 'Nauwkeurig gereconstrueerde WEILER Praktikant 140 uit 82 geoptimaliseerde PBR 3D-modellen.',
      hasToggle: false,
      specs: 'Rondloopcontrole 0,02 mm · Harde blokkade op sleutel in klauwplaat',
      checks: [
        'Onderscheid tussen los gepositioneerd en correct geklemd werkstuk (geen onveilige uitsteek)',
        'Klauwplaatsleutel-tracking: starten met sleutel in de klauwplaat leidt direct tot rustige FREEZE + uitleg',
        'Keuze van juiste draaibeitel en docent-vrijgave (AC21) op afstand via de Regie-Tablet'
      ]
    },
    M4: {
      code: 'MODULE M4 · VEILIG STARTEN & VERSPANEN',
      title: 'Vlak- en trapdraaien op live 2D-werktekening',
      summary: 'Met gesloten klauwplaatkap en ingesteld toerental draait de student het kopvlak schoon en werkt gecontroleerd naar de gevraagde maattolerantie toe zonder beiteloverbelasting.',
      image: 'assets/img/weiler/weiler_03_vr_trapdraaien_werktekening.webp',
      caption: 'Module M4 in VR: gesloten klauwplaatkap, nonius-uitlezing en live 2D-werktekening (Ø 29,4 ±0,2 mm & trap Ø 28,0 × 24 mm).',
      hasToggle: false,
      specs: 'Hoofdmaat Ø 29,4 ±0,2 mm · Chatter- & thermisch snijmodel (°C)',
      checks: [
        'Opzettelijke start (Arbobesluit 7.14) pas na gesloten beschermkap en vrije gevarenzone',
        'Realistische feedback bij te grote aanzet: hoorbaar ratelen (chatter), aanloopkleur en beitelbreuk-stop',
        'Vroegtijdige klauwplaat-waarschuwing bij gebruik van automatische langsvoeding'
      ]
    },
    M5: {
      code: 'MODULE M5 · STOPPEN, METEN & AFRONDEN',
      title: 'Volledige stilstand, 3D-schuifmaat & schoon achterlaten',
      summary: 'Meten of spanen verwijderen bij een draaiende of uitlopende spindel wordt direct onderschept. Pas bij 0 RPM meet de student na met de 3D-schuifmaat en ruimt veilig op.',
      image: 'assets/img/weiler/weiler_04_vr_schuifmaat_nameten.webp',
      caption: 'Module M5: na volledige stilstand (0 RPM) klemt de 3D-schuifmaat op Ø 29,4 mm en voert de student zijn meetwaarde in.',
      hasToggle: false,
      specs: 'Nonius 0,1 mm nauwkeurig · Spanenhaak & kwast (geen blote hand)',
      checks: [
        'Wachten tot volledige spindelstilstand (0 RPM) vóór openen kap of hanteren meetgereedschap',
        'Spanen verwijderen met spanenhaak en kwast — nooit met blote hand of perslucht',
        'Machine spanningsveilig, schoon en vrij van ingespannen werkstuk achterlaten'
      ]
    },
    M6: {
      code: 'MODULE M6 · STORINGEN & NOODSITUATIES',
      title: 'Afwijkingen herkennen, noodstop & energie-isolatie',
      summary: 'De student leert kalm en trefzeker handelen bij onverwachte trillingen, werkstukslingering of een weigerende stopknop — zonder schrikeffecten, mét reactietijdmeting.',
      image: 'assets/img/weiler/weiler_05_vr_veiligheidsstop_m6.webp',
      caption: 'Module M6: zichtbare werkstukslingering (1,85 mm op meetklok), oranje waarschuwingsbaken en directe bediening van de noodstop.',
      hasToggle: false,
      specs: 'Reactietijd in ms · Normale stop vs. Noodstop vs. LOTO-isolatie',
      checks: [
        'Directe paddenstoel-noodstop bij acuut gevaar (bijv. slingering 1,85 mm of stopknop-weigering)',
        'Geen automatische herstart na ontgrendelen noodstop of terugkeer van spanning (Arbobesluit 7.14)',
        'Correct onderscheid tussen normale stop, noodstop en energie-isolatie + defectlabel plaatsen'
      ]
    }
  };

  const moduleTabs = document.querySelectorAll('[data-module-tab]');
  if (moduleTabs.length > 0) {
    let showingBeforeM1 = false;
    let activeModKey = 'M1';

    const elCode = document.getElementById('modViewCode');
    const elTitle = document.getElementById('modViewTitle');
    const elSummary = document.getElementById('modViewSummary');
    const elImg = document.getElementById('modViewImg');
    const elCaption = document.getElementById('modViewCaption');
    const elSpecs = document.getElementById('modViewSpecs');
    const elChecks = document.getElementById('modViewChecks');
    const btnToggleM1 = document.getElementById('btnToggleM1State');

    function renderModule(key) {
      const m = MODULES_DATA[key];
      if (!m) return;
      activeModKey = key;
      showingBeforeM1 = false;

      moduleTabs.forEach(function (btn) {
        btn.setAttribute('aria-selected', String(btn.getAttribute('data-module-tab') === key));
      });

      if (elCode) elCode.textContent = m.code;
      if (elTitle) elTitle.textContent = m.title;
      if (elSummary) elSummary.textContent = m.summary;
      if (elImg) {
        elImg.src = m.image;
        elImg.alt = m.title;
      }
      if (elCaption) elCaption.textContent = m.caption;
      if (elSpecs) elSpecs.textContent = m.specs;
      if (elChecks) {
        elChecks.innerHTML = m.checks.map(function (c) {
          return '<li>' + c + '</li>';
        }).join('');
      }
      if (btnToggleM1) {
        btnToggleM1.style.display = m.hasToggle ? 'inline-flex' : 'none';
        btnToggleM1.textContent = 'Wissel beeld: Beginsituatie vs. Veilig gekeurd';
      }
    }

    moduleTabs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        renderModule(btn.getAttribute('data-module-tab'));
      });
    });

    if (btnToggleM1) {
      btnToggleM1.addEventListener('click', function () {
        const m = MODULES_DATA[activeModKey];
        if (!m || !m.hasToggle) return;
        showingBeforeM1 = !showingBeforeM1;
        elImg.src = showingBeforeM1 ? m.altImage : m.image;
        elCaption.textContent = showingBeforeM1 ? m.altCaption : m.caption;
      });
    }

    renderModule('M1');
  }

  /* ------------------------------------------------------------------
   * 3. Interactieve 13,1" Regie-Tablet & Android Docenten Dashboard (v2.3.0)
   *    Profielen: VR-Kar 10 (2×5), VR-Kar 20 (4×5) & Eigen Brillen (Onbeperkt)
   * ------------------------------------------------------------------ */
  const cockpitRoot = document.getElementById('docentCockpitSim');
  if (cockpitRoot) {
    const initialSlots = parseInt(cockpitRoot.getAttribute('data-slots') || '5', 10);
    const BASE_HEADSETS = [
      {
        id: 'QUEST-01', student: 'Daan Bakker', klas: 'MBO-2 Verspanen', mod: 'M4 · Trapdraaien',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 710, diaMain: 29.4, diaStep: 28.0,
        temp: 74, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 640, battery: 88,
        note: 'Kopvlak gevlakt · Hoofdmaat Ø 29,4 mm binnen tolerantie (±0,2 mm)',
        bookmarks: [
          { frame: 8, label: 'M3 Opstelling vrijgegeven (AC21)', warn: false },
          { frame: 22, label: 'Kopvlak vlakdraaien voltooid', warn: false },
          { frame: 35, label: 'Maat Ø 29,4 mm bereikt', warn: false }
        ]
      },
      {
        id: 'QUEST-02', student: 'Sara Yilmaz', klas: 'MBO-2 Verspanen', mod: 'M3 · Opspannen',
        status: 'FREEZE', statusClass: 'status-danger', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        temp: 24, guardClosed: false, chuckKeyIn: true, runout: 0.03, reactionMs: 710, battery: 92,
        note: 'BLOKKADE: Startpoging met klauwplaatsleutel nog in drieklauw — rustige uitleg getoond.',
        bookmarks: [
          { frame: 14, label: 'Werkstuk Ø 30 mm ingeklemd', warn: false },
          { frame: 28, label: '⚠ FREEZE: Sleutel nog in klauwplaat!', warn: true }
        ]
      },
      {
        id: 'QUEST-03', student: 'Lucas van Dijk', klas: 'VMBO-PIE Klas 4', mod: 'M4 · Langsdraaien',
        status: 'LET OP', statusClass: 'status-warn', rpm: 1000, diaMain: 29.6, diaStep: 28.4,
        temp: 234, guardClosed: true, chuckKeyIn: false, runout: 0.04, reactionMs: 690, battery: 76,
        note: 'WAARSCHUWING: Radiale aanzet 1,45 mm bij 1000 RPM → chatter & aanloopkleur (234 °C).',
        bookmarks: [
          { frame: 12, label: 'Start spindel 1000 RPM (kap dicht)', warn: false },
          { frame: 31, label: '⚠ Chatter & snijtemp 234 °C', warn: true }
        ]
      },
      {
        id: 'QUEST-04', student: 'Noor Jansen', klas: 'MBO-3 Allround', mod: 'M6 · Noodsituatie',
        status: 'VEILIG GESTOPT', statusClass: 'status-info', rpm: 0, diaMain: 29.4, diaStep: 28.0,
        temp: 52, guardClosed: true, chuckKeyIn: false, runout: 1.85, reactionMs: 580, battery: 84,
        note: 'M6 Geslaagd: Noodstop ingedrukt binnen 580 ms bij werkstukslingering (1,85 mm).',
        bookmarks: [
          { frame: 19, label: 'Storingsinjectie: Slingering 1,85 mm', warn: true },
          { frame: 25, label: '✓ Noodstop bediend (580 ms)', warn: false }
        ]
      },
      {
        id: 'QUEST-05', student: 'Sem de Vries', klas: 'MBO-2 Verspanen', mod: 'M1 · 3D Buddy Check',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        temp: 21, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 660, battery: 95,
        note: 'Standplaats A: 3D-Buddy gecontroleerd & eigen werkhandschoenen afgelegd.',
        bookmarks: [
          { frame: 16, label: '3D Buddy Check & Eigen PBM gekeurd ✓', warn: false }
        ]
      },
      {
        id: 'QUEST-06', student: 'Mila Koster', klas: 'MBO-2 Verspanen', mod: 'M5 · Nameten',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 29.3, diaStep: 28.0,
        temp: 41, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionMs: 615, battery: 81,
        note: 'Spindel op 0 RPM · 3D-schuifmaat geklemd op Ø 29,3 mm (binnen ±0,2 mm).',
        bookmarks: [
          { frame: 20, label: 'Volledige stilstand 0 RPM afgewacht', warn: false },
          { frame: 33, label: '3D-Schuifmaat meting: 29,3 mm ✓', warn: false }
        ]
      },
      {
        id: 'QUEST-07', student: 'Bram Peters', klas: 'MBO-3 Allround', mod: 'M2 · Inspectie',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 30.0, diaStep: 30.0,
        temp: 22, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 705, battery: 79,
        note: '4-camera inspectiepaneel: koelmiddelplas vloer gemeld & machinebed vrijgemaakt.',
        bookmarks: [
          { frame: 18, label: 'Vloerobstakel & koelmiddel gemeld', warn: false }
        ]
      },
      {
        id: 'QUEST-08', student: 'Aya El Amrani', klas: 'MBO-2 Verspanen', mod: 'M4 · Examen EX-4821',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 710, diaMain: 29.5, diaStep: 28.1,
        temp: 68, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 595, battery: 90,
        note: 'Individueel praktijkexamen (Real Deal zonder hints) — stabiele langsvoeding.',
        bookmarks: [
          { frame: 10, label: 'Prestart 100% zelfstandig behaald', warn: false },
          { frame: 30, label: 'Trap-as Ø 28,1 mm in bewerking', warn: false }
        ]
      },
      {
        id: 'QUEST-09', student: 'Finn Hendriks', klas: 'MBO-2 Verspanen', mod: 'M3 · Toerentabel',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 710, diaMain: 30.0, diaStep: 30.0,
        temp: 38, guardClosed: true, chuckKeyIn: false, runout: 0.02, reactionMs: 630, battery: 87,
        note: 'Snijsnelheid berekend · 710 RPM ingesteld bij stilstaande hoofdspil.',
        bookmarks: [{ frame: 24, label: '710 RPM veilig geschakeld', warn: false }]
      },
      {
        id: 'QUEST-10', student: 'Zoë Vermeer', klas: 'MBO-3 Allround', mod: 'M5 · Schoonmaken',
        status: 'ACTIEF', statusClass: 'status-safe', rpm: 0, diaMain: 29.4, diaStep: 28.0,
        temp: 33, guardClosed: false, chuckKeyIn: false, runout: 0.02, reactionMs: 605, battery: 93,
        note: 'Hoofdschakelaar op 0 · Spanen verwijderd met spanenhaak en kwast (geen perslucht).',
        bookmarks: [{ frame: 30, label: 'Spanenhaak gebruikt ✓', warn: false }]
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
    let scrubFrame = 35;

    const slotsContainer = document.getElementById('cockpitSlotsGrid');
    const protocolLine = document.getElementById('cockpitProtocolLine');
    const canvas = document.getElementById('cockpitBlueprintCanvas');
    const elSelHeader = document.getElementById('cockpitSelHeader');
    const elSelNote = document.getElementById('cockpitSelNote');
    const elTelRpm = document.getElementById('telRpm');
    const elTelDia = document.getElementById('telDia');
    const elTelTemp = document.getElementById('telTemp');
    const elTelGate = document.getElementById('telGate');
    const elReplaySlider = document.getElementById('cockpitReplaySlider');
    const elReplayReadout = document.getElementById('cockpitReplayReadout');
    const elBookmarks = document.getElementById('cockpitBookmarks');
    const elActionToast = document.getElementById('cockpitActionToast');
    const btnGroupPause = document.getElementById('btnCockpitGroupPause');
    const btnGroupExam = document.getElementById('btnCockpitGroupExam');
    const btnOpenReport = document.getElementById('btnCockpitOpenReport');

    function showToast(msg) {
      if (!elActionToast) return;
      elActionToast.textContent = msg;
    }

    cockpitRoot.querySelectorAll('[data-cockpit-profile]').forEach(function (pBtn) {
      pBtn.addEventListener('click', function () {
        currentProfile = pBtn.getAttribute('data-cockpit-profile');
        cockpitRoot.querySelectorAll('[data-cockpit-profile]').forEach(function (b) {
          b.className = b === pBtn ? 'btn btn-primary btn-sm' : 'btn btn-dark-ghost btn-sm';
        });
        if (currentProfile === 'kar10') {
          activeCount = 10;
          if (protocolLine) protocolLine.textContent = 'ANDROID DASHBOARD V2.3.0 · PROFIEL: VR-KAR 10 (2×5) · 192.168.1.101..110:8765';
        } else if (currentProfile === 'kar20') {
          activeCount = 20;
          if (protocolLine) protocolLine.textContent = 'ANDROID DASHBOARD V2.3.0 · PROFIEL: VR-KAR 20 (4×5) · 192.168.1.101..120:8765';
        } else {
          activeCount = 12;
          if (protocolLine) protocolLine.textContent = 'ANDROID DASHBOARD V2.3.0 · PROFIEL: EIGEN BRILLEN (ONBEPERKT · UDP :47800)';
        }
        HEADSETS = BASE_HEADSETS.slice(0, activeCount);
        if (selectedIdx >= HEADSETS.length) selectedIdx = 0;
        updateCockpit();
        showToast('Dashboardprofiel gewisseld naar ' + (currentProfile === 'kar10' ? 'VR-Kar 10 (2×5)' : currentProfile === 'kar20' ? 'VR-Kar 20 (4×5)' : 'Eigen Brillen (Onbeperkt)') + ' — live videostream alleen op geselecteerde bril.');
      });
    });

    function renderSlots() {
      if (!slotsContainer) return;
      let html = HEADSETS.map(function (h, idx) {
        const badgeText = groupPaused ? 'GROEPSPAUZE' : h.status;
        const badgeCls = groupPaused ? 'status-warn' : h.statusClass;
        return (
          '<button type="button" class="quest-slot ' + (idx === selectedIdx ? 'is-selected' : '') + '" data-slot-idx="' + idx + '">' +
            '<div class="quest-slot-top">' +
              '<span class="mono" style="font-size:0.74rem;font-weight:600;color:#38BDF8;">' + h.id + ' · ' + h.battery + '%</span>' +
              '<span class="status-badge ' + badgeCls + '">' + badgeText + '</span>' +
            '</div>' +
            '<span class="quest-slot-name">' + h.student + '</span>' +
            '<span class="quest-slot-meta">' + h.mod + '</span>' +
          '</button>'
        );
      }).join('');

      if (currentProfile === 'unlimited' && activeCount < BASE_HEADSETS.length) {
        html +=
          '<button type="button" class="quest-slot" id="btnAddUnlimitedHeadset" style="border-style:dashed;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">' +
            '<span class="mono" style="font-size:0.78rem;color:#38BDF8;font-weight:600;">+ KOPPEL EIGEN BRIL</span>' +
            '<span class="quest-slot-meta">UDP :47800 (Onbeperkt)</span>' +
          '</button>';
      }

      slotsContainer.innerHTML = html;

      slotsContainer.querySelectorAll('[data-slot-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          selectedIdx = parseInt(btn.getAttribute('data-slot-idx'), 10);
          scrubFrame = 35;
          if (elReplaySlider) elReplaySlider.value = '35';
          updateCockpit();
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
            showToast(HEADSETS[selectedIdx].id + ' automatisch ontdekt via UDP :47800 (Onbeperkt eigen brillen).');
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
      ctx.fillStyle = '#081322';
      ctx.fillRect(0, 0, w, ht);

      /* Subtiele technische hartlijn (centerline) */
      const cy = Math.round(ht * 0.52);
      ctx.strokeStyle = '#1E3A5F';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 5, 2, 5]);
      ctx.beginPath();
      ctx.moveTo(24, cy);
      ctx.lineTo(w - 24, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      /* Drieklauwplaat links */
      ctx.fillStyle = '#1E293B';
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 1.5;
      ctx.fillRect(36, cy - 64, 58, 128);
      ctx.strokeRect(36, cy - 64, 58, 128);

      /* Klauwplaatbekken */
      ctx.fillStyle = '#334155';
      ctx.fillRect(82, cy - 52, 22, 20);
      ctx.fillRect(82, cy + 32, 22, 20);

      /* Beschermkap status */
      ctx.strokeStyle = h.guardClosed ? '#22C55E' : '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (h.guardClosed) {
        ctx.rect(30, cy - 74, 78, 148);
      } else {
        ctx.moveTo(30, cy - 74);
        ctx.lineTo(95, cy - 102);
      }
      ctx.stroke();

      /* Klauwplaatsleutel alarm indien aanwezig */
      if (h.chuckKeyIn) {
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(56, cy - 96, 16, 42);
        ctx.fillStyle = '#FCA5A5';
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.fillText('⚠ SLEUTEL IN KLAUWPLAAT!', 122, 28);
      }

      /* Werkstuk (Hoofddiameter + Trap-as rechts) */
      const wobbleOffset = h.runout > 0.5 ? 6 : 0;
      const mainHalfH = Math.round((h.diaMain / 30.0) * 34);
      const stepProgress = Math.min(1, Math.max(0.15, frameRatio));
      const stepHalfH = Math.round((h.diaStep / 30.0) * 34);

      /* Kleur werkstuk: staalblauw/amber bij oververhitting */
      const steelColor = h.temp > 180 ? '#D97706' : '#94A3B8';
      ctx.fillStyle = steelColor;
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1.2;

      /* Hoofddeel werkstuk */
      ctx.fillRect(104, cy - mainHalfH + wobbleOffset, 210, mainHalfH * 2);
      ctx.strokeRect(104, cy - mainHalfH + wobbleOffset, 210, mainHalfH * 2);

      /* Getrapt deel rechts */
      const stepLen = Math.round(125 * stepProgress);
      ctx.fillStyle = h.temp > 180 ? '#F59E0B' : '#CBD5E1';
      ctx.fillRect(314, cy - stepHalfH - wobbleOffset, stepLen, stepHalfH * 2);
      ctx.strokeRect(314, cy - stepHalfH - wobbleOffset, stepLen, stepHalfH * 2);

      /* Draaibeitel positie o.b.v. replay-slider */
      const toolX = 435 - Math.round(frameRatio * 105);
      const toolY = cy + stepHalfH + 4;
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.moveTo(toolX, toolY);
      ctx.lineTo(toolX + 18, toolY + 28);
      ctx.lineTo(toolX - 8, toolY + 28);
      ctx.closePath();
      ctx.fill();

      /* Maatlijnen in Precision Sky */
      ctx.fillStyle = '#38BDF8';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText('HOOFDMAAT Ø ' + h.diaMain.toFixed(1).replace('.', ',') + ' ±0,2 mm', 112, cy - 48);
      ctx.fillText('TRAP Ø ' + h.diaStep.toFixed(1).replace('.', ',') + ' × 24 mm', 314, cy - 48);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '400 11px "JetBrains Mono", monospace';
      ctx.fillText(
        (h.guardClosed ? 'KAP: GESLOTEN ✓' : 'KAP: OPEN') +
        '   |   RONDLOOP: ' + h.runout.toFixed(2).replace('.', ',') + ' mm' +
        '   |   M6 REACTIE: ' + h.reactionMs + ' ms',
        34,
        ht - 14
      );
    }

    function updateCockpit() {
      const h = HEADSETS[selectedIdx];
      const ratio = scrubFrame / 35;
      renderSlots();

      if (elSelHeader) {
        elSelHeader.textContent = h.id + ' — ' + h.student + ' (' + h.klas + ') · ' + h.mod;
      }
      if (elSelNote) {
        elSelNote.textContent = groupPaused
          ? '⏸ GROEPS-NOODPAUZE ACTIEF: Alle verbonden Meta Quest-brillen staan direct stil voor klassikale toelichting.'
          : h.note;
      }
      const liveRpm = groupPaused ? 0 : Math.round(h.rpm * (scrubFrame < 35 ? 0.85 : 1));
      if (elTelRpm) elTelRpm.textContent = liveRpm + ' RPM';
      if (elTelDia) elTelDia.textContent = 'Ø ' + h.diaMain.toFixed(1).replace('.', ',') + ' mm';
      if (elTelTemp) elTelTemp.textContent = h.temp + ' °C';
      if (elTelGate) {
        elTelGate.textContent = h.chuckKeyIn ? 'SLEUTEL BLOKKADE' : (h.guardClosed ? 'KAP DICHT ✓' : 'KAP OPEN');
      }
      if (elReplayReadout) {
        elReplayReadout.textContent = scrubFrame >= 35
          ? '● LIVE TELEMETRIE (4 Hz)'
          : '⏪ BLACK-BOX REPLAY · t = -' + ((35 - scrubFrame) * 0.5).toFixed(1).replace('.', ',') + ' s';
      }
      if (elBookmarks) {
        elBookmarks.innerHTML = h.bookmarks.map(function (b) {
          return (
            '<button type="button" class="cmd-btn" data-bm-frame="' + b.frame + '" style="width:auto;padding:0.35rem 0.65rem;">' +
              (b.warn ? '⚠ ' : '● ') + b.label +
            '</button>'
          );
        }).join('');
        elBookmarks.querySelectorAll('[data-bm-frame]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            scrubFrame = parseInt(btn.getAttribute('data-bm-frame'), 10);
            if (elReplaySlider) elReplaySlider.value = String(scrubFrame);
            updateCockpit();
            showToast('Black-Box teruggespoeld naar gemarkeerd moment op ' + h.id + '.');
          });
        });
      }

      drawBlueprint(h, ratio);

      /* Update A4 Rapport Modal gegevens indien aanwezig */
      const repStudent = document.getElementById('repModalStudent');
      const repKlas = document.getElementById('repModalKlas');
      const repReaction = document.getElementById('repModalReaction');
      if (repStudent) repStudent.textContent = h.student + ' (' + h.id + ')';
      if (repKlas) repKlas.textContent = h.klas;
      if (repReaction) repReaction.textContent = h.reactionMs + ' ms (Module M6)';
    }

    if (elReplaySlider) {
      elReplaySlider.addEventListener('input', function () {
        scrubFrame = parseInt(elReplaySlider.value, 10);
        updateCockpit();
      });
    }

    if (btnGroupPause) {
      btnGroupPause.addEventListener('click', function () {
        groupPaused = !groupPaused;
        btnGroupPause.textContent = groupPaused ? '▶ Hervat Alle Brillen' : '⏸ Groeps-Noodpauze';
        updateCockpit();
        showToast(groupPaused
          ? 'Groeps-Noodpauze geactiveerd: alle brillen in het lokaal zijn gepauzeerd.'
          : 'Klaslokaalsessie hervat op alle verbonden headsets.');
      });
    }

    if (btnGroupExam) {
      btnGroupExam.addEventListener('click', function () {
        const code = 'EX-' + Math.floor(1000 + Math.random() * 9000);
        showToast('Groepsexamen ' + code + ' klaargezet op alle gekoppelde Meta Quest-brillen (incl. trapdraaien).');
      });
    }

    cockpitRoot.querySelectorAll('[data-teacher-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cmd = btn.getAttribute('data-teacher-cmd');
        const h = HEADSETS[selectedIdx];
        const messages = {
          AC21: 'AC21 Docent-vrijgave verzonden naar ' + h.id + ' (' + h.student + ') — zonder aftrek op zelfstandigheidsscore.',
          WOBBLE: 'M6 Storingsinjectie geactiveerd op ' + h.id + ': werkstukslingering 1,85 mm + reactietijdmeting gestart.',
          LOTO: 'Energie-isolatie ( hoofdschakelaar / LOTO ) bevestigd voor ' + h.id + '.',
          NEXT: 'SAVE_AND_NEXT_STUDENT verzonden naar ' + h.id + ': sessie opgeslagen en M1 3D Buddy Check klaar voor volgende student.',
          TTS: 'Spraakbericht (NL TTS) uitgesproken in headset ' + h.id + ': "Controleer eerst je beschermkap en nonius."'
        };
        showToast(messages[cmd] || ('Commando verzonden naar ' + h.id));
      });
    });

    /* A4 Rapport Modal */
    const reportModal = document.getElementById('a4ReportModal');
    const btnCloseReport = document.getElementById('btnCloseReportModal');
    const btnPrintReport = document.getElementById('btnPrintA4Report');
    if (btnOpenReport && reportModal) {
      btnOpenReport.addEventListener('click', function () {
        reportModal.classList.add('is-open');
      });
    }
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
        window.print();
      });
    }

    updateCockpit();
  }

  /* ------------------------------------------------------------------
   * 4. Maatwerk VR-Training Scoper (maatwerk.html)
   * ------------------------------------------------------------------ */
  const scoperForm = document.getElementById('maatwerkScoperForm');
  if (scoperForm) {
    const outSummary = document.getElementById('scoperOutputBox');
    const btnDownloadScope = document.getElementById('btnDownloadMaatwerkScope');
    const btnSendToQuote = document.getElementById('btnScopeToQuote');

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
        : 'Veiligheidscontrole (PBM), opstartprocedure en veilig stoppen';

      return {
        domein: domein,
        machine: machine,
        doelgroep: doelgroep,
        pakketStatus: pakketStatus,
        goalsList: goalsList,
        fullText:
          'TECHBUILDS VR — PROJECTSCHETS MAATWERK VR-TRAINING\n' +
          '====================================================\n' +
          'Technisch domein : ' + domein + '\n' +
          'Doelmachine/case : ' + machine + '\n' +
          'Doelgroep        : ' + doelgroep + '\n' +
          'Leerdoelen in VR : ' + goalsList + '\n' +
          'Platform & Regie : ' + pakketStatus + '\n' +
          'Bedieningsnorm   : Twee-Triggers (links/rechts pariteit, vaste standplaats)\n' +
          'Docentkoppeling  : Android Docenten Dashboard v2.3.0 (VR-Kar 10, VR-Kar 20 of Onbeperkt), Black-Box & A4 PDF\n' +
          'Doorlooptijd     : Indicatie 6 – 10 weken van werkplaatsopname tot praktijkoplevering'
      };
    }

    function refreshScoper() {
      const data = buildScopeText();
      if (outSummary) {
        outSummary.textContent = data.fullText;
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
        } catch (_) { /* ignore storage restrictions */ }
        window.location.href = 'prijzen-contact.html?onderwerp=maatwerk#aanvraag';
      });
    }

    refreshScoper();
  }

  /* ------------------------------------------------------------------
   * 5. Pakket- & Meerjaren-Investeringscalculator (3 Commerciële Pakketten)
   *    - Optie 1: € 10.000 aanschaf (1e jaar service incl.), daarna € 1.500/jr excl. BTW
   *    - Optie 2: € 15.000 aanschaf + € 2.500/jr service & 5G excl. BTW (10× Quest 3S + Zioxi Cart 10)
   *    - Optie 3: € 25.000 aanschaf + € 3.500/jr service & 5G excl. BTW (20× Quest 3S + Zioxi Cart 20)
   * ------------------------------------------------------------------ */
  const PACKAGES = {
    'optie-1-eigen-brillen': {
      title: 'Optie 1 — Regietablet & Onbeperkt Eigen Brillen',
      upfront: 10000,
      annual: 1500,
      firstYearIncluded: true,
      unitSingle: '1 regietablet-pakket (onbeperkt eigen brillen)',
      unitPlural: 'regietablet-pakketten (onbeperkt eigen brillen)',
      hwSub: '13" Samsung Galaxy Tab S10 FE+ (IP68, handstrap-case) met Knox MDM + onbeperkt eigen brillen (excl. ArborXR)',
      srvSub: 'Remote support, Knox MDM & updates op afstand (1e jaar inbegrepen, geen fysieke check)',
      ruleHint: 'Bij Optie 1 is het 1e jaar tablet-service inbegrepen; vanaf jaar 2 geldt € 1.500,- / jaar excl. BTW.',
      formValue: 'Optie 1: Regietablet & Eigen Brillen (€ 10.000,- excl. BTW, 1e jr service incl., daarna € 1.500,-/jr)'
    },
    'optie-2-vr-kar-10': {
      title: 'Optie 2 — Turnkey VR-Kar 10 (Alles-in-één)',
      upfront: 15000,
      annual: 2500,
      firstYearIncluded: false,
      unitSingle: '1 Turnkey VR-Kar 10 (10× Meta Quest 3S + ArborXR)',
      unitPlural: 'Turnkey VR-Karren 10',
      hwSub: 'Zioxi Cart 10 + 10× Quest 3S (ArborXR) + Nighthawk Wi-Fi 7 & KPN 5G + 13" Knox Tablet',
      srvSub: 'Remote beheer (ArborXR + Knox + 5G) & 1× per jaar fysieke onderhoudscheck op locatie',
      ruleHint: 'Volledige ontzorging op brillen (ArborXR), KPN Onbeperkt 5G, tablet en kar incl. jaarlijkse fysieke check op locatie.',
      formValue: 'Optie 2: Turnkey VR-Kar 10 (€ 15.000,- excl. BTW + € 2.500,-/jr service & KPN 5G)'
    },
    'optie-3-vr-kar-20': {
      title: 'Optie 3 — Turnkey VR-Kar 20 (Maximale klascapaciteit)',
      upfront: 25000,
      annual: 3500,
      firstYearIncluded: false,
      unitSingle: '1 Turnkey VR-Kar 20 (20× Meta Quest 3S + ArborXR)',
      unitPlural: 'Turnkey VR-Karren 20',
      hwSub: 'Zioxi Cart 20 + 20× Quest 3S (ArborXR) + Nighthawk Wi-Fi 7 & KPN 5G + 13" Knox Tablet',
      srvSub: 'Remote beheer (ArborXR + Knox + 5G) & 1× per jaar fysieke check van kar en 20 brillen op locatie',
      ruleHint: 'Volledige ontzorging voor een hele klas van 20 leerlingen (ArborXR + Knox + KPN 5G) incl. jaarlijkse locatiecheck.',
      formValue: 'Optie 3: Turnkey VR-Kar 20 (€ 25.000,- excl. BTW + € 3.500,-/jr service & KPN 5G)'
    }
  };

  const calcRoot = document.getElementById('pakketCalculator');
  if (calcRoot) {
    const selPkg = document.getElementById('calcPackageOption');
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
    const btnPrintCalc = document.getElementById('btnPrintBudget');
    const btnCalcToQuote = document.getElementById('btnCalcToQuote');

    function formatEuro(amount) {
      return '€ ' + amount.toLocaleString('nl-NL') + ',-';
    }

    function updateCalc() {
      const pkgKey = (selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10';
      const pkg = PACKAGES[pkgKey];
      const sets = parseInt(inpSets.value, 10) || 1;
      const years = parseInt(inpYears.value, 10) || 3;
      const wantsCustom = chkCustom && chkCustom.checked;

      const upfrontTotal = sets * pkg.upfront;
      const annualRate = sets * pkg.annual;
      const billedServiceYears = pkg.firstYearIncluded ? Math.max(0, years - 1) : years;
      const serviceTotal = billedServiceYears * annualRate;
      const totalMultiYear = upfrontTotal + serviceTotal;

      if (elTitle) elTitle.textContent = pkg.title;
      if (elHwSub) elHwSub.textContent = pkg.hwSub;
      if (elSrvSub) elSrvSub.textContent = pkg.srvSub;
      if (elRuleHint) elRuleHint.textContent = pkg.ruleHint;

      if (elSetsOut) {
        elSetsOut.textContent = sets === 1 ? pkg.unitSingle : (sets + ' ' + pkg.unitPlural);
      }
      if (elYearsOut) elYearsOut.textContent = years + ' jaar looptijd';
      if (elYear1Out) elYear1Out.textContent = formatEuro(upfrontTotal);
      if (elServiceAnnual) {
        elServiceAnnual.textContent = formatEuro(annualRate) + ' / jaar' + (pkg.firstYearIncluded ? ' (jr 1 incl.)' : '');
      }
      if (elFollowYears) {
        if (pkg.firstYearIncluded && billedServiceYears === 0) {
          elFollowYears.textContent = '€ 0,- (1e jaar inbegrepen bij aanschaf)';
        } else if (pkg.firstYearIncluded) {
          elFollowYears.textContent = formatEuro(serviceTotal) + ' (' + billedServiceYears + ' vervolg' + (billedServiceYears === 1 ? 'jaar' : 'jaren') + ' × ' + formatEuro(annualRate) + ')';
        } else {
          elFollowYears.textContent = formatEuro(serviceTotal) + ' (' + billedServiceYears + ' jaar × ' + formatEuro(annualRate) + ')';
        }
      }
      if (elGrandTotal) {
        elGrandTotal.textContent = formatEuro(totalMultiYear) + (wantsCustom ? ' + maatwerkofferte' : '');
      }
      if (elCustomNote) {
        elCustomNote.style.display = wantsCustom ? 'block' : 'none';
      }
    }

    [selPkg, inpSets, inpYears, chkCustom].forEach(function (el) {
      if (el) {
        el.addEventListener('input', updateCalc);
        el.addEventListener('change', updateCalc);
      }
    });

    /* Klik op een pakketkaart selecteert direct die optie in calculator én formulier */
    document.querySelectorAll('[data-select-pkg]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-select-pkg');
        if (selPkg && PACKAGES[key]) {
          selPkg.value = key;
          updateCalc();
        }
        const reqSel = document.getElementById('reqType');
        if (reqSel && PACKAGES[key]) {
          reqSel.value = PACKAGES[key].formValue;
        }
      });
    });

    if (btnCalcToQuote) {
      btnCalcToQuote.addEventListener('click', function () {
        const key = (selPkg && PACKAGES[selPkg.value]) ? selPkg.value : 'optie-2-vr-kar-10';
        const reqSel = document.getElementById('reqType');
        if (reqSel && PACKAGES[key]) {
          reqSel.value = PACKAGES[key].formValue;
        }
      });
    }

    if (btnPrintCalc) {
      btnPrintCalc.addEventListener('click', function () {
        window.print();
      });
    }

    updateCalc();
  }

  /* ------------------------------------------------------------------
   * 6. Demo- & Offerteformulier (prijzen-contact.html)
   * ------------------------------------------------------------------ */
  const contactForm = document.getElementById('techbuildsContactForm');
  if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const onderwerpParam = params.get('onderwerp');
    const pakketParam = params.get('pakket');
    const selType = document.getElementById('reqType');
    const txtMessage = document.getElementById('reqMessage');

    if (pakketParam === 'optie1' && selType) {
      selType.value = PACKAGES['optie-1-eigen-brillen'].formValue;
    } else if (pakketParam === 'optie2' && selType) {
      selType.value = PACKAGES['optie-2-vr-kar-10'].formValue;
    } else if (pakketParam === 'optie3' && selType) {
      selType.value = PACKAGES['optie-3-vr-kar-20'].formValue;
    } else if (onderwerpParam === 'maatwerk' && selType) {
      selType.value = 'Maatwerk VR-training ontwikkelen + Pakketkeuze';
    } else if (onderwerpParam === 'demo' && selType) {
      selType.value = 'Praktijkdemonstratie op locatie (Tablet + VR-bril)';
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
          feedbackBox.className = 'panel status-danger';
          feedbackBox.textContent = 'Vul a.u.b. uw naam, school/organisatie en zakelijk e-mailadres in.';
        }
        return;
      }

      lastRequestContent =
        'AANVRAAG TECHBUILDS VR (EXCL. BTW)\n' +
        '==================================\n' +
        'Datum        : ' + new Date().toISOString().slice(0, 10) + '\n' +
        'Naam         : ' + naam + '\n' +
        'Organisatie  : ' + org + '\n' +
        'E-mail       : ' + email + '\n' +
        'Telefoon     : ' + (tel || '-') + '\n' +
        'Keuze pakket : ' + type + '\n\n' +
        'Toelichting / Maatwerkwens:\n' + (msg || '(Geen aanvullende opmerkingen)');

      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.className = 'ac24-box';
        feedbackBox.innerHTML =
          '<strong>Aanvraag gereedgezet voor ' + org.replace(/</g, '&lt;') + '.</strong><br>' +
          'Uw aanvraagoverzicht voor <em>' + type.replace(/</g, '&lt;') + '</em> is samengesteld. ' +
          'Download hieronder direct uw exemplaar voor uw administratie of verstuur het rechtstreeks via uw e-mailprogramma naar <a href="mailto:info@techbuildsvr.nl?subject=' +
          encodeURIComponent('Aanvraag TechBuilds VR — ' + org) + '&body=' + encodeURIComponent(lastRequestContent) + '"><strong>info@techbuildsvr.nl</strong></a>.';
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
