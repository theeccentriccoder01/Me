'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Stars, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { TOWER_SCALE, BASE_FLOOR_WIDTH } from './towerConfig';

// ============================================
// COSMIC BACKGROUND
// ============================================
function CosmicBackground({ scrollProgress }) {
    const groupRef = useRef();

    const nebulaParticles = useMemo(() => {
        const particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push({
                position: [
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 100
                ],
                scale: Math.random() * 2 + 0.5,
                color: Math.random() > 0.5 ? '#AD2831' : '#4a0010'
            });
        }
        return particles;
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            <Stars radius={150} depth={100} count={4000} factor={4} saturation={0.2} fade speed={0.3} />
            {nebulaParticles.map((particle, i) => (
                <mesh key={i} position={particle.position}>
                    <sphereGeometry args={[particle.scale, 6, 6]} />
                    <meshBasicMaterial color={particle.color} transparent opacity={0.06} />
                </mesh>
            ))}
        </group>
    );
}

// ============================================
// TOWER FLOOR
// ============================================
function TowerFloor({ position, floorIndex, isOpen, isActive, sectionContent }) {
    const glowRef = useRef();
    const floorHeight = 20 * TOWER_SCALE;
    const floorWidth = BASE_FLOOR_WIDTH * TOWER_SCALE;
    const floorDepth = 18 * TOWER_SCALE;
    const frontZ = isOpen ? -floorDepth / 2 : floorDepth / 2;

    useFrame((state) => {
        if (glowRef.current) {
            glowRef.current.intensity = isActive ? 3 + Math.sin(state.clock.elapsedTime * 2) : 0.2;
        }
    });

    return (
        <group position={position}>
            {/* Floor & Ceiling */}
            <mesh position={[0, -floorHeight / 2, 0]}>
                <boxGeometry args={[floorWidth + 3, 0.8, floorDepth + 3]} />
                <meshStandardMaterial color="#0a0202" metalness={0.95} roughness={0.1} emissive="#AD2831" emissiveIntensity={isActive ? 0.25 : 0.06} />
            </mesh>
            <mesh position={[0, floorHeight / 2, 0]}>
                <boxGeometry args={[floorWidth + 3, 0.8, floorDepth + 3]} />
                <meshStandardMaterial color="#0a0202" metalness={0.9} roughness={0.2} emissive="#AD2831" emissiveIntensity={0.03} />
            </mesh>

            {/* Back wall */}
            <mesh position={[0, 0, isOpen ? floorDepth / 2 : -floorDepth / 2]}>
                <boxGeometry args={[floorWidth, floorHeight, 0.4]} />
                <meshStandardMaterial color="#050101" metalness={0.95} roughness={0.1} emissive="#AD2831" emissiveIntensity={0.02} />
            </mesh>

            {/* Side walls */}
            {[-1, 1].map((side) => (
                <mesh key={side} position={[side * floorWidth / 2, 0, 0]}>
                    <boxGeometry args={[0.4, floorHeight, floorDepth]} />
                    <MeshTransmissionMaterial backside samples={2} thickness={0.3} transmission={0.75} color="#1a0505" roughness={0.1} />
                </mesh>
            ))}

            {/* Glowing frame around front */}
            <mesh position={[0, floorHeight / 2 - 0.4, frontZ]}>
                <boxGeometry args={[floorWidth, 0.8, 0.8]} />
                <meshStandardMaterial color="#AD2831" emissive="#AD2831" emissiveIntensity={isActive ? 2.5 : 0.4} />
            </mesh>
            <mesh position={[0, -floorHeight / 2 + 0.4, frontZ]}>
                <boxGeometry args={[floorWidth, 0.8, 0.8]} />
                <meshStandardMaterial color="#AD2831" emissive="#AD2831" emissiveIntensity={isActive ? 2.5 : 0.4} />
            </mesh>
            <mesh position={[-floorWidth / 2, 0, frontZ]}>
                <boxGeometry args={[0.8, floorHeight, 0.8]} />
                <meshStandardMaterial color="#AD2831" emissive="#AD2831" emissiveIntensity={isActive ? 2 : 0.3} />
            </mesh>
            <mesh position={[floorWidth / 2, 0, frontZ]}>
                <boxGeometry args={[0.8, floorHeight, 0.8]} />
                <meshStandardMaterial color="#AD2831" emissive="#AD2831" emissiveIntensity={isActive ? 2 : 0.3} />
            </mesh>

            {/* Light */}
            <pointLight ref={glowRef} position={[0, 0, isOpen ? -floorDepth : floorDepth]} color="#AD2831" intensity={isActive ? 3 : 0.2} distance={50} />

            {/* SECTION CONTENT - Large scale, screen-filling */}
            <Html
                position={[0, 0, isOpen ? -floorDepth / 2 - 0.2 : floorDepth / 2 + 0.2]}
                rotation={[0, isOpen ? 0 : Math.PI, 0]}
                transform
                scale={3 * TOWER_SCALE}
                style={{
                    width: '1600px',
                    height: '950px',
                    overflow: 'auto',
                    pointerEvents: isActive ? 'auto' : 'none',
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? 'visible' : 'hidden',
                    transition: 'opacity 0.4s ease',
                }}
                center
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#250902',
                    padding: '40px 50px',
                    border: '4px solid #AD2831',
                    borderRadius: '12px',
                    boxShadow: '0 0 80px rgba(173, 40, 49, 0.6)',
                    color: '#ededed',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                    overflow: 'auto',
                }}>
                    {sectionContent}
                </div>
            </Html>
        </group>
    );
}

