import React from 'react';

const GalleryHero = () => {
    return (
        <section id="gallery-hero" className="pt-20 h-[400px] bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white">
                    <h1 className="text-5xl font-bold mb-6">Galeria Zdjęć</h1>
                    <p className="text-xl">Zobacz jak wyglądają nasze kursy, wydarzenia i codzienne zajęcia</p>
                </div>
            </div>
        </section>
    );
};

export default GalleryHero;