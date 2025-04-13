import React from 'react';
import SignupHero from './SignupHero';
import RegistrationSteps from './RegistrationSteps';
import RegistrationForm from './RegistrationForm';
import ContactInfo from './ContactInfo';

const Signup = () => {
    return (
        <div id="main-wrapper" className="min-h-screen bg-white">
            <SignupHero />
            <RegistrationSteps />
            <RegistrationForm />
            <ContactInfo />
        </div>
    );
};

export default Signup;