
import React from 'react';
import './Skills.css';

const Skills = () => {
    return (
        <section id="skills" className="skills">
            <div className="skills-content reveal">
                <h2>03 Skills</h2>
                <p className="skills-intro">
                    Cuento con dominio completo de la Adobe Creative Suite y utilizo herramientas de inteligencia artificial aplicadas al proceso creativo y productivo, integrándolas como soporte real de trabajo y no como recurso superficial.
                </p>
                <p className="skills-intro">
                    Además, trabajo con equipo profesional propio, lo que me permite producir, editar y resolver proyectos de forma autónoma y eficiente, tanto en digital como en audiovisual, manteniendo control total sobre calidad, tiempos y resultado final.
                </p>

                <div className="skills-grid">
                    <div className="skill-item">Ai</div>
                    <div className="skill-item">Ps</div>
                    <div className="skill-item">Ae</div>
                    <div className="skill-item">Pr</div>
                    <div className="skill-item">Id</div>
                    <div className="skill-item">Lr</div>
                    <div className="skill-item">Figma</div>
                    <div className="skill-item">...etc</div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
