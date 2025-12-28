import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const DocumentsCard = ({ title, link, onEdit, onDelete }) => {
  return (
    <div className="bg-blue-50 p-5 rounded-xl shadow relative">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow">
            <FontAwesomeIcon icon={faFileLines} className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={onEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            type="button"
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsCard;

