import React from 'react';

export default function HomeView({ tabs, sectionData, onNavigate }) {
  // Collect urgenti from all sections
  const urgenti = [];
  Object.entries(sectionData).forEach(([sId, data]) => {
    const tab = tabs.find(t => t.id === sId);
    if (!tab || sId === 'home') return;
    (data.checklist || []).forEach(item => {
      if (!item.done && urgenti.length < 5) urgenti.push({ ...item, tab, sId });
    });
  });

  // Collect scadenze
  const scadenze = [];
  Object.entries(sectionData).forEach(([sId, data]) => {
    const tab = tabs.find(t => t.id === sId);
    if (!tab || sId === 'home') return;
    (data.scadenze || []).forEach(s => {
      scadenze.push({ ...s, tab, sId });
    });
  });
  scadenze.sort((a, b) => {
    const parse = d => {
      if (!d) return 9999;
      const [day, month] = d.split('/').map(Number);
      return month * 100 + day;
    };
    return parse(a.date) - parse(b.date);
  });

  return (
    <div className="home-grid">
      {/* URGENTI */}
      <div className="home-card">
        <div className="home-card-title">🔥 Urgenti / Da fare</div>
        {urgenti.slice(0, 5).map((item, i) => (
          <div key={i} className="home-item" onClick={() => onNavigate(item.sId)}>
            <span className="home-dot" style={{ background: item.tab.color }} />
            <span className="home-text">{item.text}</span>
            <span className="home-badge" style={{ background: item.tab.color + '22', color: item.tab.color }}>
              {item.tab.label}
            </span>
          </div>
        ))}
        {urgenti.length === 0 && (
          <p style={{ color: 'var(--ink3)', fontSize: 12, fontStyle: 'italic' }}>Tutto a posto ✓</p>
        )}
      </div>

      {/* SCADENZE */}
      <div className="home-card">
        <div className="home-card-title">📅 Scadenze</div>
        {scadenze.slice(0, 5).map((s, i) => (
          <div key={i} className="home-item" onClick={() => onNavigate(s.sId)}>
            <span className="home-dot" style={{ background: s.tab.color }} />
            <span className="home-text">{s.text}</span>
            {s.urgente && <span className="urgent-pill">urgente</span>}
            <span className="home-date">{s.date}</span>
          </div>
        ))}
        {scadenze.length === 0 && (
          <p style={{ color: 'var(--ink3)', fontSize: 12, fontStyle: 'italic' }}>Nessuna scadenza</p>
        )}
      </div>

      {/* PREFERITI */}
      <div className="home-card">
        <div className="home-card-title">⭐ Sezioni principali</div>
        {['pasubio', 'alveare', 'dir', 'conv'].map(sId => {
          const tab = tabs.find(t => t.id === sId);
          if (!tab) return null;
          return (
            <div key={sId} className="home-item" onClick={() => onNavigate(sId)}>
              <span className="home-dot" style={{ background: tab.color }} />
              <span className="home-text">{tab.label}</span>
              <span style={{ color: 'var(--ink3)', fontSize: 12 }}>→</span>
            </div>
          );
        })}
      </div>

      {/* SEZIONI */}
      <div className="home-card">
        <div className="home-card-title">🗂 Tutte le sezioni</div>
        {tabs.filter(t => t.id !== 'home').map(tab => (
          <div key={tab.id} className="home-item" onClick={() => onNavigate(tab.id)}>
            <span className="home-dot" style={{ background: tab.color }} />
            <span className="home-text">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
