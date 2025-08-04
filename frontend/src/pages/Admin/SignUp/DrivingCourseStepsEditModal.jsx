import React, { useEffect, useState } from "react";

const DrivingCourseStepsEditModal = ({ item, onSave, onDelete, onClose }) => {
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

    const handleDetailChange = (index, field, value) => {
        const updated = [...(formData.details || [])];
        updated[index] = { ...updated[index], [field]: value };
        setFormData((prev) => ({ ...prev, details: updated }));
    };

    const handleListChange = (index, list) => {
        const updated = [...formData.details];
        updated[index].list = list;
        setFormData((prev) => ({ ...prev, details: updated }));
    };

    const handleAddDetail = () => {
        setFormData((prev) => ({
            ...prev,
            details: [...(prev.details || []), { text: "", list: [], highlight: false }],
        }));
    };

    const handleRemoveDetail = (index) => {
        const updated = [...formData.details];
        updated.splice(index, 1);
        setFormData((prev) => ({ ...prev, details: updated }));
    };

    const handleToggleHighlight = (index) => {
        const updated = [...formData.details];
        updated[index].highlight = !updated[index].highlight;
        setFormData((prev) => ({ ...prev, details: updated }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, stepNumber: Number(formData.stepNumber) });
    };

    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć ten krok?")) {
            onDelete(formData.id);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>

                <h3 className="text-2xl font-bold mb-4">Edytuj krok kursu</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        name="title"
                        value={formData.title || ""}
                        onChange={handleChange}
                        placeholder="Tytuł"
                        className="w-full border p-2 rounded-lg"
                    />
                    <input
                        name="stepNumber"
                        value={formData.stepNumber || ""}
                        onChange={handleChange}
                        placeholder="Numer kroku"
                        type="number"
                        className="w-full border p-2 rounded-lg"
                    />

                    <div>
                        <div className="font-semibold mb-2">Szczegóły:</div>
                        {(formData.details || []).map((detail, idx) => (
                            <div key={idx} className="mb-6 border border-gray-200 p-3 rounded-md space-y-2">
                                <label className="block text-sm font-medium">Nagłówek:</label>
                                <input
                                    type="text"
                                    value={detail.text || ""}
                                    onChange={(e) => handleDetailChange(idx, "text", e.target.value)}
                                    placeholder="Nagłówek"
                                    className="w-full border p-2 rounded"
                                />

                                <label className="block text-sm font-medium">Lista (po jednej linii):</label>
                                <textarea
                                    value={(detail.list || []).join("\n")}
                                    onChange={(e) =>
                                        handleListChange(idx, e.target.value.split("\n").filter(Boolean))
                                    }
                                    placeholder="Lista"
                                    className="w-full border p-2 rounded resize-y min-h-[100px] max-h-[300px]"
                                />

                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={detail.highlight || false}
                                        onChange={() => handleToggleHighlight(idx)}
                                        className="form-checkbox"
                                    />
                                    Wyróżnij ten szczegół
                                </label>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveDetail(idx)}
                                    className="text-red-500 mt-2 text-sm"
                                >
                                    Usuń szczegół
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddDetail}
                            className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded"
                        >
                            + Dodaj szczegół
                        </button>
                    </div>

                    <div className="flex justify-end pt-4 border-t mt-6">
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
                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                        >
                            Zapisz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DrivingCourseStepsEditModal;
