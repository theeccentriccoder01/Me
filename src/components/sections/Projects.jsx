'use client';

import { useState, useEffect, useRef } from 'react';

export default function Projects() {
    const sectionRef = useRef(null);
    const [filter, setFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(9);

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

    const projects = [
        {
            title: 'TalkHeal',
            category: 'webapp',
            image: '/images/TalkHealApp.png',
            tags: ['Python', 'Streamlit', 'Gemini-API', 'CSS3'],
            link: 'https://talkheal.streamlit.app/',
            description: '• A compassionate AI-based mental health assistant\n• 24/7 support with smart chat history\n• Mood slider and AI-based coping tips\n• Mental health resources and helplines\n• Location-based center search (Google Maps)\n• Clean 3D-inspired pink/magenta UI and mobile-ready responsive design'
        },
        {
            title: 'BharatShaala',
            category: 'fullstack',
            image: '/images/BharatshaalaApp.jpg',
            tags: ['React (CRA)', 'Tailwind CSS', 'Python', 'Flask', 'SQLite'],
            link: 'https://bharatshaala.vercel.app/',
            description: '• Culture-first marketplace for Indian markets, artisans, authentic products\n• Immersive UI with animations; market discovery; category-first shopping\n• Vendor routes scaffolded; SEO, performance, accessibility focused\n• Frontend: React (CRA), Tailwind CSS, Framer Motion, Axios\n• Backend: Python, Flask, SQLite, Razorpay'
        },
        {
            title: 'Happy Trails',
            category: 'fullstack',
            image: '/images/HappyTrailsApp.png',
            tags: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS'],
            link: 'https://happytrails.vercel.app/',
            description: '• A modern bus booking platform with a poetic, cosmic-themed, and immersive user experience.\n• Features secure user accounts, real-time search, interactive seat selection, and a personal dashboard to manage all bookings.\n• Includes live bus tracking on a map with Leaflet.js and destination weather forecasts from the OpenWeatherMap API.',
            developer: { name: 'Kavlin Kaur', avatar: '/images/Kavlemon.jpeg', link: 'https://kavlin-kaur.github.io/kavres/' }
        },
        {
            title: 'SaralSeva',
            category: 'fullstack',
            image: '/images/SaralSevaApp.png',
            tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'Tailwind-CSS', 'Vite', 'Twilio', 'Cloudinary'],
            link: 'https://saralseva.vercel.app/',
            description: 'SaralSeva is a 3-tier digital governance platform which enables 24/7 access to government services, tracks applications with unique IDs, automates workflows, manages schemes, and ensures grievance redressal for citizens, employees, and admins.'
        },
        {
            title: 'Qonnect',
            category: 'fullstack',
            image: '/images/QonnectApp.png',
            tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'REST APIs', 'Tailwind-CSS', 'PostCSS'],
            link: 'https://qonnect-kavlin.vercel.app/',
            description: '• A poetic academic networking platform designed to help students and faculty discover, connect, and collaborate.\n• Features include swipe-based user discovery, searchable directories, study groups, and rich user profiles.\n• Built with a unique, immersive UI using glass morphism, gradients, and a narrative-led design.',
            developer: { name: 'Kavlin Kaur', avatar: '/images/Kavlemon.jpeg', link: 'https://kavlin-kaur.github.io/kavres/' }
        },
        {
            title: 'QuizCraft',
            category: 'game',
            image: '/images/QuizCraftApp.png',
            tags: ['JavaScript (ES6+)', 'Vanilla HTML5', 'CSS3'],
            link: 'https://quizcraft-kavlin.vercel.app/',
            description: '• A cyberpunk-themed quiz platform for developers.\n• Features an advanced multi-theme engine, timed quizzes, and a user analytics dashboard.\n• Saves all user progress and preferences to Local Storage for a persistent, client-side experience.\n• Styled with glassmorphism, Google Fonts, and Font Awesome.',
            developer: { name: 'Kavlin Kaur', avatar: '/images/Kavlemon.jpeg', link: 'https://kavlin-kaur.github.io/kavres/' }
        },
        {
            title: 'Spamlyser',
            category: 'aiml',
            image: '/images/SpamlyserApp.png',
            tags: ['Python', 'HuggingFace-Transformers', 'Pandas', 'Plotly', 'Regex'],
            link: 'https://spamlyser.streamlit.app',
            description: '• Spamlyser Pro is a real-time SMS spam classifier with LLMs (DistilBERT, BERT, RoBERTa, ALBERT) using Python, Streamlit, Transformers, Hugging Face, Pandas, Plotly, Regex for fast, visual, feature-rich detection.\n• Live predictions, feature analysis, spam indicators, and visual performance stats.\n• Dark mode UI with model switching & emoji-rich results.'
        },
        {
            title: 'DeepOptinet',
            category: 'aiml',
            image: '/images/DeepOptinet.jpg',
            tags: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'MatPlotLib'],
            link: 'https://github.com/eccentriccoder01/DeepOptinet',
            description: '• An optimised CNN model with Wavelet Filtering and SE-Blocks for segmentation-free robust iris and fingerprint unimodal authentication.\n• Test and Prediction Accuracies were 92.4% and 95.83% for Iris, 99.% and 100% for Fingerprint, without any augmentation (Version 3, Kaggle).'
        },
        {
            title: 'Climatrack',
            category: 'webapp',
            image: '/images/ClimatrackApp.png',
            tags: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'NumPy', 'Scikit-learn'],
            link: 'https://climatrack.streamlit.app/',
            description: '• An AI-powered weather intelligence platform offering deep analytical insights beyond standard forecasts.\n• Customisable dashboard, interactive charts, live radar, multi-layer maps, historical data lookup, location comparison, and real-time alerts.\n• Provides predictive trends, a proprietary "Comfort Score," optimal day recommendations, and risk analysis for heat waves and cold snaps.'
        },
        {
            title: 'Atlasphere',
            category: 'webapp',
            image: '/images/AtlasphereApp.png',
            tags: ['HTML', 'CSS', 'JavaScript', 'Google Maps API'],
            link: 'https://eccentriccoder01.github.io/Atlasphere',
            description: '• A responsive interactive map application which uses the Google Maps JavaScript API and Places API for dynamic map rendering, location searching, and fetching nearby places.\n• Key features include categorised filtering, custom markers with info windows, geolocation to find the user\'s location, and a clean dark-themed UI.\n• The application provides a seamless user experience with real-time toast notifications, fullscreen mode, and a collapsible sidebar.'
        },
        {
            title: 'Venturalink',
            category: 'fullstack',
            image: '/images/VenturalinkApp.png',
            tags: ['JavaScript', 'Tailwind CSS', 'Firebase'],
            link: 'https://venturalink.vercel.app/',
            description: '• A platform that connects business minds with capital using real-time tools, dashboards & proposal systems.\n• Entrepreneurs can submit & manage proposals\n• Investors explore filtered business ideas\n• Dashboards show insights, activities, and analytics\n• Role-based login, smooth UI, and animated interactions'
        },
        {
            title: 'VoyageVista',
            category: 'fullstack',
            image: '/images/VoyageVistaApp.jpeg',
            tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'Tailwind-CSS', 'Bootstrap'],
            link: 'https://voyagevista.vercel.app/',
            description: 'VoyageVista is a demonstrative international travel-booking website which vows to facilitate journeys, enabling seamless bookings that are truly international, without the weight of extra charges...'
        },
        {
            title: 'Neural Echoes',
            category: 'game',
            image: '/images/Neural Echoes App.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Neural-Echoes/',
            description: '• An interactive cyberpunk story web app with a dynamic, branching narrative and timed decisions.\n• The game tracks player stats (Trust, Stealth, Intel) and includes an achievement system.\n• The UI has a typewriter effect, dynamic background, and is fully responsive.'
        },
        {
            title: '˹ᴛʀɴ ꭙ ᴍᴜꜱɪᴄ˼ ♪',
            category: 'game',
            image: '/images/TheRapNation.jpg',
            tags: ['Python', 'Pyrogram', 'MongoDB', 'Docker'],
            link: 'https://github.com/eccentriccoder01/TheRapNation',
            description: '• A sleek music bot powered by Telegram for smart, interactive music streaming.\n• Start new sessions, queue management, playlist support\n• Voice chat integration with high-quality audio streaming\n• Admin controls and user-friendly commands\n• MongoDB integration for persistent data\n• Fully responsive with Docker deployment'
        },
        {
            title: 'HyperMathix',
            category: 'webapp',
            image: '/images/HyperMathixLogo.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://github.com/eccentriccoder01/HyperMathix',
            description: 'HyperMathix is a scientific calculator which offers unparalleled calculation speed and precision, empowering users with advanced graph plotting and real-time collaborative problem-solving for complex mathematical tasks...'
        },
        {
            title: 'Cosmosphere',
            category: 'webapp',
            image: '/images/CosmosphereApp.png',
            tags: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
            link: 'https://eccentriccoder01.github.io/Cosmosphere/',
            description: '• An interactive web application detailing the history and future of space exploration.\n• Dynamic timeline with animated era switching, starry background and counters for key statistics.\n• Interactive mission simulator to configure and launch virtual missions.\n• Data visualisations including progress ring, bar, and pie charts.\n• Showcases future projects like Mars colonisation and lunar bases.'
        },
        {
            title: 'MystIQ',
            category: 'game',
            image: '/images/MystIQApp.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/MystIQ',
            description: '• Quiz app with customizable settings (topics, difficulty, question count, time limits) and detailed results.\n• Fetches questions from Open Trivia Database API with offline fallback.\n• Gamified UI with themes (Cyberpunk, Forest, Ocean, Sunset, Cosmic), animations, and progress tracking via localStorage.'
        },
        {
            title: 'TalkAnon',
            category: 'fullstack',
            image: '/images/TalkAnonApp.png',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'NodeJS', 'ExpressJS', 'Socket.IO'],
            link: 'https://eccentriccoder01.github.io/TalkAnon/',
            description: 'TalkAnon is a full-stack, anonymous chatroom hub which features multiple chatrooms, customisable settings including dark mode and notifications, and rich message formatting. The responsive UI ensures a seamless experience across all devices.'
        },
        {
            title: 'NeuroAI',
            category: 'webapp',
            image: '/images/NeuroAIHome.png',
            tags: ['ReactJS', 'Vite', 'Gemini-API', 'CSS3'],
            link: 'https://theneuroai.vercel.app/',
            description: '• A sleek chatbot powered by Gemini for smart, interactive, and responsive conversations.\n• Start new chats, resume saved sessions from localStorage, delete previous chat sessions\n• Use quick replies and an emoji picker, react to messages and copy them easily\n• Structured for future voice input and file sharing\n• Rich messages with Markdown support\n• Fully responsive UI with animations and themes'
        },
        {
            title: 'Attiria',
            category: 'fullstack',
            image: '/images/AttiriaApp.png',
            tags: ['ReactJS', 'Tailwind CSS', 'Python', 'Django-REST-Framework', 'SQLite', 'Scrapy'],
            link: 'https://github.com/eccentriccoder01/Attiria',
            description: 'A full-stack e-commerce clone of the Nobero website with product listings, filtering, and detail views, developed using ReactJS, Python, Django REST Framework, and Scrapy for live product data scraping...'
        },
        {
            title: 'Fundfolio',
            category: 'webapp',
            image: '/images/FundfolioApp.jpeg',
            tags: ['ReactJS', 'Context-API', 'CSS3'],
            link: 'https://fund-folio.vercel.app/',
            description: '• A Budget-management app with real-time tracking, visual dashboards, and easy department-wise fund allocation.\n• Multi-currency support with live status indicators\n• Table view with sorting, searching, and reset options\n• Instant +£10/−£10 adjustments with visual feedback\n• Clean, modern, mobile-friendly UI with validation'
        },
        {
            title: 'Quilll',
            category: 'fullstack',
            image: '/images/QuilllApp.png',
            tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'Tailwind-CSS'],
            link: 'https://thequilll.vercel.app/',
            description: 'Quilll is a dynamic blogging platform that empowers both bloggers and readers, offering a range of unique features. Also allows readers to ask questions, give feedback, and even collaborate with bloggers in real-time discussions, creating an interactive and participatory blogging experience...'
        },
        {
            title: 'Aurorista',
            category: 'webapp',
            image: '/images/AuroristaApp.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Aurorista/',
            description: 'An interactive image slider and gallery designed to showcase captivating visuals with an elegant and intuitive user interface. It combines smooth animations, responsive design, and robust controls to deliver an exceptional Browse experience.'
        },
        {
            title: 'Luxtick',
            category: 'webapp',
            image: '/images/LuxtickApp.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Luxtick/',
            description: 'Luxtick is a premium web-based countdown timer application offering a stylish, highly customisable, and functional user experience.'
        },
        {
            title: 'Memorecall',
            category: 'game',
            image: '/images/MemorecallApp.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Memorecall/',
            description: '• A premium memory card game with a dark theme and gold accents.\n• Find matching pairs on a dynamic board with multiple difficulty levels.\n• Features a real-time timer, move counter, and score tracker. Includes hint functionality, pause/resume, and keyboard shortcuts.\n• The UI is fully responsive with smooth 3D card-flipping animations, interactive modals, and dynamic background effects.'
        },
        {
            title: 'Nikola Tesla: Illuminating Legacies',
            category: 'webapp',
            image: '/images/TeslaPage.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Nikola-Tesla-Illuminating-Legacies/',
            description: 'This interactive tribute webpage celebrates the life, achievements, and enduring legacy of Nikola Tesla - the brilliant scientist whose visionary ideas shaped our modern world. Through elegant design and engaging interactivity, we honor the man who saw beyond what the human mind could perceive.'
        },
        {
            title: 'TextTangle',
            category: 'game',
            image: '/images/TextTangleLight.png',
            tags: ['HTML5', 'CSS3', 'jQuery', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/TextTangle/',
            description: '• A modern, animated Wordle game with smart features, daily challenges, custom words (2-Player)\n• Easy/Medium/Hard modes\n• Toggle sound and dark mode, and fully responsive UI with animations\n• Colorblind-friendly option (C/E/W)\n• Tracks wins, streaks, stats, guess history\n• Shows word meaning + quote after game\n• Letter frequency heatmap\n• On-screen virtual keyboard'
        },
        {
            title: 'Planorama',
            category: 'webapp',
            image: '/images/PlanoramaApp.png',
            tags: ['HTML5', 'CSS3', 'jQuery', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Planorama/',
            description: '• A sleek task manager with smart sorting, live stats, smooth animations, glassmorphism UI, and a responsive layout for seamless productivity.\n• Add tasks with deadline, description, and priority (high, low, auto).\n• Auto-organises tasks based on urgency.\n• Mark tasks done; filter by All, Pending, or Completed, and search tasks instantly by name.\n• View live stats: total, done, pending.'
        },
        {
            title: 'Scan-R',
            category: 'webapp',
            image: '/images/Scan-RLight.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Scan-R/',
            description: '• A QR code web app to generate, scan, upload, and decode customisable QR codes with themes, templates, and live camera support.\n• Set size, colors, and error correction (L, M, Q, H)\n• Download, copy, or share QR codes instantly\n• Upload or drag-and-drop QR images to decode\n• Scan QR codes using your device camera\n• Copy decoded text or reuse it in generator\n• Quick templates for Wi-Fi, email, phone, SMS\n• Responsive UI with animated backgrounds, Light/Dark modes with smooth animations'
        }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 9, filteredProjects.length));
    };

    const loadAll = () => {
        setVisibleCount(filteredProjects.length);
    };

    const showLess = () => {
        setVisibleCount(9);
    };

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'webapp', label: 'Web Apps' },
        { id: 'aiml', label: 'AI and ML' },
        { id: 'fullstack', label: 'Full-Stack' },
        { id: 'game', label: 'Games and Utils' }
    ];

    return (
        <section className="portfolio" id="projects" ref={sectionRef}>
            <h2 className="heading">My <span>Projects</span></h2>

            <div className="myBtnBox">
                <div id="myBtnContainer" className="btn-container">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            className={`filter-item ${filter === f.id ? 'active' : ''}`}
                            onClick={() => setFilter(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="portfolio-body">
                <div className="project-box">
                    {filteredProjects.slice(0, visibleCount).map((project, idx) => (
                        <div key={idx} className="project-container">
                            {project.developer && (
                                <div className="developer-badge">
                                    <img src={project.developer.avatar} alt={project.developer.name} className="developer-avatar" />
                                    <div className="developer-tooltip">
                                        <h5>💝 {project.developer.name}</h5>
                                        <p>Original Developer</p>
                                        <a href={project.developer.link} target="_blank" rel="noopener noreferrer" className="meet-link">
                                            ✨ Meet Her
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="hover-note">
                                {project.description}
                            </div>

                            <div className={`post ${project.category} all`}>
                                <div className="card">
                                    <img src={project.image} className="card-img-top" alt={project.title} />
                                    <div className="card-body text-center">
                                        <h4 className="card-title">{project.title}</h4>
                                        {project.tags.map((tag, tagIdx) => (
                                            <span key={tagIdx} className="badge bg-secondary badge-pill">
                                                {tag}
                                            </span>
                                        ))}
                                        <br />
                                        <a href={project.link} className="link" target="_blank" rel="noopener noreferrer">
                                            Visit
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="load-more-container">
                    {visibleCount < filteredProjects.length && (
                        <>
                            <button className="btn" onClick={loadMore}>Load More</button>
                            <button className="inverse-btn" onClick={loadAll}>Load All</button>
                        </>
                    )}
                    {visibleCount > 9 && (
                        <button className="btn" onClick={showLess}>Show Less</button>
                    )}
                </div>
            </div>
        </section>
    );
}
