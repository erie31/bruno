
import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <footer id="contact" className="contact">
            <div className="contact-content reveal">
                <h2>04 Contacto</h2>

                <div className="contact-info">
                    <div className="contact-item">
                        <span className="label">Email</span>
                        <a href="mailto:brunoguilenia@gmail.com" className="value">brunoguilenia@gmail.com</a>
                    </div>
                    <div className="contact-item">
                        <span className="label">Teléfono</span>
                        <a href="tel:+5493329538903" className="value">3329-538903</a>
                    </div>
                    <div className="contact-item">
                        <span className="label">Ubicación</span>
                        <span className="value">Rosario, Santa Fé, Argentina</span>
                    </div>
                </div>

                <div className="footer-logo">bg.</div>
                <p className="copyright">© {new Date().getFullYear()} Bruno Guilenia. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Contact;
