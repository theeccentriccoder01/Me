'use client';

import { useState, useEffect } from 'react';
import './CreativeNavbar.css';

const navItems = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'education', name: 'My Journey' },
    { id: 'edulinkup', name: 'EduLinkUp' },
    { id: 'events', name: 'Events' },
    { id: 'skills', name: 'Skills' },
    { id: 'certifications', name: 'Certifications' },
    { id: 'projects', name: 'Projects' },
    { id: 'publications', name: 'Publications' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'beyond-code', name: 'Beyond Code' },
    { id: 'contact', name: 'Contact' },
];

export default function CreativeNavbar({ currentSection, onNavigate, isVisible = true }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!isVisible) return null;

    return (
        <header className="plain-header">
            {/* Mobile menu toggle */}
            <button
                className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Navigation */}
            <nav className={`plain-navbar ${isMenuOpen ? 'open' : ''}`}>
                <ul className="nav-list">
                    {navItems.map((item, index) => (
                        <li key={item.id} className="nav-item">
                            <a
                                href={`#${item.id}`}
                                className={`nav-link ${currentSection === index ? 'active' : ''}`}
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    onNavigate(index); 
                                    setIsMenuOpen(false); 
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
