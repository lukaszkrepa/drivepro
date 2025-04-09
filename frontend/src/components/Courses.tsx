import './Courses.css';
import { FaCarAlt } from "react-icons/fa";

export default function Courses() {
    return (
        <section id="kursy" className="kursy-section">
            <div className="kursy-container">
                <h2 className="kursy-title">Nasze Kursy</h2>
                <div className="kursy-grid">
                    <div id="course-card-1" className="course-card">
                        <div className="course-icon">
                            <FaCarAlt/>
                        </div>
                        <h3 className="course-name">Kategoria "B"</h3>
                        <ul className="course-details">
                            <li>30 godzin teorii</li>
                            <li>30 godzin praktyki</li>
                            <li>Książka do nauki w cenie</li>
                            <li>Dostęp do nauki online</li>
                        </ul>
                        <p className="course-price">3600 zł</p>
                    </div>

                    <div id="course-card-2" className="course-card">
                        <div className="course-icon">
                            <FaCarAlt/>
                        </div>
                        <h3 className="course-name">Kategoria "B" (szybki kurs)</h3>
                        <ul className="course-details">
                            <li>Ukończenie do 30 dni</li>
                            <li>30 godzin teorii</li>
                            <li>30 godzin praktyki</li>
                            <li>Książka do nauki w cenie</li>
                            <li>Dostęp do nauki online</li>
                        </ul>
                        <p className="course-price">4500 zł</p>
                    </div>

                    <div id="course-card-3" className="course-card">
                        <div className="course-icon">
                            <FaCarAlt/>
                        </div>
                        <h3 className="course-name">"B" Category</h3>
                        <ul className="course-details">
                            <li>Course in English</li>
                            <li>30 hours of theory</li>
                            <li>30 hours of practical driving</li>
                            <li>Learning book included in price</li>
                            <li>E-learning (in Polish)</li>
                        </ul>
                        <p className="course-price">4500 zł</p>
                    </div>
                </div>
            </div>
        </section>
    );
}