import React, {useEffect, useState} from 'react';
import TestimonialCard from '../../components/TestimonialCard';
import {fetchTestimonials} from "../../services/Testimonials/fetchTestimonials.js";


const AllTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    useEffect(() => {
            fetchTestimonials().then(data =>{
                setTestimonials(data.filter(x => x.type === "testimonial"))
            }).catch(console.error)
        }
        ,[])
    return (
        <section id="all-testimonials" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.Id}
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