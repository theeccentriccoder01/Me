'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { Html, Float, Line, OrbitControls, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// ICON SVGs for different link types
// -----------------------------------------------------------------------------
const LINK_ICONS = {
    youtube: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    ),
    linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    ),
    whatsapp: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    ),
    email: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
        </svg>
    ),
    website: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm9.885 11h-3.095c-.057-2.17-.393-4.195-.965-5.927a9.94 9.94 0 012.956 4.927h1.104zM12 22c-.69 0-1.783-1.755-2.318-5h4.636C13.783 20.245 12.69 22 12 22zm-2.54-7c-.082-.895-.126-1.858-.126-2.875S9.378 9.895 9.46 9h5.08c.082.895.126 1.858.126 2.875s-.044 1.98-.126 2.875H9.46zM2 12c0-.69.076-1.362.218-2.01l.887-.001c-.057 2.17.393 4.195.965 5.927A9.94 9.94 0 012.115 11H2zm2.115-1h3.095c.057-2.17.393-4.195.965-5.927A9.94 9.94 0 015.22 10H4.115zM12 2c.69 0 1.783 1.755 2.318 5H9.682C10.217 3.755 11.31 2 12 2zm5.825 3.073c.572 1.732.908 3.757.965 5.927h3.095a9.94 9.94 0 00-4.06-5.927zM6.175 18.927c-.572-1.732-.908-3.757-.965-5.927H2.115a9.94 9.94 0 004.06 5.927zM17.825 18.927a9.94 9.94 0 004.06-5.927h-3.095c-.057 2.17-.393 4.195-.965 5.927z" />
        </svg>
    ),
};

// Get icon based on URL
const getIconForUrl = (url, label) => {
    const lowerUrl = url.toLowerCase();
    const lowerLabel = label.toLowerCase();

    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return LINK_ICONS.youtube;
    if (lowerUrl.includes('linkedin.com')) return LINK_ICONS.linkedin;
    if (lowerUrl.includes('instagram.com')) return LINK_ICONS.instagram;
    if (lowerUrl.includes('github.com') || lowerLabel.includes('github')) return LINK_ICONS.github;
    if (lowerUrl.includes('whatsapp.com') || lowerUrl.includes('chat.whatsapp')) return LINK_ICONS.whatsapp;
    if (lowerUrl.includes('mailto:') || lowerLabel.includes('email')) return LINK_ICONS.email;
    return LINK_ICONS.website;
};

// Get color for icon based on type
const getIconColor = (url) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('youtube')) return '#FF0000';
    if (lowerUrl.includes('linkedin')) return '#0A66C2';
    if (lowerUrl.includes('instagram')) return '#E4405F';
    if (lowerUrl.includes('github')) return '#ffffff';
    if (lowerUrl.includes('whatsapp')) return '#25D366';
    if (lowerUrl.includes('mailto')) return '#EA4335';
    return '#AD2831';
};

