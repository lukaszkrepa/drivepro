import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faDownload } from '@fortawesome/free-solid-svg-icons';

const DocumentCard = ({ title, size, tone = 'red', href = '#' }) => {
  const toneMap = {
    red: { bg: 'bg-red-50 group-hover:bg-red-100', icon: 'text-red-600' },
    blue: { bg: 'bg-blue-50 group-hover:bg-blue-100', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50 group-hover:bg-green-100', icon: 'text-green-600' },
  };
  const colors = toneMap[tone] || toneMap.red;

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!href) return;
    try {
      const res = await fetch(href, { mode: 'cors' });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const urlPath = new URL(href, window.location.href).pathname;
      const guessExt = urlPath.includes('.') ? urlPath.split('.').pop() : 'pdf';
      const base = title ? title.replace(/[^a-zA-Z0-9-_]+/g, '_') : 'dokument';
      a.href = url;
      a.download = `${base}.${guessExt}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback: open in new tab if direct download fails
      window.open(href, '_blank', 'noopener');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all group">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-5">
          <div className={`w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center transition-colors`}>
            <FontAwesomeIcon icon={faFilePdf} className={`${colors.icon} text-2xl`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            {size && <p className="text-sm text-gray-500">{size}</p>}
          </div>
        </div>
        <a
          href={href || '#'}
          onClick={handleDownload}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faDownload} />
          <span>Pobierz</span>
        </a>
      </div>
    </div>
  );
};

export default DocumentCard;
