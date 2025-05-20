import React from "react";
import { faCheck, faBolt, faGlobe, faClock, faCar, faRoad } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CoursesCard = ({
                         id,
                         icon,
                         imageSrc,
                         imageAlt,
                         title,
                         tag,
                         tagColor = "blue",
                         features = [],
                         price,
                         buttonText = "Zapisz się",
                         buttonColor = "blue",
                         onEdit,
                         onDelete
                     }) => {
    const iconMap = {
        check: faCheck,
        bolt: faBolt,
        globe: faGlobe,
        clock: faClock,
        car: faCar,
        road: faRoad,
    };
    return (

        <div

            className="bg-blue-50 p-6 rounded-xl shadow relative group cursor-pointer"
            onClick={onEdit}
        >
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt || title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                />
            )}

            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    {icon && <i className={`fa-solid fa-${icon} text-2xl text-blue-600 mr-2`}></i>}
                    <span className="font-bold text-xl">{title}</span>
                </div>
                {tag && (
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full bg-${tagColor}-100 text-${tagColor}-700`}>
                        {tag}
                    </span>
                )}
            </div>

            <ul className="text-gray-700 mb-2 list-disc list-inside space-y-1">
                {features.map((feature, index) => {
                    const isObject = typeof feature === "object" && feature !== null;
                    return (
                        <li key={index} className="flex items-center space-x-2">
                            {isObject && feature.icon && (
                                <i className={`fa-solid fa-${feature.icon} text-${feature.iconColor || "blue"}-600`}>
                                    <FontAwesomeIcon
                                        icon={iconMap[feature.icon]}
                                        className={`mr-2 text-${feature.iconColor}-500`}

                                    />
                                </i>
                            )}
                            <span>{isObject ? feature.text : feature}</span>
                        </li>
                    );
                })}
            </ul>

            <div className="text-blue-700 font-extrabold text-2xl mb-4">{price}</div>

            <button
                className={`w-full py-2 rounded-lg font-semibold text-white bg-${buttonColor}-600 hover:bg-${buttonColor}-700 transition`}
            >
                {buttonText}
            </button>

            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
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
    );
};

export default CoursesCard;
