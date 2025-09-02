import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTiktok,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FaGraduationCap } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const facebookUrl = "https://www.facebook.com/groups/1219025698265060"
    const tiktokUrl = "https://www.tiktok.com/@drivepro_zg"
    const instagramUrl = "https://www.instagram.com/drivepro_zg/"
    return (
        <header className="fixed w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-24">
                    <div className="flex items-center">
                        <a href="/">
                            <img
                                src="https://driveprophotos.s3.eu-central-1.amazonaws.com/logo/DrivePro_Logo_internet.jpg"
                                alt="DrivePro Logo"
                                className="h-16 w-auto"
                            />
                        </a>
                    </div>
                    {/* Hamburger Button for Mobile */}
                    <button
                        className="md:hidden text-gray-700 focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-2xl" />
                    </button>
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-10">
                        <div className="flex items-center space-x-6 mr-10">
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-blue-600 hover:text-blue-700 transition-colors"
                                aria-label="Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebook}/>
                            </a>
                            <a
                                href={tiktokUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-black hover:text-gray-800 transition-colors"
                                aria-label="TikTok"
                            >
                                <FontAwesomeIcon icon={faTiktok}/>
                            </a>
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-pink-500 hover:text-pink-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram}/>
                            </a>
                        </div>

                        <a href="/signup" className="text-gray-700 hover:text-red-600">
                            Jak się zapisać
                        </a>
                        <a href="/courses" className="text-gray-700 hover:text-red-600">
                            Kursy
                        </a>
                        <a href="/instructors" className="text-gray-700 hover:text-red-600">
                            Kadra
                        </a>
                        <a href="/gallery" className="text-gray-700 hover:text-red-600">
                            Galeria
                        </a>
                        <a href="/reviews" className="text-gray-700 hover:text-red-600">
                            Opinie
                        </a>
                        <a href="/faq" className="text-gray-700 hover:text-red-600">
                            FAQ
                        </a>
                        <a
                            href="https://testy.superprawojazdy.pl"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center"
                        >
                            <FaGraduationCap className="mr-2" />
                            Teoria Online
                        </a>
                        <a
                            href="https://kalendarz.drivepro.pl"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center"
                        >
                            <FaCalendarAlt className="mr-2" />
                            Kalendarz
                        </a>
                    </nav>
                </div>
                {/* Mobile Menu */}
                <nav
                    className={`md:hidden bg-white w-full absolute top-24 left-0 shadow-md transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <div className="flex space-x-6">
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-red-600 hover:text-red-700 transition-colors"
                                aria-label="Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a
                                href={tiktokUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-red-600 hover:text-red-700 transition-colors"
                                aria-label="TikTok"
                            >
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-red-600 hover:text-red-700 transition-colors"
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                        <a
                            href="/signup"
                            className="text-gray-700 hover:text-blue-600 text-lg"
                            onClick={toggleMobileMenu}
                        >
                            Jak się zapisać
                        </a>
                        <a
                            href="/courses"
                            className="text-gray-700 hover:text-blue-600 text-lg"
                            onClick={toggleMobileMenu}
                        >
                            Kursy
                        </a>
                        <a
                            href="/instructors"
                            className="text-gray-700 hover:text-blue-600 text-lg"
                            onClick={toggleMobileMenu}
                        >
                            Kadra
                        </a>
                        <a
                            href="/gallery"
                            className="text-gray-700 hover:text-blue-600 text-lg"
                            onClick={toggleMobileMenu}
                        >
                            Galeria
                        </a>
                        <a
                            href="/reviews"
                            className="text-gray-700 hover:text-blue-600 text-lg"
                            onClick={toggleMobileMenu}
                        >
                            Opinie
                        </a>
                        <a
                            href="/faq"
                            className="text-gray-700 hover:text-blue-600 text-lg"
                            onClick={toggleMobileMenu}
                        >
                            FAQ
                        </a>
                        <a
                            href="https://testy.superprawojazdy.pl"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center text-lg"
                            onClick={toggleMobileMenu}
                        >
                            <FaGraduationCap className="mr-2" />
                            Teoria Online
                        </a>
                        <a
                            href="https://kalendarz.drivepro.pl"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center text-lg"
                            onClick={toggleMobileMenu}
                        >
                            <FaCalendarAlt className="mr-2" />
                            Kalendarz
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
