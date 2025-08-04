import React, { useState } from "react";
import { uploadImage } from "../../../services/uploadImage";
import { updateInstructor } from "../../../services/Instructors/updateInstructor.js";
import { deleteInstructor } from "../../../services/Instructors/deleteInstructor.js";
import {deleteImage} from "../../../services/imageService.js";
import heic2any from "heic2any";


const InstructorsEditModal = ({ instructor, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...instructor });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        let uploadFile = file;

        // Convert HEIC to JPEG if needed
        if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
            try {
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.8,
                });
                uploadFile = new File([convertedBlob], file.name.replace(/\.heic$/i, ".jpg"), {
                    type: "image/jpeg",
                });
            } catch (err) {
                console.error("Błąd konwersji HEIC:", err);
                alert("Nie udało się przekonwertować pliku .heic. Wybierz inny format.");
                return;
            }
        }

        try {
            if (formData.imageSrc) {
                await deleteImage(formData.imageSrc);
            }
            const imageUrl = await uploadImage(uploadFile);
            setFormData((prev) => ({ ...prev, imageSrc: imageUrl }));
        } catch (err) {
            console.error("Image upload failed:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateInstructor(formData);
            onSave(formData);
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Błąd przy zapisie:", err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure?")) return;

        try {
            if (formData.imageSrc) {
                await deleteImage(formData.imageSrc);
            }

            await deleteInstructor(formData.Id);
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 pb-32 rounded-xl w-full max-w-4xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>

                <h3 className="text-2xl font-bold mb-4">Edytuj Instruktora</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-0.5">Imię i nazwisko:</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Imię i nazwisko"
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-0.5">Doświadczenie:</label>
                        <input
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="Np. 10 lat nauki jazdy..."
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-0.5">Numer Wyswietlenia:</label>
                        <input
                            name="sort"
                            value={formData.sort}
                            onChange={handleChange}
                            placeholder="Np. 1, 2, 3, ..."
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-0.5">Zdjęcie:</label>
                        {formData.imageSrc && (
                            <img
                                src={formData.imageSrc}
                                alt="Podgląd"
                                className="w-full h-64 object-cover rounded-lg mb-2"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Kwalifikacje:</label>
                        <div className="space-y-4 mt-2">
                            {(formData.qualifications || []).map((q, index) => (
                                <div key={index} className="flex items-center gap-2 border p-2 rounded-lg">
                                    <input
                                        type="text"
                                        value={q}
                                        onChange={(e) => {
                                            const updated = [...formData.qualifications];
                                            updated[index] = e.target.value;
                                            setFormData((prev) => ({...prev, qualifications: updated}));
                                        }}
                                        placeholder="Opis kwalifikacji"
                                        className="border p-2 rounded w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...formData.qualifications];
                                            updated.splice(index, 1);
                                            setFormData((prev) => ({...prev, qualifications: updated}));
                                        }}
                                        className="text-red-500 hover:text-red-700 text-xl"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        qualifications: [...(prev.qualifications || []), ""],
                                    }))
                                }
                                className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded"
                            >
                                + Dodaj kwalifikację
                            </button>
                        </div>
                    </div>

                </form>

                <div className="sticky bottom-0 left-0 bg-white pt-4 mt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Usuń
                        </button>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Anuluj
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Zapisz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorsEditModal;
