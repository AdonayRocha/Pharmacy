import React from 'react';
import './footer_style.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Cotidiano. All rights reserved.</p>
        </footer>
    );
};

export default Footer;