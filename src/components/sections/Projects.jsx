'use client';

import { useState } from 'react';

export default function Projects() {
    const [filter, setFilter] = useState('all');

    const projects = [
        {
            title: 'TalkHeal',
            category: 'webapp',
            image: '/images/TalkHealApp.png',
            tags: ['Python', 'Streamlit', 'Gemini-API', 'CSS3'],
            link: 'https://talkheal.streamlit.app/',
            description: '• A compassionate AI-based mental health assistant\n• 24/7 support with smart chat history\n• Mood slider and AI-based coping tips'
        },
        {
            title: 'BharatShaala',
            category: 'fullstack',
            image: '/images/BharatshaalaApp.jpg',
            tags: ['React (CRA)', 'Tailwind CSS', 'Python', 'Flask', 'SQLite'],
            link: 'https://bharatshaala.vercel.app/',
            description: '• Culture-first marketplace for Indian markets, artisans, authentic products'
        },
        {
            title: 'Happy Trails',
            category: 'fullstack',
            image: '/images/HappyTrailsApp.png',
            tags: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'JavaScript'],
            link: 'https://happytrails.vercel.app/',
            description: '• A modern bus booking platform with a poetic, cosmic-themed experience',
            developer: { name: 'Kavlin Kaur', avatar: '/images/Kavlemon.jpeg', link: 'https://kavlin-kaur.github.io/kavres/' }
        },
        {
            title: 'SaralSeva',
            category: 'fullstack',
            image: '/images/SaralSevaApp.png',
            tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'Tailwind-CSS', 'Vite'],
            link: 'https://saralseva.vercel.app/',
            description: 'A 3-tier digital governance platform for 24/7 access to government services'
        },
        {
            title: 'Spamlyser',
            category: 'aiml',
            image: '/images/SpamlyserApp.png',
            tags: ['Python', 'HuggingFace-Transformers', 'Pandas', 'Plotly', 'Regex'],
            link: 'https://spamlyser.streamlit.app',
            description: '• Spamlyser Pro is a real-time SMS spam classifier with LLMs'
        },
        {
            title: 'DeepOptinet',
            category: 'aiml',
            image: '/images/DeepOptinet.jpg',
            tags: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'MatPlotLib'],
            link: 'https://github.com/eccentriccoder01/DeepOptinet',
            description: '• An optimised CNN model for iris and fingerprint authentication'
        },
        {
            title: 'Climatrack',
            category: 'webapp',
            image: '/images/ClimatrackApp.png',
            tags: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'NumPy', 'Scikit-learn'],
            link: 'https://climatrack.streamlit.app/',
            description: '• An AI-powered weather intelligence platform'
        },
        {
            title: 'Atlasphere',
            category: 'webapp',
            image: '/images/AtlasphereApp.png',
            tags: ['HTML', 'CSS', 'JavaScript', 'Google Maps API'],
            link: 'https://eccentriccoder01.github.io/Atlasphere',
            description: '• A responsive interactive map application'
        },
        {
            title: 'NeuroAI',
            category: 'webapp',
            image: '/images/NeuroAIHome.png',
            tags: ['ReactJS', 'Vite', 'Gemini-API', 'CSS3'],
            link: 'https://theneuroai.vercel.app/',
            description: '• A sleek chatbot powered by Gemini'
        },
        {
            title: 'Neural Echoes',
            category: 'game',
            image: '/images/Neural Echoes App.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Neural-Echoes/',
            description: '• An interactive cyberpunk story web app'
        },
        {
            title: 'MystIQ',
            category: 'game',
            image: '/images/MystIQApp.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/MystIQ',
            description: '• Quiz app with customizable settings'
        },
        {
            title: 'Memorecall',
            category: 'game',
            image: '/images/MemorecallApp.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            link: 'https://eccentriccoder01.github.io/Memorecall/',
            description: '• A premium memory card game'
        }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'webapp', label: 'Web Apps' },
        { id: 'aiml', label: 'AI and ML' },
        { id: 'fullstack', label: 'Full-Stack' },
        { id: 'game', label: 'Games and Utils' }
    ];

    return (
        <section className="portfolio" id="portfolio">
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
                    {filteredProjects.map((project, idx) => (
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
            </div>
        </section>
    );
}
