import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const InstructorCard = ({ id, imageSrc, imageAlt = 'Instruktor', name, experience, qualifications }) => {
    return (
        <div id={id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img src={imageSrc} className="w-full h-64 object-cover" alt={imageAlt} />
            <div className="p-6">
                <div className="text-xl font-bold mb-2 text-center">
                    {typeof name === "string"
                        ? name.split(/<br\s*\/?>/gi).map((line, idx) => (
                            <div key={idx}>{line}</div>
                        ))
                        : name}
                </div>

                <p className="text-gray-600 mb-4">{experience}</p>
                <div className="space-y-2 text-gray-600">
                    {qualifications.map((qual, index) => (
                        <p key={index}>
                            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-2"/>
                            {qual}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;