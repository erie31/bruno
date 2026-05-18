
import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="about-content reveal">
                <h2>01 Sobre Mí</h2>
                <div className="text-column">
                    <p className="highlight">
                        Trabajo el diseño como un sistema, no como piezas aisladas.
                    </p>
                    <p>
                        No me interesa el diseño decorativo ni la creatividad desconectada del contexto donde opera una marca.
                    </p>
                    <p>
                        Desarrollo sistemas visuales pensados para escalar, adaptarse y sostenerse en el tiempo, siempre en diálogo con el negocio, el producto y la operación real.
                    </p>
                    <p>
                        He liderado procesos creativos en contextos industriales y corporativos, donde el diseño no es un fin, sino una herramienta para ordenar, comunicar y tomar decisiones.
                    </p>
                    <p className="closing">
                        No diseño por likes.<br />
                        Diseño para que las marcas funcionen.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
