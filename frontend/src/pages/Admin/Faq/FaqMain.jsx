import React, { useEffect, useState } from "react";
import FaqCard from "./FaqCard.jsx";
import FaqEditModal from "./FaqEditModal.jsx";
import { fetchFaq } from "../../../services/Faq/fetchFaq.js";
import { addFaqItem } from "../../../services/Faq/addFaqItem.js";
import { updateFaqItem } from "../../../services/Faq/updateFaqItem.js";
import { deleteFaqItem } from "../../../services/Faq/deleteFaqItem.js";

const FaqMain = () => {
    const [faq, setFaq] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchFaq()
            .then(setFaq)
            .catch(console.error);
    }, []);

    const handleAdd = () => {
        setSelectedItem({
            Id: Date.now(),
            question: "",
            answer: "",
            list: [],
        });
        setIsNew(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsNew(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć to pytanie?")) return;
        await deleteFaqItem(id);
        setFaq((prev) => prev.filter((item) => item.Id !== id));
    };

    const handleSave = async (item) => {
        if (isNew) {
            await addFaqItem(item);
            setFaq((prev) => [...prev, item]);
        } else {
            await updateFaqItem(item);
            setFaq((prev) =>
                prev.map((f) => (f.Id === item.Id ? item : f))
            );
        }
        setSelectedItem(null);
        setIsNew(false);
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Pytania i Odpowiedzi</h2>
                    <button
                        onClick={handleAdd}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj pytanie
                    </button>
                </div>

                <div className="space-y-5">
                    {faq.map((item) => (
                        <FaqCard
                            key={item.Id}
                            {...item}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => handleDelete(item.Id)}
                        />
                    ))}
                </div>
            </div>

            {selectedItem && (
                <FaqEditModal
                    item={selectedItem}
                    onSave={handleSave}
                    onClose={() => {
                        setSelectedItem(null);
                        setIsNew(false);
                    }}
                />
            )}
        </section>
    );
};

export default FaqMain;
