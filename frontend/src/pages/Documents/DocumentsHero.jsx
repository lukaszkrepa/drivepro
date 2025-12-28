import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const DocumentsHero = () => {
  return (
    <section className="pt-32 h-[400px] bg-gradient-to-r from-black via-[#7b0000] to-[#c00000]">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="text-white">
          <div className="flex items-center space-x-3 mb-4">
            <FontAwesomeIcon icon={faFolderOpen} className="text-4xl" />
            <h1 className="text-5xl font-bold">Dokumenty do pobrania</h1>
          </div>
          <p className="text-xl">Wszystkie niezbędne formularze i dokumenty w jednym miejscu</p>
        </div>
      </div>
    </section>
  );
};

export default DocumentsHero;

