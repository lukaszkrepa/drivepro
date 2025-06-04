import React, {useEffect, useState} from 'react';
import StepCard from '../../components/StepCard';
import {fetchSteps} from "../../services/fetchSteps.js";

const RegistrationSteps = () => {
    const [stepsData, setStepsData] = useState([])

    useEffect(() => {
        fetchSteps()
            .then((res) =>{
                res.sort((a,b) => a.id - b.id)
                setStepsData(res)
            })
            .catch(console.error);
    }, []);

    return (
        <section id="registration-steps" className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-8">
                        {stepsData.map((step) => (
                            <StepCard
                                key={step.id}
                                id={step.id}
                                stepNumber={step.stepNumber}
                                title={step.title}
                                details={step.details}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationSteps;