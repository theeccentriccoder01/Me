'use client';

import { useState, useEffect } from 'react';
import './CreativeNavbar.css';

const navItems = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'about', name: 'About', icon: '👤' },
    { id: 'journey', name: 'My Journey', icon: '🎓' },
    { id: 'edulinkup', name: 'EduLinkUp', icon: '🌐' },
    { id: 'events', name: 'Events', icon: '🎪' },
    { id: 'skills', name: 'Skills', icon: '⚡' },
    { id: 'certifications', name: 'Certifications', icon: '🏆' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'contact', name: 'Contact', icon: '✉️' },
];

export default function CreativeNavbar({ currentSection, onNavigate, isVisible = true }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    if (!isVisible) return null;

    return (
        <header className="cosmic-header">


            {/* Mobile menu toggle */}
            <button
                className={`cosmic-menu-toggle ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Navigation - floating saucers */}
            <nav className={`cosmic-navbar ${isMenuOpen ? 'open' : ''}`}>
                <div className="saucer-nav">
                    {navItems.map((item, index) => (
                        <button
                            key={item.id}
                            className={`saucer ${currentSection === index ? 'active' : ''}`}
                            onClick={(e) => { e.preventDefault(); onNavigate(index); setIsMenuOpen(false); }}
                            onMouseEnter={() => setHoveredItem(index)}
                            onMouseLeave={() => setHoveredItem(null)}
                            aria-label={item.name}
                            style={{ ['--delay']: `${index * 0.06}s` }}
                        >
                            <span className="saucer-dome">{item.name}</span>
                            <div className="saucer-lights">
                                <span></span><span></span><span></span>
                            </div>
                            <span className="saucer-label">{item.name}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Floating UFO decoration */}
            <div className="floating-ufo">
                <div className="ufo-body">
                    <div className="ufo-dome"></div>
                    <div className="ufo-lights">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        </header>
    );
}
