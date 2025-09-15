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

  return (
    <div className="container">
      <h1>Pour</h1>
      
      <div className="section">
        <h2>Add New Mapping</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Domain (e.g., google.com)"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
          />
          <select
            value={selectedContainer}
            onChange={(e) => setSelectedContainer(e.target.value)}
          >
            <option value="">Select Container</option>
            {containers.map((container) => (
              <option key={container.cookieStoreId} value={container.name}>
                {container.name}
              </option>
            ))}
          </select>
          <button onClick={addMapping} disabled={!newDomain || !selectedContainer}>
            Add
          </button>
        </div>
      </div>

      <div className="section">
        <h2>Current Mappings</h2>
        <div className="mappings-list">
          {Object.entries(mappings).map(([domain, containerName]) => (
            <div key={domain} className="mapping-item">
              <span className="tld">{domain}</span>
              <span className="arrow">→</span>
              <span className="container">{containerName}</span>
              <button
                className="remove-btn"
                onClick={() => removeMapping(domain)}
              >
                ×
              </button>
            </div>
          ))}
          {Object.keys(mappings).length === 0 && (
            <p className="empty">No mappings configured</p>
          )}
        </div>
      </div>

      <div className="section">
        <h2>Export/Import</h2>
        <div className="buttons-row">
          <button onClick={exportMappings}>Export</button>
          <button onClick={() => setShowImport(!showImport)}>
            {showImport ? 'Cancel Import' : 'Import'}
          </button>
          <button onClick={clearAll} className="danger">Clear All</button>
        </div>

        {exportData && (
          <div className="export-data">
            <h3>Export Data:</h3>
            <textarea
              value={exportData}
              readOnly
              rows={6}
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
        )}

        {showImport && (
          <div className="import-data">
            <h3>Import Data:</h3>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste JSON data here..."
              rows={6}
            />
            <button onClick={importMappings} disabled={!importData}>
              Import
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
