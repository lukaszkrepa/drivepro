import React, { useState } from 'react';
import {
  fetchRoster,
  generateOne,
  generateGroup,
  startGenerateAll,
  fetchJobStatus,
  refreshData,
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
  const [skipped, setSkipped] = useState([]); // rows skipped during generation
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

  const handleRefresh = async () => {
    setError('');
    setSkipped([]);
    setBusy('refresh');
    setStatus('Odświeżanie danych z arkusza...');
    try {
      await refreshData(year);
      // The sync runs async server-side; wait, then reload the roster.
      setTimeout(async () => {
        try {
          const data = await fetchRoster(year);
          setCustomers(data.customers || []);
          setStatus(`Odświeżono. Załadowano ${data.count} kursantów (${year}).`);
        } catch (e) {
          setError(e.message);
        } finally {
          setBusy('');
        }
      }, 20000);
    } catch (e) {
      setError(e.message);
      setBusy('');
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
    setSkipped([]);
    setBusy('group');
    try {
      const res = await generateGroup(year, groupValue.trim());
      const skippedCount = res.skipped_count || 0;
      setStatus(
        `Grupa ${groupValue}: wygenerowano ${res.pages} zaświadczeń` +
        (skippedCount ? `, pominięto ${skippedCount}.` : '.') +
        ' Pobieranie...'
      );
      setSkipped(res.skipped || []);
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
    setSkipped([]);
    setBusy('all');
    try {
      const { job_id } = await startGenerateAll(year);
      setStatus('Generowanie wszystkich zaświadczeń... to może potrwać kilka minut.');
      // Poll until done.
      const poll = async () => {
        const s = await fetchJobStatus(job_id);
        if (s.status === 'DONE') {
          setStatus(`Gotowe: ${s.generated} wygenerowano, ${s.skipped} pominięto. Pobieranie...`);
          setSkipped(s.skipped_rows || []);
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
          <button
            onClick={handleRefresh}
            disabled={busy === 'refresh'}
            title="Pobiera najnowsze dane z arkusza Google"
            className="px-5 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50"
          >
            {busy === 'refresh' ? 'Odświeżanie...' : 'Odśwież dane'}
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

        {/* Skipped-rows report (rows that could not be generated) */}
        {skipped.length > 0 && (
          <div className="mb-6 border border-amber-300 bg-amber-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-amber-800">
                Pominięto {skipped.length}{' '}
                {skipped.length === 1 ? 'wiersz' : 'wierszy'} (błędne lub niekompletne dane)
              </h3>
              <button
                onClick={() => setSkipped([])}
                className="text-amber-700 hover:text-amber-900 text-sm"
              >
                Ukryj
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-amber-800">
                  <tr>
                    <th className="px-3 py-1">Wiersz</th>
                    <th className="px-3 py-1">Nr zaświadczenia</th>
                    <th className="px-3 py-1">Grupa</th>
                    <th className="px-3 py-1">Powody</th>
                  </tr>
                </thead>
                <tbody>
                  {skipped.map((s) => (
                    <tr key={s.row} className="border-t border-amber-200">
                      <td className="px-3 py-1">{s.row}</td>
                      <td className="px-3 py-1">{s.certificate_no || '—'}</td>
                      <td className="px-3 py-1">{s.group || '—'}</td>
                      <td className="px-3 py-1">
                        {Array.isArray(s.reasons) ? s.reasons.join('; ') : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
