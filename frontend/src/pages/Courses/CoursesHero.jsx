import React from 'react';

const CoursesHero = () => {
    return (
        <section
            id="courses-hero"
            className="pt-32 h-[400px] bg-gradient-to-r from-black via-[#7b0000] to-[#c00000]"
        >
            <div className="container mx-auto px-4">
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-6">Nasze Kursy</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Oferujemy szeroki wybór kursów prawa jazdy dostosowanych do Twoich potrzeb
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CoursesHero;