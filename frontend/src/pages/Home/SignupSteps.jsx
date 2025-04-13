import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faNotesMedical, faClipboardCheck, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function SignupSteps() {
    const steps = [
        {
            id: 'step-1',
            icon: faNotesMedical,
            title: 'Krok 1',
            description: 'Wykonaj badania lekarskie',
        },
        {
            id: 'step-2',
            icon: faIdCard,
            title: 'Krok 2',
            description: 'Uzyskaj PKK w swoim urzędzie',
        },
        {
            id: 'step-3',
            icon: faClipboardCheck,
            title: 'Krok 3',
            description: 'Zapisz się na kurs',
        },
        {
            id: 'step-4',
            icon: faGraduationCap,
            title: 'Krok 4',
            description: 'Rozpocznij naukę',
        },
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Jak rozpocząć kurs?</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="text-center">
                            <div className="text-5xl text-red-600 mb-4">
                                <FontAwesomeIcon icon={step.icon} />
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