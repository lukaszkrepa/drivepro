import React from "react";

const TestimonialsCard = ({
                              name,
                              text,
                              rating,
                              type,
                              courseInfo,
                              onEdit,
                              onDelete
                          }) => {
    return (
        <div
            onClick={onEdit}
            className="bg-blue-50 p-6 rounded-xl shadow flex flex-col items-center relative group cursor-pointer"
        >
            <div className="bg-white rounded-xl shadow p-4 relative group">
                <div className="flex items-center mb-3">
                    <div>
                        <div className="font-bold text-blue-700">{name}</div>
                        <div className="text-sm text-yellow-600">
                            {`Ocena: ${rating} / 5`}
                        </div>
                    </div>
                </div>

                <p className="text-gray-700 text-sm mb-2">“{text}”</p>

                {type === "featured" && courseInfo && (
                    <div className="text-sm text-blue-500 font-medium">{courseInfo}</div>
                )}

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
        </div>
    );
};

export default TestimonialsCard;
