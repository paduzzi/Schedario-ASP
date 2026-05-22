import React, { useState } from 'react';
import Block from './Block';

export default function MezziView({ data, onChange }) {
  const veicoli = data.veicoli || [];
  const note = data.note || '';
  const [newVehicle, setNewVehicle] = useState('');

  const toggleItem = (vId, itemId) => {
    onChange({
      ...data,
      veicoli: veicoli.map(v =>
        v.id === vId
          ? { ...v, items: v.items.map(i => i.id === itemId ? { ...i, done: !i.done } : i) }
          : v
      )
    });
  };

  const addItemToVehicle = (vId, text) => {
    if (!text.trim()) return;
    onChange({
      ...data,
      veicoli: veicoli.map(v =>
        v.id === vId
          ? { ...v, items: [...v.items, { id: 'mi_' + Date.now(), text: text.trim(), done: false }] }
          : v
      )
    });
  };

  const addVehicle = () => {
    if (!newVehicle.trim()) return;
    onChange({
      ...data,
      veicoli: [...veicoli, {
        id: 'v_' + Date.now(),
        nome: newVehicle.trim(),
        targa: '',
        items: [
          { id: 'vi1_' + Date.now(), text: 'Revisione', done: false },
          { id: 'vi2_' + Date.now(), text: 'Tagliando', done: false },
          { id: 'vi3_' + Date.now(), text: 'Assicurazione', done: false },
        ]
      }]
    });
    setNewVehicle('');
  };

  return (
    <>
      <Block title="🚗 Veicoli – manutenzione">
        {veicoli.map(v => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            onToggle={(itemId) => toggleItem(v.id, itemId)}
            onAddItem={(text) => addItemToVehicle(v.id, text)}
          />
        ))}
        <div className="add-row" style={{ marginTop: 10 }}>
          <input
            className="add-input"
            placeholder="aggiungi veicolo..."
            value={newVehicle}
            onChange={e => setNewVehicle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addVehicle()}
          />
          <button className="add-btn-sm" onClick={addVehicle}>+</button>
        </div>
      </Block>

      <Block title="📝 Note">
        <textarea
          className="note-area"
          placeholder="Note su guasti, officine, prenotazioni..."
          value={note}
          onChange={e => onChange({ ...data, note: e.target.value })}
        />
      </Block>
    </>
  );
}

function VehicleCard({ vehicle, onToggle, onAddItem }) {
  const [newItem, setNewItem] = useState('');
  const doneCount = vehicle.items.filter(i => i.done).length;

  return (
    <div className="vehicle-block">
      <div className="vehicle-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>🚗 {vehicle.nome}</span>
        <span style={{ fontSize: 10, color: 'var(--ink3)', fontFamily: 'IBM Plex Mono' }}>
          {doneCount}/{vehicle.items.length}
        </span>
      </div>
      {vehicle.items.map(item => (
        <div key={item.id} className="check-item">
          <input
            type="checkbox"
            id={item.id}
            checked={item.done}
            onChange={() => onToggle(item.id)}
          />
          <label htmlFor={item.id}>{item.text}</label>
        </div>
      ))}
      <div className="add-row">
        <input
          className="add-input"
          placeholder="aggiungi voce..."
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { onAddItem(newItem); setNewItem(''); } }}
        />
        <button className="add-btn-sm" onClick={() => { onAddItem(newItem); setNewItem(''); }}>+</button>
      </div>
    </div>
  );
}
