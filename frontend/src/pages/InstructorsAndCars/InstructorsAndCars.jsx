import React from 'react';
import Hero from './Hero.jsx';
import Instructors from './Instructors';
import Cars from './Cars';

const InstructorsAndCars = () => {
    return (
        <div id="main-wrapper" className="min-h-screen bg-white">
            <Hero />
            <Instructors />
            <Cars />
        </div>
    );
};

export default InstructorsAndCars;