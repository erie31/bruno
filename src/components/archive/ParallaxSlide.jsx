
import React, { useRef, useEffect, useState } from 'react';
import './ParallaxSlide.css';

const ParallaxSlide = ({ src, alt, index }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update visibility state when element enters/leaves viewport
                // Use a threshold to trigger slightly before it's fully visible if needed
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); // Reset to allow re-animation on reverse scroll
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1, // Trigger when 10% of the item is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        // Only apply parallax on non-mobile screens for performance
        if (window.innerWidth <= 768) return;

        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate position relative to viewport
            // If element is in view (with some buffer)
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate a value that goes from say -20 to 20 based on scroll position
                // Center of viewport = 0
                const distanceFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
                const speed = 0.05; // Adjust this value for intensity (0.05 = subtle, 0.2 = strong)
                setOffsetY(distanceFromCenter * speed);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const style = {
        transitionDelay: `${index < 2 ? index * 0.2 : 0}s`,
        // Apply the parallax transformation
        transform: isVisible ? `translateY(${offsetY * -1}px)` : `translateY(50px) scale(0.95)`,
    };

    return (
        <div
            ref={ref}
            className={`parallax-slide-container ${isVisible ? 'visible' : ''}`}
            style={style}
        >
            <div className="parallax-inner">
                <img
                    src={src}
                    alt={alt}
                    className="portfolio-slide"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default ParallaxSlide;
