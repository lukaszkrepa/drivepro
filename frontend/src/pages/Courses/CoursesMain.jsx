import React from 'react';
import CourseCard from '../../components/CourseCard';

const coursesData = [
    {
        id: 'course-card-b',
        imageSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/bc00e3fbaa-5c2171c7714ac69da09a.png',
        imageAlt: 'modern car with driving school sign on top',
        title: 'Kurs kat. B',
        tag: 'zwykły',
        tagColor: 'blue',
        features: [
            { text: '30h teorii', icon: 'check', iconColor: 'green' },
            { text: '30h praktyki', icon: 'check', iconColor: 'green' },
            { text: 'Materiały', icon: 'check', iconColor: 'green' },
        ],
        price: '3600 zł',
        buttonText: 'Zapisz się',
        buttonColor: 'red',
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
        price: '4500 zł',
        buttonText: 'Sign up',
        buttonColor: 'red',
    },
    {
        id: 'course-card-additional',
        imageSrc:
            'https://storage.googleapis.com/uxpilot-auth.appspot.com/bc00e3fbaa-5c2171c7714ac69da09a.png',
        imageAlt: 'additional driving lessons',
        title: 'Jazdy Dodatkowe',
        tag: '',
        tagColor: 'green',
        features: [
            { text: 'Elastyczne terminy', icon: 'clock', iconColor: 'green' },
            { text: 'Dowolna ilość', icon: 'car', iconColor: 'green' },
            { text: 'Trasy egzaminacyjne', icon: 'road', iconColor: 'green' },
        ],
        price: '',
        buttonText: 'Zapisz się',
        buttonColor: 'red',
    },
];

const CoursesMain = () => {
    return (
        <section id="courses-main" className="py-20">
            <div className="container mx-auto px4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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