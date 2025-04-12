import React from 'react';
import TestimonialsHero from './TestimonialsHero';
import FeaturedTestimonials from './FeaturedTestimonials';
import AllTestimonials from './AllTestimonials';

const Testimonial = () => {
    return (
        <div className="min-h-screen bg-white">
            <TestimonialsHero />
            <FeaturedTestimonials />
            <AllTestimonials />
        </div>
    );
};

export default Testimonial;