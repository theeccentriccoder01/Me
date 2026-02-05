'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);

            // Find active section
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const top = window.scrollY;
                const offset = section.offsetTop - 100;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (top >= offset && top < offset + height) {
                    setActiveSection(id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        setMenuOpen(false);
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'education', label: 'My Journey' },
        { id: 'events', label: 'Events' },
        { id: 'skills', label: 'Skills' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'portfolio', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <header className={`header ${isSticky ? 'sticky' : ''}`}>
            <Link href="#" className="logo">
                Eccentric Explorer
            </Link>

            <div
                className={`bx bx-menu ${menuOpen ? 'bx-x' : ''}`}
                id="menu-icon"
                onClick={() => setMenuOpen(!menuOpen)}
            />

            {/* Floating saucer navigation */}
            <div className="saucer-nav">
                {navItems.map((item, idx) => (
                    <button
                        key={item.id}
                        aria-label={item.label}
                        className={`saucer ${activeSection === item.id ? 'active' : ''}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        style={{ ['--delay']: `${idx * 0.08}s` }}
                    >
                        <span className="saucer-dome">{item.label.split(' ')[0]}</span>
                        <span className="saucer-base" />
                    </button>
                ))}
            </div>
        </header>
    );
}
