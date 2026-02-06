'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Create Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add class to trigger animation
                        section.classList.add('show-animate');
                    } else {
                        // Remove class so animation can replay when returning
                        section.classList.remove('show-animate');
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '-50px 0px'
            }
        );

        observer.observe(section);

        // Initial trigger if home is visible on load
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('show-animate');
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="home" id="home" ref={sectionRef}>
            <div className="home-content">
                <h1>
                    नमस्ते, I&apos;m <span>Sagnik</span>
                    <span className="animate" style={{ '--i': 2 }}></span>
                </h1>
                <div className="text-animate">
                    <h3>Front-End Developer</h3>
                    <span className="animate" style={{ '--i': 3 }}></span>
                </div>
                <p>
                    I&apos;m a student pursuing BTech in Information Technology, and a results-driven
                    developer with expertise in Web Development (Front-end focused), UI/UX Design,
                    Brand Identity Creation, and AI/ML solutions. I&apos;m proficient in Python, JavaScript,
                    ReactJS, ExpressJS, NodeJS, and Machine Learning frameworks like TensorFlow and
                    Keras with a strong foundation in programming, data structures, and cloud computing.
                    <br /><br />
                    Beyond the world of existing advanced technologies, I hold a deep fascination for
                    Quantum Computing, Astronomy and the mysteries of the multiverse...
                    <span className="animate" style={{ '--i': 4 }}></span>
                </p>

                <div className="btn-box">
                    <a href="#education" className="btn">Hire Me</a>
                    <a href="#contact" className="btn">Let&apos;s Talk</a>
                    <span className="animate" style={{ '--i': 5 }}></span>
                </div>
            </div>

            <div className="home-sci">
                <a href="https://github.com/eccentriccoder01" target="_blank" rel="noopener noreferrer">
                    <i className="bx bxl-github"></i>
                </a>
                <a href="https://www.instagram.com/mr.ecc.entric/" target="_blank" rel="noopener noreferrer">
                    <i className="bx bxl-instagram"></i>
                </a>
                <a href="https://linkedin.com/in/eccentricexplorer" target="_blank" rel="noopener noreferrer">
                    <i className="bx bxl-linkedin"></i>
                </a>
                <a href="https://www.pinterest.com/mr_eccentric/" target="_blank" rel="noopener noreferrer">
                    <i className="bx bxl-pinterest"></i>
                </a>
                <a href="https://t.me/mreccen_tric" target="_blank" rel="noopener noreferrer">
                    <i className="bx bxl-telegram"></i>
                </a>
                <a href="https://www.kaggle.com/mreccentric" target="_blank" rel="noopener noreferrer">
                    <img src="/Logos/Kaggle.png" alt="Kaggle" style={{ width: '10px', height: '17.6px' }} />
                </a>
                <span className="animate" style={{ '--i': 6 }}></span>
            </div>

            <div className="home-imgHover"></div>
            <span className="animate home-img" style={{ '--i': 7 }}></span>
        </section>
    );
}
