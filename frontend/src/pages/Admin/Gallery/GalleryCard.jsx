import React from "react";

const GalleryCard = ({ Id, src, alt, title, description, categories = [], onEdit, onDelete }) => (

    <div className="relative group cursor-pointer" onClick={onEdit}>
        <img
            src={src}
            alt={alt || title || "Galeria"}
            className="w-full h-40 object-cover rounded-xl ring-2 ring-blue-200"
        />

        {(title || description) && (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 rounded-b-xl text-sm">
                {title && <div className="font-semibold">{title}</div>}
                {description && <div className="text-xs">{description}</div>}
            </div>
        )}
        {categories && categories.length > 0 && (
            <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                {categories.map((cat, idx) => (
                    <span key={idx} className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cat}
            </span>
                ))}
            </div>
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
);

export default GalleryCard;
