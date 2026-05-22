import React, { useState, useCallback } from 'react';
import './App.css';
import { DEFAULT_TABS, DEFAULT_SECTION_DATA } from './data/sections';
import { useStorage } from './hooks/useStorage';
import HomeView from './components/HomeView';
import SectionView from './components/SectionView';
import MezziView from './components/MezziView';
import ConvenzioniView from './components/ConvenzioniView';

const RINGS = Array.from({ length: 8 });

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [tabs, setTabs] = useStorage('asp_tabs', DEFAULT_TABS);
  const [sectionData, setSectionData] = useStorage('asp_data', DEFAULT_SECTION_DATA);
  const [search, setSearch] = useState('');

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  const updateSection = useCallback((id, updater) => {
    setSectionData(prev => ({
      ...prev,
      [id]: typeof updater === 'function' ? updater(prev[id] || {}) : updater
    }));
  }, [setSectionData]);

  const handleAddSection = () => {
    const name = window.prompt('Nome della nuova sezione:');
    if (!name?.trim()) return;
    const colors = ['#e74c3c','#9b59b6','#3498db','#27ae60','#f39c12','#e67e22','#16a085','#c0392b'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const id = 'custom_' + Date.now();
    setTabs(prev => [...prev, { id, emoji: '📌', label: name.trim(), color }]);
    setSectionData(prev => ({
      ...prev,
      [id]: { checklist: [], scadenze: [], note: '', contatti: [] }
    }));
    setActiveTab(id);
  };

  // Search across all sections
  const searchResults = search.trim().length > 1
    ? Object.entries(sectionData).flatMap(([sId, data]) => {
        const tab = tabs.find(t => t.id === sId);
        if (!tab) return [];
        const results = [];
        (data.checklist || []).forEach(item => {
          if (item.text?.toLowerCase().includes(search.toLowerCase()))
            results.push({ sId, tab, text: item.text, type: 'todo' });
        });
        (data.scadenze || []).forEach(item => {
          if (item.text?.toLowerCase().includes(search.toLowerCase()))
            results.push({ sId, tab, text: item.text + ' – ' + item.date, type: 'scadenza' });
        });
        return results;
      })
    : [];

  const renderContent = () => {
    if (search.trim().length > 1) {
      return (
        <div className="search-results">
          {searchResults.length === 0
            ? <p style={{ color: 'var(--ink3)', fontSize: 13, padding: '8px 0' }}>Nessun risultato per "{search}"</p>
            : searchResults.map((r, i) => (
              <div key={i} className="search-result-item" onClick={() => { setActiveTab(r.sId); setSearch(''); }}>
                <span className="search-result-section" style={{ background: r.tab.color + '22', color: r.tab.color }}>{r.tab.label}</span>
                <span className="search-result-text">{r.text}</span>
              </div>
            ))
          }
        </div>
      );
    }
    if (activeTab === 'home') return <HomeView tabs={tabs} sectionData={sectionData} onNavigate={setActiveTab} />;
    if (activeTab === 'mezzi') return <MezziView data={sectionData.mezzi || {}} onChange={d => updateSection('mezzi', d)} />;
    if (activeTab === 'conv') return <ConvenzioniView data={sectionData.conv || {}} onChange={d => updateSection('conv', d)} />;
    return (
      <SectionView
        key={activeTab}
        id={activeTab}
        data={sectionData[activeTab] || { checklist: [], scadenze: [], note: '', contatti: [] }}
        onChange={d => updateSection(activeTab, d)}
      />
    );
  };

  return (
    <div className="notebook">
      {/* SPINE */}
      <div className="spine">
        {RINGS.map((_, i) => <div key={i} className="ring" />)}
      </div>

      {/* TABS */}
      <div className="tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => { setActiveTab(tab.id); setSearch(''); }}
          >
            <div
              className="tab-inner"
              style={{
                borderLeftColor: activeTab === tab.id ? tab.color : 'transparent',
                color: activeTab === tab.id ? tab.color : undefined,
              }}
            >
              <span className="tab-dot" style={{ background: tab.color }} />
              {tab.label}
            </div>
          </div>
        ))}
        <div className="tab tab-add" onClick={handleAddSection}>
          <div className="tab-inner">＋</div>
        </div>
      </div>

      {/* PAGE */}
      <div className="page">
        <div className="page-lines" />

        <div className="page-header">
          <div className="color-bar" style={{ background: currentTab?.color || '#888' }} />
          <div className="header-text">
            <div className="section-label">ASP Distretto di Parma</div>
            <div className="page-title">
              {search.trim().length > 1
                ? `🔍 Ricerca: ${search}`
                : `${currentTab?.emoji || ''} ${currentTab?.label || ''}`
              }
            </div>
          </div>
          <div className="search-wrap">
            <input
              className="search-input"
              placeholder="🔍 cerca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div key={activeTab + search} className="page-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
