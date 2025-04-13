import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FAQContact = () => {
    return (
        <div id="faq-contact" className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
                Nie znalazłeś odpowiedzi na swoje pytanie?
            </h3>
            <p className="text-gray-600 mb-6">Skontaktuj się z nami, chętnie pomożemy!</p>
            <div className="flex justify-center space-x-4">
                <a
                    href="tel:+48724755755"
                    className="flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Zadzwoń
                </a>
                <a
                    href="mailto:biuro@drivepro.pl"
                    className="flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Napisz
                </a>
            </div>
        </div>
    );
};

export default FAQContact;