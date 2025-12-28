import React, { useEffect, useState } from 'react';
import DocumentCard from '../../components/DocumentCard.jsx';
import FAQContact from '../FAQ/FAQContact.jsx';
import { fetchDocuments } from '../../services/Documents/fetchDocuments.js';

const DocumentsMain = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchDocuments()
      .then((items) => {
        if (!mounted) return;
        setDocuments(items || []);
      })
      .catch((err) => {
        console.error('Failed to fetch documents:', err);
        if (!mounted) return;
        setError('Nie udało się pobrać dokumentów.');
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Dokumenty</h2>
        </div>
        {loading && <p>Ładowanie...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="grid gap-4 mb-16">
            {documents.map((d, idx) => (
              <DocumentCard key={`doc-${idx}`} title={d.title} size={d.size} tone={'blue'} href={d.link} />
            ))}
          </div>
        )}

        <FAQContact />
      </div>
    </section>
  );
};

export default DocumentsMain;
