import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const ContactCard = ({ id, icon, title, info }) => {
    const iconMap = {
        phone: faPhone,
        envelope: faEnvelope,
        location: faLocationDot,
    };

    return (
        <div id={id} className="text-center">
            <div className="text-4xl text-red-600 mb-4">
                <FontAwesomeIcon icon={iconMap[icon]} />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{info}</p>
        </div>
    );
};

export default ContactCard;