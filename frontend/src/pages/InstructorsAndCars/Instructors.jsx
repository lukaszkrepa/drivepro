import React from 'react';
import InstructorCard from '../../components/InstructorCard';

const instructorsData = [
    {
        id: 'instructor-1',
        imageSrc: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        imageAlt: 'Instruktor',
        name: 'Jan Kowalski',
        experience: '15 lat doświadczenia',
        qualifications: [
            'Certyfikowany instruktor',
            'Specjalista od jazdy miejskiej',
            'Egzaminator wewnętrzny',
        ],
    },
    {
        id: 'instructor-2',
        imageSrc: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        imageAlt: 'Instruktor',
        name: 'Piotr Nowak',
        experience: '12 lat doświadczenia',
        qualifications: [
            'Instruktor techniki jazdy',
            'Specjalista od parkowania',
            'Instruktor eco-drivingu',
        ],
    },
    {
        id: 'instructor-3',
        imageSrc: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
        imageAlt: 'Instruktor',
        name: 'Adam Wiśniewski',
        experience: '10 lat doświadczenia',
        qualifications: [
            'Specjalista od manewrów',
            'Instruktor jazdy defensywnej',
            'Trener techniki jazdy',
        ],
    },
];

const Instructors = () => {
    return (
        <section id="instruktorzy" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Nasi Instruktorzy</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {instructorsData.map((instructor) => (
                        <InstructorCard
                            key={instructor.id}
                            id={instructor.id}
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