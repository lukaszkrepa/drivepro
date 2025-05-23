import React, { useEffect, useState } from "react";
import {deleteFaqItem} from "../../../services/Faq/deleteFaqItem.js";

const FaqEditModal = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        ...item,
        list: item.list || [],
        listString: (item.list || []).join(", "),
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
        const list = formData.listString
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);
        const { listString, ...cleanedData } = formData;
        onSave({ ...cleanedData, list });
    };
    const handleDelete = async () => {
        if (!window.confirm("Czy napewno chcesz usunąć?")) return;

        try {
            await deleteFaqItem(formData.Id);
            onClose();
            // window.location.reload();
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

                <h3 className="text-2xl font-bold mb-4">Edytuj FAQ</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Pytanie:</label>
                        <input
                            name="question"
                            value={formData.question || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Odpowiedź:</label>
                        <textarea
                            name="answer"
                            value={formData.answer || ""}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Lista (oddzielone przecinkami):</label>
                        <input
                            name="listString"
                            value={formData.listString}
                            onChange={handleChange}
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

export default FaqEditModal;
