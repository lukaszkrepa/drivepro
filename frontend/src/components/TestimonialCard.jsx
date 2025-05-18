import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

const TestimonialCard = ({
                             name,
                             rating,
                             courseInfo,
                             text,
                             isFeatured = false,
                         }) => {

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
        }
        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalf} className="text-yellow-400" />);
        }

        return stars;
    };

    return (
        <div
            className={`bg-white p-${isFeatured ? '8' : '6'} rounded-xl shadow-lg`}
        >
            <div className={`flex items-center mb-${isFeatured ? '6' : '4'}`}>
                <div className="ml-4">
                    <h3 className={`font-bold ${isFeatured ? 'text-xl' : ''}`}>
                        {name}
                    </h3>
                    <div className="text-yellow-400">{renderStars(rating)}</div>
                    {courseInfo && <p className="text-gray-600">{courseInfo}</p>}
                </div>
            </div>
            <p
                className={`text-gray-${isFeatured ? '700' : '600'} ${
                    isFeatured ? 'text-lg leading-relaxed' : ''
                }`}
            >
                {text}
            </p>
        </div>
    );
};

export default TestimonialCard;