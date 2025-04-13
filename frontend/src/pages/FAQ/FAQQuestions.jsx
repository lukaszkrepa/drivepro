import React from 'react';
import FAQQuestion from '../../components/FAQQuestion';

const questionsData = [
    {
        id: 'faq-1',
        question: 'Ile trwa kurs prawa jazdy?',
        answer:
            'Standardowy kurs prawa jazdy kategorii B trwa około 2 miesięcy. Składa się z 30 godzin zajęć teoretycznych oraz 30 godzin zajęć praktycznych. Tempo realizacji kursu dostosowujemy do Twoich możliwości czasowych.',
    },
    {
        id: 'faq-2',
        question: 'Jakie dokumenty są potrzebne do rozpoczęcia kursu?',
        list: [
            'Profil Kandydata na Kierowcę (PKK)',
            'Dokument tożsamości (dowód osobisty lub paszport)',
            'Aktualne zdjęcie (3,5 x 4,5 cm)',
            'Orzeczenie lekarskie o braku przeciwwskazań do kierowania pojazdami',
        ],
    },
    {
        id: 'faq-3',
        question: 'Ile kosztuje kurs prawa jazdy?',
        answer: 'Cena podstawowego kursu prawa jazdy kategorii B wynosi 2499 zł i obejmuje:',
        list: [
            '30 godzin zajęć teoretycznych',
            '30 godzin zajęć praktycznych',
            'Materiały szkoleniowe',
            'Dostęp do platformy e-learningowej',
        ],
    },
    {
        id: 'faq-4',
        question: 'Kiedy mogę rozpocząć kurs?',
        answer:
            'Kurs możesz rozpocząć w dowolnym momencie po ukończeniu 17 lat i 9 miesięcy. Nowe grupy rozpoczynają zajęcia teoretyczne co tydzień. Jazdy praktyczne ustalane są indywidualnie z instruktorem.',
    },
    {
        id: 'faq-5',
        question: 'Jak wygląda egzamin państwowy?',
        answer: 'Egzamin państwowy składa się z dwóch części:',
        list: [
            'Część teoretyczna: test komputerowy (32 pytania)',
            'Część praktyczna: jazda w ruchu miejskim (około 40 minut)',
        ],
    },
];

const FAQQuestions = () => {
    return (
        <div id="faq-questions" className="space-y-6">
            {questionsData.map((faq) => (
                <FAQQuestion
                    key={faq.id}
                    id={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    list={faq.list}
                />
            ))}
        </div>
    );
};

export default FAQQuestions;