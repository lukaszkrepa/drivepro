import React from 'react';
import StepCard from '../../components/StepCard';

const stepsData = [
    {
        id: 'step-1-detailed',
        stepNumber: 1,
        title: 'Wykonaj badania lekarskie',
        details: [
            {
                text: 'Badanie lekarskie jest wymagane do uzyskania PKK. Można je wykonać w:',
                list: [
                    'Przychodni medycyny pracy',
                    'Gabinecie lekarza uprawnionego do badań kierowców',
                ],
            },
            {
                text: 'Koszt badania: ok. 200 zł',
            },
        ],
    },
    {
        id: 'step-2-detailed',
        stepNumber: 2,
        title: 'Przygotuj wymagane dokumenty',
        details: [
            {
                text: 'Zbierz potrzebne dokumenty:',
                list: [
                    'Dowód osobisty lub paszport',
                    'Kolorowe zdjęcie (3,5 × 4,5 cm)',
                    'Orzeczenie lekarskie o braku przeciwwskazań',
                    'Wniosek o wydanie PKK (dostępny w urzędzie lub online)',
                    'Zgoda rodzica/opiekuna (jeśli niepełnoletni)',
                ],
            },
        ],
    },
    {
        id: 'step-3-detailed',
        stepNumber: 3,
        title: 'Złóż wniosek o PKK w urzędzie',
        details: [
            {
                text: 'Udaj się do wydziału komunikacji odpowiedniego dla miejsca zamieszkania:',
                list: [
                    'Złóż komplet dokumentów',
                    'Urzędnik wprowadzi dane do systemu',
                ],
            },
            {
                text: 'Czas oczekiwania: zazwyczaj od ręki lub do kilku dni roboczych',
            },
        ],
    },
    {
        id: 'step-4-detailed',
        stepNumber: 4,
        title: 'Odbierz numer PKK',
        details: [
            {
                text: 'Po pozytywnym rozpatrzeniu wniosku otrzymasz numer PKK:',
                list: [
                    'Możesz go otrzymać osobiście, mailem lub przez ePUAP (jeśli wniosek online)',
                ],
            },
        ],
    },
    {
        id: 'step-5-detailed',
        stepNumber: 5,
        title: 'Zapisz się u nas na kurs prawa jazdy',
        details: [
            {
                text: 'Wybierz nasz ośrodek szkolenia kierowców i przekaż nam swój numer PKK:',
                list: [
                    'Zadzwoń do nas',
                    'Skorzystaj z formularza zapisów online',
                ],
            },
            {
                text: 'Na podstawie numeru PKK rozpoczniemy Twoje szkolenie.',
            },
        ],
    }
];


const RegistrationSteps = () => {
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