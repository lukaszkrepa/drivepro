import React from 'react';

const GalleryCategories = ({ categories = [], onSelectCategory, selectedCategory }) => {
    return (
        <section id="gallery-categories" className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => onSelectCategory(cat)}
                                className={`px-6 py-2 rounded-full transition-colors ${
                                    isActive
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-200 hover:bg-red-600 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default GalleryCategories;
