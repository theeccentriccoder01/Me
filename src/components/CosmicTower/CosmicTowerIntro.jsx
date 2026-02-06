'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CosmicTowerIntro({ onStart }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    const handleStart = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onStart();
        }, 800);
    };

    if (!isVisible) return null;

    return (
        <div className={`intro-overlay ${isExiting ? 'exiting' : ''}`}>
            {/* Floating particles */}
            <div className="intro-particles">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="intro-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="intro-content">
                {/* Avatar with glow */}
                <div className="intro-avatar-container">
                    <div className="avatar-glow"></div>
                    <div className="avatar-ring"></div>
                    <Image
                        src="/images/Avatar.png"
                        alt="Sagnik's Avatar"
                        width={180}
                        height={180}
                        className="intro-avatar"
                        priority
                    />
                </div>

                {/* Greeting */}
                <h1 className="intro-greeting">
                    <span className="greeting-hindi">नमस्ते</span>
                    <span className="greeting-main">I'm Sagnik</span>
                </h1>

                {/* Tagline */}
                <p className="intro-tagline">
                    Developer • Designer • Dreamer
                </p>

                {/* CTA Button */}
                <button className="intro-cta" onClick={handleStart}>
                    <span className="cta-text">Begin The Journey</span>
                    <span className="cta-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <div className="cta-glow"></div>
                </button>

                {/* Scroll hint */}
                <div className="intro-scroll-hint">
                    <div className="scroll-arrow"></div>
                    <span>Explore the Cosmic Tower</span>
                </div>
            </div>

            <style jsx>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at center, rgba(37, 9, 2, 0.3) 0%, rgba(3, 1, 1, 0.9) 70%);
          backdrop-filter: blur(2px);
          animation: fadeIn 1s ease;
        }

        .intro-overlay.exiting {
          animation: fadeOut 0.8s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(1.1); }
        }

        .intro-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .intro-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #AD2831;
          border-radius: 50%;
          opacity: 0.6;
          animation: float 5s infinite ease-in-out;
          box-shadow: 0 0 10px #AD2831;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }

        .intro-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
          z-index: 10;
          animation: contentSlideUp 1s ease 0.3s both;
        }

        @keyframes contentSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .intro-avatar-container {
          position: relative;
          width: 180px;
          height: 180px;
        }

        .avatar-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(173, 40, 49, 0.5) 0%, transparent 70%);
          animation: pulse 2s infinite ease-in-out;
          border-radius: 50%;
        }

        .avatar-ring {
          position: absolute;
          inset: -8px;
          border: 3px solid #AD2831;
          border-radius: 50%;
          animation: ringPulse 3s infinite ease-in-out;
          box-shadow: 0 0 20px rgba(173, 40, 49, 0.6), inset 0 0 20px rgba(173, 40, 49, 0.3);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1) rotate(0deg); box-shadow: 0 0 20px rgba(173, 40, 49, 0.6), inset 0 0 20px rgba(173, 40, 49, 0.3); }
          50% { transform: scale(1.05) rotate(180deg); box-shadow: 0 0 40px rgba(173, 40, 49, 0.8), inset 0 0 30px rgba(173, 40, 49, 0.5); }
        }

        :global(.intro-avatar) {
          border-radius: 50%;
          object-fit: cover;
          animation: avatarFloat 4s infinite ease-in-out;
        }

        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .intro-greeting {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .greeting-hindi {
          font-size: 2.5rem;
          font-weight: 300;
          color: #AD2831;
          text-shadow: 0 0 30px rgba(173, 40, 49, 0.8);
          letter-spacing: 0.1em;
        }

        .greeting-main {
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ededed 0%, #AD2831 50%, #ededed 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease-in-out infinite;
          text-shadow: none;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .intro-tagline {
          font-size: 1.4rem;
          color: rgba(237, 237, 237, 0.7);
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .intro-cta {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem 2.5rem;
          margin-top: 2rem;
          background: rgba(173, 40, 49, 0.2);
          border: 2px solid #AD2831;
          border-radius: 50px;
          color: #ededed;
          font-size: 1.3rem;
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .intro-cta:hover {
          background: rgba(173, 40, 49, 0.4);
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(173, 40, 49, 0.6);
        }

        .intro-cta:hover .cta-icon {
          transform: translateX(5px);
        }

        .cta-text {
          position: relative;
          z-index: 2;
        }

        .cta-icon {
          position: relative;
          z-index: 2;
          transition: transform 0.3s ease;
        }

        .cta-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(90deg, transparent, rgba(173, 40, 49, 0.5), transparent);
          animation: ctaGlow 2s infinite linear;
          border-radius: 50px;
        }

        @keyframes ctaGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .intro-scroll-hint {
          position: absolute;
          bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          color: rgba(237, 237, 237, 0.5);
          font-size: 0.9rem;
          animation: hintPulse 2s infinite ease-in-out;
        }

        @keyframes hintPulse {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-5px); }
        }

        .scroll-arrow {
          width: 20px;
          height: 20px;
          border-right: 2px solid #AD2831;
          border-bottom: 2px solid #AD2831;
          transform: rotate(45deg);
          animation: arrowBounce 1.5s infinite ease-in-out;
        }

        @keyframes arrowBounce {
          0%, 100% { transform: rotate(45deg) translate(0, 0); }
          50% { transform: rotate(45deg) translate(5px, 5px); }
        }

        @media (max-width: 768px) {
          .intro-avatar-container {
            width: 140px;
            height: 140px;
          }

          .greeting-hindi {
            font-size: 1.8rem;
          }

          .greeting-main {
            font-size: 2.5rem;
          }

          .intro-tagline {
            font-size: 1rem;
          }

          .intro-cta {
            padding: 1rem 2rem;
            font-size: 1.1rem;
          }
        }
      `}</style>
        </div>
    );
}
