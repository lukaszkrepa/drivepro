import React from 'react';

const CoursesHero = () => {
    return (
        <section
            id="courses-hero"
            className="pt-32 bg-gradient-to-r from-blue-600 to-blue-800 h-[400px]"
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