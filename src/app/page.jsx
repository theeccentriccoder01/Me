'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Import actual section components
import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Events from '@/components/sections/Events';
import Skills from '@/components/sections/Skills';
import Certifications from '@/components/sections/Certifications';
import Publications from '@/components/sections/Publications';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import BeyondCode from '@/components/sections/BeyondCode';
import Contact from '@/components/sections/Contact';
import EduLinkUp from '@/components/sections/EduLinkUp';
import CreativeNavbar from '@/components/Navigation/CreativeNavbar';

// Dynamic import for Three.js
const CosmicTowerBackground = dynamic(
    () => import('@/components/CosmicTower/CosmicTowerBackground'),
    { ssr: false }
);

// Section definitions
const sections = [
    { id: 'home', name: 'Home', Component: Home },
    { id: 'about', name: 'About', Component: About },
    { id: 'journey', name: 'My Journey', Component: Education },
    { id: 'edulinkup', name: 'EduLinkUp', Component: EduLinkUp },
    { id: 'events', name: 'Events', Component: Events },
    { id: 'skills', name: 'Skills', Component: Skills },
    { id: 'certifications', name: 'Certifications', Component: Certifications },
    { id: 'publications', name: 'Publications', Component: Publications },
    { id: 'projects', name: 'Projects', Component: Projects },
    { id: 'testimonials', name: 'Testimonials', Component: Testimonials },
    { id: 'beyond-code', name: 'Beyond Code', Component: BeyondCode },
    { id: 'contact', name: 'Contact', Component: Contact },
];


// Modes
const MODES = {
    INTRO: 'INTRO',
    TOWER_SCROLL: 'TOWER_SCROLL',  // New mode for scrolling through tower
    VIEWING: 'VIEWING',
    COLLAPSE: 'COLLAPSE',
    ROTATE: 'ROTATE',
    EXPAND: 'EXPAND',
};

