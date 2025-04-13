import React from 'react';

const RegistrationForm = () => {
    return (
        <section id="registration-form" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Formularz zapisowy</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="firstName">
                                        Imię
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="courseType">
                                    Rodzaj kursu
                                </label>
                                <select
                                    id="courseType"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                >
                                    <option>Kurs podstawowy kat. B</option>
                                    <option>Kurs rozszerzony</option>
                                    <option>Jazdy dodatkowe</option>
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