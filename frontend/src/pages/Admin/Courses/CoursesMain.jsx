import React, { useEffect, useState } from "react";
import CoursesCard from "./CoursesCard.jsx";
import { fetchCourses } from "../../../services/fetchCourses.js";

const CoursesMain = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses()
            .then(setCourses)
            .catch(console.error);
    }, []);

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-700">Edytuj Kursy</h2>
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg">
                        <i className="fa-solid fa-plus mr-2"></i>Dodaj kurs
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CoursesCard
                            key={course.id}
                            id={course.id}
                            imageSrc={course.imageSrc}
                            imageAlt={course.imageAlt}
                            title={course.title}
                            tag={course.tag}
                            tagColor={course.tagColor}
                            features={course.features}
                            price={course.price}
                            buttonText={course.buttonText}
                            buttonColor={course.buttonColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesMain;
