import React, { useState } from 'react';
import {
  fetchRoster,
  generateOne,
  generateGroup,
  startGenerateAll,
  fetchJobStatus,
} from '../../../services/Certificates/certClient.js';

const currentYear = new Date().getFullYear().toString();

// Trigger a browser download for a Blob with the given filename.
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Open a pre-signed URL (group / all zip) in a new tab to download it.
function openUrl(url) {
  window.open(url, '_blank', 'noopener');
}

function safeName(fullName) {
  return (fullName || 'certificate').trim().replace(/\s+/g, '_');
}

const CertificatesMain = () => {
  const [year, setYear] = useState(currentYear);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [groupValue, setGroupValue] = useState('');
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [busy, setBusy] = useState('');       // id/label of in-flight action
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const loadRoster = async () => {
    setError('');
    setStatus('');
    setLoadingRoster(true);
    try {
      const data = await fetchRoster(year);
      setCustomers(data.customers || []);
      setStatus(`Załadowano ${data.count} kursantów (${year}).`);
    } catch (e) {
      setError(e.message);
      setCustomers([]);
    } finally {
      setLoadingRoster(false);
    }
  };

  const handleGenerateOne = async (c) => {
    setError('');
    setBusy(c.customer_id);
    try {
      const blob = await generateOne(year, c.customer_id);
      downloadBlob(blob, `${safeName(c.full_name)}.pdf`);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  };

  const handleGenerateGroup = async () => {
    if (!groupValue.trim()) return;
    setError('');
    setStatus('');
    setBusy('group');
    try {
      const res = await generateGroup(year, groupValue.trim());
      setStatus(`Grupa ${groupValue}: ${res.pages} zaświadczeń. Pobieranie...`);
      openUrl(res.download_url);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  };

  const handleGenerateAll = async () => {
    setError('');
    setStatus('');
    setBusy('all');
    try {
      const { job_id } = await startGenerateAll(year);
      setStatus('Generowanie wszystkich zaświadczeń... to może potrwać kilka minut.');
      // Poll until done.
      const poll = async () => {
        const s = await fetchJobStatus(job_id);
        if (s.status === 'DONE') {
          setStatus(`Gotowe: ${s.generated} wygenerowano, ${s.skipped} pominięto. Pobieranie...`);
          openUrl(s.download_url);
          setBusy('');
        } else if (s.status === 'FAILED') {
          setError(s.error || 'Generowanie nie powiodło się.');
          setBusy('');
        } else {
          setStatus(`Status: ${s.status}...`);
          setTimeout(poll, 5000);
        }
      };
      setTimeout(poll, 5000);
    } catch (e) {
      setError(e.message);
      setBusy('');
    }
  };

  const filtered = customers.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (c.full_name || '').toLowerCase().includes(q) ||
      (c.certificate_no || '').toLowerCase().includes(q) ||
      (c.group || '').toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">Zaświadczenia</h2>

        {/* Year + load + bulk actions */}
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Rok</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border rounded-lg px-3 py-2 w-28"
            />
          </div>
          <button
            onClick={loadRoster}
            disabled={loadingRoster}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loadingRoster ? 'Ładowanie...' : 'Załaduj listę'}
          </button>

          <div className="flex items-end gap-2">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Grupa</label>
              <input
                value={groupValue}
                onChange={(e) => setGroupValue(e.target.value)}
                placeholder="np. 1"
                className="border rounded-lg px-3 py-2 w-28"
              />
            </div>
            <button
              onClick={handleGenerateGroup}
              disabled={busy === 'group' || !groupValue.trim()}
              className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {busy === 'group' ? 'Generowanie...' : 'Generuj grupę'}
            </button>
          </div>

          <button
            onClick={handleGenerateAll}
            disabled={busy === 'all'}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {busy === 'all' ? 'Generowanie...' : 'Generuj wszystkie'}
          </button>
        </div>

        {status && <p className="text-blue-700 mb-3">{status}</p>}
        {error && <p className="text-red-600 mb-3">⚠ {error}</p>}

        {/* Search */}
        {customers.length > 0 && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po nazwisku, nr zaświadczenia lub grupie..."
            className="border rounded-lg px-4 py-2 w-full mb-4"
          />
        )}

        {/* Roster table */}
        {filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3">Nazwisko i Imię</th>
                  <th className="px-4 py-3">Nr zaświadczenia</th>
                  <th className="px-4 py-3">Kat.</th>
                  <th className="px-4 py-3">Grupa</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.customer_id} className="border-t">
                    <td className="px-4 py-2">{c.full_name}</td>
                    <td className="px-4 py-2">{c.certificate_no}</td>
                    <td className="px-4 py-2">{c.category}</td>
                    <td className="px-4 py-2">{c.group}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleGenerateOne(c)}
                        disabled={busy === c.customer_id}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {busy === c.customer_id ? '...' : 'Generuj'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesMain;
