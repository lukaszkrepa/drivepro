// src/pages/Admin/AdminPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';

import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import AdminMainLayout from './AdminMainLayout';
import CoursesMain from "./Courses/CoursesMain.jsx";
import InstructorsMain from "./Instructors/InstructorsMain.jsx";
import GalleryMain from "./Gallery/GalleryMain.jsx";
import FaqMain from "./Faq/FaqMain.jsx";
import TestimonialsMain from "./Testimonials/TestimonialsMain.jsx";
import CarsMain from "./Cars/CarsMain.jsx";
import HomeSignUpMain from "./HomeSignUp/HomeSignUpMain.jsx";
import DrivingCourseStepsMain from "./SignUp/DrivingCourseStepsMain.jsx";
import DocumentsMain from "./Documents/DocumentsMain.jsx";

const AdminPage = () => {
    const [tab, setTab] = useState('kursy');
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('[AdminPage] Auth state - loading:', loading, 'user:', user);

        if (!loading && !user) {
            console.warn('[AdminPage] Not authenticated, redirecting...');
            navigate('/login');
        }
    }, [loading, user, navigate]);

    if (loading) return <div>🔄 Checking authentication...</div>;
    if (!user) return null;

    const renderTabContent = () => {
        switch (tab) {
            case 'kursy': return <CoursesMain />;
            case 'kadra': return <InstructorsMain />;
            case 'galeria': return <GalleryMain />;
            case 'faq': return <FaqMain />;
            case 'testimonials': return <TestimonialsMain />;
            case 'cars': return <CarsMain />;
            case 'homeSteps': return <HomeSignUpMain />;
            case 'steps': return <DrivingCourseStepsMain />;
            case 'documents': return <DocumentsMain />;
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
