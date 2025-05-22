import React, { useEffect, useState } from "react";
import { uploadImage, deleteImage } from "../../../services/imageService.js";
import {deleteGalleryItem} from "../../../services/Gallery/deleteGalleryItem.js";

const GalleryEditModal = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        ...item,
        categories: item.categories || [],
        categoriesString: (item.categories || []).join(", "),
    });


    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            if (formData.src) await deleteImage(formData.src);
            const imageUrl = await uploadImage(file);
            setFormData((prev) => ({ ...prev, src: imageUrl }));
        } catch (err) {
            console.error("Błąd podczas przesyłania obrazu:", err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const categories = formData.categoriesString
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

        const { categoriesString, ...rest } = formData;

        onSave({ ...rest, categories });
    };

    const handleDelete = async () => {
        if (!window.confirm("Czy napewno chcesz usunąć?")) return;

        try {
            if (formData.imageSrc) {
                await deleteImage(formData.imageSrc);
            }
            await deleteGalleryItem(formData.Id);
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>

                <h3 className="text-2xl font-bold mb-4">Edytuj zdjęcie</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {formData.src && (
                        <img
                            src={formData.src}
                            alt="Podgląd"
                            className="w-full h-60 object-cover rounded-xl mb-2"
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full border p-2 rounded-lg"
                    />

                    <div>
                        <label className="block font-semibold">Tytuł:</label>
                        <input
                            name="title"
                            value={formData.title || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Opis:</label>
                        <input
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Kategorie (oddzielone przecinkami):</label>
                        <input
                            name="categoriesString"
                            value={formData.categoriesString}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    categoriesString: e.target.value,
                                }))
                            }
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>


                    <div className="flex justify-end pt-4 border-t mt-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Usuń
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Zapisz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GalleryEditModal;
