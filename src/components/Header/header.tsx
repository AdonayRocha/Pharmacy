import React, { useState } from 'react';
import './header_styles.css';

const Header: React.FC = () => {
    const [active, setActive] = useState<string>('home');

    return (
        <nav className="header">
            <ul className="nav-list">
                <li>
                    <img 
                        src="src/img/logotipo.png" 
                        alt="Logotipo" 
                        onClick={() => setActive('home')} 
                    />
                </li>
                <li
                    className={`nav-item ${active === 'home' ? 'active' : ''}`}
                    onClick={() => setActive('home')}
                >
                    Home
                </li>
                <li
                    className={`nav-item ${active === 'trip' ? 'active' : ''}`}
                    onClick={() => setActive('trip')}
                >
                    Trip
                </li>
                <li
                    className={`nav-item ${active === 'contact' ? 'active' : ''}`}
                    onClick={() => setActive('contact')}
                >
                    Contact
                </li>
            </ul>
        </nav>
    );
};

export default Header;
