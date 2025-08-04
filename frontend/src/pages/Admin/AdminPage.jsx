import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import AdminMainLayout from './AdminMainLayout';
import CoursesMain from "./Courses/CoursesMain.jsx";
import InstructorsMain from "./Instructors/InstructorsMain.jsx";
import GalleryMain from "./Gallery/GalleryMain.jsx";
import FaqMain from "./Faq/FaqMain.jsx";
import {withAuthenticator} from "@aws-amplify/ui-react";
import TestimonialsMain from "./Testimonials/TestimonialsMain.jsx";
import CarsMain from "./Cars/CarsMain.jsx";
import HomeSignUpMain from "./HomeSignUp/HomeSignUpMain.jsx";
import DrivingCourseStepsMain from "./SignUp/DrivingCourseStepsMain.jsx";

const AdminPage = () => {
    const [tab, setTab] = useState('kursy');
    const renderTabContent = () => {
        switch (tab) {
            case 'kursy': return <CoursesMain/>;
            case 'kadra': return <InstructorsMain/>;
            case 'galeria': return <GalleryMain/>;
            case 'faq': return <FaqMain/>;
            case 'testimonials': return <TestimonialsMain/>
            case 'cars': return <CarsMain/>
            case 'homeSteps': return <HomeSignUpMain/>
            case 'steps': return <DrivingCourseStepsMain/>
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            <AdminMainLayout
                sidebar={<Sidebar activeTab={tab} onChangeTab={setTab} />}
                content={renderTabContent()}
            />
        </div>
    );
};

export default AdminPage;
