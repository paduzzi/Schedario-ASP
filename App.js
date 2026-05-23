import React, { useState } from 'react';
import Block from './Block';

export default function SectionView({ id, data, onChange }) {
  const [newCheck, setNewCheck] = useState('');
  const [newScad, setNewScad] = useState({ text: '', date: '' });
  const [newContact, setNewContact] = useState({ name: '', role: '' });

  const checklist = data.checklist || [];
  const scadenze = data.scadenze || [];
  const contatti = data.contatti || [];
  const note = data.note || '';

  const toggleCheck = (itemId) => {
    onChange({
      ...data,
      checklist: checklist.map(c => c.id === itemId ? { ...c, done: !c.done } : c)
    });
  };

  const addCheck = () => {
    if (!newCheck.trim()) return;
    onChange({
      ...data,
      checklist: [...checklist, { id: 'c_' + Date.now(), text: newCheck.trim(), done: false }]
    });
    setNewCheck('');
  };

  const deleteCheck = (itemId) => {
    onChange({ ...data, checklist: checklist.filter(c => c.id !== itemId) });
  };

  const addScad = () => {
    if (!newScad.text.trim()) return;
    onChange({
      ...data,
      scadenze: [...scadenze, { id: 's_' + Date.now(), text: newScad.text.trim(), date: newScad.date, urgente: false }]
    });
    setNewScad({ text: '', date: '' });
  };

  const addContact = () => {
    if (!newContact.name.trim()) return;
    const initials = newContact.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const colors = ['#3498db', '#9b59b6', '#27ae60', '#e74c3c', '#f39c12', '#16a085'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    onChange({
      ...data,
      contatti: [...contatti, { id: 'ct_' + Date.now(), initials, name: newContact.name.trim(), role: newContact.role.trim(), color }]
    });
    setNewContact({ name: '', role: '' });
  };

  return (
    <>
      {/* DA FARE */}
      <Block title="☐ Da fare">
        {checklist.map(item => (
          <div key={item.id} className="check-item" style={{ position: 'relative' }}>
            <input
              type="checkbox"
              id={item.id}
              checked={item.done}
              onChange={() => toggleCheck(item.id)}
            />
            <label htmlFor={item.id}>{item.text}</label>
            <button
              onClick={() => deleteCheck(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink3)', fontSize: 14, padding: '0 2px', opacity: 0.5 }}
              title="Elimina"
            >×</button>
          </div>
        ))}
        <div className="add-row">
          <input
            className="add-input"
            placeholder="aggiungi voce..."
            value={newCheck}
            onChange={e => setNewCheck(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCheck()}
          />
          <button className="add-btn-sm" onClick={addCheck}>+</button>
        </div>
      </Block>

      {/* SCADENZE */}
      <Block title="📅 Scadenze">
        {scadenze.map(s => (
          <div key={s.id} className="scad-row">
            <span className="scad-text">{s.text}</span>
            {s.urgente && <span className="urgent-pill">urgente</span>}
            <span className="scad-date">{s.date}</span>
          </div>
        ))}
        <div className="add-row" style={{ gap: 4 }}>
          <input
            className="add-input"
            placeholder="nuova scadenza..."
            value={newScad.text}
            onChange={e => setNewScad(p => ({ ...p, text: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && addScad()}
            style={{ flex: 2 }}
          />
          <input
            className="add-input"
            placeholder="gg/mm"
            value={newScad.date}
            onChange={e => setNewScad(p => ({ ...p, date: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && addScad()}
            style={{ flex: 1, maxWidth: 60 }}
          />
          <button className="add-btn-sm" onClick={addScad}>+</button>
        </div>
      </Block>

      {/* NOTE */}
      <Block title="📝 Note rapide">
        <textarea
          className="note-area"
          placeholder="Scrivi qui le tue note..."
          value={note}
          onChange={e => onChange({ ...data, note: e.target.value })}
        />
      </Block>

      {/* CONTATTI */}
      <Block title="👥 Contatti" defaultOpen={contatti.length > 0}>
        {contatti.map(c => (
          <div key={c.id} className="contact-row">
            <div className="avatar" style={{ background: c.color }}>{c.initials}</div>
            <div>
              <div className="contact-name">{c.name}</div>
              <div className="contact-role">{c.role}</div>
            </div>
          </div>
        ))}
        <div className="add-row" style={{ gap: 4 }}>
          <input
            className="add-input"
            placeholder="nome..."
            value={newContact.name}
            onChange={e => setNewContact(p => ({ ...p, name: e.target.value }))}
            style={{ flex: 2 }}
          />
          <input
            className="add-input"
            placeholder="ruolo..."
            value={newContact.role}
            onChange={e => setNewContact(p => ({ ...p, role: e.target.value }))}
            style={{ flex: 2 }}
          />
          <button className="add-btn-sm" onClick={addContact}>+</button>
        </div>
      </Block>

      {/* ARCHIVIO */}
      <Block title="🗃 Archivio" defaultOpen={false}>
        <p style={{ color: 'var(--ink3)', fontSize: 12, fontStyle: 'italic' }}>
          I documenti archiviati appariranno qui. (In arrivo nella V2)
        </p>
      </Block>

      <button className="add-block-btn" onClick={() => alert('Blocchi personalizzati in arrivo nella V2!')}>
        ＋ aggiungi blocco
      </button>
    </>
  );
}
