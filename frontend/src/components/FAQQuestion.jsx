import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const FAQQuestion = ({ id, question, answer, list }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id={id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div
                className="p-6 border-b cursor-pointer hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{question}</h3>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-red-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
                {isOpen && (
                    <div className="mt-4 text-gray-600">
                        {answer && <p className={list ? 'mb-4' : ''}>{answer}</p>}
                        {list && (
                            <ul className="list-disc list-inside space-y-2">
                                {list.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQQuestion;