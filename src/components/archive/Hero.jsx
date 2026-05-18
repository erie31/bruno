
import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-content reveal">
                <h1>Bruno Guilenia</h1>
                <p className="subtitle">Director Creativo · Brand & Sistemas visuales</p>
                <blockquote className="quote">
                    "Diseño para que las marcas funcionen,<br />
                    no para que se vean lindas."
                </blockquote>
            </div>
            <div className="scroll-indicator">
                <span></span>
            </div>
        </section>
    );
};

export default Hero;
