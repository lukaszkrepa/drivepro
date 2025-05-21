import React, { useEffect, useState } from "react";
import CoursesCard from "./CoursesCard.jsx";
import { fetchCourses } from "../../../services/Courses/fetchCourses.js";
import { addCourse } from "../../../services/Courses/addCourse.js";
import { deleteCourse } from "../../../services/Courses/deleteCourse.js";
import CourseEditModal from "./CourseEditModal.jsx";

const CoursesMain = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        fetchCourses()
            .then(setCourses)
            .catch(console.error);
    }, []);

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setIsNew(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten kurs?")) return;

        try {
            await deleteCourse(id);
            setCourses((prev) => prev.filter((course) => course.id !== id));
        } catch (err) {
            console.error("Błąd podczas usuwania kursu:", err);
        }
    };

    const handleClose = () => {
        setSelectedCourse(null);
        setIsNew(false);
    };
    const handleAddCourse = () => {
        setSelectedCourse({
            id: Date.now(),
            title: "",
            price: "",
            tag: "",
            tagColor: "blue",
            imageSrc: "",
            imageAlt: "",
            icon: "",
            buttonText: "Zapisz się",
            buttonColor: "blue",
            features: [],
        });
        setIsNew(true);
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Kursy</h2>
                    <button
                        onClick={handleAddCourse}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj kurs
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CoursesCard
                            key={course.id}
                            {...course}
                            onEdit={() => handleEdit(course)}
                            onDelete={() => handleDelete(course.id)}
                        />

                    ))}
                </div>
            </div>

            {selectedCourse && (
                <CourseEditModal
                    course={selectedCourse}
                    onSave={async (updatedCourse) => {
                        if (isNew) {
                            await addCourse(updatedCourse);
                            setCourses((prev) => [...prev, updatedCourse]);
                        } else {
                            await updateCourse(updatedCourse);
                            setCourses((prev) =>
                                prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
                            );
                        }
                        handleClose();
                    }}
                    onClose={handleClose}
                />
            )}
        </section>
    );
};

export default CoursesMain;
