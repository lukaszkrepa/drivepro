import React, { useEffect, useState } from "react";
import TestimonialsCard from "./TestimonialsCard.jsx";
import TestimonialEditModal from "./TestimonialEditModal.jsx";
import { fetchTestimonials } from "../../../services/Testimonials/fetchTestimonials.js";
import { addTestimonial } from "../../../services/Testimonials/addTestimonial.js";
import { updateTestimonial } from "../../../services/Testimonials/updateTestimonial.js";
import { deleteTestimonial } from "../../../services/Testimonials/deleteTestimonial.js";

const TestimonialsMain = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchTestimonials()
            .then(setTestimonials)
            .catch(console.error);
    }, []);

    const handleAdd = () => {
        setSelectedItem({
            Id: Date.now(),
            name: "",
            text: "",
            rating: 5,
            type: "testimonial",
            courseInfo: "",
        });
        setIsNew(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsNew(false);
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę opinię?")) return;
        await deleteTestimonial(id);
        setTestimonials((prev) => prev.filter((item) => item.Id !== id));
    };

    const handleSave = async (item) => {
        if (isNew) {
            await addTestimonial(item);
            setTestimonials((prev) => [...prev, item]);
        } else {
            await updateTestimonial(item);
            setTestimonials((prev) =>
                prev.map((t) => (t.Id === item.Id ? item : t))
            );
        }
        setSelectedItem(null);
        setIsNew(false);
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Opinie</h2>
                    <button
                        onClick={handleAdd}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj opinię
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item) => (
                        <TestimonialsCard
                            key={item.Id}
                            {...item}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => handleDelete(item.Id)}
                        />
                    ))}
                </div>
            </div>

            {selectedItem && (
                <TestimonialEditModal
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

export default TestimonialsMain;
