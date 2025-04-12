import React from 'react';
import CourseCard from '../../components/CourseCard';

const coursesData = [
    {
        id: 'course-card-b',
        imageSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/bc00e3fbaa-5c2171c7714ac69da09a.png',
        imageAlt: 'modern car with driving school sign on top',
        title: 'Kurs kat. B',
        tag: 'Standard',
        tagColor: 'blue',
        features: [
            { text: '30h teorii', icon: 'check', iconColor: 'green' },
            { text: '30h praktyki', icon: 'check', iconColor: 'green' },
            { text: 'Materiały', icon: 'check', iconColor: 'green' },
        ],
        price: '2499 zł',
        buttonText: 'Zapisz się',
        buttonColor: 'blue',
    },
    {
        id: 'course-card-b-fast',
        imageSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/01da0f44ca-fdd88262367c3213d860.png',
        imageAlt: 'fast course driving training',
        title: 'Kurs kat. B szybki',
        tag: 'Express',
        tagColor: 'orange',
        features: [
            { text: '30h teorii', icon: 'check', iconColor: 'green' },
            { text: '30h praktyki', icon: 'check', iconColor: 'green' },
            { text: 'Kurs w 3 tygodnie', icon: 'bolt', iconColor: 'orange' },
        ],
        price: '2999 zł',
        buttonText: 'Zapisz się',
        buttonColor: 'orange',
    },
    {
        id: 'course-card-b-english',
        imageSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/01da0f44ca-fdd88262367c3213d860.png',
        imageAlt: 'english language driving course',
        title: 'B Category (in English)',
        tag: 'English',
        tagColor: 'purple',
        features: [
            { text: '30h theory', icon: 'check', iconColor: 'green' },
            { text: '30h practice', icon: 'check', iconColor: 'green' },
            { text: 'English materials', icon: 'globe', iconColor: 'purple' },
        ],
        price: '2799 zł',
        buttonText: 'Sign up',
        buttonColor: 'purple',
    },
    {
        id: 'course-card-additional',
        imageSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/bc00e3fbaa-5c2171c7714ac69da09a.png',
        imageAlt: 'additional driving lessons',
        title: 'Jazdy Dodatkowe',
        tag: 'Praktyka',
        tagColor: 'green',
        features: [
            { text: 'Elastyczne terminy', icon: 'clock', iconColor: 'green' },
            { text: 'Dowolna ilość', icon: 'car', iconColor: 'green' },
            { text: 'Trasy egzaminacyjne', icon: 'road', iconColor: 'green' },
        ],
        price: '99 zł/h',
        buttonText: 'Zamów',
        buttonColor: 'green',
    },
];

const CoursesMain = () => {
    return (
        <section id="courses-main" className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coursesData.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            imageSrc={course.imageSrc}
                            imageAlt={course.imageAlt}
                            title={course.title}
                            tag={course.tag}
                            tagColor={course.tagColor}
                            features={course.features}
                            price={course.price}
                            buttonText={course.buttonText}
                            buttonColor={course.buttonColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesMain;