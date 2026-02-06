'use client';

import { useState, useEffect } from 'react';
import './TowerLoader.css';

export default function TowerLoader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Add longer delay to ensure Three.js is fully loaded
                    setTimeout(() => onComplete?.(), 800);
                    return 100;
                }
                // Slower increment for smoother loading (3.5s total)
                return prev + 1.4;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        if (progress < 25) setStage(0);
        else if (progress < 50) setStage(1);
        else if (progress < 75) setStage(2);
        else setStage(3);
    }, [progress]);

    const floors = [
        { height: 60, width: 180, delay: 0 },
        { height: 55, width: 160, delay: 0.15 },
        { height: 50, width: 140, delay: 0.3 },
        { height: 45, width: 120, delay: 0.45 },
        { height: 40, width: 100, delay: 0.6 },
    ];

    return (
        <div className={`tower-loader ${progress >= 100 ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <div className="tower-container">
                    {/* Base */}
                    <div 
                        className={`tower-base ${stage >= 0 ? 'build' : ''}`}
                        style={{ '--delay': '0s' }}
                    />
                    
                    {/* Floors */}
                    {floors.map((floor, idx) => (
                        <div
                            key={idx}
                            className={`tower-floor ${stage >= 1 ? 'build' : ''}`}
                            style={{
                                '--height': `${floor.height}px`,
                                '--width': `${floor.width}px`,
                                '--delay': `${floor.delay}s`
                            }}
                        >
                            <div className="floor-detail" />
                            <div className="floor-windows">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    ))}
                    
                    {/* Top crown */}
                    <div className={`tower-crown ${stage >= 2 ? 'build' : ''}`}>
                        <div className="crown-spike" />
                        <div className="crown-base" />
                    </div>
                    
                    {/* Stars around tower */}
                    <div className={`tower-stars ${stage >= 3 ? 'visible' : ''}`}>
                        <span style={{ '--x': '-80px', '--y': '-50px', '--delay': '0s' }} />
                        <span style={{ '--x': '80px', '--y': '-70px', '--delay': '0.1s' }} />
                        <span style={{ '--x': '-100px', '--y': '20px', '--delay': '0.2s' }} />
                        <span style={{ '--x': '100px', '--y': '30px', '--delay': '0.3s' }} />
                        <span style={{ '--x': '0px', '--y': '-120px', '--delay': '0.4s' }} />
                    </div>
                </div>
                
                <div className="loader-text">
                    <h2>Building The Universe</h2>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="progress-percent">{progress}%</p>
                </div>
            </div>
        </div>
    );
}
