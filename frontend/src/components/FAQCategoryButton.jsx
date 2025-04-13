import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCarSide,
    faMoneyBill,
    faClipboardList,
    faBook,
} from '@fortawesome/free-solid-svg-icons';

const FAQCategoryButton = ({ id, icon, label, isActive, onClick }) => {
    const iconMap = {
        'car-side': faCarSide,
        'money-bill': faMoneyBill,
        'clipboard-list': faClipboardList,
        book: faBook,
    };

    return (
        <button
            id={id}
            className={`py-3 px-6 rounded-lg transition-colors flex items-center justify-center ${
                isActive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={iconMap[icon]} className="mr-2" />
            {label}
        </button>
    );
};

export default FAQCategoryButton;