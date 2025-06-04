import React, { useEffect, useState } from "react";
import {
    faCalendar,
    faGear,
    faGauge,
    faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {deleteCar} from "../../../services/Cars/deleteCar.js";
import {uploadImage} from "../../../services/uploadImage.js";
import {deleteImage} from "../../../services/imageService.js";

// Icon selector options (value === type)
const ICON_OPTIONS = [
    { label: "Rocznik", value: "year", icon: faCalendar },
    { label: "Zębatka", value: "transmission", icon: faGear },
    { label: "Kierownica", value: "steering", icon: faGauge },
    { label: "Tarcza", value: "safety", icon: faShield },
];

const CarEditModal = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        ...item,
        details: item.details || [],
    });

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDetailChange = (index, field, value) => {
        const updated = [...formData.details];
        updated[index] = { ...updated[index], [field]: value };
        setFormData((prev) => ({ ...prev, details: updated }));
    };

    const handleAddDetail = () => {
        setFormData((prev) => ({
            ...prev,
            details: [...prev.details, { text: "", type: "" }],
        }));
    };

    const handleRemoveDetail = (index) => {
        const updated = [...formData.details];
        updated.splice(index, 1);
        setFormData((prev) => ({ ...prev, details: updated }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (formData.imageSrc) {
                await deleteImage(formData.imageSrc);
            }

            const imageUrl = await uploadImage(file);
            setFormData((prev) => ({ ...prev, imageSrc: imageUrl }));
        } catch (err) {
            console.error("Image upload failed:", err);
        }
    };


    const handleDelete = async () => {
        if (!window.confirm("Czy napewno chcesz usunąć?")) return;

        try {
            await deleteCar(formData.Id);
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>

                <h3 className="text-2xl font-bold mb-4">Edytuj samochód</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        placeholder="Nazwa samochodu"
                        className="w-full border p-2 rounded-lg"
                    />
                    <div>
                        <label className="block font-semibold mb-0.5">Zdjęcie:</label>
                        {formData.imageSrc && (
                            <img
                                src={formData.imageSrc}
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
                    </div>


                    <div className="space-y-2">
                        <div className="font-semibold">Szczegóły:</div>
                        {formData.details.map((detail, index) => (
                            <div key={index} className="grid grid-cols-6 gap-2 items-center">
                                <div className="col-span-2 flex items-center gap-2">
                                    <select
                                        value={detail.type}
                                        onChange={(e) => handleDetailChange(index, "type", e.target.value)}
                                        className="w-full border p-2 rounded"
                                    >
                                        <option value="">Wybierz ikonę</option>
                                        {ICON_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    {detail.type && (
                                        <FontAwesomeIcon
                                            icon={
                                                ICON_OPTIONS.find((opt) => opt.value === detail.type)?.icon
                                            }
                                            className="text-blue-600 text-lg"
                                        />
                                    )}
                                </div>


                                <input
                                    placeholder="Opis"
                                    value={detail.text}
                                    onChange={(e) => handleDetailChange(index, "text", e.target.value)}
                                    className="col-span-3 border p-2 rounded"
                                />

                                <button
                                    type="button"
                                    onClick={() => handleRemoveDetail(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddDetail}
                            className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded"
                        >
                            + Dodaj szczegół
                        </button>
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

export default CarEditModal;
