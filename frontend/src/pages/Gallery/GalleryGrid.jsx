import React, { useEffect, useState } from 'react';
import GalleryItem from './GalleryItem';
import GalleryCategories from './GalleryCategories';
import { fetchGallery } from "../../services/Gallery/fetchGallery.js";

const GalleryGrid = () => {
    const [gallery, setGallery] = useState([]);
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

    useEffect(() => {
        fetchGallery()
            .then(data => {
                setGallery(data);

                // Flatten all categories and deduplicate
                const all = data.flatMap(item => item.categories || []);
                const unique = Array.from(new Set(all.filter(cat => cat !== 'Wszystkie'))).sort();
                const uniqueCategories = ['Wszystkie', ...unique]; // Ensure 'Wszystkie' is first
                setCategories(uniqueCategories);


                setCategories(uniqueCategories);
                setFilteredGallery(data); // show all initially
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedCategory === 'Wszystkie') {
            setFilteredGallery(gallery);
        } else {
            setFilteredGallery(
                gallery.filter(item =>
                    item.categories.includes(selectedCategory)
                )
            );
        }
    }, [selectedCategory, gallery]);

    return (
        <>
            {categories.length > 0 && (
                <GalleryCategories
                    categories={categories}
                    onSelectCategory={setSelectedCategory}
                />
            )}
            <section id="gallery-grid" className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredGallery.map((item) => (
                            <GalleryItem
                                key={item.id}
                                id={item.id}
                                src={item.src}
                                alt={item.alt}
                                title={item.title}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default GalleryGrid;
