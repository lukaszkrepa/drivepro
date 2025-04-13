import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTiktok,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FaGraduationCap } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
function Header() {
    return (
        <header className="fixed w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-24">
                    <div className="flex items-center">
                        <a href="/" className="text-5xl font-bold text-red-600 tracking-tight">
                            DrivePro.pl
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-10">
                        <div className="flex items-center space-x-6 mr-10">
                            <a
                                href="https://facebook.com"
                                className="text-2xl text-red-600 hover:text-red-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faFacebook}/>
                            </a>
                            <a
                                href="https://tiktok.com"
                                className="text-2xl text-red-600 hover:text-red-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faTiktok}/>
                            </a>
                            <a
                                href="https://instagram.com"
                                className="text-2xl text-red-600 hover:text-red-700 transition-colors"
                            >
                                <FontAwesomeIcon icon={faInstagram}/>
                            </a>
                        </div>
                        <a href="/signup" className="text-gray-700 hover:text-blue-600">
                            Jak się zapisać
                        </a>
                        <a href="/courses" className="text-gray-700 hover:text-blue-600">
                            Kursy
                        </a>
                        <a href="/instructors" className="text-gray-700 hover:text-blue-600">
                            Kadra i Samochody
                        </a>
                        <a href="/gallery" className="text-gray-700 hover:text-blue-600">
                            Galeria
                        </a>
                        <a href="/reviews" className="text-gray-700 hover:text-blue-600">
                            Opinie
                        </a>
                        <a
                            href="https://www.superprawojazdy.pl"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                        >
                            <FontAwesomeIcon icon={FaGraduationCap} className="mr-2"/>
                            Teoria Online
                        </a>
                        <a
                            href="https://kalendarz.drivepro.pl"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                        >
                            <FontAwesomeIcon icon={FaCalendarAlt} className="mr-2"/>
                            Kalendarz Drive Pro
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;