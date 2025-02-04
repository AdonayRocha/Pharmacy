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
            </ul>
        </nav>
    );
};

export default Header;
