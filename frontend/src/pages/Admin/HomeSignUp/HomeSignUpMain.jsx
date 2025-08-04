import React, { useEffect, useState } from "react";
import HomeSignUpCard from "./HomeSignUpCard.jsx";
import HomeSignUpEditModal from "./HomeSignUpEditModal.jsx";

import { fetchHomeSteps } from "../../../services/HomeSteps/fetchSteps.js";
import { addStep } from "../../../services/HomeSteps/addStep.js";
import { updateStep } from "../../../services/HomeSteps/updateSteps.js";
import { deleteStep } from "../../..//services/HomeSteps/deleteStep.js";

const HomeSignUpMain = () => {
    const [steps, setSteps] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchHomeSteps()
            .then(setSteps)
            .catch(console.error);
    }, []);

    const handleAdd = () => {
        setSelectedItem({ Id: Date.now(), title: "", description: "" });
        setIsNew(true);
    };

    const handleEdit = (step) => {
        setSelectedItem(step);
        setIsNew(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten krok?")) return;
        try {
            await deleteStep(id);
            setSteps((prev) => prev.filter((s) => s.Id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleSave = async (item) => {
        try {
            if (isNew) {
                await addStep(item);
                setSteps((prev) => [...prev, item]);
            } else {
                await updateStep(item);
                setSteps((prev) =>
                    prev.map((s) => (s.Id === item.Id ? item : s))
                );
            }
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSelectedItem(null);
            setIsNew(false);
        }
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Kroki zapisu</h2>
                    <button
                        onClick={handleAdd}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj krok
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.sort((a, b) => a.title.localeCompare(b.title)).map((step) => (
                        <HomeSignUpCard
                            key={step.Id}
                            {...step}
                            onEdit={() => handleEdit(step)}
                            onDelete={() => handleDelete(step.Id)}
                        />
                    ))}
                </div>
            </div>

            {selectedItem && (
                <HomeSignUpEditModal
                    item={selectedItem}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={() => {
                        setSelectedItem(null);
                        setIsNew(false);
                    }}
                />
            )}
        </section>
    );
};

export default HomeSignUpMain;
