import Link from 'next/link';
import './Header.css';

export default function Header() {
    return (
        <header id="header" className="header">
            <div className="header-container">
                <div className="header-content">
                    <div className="logo">
                        <Link href="/" className="logo-text">
                            drivepro.pl
                        </Link>
                    </div>
                    <nav className="nav">
                        <a href="#kursy" className="nav-link">Kursy</a>
                        <a href="#zapisy" className="nav-link">Jak się zapisać</a>
                        <a href="#kadra" className="nav-link">Kadra i Samochody</a>
                        <a href="#galeria" className="nav-link">Galeria</a>
                        <a href="#opinie" className="nav-link">Opinie</a>
                        <a href="#aktualnosci" className="nav-link">Aktualności</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
