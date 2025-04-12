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
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Biuro@drivepro.pl
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
                                <a href="#kursy" className="hover:text-blue-400">
                                    Kursy
                                </a>
                            </li>
                            <li>
                                <a href="#zapisy" className="hover:text-blue-400">
                                    Jak się zapisać
                                </a>
                            </li>
                            <li>
                                <a href="#galeria" className="hover:text-blue-400">
                                    Galeria
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Social Media</h3>
                        <div className="flex space-x-4">
              <span className="text-2xl hover:text-blue-400 cursor-pointer">
                <FontAwesomeIcon icon={faFacebook} />
              </span>
                            <span className="text-2xl hover:text-blue-400 cursor-pointer">
                <FontAwesomeIcon icon={faTiktok} />
              </span>
                            <span className="text-2xl hover:text-blue-400 cursor-pointer">
                <FontAwesomeIcon icon={faInstagram} />
              </span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>© 2025 SuperPrawoJazdy.pl. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;