import React, { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard.jsx";
import GalleryEditModal from "./GalleryEditModal.jsx";
import { fetchGallery } from "../../../services/Gallery/fetchGallery.js";
import { deleteImage } from "../../../services/imageService.js";
import { updateGalleryItem } from "../../../services/Gallery/updateGalleryItem.js";
import { addGalleryItem } from "../../../services/Gallery/addGalleryItem.js";
import { deleteGalleryItem } from "../../../services/Gallery/deleteGalleryItem.js";

const GalleryMain = () => {
    const [galeria, setGaleria] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchGallery()
            .then(setGaleria)
            .catch(console.error);
    }, []);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsNew(false);
    };

    const handleDelete = async (id, src) => {
        if (!window.confirm("Czy na pewno chcesz usunąć to zdjęcie?")) return;
        try {
            if (src) await deleteImage(src);
            await deleteGalleryItem(id);
            setGaleria((prev) => prev.filter((item) => item.Id !== id));
        } catch (err) {
            console.error("Błąd podczas usuwania zdjęcia:", err);
        }
    };

    const handleClose = () => {
        setSelectedItem(null);
        setIsNew(false);
    };

    const handleAddItem = () => {
        setSelectedItem({
            Id: Date.now(),
            src: "",
            title: "",
            description: "",
            categories: []
        });
        setIsNew(true);
    };

    const handleSave = async (updatedItem) => {
        if (isNew) {
            await addGalleryItem(updatedItem);
            setGaleria((prev) => [...prev, updatedItem]);
        } else {
            await updateGalleryItem(updatedItem);
            setGaleria((prev) =>
                prev.map((i) => (i.Id === updatedItem.Id ? updatedItem : i))
            );
        }
        handleClose();
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Galerię</h2>
                    <button
                        onClick={handleAddItem}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj zdjęcie
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {galeria.map((item) => (
                        <GalleryCard
                            key={item.Id}
                            {...item}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => handleDelete(item.Id, item.src)}
                        />
                    ))}
                </div>
            </div>

            {selectedItem && (
                <GalleryEditModal
                    item={selectedItem}
                    onSave={handleSave}
                    onClose={handleClose}
                />
            )}
        </section>
    );
};

export default GalleryMain;
