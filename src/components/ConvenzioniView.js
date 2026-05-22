import React, { useState } from 'react';
import Block from './Block';

export default function ConvenzioniView({ data, onChange }) {
  const convenzioni = data.convenzioni || [];
  const note = data.note || '';
  const [newConv, setNewConv] = useState({ nome: '', scad: '', ref: '' });

  const toggleUrgente = (id) => {
    onChange({
      ...data,
      convenzioni: convenzioni.map(c => c.id === id ? { ...c, urgente: !c.urgente } : c)
    });
  };

  const addConv = () => {
    if (!newConv.nome.trim()) return;
    onChange({
      ...data,
      convenzioni: [...convenzioni, { id: 'cv_' + Date.now(), ...newConv, urgente: false }]
    });
    setNewConv({ nome: '', scad: '', ref: '' });
  };

  return (
    <>
      <Block title="📄 Elenco convenzioni">
        {convenzioni.map(c => (
          <div key={c.id} className="conv-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <div className="conv-name" style={{ flex: 1 }}>{c.nome}</div>
              {c.urgente && <span className="urgent-pill">rinnovo urgente</span>}
              <span className="scad-date">{c.scad}</span>
              <button
                onClick={() => toggleUrgente(c.id)}
                title="Segna urgente"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: '0 2px', opacity: c.urgente ? 1 : 0.3 }}
              >🔴</button>
            </div>
            {c.ref && <div className="conv-meta">Referente: {c.ref}</div>}
          </div>
        ))}
        <div className="add-row" style={{ flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
          <input
            className="add-input"
            placeholder="nome convenzione..."
            value={newConv.nome}
            onChange={e => setNewConv(p => ({ ...p, nome: e.target.value }))}
            style={{ flex: '2 1 120px' }}
          />
          <input
            className="add-input"
            placeholder="scadenza..."
            value={newConv.scad}
            onChange={e => setNewConv(p => ({ ...p, scad: e.target.value }))}
            style={{ flex: '1 1 70px' }}
          />
          <input
            className="add-input"
            placeholder="referente..."
            value={newConv.ref}
            onChange={e => setNewConv(p => ({ ...p, ref: e.target.value }))}
            style={{ flex: '1 1 90px' }}
          />
          <button className="add-btn-sm" onClick={addConv}>+</button>
        </div>
      </Block>

      <Block title="📝 Note">
        <textarea
          className="note-area"
          placeholder="Note su rinnovi, contatti, iter burocratico..."
          value={note}
          onChange={e => onChange({ ...data, note: e.target.value })}
        />
      </Block>
    </>
  );
}
