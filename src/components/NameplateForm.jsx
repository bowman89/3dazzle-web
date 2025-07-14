import React, { useState } from 'react';

export default function NameplateForm() {
  const [names, setNames] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const ENDPOINT = 'http://localhost:3001/api/generate-zip';

  const handleDownload = async () => {
    setLoading(true);
    setStatus('');
    try {
      const nameList = names
        .split('\n')
        .map(n => n.trim())
        .filter(Boolean);

      if (!nameList.length) throw new Error('Indtast mindst ét navn!');

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names: nameList }),
      });

      if (!res.ok) throw new Error('Noget gik galt på serveren.');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'navneskilte.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setStatus('Download gennemført!');
    } catch (err) {
      setStatus(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: '40px auto',
      padding: 32,
      background: '#f7f7f7',
      borderRadius: 16,
      boxShadow: '0 4px 24px #0002',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
      <h2 style={{ fontSize: 32, margin: 0 }}>Generér 3D-navneskilte</h2>
      <p style={{ color: '#666', margin: 0 }}>Indtast ét navn per linje</p>
      <textarea
        rows={8}
        style={{ width: '100%', marginBottom: 12, padding: 8, fontSize: 16, borderRadius: 8, border: '1px solid #ddd' }}
        placeholder="Mille&#10;Anders&#10;Emma"
        value={names}
        onChange={e => setNames(e.target.value)}
      />
      <button
        onClick={handleDownload}
        disabled={loading || !names.trim()}
        style={{
          background: '#C19957',
          color: '#111',
          border: 'none',
          borderRadius: 8,
          fontWeight: 700,
          padding: '12px 0',
          fontSize: 18,
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: 8
        }}
      >
        {loading ? 'Genererer...' : 'Download ZIP med STL-filer'}
      </button>
      <div style={{ fontSize: 15, color: status.includes('Download') ? 'green' : 'crimson', minHeight: 24 }}>
        {status}
      </div>
      <div style={{ fontSize: 14, color: '#888', marginTop: 8 }}>
        Eksempel:<br />
        Mille<br />
        Anders<br />
        Emma
      </div>
    </div>
  );
}
