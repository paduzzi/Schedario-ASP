export const DEFAULT_TABS = [
  { id: 'home',     emoji: '🏠', label: 'Home',            color: '#888888' },
  { id: 'pasubio',  emoji: '🔴', label: 'Pasubio',         color: '#e74c3c' },
  { id: 'alveare',  emoji: '🩷', label: 'Alveare',         color: '#e91e8c' },
  { id: 'villa',    emoji: '🟣', label: 'Villa Ester',     color: '#9b59b6' },
  { id: 'estivi',   emoji: '🔵', label: 'Centri Estivi',   color: '#3498db' },
  { id: 'sorgente', emoji: '🟢', label: 'Sorgente',        color: '#27ae60' },
  { id: 'dir',      emoji: '🟡', label: 'Direzione',       color: '#f39c12' },
  { id: 'mezzi',    emoji: '🚗', label: 'Mezzi',           color: '#e67e22' },
  { id: 'housing',  emoji: '🏠', label: 'Housing Sociale', color: '#16a085' },
  { id: 'cassa',    emoji: '💶', label: 'Cassa',           color: '#2ecc71' },
  { id: 'conv',     emoji: '📄', label: 'Convenzioni',     color: '#95a5a6' },
];

export const DEFAULT_SECTION_DATA = {
  pasubio: {
    checklist: [
      { id: 'p1', text: 'Chiamare AUSL – rinnovo autorizzazione', done: false },
      { id: 'p2', text: 'Progetto OTAP Q3 – bozza', done: false },
      { id: 'p3', text: 'Aggiornare organico estivo', done: false },
      { id: 'p4', text: 'PAI Rossi Mario – stesura', done: false },
    ],
    scadenze: [
      { id: 'ps1', text: 'PAI Rossi Mario', date: '23/07', urgente: true },
      { id: 'ps2', text: 'Verifica INAIL', date: '30/07', urgente: false },
      { id: 'ps3', text: 'Progetto OTAP', date: '15/08', urgente: false },
    ],
    note: '',
    contatti: [
      { id: 'pc1', initials: 'DR', name: 'Dr.ssa Renzi', role: 'Responsabile AUSL', color: '#3498db' },
      { id: 'pc2', initials: 'MF', name: 'Marco Ferrari', role: 'Coordinatore OTAP', color: '#27ae60' },
    ],
  },
  alveare: {
    checklist: [
      { id: 'a1', text: 'Firmare turni luglio', done: false },
      { id: 'a2', text: 'Riunione équipe – convocare', done: false },
      { id: 'a3', text: 'Aggiornare PAI M.B.', done: false },
      { id: 'a4', text: 'Verifica spese mensili', done: false },
    ],
    scadenze: [
      { id: 'as1', text: 'Colloquio famiglia B.', date: '22/07', urgente: true },
      { id: 'as2', text: 'Supervisione équipe', date: '25/07', urgente: false },
    ],
    note: '',
    contatti: [
      { id: 'ac1', initials: 'GS', name: 'Giulia Sordi', role: 'Psicologa', color: '#9b59b6' },
      { id: 'ac2', initials: 'LP', name: 'Luca Parisi', role: 'Educatore ref.', color: '#e74c3c' },
    ],
  },
  villa: {
    checklist: [
      { id: 'v1', text: 'Sopralluogo struttura', done: false },
      { id: 'v2', text: 'Aggiornamento SISS', done: false },
      { id: 'v3', text: 'Contattare famiglie', done: false },
    ],
    scadenze: [
      { id: 'vs1', text: 'Verifica locali', date: '28/07', urgente: false },
    ],
    note: '',
    contatti: [
      { id: 'vc1', initials: 'AF', name: 'Anna Franchi', role: 'Coord. struttura', color: '#9b59b6' },
    ],
  },
  estivi: {
    checklist: [
      { id: 'e1', text: 'Modulo iscrizioni 2025 – completare', done: false },
      { id: 'e2', text: 'Autorizzazioni gite', done: false },
      { id: 'e3', text: 'Elenco educatori estivi', done: false },
      { id: 'e4', text: 'Acquisti materiali', done: false },
    ],
    scadenze: [
      { id: 'es1', text: 'Chiusura iscrizioni', date: '05/07', urgente: true },
      { id: 'es2', text: 'Inizio attività', date: '01/07', urgente: false },
    ],
    note: '',
    contatti: [
      { id: 'ec1', initials: 'MB', name: 'Marta Boni', role: 'Ref. estivi', color: '#3498db' },
    ],
  },
  sorgente: {
    checklist: [
      { id: 'so1', text: 'Colloqui famiglie – programmare', done: false },
      { id: 'so2', text: 'Report trimestrale', done: false },
      { id: 'so3', text: 'Aggiornamento documentazione', done: false },
    ],
    scadenze: [
      { id: 'ss1', text: 'Report Q2', date: '31/07', urgente: false },
    ],
    note: '',
    contatti: [
      { id: 'sc1', initials: 'EV', name: 'Elena Vitali', role: 'Home visitor', color: '#27ae60' },
    ],
  },
  dir: {
    checklist: [
      { id: 'd1', text: 'CDA luglio – preparare ordine del giorno', done: false },
      { id: 'd2', text: 'Budget previsionale H2', done: false },
      { id: 'd3', text: 'Revisione piano formazione', done: false },
      { id: 'd4', text: 'Aggiornamento organigramma', done: false },
    ],
    scadenze: [
      { id: 'ds1', text: 'CDA', date: '30/07', urgente: false },
      { id: 'ds2', text: 'Budget H2', date: '01/08', urgente: false },
    ],
    note: '',
    contatti: [],
  },
  mezzi: {
    veicoli: [
      {
        id: 'm1', nome: 'Agila', targa: '',
        items: [
          { id: 'ma1', text: 'Revisione', done: false },
          { id: 'ma2', text: 'Tagliando', done: false },
          { id: 'ma3', text: 'Gomme', done: false },
          { id: 'ma4', text: 'Assicurazione', done: false },
        ]
      },
      {
        id: 'm2', nome: 'Panda', targa: '',
        items: [
          { id: 'mp1', text: 'Revisione', done: false },
          { id: 'mp2', text: 'Tagliando', done: false },
          { id: 'mp3', text: 'Gomme', done: false },
        ]
      },
      {
        id: 'm3', nome: 'Ducato Elettrico', targa: '',
        items: [
          { id: 'md1', text: 'Revisione', done: false },
          { id: 'md2', text: 'Ricarica / collaudo', done: false },
          { id: 'md3', text: 'Tagliando', done: false },
        ]
      },
    ],
    note: '',
  },
  housing: {
    checklist: [
      { id: 'h1', text: 'Verifica appartamenti', done: false },
      { id: 'h2', text: 'Contratti – scadenze', done: false },
      { id: 'h3', text: 'Bandi attivi', done: false },
    ],
    scadenze: [
      { id: 'hs1', text: 'Verifica contratto A3', date: '15/08', urgente: false },
    ],
    note: '',
    contatti: [],
  },
  cassa: {
    checklist: [
      { id: 'ca1', text: 'Rendiconto luglio', done: false },
      { id: 'ca2', text: 'Fatture in sospeso – verificare', done: false },
      { id: 'ca3', text: 'Budget agosto', done: false },
    ],
    scadenze: [
      { id: 'cas1', text: 'Rendiconto Q2', date: '25/07', urgente: false },
    ],
    note: '',
    contatti: [],
  },
  conv: {
    convenzioni: [
      { id: 'cv1', nome: 'AUSL Parma – Pasubio', scad: '31/12/2025', ref: 'Dr.ssa Renzi', urgente: false },
      { id: 'cv2', nome: 'Comune di Parma – Alveare', scad: '30/06/2025', ref: 'Dott. Masi', urgente: true },
      { id: 'cv3', nome: 'ASL – Sorgente', scad: '31/03/2026', ref: 'Ufficio Conv.', urgente: false },
    ],
    note: '',
  },
};
