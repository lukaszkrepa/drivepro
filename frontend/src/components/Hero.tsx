import './Hero.css';

export default function Hero() {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Zdobądź prawo jazdy z profesjonalistami</h1>
                        <p className="hero-subtitle">Najlepsza szkoła nauki jazdy w mieście</p>
                        <div className="hero-buttons">
                            <a href="#zapisy" className="btn primary">Zapisz się</a>
                            <a
                                href="https://superprawojazdy.pl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn secondary"
                            >
                                Teoria Online
                            </a>
                        </div>
                    </div>
                    {/*<div className="hero-image">*/}
                    {/*    <img*/}
                    {/*        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/be84c6def1-9e1c601e0dc097ad9451.png"*/}
                    {/*        alt="modern driving school car with instructor and student, professional photography"*/}
                    {/*        className="image"*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}
