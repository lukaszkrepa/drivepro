import React from "react";

const HomeSignUpCard = ({ title, description, onEdit, onDelete }) => {
    return (
        <div
            className="bg-blue-50 p-5 rounded-xl shadow group relative cursor-pointer"
            onClick={onEdit}
        >
            <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-blue-700">{title}</span>

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

            <p className="text-gray-700">{description}</p>
        </div>
    );
};

export default HomeSignUpCard;
