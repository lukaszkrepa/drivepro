import React, { useState } from 'react';
import { deleteDocument as deleteDocumentFromS3 } from '../../../services/imageService.js';
import { fetchDocuments } from '../../../services/Documents/fetchDocuments.js';
import { addDocument } from '../../../services/Documents/addDocument.js';
import { updateDocument } from '../../../services/Documents/updateDocument.js';
import { deleteDocument as deleteDocumentFromDb } from '../../../services/Documents/deleteDocument.js';
import DocumentsCard from './DocumentsCard.jsx';
import DocumentEditModal from './DocumentEditModal.jsx';

const DocumentsMain = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [originalTitle, setOriginalTitle] = useState('');

  React.useEffect(() => {
    fetchDocuments()
      .then((items) => setDocuments(items || []))
      .catch((e) => console.error('Nie udało się pobrać dokumentów:', e));
  }, []);

  const handleAdd = () => {
    setSelectedItem({ title: '', link: '' });
    setIsNew(true);
    setOriginalTitle('');
  };

  const handleEdit = (doc) => {
    setSelectedItem(doc);
    setIsNew(false);
    setOriginalTitle(doc.title);
  };

  const handleDelete = async (title) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten dokument?')) return;
    try {
      const toDelete = documents.find((d) => d.title === title);
      if (toDelete?.link) {
        await deleteDocumentFromS3(toDelete.link);
      }
      await deleteDocumentFromDb(title);
    } catch (e) {
      console.warn('Nie udało się usunąć pliku z S3 (kontynuuję):', e);
    }
    setDocuments((prev) => prev.filter((d) => d.title !== title));
  };

  const handleSave = (doc) => {
    const persist = async () => {
      if (isNew) {
        await addDocument(doc);
        setDocuments((prev) => [...prev, doc]);
      } else {
        await updateDocument(doc);
        setDocuments((prev) => prev.map((d) => (d.title === originalTitle ? doc : d)));
      }
      setSelectedItem(null);
      setIsNew(false);
      setOriginalTitle('');
    };

    persist().catch((e) => console.error('Błąd zapisu dokumentu:', e));
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-700">Edytuj Dokumenty</h2>
          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
          >
            <i className="fa-solid fa-plus mr-2"></i>Dodaj dokument
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <DocumentsCard
              key={doc.title}
              title={doc.title}
              link={doc.link}
              onEdit={() => handleEdit(doc)}
              onDelete={() => handleDelete(doc.title)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <DocumentEditModal
          item={selectedItem}
          onSave={handleSave}
          onClose={() => {
            setSelectedItem(null);
            setIsNew(false);
          }}
        />
      )}
    </section>
  );
};

export default DocumentsMain;
