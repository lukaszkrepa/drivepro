import React, { useEffect, useState } from 'react';
import { fetchCourses } from "../../services/Courses/fetchCourses.js";

const RegistrationForm = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pkk: '',
        pesel: '',
        instagram: '',
        courseType: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        fetchCourses()
            .then(setCourses)
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.pkk || formData.pkk.length !== 20) {
            alert("Numer PKK musi mieć dokładnie 20 znaków.");
            return;
        }

        try {
            const response = await fetch("https://p1iy4vg2i2.execute-api.eu-central-1.amazonaws.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setShowSuccess(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    pkk: '',
                    pesel: '',
                    instagram: '',
                    courseType: '',
                });
            } else {
                console.log(result.error);
                alert("Wystąpił błąd. Spróbuj ponownie później albo do nas zadzwoń!");
            }
        } catch (err) {
            console.error("Request error:", err);
            alert("Wystąpił błąd podczas wysyłania formularza.");
        }
    };

    const isDodatkowe = formData.courseType?.toUpperCase().includes("DODATKOWE");

    return (
        <section id="registration-form" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Formularz zapisowy</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                        <>

                        {/* Course type selector is always visible */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="courseType">Rodzaj kursu</label>
                            <select
                                id="courseType"
                                value={formData.courseType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                <option value="" disabled>Wybierz kurs</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.title}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Conditional content depending on course type */}
                        {isDodatkowe ? (
                            <div className="text-black-800">
                                <h3 className="text-xl font-bold mb-2">Wymagany indywidualny kontakt</h3>
                                <p>
                                    Ten kurs wymaga kontaktu telefonicznego. Skontaktuj się z nami pod numerem{' '}
                                    <a href="tel:+48724755755" className="text-red-600 font-semibold hover:underline">
                                        +48 724 755 755
                                    </a>
                                    .
                                </p>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="firstName">Imię</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2" htmlFor="lastName">Nazwisko</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="phone">Telefon</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="pkk">Numer PKK</label>
                                    <input
                                        type="text"
                                        id="pkk"
                                        value={formData.pkk}
                                        onChange={handleChange}
                                        required
                                        maxLength={20}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    <p className="text-sm text-gray-600 mt-2">
                                        Nie masz jeszcze PKK?{' '}
                                        <a href="#" className="text-red-600 hover:underline">
                                            Kliknij tutaj aby dowiedzieć się jak je wyrobić!
                                        </a>
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="pesel">PESEL</label>
                                    <input
                                        type="text"
                                        id="pesel"
                                        value={formData.pesel}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="instagram">Instagram</label>
                                    <input
                                        type="text"
                                        id="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        placeholder="@twojnick"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                                >
                                    Zapisz się na kurs
                                </button>
                            </form>
                        )}
                        </>
                    </div>
                </div>
            </div>
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative mx-4">
                        <button
                            className="absolute top-3 right-5 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                            onClick={() => setShowSuccess(false)}
                            aria-label="Zamknij"
                        >
                            &times;
                        </button>
                        <div className="text-center">
                            <h3 className="text-2xl font-extrabold mb-2">DRIVE PRO</h3>
                            <p className="text-lg font-semibold mb-4">Dziękujemy za zaufanie !</p>
                            <ul className="space-y-2 text-left">
                                <li>+ w ciągu 48h na mail otrzymasz umowę ( podpisz, zeskanuj, odeślij)</li>
                                <li>+ w ciągu 48h otrzymasz wiadomość SMS  " CCDAd" z kodami umożliwiającymi rozpoczęcie nauki on-line. Możesz się też zalogować na Naszej stronie w zakładce " TEORIA ON LINE"</li>
                                <li>+ na FB do znajomych dodaj Grzegorza Krępa, który udostępni Tobie dostęp na FB do " grupy zamkniętej sDrive Pro"</li>
                                <li>+ w ciagu 7 dni skontaktujemy się z Tobą telefonicznie  i ustalimy szczegóły rozpoczęcia szkolenia</li>
                                <li>+ jeśli masz pytania DZWOŃ!!!  jesteśmy do Twojej dyspozycji</li>
                            </ul>
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Zamknij
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default RegistrationForm;
