import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faTiktok,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
function Footer() {
    const facebookUrl = "https://www.facebook.com/groups/1219025698265060"
    const tiktokUrl = "https://www.tiktok.com/@drivepro_zg"
    const instagramUrl = "https://www.instagram.com/drivepro_zg/"

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Kontakt</h3>
                        <p className="mb-2">
                            <FontAwesomeIcon icon={faPhone} className="mr-2" /> +48 724 755 755
                        </p>
                        <p className="mb-2">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> biuro@drivepro.pl
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faLocationDot} className="mr-2" /> ul. Sucha 93A, 66-004 Zielona Góra
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Godziny otwarcia</h3>
                        <p className="mb-2">Pon-Pt: 8:00 - 20:00</p>
                        <p>Sob: 9:00 - 14:00</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Szybkie linki</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/courses" className="hover:text-blue-400">
                                    Kursy
                                </a>
                            </li>
                            <li>
                                <a href="/signup" className="hover:text-blue-400">
                                    Jak się zapisać
                                </a>
                            </li>
                            <li>
                                <a href="/gallery" className="hover:text-blue-400">
                                    Galeria
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Social Media</h3>
                        <div className="flex space-x-4">
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer"
                               className="text-2xl hover:text-blue-400 cursor-pointer">
                                <FontAwesomeIcon icon={faFacebook}/>
                            </a>
                            <a href={tiktokUrl} target="_blank" rel="noopener noreferrer"
                               className="text-2xl hover:text-blue-400 cursor-pointer">
                                <FontAwesomeIcon icon={faTiktok}/>
                            </a>
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
                               className="text-2xl hover:text-blue-400 cursor-pointer">
                                <FontAwesomeIcon icon={faInstagram}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>© 2025 drivepro.pl. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;