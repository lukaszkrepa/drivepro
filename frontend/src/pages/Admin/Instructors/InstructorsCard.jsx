import React from "react";

const InstructorsCard = ({
                             id,
                             imageSrc,
                             imageAlt,
                             name,
                             experience,
                             qualifications = [],
                             onEdit,
                             onDelete,
                         }) => {
    return (
        <div className="bg-blue-50 p-6 rounded-xl shadow flex flex-col items-center relative group">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt || name}
                    className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow"
                />
            )}
            <div className="text-xl font-bold mb-1">{name}</div>
            <div className="text-gray-600 mb-2">{experience}</div>
            <ul className="text-gray-700 text-sm text-center mb-3 space-y-1">
                {qualifications.map((q, index) => (
                    <li key={index} className="flex justify-center items-center space-x-2">
                        {typeof q === "object" ? (
                            <>
                                {q.icon && (
                                    <i className={`fa-solid fa-${q.icon} text-${q.iconColor || "blue"}-600`}></i>
                                )}
                                <span>{q.text}</span>
                            </>
                        ) : (
                            <span>{q}</span>
                        )}
                    </li>
                ))}
            </ul>
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                    <i className="fa-regular fa-pen-to-square text-lg"></i>
                </button>
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                    <i className="fa-solid fa-trash text-lg"></i>
                </button>
            </div>
        </div>
    );
};

export default InstructorsCard;
