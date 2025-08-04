import React from "react";

const DrivingCourseStepsCard = ({ title, details, onEdit, onDelete }) => {
    return (
        <div
            className="bg-yellow-50 p-5 rounded-xl shadow group relative cursor-pointer"
            onClick={onEdit}
        >
            <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-yellow-700">{title}</span>

                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="text-yellow-600 hover:text-yellow-800"
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

            {details && details.length > 0 && (
                <ul className="mt-3 text-gray-700 space-y-2">
                    {details.map((block, idx) => (
                        <li key={idx}>
                            <div className="font-semibold">{block.text}</div>
                            {block.list && (
                                <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                                    {block.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DrivingCourseStepsCard;
