import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGraduationCap, faClock } from '@fortawesome/free-solid-svg-icons';
import {fetchCourses} from "../../services/Courses/fetchCourses.js";
import {useEffect, useState} from "react";
const iconMap = {
    faCar: faCar,
    faGraduationCap: faGraduationCap,
    faClock: faClock,
};

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses()
            .then(setCourses)
            .catch(console.error);
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasze Kursy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="text-red-600 text-4xl mb-4">
                                <FontAwesomeIcon icon={iconMap[course.icon]} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <div className="mt-auto">
                                <p className="text-2xl font-bold text-red-600 mb-4 min-h-[2.5rem]">
                                    {course.price || '\u00A0' /* Non-breaking space to keep height */}
                                </p>
                                <span
                                    className="block text-center bg-red-600 text-white py-2 rounded-full hover:bg-red-700 cursor-pointer">
                                    {course.buttonText}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Courses;