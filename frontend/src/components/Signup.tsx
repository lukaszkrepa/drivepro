import './Signup.css';
import { FaIdCard } from "react-icons/fa6";
import { RiHealthBookFill } from "react-icons/ri";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
export default function SignupSteps() {
    const steps = [
        {
            id: 'step-1',
            icon: <FaIdCard />,
            title: 'Krok 1',
            description: 'Uzyskaj PKK w swoim urzędzie',
        },
        {
            id: 'step-2',
            icon: <RiHealthBookFill />,
            title: 'Krok 2',
            description: 'Wykonaj badania lekarskie',
        },
        {
            id: 'step-3',
            icon: <FaClipboardCheck/>,
            title: 'Krok 3',
            description: 'Zapisz się na kurs',
        },
        {
            id: 'step-4',
            icon: <FaGraduationCap />,
            title: 'Krok 4',
            description: 'Rozpocznij naukę',
        },
    ];

    return (
        <section id="zapisy" className="signup-section">
            <div className="signup-container">
                <h2 className="signup-title">Jak rozpocząć kurs?</h2>
                <div className="signup-grid">
                    {steps.map((step) => (
                        <div key={step.id} id={step.id} className="signup-step">
                            <div className="step-icon">
                                <i className={`fa-solid`} /> {step.icon}
                            </div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
