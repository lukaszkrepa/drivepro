import React, { useEffect, useState } from "react";
import {deleteTestimonial} from "../../../services/Testimonials/deleteTestimonial.js";

const TestimonialEditModal = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        ...item,
        type: item.type || "testimonial",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData });
    };

    const handleDelete = async () => {
        if (!window.confirm("Czy napewno chcesz usunąć?")) return;

        try {
            await deleteTestimonial(formData.Id);
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

                <h3 className="text-2xl font-bold mb-4">Edytuj opinię</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        placeholder="Imię i nazwisko"
                        className="w-full border p-2 rounded-lg"
                    />
                    <textarea
                        name="text"
                        value={formData.text || ""}
                        onChange={handleChange}
                        placeholder="Treść opinii"
                        className="w-full border p-2 rounded-lg"
                    />

                    <input
                        name="rating"
                        type="number"
                        step="0.5"
                        min="0"
                        max="5"
                        value={formData.rating || ""}
                        onChange={handleChange}
                        placeholder="Ocena (0–5)"
                        className="w-full border p-2 rounded-lg"
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg"
                    >
                        <option value="testimonial">Zwykła opinia</option>
                        <option value="featured">Wyróżniona opinia (Bardziej widoczna na stronie)</option>
                    </select>

                    {formData.type === "featured" && (
                        <input
                            name="courseInfo"
                            value={formData.courseInfo || ""}
                            onChange={handleChange}
                            placeholder="Informacja o kursie (Np data ukończenia)"
                            className="w-full border p-2 rounded-lg"
                        />
                    )}

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

export default TestimonialEditModal;
