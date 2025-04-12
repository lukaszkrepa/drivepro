import React from 'react';
import TestimonialCard from '../../components/TestimonialCard';

const featuredTestimonialsData = [
    {
        id: 'featured-testimonial-1',
        avatarSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        avatarAlt: 'Avatar',
        name: 'Karolina Nowak',
        rating: 5,
        courseInfo: 'Kurs kategorii B - Maj 2025',
        text:
            'Najlepsza decyzja jaką mogłam podjąć! Instruktorzy są bardzo cierpliwi i profesjonalni. ' +
            'Teoria online była świetnie przygotowana, a praktyka przebiegała w przyjaznej atmosferze. ' +
            'Zdałam egzamin za pierwszym razem!',
    },
    {
        id: 'featured-testimonial-2',
        avatarSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        avatarAlt: 'Avatar',
        name: 'Michał Kowalski',
        rating: 5,
        courseInfo: 'Kurs kategorii A - Kwiecień 2025',
        text:
            'Profesjonalne podejście i świetna organizacja. Elastyczne godziny jazd bardzo mi pomogły ' +
            'pogodzić kurs z pracą. Polecam szczególnie osobom, które cenią sobie wysoką jakość szkolenia.',
    },
];

const FeaturedTestimonials = () => {
    return (
        <section id="featured-testimonials" className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredTestimonialsData.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            avatarSrc={testimonial.avatarSrc}
                            avatarAlt={testimonial.avatarAlt}
                            name={testimonial.name}
                            rating={testimonial.rating}
                            courseInfo={testimonial.courseInfo}
                            text={testimonial.text}
                            isFeatured
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTestimonials;