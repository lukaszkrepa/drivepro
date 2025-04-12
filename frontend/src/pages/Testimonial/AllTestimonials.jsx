import React from 'react';
import TestimonialCard from '../../components/TestimonialCard';

const allTestimonialsData = [
    {
        id: 'testimonial-3',
        avatarSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        avatarAlt: 'Avatar',
        name: 'Julia Adamska',
        rating: 5,
        text:
            'Świetna atmosfera i profesjonalne podejście. Teoria online bardzo dobrze przygotowana!',
    },
    {
        id: 'testimonial-4',
        avatarSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
        avatarAlt: 'Avatar',
        name: 'Adam Wiśniewski',
        rating: 4.5,
        text:
            'Instruktorzy mają świetne podejście do kursantów. Polecam szczególnie osobom z dużym stresem!',
    },
    {
        id: 'testimonial-5',
        avatarSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
        avatarAlt: 'Avatar',
        name: 'Magdalena Zielińska',
        rating: 5,
        text: 'Elastyczne godziny jazd i profesjonalni instruktorzy. Super doświadczenie!',
    },
];

const AllTestimonials = () => {
    return (
        <section id="all-testimonials" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {allTestimonialsData.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            avatarSrc={testimonial.avatarSrc}
                            avatarAlt={testimonial.avatarAlt}
                            name={testimonial.name}
                            rating={testimonial.rating}
                            text={testimonial.text}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllTestimonials;