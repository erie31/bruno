
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <a href="#hero">bg.</a>
            </div>

            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <a href="#about" onClick={() => setMenuOpen(false)}>01 Sobre Mí</a>
                <a href="#experience" onClick={() => setMenuOpen(false)}>02 Trabajos</a>
                {/* <a href="#portfolio" onClick={() => setMenuOpen(false)}>03 Portfolio</a> Combined with Trabajos/Experience for landing page simplicity */}
                <a href="#skills" onClick={() => setMenuOpen(false)}>04 Skills</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>05 Contacto</a>
            </nav>
        </header>
    );
};

export default Header;
