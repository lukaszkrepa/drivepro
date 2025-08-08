import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBolt, faGlobe, faClock, faCar, faRoad } from '@fortawesome/free-solid-svg-icons';
import RegistrationForm from './RegistrationForm';

const CourseCard = ({
                        id,
                        imageSrc,
                        imageAlt,
                        title,
                        tag,
                        tagColor,
                        features,
                        price,
                        buttonText,
                        buttonColor,
                    }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const iconMap = {
        check: faCheck,
        bolt: faBolt,
        globe: faGlobe,
        clock: faClock,
        car: faCar,
        road: faRoad,
    };

    return (
        <>
            <div id={id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                    <img className="w-full h-full object-cover" src={imageSrc} alt={imageAlt} />
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{title}</h3>
                        <span className={`bg-${tagColor}-100 text-${tagColor}-600 px-3 py-1 rounded-full text-sm`}>
                            {tag}
                        </span>
                    </div>
                    <ul className="space-y-2 mb-6 text-sm">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <FontAwesomeIcon
                                    icon={iconMap[feature.icon]}
                                    className="mr-2 text-red-500"
                                />
                                {feature.text}
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between items-center">
                        <span className={`text-2xl font-bold text-${buttonColor}-600`}>{price}</span>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={`bg-${buttonColor}-600 text-white px-4 py-2 rounded-lg hover:bg-${buttonColor}-700 transition-colors`}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
                        <button
                            className="absolute top-3 right-5 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </button>
                        <RegistrationForm
                            preselectedCourse={title}
                            english={tag === "English"}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseCard;
