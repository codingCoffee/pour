import { useState, useEffect } from 'react';
import { ContainerMapping, ContainerInfo } from '../../lib/types';
import { StorageService } from '../../lib/services/storage';
import { ContainerService } from '../../lib/services/containers';
import './App.css';

function App() {
  const [mappings, setMappings] = useState<ContainerMapping>({});
  const [containers, setContainers] = useState<ContainerInfo[]>([]);
  const [newDomain, setNewDomain] = useState('');
  const [selectedContainer, setSelectedContainer] = useState('');
  const [exportData, setExportData] = useState('');
  const [importData, setImportData] = useState('');
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [mappingsData, containersData] = await Promise.all([
      StorageService.getContainerMappings(),
      ContainerService.getAllContainers()
    ]);
    setMappings(mappingsData);
    setContainers(containersData);
  };

  const addMapping = async () => {
    if (newDomain && selectedContainer) {
      await StorageService.addMapping(newDomain, selectedContainer);
      setNewDomain('');
      setSelectedContainer('');
      await loadData();
    }
  };

  const removeMapping = async (tld: string) => {
    await StorageService.removeMapping(tld);
    await loadData();
  };

  const exportMappings = async () => {
    const data = await StorageService.exportMappings();
    setExportData(data);
  };

  const importMappings = async () => {
    try {
      await StorageService.importMappings(importData);
      setImportData('');
      setShowImport(false);
      await loadData();
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  const clearAll = async () => {
    if (confirm('Are you sure you want to clear all mappings?')) {
      await StorageService.clearAllMappings();
      await loadData();
    }
  };

  const count = Object.keys(mappings).length;

  return (
    <div className="app">
      <header className="header">
        <h1 className="brand">Pour<span className="dot">.</span></h1>
        <p className="tagline">container · router</p>
      </header>

      <section className="section">
        <h2 className="section-label">New Mapping</h2>
        <div className="form">
          <input
            className="input"
            type="text"
            placeholder="domain.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMapping()}
          />
          <select
            className="select"
            value={selectedContainer}
            onChange={(e) => setSelectedContainer(e.target.value)}
          >
            <option value="">Select container</option>
            {containers.map((container) => (
              <option key={container.cookieStoreId} value={container.name}>
                {container.name}
              </option>
            ))}
          </select>
          <button
            className="btn-add"
            onClick={addMapping}
            disabled={!newDomain || !selectedContainer}
          >
            Pour into container
          </button>
        </div>
      </section>

      <section className="section">
        <h2 className="section-label">
          Mappings
          <span className="count">{String(count).padStart(2, '0')}</span>
        </h2>
        {count === 0 ? (
          <div className="empty">nothing poured yet</div>
        ) : (
          <div className="mappings">
            {Object.entries(mappings).map(([domain, containerName]) => (
              <div key={domain} className="row">
                <span className="domain" title={domain}>{domain}</span>
                <span className="arrow">↝</span>
                <span className="container-name" title={containerName}>{containerName}</span>
                <button
                  className="remove"
                  onClick={() => removeMapping(domain)}
                  aria-label={`Remove ${domain}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2 className="section-label">Tools</h2>
        <div className="tools">
          <button className="btn-ghost" onClick={exportMappings}>Export</button>
          <button className="btn-ghost" onClick={() => setShowImport(!showImport)}>
            {showImport ? 'Cancel' : 'Import'}
          </button>
          <button className="btn-ghost danger" onClick={clearAll}>Clear</button>
        </div>

        {exportData && (
          <div className="io-panel">
            <textarea
              value={exportData}
              readOnly
              rows={5}
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
        )}

        {showImport && (
          <div className="io-panel">
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste JSON…"
              rows={5}
            />
            <button
              className="btn-add"
              onClick={importMappings}
              disabled={!importData}
            >
              Import
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
