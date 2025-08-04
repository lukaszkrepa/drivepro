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
        courseType: '',
    });


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

        // Basic validation for PKK
        if (!formData.pkk) {
            alert("Numer PKK jest wymagany.");
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
                alert("Wkrótce się z tobą skontaktujemy!");
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    pkk: '',
                    courseType: '',
                });
            } else {
                console.log(result.error)
                alert("Wystąpił błąd. Spróbuj ponownie później albo do nas zadzwoń!")
            }
        } catch (err) {
            console.error("Request error:", err);
            alert("Wystąpił błąd podczas wysyłania formularza.");
        }
    };

    return (
        <section id="registration-form" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Formularz zapisowy</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="firstName">
                                        Imię
                                    </label>
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
                                    <label className="block text-gray-700 mb-2" htmlFor="lastName">
                                        Nazwisko
                                    </label>
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
                                <label className="block text-gray-700 mb-2" htmlFor="email">
                                    Email
                                </label>
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
                                <label className="block text-gray-700 mb-2" htmlFor="phone">
                                    Telefon
                                </label>
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
                                <label className="block text-gray-700 mb-2" htmlFor="pkk">
                                    Numer PKK
                                </label>
                                <input
                                    type="text"
                                    id="pkk"
                                    value={formData.pkk}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                                <p className="text-sm text-gray-600 mt-2">
                                    Nie masz jeszcze PKK? <a href="#" className="text-red-600 hover:underline">Kliknij tutaj aby dowiedzieć się jak je wyrobić!</a>
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="courseType">
                                    Rodzaj kursu
                                </label>
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
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                Zapisz się na kurs
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;
