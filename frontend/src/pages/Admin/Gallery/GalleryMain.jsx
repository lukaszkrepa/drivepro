import React, { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard.jsx";
import { fetchGallery } from "../../../services/fetchGallery.js";

const GalleryMain = () => {
    const [galeria, setGaleria] = useState([]);

    useEffect(() => {
        fetchGallery()
            .then(setGaleria)
            .catch(console.error);
    }, []);

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Galerię</h2>
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg">
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj zdjęcie
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {galeria.map((item) => (
                        <GalleryCard
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
    );
};

export default GalleryMain;
