import React, {useEffect, useState} from 'react';
import InstructorCard from '../../components/InstructorCard';
import {fetchInstructors} from "../../services/Instructors/fetchInstructors.js";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetchInstructors()
            .then(setInstructors)
            .catch(console.error);
    }, []);
    return (
        <section id="instruktorzy" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasi Instruktorzy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {instructors.map((instructor) => (
                        <InstructorCard
                            key={instructor.Id}
                            id={instructor.Id}
                            imageSrc={instructor.imageSrc}
                            imageAlt={instructor.imageAlt}
                            name={instructor.name}
                            experience={instructor.experience}
                            qualifications={instructor.qualifications}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Instructors;