'use client';

import { useState, useEffect, useRef } from 'react';
import './BeyondCode.css';

// Book data for The Disclosure Team
const disclosureBooks = [
    { title: 'The Roswell UFO Conspiracy', author: 'Nick Redfern', cover: '/Beyond Code/Books/The Roswell UFO Conspiracy (Nick Redfern).png' },
    { title: 'UFOs and the Deep State', author: 'Kevin D. Randle', cover: '/Beyond Code/Books/UFOs and the Deep State (Kevin D. Randle).jfif' },
    { title: 'Bringers of the Dawn', author: 'Barbara Marciniak', cover: '/Beyond Code/Books/Bringers of the Dawn - Teachings from Pleiadians (Barbara Marciniak).png' },
    { title: 'Gravitational Manipulation of Domed Craft', author: 'Paul Potter', cover: '/Beyond Code/Books/Gravitational Manipulation of Domed Craft (Paul Potter).png' },
    { title: 'Haunebu - The Secret Files', author: 'David Hatcher Childress', cover: '/Beyond Code/Books/Haunebu - The Secret Files (David Hatcher Childress).jfif' },
    { title: 'Black Holes', author: 'Stephen Hawking', cover: '/Beyond Code/Books/Black Holes (Stephen Hawking).jfif' },
    { title: 'Archaeology & Interstellar Communication', author: 'NASA', cover: '/Beyond Code/Books/Archaeology, Anthropology and Interstellar Communication (NASA).png' },
    { title: 'Ancient Astronomy of India and Egypt', author: 'Yash P. Aggarwal et al.', cover: '/Beyond Code/Books/Ancient Astronomy of India and Egypt (Yash P. Aggarwal, Juan Antonio Belmonte, William P. Brown).png' },
    { title: 'George Adamski - UFO Contactee', author: 'Professor Solomon', cover: '/Beyond Code/Books/George Adamski - The Story of a UFO Contactee (Professor Solomon).jfif' },
];

// Mahabharat translations - Added Geeta Press
const mahabharatBooks = [
    { title: 'BORI Critical Edition', cover: '/Beyond Code/Books/Mahabharat - BORI Critical Edition.jpg', description: 'The scholarly standard' },
    { title: 'Kisari Mohan Ganguli', cover: '/Beyond Code/Books/Mahabharat - Kisari Mohan Ganguli.jpg', description: 'Classic English translation' },
    { title: 'M. N. Dutt', cover: '/Beyond Code/Books/Mahabharat - M. N. Dutt.webp', description: 'Prose translation (My Favourite)' },
    { title: 'Geeta Press', cover: '/Beyond Code/Books/Mahabharat - Geeta Press.jpg', description: 'Hindi translation' },
];

