import React from 'react';

const SignupHero = () => {
    return (
        <section
            id="signup-hero"
            className="pt-32 h-[400px] bg-gradient-to-r from-red-600 to-red-800"
        >
            <div className="container mx-auto px-4">
                <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Jak się zapisać?</h1>
                    <p className="text-xl mb-8">
                        Dowiedz się jak rozpocząć swoją przygodę z prawem jazdy
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SignupHero;