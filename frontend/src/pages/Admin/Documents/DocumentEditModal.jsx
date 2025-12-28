import React, { useEffect, useState } from 'react';
import { uploadDocument, deleteDocument } from '../../../services/imageService.js';

const DocumentEditModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({ id: '', title: '', link: '' });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setFormData({ id: item?.id || '', title: item?.title || '', link: item?.link || '' });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave && onSave(formData);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // If replacing an existing uploaded document, cleanup the old one
      if (formData.link) {
        await deleteDocument(formData.link);
      }
      const url = await uploadDocument(file);
      setFormData((prev) => ({ ...prev, link: url }));
    } catch (err) {
      console.error('Błąd podczas przesyłania dokumentu:', err);
      alert('Nie udało się przesłać dokumentu. Spróbuj ponownie.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        <h3 className="text-2xl font-bold mb-4">{item?.id ? 'Edytuj dokument' : 'Dodaj dokument'}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Plik</label>
            <input
              type="file"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/*"
              onChange={handleFileUpload}
              className="w-full border p-2 rounded-lg"
            />
            {formData.link && (
              <p className="mt-2 text-sm">
                Aktualny plik: <a href={formData.link} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{formData.link}</a>
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tytuł</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="Tytuł dokumentu"
            />
          </div>
          {/* Link is set automatically after upload */}

          <div className="pt-2 flex justify-end gap-3">
            <button type="button" className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={onClose} disabled={isUploading}>Anuluj</button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-lg text-white ${isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isUploading}
            >
              {isUploading ? 'Przesyłanie...' : 'Zapisz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentEditModal;
