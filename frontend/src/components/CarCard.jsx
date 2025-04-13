import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCalendar, faGear, faGauge, faShield } from '@fortawesome/free-solid-svg-icons';

const CarCard = ({ id, name, details }) => {
    const icons = {
        year: faCalendar,
        transmission: faGear,
        steering: faGauge,
        safety: faShield,
    };

    return (
        <div id={id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faCar} className="text-6xl text-red-600" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{name}</h3>
                <div className="space-y-2 text-gray-600">
                    {details.map((detail, index) => (
                        <p key={index}>
                            <FontAwesomeIcon icon={icons[detail.type]} className="mr-2" />
                            {detail.text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarCard;