
import React from 'react';
import './Experience.css';

const experiences = [
    {
        role: "Director Creativo",
        company: "TRACSA",
        period: "2024 — Actual",
        desc: "Dirección y construcción de sistemas visuales aplicados a productos y comunicación técnica en contextos industriales. Traducción de complejidad técnica en mensajes claros."
    },
    {
        role: "Director Creativo",
        company: "TRACBRAS",
        period: "2024 — Actual",
        desc: "Adaptación y desarrollo de identidad visual para el mercado brasileño. Construcción de sistemas gráficos orientados a comunicación técnica y posicionamiento regional."
    },
    {
        role: "Diseñador Gráfico & Video Editor",
        company: "UNLUCKY TOURNAMENTS",
        period: "2024",
        desc: "Organización de torneos de League of Legends, Latinoamérica sur. Responsable de la comunicación visual y adaptación de contenido para diferentes plataformas."
    },
    {
        role: "Diseñador Gráfico",
        company: "JUMPER MARKETING",
        period: "2022 — 2023",
        desc: "Producción continua de contenido digital para múltiples clientes de agencia. Desarrollo de publicaciones de feed y reels adaptadas a distintas marcas."
    },
    {
        role: "Diseñador Gráfico",
        company: "PROYECTO BETA",
        period: "2022 — 2022",
        desc: "Creación y planificación de contenido para redes sociales. Desarrollo de piezas alineadas a la identidad de la marca con foco en calidad visual."
    },
    {
        role: "Diseñador Gráfico",
        company: "ART MODE",
        period: "2018 — 2021",
        desc: "Adaptación y preparación de archivos para impresión. Control de formatos, resolución y colores, asegurando la viabilidad técnica."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="experience">
            <div className="reveal">
                <h2>02 Trabajos</h2>
                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <h3>{exp.company}</h3>
                                <span className="period">{exp.period}</span>
                                <h4 className="role">{exp.role}</h4>
                                <p>{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
