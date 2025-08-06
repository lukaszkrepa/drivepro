import React from 'react';

const TestimonialsHero = () => {
  return (
    <section
      id="testimonials-hero"
      className="pt-20 h-[400px] bg-gradient-to-r from-black via-[#7b0000] to-[#c00000]"
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="text-center w-full">
          <h1 className="text-5xl font-bold text-white mb-6">
            Opinie naszych kursantów
          </h1>
          <p className="text-xl text-white">
            Poznaj doświadczenia osób, które zaufały naszej szkole
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHero;