import React from 'react';

const LoadMoreButton = () => {
    return (
        <div className="text-center py-12">
            <button
                id="load-more"
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
                Załaduj więcej zdjęć
                <i className="fa-solid fa-arrow-down ml-2"></i>
            </button>
        </div>
    );
};

export default LoadMoreButton;