export default function BeyondCode() {
    const sectionRef = useRef(null);
    const [hoveredBook, setHoveredBook] = useState(null);

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
        <section className="beyond-code" id="beyond-code" ref={sectionRef}>
            {/* Section Header */}
            <div className="beyond-header">
                <h2 className="beyond-title">
                    Beyond <span>Code</span>
                </h2>
                {/* Personality Statement */}
                <p className="personality-statement">
                    <span className="highlight">This person is not just a coder.</span> He's an eager and eccentric explorer
                    with deep curiosities that stretch far beyond the boundaries of technology - into the mysteries of the universe, ancient wisdom, cultural expression, and the untamed wild.
                </p>
                <div className="beyond-divider">
                    <span className="divider-star">✦</span>
                </div>
            </div>

            {/* Portal Grid */}
            <div className="portals-container">

                {/* ═══════════════════════════════════════════════════════════════
                    THE DISCLOSURE TEAM - Dark Brown Universe Theme
                ═══════════════════════════════════════════════════════════════ */}
                <div className="portal disclosure-portal">
                    {/* Cover Image Banner */}
                    <div className="portal-cover">
                        <img
                            src="/Beyond Code/The Disclosure Team Cover.png"
                            alt="The Disclosure Team Cover"
                            className="cover-image"
                        />
                        <div className="cover-overlay"></div>
                    </div>

                    <div className="portal-background">
                        <div className="stars"></div>
                        <div className="cosmic-glow"></div>
                    </div>

                    <div className="portal-content">
                        <div className="portal-header">
                            <img
                                src="/Beyond Code/The Disclosure Team Logo.png"
                                alt="The Disclosure Team"
                                className="portal-logo disclosure-logo"
                            />
                            <div className="portal-info">
                                <h3 className="portal-title disclosure-title">The Disclosure Team</h3>
                                <p className="portal-tagline">Exploring the Unexplained</p>
                                <div className="portal-tags">
                                    <span className="tag">Flying Saucers</span>
                                    <span className="tag">Paranormalism</span>
                                    <span className="tag">Quantum Science</span>
                                    <span className="tag">Unsolved Mysteries</span>
                                </div>
                            </div>
                        </div>

                        <p className="portal-description">
                            Since childhood, I've been fascinated by the mysteries of the universe - extraterrestrial phenomena, Quantum Science, unexplained events, and the
                            intersection of Physics and Metaphysics. I've lead a small international team
                            of curious minds exploring these frontiers.
                        </p>

                        {/* Platform Links */}
                        <div className="disclosure-platforms">
                            <div className="platform-section">
                                <div className="platform-header">
                                    <img src="/Beyond Code/The Disclosure Team - Pages.jpg" alt="Pages" className="section-icon" />
                                    <span>Pages</span>
                                </div>
                                <div className="platform-links">
                                    <a href="https://in.pinterest.com/thedisclosureteam/" target="_blank" rel="noopener noreferrer" className="platform-link pinterest">
                                        <i className="bx bxl-pinterest"></i>
                                        <span>Pinterest</span>
                                    </a>
                                    <a href="https://instagram.com/thedisclosureteam" target="_blank" rel="noopener noreferrer" className="platform-link instagram">
                                        <i className="bx bxl-instagram"></i>
                                        <span>Instagram</span>
                                    </a>
                                    <a href="https://t.me/theunsolvedworld" target="_blank" rel="noopener noreferrer" className="platform-link telegram">
                                        <i className="bx bxl-telegram"></i>
                                        <span>Resources</span>
                                    </a>
                                </div>
                            </div>

                            <div className="platform-section">
                                <div className="platform-header">
                                    <img src="/Beyond Code/The Disclosure Team - Group.jpg" alt="Groups" className="section-icon" />
                                    <span>Open Discussions</span>
                                </div>
                                <div className="platform-links">
                                    <a href="https://ig.me/j/Abb-ihrBPL-IIJDR/" target="_blank" rel="noopener noreferrer" className="platform-link instagram">
                                        <i className="bx bxl-instagram"></i>
                                        <span>IG Group</span>
                                    </a>
                                    <a href="https://t.me/thedisclosureteam" target="_blank" rel="noopener noreferrer" className="platform-link telegram">
                                        <i className="bx bxl-telegram"></i>
                                        <span>TG Group</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Books Grid - Larger with Names */}
                        <div className="books-section">
                            <div className="books-header">
                                <img src="/Beyond Code/The Disclosure Team - Books.jpg" alt="Books" className="section-icon" />
                                <span>Some of What I've Read and Recommended Reading</span>
                            </div>
                            <div className="books-grid">
                                {disclosureBooks.map((book, idx) => (
                                    <div
                                        key={idx}
                                        className="book-card-large"
                                        onMouseEnter={() => setHoveredBook(`disclosure-${idx}`)}
                                        onMouseLeave={() => setHoveredBook(null)}
                                    >
                                        <div className="book-cover-wrapper">
                                            <img src={book.cover} alt={book.title} className="book-cover-large" />
                                            <div className={`book-glow ${hoveredBook === `disclosure-${idx}` ? 'active' : ''}`}></div>
                                        </div>
                                        <div className="book-info">
                                            <h5 className="book-title">{book.title}</h5>
                                            <p className="book-author">{book.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════
                    भारतवर्ष का इतिहास - Ancient India Theme
                ═══════════════════════════════════════════════════════════════ */}
                <div className="portal bharatvarsh-portal">
                    {/* Cover Image Banner */}
                    <div className="portal-cover">
                        <img
                            src="/Beyond Code/Bharatvarsh Ka Itihaas Cover.png"
                            alt="भारतवर्ष का इतिहास Cover"
                            className="cover-image"
                        />
                        <div className="cover-overlay bharatvarsh-overlay"></div>
                    </div>

                    <div className="portal-background">
                        <div className="mandala-pattern"></div>
                        <div className="saffron-glow"></div>
                    </div>

                    <div className="portal-content">
                        <div className="portal-header bharatvarsh-header">
                            <img
                                src="/Beyond Code/Bharatvarsh Ka Itihaas Logo.png"
                                alt="भारतवर्ष का इतिहास"
                                className="portal-logo bharatvarsh-logo"
                            />
                            <div className="portal-info">
                                <h3 className="portal-title bharatvarsh-title">भारतवर्ष का इतिहास</h3>
                                <p className="portal-tagline devanagari">वेद • पुराण • महाभारत • ज्ञान</p>
                                <div className="portal-tags bharatvarsh-tags">
                                    <span className="tag">Vedic Culture</span>
                                    <span className="tag">Mahabharat</span>
                                    <span className="tag">Ancient Wisdom</span>
                                </div>
                            </div>
                        </div>

                        <p className="portal-description bharatvarsh-desc">
                            I'm drawn to the depths of our ancient Vedic heritage - the profound philosophy, the epic narratives of Mahabharat, and the timeless wisdom preserved in our scriptures. Here are translations by some authors which I've studied and recommend.
                        </p>

                        {/* Mahabharat Translations - Updated with 4 books and classier author styles */}
                        <div className="mahabharat-section">
                            <h4 className="mahabharat-heading">
                                <span className="sanskrit-accent">॥</span> महाभारत <span className="heading-english">Translations</span> <span className="sanskrit-accent">॥</span>
                            </h4>
                            <div className="mahabharat-grid">
                                {mahabharatBooks.map((book, idx) => (
                                    <div key={idx} className="mahabharat-card">
                                        <div className="mahabharat-cover-wrapper">
                                            <img src={book.cover} alt={book.title} className="mahabharat-cover" />
                                            <div className="mahabharat-shine"></div>
                                        </div>
                                        <div className="mahabharat-info">
                                            <h5 className="mahabharat-title">{book.title}</h5>
                                            <p className="mahabharat-desc-text">{book.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subtle page mentions */}
                        <div className="bharatvarsh-pages">
                            <a href="https://instagram.com/bharat.ka.itihaas" target="_blank" rel="noopener noreferrer" className="subtle-link">
                                <i className="bx bxl-instagram"></i>
                            </a>
                            <a href="http://www.youtube.com/@BharatvarshKaItihaas" target="_blank" rel="noopener noreferrer" className="subtle-link">
                                <i className="bx bxl-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════
                    THE RAP NATION - 90s Hip Hop Theme
                ═══════════════════════════════════════════════════════════════ */}
                <div className="portal rapnation-portal">
                    {/* Cover Image Banner */}
                    <div className="portal-cover">
                        <img
                            src="/Beyond Code/The Rap Nation Cover.jpg"
                            alt="The Rap Nation Cover"
                            className="cover-image"
                        />
                        <div className="cover-overlay rapnation-overlay"></div>
                    </div>

                    <div className="portal-background">
                        <div className="graffiti-texture"></div>
                        <div className="spotlight-effect"></div>
                    </div>

                    <div className="portal-content">
                        <div className="portal-header rapnation-header">
                            <img
                                src="/Beyond Code/The Rap Nation Logo.jpg"
                                alt="The Rap Nation"
                                className="portal-logo rapnation-logo"
                            />
                            <div className="portal-info">
                                <h3 className="portal-title rapnation-title">THE RAP NATION</h3>
                                <p className="portal-tagline rapnation-tagline">90s Hip Hop</p>
                                <div className="portal-tags rapnation-tags">
                                    <span className="tag">Tupac</span>
                                    <span className="tag">Eminem</span>
                                    <span className="tag">Boom Bap</span>
                                    <span className="tag">Golden Era</span>
                                </div>
                            </div>
                        </div>

                        <p className="portal-description rapnation-desc">
                            Used to be a devoted listener of Western hip hop, particularly the revolutionary
                            90s era, the raw storytelling, no mumble rapping, classic beats
                            and the birth of legends. While I appreciate modern artists, nothing
                            hits like the Golden Era.
                        </p>

                        {/* Platform Links styled as vinyl/cassettes */}
                        <div className="rapnation-platforms">
                            <a href="http://www.youtube.com/@TheNationOfRap" target="_blank" rel="noopener noreferrer" className="vinyl-link">
                                <div className="vinyl-disc">
                                    <i className="bx bxl-youtube"></i>
                                </div>
                                <span>YouTube</span>
                            </a>
                            <a href="https://instagram.com/ther.apnation" target="_blank" rel="noopener noreferrer" className="vinyl-link">
                                <div className="vinyl-disc">
                                    <i className="bx bxl-instagram"></i>
                                </div>
                                <span>Instagram</span>
                            </a>
                            <a href="https://t.me/TheRapNationBot" target="_blank" rel="noopener noreferrer" className="vinyl-link">
                                <div className="vinyl-disc">
                                    <i className="bx bxl-telegram"></i>
                                </div>
                                <span>˹ᴛʀɴ ꭙ ᴍᴜꜱɪᴄ˼ ♪</span>
                            </a>
                            <a href="https://github.com/TheRapNation" target="_blank" rel="noopener noreferrer" className="vinyl-link">
                                <div className="vinyl-disc github">
                                    <i className="bx bxl-github"></i>
                                </div>
                                <span>Open Source <br />&nbsp;&nbsp;&nbsp;(Bot Repo)</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════
                    THE SAFARI - Wildlife Theme
                ═══════════════════════════════════════════════════════════════ */}
                <div className="portal safari-portal">
                    {/* Cover Image Banner */}
                    <div className="portal-cover safari-cover-banner">
                        <img
                            src="/Beyond Code/The Safari Cover.png"
                            alt="The Safari Cover"
                            className="cover-image"
                        />
                        <div className="cover-overlay safari-overlay"></div>
                    </div>

                    <div className="portal-background">
                        <div className="jungle-vines"></div>
                        <div className="nature-glow"></div>
                    </div>

                    <div className="portal-content">
                        <div className="portal-header safari-header">
                            <img
                                src="/Beyond Code/The Safari Logo.png"
                                alt="The Safari"
                                className="portal-logo safari-logo"
                            />
                            <div className="portal-info">
                                <h3 className="portal-title safari-title">The Safari</h3>
                                <p className="portal-tagline safari-tagline">Into the Wild</p>
                                <div className="portal-tags safari-tags">
                                    <span className="tag">Wildlife</span>
                                    <span className="tag">Snakes</span>
                                    <span className="tag">Nature</span>
                                </div>
                            </div>
                        </div>

                        <p className="portal-description safari-desc">
                            Exploring the untamed beauty of the natural world - the fascinating
                            creatures, the delicate ecosystems, and the wild wonders that remind
                            us of life beyond our screens.
                        </p>

                        <div className="safari-platforms">
                            <a href="http://www.youtube.com/@thewildsnakes" target="_blank" rel="noopener noreferrer" className="safari-link">
                                <div className="leaf-icon">
                                    <i className="bx bxl-youtube"></i>
                                </div>
                                <span>Wild Snakes</span>
                            </a>
                            <a href="https://instagram.com/wild.snakes" target="_blank" rel="noopener noreferrer" className="safari-link">
                                <div className="leaf-icon">
                                    <i className="bx bxl-instagram"></i>
                                </div>
                                <span>@wild.snakes</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Section Footer */}
            <div className="beyond-footer">
                <p className="beyond-quote">
                    "The universe is not only queerer than we suppose, but queerer than we can suppose."
                </p>
                <span className="quote-author">~ J.B.S. Haldane</span>
            </div>
        </section>
    );
}
