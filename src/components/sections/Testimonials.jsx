'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './Testimonials.css';

const testimonials = [
    {
        name: 'Akshay Kumar',
        title: 'Full-Stack Developer | AI & Cloud-Driven Products',
        subtitle: 'MERN | Google Cloud Innovator',
        avatar: '/images/Akshay.jpg',
        quote: `I worked with Sagnik during GSSoC25 and Hacktoberfest 2025, where he maintained multiple repositories with great clarity, responsiveness, and leadership. He guided contributors patiently, set clear expectations, and offered constructive feedback that helped me learn and improve. His technical understanding and ability to manage large codebases made contributing a positive learning experience. I'd be happy to work with him again.`,
        context: 'GSSoC25 & Hacktoberfest 2025'
    },
    {
        name: 'Kavlin Kaur',
        title: 'MCA Student | Aspiring AI Engineer',
        subtitle: 'Exploring AI Solutions for Real-World Problems',
        avatar: '/images/Kavlemon.jpeg',
        quote: `I had the pleasure of working with Sagnik during GSSoC and Hacktoberfest, where he was not only a Project Admin, Maintainer, and Mentor, but also an incredible guide throughout the process.

From reviewing pull requests promptly to providing thoughtful feedback, Sagnik made every contribution a learning experience. His ability to manage multiple projects while still being approachable and encouraging speaks volumes about his leadership and mentoring skills.

He supported me at every step - whether it was helping me understand the project structure or guiding me toward best practices in open source. His patience, professionalism, and consistency really stood out.

Grateful to have collaborated with him, and I'd highly recommend Sagnik to anyone looking for a dedicated mentor or a reliable collaborator in the tech and open-source community.`,
        context: 'GSSoC & Hacktoberfest'
    }
];

export default function Testimonials() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef(null);

    // Scroll animation
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section.classList.add('show-animate');
                    } else {
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
        return () => observer.disconnect();
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                setIsAnimating(true);
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
                setTimeout(() => setIsAnimating(false), 500);
            }
        }, 8000);

        return () => clearInterval(interval);
    }, [isAnimating]);

    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    const handlePrev = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    const handleDotClick = useCallback((index) => {
        if (isAnimating || index === activeIndex) return;
        setIsAnimating(true);
        setActiveIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, activeIndex]);

    const currentTestimonial = testimonials[activeIndex];

    return (
        <section className="testimonials" id="testimonials" ref={sectionRef}>
            {/* Background Elements */}
            <div className="testimonials-bg">
                <div className="quote-watermark">"</div>
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
            </div>

            {/* Section Header */}
            <div className="testimonials-header">
                <span className="section-label">What People Say</span>
                <h2 className="testimonials-title">
                    Voices of <span>Collaboration</span>
                </h2>
                <p className="testimonials-subtitle">
                    Words from those I've had the privilege to work with
                </p>
            </div>

            {/* Testimonial Card */}
            <div className="testimonial-showcase">
                <button className="nav-arrow prev" onClick={handlePrev} aria-label="Previous testimonial">
                    <i className="bx bx-chevron-left"></i>
                </button>

                <div className={`testimonial-card ${isAnimating ? 'animating' : ''}`}>
                    {/* Quote Icon */}
                    <div className="quote-icon">
                        <i className="bx bxs-quote-left"></i>
                    </div>

                    {/* Quote Content */}
                    <div className="quote-content">
                        <p className="quote-text">{currentTestimonial.quote}</p>
                    </div>

                    {/* Author Info */}
                    <div className="testimonial-author">
                        <div className="author-avatar">
                            {currentTestimonial.avatar ? (
                                <img src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                            ) : (
                                <div className="avatar-placeholder">
                                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                        </div>
                        <div className="author-info">
                            <h4 className="author-name">{currentTestimonial.name}</h4>
                            <p className="author-title">{currentTestimonial.title}</p>
                            <p className="author-subtitle">{currentTestimonial.subtitle}</p>
                        </div>
                        <div className="context-badge">
                            <i className="bx bx-code-alt"></i>
                            <span>{currentTestimonial.context}</span>
                        </div>
                    </div>
                </div>

                <button className="nav-arrow next" onClick={handleNext} aria-label="Next testimonial">
                    <i className="bx bx-chevron-right"></i>
                </button>
            </div>

            {/* Navigation Dots */}
            <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
