import React from 'react';
import CoursesHero from './CoursesHero';
import CoursesMain from './CoursesMain';

const Courses = () => {
    return (
        <div id="main-wrapper" className="min-h-screen bg-white">
            <CoursesHero />
            <CoursesMain />
        </div>
    );
};

export default Courses;