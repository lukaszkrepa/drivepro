import React, { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard.jsx";
import InstructorsEditModal from "./InstructorsEditModal.jsx";
import { fetchInstructors } from "../../../services/Instructors/fetchInstructors.js";

const InstructorsMain = () => {
    const [kadra, setKadra] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchInstructors()
            .then(setKadra)
            .catch(console.error);
    }, []);

    const handleEdit = (instructor) => {
        setSelectedInstructor(instructor);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedInstructor({
            Id: Date.now(),
            name: "",
            experience: "",
            imageSrc: "",
            qualifications: [],
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedInstructor(null);
        setIsModalOpen(false);
    };

    const handleSave = (updatedInstructor) => {
        setKadra((prev) => {
            const exists = prev.find((i) => i.Id === updatedInstructor.Id);
            if (exists) {
                return prev.map((i) => (i.Id === updatedInstructor.Id ? updatedInstructor : i));
            }
            return [...prev, updatedInstructor];
        });
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Kadrę Instruktorską</h2>
                    <button
                        onClick={handleAdd}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj instruktora
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {kadra.map((instr) => (
                        <InstructorsCard
                            key={instr.Id}
                            id={instr.Id}
                            imageSrc={instr.imageSrc}
                            imageAlt={instr.imageAlt}
                            name={instr.name}
                            experience={instr.experience}
                            qualifications={instr.qualifications}
                            sort={instr.sort}
                            onEdit={() => handleEdit(instr)}
                            onDelete={() => handleEdit(instr)} // triggers modal with delete option
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && selectedInstructor && (
                <InstructorsEditModal
                    instructor={selectedInstructor}
                    onSave={handleSave}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
};

export default InstructorsMain;
