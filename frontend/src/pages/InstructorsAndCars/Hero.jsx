import React from 'react';

const Hero = () => {
    return (
        <section
            id="page-header"
            className="pt-32 bg-gradient-to-r from-red-600 to-red-800 h-[400px] flex items-center"
        >
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Kadra i Samochody
                </h1>
                <p className="text-xl text-white opacity-90">
                    Poznaj naszych doświadczonych instruktorów i flotę nowoczesnych pojazdów
                </p>
            </div>
        </section>
    );
};

export default Hero;