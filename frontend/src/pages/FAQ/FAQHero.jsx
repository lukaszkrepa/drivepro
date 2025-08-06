import React from 'react';

const FAQHero = () => {
    return (
        <section
            id="hero"
            className="pt-32 h-[400px] bg-gradient-to-r from-black via-[#7b0000] to-[#c00000]"
        >
            <div className="container mx-auto px-4">
                <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Najczęściej Zadawane Pytania
                    </h1>
                    <p className="text-xl mb-8">
                        Znajdź odpowiedzi na wszystkie pytania dotyczące kursu prawa jazdy
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQHero;