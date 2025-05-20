import React from 'react';
import FAQHero from './FAQHero';
import FAQQuestions from './FAQQuestions';
import FAQContact from './FAQContact';

const FAQ = () => {
    return (
        <div id="main-wrapper" className="min-h-screen bg-white">
            <FAQHero />
            <section id="faq-main" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <FAQQuestions />
                        <FAQContact />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;