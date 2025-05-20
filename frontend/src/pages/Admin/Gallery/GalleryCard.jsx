import React from "react";

const GalleryCard = ({ id, src, alt, title, description, onEdit, onDelete }) => (
    <div className="relative group">
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

        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
            <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
                <i className="fa-regular fa-pen-to-square text-lg"></i>
            </button>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                <i className="fa-solid fa-trash text-lg"></i>
            </button>
        </div>
    </div>
);

export default GalleryCard;
