import React from 'react';

const GalleryItem = ({ id, src, alt, title, description }) => {
    return (
        <div id={id} className="group relative overflow-hidden rounded-lg cursor-pointer">
            <img
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                src={src}
                alt={alt}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default GalleryItem;