'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import TowerLoader from '@/components/TowerLoader';

// Lazy load heavy components with better loading states
const Home = dynamic(() => import('@/components/sections/Home'), { ssr: false, loading: () => null });
const About = dynamic(() => import('@/components/sections/About'), { loading: () => null });
const Education = dynamic(() => import('@/components/sections/Education'), { loading: () => null });
const Events = dynamic(() => import('@/components/sections/Events'), { loading: () => null });
const Skills = dynamic(() => import('@/components/sections/Skills'), { loading: () => null });
const Certifications = dynamic(() => import('@/components/sections/Certifications'), { loading: () => null });
const Publications = dynamic(() => import('@/components/sections/Publications'), { loading: () => null });
const Projects = dynamic(() => import('@/components/sections/Projects'), { loading: () => null });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { loading: () => null });
const BeyondCode = dynamic(() => import('@/components/sections/BeyondCode'), { loading: () => null });
const Contact = dynamic(() => import('@/components/sections/Contact'), { loading: () => null });
const EduLinkUp = dynamic(() => import('@/components/sections/EduLinkUp'), { ssr: false, loading: () => null });
const CreativeNavbar = dynamic(() => import('@/components/Navigation/CreativeNavbar'), { loading: () => null });

// Dynamic import for Three.js with priority
const CosmicTowerBackground = dynamic(
    () => import('@/components/CosmicTower/CosmicTowerBackground'),
    { 
        ssr: false,
        loading: () => null,
    }
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
    const [isLoading, setIsLoading] = useState(true);
    const [introSettled, setIntroSettled] = useState(false);
    const [currentSection, setCurrentSection] = useState(-1);
    const [mode, setMode] = useState(MODES.INTRO);
    const [towerScrollProgress, setTowerScrollProgress] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(1);
    const userZoomedRef = useRef(false);
    const sectionsContainerRef = useRef(null);
    const sectionRefs = useRef([]);
    const wheelAccumulator = useRef(0);
    const touchStartY = useRef(null);
    const touchAccumulator = useRef(0);

    // Handle loader completion
    const handleLoaderComplete = useCallback(() => {
        // Small delay to ensure Three.js scene is ready
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, []);

    // Auto-transition from INTRO to TOWER_SCROLL after tower settles
    useEffect(() => {
        if (mode === MODES.INTRO && !isLoading) {
            // Snappy transition to interactive tower scroll mode
            const timer = setTimeout(() => {
                setIntroSettled(true);
                setMode(MODES.TOWER_SCROLL);
            }, 2800);
            return () => clearTimeout(timer);
        }
    }, [mode, isLoading]);

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
            userZoomedRef.current = true;
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

    // Compute a sensible default zoom based on viewport width
    useEffect(() => {
        const getDefaultZoom = (w) => {
            if (!w) return 1;
            if (w < 480) return 0.7; // small phones
            if (w < 768) return 0.8; // larger phones
            if (w < 1024) return 0.9; // tablets/small laptops
            return 1; // desktops
        };

        const applyDefault = () => {
            if (!userZoomedRef.current) {
                setZoomLevel(getDefaultZoom(window.innerWidth));
            }
        };

        // Set on mount
        applyDefault();

        // Update on resize only if user hasn't manually zoomed
        const onResize = () => {
            if (!userZoomedRef.current) applyDefault();
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Intersection Observer to track which section is in view
    useEffect(() => {
        if (mode !== MODES.VIEWING) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        const index = sectionRefs.current.indexOf(entry.target);
                        if (index !== -1) {
                            setCurrentSection(index);
                        }
                    }
                });
            },
            { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1], rootMargin: '0px 0px -20% 0px' }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [mode]);

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

    // Touch support for tower scroll mode (mobile swipe)
    useEffect(() => {
        const handleTouchStart = (e) => {
            if (mode !== MODES.TOWER_SCROLL) return;
            if (e.touches.length !== 1) return;
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (mode !== MODES.TOWER_SCROLL) return;
            if (e.touches.length !== 1 || touchStartY.current === null) return;

            const currentY = e.touches[0].clientY;
            const delta = touchStartY.current - currentY;
            touchStartY.current = currentY;

            e.preventDefault();
            touchAccumulator.current += delta;

            const threshold = 35; // Responsive swipe threshold for mobile
            if (Math.abs(touchAccumulator.current) >= threshold) {
                const direction = touchAccumulator.current > 0 ? -1 : 1;
                touchAccumulator.current = 0;

                setTowerScrollProgress((prev) => {
                    const step = 1 / (sections.length - 1 || 1);
                    let target = direction > 0 ? prev + step : prev - step;
                    target = Math.round(target / step) * step;
                    return Math.max(0, Math.min(1, target));
                });
            }
        };

        const handleTouchEnd = () => {
            touchStartY.current = null;
            touchAccumulator.current = 0;
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [mode, sections.length]);

    return (
        <>
            {/* Loading Screen */}
            {isLoading && <TowerLoader onComplete={handleLoaderComplete} />}
            
            {/* Creative Navbar - show after intro settles */}
            {!isLoading && (
                <CreativeNavbar
                    currentSection={currentSection}
                    onNavigate={handleNavNavigate}
                    isVisible={introSettled || mode !== MODES.INTRO}
                />
            )}

            {/* 3D Tower Background */}
            {!isLoading && (
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
            )}

            {/* Sections - continuous scroll layout */}
            {!isLoading && mode === MODES.VIEWING && (
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
            {!isLoading && mode === MODES.VIEWING && (
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

        /* Ensure sections are completely hidden during load/intro */
        .section-container {
          visibility: visible;
          opacity: 1;
          transition: opacity 0.3s ease;
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