import React from "react";
import {
    faCar,
    faCalendar,
    faGear,
    faGauge,
    faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconMap = {
    year: faCalendar,
    transmission: faGear,
    steering: faGauge,
    safety: faShield,
};
const CarsCard = ({ name, imageSrc, details = [], onEdit, onDelete }) => {
    return (
        <div
            className="bg-blue-50 p-5 rounded-xl shadow group relative cursor-pointer"
            onClick={onEdit}
        >
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                />
            )}

            <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-blue-700">{name}</span>

                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <i className="fa-regular fa-pen-to-square text-lg"></i>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="text-red-500 hover:text-red-700"
                    >
                        <i className="fa-solid fa-trash text-lg"></i>
                    </button>
                </div>
            </div>

            {details.length > 0 && (
                <ul className="text-gray-700 list-disc list-inside space-y-1 mt-2">
                    {details.map((detail, index) => {
                        const icon = iconMap[detail.type] || faCar; // fallback to faCar
                        return (
                            <li key={index} className="flex items-center space-x-2">
                                <i className={`fa-solid fa-${detail.type} text-blue-600`}>
                                    <FontAwesomeIcon icon={icon} className="mr-2 text-blue-500" />
                                </i>
                                <span>{detail.text}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default CarsCard;
