import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faBolt,
    faGlobe,
    faClock,
    faCar,
    faRoad,
} from '@fortawesome/free-solid-svg-icons';

const InstructorsCard = ({
                             id,
                             imageSrc,
                             imageAlt,
                             name,
                             experience,
                             qualifications = [],
                             onEdit,
                             sort,
                             onDelete,
                         }) => {
    const ICON_MAP = {
        check: faCheck,
        bolt: faBolt,
        globe: faGlobe,
        clock: faClock,
        car: faCar,
        road: faRoad,
    };

    return (

        <div
            onClick={onEdit}
            className="bg-blue-50 p-6 rounded-xl shadow flex flex-col items-center relative group cursor-pointer"
        >
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt || name}
                    className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow object-cover object-center"
                />
            )}
            <div className="text-xl font-bold mb-1">{name}</div>
            <div className="text-gray-600 mb-2">{experience}</div>
            <div className="text-gray-600 mb-2">{sort}</div>


            <ul className="text-gray-700 text-sm text-center mb-3 space-y-1">

                {qualifications.map((q, index) => (
                    <li key={index} className="flex justify-center items-center space-x-2">
                        {typeof q === "object" ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={`mr-2 text-green-500`}
                                />
                                <span>{q.text}</span>
                            </>
                        ) : (
                            <div>
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={`mr-2 text-green-500`}
                                />
                                <span>{q}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // prevent card click from triggering
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
    );
};

export default InstructorsCard;
