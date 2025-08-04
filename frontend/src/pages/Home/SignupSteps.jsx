import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faNotesMedical, faClipboardCheck, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from "react";
import {fetchCourses} from "../../services/Courses/fetchCourses.js";
import {fetchHomeSteps} from "../../services/HomeSteps/fetchSteps.js";

function SignupSteps() {

    const [steps, setSteps] = useState([]);

    useEffect(() => {
        fetchHomeSteps()
            .then(setSteps)
            .catch(console.error);
    }, []);

    const ICON_MAP = {
        1: faNotesMedical,
        2: faIdCard,
        3: faClipboardCheck,
        4: faGraduationCap
    }

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Jak rozpocząć kurs?</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.sort((a, b) => a.title.localeCompare(b.title)).map((step) => (
                        <div key={step.Id} className="text-center">
                            <div className="text-5xl text-red-600 mb-4">
                                <FontAwesomeIcon icon={ICON_MAP[step.Id]} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SignupSteps;