// -----------------------------------------------------------------------------
// MODULE DATA
// -----------------------------------------------------------------------------
const MODULES = [
    {
        id: 1,
        title: "Internship at EduLinkUp",
        label: "Internships",
        pos: [0, 1.5, 0],
        color: "#ff3366",
        status: "LIVE",
        desc: "45-day structured program with modules, tasks, and capstone project.",
        details: ["Content creation as pedagogy", "Proof-of-work portfolio", "Community-led learning"],
        links: [
            { label: "Apply for Internship", url: "https://www.edulinkup.dev/internships" },
            { label: "Campus Ambassador", url: "https://www.edulinkup.dev/campus-ambassador" }
        ]
    },
    {
        id: 2,
        title: "Study Portal",
        label: "Study Portal",
        pos: [-1.8, -0.8, 1.0],
        color: "#ffcc00",
        status: "UPCOMING",
        desc: "Interactive tutorials, MCQs, study materials and test series.",
        details: ["Comprehensive materials", "Self-paced learning"],
        links: [
            { label: "Browse Courses", url: "https://www.edulinkup.dev/courses" }
        ]
    },
    {
        id: 3,
        title: "Google Cloud Arcade",
        label: "Cloud Arcade",
        pos: [1.8, 0.3, 1.5],
        color: "#4285F4",
        status: "LIVE",
        desc: "Google Arcade Facilitator Program & Cloud Skills Boost resources.",
        details: ["Arcade Dashboard", "Points Calculator", "Badges & Solutions"],
        links: [
            { label: "Arcade Calculator", url: "https://www.edulinkup.dev/arcade-calculator" },
            { label: "ELU Arcaders Club", url: "https://chat.whatsapp.com/HN5eOl0p5DBKBqTbIiOTgv" }
        ]
    },
    {
        id: 4,
        title: "Job Portal",
        label: "Jobs",
        pos: [1.5, -1, -1.0],
        color: "#00cc99",
        status: "UPCOMING",
        desc: "Aggregated global job listings filtered by domain.",
        details: ["Domain-specific filters", "Global opportunities"],
        links: [
            { label: "Explore Jobs", url: "https://www.edulinkup.dev/jobs" }
        ]
    },
    {
        id: 5,
        title: "Hackathons & Events",
        label: "Events",
        pos: [0, 1.8, -1.5],
        color: "#9933ff",
        status: "UPCOMING",
        desc: "Community and industry partnerships for tech events.",
        details: ["Innovation challenges", "Networking opportunities"],
        links: []
    },
    {
        id: 6,
        title: "ELUOC (Open Source)",
        label: "Open Source",
        pos: [-2, 0.8, -1.0],
        color: "#ffffff",
        status: "UPCOMING",
        desc: "Our own open source program with GitHub integration.",
        details: ["Contribute to projects", "Build your GitHub profile"],
        links: [
            { label: "GitHub Organization", url: "https://github.com/EduLinkUp" }
        ]
    },
    {
        id: 7,
        title: "Tools & Mini Apps",
        label: "Tools",
        pos: [2, 1, -0.8],
        color: "#ff9900",
        status: "UPCOMING",
        desc: "Productivity tools: QR Scanner, Calculator, Planner, AI Chat.",
        details: ["Productivity Suite", "Utility Apps"],
        links: []
    },
    {
        id: 8,
        title: "Gamification",
        label: "Gamification",
        pos: [0.6, -1.3, 1.5],
        color: "#ff00ff",
        status: "UPCOMING",
        desc: "XP, Badges, Leaderboards, and Achievement Cards.",
        details: ["Engagement rewards", "Progress tracking"],
        links: []
    },
    {
        id: 9,
        title: "Community",
        label: "Community",
        pos: [-1, -0.3, 2],
        color: "#25D366",
        status: "LIVE",
        desc: "Join our community across multiple platforms.",
        details: ["Network & Collaborate"],
        links: [
            { label: "Community Hub", url: "https://www.edulinkup.dev/community" },
            { label: "YouTube Channel", url: "https://www.youtube.com/@EduLinkUp" },
            { label: "LinkedIn Page", url: "https://www.linkedin.com/company/edulinkup" },
            { label: "Instagram", url: "https://www.instagram.com/edulinkup.dev" },
            { label: "GitHub Org", url: "https://github.com/EduLinkUp" }
        ]
    },
    {
        id: 10,
        title: "My Team",
        label: "Team",
        pos: [1, 0.3, 1.8],
        color: "#d39c25",
        status: "LIVE",
        desc: "Meet the people behind EduLinkUp.",
        details: ["Core Team", "Get in Touch"],
        links: [
            { label: "About Us", url: "https://www.edulinkup.dev/about" },
            { label: "Contact Page", url: "https://www.edulinkup.dev/contact" },
            { label: "Email Us", url: "mailto:connect@edulinkup.dev" }
        ]
    }
];

// -----------------------------------------------------------------------------
// ROTATING SPHERE (Central Core)
// -----------------------------------------------------------------------------
function RotatingSphere() {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.008;
            meshRef.current.rotation.x += 0.003;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="rgb(255, 215, 4)"
                emissiveIntensity={0.8}
                roughness={0.15}
                metalness={1}
            />
        </mesh>
    );
}

// -----------------------------------------------------------------------------
// NODE COMPONENT
// -----------------------------------------------------------------------------
function Node({ item, isActive, onHover, onClick }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.005;
            const targetScale = (hovered || isActive) ? 1.4 : 1.0;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    const handlePointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(item);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHovered(false);
        document.body.style.cursor = 'auto';
    };

    return (
        <group position={item.pos}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
                <mesh
                    ref={meshRef}
                    onClick={(e) => { e.stopPropagation(); onClick(item); }}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                >
                    <icosahedronGeometry args={[0.28, 1]} />
                    <meshStandardMaterial
                        color={item.color}
                        emissive={item.color}
                        emissiveIntensity={hovered || isActive ? 2.5 : 0.6}
                        wireframe={true}
                    />
                </mesh>

                <mesh>
                    <icosahedronGeometry args={[0.15, 0]} />
                    <meshBasicMaterial color={item.color} />
                </mesh>

                {/* Billboard Label - always faces camera */}
                <Billboard>
                    <Html
                        center
                        style={{
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: '600',
                            textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            userSelect: 'none',
                            transform: 'translateY(35px)',
                        }}
                    >
                        {item.label}
                    </Html>
                </Billboard>
            </Float>
        </group>
    );
}

