// components/DrivingCourseStepsMain.jsx
import React, { useEffect, useState } from "react";
import DrivingCourseStepsCard from "./DrivingCourseStepsCard.jsx";
import DrivingCourseStepsEditModal from "./DrivingCourseStepsEditModal.jsx";

import { fetchDrivingSteps } from "../../../services/DrivingCourseSteps/fetchStep.js";
import { addDrivingStep } from "../../../services/DrivingCourseSteps/addStep.js";
import { updateDrivingStep } from "../../../services/DrivingCourseSteps/updateStep.js";
import { deleteDrivingStep } from "../../../services/DrivingCourseSteps/deleteStep.js";

const DrivingCourseStepsMain = () => {
    const [steps, setSteps] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchDrivingSteps().then(setSteps).catch(console.error);
    }, []);

    const handleAdd = () => {
        setSelectedItem({ id: Date.now(), title: "", stepNumber: "", details: [] });
        setIsNew(true);
    };

    const handleEdit = (step) => {
        setSelectedItem(step);
        setIsNew(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten krok?")) return;
        await deleteDrivingStep(id);
        setSteps((prev) => prev.filter((s) => s.id !== id));
    };

    const handleSave = async (item) => {
        if (isNew) {
            await addDrivingStep(item);
            setSteps((prev) => [...prev, item]);
        } else {
            await updateDrivingStep(item);
            setSteps((prev) => prev.map((s) => (s.id === item.id ? item : s)));
        }
        setSelectedItem(null);
        setIsNew(false);
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-yellow-700">Kroki kursu prawa jazdy</h2>
                    <button
                        onClick={handleAdd}
                        className="px-5 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj krok
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <DrivingCourseStepsCard
                            key={step.id}
                            {...step}
                            onEdit={() => handleEdit(step)}
                            onDelete={() => handleDelete(step.id)}
                        />
                    ))}
                </div>
            </div>

            {selectedItem && (
                <DrivingCourseStepsEditModal
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

export default DrivingCourseStepsMain;
