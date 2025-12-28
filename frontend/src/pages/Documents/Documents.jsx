import React from 'react';
import DocumentsHero from './DocumentsHero.jsx';
import DocumentsMain from './DocumentsMain.jsx';

const Documents = () => {
  return (
    <div id="main-wrapper" className="min-h-screen bg-white">
      <DocumentsHero />
      <DocumentsMain />
    </div>
  );
};

export default Documents;