// ============================================
// ENERGY CORE
// ============================================
function EnergyCore({ totalHeight }) {
    const coreRef = useRef();
    const ringsRef = useRef();

    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.y = state.clock.elapsedTime * 0.4;
        }
    });

    return (
        <group>
            <mesh ref={coreRef}>
                <cylinderGeometry args={[0.4 * TOWER_SCALE, 0.4 * TOWER_SCALE, totalHeight + 30 * TOWER_SCALE, 16]} />
                <meshStandardMaterial color="#AD2831" emissive="#ff4444" emissiveIntensity={1.5} transparent opacity={0.7} />
            </mesh>
            <mesh>
                <cylinderGeometry args={[1 * TOWER_SCALE, 1 * TOWER_SCALE, totalHeight + 30 * TOWER_SCALE, 16]} />
                <meshBasicMaterial color="#AD2831" transparent opacity={0.05} />
            </mesh>
            <group ref={ringsRef}>
                {[0.2, 0.4, 0.6, 0.8].map((t, i) => (
                    <mesh key={i} position={[0, (t - 0.5) * totalHeight, 0]} rotation={[Math.PI / 2, 0, i * 0.3]}>
                        <torusGeometry args={[3 * TOWER_SCALE, 0.1 * TOWER_SCALE, 16, 32]} />
                        <meshStandardMaterial color="#AD2831" emissive="#AD2831" emissiveIntensity={0.7} transparent opacity={0.4} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

// ============================================
// MAIN TOWER
// ============================================
function CosmicTower({ scrollProgress, sections }) {
    const towerRef = useRef();
    const floorHeight = 25 * TOWER_SCALE;
    const totalFloors = sections.length;
    const totalHeight = floorHeight * totalFloors;

    const activeFloor = Math.min(Math.floor(scrollProgress * totalFloors), totalFloors - 1);
    const targetRotation = scrollProgress * Math.PI * totalFloors;
    const targetY = activeFloor * floorHeight;

    useFrame(() => {
        if (towerRef.current) {
            towerRef.current.rotation.y += (targetRotation - towerRef.current.rotation.y) * 0.05;
            towerRef.current.position.y += (targetY - towerRef.current.position.y) * 0.05;
        }
    });

    return (
        <group ref={towerRef}>
            <EnergyCore totalHeight={totalHeight} />

            {sections.map((section, i) => (
                <TowerFloor
                    key={i}
                    position={[0, i * floorHeight, 0]}
                    floorIndex={i}
                    isOpen={i % 2 === 0}
                    isActive={activeFloor === i}
                    sectionContent={section.content}
                />
            ))}

            {/* Crown */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                <mesh position={[0, totalHeight + 8, 0]}>
                    <octahedronGeometry args={[4 * TOWER_SCALE, 0]} />
                    <meshStandardMaterial color="#AD2831" emissive="#ff4444" emissiveIntensity={1.2} metalness={0.95} roughness={0.05} />
                </mesh>
            </Float>

            {/* Base */}
            <mesh position={[0, -8, 0]}>
                <cylinderGeometry args={[22 * TOWER_SCALE, 28 * TOWER_SCALE, 16 * TOWER_SCALE, 8]} />
                <meshStandardMaterial color="#050101" metalness={0.98} roughness={0.05} emissive="#AD2831" emissiveIntensity={0.08} />
            </mesh>
        </group>
    );
}

// ============================================
// CAMERA CONTROLLER
// ============================================
function CameraController({ scrollProgress, activeFloor, floorHeight }) {
    const { camera } = useThree();

    useFrame(() => {
        const angle = scrollProgress * Math.PI * 0.15;
        const radius = 50 * TOWER_SCALE;
        const targetY = activeFloor * floorHeight + floorHeight / 2;

        camera.position.x += (Math.sin(angle) * radius - camera.position.x) * 0.025;
        camera.position.z += (Math.cos(angle) * radius - camera.position.z) * 0.025;
        camera.position.y += (targetY - camera.position.y) * 0.025;
        camera.lookAt(0, targetY, 0);
    });

    return null;
}

// ============================================
// MAIN SCENE
// ============================================
export default function CosmicTowerScene({ sections }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const floorHeight = 25;

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeFloor = Math.min(Math.floor(scrollProgress * sections.length), sections.length - 1);

    return (
        <>
            <div className="cosmic-tower-canvas">
                <Canvas camera={{ position: [0, floorHeight / 2, 50 * TOWER_SCALE], fov: 60 }} gl={{ antialias: true }}>
                    <color attach="background" args={['#030101']} />
                    <fog attach="fog" args={['#030101', 50, 180]} />
                    <ambientLight intensity={0.12} />
                    <directionalLight position={[15, 30, 15]} intensity={0.35} />
                    <CameraController scrollProgress={scrollProgress} activeFloor={activeFloor} floorHeight={floorHeight} />
                    <CosmicBackground scrollProgress={scrollProgress} />
                    <CosmicTower scrollProgress={scrollProgress} sections={sections} />
                </Canvas>
            </div>

            {/* Floor Indicator */}
            <div className="floor-indicator">
                {sections.map((section, i) => (
                    <div
                        key={i}
                        className={`floor-dot ${activeFloor === i ? 'active' : ''}`}
                        onClick={() => {
                            const targetScroll = (i / (sections.length - 1 || 1)) * (document.documentElement.scrollHeight - window.innerHeight);
                            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                        }}
                    >
                        <span className="floor-label">{section.name}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
