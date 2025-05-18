import React, {useEffect, useState} from 'react';
import TestimonialCard from '../../components/TestimonialCard';
import {fetchTestimonials} from "../../services/fetchTestimonials.js";

const FeaturedTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
        fetchTestimonials().then(data =>{
            setTestimonials(data.filter(x => x.type === "featured"))
        }).catch(console.error)
        }
        ,[])

    return (
        <section id="featured-testimonials" className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.Id}
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