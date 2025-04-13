import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGraduationCap, faClock } from '@fortawesome/free-solid-svg-icons';

function Courses() {
    const courses = [
        {
            id: 'course-card-1',
            icon: faCar,
            title: 'Kurs podstawowy kat. B',
            description: '30 godzin teorii + 30 godzin praktyki',
            price: '2499 zł',
            buttonText: 'Zapisz się',
        },
        {
            id: 'course-card-2',
            icon: faGraduationCap,
            title: 'Kurs rozszerzony',
            description: '40 godzin teorii + 40 godzin praktyki',
            price: '3299 zł',
            buttonText: 'Zapisz się',
        },
        {
            id: 'course-card-3',
            icon: faClock,
            title: 'Jazdy dodatkowe',
            description: 'Dodatkowe godziny praktyki',
            price: '99 zł/h',
            buttonText: 'Zamów',
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasze Kursy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
                            <div className="text-red-600 text-4xl mb-4">
                                <FontAwesomeIcon icon={course.icon} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <p className="text-2xl font-bold text-red-600 mb-4">{course.price}</p>
                            <span className="block text-center bg-red-600 text-white py-2 rounded-full hover:bg-red-700 cursor-pointer">
                {course.buttonText}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Courses;