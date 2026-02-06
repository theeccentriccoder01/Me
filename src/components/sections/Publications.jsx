'use client';

import { useEffect, useRef } from 'react';
import './Publications.css';

const publications = [
    {
        title: 'DeepOptinet',
        subtitle: 'An Optimised CNN Model with Wavelet Filtering and SE-Blocks for Robust Iris and Fingerprint Unimodal Authentication',
        conference: '12th International Conference on "Microelectronics, Circuits and Systems"',
        publisher: 'MICRO 2025',
        link: 'https://www.actsoft.org/science/proceedings/abstract-micro2025.pdf',
        highlights: [
            'Optimised CNN with Wavelet Filtering and SE-Blocks',
            'Segmentation-free robust iris and fingerprint authentication',
            'Iris: 92.4% test accuracy, 95.83% prediction accuracy',
            'Fingerprint: 99% test accuracy, 100% prediction accuracy',
            'No augmentation required (Version 3, Kaggle)'
        ],
        type: 'conference',
        icon: 'bx-brain',
        year: '2025'
    },
    {
        title: 'Secure BLE Signal Transmission',
        subtitle: 'Implementing Secure BLE Signal Transmission through Antenna Design Techniques in Wearable IoT Devices',
        conference: 'Handbook of Security, Quantum Computing and Internet of Things (IoT)',
        publisher: 'CRC Press (Taylor & Francis Group)',
        link: 'https://www.routledge.com/Handbook-of-Security-Quantum-Computing-and-Internet-of-Things-IoT/Jain-Sayal-Bijalwan/p/book/9781032947013',
        highlights: [
            'Cross-layer security framework for wearable IoT devices',
            'Combines BLE protocol security with directional antenna design',
            'Modified MIFA antenna approach',
            'Reduces signal leakage and interception risk by up to 40%',
            'Maintains BLE performance while enhancing security'
        ],
        type: 'book-chapter',
        icon: 'bx-broadcast',
        year: '2025'
    }
];

export default function Publications() {
    const sectionRef = useRef(null);

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

    return (
        <section className="publications" id="publications" ref={sectionRef}>
            {/* Background Elements */}
            <div className="publications-bg">
                <div className="grid-pattern"></div>
                <div className="accent-line"></div>
            </div>

            {/* Section Header */}
            <div className="publications-header">
                <span className="section-label">Academic Contributions</span>
                <h2 className="publications-title">
                    Research & <span>Publications</span>
                </h2>
            </div>

            {/* Publications Grid */}
            <div className="publications-grid">
                {publications.map((pub, idx) => (
                    <article key={idx} className={`publication-card ${pub.type}`}>
                        {/* Card Header */}
                        <div className="pub-header">
                            <div className="pub-icon">
                                <i className={`bx ${pub.icon}`}></i>
                            </div>
                            <div className="pub-meta">
                                <span className="pub-type">{pub.type === 'conference' ? 'Conference Paper' : 'Book Chapter'}</span>
                                <span className="pub-year">{pub.year}</span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="pub-content">
                            <h3 className="pub-title">{pub.title}</h3>
                            <p className="pub-subtitle">{pub.subtitle}</p>

                            <div className="pub-venue">
                                <i className="bx bx-building-house"></i>
                                <div>
                                    <span className="venue-name">{pub.conference}</span>
                                    <span className="venue-publisher">{pub.publisher}</span>
                                </div>
                            </div>

                            {/* Key Highlights */}
                            <div className="pub-highlights">
                                <h4 className="highlights-title">Key Contributions</h4>
                                <ul className="highlights-list">
                                    {pub.highlights.map((highlight, hIdx) => (
                                        <li key={hIdx}>
                                            <i className="bx bx-check-circle"></i>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pub-footer">
                            <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pub-link"
                            >
                                <i className="bx bx-link-external"></i>
                                <span>View Publication</span>
                            </a>
                        </div>

                        {/* Decorative Elements */}
                        <div className="card-glow"></div>
                    </article>
                ))}
            </div>

            {/* Stats Bar */}
            <div className="publications-stats">
                <div className="stat-item">
                    <span className="stat-number">2</span>
                    <span className="stat-label">Publications</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-number">2025</span>
                    <span className="stat-label">Latest Year</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-number">AI & IoT</span>
                    <span className="stat-label">Research Areas</span>
                </div>
            </div>
        </section>
    );
}
