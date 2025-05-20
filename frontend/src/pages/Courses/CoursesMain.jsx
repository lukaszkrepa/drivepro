import React, {useEffect, useState} from 'react';
import CourseCard from '../../components/CourseCard';

import {fetchCourses} from "../../services/Courses/fetchCourses.js";


const CoursesMain = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses()
            .then(setCourses)
            .catch(console.error);
    }, []);
    return (
        <section id="courses-main" className="py-20">
            <div className="container mx-auto px4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard
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