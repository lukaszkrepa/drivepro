import React from "react";

const FaqCard = ({ id, question, answer, list = [], onEdit, onDelete }) => (
    <div className="bg-blue-50 p-5 rounded-xl shadow group relative">
        <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg text-blue-700">{question}</span>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                    <i className="fa-regular fa-pen-to-square text-lg"></i>
                </button>
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                    <i className="fa-solid fa-trash text-lg"></i>
                </button>
            </div>
        </div>

        <div className="text-gray-700 mb-2">{answer}</div>

        {list.length > 0 && (
            <ul className="text-gray-600 list-disc list-inside space-y-1">
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        )}
    </div>
);

export default FaqCard;
