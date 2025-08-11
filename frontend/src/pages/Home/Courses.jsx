import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCar, faGraduationCap, faClock,
    faCheck, faBolt, faGlobe, faRoad
} from '@fortawesome/free-solid-svg-icons';
import { fetchCourses } from "../../services/Courses/fetchCourses.js";
import { useEffect, useState } from "react";
import RegistrationForm from "../../components/RegistrationForm";

const iconMap = {
    car: faCar,
    graduationCap: faGraduationCap,
    clock: faClock,
};

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null); // For modal
    const [courseTag, setCourseTag] = useState(null)
    useEffect(() => {
        fetchCourses()
            .then(setCourses)
            .catch(console.error);
    }, []);


    console.log({
        innerWidth: window.innerWidth,                // layout viewport width (what Tailwind uses)
        visualViewport: window.visualViewport?.width, // visual viewport width
        dpr: window.devicePixelRatio,
        metas: [...document.querySelectorAll('meta[name=viewport]')].map(m=>m.content)
    });

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasze Kursy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                            <div className="text-red-600 text-4xl mb-4">
                                <FontAwesomeIcon icon={iconMap[course.icon]} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <div className="mt-auto">
                                <p className="text-2xl font-bold text-red-600 mb-4 min-h-[2.5rem]">
                                    {course.price || '\u00A0'}
                                </p>
                                <span
                                    className="block text-center bg-red-600 text-white py-2 rounded-full hover:bg-red-700 cursor-pointer"
                                    onClick={() => {
                                        setSelectedCourse(course.title);
                                        setCourseTag(course.tag);
                                    }}
                                >
                                    {course.buttonText}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedCourse && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
                            <button
                                className="absolute top-3 right-5 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                                onClick={() => {
                                    setSelectedCourse(null);
                                    setCourseTag(null)
                                }}
                            >
                                &times;
                            </button>
                            <RegistrationForm
                                preselectedCourse={selectedCourse}
                                english={courseTag === "English"}
                                onClose={() => {
                                    setSelectedCourse(null);
                                    setCourseTag(null)
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Courses;
