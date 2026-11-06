import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { useAuth } from '../../AuthContext.jsx';

const Sidebar = ({ activeTab, onChangeTab }) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            // global: true also revokes the refresh token on Cognito.
            await signOut({ global: true });
        } catch (err) {
            console.warn('[Sidebar] Global sign out failed, clearing local session:', err);
            await signOut().catch(() => {});
        } finally {
            setUser(null);
            navigate('/login');
        }
    };

    const tabs = [
        { id: 'kursy', label: 'Kursy', icon: 'car-side' },
        { id: 'kadra', label: 'Kadra', icon: 'users-rectangle' },
        { id: 'galeria', label: 'Galeria', icon: 'image' },
        { id: 'faq', label: 'FAQ', icon: 'circle-question' },
        { id: 'testimonials', label: 'Opinie', icon: 'circle-question'},
        { id: 'cars', label: 'Auta', icon: 'car-side'},
        { id: 'documents', label: 'Dokumenty', icon: 'file'},
        { id: 'certificates', label: 'Zaświadczenia', icon: 'certificate'},
        { id: 'homeSteps', label: 'Jak sie zapisac (strona glowna)', icon: ''},
        { id: 'steps', label: 'Jak sie zapisac (strona zapisz sie)', icon: ''}

    ];

    return (
        <aside className="w-60 pr-8 pt-8">
            <nav className="flex flex-col space-y-2 sticky top-32">
                {tabs.map(({ id, label, icon }) => (
                    <button
                        key={id}
                        onClick={() => onChangeTab(id)}
                        className={`flex items-center space-x-3 px-5 py-3 rounded-lg text-lg font-semibold text-gray-700 hover:bg-blue-100 transition ${
                            activeTab === id ? 'bg-blue-100' : ''
                        }`}
                    >
                        <i className={`fa-solid fa-${icon} text-blue-600`}></i>
                        <span>{label}</span>
                    </button>
                ))}
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-5 py-3 mt-6 rounded-lg text-lg font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition"
                >
                    <span>Wyloguj</span>
                </button>
            </nav>
        </aside>
    );
};
export default Sidebar;
