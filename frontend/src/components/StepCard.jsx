import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, fa4, fa5 } from '@fortawesome/free-solid-svg-icons';

const StepCard = ({ id, stepNumber, title, details }) => {
    const numberIcons = [fa1, fa2, fa3, fa4, fa5]; // Map step numbers to Font Awesome icons

    return (
        <div id={id} className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
                <div className="text-4xl text-red-600 mr-6">
                    <FontAwesomeIcon icon={numberIcons[stepNumber - 1]} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4">{title}</h3>
                    <div className="space-y-3 text-gray-600">
                        {details.map((item, index) => (
                            <div key={index}>
                                {item.text && <p>{item.text}</p>}
                                {item.list && (
                                    <ul className="list-disc ml-6 space-y-2">
                                        {item.list.map((listItem, i) => (
                                            <li key={i}>{listItem}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepCard;