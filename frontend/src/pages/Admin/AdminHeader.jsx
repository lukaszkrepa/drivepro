import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../AuthContext.jsx';

const AdminHeader = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            // global: true also revokes the refresh token on Cognito, so the
            // old session cannot silently mint new tokens.
            await signOut({ global: true });
        } catch (err) {
            console.warn('[AdminHeader] Sign out failed, clearing local session:', err);
            // Fall back to a local-only sign out so the user is never stuck.
            await signOut().catch(() => {});
        } finally {
            setUser(null);
            navigate('/login');
        }
    };

    return (
        <header className="bg-white shadow-md z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-24">
                    <div className="flex items-center">
                        <span className="text-5xl font-bold text-red-600 tracking-tight cursor-pointer">DrivePro.pl</span>
                        <span className="ml-3 px-4 py-1 bg-red-100 text-red-700 rounded-full text-base font-semibold hidden sm:inline-block">
                Admin Panel
              </span>
                    </div>
                    <div className="flex items-center space-x-5 ml-8">
                        <div className="flex items-center space-x-2">
                            <img
                                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                                className="w-10 h-10 rounded-full border-2 border-red-200"
                                alt="Admin Avatar"
                            />
                            <span className="font-semibold text-gray-800 text-lg">Admin</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            title="Wyloguj"
                            aria-label="Wyloguj"
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 hover:text-red-600 hover:border-red-300 rounded-lg transition"
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            <span className="font-semibold">Wyloguj</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