// -----------------------------------------------------------------------------
// MAIN SCENE
// -----------------------------------------------------------------------------
function EduLinkUpScene() {
    const [activeNode, setActiveNode] = useState(null);
    const nodesGroupRef = useRef();

    useFrame((state) => {
        if (nodesGroupRef.current) {
            nodesGroupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    const renderPanel = () => {
        if (!activeNode) return (
            <div className="edu-panel-placeholder">
                <div className="placeholder-icon">🔮</div>
                <p>Hover over a node to explore</p>
                <p className="hint">Drag to rotate the ecosystem</p>
            </div>
        );

        return (
            <div className="edu-panel active">
                <div className="edu-header">
                    <h2 style={{ color: activeNode.color }}>{activeNode.title}</h2>
                    <span className={`status-badge ${activeNode.status.toLowerCase()}`}>
                        {activeNode.status}
                    </span>
                </div>
                <div className="edu-body">
                    <p className="description">{activeNode.desc}</p>
                    <div className="details-list">
                        {activeNode.details.map((detail, i) => (
                            <div key={i} className="detail-chip">✓ {detail}</div>
                        ))}
                    </div>
                    {activeNode.links && activeNode.links.length > 0 && (
                        <div className="edu-links">
                            {activeNode.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="edu-link"
                                    style={{ '--link-color': getIconColor(link.url) }}
                                >
                                    <span className="link-icon" style={{ color: getIconColor(link.url) }}>
                                        {getIconForUrl(link.url, link.label)}
                                    </span>
                                    <span className="link-label">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <group position={[0, 0, 0]}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#AD2831" />

            {/* Central Rotating Sphere */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <RotatingSphere />
            </Float>

            {/* Static Billboard Logo + Title (doesn't rotate with sphere) */}
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <Html center style={{ pointerEvents: 'none' }}>
                    <div className="central-logo-wrapper">
                        <img src="/Logos/EduLinkUpLogo.png" alt="EduLinkUp" className="central-logo" />
                    </div>
                </Html>
            </Billboard>
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <Html center style={{ pointerEvents: 'none', transform: 'translateY(-370px) translateX(-270px)' }}>
                    <div className="ecosystem-title">EduLinkUp Ecosystem</div>
                </Html>
            </Billboard>

            {/* Orbiting Nodes - These rotate */}
            <group ref={nodesGroupRef}>
                {MODULES.map((mod) => (
                    <group key={mod.id}>
                        <Node
                            item={mod}
                            isActive={activeNode?.id === mod.id}
                            onHover={setActiveNode}
                            onClick={setActiveNode}
                        />
                        <Line
                            points={[[0, 0, 0], mod.pos]}
                            color={mod.color}
                            opacity={0.2}
                            transparent
                            lineWidth={1}
                        />
                    </group>
                ))}
            </group>

            {/* HTML Overlay */}
            <Html position={[-0.3, 0, 0]} fullscreen style={{ pointerEvents: 'none', zIndex: 10 }}>
                <div className="edu-overlay-container">
                    {/* Left Panel - Interactive Problem/Solution */}
                    <div className="edu-content-left" style={{ pointerEvents: 'auto' }}>
                        <div className="flowchart-container">
                            <div className="flow-section problem">
                                <div className="flow-header">
                                    <span className="flow-icon">⚠️</span>
                                    <h2>Education Today Is</h2>
                                </div>
                                <div className="flow-items">
                                    <div className="flow-item">📖 Theory-heavy learning</div>
                                    <div className="flow-item">📖 No proof-of-work</div>
                                    <div className="flow-item">📖 No community support</div>
                                    <div className="flow-item">📖 No content-based pedagogy</div>
                                    <div className="flow-item">😴 No accountability</div>
                                </div>
                            </div>

                            <div className="flow-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#c84850" strokeWidth="2.5">
                                    <path d="M12 6v14M5 15l7 7 7-7" />
                                </svg>
                            </div>

                            <div className="flow-section insight">
                                <div className="flow-header">
                                    <span className="flow-icon">💡</span>
                                    <h2>Our Insight</h2>
                                </div>
                                <div className="learning-flow">
                                    <div className="learn-step">
                                        <span className="step-icon">💻</span>
                                        <span>Explaining</span>
                                    </div>
                                    <span className="step-arrow">→</span>
                                    <div className="learn-step">
                                        <span className="step-icon">💻</span>
                                        <span>Building</span>
                                    </div>
                                    <span className="step-arrow">→</span>
                                    <div className="learn-step">
                                        <span className="step-icon">💻</span>
                                        <span>Showing</span>
                                    </div>
                                    <span className="step-arrow">→</span>
                                    <div className="learn-step">
                                        <span className="step-icon">🤝</span>
                                        <span>Collaborating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="edu-content-right" style={{ pointerEvents: 'auto' }}>
                        {renderPanel()}
                    </div>
                </div>

                <style>{`
                    .central-logo-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: transparent;
                    }
                    .central-logo {
                        width: 100px;
                        height: 100px;
                        border-radius: 30%;
                        background: transparent;
                        border: none;
                        filter: 
                            drop-shadow(0 0 8px rgba(173, 40, 49, 0.9))
                            drop-shadow(0 0 15px rgba(173, 40, 49, 0.6))
                            drop-shadow(0 0 25px rgba(173, 40, 49, 0.4));
                        animation: logoEdgeGlow 2s ease-in-out infinite alternate;
                    }
                    @keyframes logoEdgeGlow {
                        0% {
                            filter: 
                                drop-shadow(0 0 8px rgba(173, 40, 49, 0.8))
                                drop-shadow(0 0 15px rgba(173, 40, 49, 0.5))
                                drop-shadow(0 0 25px rgba(173, 40, 49, 0.3));
                        }
                        100% {
                            filter: 
                                drop-shadow(0 0 12px rgba(173, 40, 49, 1))
                                drop-shadow(0 0 25px rgba(173, 40, 49, 0.8))
                                drop-shadow(0 0 40px rgba(173, 40, 49, 0.5));
                        }
                    }
                    .ecosystem-title {
                        font-size: 54px;
                        font-weight: 600;
                        color: #AD2831;
                        text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                        white-space: nowrap;
                    }

                    .edu-overlay-container {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: space-between;
                        padding: 6vh 3vw;
                        align-items: center;
                        pointer-events: none;
                    }

                    /* Left Panel - Flowchart Style */
                    .edu-content-left {
                        max-width: 380px;
                        font-family: 'Poppins', sans-serif;
                    }
                    .flowchart-container {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }
                    .flow-section {
                        background: rgba(0,0,0,0.6);
                        border-radius: 12px;
                        padding: 2rem;
                        backdrop-filter: blur(8px);
                        border: 1px solid rgba(255,255,255,0.1);
                    }
                    .flow-section.problem {
                        border-left: 3px solid #ff6b6b;
                    }
                    .flow-section.insight {
                        border-left: 3px solid #4ecdc4;
                    }
                    .flow-header {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        margin-bottom: 10px;
                    }
                    .flow-header h2 {
                        margin: 0;
                        font-size: 2rem;
                        color: red;
                        font-weight: 600;
                    }
                    .flow-icon {
                        font-size: 2rem;
                    }
                    .flow-items {
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                    }
                    .flow-item {
                        font-size: 1.1rem;
                        color: rgba(255, 206, 180, 0.91);
                        padding: 6px 10px;
                        background: rgba(255,255,255,0.05);
                        border-radius: 6px;
                    }
                    .flow-arrow {
                        display: flex;
                        justify-content: center;
                    }
                    .flow-arrow svg {
                        width: 38px;
                        height: 38px;
                    }
                    .learning-flow {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        gap: 4px;
                    }
                    .learn-step {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 2px;
                        padding: 6px 8px;
                        background: rgba(78, 205, 196, 0.15);
                        border-radius: 8px;
                        border: 1px solid rgba(78, 205, 196, 0.3);
                    }
                    .step-icon {
                        font-size: 1rem;
                    }
                    .learn-step span:last-child {
                        font-size: 1rem;
                        color: white;
                        font-weight: 500;
                    }
                    .step-arrow {
                        color: rgba(255,255,255,0.4);
                        font-size: 0.8rem;
                    }

                    /* Right Panel */
                    .edu-content-right {
                        width: 350px;
                        max-height: 100vh;
                        overflow-y: auto;
                        background: rgba(10, 5, 8, 0.92);
                        border: 1px solid rgba(173, 40, 49, 0.4);
                        border-right: 4px solid #AD2831;
                        padding: 1.2rem;
                        backdrop-filter: blur(12px);
                        border-radius: 10px;
                        color: white;
                        font-family: 'Inter', sans-serif;
                        transform: translateX(90px);
                    }
                    .edu-header h2 {
                        margin: 0;
                        font-size: 2.5rem;
                        margin-bottom: 0.5rem;
                    }
                    .status-badge {
                        font-size: 1rem;
                        padding: 0.15rem 0.5rem;
                        border-radius: 4px;
                        background: rgba(255,255,255,0.1);
                        border: 1px solid rgba(255,255,255,0.2);
                        display: inline-block;
                        margin-bottom: 1.5rem;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .status-badge.live { background: rgba(37, 211, 102, 0.2); border-color: #25D366; color: #25D366; }
                    .status-badge.upcoming { background: rgba(255, 204, 0, 0.2); border-color: #ffcc00; color: #ffcc00; }

                    .description {
                        font-size: 1.2rem;
                        line-height: 1.4;
                        color: #ccc;
                        margin-bottom: 1.5rem;
                    }
                    .details-list {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 6px;
                        margin-bottom: 1.5rem;
                    }
                    .detail-chip {
                        font-size: 1.2rem;
                        padding: 4px 10px;
                        background: rgba(255, 68, 68, 0.08);
                        border-radius: 20px;
                        color: rgba(255,255,255,0.7);
                    }
                    
                    .edu-links {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 0.5rem;
                    }
                    .edu-link {
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        padding: 6px 12px;
                        background: rgba(255,255,255,0.05);
                        border: 1px solid rgba(255,255,255,0.15);
                        border-radius: 20px;
                        color: white;
                        font-size: 0.85rem;
                        text-decoration: none;
                        transition: all 0.2s ease;
                        white-space: nowrap;
                    }
                    .edu-link:hover {
                        background: var(--link-color, #AD2831);
                        border-color: var(--link-color, #AD2831);
                        transform: scale(1.05);
                    }

                    /* Responsive: reset the right offset on small screens */
                    @media (max-width: 900px) {
                        .edu-content-right {
                            transform: translateX(0);
                            width: 100%;
                        }
                        .edu-overlay-container {
                            flex-direction: column;
                            align-items: stretch;
                            gap: 1.5rem;
                        }
                    }
                    .link-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        background: rgba(0,0,0,0.3);
                        border-radius: 6px;
                        padding: 4px;
                    }
                    .link-label {
                        flex: 1;
                    }
                    
                    .edu-panel-placeholder {
                        color: rgba(255,255,255,0.5);
                        text-align: center;
                        padding: 2rem 1rem;
                    }
                    .placeholder-icon {
                        font-size: 2rem;
                        margin-bottom: 0.5rem;
                    }
                    .edu-panel-placeholder p {
                        margin: 0;
                        font-size: 1.2rem;
                    }
                    .edu-panel-placeholder .hint {
                        font-size: 1rem;
                        margin-top: 0.5rem;
                        opacity: 0.6;
                    }
                `}</style>
            </Html>
        </group>
    );
}

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------
export default function EduLinkUp() {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Show message on screens smaller than 1000px
    if (windowWidth < 1000) {
        return (
            <div style={{ 
                width: '100%', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(10, 2, 2, 0.95) 0%, rgba(20, 5, 8, 0.95) 100%)',
            }}>
                <div style={{
                    maxWidth: '600px',
                    padding: '3rem 2rem',
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    border: '2px solid rgba(173, 40, 49, 0.3)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🖥️</div>
                    <h2 style={{ 
                        color: '#AD2831', 
                        fontSize: '2.5rem', 
                        marginBottom: '1rem',
                        fontWeight: '700',
                    }}>
                        Desktop Experience Required
                    </h2>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.85)', 
                        fontSize: '1.3rem', 
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                    }}>
                        The <strong style={{ color: '#AD2831' }}>EduLinkUp Ecosystem</strong> section on my portfolio features an interactive 3D experience best viewed on a desktop or larger screen (1000px+) for optimal interaction.
                    </p>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.6)', 
                        fontSize: '1.1rem',
                    }}>
                        Please switch to a desktop device or expand your browser window to explore this immersive section.
                    </p>
                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        background: 'rgba(173, 40, 49, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(173, 40, 49, 0.2)',
                    }}>
                        <p style={{ 
                            color: 'rgba(255, 255, 255, 0.7)', 
                            fontSize: '1rem',
                            margin: 0,
                        }}>
                            💡 <strong>Tip:</strong> Visit <a 
                                href="https://www.edulinkup.dev" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: '#AD2831', textDecoration: 'underline' }}
                            >
                                edulinkup.dev
                            </a> directly to explore EduLinkUp's ecosystem!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Show full 3D experience on larger screens
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 50 }}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, background: 'transparent' }}
                gl={{ alpha: true }}
            >
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI * 3 / 4}
                />
                <EduLinkUpScene />
            </Canvas>
        </div>
    );
}