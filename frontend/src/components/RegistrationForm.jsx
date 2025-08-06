import React, { useState } from 'react';

const RegistrationForm = ({ preselectedCourse, onClose, english = false }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pkk: '',
        pesel: '',
        instagram: '',
        courseType: preselectedCourse || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.pkk || formData.pkk.length !== 20) {
            alert(
                english
                    ? "PKK number must be exactly 20 characters."
                    : "Numer PKK musi mieć dokładnie 20 znaków."
            );
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
                alert(english ? "We will contact you soon!" : "Wkrótce się z tobą skontaktujemy!");
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    pkk: '',
                    pesel: '',
                    instagram: '',
                    courseType: preselectedCourse || '',
                });
                if (onClose) onClose();
            } else {
                console.error(result.error);
                alert(
                    english
                        ? "Unexpected error occurred. Try again later or give us a call!"
                        : "Wystąpił błąd. Spróbuj ponownie później albo do nas zadzwoń!"
                );
            }
        } catch (err) {
            console.error("Request error:", err);
            alert(
                english
                    ? "An error occurred while sending the form."
                    : "Wystąpił błąd podczas wysyłania formularza."
            );
        }
    };

    const isDodatkowe = preselectedCourse?.toUpperCase().includes("DODATKOWE");

    if (isDodatkowe) {
        return (
            <div className=" text-black-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">
                    {english ? "Individual Contact Required" : "Wymagany indywidualny kontakt"}
                </h2>
                <p>
                    {english
                        ? "This course requires individual arrangements. Please contact us by phone at "
                        : "Ten kurs wymaga kontaktu telefonicznego. Skontaktuj się z nami telefonicznie pod numerem "}
                    <a href="tel:+48724755755" className="text-red-600 font-semibold hover:underline">
                        +48 724 755 755
                    </a>
                    .
                </p>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-4">
                {english ? "Signup Form" : "Formularz zapisowy"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="firstName">
                        {english ? "First Name" : "Imię"}
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
                        {english ? "Last Name" : "Nazwisko"}
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
                    {english ? "Phone" : "Telefon"}
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
                    {english ? "PKK Number" : "Numer PKK"}
                </label>
                <input
                    type="text"
                    id="pkk"
                    value={formData.pkk}
                    onChange={handleChange}
                    maxLength={20}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {!english && (
                    <p className="text-sm text-gray-600 mt-2">
                        Nie masz jeszcze PKK?{" "}
                        <a href="/signup" className="text-red-600 hover:underline">
                            Kliknij tutaj aby dowiedzieć się jak je wyrobić!
                        </a>
                    </p>
                )}
            </div>

            <div>
                <label className="block text-gray-700 mb-2" htmlFor="pesel">
                    PESEL
                </label>
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
                <label className="block text-gray-700 mb-2" htmlFor="instagram">
                    Instagram ({english ? "optional" : "opcjonalnie"})
                </label>
                <input
                    type="text"
                    id="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@twojnick"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">
                    {english ? "Course Type" : "Rodzaj kursu"}
                </label>
                <input
                    type="text"
                    value={preselectedCourse}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
                {english ? "Sign up for the course" : "Zapisz się na kurs"}
            </button>
        </form>
    );
};

export default RegistrationForm;
