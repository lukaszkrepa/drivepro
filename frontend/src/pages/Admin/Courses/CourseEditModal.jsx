import React, {useEffect, useState} from "react";
import { updateCourse } from "../../../services/Courses/updateCourse.js";
import { deleteCourse } from "../../../services/Courses/deleteCourse.js";
import { uploadImage } from "../../../services/uploadImage";
import { faCheck, faBolt, faGlobe, faClock, faCar, faRoad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {deleteImage} from "../../../services/imageService.js";

const ICON_OPTIONS = [
    { name: "check", icon: faCheck, label: "Zaznacz" },
    { name: "bolt", icon: faBolt, label: "Piorun" },
    { name: "globe", icon: faGlobe, label: "Ziemia" },
    { name: "clock", icon: faClock, label: "Zegar" },
    { name: "car", icon: faCar, label: "Auto" },
    { name: "road", icon: faRoad, label: "Droga" },
];


const COLOR_OPTIONS = [
    { value: "blue", label: "Niebieski" },
    { value: "green", label: "Zielony" },
    { value: "red", label: "Czerwony" },
    { value: "yellow", label: "Żółty" },
    { value: "gray", label: "Szary" },
];


const CourseEditModal = ({ course, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...course });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
        if (!window.confirm("Are you sure?")) return;

        try {
            if (formData.imageSrc) {
                await deleteImage(formData.imageSrc);
            }
            await deleteCourse(formData.id);
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCourse(formData);
            onSave(formData);
            onClose();
            // window.location.reload()
        } catch (err) {
            console.error("DynamoDB update error:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={handleBackdropClick}>
            <div className="bg-white p-6 pb-1 rounded-xl w-full max-w-5xl shadow-xl relative max-h-[90vh] overflow-y-auto">

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
                <h3 className="text-2xl font-bold mb-4">Edytuj kurs</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block font-semibold mb-0.1">Tytuł:</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Tytuł"
                        className="w-full border p-2 rounded-lg"
                    />
                    <label className="block font-semibold mb-0.1">Cena:</label>
                    <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Cena"
                        className="w-full border p-2 rounded-lg"
                    />
                    <label className="block font-semibold mb-0.1">Tag (prawy górny róg):</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start border p-2 rounded-lg">
                        <input
                            name="tag"
                            value={formData.tag}
                            onChange={handleChange}
                            placeholder="Tag (Prawy górny róg)"
                            className="w-full border p-2 rounded-lg"
                        />
                        <select
                            name="tagColor"
                            value={formData.tagColor || "blue"}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                        >
                            <option value="" disabled>Wybierz kolor</option>
                            {COLOR_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                    </div>


                    <div>
                        <label className="block font-semibold mb-0.1">Zdjecie:</label>
                        {formData.imageSrc && (
                            <img
                                src={formData.imageSrc}
                                alt="Podgląd"
                                className="w-full h-90 object-cover rounded mb-2"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <label className="block font-semibold mb-0.1">Przycisk (dolny):</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start border p-2 rounded-lg">

                        <input
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                            placeholder="Tekst przycisku (np. Zapisz się)"
                            className="w-full border p-2 rounded-lg"
                        />
                        <select
                            name="buttonColor"
                            value={formData.buttonColor || "blue"}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                        >
                            <option value="" disabled>Wybierz kolor przycisku</option>
                            {COLOR_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="font-semibold">Funkcje:</label>
                        <div className="space-y-4 mt-2">
                            {(formData.features || []).map((feature, index) => {
                                const isObject = typeof feature === "object" && feature !== null;
                                const featureData = isObject ? feature : {text: feature, icon: "", iconColor: ""};

                                const updateFeature = (field, value) => {
                                    const updated = [...formData.features];
                                    updated[index] = {...featureData, [field]: value};
                                    setFormData((prev) => ({...prev, features: updated}));
                                };

                                return (
                                    <div key={index}
                                         className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start border p-2 rounded-lg">
                                        <input
                                            type="text"
                                            value={featureData.text}
                                            onChange={(e) => updateFeature("text", e.target.value)}
                                            placeholder="Opis funkcji"
                                            className="border p-2 rounded w-full"
                                        />

                                        <select
                                            value={featureData.icon}
                                            onChange={(e) => updateFeature("icon", e.target.value)}
                                            className="border p-2 rounded"
                                        >
                                            <option value="">Wybierz ikonę</option>
                                            {ICON_OPTIONS.map((opt) => (
                                                <option key={opt.name} value={opt.name}>
                                                    {opt.label}
                                                </option>
                                            ))}

                                        </select>

                                        <select
                                            value={featureData.iconColor || "blue"}
                                            onChange={(e) => updateFeature("iconColor", e.target.value)}
                                            className="border p-2 rounded"
                                        >
                                            {COLOR_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}

                                        </select>

                                        <div className="col-span-3 flex justify-between items-center pt-1">
                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                Podgląd:
                                                {featureData.icon && (
                                                    <FontAwesomeIcon
                                                        icon={ICON_OPTIONS.find((i) => i.name === featureData.icon)?.icon}
                                                        className={`text-${featureData.iconColor || "blue"}-600`}
                                                    />
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = [...formData.features];
                                                    updated.splice(index, 1);
                                                    setFormData((prev) => ({...prev, features: updated}));
                                                }}
                                                className="text-red-500 hover:text-red-700 text-xl"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        features: [...(prev.features || []), {
                                            text: "",
                                            icon: "",
                                            iconColor: "blue"
                                        }],
                                    }))
                                }
                                className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded"
                            >
                                + Dodaj funkcję
                            </button>
                        </div>
                    </div>


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
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                >
                                    Zapisz
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseEditModal;
