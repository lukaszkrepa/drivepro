import React from 'react';

const GalleryCategories = () => {
    return (
        <section id="gallery-categories" className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4">
                    <button id="cat-all" className="px-6 py-2 bg-red-600 text-white rounded-full">
                        Wszystkie
                    </button>
                    <button
                        id="cat-courses"
                        className="px-6 py-2 bg-gray-200 hover:bg-red-600 hover:text-white rounded-full"
                    >
                        Kursy
                    </button>
                    <button
                        id="cat-events"
                        className="px-6 py-2 bg-gray-200 hover:bg-red-600 hover:text-white rounded-full"
                    >
                        Wydarzenia
                    </button>
                    <button
                        id="cat-cars"
                        className="px-6 py-2 bg-gray-200 hover:bg-red-600 hover:text-white rounded-full"
                    >
                        Samochody
                    </button>
                    <button
                        id="cat-facility"
                        className="px-6 py-2 bg-gray-200 hover:bg-red-600 hover:text-white rounded-full"
                    >
                        Ośrodek
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GalleryCategories;