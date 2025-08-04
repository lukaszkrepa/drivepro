import React, { useEffect, useState } from "react";

const HomeSignUpEditModal = ({ item, onSave, onClose, onDelete }) => {
    const [formData, setFormData] = useState({ ...item });

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
        onSave(formData);
    };

    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć ten krok?")) {
            onDelete(formData.Id);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>

                <h3 className="text-2xl font-bold mb-4">Edytuj krok</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        placeholder="Tytuł"
                        className="w-full border p-2 rounded-lg"
                    />
                    <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        placeholder="Opis"
                        className="w-full border p-2 rounded-lg"
                    />

                    <div className="flex justify-end pt-4 border-t mt-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-auto"
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
                            className="px-4 py-2 bg-green-600 text-white rounded-lg"
                        >
                            Zapisz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HomeSignUpEditModal;