export default function Page() {
    const [introSettled, setIntroSettled] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [mode, setMode] = useState(MODES.INTRO);
    const [towerScrollProgress, setTowerScrollProgress] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(1);
    const sectionsContainerRef = useRef(null);
    const sectionRefs = useRef([]);
    const wheelAccumulator = useRef(0);

    // Auto-transition from INTRO to TOWER_SCROLL after tower settles
    useEffect(() => {
        if (mode === MODES.INTRO) {
            const timer = setTimeout(() => {
                setIntroSettled(true);
                setMode(MODES.TOWER_SCROLL);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [mode]);

    // Handle "Explore My Universe" button click
    const handleExplore = useCallback(() => {
        setMode(MODES.VIEWING);
        setCurrentSection(0);
    }, []);

    // Handle section selection from tower buttons or navbar
    const handleSectionSelect = useCallback((sectionIndex) => {
        setMode(MODES.VIEWING);
        setCurrentSection(sectionIndex);
        // Scroll to section after a short delay to allow mode transition
        setTimeout(() => {
            sectionRefs.current[sectionIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }, []);

    // Handle navbar navigation
    const handleNavNavigate = useCallback((sectionIndex) => {
        if (mode === MODES.TOWER_SCROLL || mode === MODES.INTRO) {
            handleSectionSelect(sectionIndex);
        } else if (mode === MODES.VIEWING) {
            setCurrentSection(sectionIndex);
            sectionRefs.current[sectionIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [mode, handleSectionSelect]);

    // Handle wheel events
    const handleWheel = useCallback((e) => {
        // Ctrl+scroll for zoom (works in any mode)
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const zoomDelta = e.deltaY * 0.002;
            setZoomLevel(prev => Math.max(0.4, Math.min(2.5, prev + zoomDelta)));
            return;
        }

        // Tower scroll mode - scroll through the entire tower story-by-story
        if (mode === MODES.TOWER_SCROLL) {
            e.preventDefault();
            wheelAccumulator.current += e.deltaY;

            const threshold = 150;
            if (Math.abs(wheelAccumulator.current) >= threshold) {
                const direction = wheelAccumulator.current > 0 ? -1 : 1;
                wheelAccumulator.current = 0;

                setTowerScrollProgress(prev => {
                    const step = 1 / (sections.length - 1 || 1);
                    let target = direction > 0 ? prev + step : prev - step;
                    target = Math.round(target / step) * step;
                    return Math.max(0, Math.min(1, target));
                });
            }
            return;
        }
    }, [mode, sections.length]);

    // Intersection Observer to track which section is in view
    useEffect(() => {
        if (mode !== MODES.VIEWING) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        const index = sectionRefs.current.indexOf(entry.target);
                        if (index !== -1 && index !== currentSection) {
                            setCurrentSection(index);
                        }
                    }
                });
            },
            { threshold: [0.5], rootMargin: '-10% 0px -10% 0px' }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [mode, currentSection]);

    // Wheel listener - attach to window for tower scroll mode
    useEffect(() => {
        const handleGlobalWheel = (e) => {
            if (mode === MODES.TOWER_SCROLL) {
                handleWheel(e);
            }
        };

        window.addEventListener('wheel', handleGlobalWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleGlobalWheel);
    }, [handleWheel, mode]);

    return (
        <>
            {/* Creative Navbar - show after intro settles */}
            <CreativeNavbar
                currentSection={currentSection}
                onNavigate={handleNavNavigate}
                isVisible={introSettled || mode !== MODES.INTRO}
            />

            {/* 3D Tower Background */}
            <CosmicTowerBackground
                currentSection={currentSection}
                nextSection={null}
                totalSections={sections.length}
                mode={mode}
                isIntro={mode === MODES.INTRO}
                onExplore={handleExplore}
                towerScrollProgress={towerScrollProgress}
                onSectionSelect={handleSectionSelect}
                sections={sections}
                zoomLevel={zoomLevel}
            />

            {/* Sections - continuous scroll layout */}
            {mode === MODES.VIEWING && (
                <div className="sections-wrapper" ref={sectionsContainerRef}>
                    {sections.map((section, index) => {
                        const SectionComponent = section.Component;
                        return (
                            <section
                                key={section.id}
                                ref={(el) => (sectionRefs.current[index] = el)}
                                className="section-container"
                                data-section-index={index}
                            >
                                <SectionComponent />
                            </section>
                        );
                    })}
                    
                    {/* Footer at bottom after all sections */}
                    <footer className="cosmic-footer">
                        <div className="footer-glow"></div>
                        <div className="footer-content">
                            <div className="footer-divider">
                                <span className="divider-star">✦</span>
                            </div>
                            <p className="footer-copyright">
                                Copyright &copy; {new Date().getFullYear()} Portfolio by <span className="highlight">Eccentric Explorer</span>
                            </p>
                        </div>
                    </footer>
                </div>
            )}

            {/* Back to Tower Button - show when viewing sections */}
            {mode === MODES.VIEWING && (
                <button
                    className="back-to-tower-btn"
                    onClick={() => {
                        const step = 1 / (sections.length - 1 || 1);
                        setTowerScrollProgress(1 - currentSection * step);
                        setMode(MODES.TOWER_SCROLL);
                    }}
                    title="Back to Space"
                >
                    <span className="btn-icon">🌌</span>
                    <span className="btn-text">Space</span>
                </button>
            )}

            <style jsx global>{`
        html, body { overflow: hidden; height: 100%; }

        .sections-wrapper {
          position: fixed;
          inset: 0;
          z-index: 10;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: #AD2831 #0a0202;
        }

        .sections-wrapper::-webkit-scrollbar { width: 8px; }
        .sections-wrapper::-webkit-scrollbar-track { background: #0a0202; }
        .sections-wrapper::-webkit-scrollbar-thumb { background: #AD2831; border-radius: 4px; }

        .section-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        /* Back to Tower Button */
        .back-to-tower-btn {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.2rem;
          background: rgba(10, 2, 2, 0.9);
          border: 1px solid rgba(173, 40, 49, 0.5);
          border-radius: 2rem;
          color: #AD2831;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .back-to-tower-btn:hover {
          background: rgba(173, 40, 49, 0.2);
          border-color: #AD2831;
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(173, 40, 49, 0.4);
        }
        .back-to-tower-btn .btn-icon {
          font-size: 1.2rem;
        }

        /* Cosmic Footer */
        .cosmic-footer {
          width: 100%;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 2rem 2rem;
          text-align: center;
        }
        .cosmic-footer .footer-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(0deg, rgba(2, 1, 1, 0.98) 0%, rgba(2, 1, 1, 0.8) 50%, transparent 100%);
          pointer-events: none;
          z-index: -1;
        }
        .cosmic-footer .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .cosmic-footer .footer-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .cosmic-footer .footer-divider::before,
        .cosmic-footer .footer-divider::after {
          content: '';
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(173, 40, 49, 0.6), transparent);
        }
        .cosmic-footer .divider-star {
          color: #AD2831;
          font-size: 0.8rem;
          animation: starPulse 2s ease-in-out infinite;
        }
        @keyframes starPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .cosmic-footer .footer-copyright {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        .cosmic-footer .footer-copyright .highlight {
          color: #AD2831;
          font-weight: 600;
        }
        .cosmic-footer .footer-tagline {
          margin: 0;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.75rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .back-to-tower-btn { bottom: 1rem; left: 1rem; padding: 0.6rem 1rem; }
          .back-to-tower-btn .btn-text { display: none; }
          .cosmic-footer { padding: 1rem; }
          .cosmic-footer .footer-divider::before,
          .cosmic-footer .footer-divider::after { width: 40px; }
        }
      `}</style>
        </>
    );
}