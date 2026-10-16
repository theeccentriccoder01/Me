'use client';

import { useRef, useMemo, useState, useCallback, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Stars, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { TOWER_SCALE, BASE_FLOOR_WIDTH, RING_RADIUS } from './towerConfig';
import { getOptimizedStarCount, getOptimizedCanvasSettings, getPerformanceLevel } from '@/utils/performance';

// Furniture tuning: global multiplier for all floating furniture to make them
// feel larger and more prominent than raw `TOWER_SCALE`.
export const FURNITURE_SCALE = 1.6;

// Performance level
const PERFORMANCE_LEVEL = typeof window !== 'undefined' ? getPerformanceLevel() : 'high';
const IS_LOW_PERFORMANCE = PERFORMANCE_LEVEL === 'low';

// ============================================
// COSMIC BACKGROUND
// ============================================
function CosmicBackground({ isIntro }) {
    const groupRef = useRef();
    const starMaterialRef = useRef();
    const galaxyMaterialRef = useRef();
    const nebulaMaterialRefs = useRef([]);
    const orbsRef = useRef();
    const smoothMouse = useRef(new THREE.Vector2(0, 0));

    const { mouse } = useThree();

    const starShader = useMemo(
        () => ({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
            },
            vertexShader: `
                attribute float aSize;
                attribute float aTwinkle;
                attribute vec3 aColor;
                uniform float uTime;
                uniform vec2 uMouse;
                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    vColor = aColor;

                    vec3 p = position;
                    // Very subtle mouse parallax (feels like drifting through space)
                    p.x += uMouse.x * 6.0;
                    p.y += uMouse.y * 4.0;

                    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
                    gl_Position = projectionMatrix * mvPosition;

                    float tw = 0.65 + 0.35 * sin(uTime * 1.6 + aTwinkle * 6.28318);
                    vAlpha = tw;
                    gl_PointSize = aSize * (280.0 / -mvPosition.z) * (0.85 + 0.15 * tw);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                void main() {
                    vec2 uv = gl_PointCoord - vec2(0.5);
                    float d = length(uv);
                    float core = smoothstep(0.5, 0.0, d);
                    float glow = smoothstep(0.5, 0.0, d * 1.8);
                    float a = core * 0.85 + glow * 0.25;
                    a *= vAlpha;
                    gl_FragColor = vec4(vColor, a);
                }
            `,
        }),
        []
    );

    const nebulaShader = useMemo(
        () => ({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uColorA: { value: new THREE.Color('#4a0010') },
                uColorB: { value: new THREE.Color('#AD2831') },
                uOpacity: { value: 0.35 },
                uScale: { value: 1.0 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                precision highp float;
                varying vec2 vUv;
                uniform float uTime;
                uniform vec2 uMouse;
                uniform vec3 uColorA;
                uniform vec3 uColorB;
                uniform float uOpacity;
                uniform float uScale;

                float hash(vec2 p) {
                    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                }
                float noise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    float a = hash(i);
                    float b = hash(i + vec2(1.0, 0.0));
                    float c = hash(i + vec2(0.0, 1.0));
                    float d = hash(i + vec2(1.0, 1.0));
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
                }
                float fbm(vec2 p) {
                    float v = 0.0;
                    float a = 0.55;
                    for (int i = 0; i < 3; i++) {
                        v += a * noise(p);
                        p *= 2.05;
                        a *= 0.5;
                    }
                    return v;
                }

                void main() {
                    // Parallax drift + mouse "lensing"
                    vec2 uv = vUv - 0.5;
                    uv.x *= 1.35;
                    uv += uMouse * vec2(0.12, 0.08);

                    float t = uTime * 0.04;
                    vec2 p = uv * (2.6 * uScale);
                    p += vec2(t, -t * 0.7);

                    float n1 = fbm(p + vec2(0.0, t));
                    float n2 = fbm(p * 1.7 - vec2(t * 1.3, 0.0));
                    float neb = smoothstep(0.25, 0.95, n1 * 0.75 + n2 * 0.45);

                    float r = length(uv);
                    float vignette = smoothstep(0.95, 0.1, r);

                    vec3 col = mix(uColorA, uColorB, n2);
                    float alpha = neb * vignette * uOpacity;
                    gl_FragColor = vec4(col, alpha);
                }
            `,
        }),
        []
    );

    const starGeometry = useMemo(() => {
        const count = getOptimizedStarCount();
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const twinkle = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const cWarm = new THREE.Color('#ffb3c1');
        const cCool = new THREE.Color('#b9d7ff');
        const cWhite = new THREE.Color('#ffffff');

        for (let i = 0; i < count; i++) {
            // Random distribution in a thick sphere shell
            const r = 180 + Math.random() * 420;
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi) * 0.85;
            const z = r * Math.sin(phi) * Math.sin(theta);

            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const s = 0.9 + Math.pow(Math.random(), 2.2) * 2.8;
            sizes[i] = s;
            twinkle[i] = Math.random();

            const mixT = Math.random();
            const col = mixT < 0.6 ? cWhite.clone().lerp(cCool, Math.random() * 0.45) : cWhite.clone().lerp(cWarm, Math.random() * 0.45);
            col.multiplyScalar(0.9 + Math.random() * 0.35);
            colors[i * 3 + 0] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        g.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkle, 1));
        g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
        return g;
    }, []);

    const galaxyGeometries = useMemo(() => {
        const makeGalaxy = ({ points, arms, radius, thickness, colorA, colorB, seed = 0 }) => {
            const positions = new Float32Array(points * 3);
            const sizes = new Float32Array(points);
            const twinkle = new Float32Array(points);
            const colors = new Float32Array(points * 3);

            const ca = new THREE.Color(colorA);
            const cb = new THREE.Color(colorB);

            for (let i = 0; i < points; i++) {
                const t = Math.pow(Math.random(), 1.6);
                const r = t * radius;
                const arm = i % arms;
                const armAngle = (arm / arms) * Math.PI * 2;
                const spin = r * 0.035;
                const jitter = (Math.random() - 0.5) * 0.6;
                const angle = armAngle + spin + jitter + seed;

                const x = Math.cos(angle) * r + (Math.random() - 0.5) * 1.2;
                const z = Math.sin(angle) * r + (Math.random() - 0.5) * 1.2;
                const y = (Math.random() - 0.5) * thickness * (1 - t);

                positions[i * 3 + 0] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                sizes[i] = 1.6 + Math.pow(1 - t, 2.5) * 5.5;
                twinkle[i] = Math.random();

                const col = ca.clone().lerp(cb, Math.pow(t, 0.8));
                col.multiplyScalar(1.0 + (1 - t) * 0.6);
                colors[i * 3 + 0] = col.r;
                colors[i * 3 + 1] = col.g;
                colors[i * 3 + 2] = col.b;
            }

            const g = new THREE.BufferGeometry();
            g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
            g.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkle, 1));
            g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
            return g;
        };

        return [
            makeGalaxy({ 
                points: IS_LOW_PERFORMANCE ? 600 : 2400, 
                arms: 4, 
                radius: 85, 
                thickness: 14, 
                colorA: '#ffd1dc', 
                colorB: '#7ab8ff', 
                seed: 0.7 
            }),
            makeGalaxy({ 
                points: IS_LOW_PERFORMANCE ? 400 : 1600, 
                arms: 3, 
                radius: 55, 
                thickness: 10, 
                colorA: '#ff6666', 
                colorB: '#ffffff', 
                seed: 2.1 
            }),
        ];
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Smooth mouse movement loop
        smoothMouse.current.lerp(state.mouse, 0.08);
        const mx = smoothMouse.current.x;
        const my = smoothMouse.current.y;

        if (groupRef.current) {
            // Slow cosmic drift + smoothed mouse parallax
            groupRef.current.rotation.y = t * 0.015 + mx * 0.12;
            groupRef.current.rotation.x = my * 0.06;
        }

        // Update all materials with smoothed coordinates
        if (starMaterialRef.current) {
            starMaterialRef.current.uniforms.uTime.value = t;
            starMaterialRef.current.uniforms.uMouse.value.copy(smoothMouse.current);
        }
        if (galaxyMaterialRef.current) {
            galaxyMaterialRef.current.uniforms.uTime.value = t * 1.05;
            galaxyMaterialRef.current.uniforms.uMouse.value.copy(smoothMouse.current);
        }
        nebulaMaterialRefs.current.forEach((mat) => {
            if (!mat) return;
            mat.uniforms.uTime.value = t;
            mat.uniforms.uMouse.value.copy(smoothMouse.current);
        });

        if (orbsRef.current) {
            orbsRef.current.rotation.y = t * 0.18;
            orbsRef.current.rotation.x = t * 0.08;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base star layer */}
            <Stars radius={650} depth={380} count={5200} factor={5.5} saturation={0.35} fade speed={0.35} />

            {/* Procedural interactive starfield */}
            <points geometry={starGeometry}>
                <shaderMaterial
                    ref={starMaterialRef}
                    args={[starShader]}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Galaxies (spiral point clouds) */}
            <group position={[120, 550, -80]} rotation={[0.2, 0.9, -0.15]}>
                <points geometry={galaxyGeometries[0]}>
                    <shaderMaterial
                        ref={galaxyMaterialRef}
                        args={[starShader]}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            </group>
            <group position={[-140, 400, -200]} rotation={[-0.2, -0.6, 0.1]} scale={0.9}>
                <points geometry={galaxyGeometries[1]}>
                    <shaderMaterial
                        ref={(m) => { /* Galaxy 2 can also use galaxyMaterialRef if shared, or separate if needed. 
                                         Using starShader shared uniforms is fine as they are consistent. */ }}
                        args={[starShader]}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            </group>

            {/* Nebulae (shader planes) */}
            <mesh position={[-80, 100, 260]} rotation={[0.1, 0.6, 0.0]} scale={[220, 140, 1]}>
                <planeGeometry args={[1, 1, 1, 1]} />
                <shaderMaterial
                    ref={(m) => { nebulaMaterialRefs.current[0] = m; }}
                    args={[nebulaShader]}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh position={[140, 10, -240]} rotation={[-0.15, -0.4, 0.08]} scale={[200, 120, 1]}>
                <planeGeometry args={[1, 1, 1, 1]} />
                <shaderMaterial
                    ref={(m) => { nebulaMaterialRefs.current[1] = m; }}
                    args={[{
                        ...nebulaShader,
                        uniforms: {
                            ...nebulaShader.uniforms,
                            uColorA: { value: new THREE.Color('#0b1d3a') },
                            uColorB: { value: new THREE.Color('#ff6666') },
                            uOpacity: { value: 0.28 },
                            uScale: { value: 0.85 },
                        }
                    }]}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Mysterious "anomaly" orbs */}
            {/* Mysterious "anomaly" orbs - Spread out "Flying Saucers" */}
            <group ref={orbsRef} position={[0, 0, 0]}>
                {/* Increased count and range for "top of universe" distribution */}
                {/* Reduce count on low-performance devices */}
                {Array.from({ length: IS_LOW_PERFORMANCE ? 4 : 12 }).map((_, i) => {
                    // Random positions high up in the sky
                    // Using deterministic seeded randoms would be better, but simple math works for visual spread
                    const angle = (i / (IS_LOW_PERFORMANCE ? 4 : 12)) * Math.PI * 2;
                    const r = 150 + (i % 3) * 80; // Wide radius
                    const yInfo = 280 + (i % 4) * 40; // High altitude (280-400)

                    return (
                        <mesh key={i} position={[Math.cos(angle) * r, yInfo, Math.sin(angle) * r]}>
                            {/* Flattened sphere to look like a saucer */}
                            <sphereGeometry args={[4 * TOWER_SCALE, 16, 8]} />
                            <meshStandardMaterial
                                color="#120405"
                                metalness={0.8}
                                roughness={0.2}
                                emissive="#AD2831"
                                emissiveIntensity={1.8}
                                transparent
                                opacity={0.7}
                            />
                        </mesh>
                    );
                })}
            </group>
        </group>
    );
}

// ============================================
// INTRO ELEMENT - Avatar standing on tower with content around
// ============================================
// ============================================
// INTRO ELEMENT - Avatar standing on tower with content on 3D board
// ============================================
function IntroElement({ position, onExplore, isVisible }) {
    const groupRef = useRef();
    const boardRef = useRef();
    const avatarRef = useRef();

    useFrame((state) => {
        if (groupRef.current && isVisible) {
            // Subtle breathing for the whole group, but GROUNDED (no flying)
            // Just a tiny bit of life
        }
        if (boardRef.current) {
            // Slight holographic hover for the board content
            // boardRef.current.position.y = 14 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
        }
    });

    if (!isVisible) return null;

    return (
        <group ref={groupRef} position={position}>
            {/* Dedicated Light for Intro Elements to ensure colors pop */}
            <pointLight position={[0, 10, 15]} intensity={0.8} distance={80} decay={2} color="white" />

            {/* === AVATAR (Standing on floor) === */}
            <group position={[-15, 0, 5]} ref={avatarRef}>
                {/* Shadow/Base for Avatar */}
                <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[5, 32]} />
                    <meshBasicMaterial color="#000" transparent opacity={0.4} blurriness={0.8} />
                </mesh>

                <Html
                    position={[0, 16.5, 0]} // Center of the image vertically roughly
                    transform
                    distanceFactor={45} // Slightly larger/closer feel
                    center
                    style={{
                        pointerEvents: 'none',
                        width: '400px',
                        height: '600px', // taller container
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}
                >
                    <div className="intro-avatar-container">
                        <img src="/images/Avatar.png" alt="Sagnik" className="intro-avatar-img" />
                    </div>
                </Html>
            </group>

            {/* === 3D INFO BOARD WITH STAND === */}
            <group position={[9, 0, -2]} rotation={[0, -0.3, 0]}>

                {/* -- STAND STRUCTURE -- */}
                {/* Base Plate */}
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[4, 5, 0.6, 8]} />
                    <meshStandardMaterial color="#1a0505" metalness={0.1} roughness={0.8} />
                </mesh>
                {/* Main Pole */}
                <mesh position={[0, 9, 0]}>
                    <cylinderGeometry args={[0.5, 1.5, 18, 8]} />
                    <meshStandardMaterial color="#f93f4b" metalness={0.1} roughness={0.8} />
                </mesh>

                {/* -- THE BOARD (Glass Panel) -- */}
                <group position={[0, 20, 0]} ref={boardRef}>
                    {/* Frame */}
                    <mesh>
                        <boxGeometry args={[30, 18, 1]} />
                        <meshStandardMaterial color="#2b0a0a" metalness={0.95} roughness={0.1} emissive="#bc0814" emissiveIntensity={0.15} />
                    </mesh>
                    {/* Screen Surface (Glass) - Tuned for visibility */}
                    <mesh position={[0, 0, 0.55]}>
                        <planeGeometry args={[28, 16]} />
                        <meshStandardMaterial
                            color="#1a0505"
                            emissive="#dd0012"
                            emissiveIntensity={0.2}
                            metalness={0.1}
                            roughness={0.2}
                            transparent={false}
                        />
                    </mesh>

                    {/* Content HTML Overlay */}
                    <Html
                        position={[0, 0, 0.6]}
                        transform
                        distanceFactor={24}
                        center
                        style={{
                            pointerEvents: 'auto',
                            width: '900px', // Higher resolution for scale down
                            height: '600px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // backfaceVisibility: 'hidden'
                        }}
                    >
                        <div className="intro-board-content">
                            <h1 className="intro-board-title">
                                <span className="hindi">नमस्ते</span>
                                <span className="name">I'm Sagnik</span>
                            </h1>

                            <div className="intro-board-divider"></div>

                            <p className="intro-board-tagline">
                                AKA <b>Eccentric Explorer</b>
                            </p>

                            <button className="intro-board-cta" onClick={onExplore}>
                                <span>Explore My Universe</span>
                            </button>
                        </div>
                    </Html>
                </group>
            </group>
        </group>
    );
}

// ============================================
// FLOATING FURNITURE PIECE
// ============================================
// ============================================
// FLOATING FURNITURE PIECE - OPTIMIZED
// ============================================
function FloatingFurniture({ position, type, delay = 0 }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const S = TOWER_SCALE * FURNITURE_SCALE;

    useFrame((state) => {
        if (meshRef.current) {
            // Elegant subtle hovering motion
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + delay) * (0.07 * FURNITURE_SCALE);
            if (type !== 'hexCell' && type !== 'portal') {
                meshRef.current.rotation.y = state.clock.elapsedTime * 0.04 + delay;
            }

            const target = hovered ? 1.08 : 1.0;
            const current = meshRef.current.scale.x || 1;
            const next = THREE.MathUtils.lerp(current, target, 0.1);
            meshRef.current.scale.set(next, next, next);
        }
    });

    if (type === 'desk') {
        return (
            <group
                ref={meshRef}
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Floating sleek desk with cosmic obsidian finish */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3 * S, 0.18 * S, 1.8 * S]} />
                    <meshStandardMaterial
                        color="#120406"
                        roughness={0.15}
                        metalness={0.9}
                        emissive="#AD2831"
                        emissiveIntensity={hovered ? 0.45 : 0.15}
                    />
                </mesh>
                {/* Sleek edge accent beam */}
                <mesh position={[0, -0.1 * S, 0.9 * S]}>
                    <boxGeometry args={[3 * S, 0.04 * S, 0.04 * S]} />
                    <meshBasicMaterial color="#ff4d6d" />
                </mesh>
                {/* Holographic workstation display */}
                <mesh position={[0, 0.9 * S, 0]} rotation={[0.2, 0, 0]}>
                    <planeGeometry args={[2.4 * S, 1.4 * S]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={hovered ? 0.5 : 0.3} side={THREE.DoubleSide} />
                </mesh>
            </group>
        );
    }

    if (type === 'chair') {
        return (
            <group ref={meshRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                {/* Floating ergonomic pedestal */}
                <mesh>
                    <cylinderGeometry args={[0.55 * S, 0.45 * S, 0.16 * S, 14]} />
                    <meshStandardMaterial color="#140608" metalness={0.85} roughness={0.2} emissive="#ff4d6d" emissiveIntensity={hovered ? 0.6 : 0.25} />
                </mesh>
                <mesh position={[0, 0.65 * S, -0.26 * S]}>
                    <boxGeometry args={[0.8 * S, 1.05 * S, 0.12 * S]} />
                    <meshStandardMaterial color="#140608" metalness={0.85} roughness={0.2} emissive="#ff4d6d" emissiveIntensity={hovered ? 0.6 : 0.25} />
                </mesh>
            </group>
        );
    }

    if (type === 'shelf') {
        return (
            <group ref={meshRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                {[0, 1, 2].map((i) => (
                    <group key={i} position={[0, i * 1 * S, 0]}>
                        <mesh>
                            <boxGeometry args={[3 * S, 0.1 * S, 0.6 * S]} />
                            <meshStandardMaterial color="#1a0508" metalness={0.8} roughness={0.25} emissive="#ff3355" emissiveIntensity={hovered ? 0.5 : 0.2} />
                        </mesh>
                        {/* Data cubes on shelf */}
                        {[[-0.9, 0.15, 0], [0.4, 0.2, 0], [1.1, 0.14, 0]].map(([x, h, z], j) => (
                            <mesh key={j} position={[x * S, (h + 0.05) * S, z * S]}>
                                <boxGeometry args={[0.35 * S, (h * 2) * S, 0.2 * S]} />
                                <meshStandardMaterial color="#080203" metalness={0.9} roughness={0.2} emissive="#ff4d6d" emissiveIntensity={hovered ? 0.8 : 0.35} />
                            </mesh>
                        ))}
                    </group>
                ))}
            </group>
        );
    }

    if (type === 'server') {
        return (
            <group ref={meshRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                {/* Modern server monolith */}
                <mesh position={[0, 0.5 * S, 0]}>
                    <boxGeometry args={[1.2 * S, 2.2 * S, 0.9 * S]} />
                    <meshStandardMaterial color="#0a0305" metalness={0.92} roughness={0.2} emissive="#AD2831" emissiveIntensity={hovered ? 0.5 : 0.2} />
                </mesh>
                {/* Status indicator strip */}
                <mesh position={[0, 0.5 * S, 0.46 * S]}>
                    <planeGeometry args={[0.15 * S, 1.8 * S]} />
                    <meshBasicMaterial color="#00ffcc" />
                </mesh>
            </group>
        );
    }

    if (type === 'plant') {
        return (
            <group ref={meshRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <mesh position={[0, -0.3 * S, 0]}>
                    <cylinderGeometry args={[0.3 * S, 0.24 * S, 0.5 * S, 10]} />
                    <meshStandardMaterial color="#120506" metalness={0.8} roughness={0.3} />
                </mesh>
                {[0, 0.25, -0.22].map((offset, i) => (
                    <mesh key={i} position={[offset * 0.45 * S, (0.35 + i * 0.16) * S, offset * 0.25 * S]} rotation={[0.08 * i, i * 0.45, 0.08]}>
                        <coneGeometry args={[0.1 * S, (0.55 + i * 0.1) * S, 6]} />
                        <meshStandardMaterial color="#FF3A57" emissive="#ff7a88" emissiveIntensity={hovered ? 1.0 : 0.6} transparent opacity={0.9} />
                    </mesh>
                ))}
            </group>
        );
    }

    if (type === 'console') {
        return (
            <group ref={meshRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.2 * S, 0.85 * S, 1.0 * S]} />
                    <meshStandardMaterial color="#080306" metalness={0.9} roughness={0.2} emissive="#FF4D6D" emissiveIntensity={hovered ? 0.8 : 0.3} />
                </mesh>
                <mesh position={[0, 0.65 * S, 0.3 * S]} rotation={[-0.3, 0, 0]}>
                    <planeGeometry args={[1.8 * S, 0.85 * S]} />
                    <meshBasicMaterial color="#FF7A88" transparent opacity={0.4} side={THREE.DoubleSide} />
                </mesh>
            </group>
        );
    }

    if (type === 'hexCell') {
        return (
            <group ref={meshRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.9 * S, 0.9 * S, 0.12 * S, 6]} />
                    <meshStandardMaterial color="#2b1620" metalness={0.2} roughness={0.4} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.6 * S, 0.6 * S, 0.15 * S, 6]} />
                    <meshBasicMaterial color="#ffccd5" transparent opacity={0.3} />
                </mesh>
            </group>
        );
    }

    if (type === 'portal') {
        return (
            <group ref={meshRef} position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <mesh rotation={[0, 0, 0]}>
                    <torusGeometry args={[1.2 * S, 0.07 * S, 8, 24]} />
                    <meshStandardMaterial color="#FF7A88" emissive="#FF7A88" emissiveIntensity={hovered ? 1.0 : 0.5} metalness={0.4} roughness={0.2} />
                </mesh>
                <mesh rotation={[0, Math.PI / 3, 0]}>
                    <torusGeometry args={[0.95 * S, 0.04 * S, 8, 24]} />
                    <meshStandardMaterial color="#ff99aa" emissive="#ff99aa" emissiveIntensity={hovered ? 0.8 : 0.4} />
                </mesh>
                <mesh>
                    <sphereGeometry args={[0.34 * S, 16, 16]} />
                    <meshBasicMaterial color="#ffccd5" transparent opacity={0.65} />
                </mesh>
            </group>
        );
    }

    return null;
}

// ============================================
// INTERIOR PARTICLES - Floating dust/energy
// ============================================
function InteriorParticles({ count = 8, bounds }) {
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * bounds[0] * 0.6,
                (Math.random() - 0.5) * bounds[1] * 0.6,
                (Math.random() - 0.5) * bounds[2] * 0.6
            ],
            scale: Math.random() * 0.04 + 0.01,
            speed: Math.random() * 0.35 + 0.18,
            offset: Math.random() * Math.PI * 2
        }));
    }, [count, bounds]);

    return (
        <group>
            {particles.map((p, i) => (
                <FloatingParticle key={i} {...p} />
            ))}
        </group>
    );
}

function FloatingParticle({ position, scale, speed, offset }) {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.4;
            ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5 + offset) * 0.18;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[scale, 8, 8]} />
            <meshBasicMaterial color="#dfe9ff" transparent opacity={0.35} />
        </mesh>
    );
}

// ============================================
// CRYSTALLINE PILLAR - Corner support
// ============================================
// ============================================
// CRYSTALLINE PILLAR - Corner support (OPTIMIZED)
// ============================================
function CrystallinePillar({ position, height, isActive }) {
    const coreRef = useRef();

    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.material.emissiveIntensity = 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.25;
        }
    });

    return (
        <group position={position}>
            {/* Outer crystal shell - Sleek obsidian crystal */}
            <mesh>
                <cylinderGeometry args={[0.6 * TOWER_SCALE, 0.8 * TOWER_SCALE, height, 6]} />
                <meshStandardMaterial
                    color="#1c0608"
                    metalness={0.85}
                    roughness={0.2}
                    emissive="#AD2831"
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Inner energy core */}
            <mesh ref={coreRef}>
                <cylinderGeometry args={[0.15 * TOWER_SCALE, 0.15 * TOWER_SCALE, height - 1, 8]} />
                <meshStandardMaterial
                    color="#AD2831"
                    emissive="#ff4444"
                    emissiveIntensity={isActive ? 1.2 : 0.6}
                    transparent
                    opacity={0.92}
                />
            </mesh>
            {/* Top cap */}
            <mesh position={[0, height / 2, 0]}>
                <coneGeometry args={[0.8 * TOWER_SCALE, 1 * TOWER_SCALE, 6]} />
                <meshStandardMaterial color="#1a0505" metalness={0.9} roughness={0.12} emissive="#AD2831" emissiveIntensity={0.18} />
            </mesh>
            {/* Bottom cap */}
            <mesh position={[0, -height / 2, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.8 * TOWER_SCALE, 1 * TOWER_SCALE, 6]} />
                <meshStandardMaterial color="#1a0505" metalness={0.9} roughness={0.12} emissive="#AD2831" emissiveIntensity={0.18} />
            </mesh>
        </group>
    );
}

// ============================================
// TOWER FLOOR - Cosmic Glass Architecture
// ============================================
// ============================================
// TOWER FLOOR - Cosmic Glass Architecture
// ============================================
function TowerFloor({ position, rotation, isOpen, isActive, isIntro, onSectionSelect, sectionName, sectionIndex, mode }) {
    const glowRef = useRef();
    // Use the same world floor height as the camera/scene: 22 units (scaled)
    const floorHeight = 28 * TOWER_SCALE;
    const floorWidth = 28 * TOWER_SCALE;
    const floorDepth = 28 * TOWER_SCALE;
    const frontZ = isOpen ? -floorDepth / 2 : floorDepth / 2;
    const backZ = isOpen ? floorDepth / 2 : -floorDepth / 2;

    const showButton = mode === 'TOWER_SCROLL';
    const glowIntensity = isIntro ? 1.6 : (isActive ? 1.6 : 0.6);

    useFrame((state) => {
        if (glowRef.current) {
            glowRef.current.intensity = glowIntensity + Math.sin(state.clock.elapsedTime * 2) * 0.5;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* === FLOOR PLATFORM === */}
            <group position={[0, -floorHeight / 2, 0]}>
                {/* Main floor with pattern */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[floorWidth + 2 * TOWER_SCALE, 0.4 * TOWER_SCALE, floorDepth + 2 * TOWER_SCALE]} />
                    <meshStandardMaterial color="#0a0202" metalness={0.6} roughness={0.3} emissive="#AD2831" emissiveIntensity={isActive ? 0.25 : 0.08} transparent={false} opacity={1} />
                </mesh>
                {/* Decorative floor ring */}
                <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[8 * TOWER_SCALE, 0.15 * TOWER_SCALE, 8, 32]} />
                    <meshStandardMaterial color="#AD2831" emissive="#AD2831" emissiveIntensity={isActive ? 0.9 : 0.18} />
                </mesh>
                {/* Inner floor glow ring */}
                <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[4 * TOWER_SCALE, 0.1 * TOWER_SCALE, 8, 32]} />
                    <meshStandardMaterial color="#ff6666" emissive="#ff6666" emissiveIntensity={isActive ? 0.9 : 0.22} />
                </mesh>
            </group>

            {/* === CEILING === */}
            <group position={[0, floorHeight / 2, 0]}>
                <mesh>
                    <boxGeometry args={[floorWidth + 2, 0.4, floorDepth + 2]} />
                    <meshStandardMaterial color="#0a0202" metalness={0.6} roughness={0.3} emissive="#AD2831" emissiveIntensity={0.1} transparent={false} opacity={1} />
                </mesh>
                {/* Chandelier / Ceiling light fixture */}
                <mesh position={[0, -1 * TOWER_SCALE, 0]}>
                    <dodecahedronGeometry args={[0.8 * TOWER_SCALE]} />
                    <meshStandardMaterial color="#AD2831" emissive="#ff4444" emissiveIntensity={isActive ? 1.1 : 0.4} transparent opacity={0.8} />
                </mesh>
                <mesh position={[0, -0.3 * TOWER_SCALE, 0]}>
                    <cylinderGeometry args={[0.05 * TOWER_SCALE, 0.05 * TOWER_SCALE, 0.6 * TOWER_SCALE, 8]} />
                    <meshStandardMaterial color="#1a0505" metalness={0.9} roughness={0.1} />
                </mesh>
            </group>

            {/* === CORNER PILLARS === */}
            {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([x, z], i) => (
                <CrystallinePillar
                    key={i}
                    position={[x * (floorWidth / 2 - 0.5 * TOWER_SCALE), 0, z * (floorDepth / 2 - 0.5 * TOWER_SCALE)]}
                    height={floorHeight - 1 * TOWER_SCALE}
                    isActive={isActive}
                />
            ))}

            {/* === BACK WALL - Cosmic Glass Panel (Optimized) === */}
            <group position={[0, 0, backZ]}>
                {/* Main glass panel */}
                <mesh>
                    <boxGeometry args={[floorWidth - 2 * TOWER_SCALE, floorHeight - 2 * TOWER_SCALE, 0.3 * TOWER_SCALE]} />
                    <meshStandardMaterial
                        color="#2a080c"
                        metalness={0.9}
                        roughness={0.15}
                        emissive="#AD2831"
                        emissiveIntensity={isActive ? 0.3 : 0.08}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                {/* Decorative frame */}
                <mesh position={[0, 0, isOpen ? -0.2 * TOWER_SCALE : 0.2 * TOWER_SCALE]}>
                    <boxGeometry args={[floorWidth - 1 * TOWER_SCALE, floorHeight - 1 * TOWER_SCALE, 0.1 * TOWER_SCALE]} />
                    <meshStandardMaterial color="#1a0505" metalness={0.95} roughness={0.1} emissive="#AD2831" emissiveIntensity={0.1} transparent opacity={0.3} />
                </mesh>
            </group>

            {/* === SIDE WALLS - Inset Classy Windows === */}
            {[-1, 1].map((side) => {
                const wallThick = 0.75 * TOWER_SCALE;
                const winHeight = floorHeight * 0.7; // 70% height
                const winWidth = floorDepth * 0.5;   // 50% width

                return (
                    <group key={side} position={[side * (floorWidth / 2), 0, 0]}>

                        {/* --- SOLID WALL SURROUNDINGS --- */}
                        <group>
                            {/* 1. Columns (Front and Back) */}
                            {[-1, 1].map(dir => (
                                <mesh key={dir} position={[0, 0, dir * (floorDepth / 2 - (floorDepth - winWidth) / 4)]}>
                                    <boxGeometry args={[wallThick, floorHeight, (floorDepth - winWidth) / 2]} />
                                    <meshStandardMaterial color="#380b0b" metalness={0.9} roughness={0.15} />
                                </mesh>
                            ))}
                            {/* 2. Headers (Top and Bottom) */}
                            {[-1, 1].map(dir => (
                                <mesh key={dir} position={[0, dir * (floorHeight / 2 - (floorHeight - winHeight) / 4), 0]}>
                                    <boxGeometry args={[wallThick, (floorHeight - winHeight) / 2, winWidth]} />
                                    <meshStandardMaterial color="#1a0505" metalness={0.9} roughness={0.15} />
                                </mesh>
                            ))}
                        </group>

                        {/* --- THE WINDOW INSET --- */}
                        <group>
                            {/* Inner Frame - Hollow Border (Top/Bottom/Left/Right) */}
                            <group>
                                {[-1, 1].map(yDir => (
                                    /* Top/Bottom Frame Borders */
                                    <mesh key={`h-${yDir}`} position={[0, yDir * (winHeight / 2 + 0.1 * TOWER_SCALE), 0]}>
                                        <boxGeometry args={[wallThick * 1.1, 0.2 * TOWER_SCALE, winWidth + 0.4 * TOWER_SCALE]} />
                                        <meshStandardMaterial color="#1a0a0a" metalness={0.9} roughness={0.2} emissive="#330000" emissiveIntensity={0.2} />
                                    </mesh>
                                ))}
                                {[-1, 1].map(zDir => (
                                    /* Side Frame Borders */
                                    <mesh key={`v-${zDir}`} position={[0, 0, zDir * (winWidth / 2 + 0.1 * TOWER_SCALE)]}>
                                        <boxGeometry args={[wallThick * 1.1, winHeight + 0.6 * TOWER_SCALE, 0.2 * TOWER_SCALE]} />
                                        <meshStandardMaterial color="#1a0a0a" metalness={0.9} roughness={0.2} emissive="#330000" emissiveIntensity={0.2} />
                                    </mesh>
                                ))}
                            </group>

                            {/* The Holographic Glass */}
                            <mesh>
                                <boxGeometry args={[0.2 * TOWER_SCALE, winHeight, winWidth]} />
                                <meshStandardMaterial
                                    color="#2a080c"
                                    emissive="#ff6688"
                                    emissiveIntensity={isActive ? 0.35 : 0.12}
                                    metalness={0.85}
                                    roughness={0.2}
                                    transparent
                                    opacity={0.75}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>

                            {/* RESTORED GRID: 2 Vertical Lines, 1 Horizontal */}
                            {/* Horizontal Divider */}
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.25 * TOWER_SCALE, 0.15 * TOWER_SCALE, winWidth]} />
                                <meshBasicMaterial color="#a3d1ff" transparent opacity={0.6} />
                            </mesh>
                            {/* Vertical Dividers (2 lines) */}
                            {[-0.33, 0.33].map(offsetProp => (
                                <mesh key={offsetProp} position={[0, 0, offsetProp * winWidth]}>
                                    <boxGeometry args={[0.25 * TOWER_SCALE, winHeight, 0.1 * TOWER_SCALE]} />
                                    <meshBasicMaterial color="#a3d1ff" transparent opacity={0.6} />
                                </mesh>
                            ))}
                        </group>
                    </group>
                );
            })}

            {/* === OPEN FACE FRAME - Glowing Archway === */}
            <group position={[0, 0, frontZ]}>
                {/* Top beam */}
                <mesh position={[0, floorHeight / 2 - 0.5 * TOWER_SCALE, 0]}>
                    <boxGeometry args={[floorWidth, 0.8 * TOWER_SCALE, 0.8 * TOWER_SCALE]} />
                    <meshStandardMaterial color="#1a0505" metalness={0.95} roughness={0.05} emissive="#AD2831" emissiveIntensity={isActive ? 1.2 : 0.3} />
                </mesh>
                {/* Bottom beam */}
                <mesh position={[0, -floorHeight / 2 + 0.5 * TOWER_SCALE, 0]}>
                    <boxGeometry args={[floorWidth, 0.8 * TOWER_SCALE, 0.8 * TOWER_SCALE]} />
                    <meshStandardMaterial color="#1a0505" metalness={0.95} roughness={0.05} emissive="#AD2831" emissiveIntensity={isActive ? 1.2 : 0.3} />
                </mesh>
                {/* Side pillars */}
                {[-1, 1].map((side) => (
                    <mesh key={side} position={[side * (floorWidth / 2), 0, 0]}>
                        <boxGeometry args={[0.8 * TOWER_SCALE, floorHeight, 0.8 * TOWER_SCALE]} />
                        <meshStandardMaterial color="#1a0505" metalness={0.95} roughness={0.05} emissive="#AD2831" emissiveIntensity={isActive ? 1 : 0.25} />
                    </mesh>
                ))}
                {/* Glowing edge strips */}
                <mesh position={[0, floorHeight / 2 - 0.2 * TOWER_SCALE, isOpen ? -0.5 * TOWER_SCALE : 0.5 * TOWER_SCALE]}>
                    <boxGeometry args={[floorWidth + 0.5 * TOWER_SCALE, 0.12 * TOWER_SCALE, 0.12 * TOWER_SCALE]} />
                    <meshStandardMaterial color="#ff6666" emissive="#ff6666" emissiveIntensity={isActive ? 1.1 : 0.45} />
                </mesh>
                <mesh position={[0, -floorHeight / 2 + 0.2 * TOWER_SCALE, isOpen ? -0.5 * TOWER_SCALE : 0.5 * TOWER_SCALE]}>
                    <boxGeometry args={[floorWidth + 0.5 * TOWER_SCALE, 0.12 * TOWER_SCALE, 0.12 * TOWER_SCALE]} />
                    <meshStandardMaterial color="#ff6666" emissive="#ff6666" emissiveIntensity={isActive ? 1.1 : 0.45} />
                </mesh>
            </group>

            {/* === INTERIOR FURNITURE — Classy Minimalist Layout === */}
            <group>
                {/* Executive central holographic command desk & chair */}
                <FloatingFurniture position={[0, -5 * TOWER_SCALE, 1.2 * TOWER_SCALE]} type="desk" delay={0.2} />
                <FloatingFurniture position={[0, -6.2 * TOWER_SCALE, 2.8 * TOWER_SCALE]} type="chair" delay={0.4} />

                {/* Back focal tech: Monolith server on left, celestial plant on right */}
                <FloatingFurniture position={[-8 * TOWER_SCALE, -4.5 * TOWER_SCALE, -2.0 * TOWER_SCALE]} type="server" delay={0.6} />
                <FloatingFurniture position={[8 * TOWER_SCALE, -4.5 * TOWER_SCALE, -2.0 * TOWER_SCALE]} type="plant" delay={0.8} />

                {/* Central floating portal & back wall hex accent */}
                <FloatingFurniture position={[0, 1.2 * TOWER_SCALE, backZ * 0.15]} type="portal" delay={0.3} />
                <FloatingFurniture position={[0, 4.0 * TOWER_SCALE, backZ * 0.45]} type="hexCell" delay={1.0} />
            </group>

            {/* Subtle interior particles */}
            <InteriorParticles count={8} bounds={[floorWidth - 2, floorHeight - 2, floorDepth - 2]} />

            {/* === LIGHTING - Optimized (Single light source) === */}
            <pointLight ref={glowRef} position={[0, 0, 0]} color="#AD2831" intensity={glowIntensity} distance={40 * TOWER_SCALE} />

            {/* === NAVIGATION BUTTON === */}
            {showButton && (
                <Html
                    position={[0, 0, frontZ + (isOpen ? -0.5 * TOWER_SCALE : 0.5 * TOWER_SCALE)]}
                    rotation={[0, Math.PI, 0]} // Flipped 180 to fix mirror effect
                    center
                    transform
                    occlude // Strict occlusion
                    distanceFactor={35} // Consistent visual size
                    style={{
                        pointerEvents: 'auto',
                        transition: 'opacity 0.3s',
                        opacity: isActive ? 1 : 0.6,
                    }}
                >
                    <div
                        className={`tower-floor-panel ${isActive ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onSectionSelect) onSectionSelect(sectionIndex);
                        }}
                    >
                        <div className="panel-header">LEVEL {sectionIndex + 1}</div>
                        <div className="panel-title">{sectionName || 'RESTRICTED'}</div>
                        <div className="panel-footer">
                            <span className="icon">✦</span>
                            <span>{isActive ? 'CURRENT' : 'ACCESS'}</span>
                            <span className="icon">✦</span>
                        </div>
                        <div className="panel-glow"></div>
                    </div>
                </Html>
            )}
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
            coreRef.current.material.emissiveIntensity = 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.35;
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.y = state.clock.elapsedTime * 0.4;
        }
    });

    return (
        <group>
            <mesh ref={coreRef}>
                <cylinderGeometry args={[0.6 * TOWER_SCALE, 0.6 * TOWER_SCALE, totalHeight + 40 * TOWER_SCALE, 16]} />
                <meshStandardMaterial color="#AD2831" emissive="#ff4444" emissiveIntensity={1.0} transparent opacity={0.8} />
            </mesh>
            <mesh>
                <cylinderGeometry args={[1.5 * TOWER_SCALE, 1.5 * TOWER_SCALE, totalHeight + 40 * TOWER_SCALE, 16]} />
                <meshBasicMaterial color="#AD2831" transparent opacity={0.1} />
            </mesh>
            <group ref={ringsRef}>
                {[0.08, 0.22, 0.36, 0.5, 0.64, 0.78, 0.92].map((t, i) => (
                    <mesh key={i} position={[0, (t - 0.5) * totalHeight, 0]} rotation={[Math.PI / 2, 0, i * 0.2]}>
                        <torusGeometry args={[4 * TOWER_SCALE, 0.15 * TOWER_SCALE, 16, 40]} />
                        <meshStandardMaterial color="#AD2831" emissive="#AD2831" emissiveIntensity={0.6} transparent opacity={0.35} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

// ============================================
// FICTIONAL ENDLESS LAND - The base of the universe
// ============================================
function FictionalLand({ position }) {
    const terrainGeo = useMemo(() => {
        // Massive plane for "endless" feel
        const geo = new THREE.PlaneGeometry(800 * TOWER_SCALE, 800 * TOWER_SCALE, 96, 96);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const dist = Math.sqrt(x * x + y * y);

            // Create a safe flat crater for the tower base
            let z = 0;
            const craterRadius = 45 * TOWER_SCALE;

            if (dist < craterRadius) {
                // Flat/Safe zone under tower
                z = 0;
            } else {
                // Procedural Alien Dunes
                // Mix of sine waves for rolling hills
                const wave1 = Math.sin(x * 0.02) * Math.cos(y * 0.02) * 15 * TOWER_SCALE;
                const wave2 = Math.sin(x * 0.05 + y * 0.05) * 5 * TOWER_SCALE;
                // Rise up as we go out to create a "valley" feel
                const valleyRise = Math.pow((dist - craterRadius) * 0.015, 2);

                z = wave1 + wave2 + valleyRise;
            }
            pos.setZ(i, z);
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    return (
        <group position={position}>
            {/* The Landscape Mesh */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={terrainGeo}>
                <meshStandardMaterial
                    color="#080204"
                    metalness={0.4}
                    roughness={0.7}
                    emissive="#AD2831"
                    emissiveIntensity={0.05}
                    wireframe={false} // Solid land
                />
            </mesh>
            {/* Wireframe overlay for "Digital/Fictional" aesthetic */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} geometry={terrainGeo}>
                <meshBasicMaterial color="#ff4444" wireframe transparent opacity={0.08} />
            </mesh>

            {/* Low lying fog/clouds at the base */}
            <mesh position={[0, 5 * TOWER_SCALE, 0]}>
                <cylinderGeometry args={[200 * TOWER_SCALE, 200 * TOWER_SCALE, 10 * TOWER_SCALE, 32]} />
                <meshBasicMaterial color="#AD2831" transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
        </group>
    );
}

// ============================================
// MAIN TOWER
// ============================================
function CosmicTower({ currentSection, nextSection, totalSections, mode, isIntro, towerScrollProgress, onSectionSelect, sections }) {
    const towerRef = useRef();
    const floorHeight = 28 * TOWER_SCALE;
    const totalHeight = floorHeight * totalSections;
    // Small base yaw so open face is slightly angled (shows side ~20%)
    const BASE_Y_ANGLE = 0.6; // radians (~11.5°)

    useFrame((state) => {
        if (towerRef.current) {
            if (isIntro) {
                // Faster rotation during intro
                towerRef.current.rotation.y = BASE_Y_ANGLE + state.clock.elapsedTime * 0.3;
            } else if (mode === 'TOWER_SCROLL') {
                // In scroll mode, gentle floating only (no rotation)
                // Add subtle floating animation (faster float)
                towerRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
                const currentFloor = (1 - towerScrollProgress) * (totalSections - 1);
                // Rotate by 90 degrees per floor (adjacent faces), negative so selected floor's local rotation aligns to front
                const targetRotation = BASE_Y_ANGLE - currentFloor * (Math.PI / 2);
                towerRef.current.rotation.y += (targetRotation - towerRef.current.rotation.y) * 0.12;
            } else {
                // Normal rotation based on section - much faster speed
                const targetRotation = BASE_Y_ANGLE - currentSection * (Math.PI / 2);
                const speed = mode === 'ROTATE' ? 0.2 : 0.15;
                towerRef.current.rotation.y += (targetRotation - towerRef.current.rotation.y) * speed;
            }

            // Vertical position - For intro and tower-scroll we allow floating/animation.
            // For normal section navigation we keep the tower vertically fixed and let the camera
            // move to the new floor. This ensures when you scroll one unit the next story
            // appears exactly where the previous one was on screen.
            if (isIntro || mode === 'TOWER_SCROLL') {
                const targetY = 0;
                towerRef.current.position.y += (targetY - towerRef.current.position.y) * 0.15;
            } else {
                // Keep tower at baseline (no per-section vertical shift)
                const baselineY = 0;
                towerRef.current.position.y += (baselineY - towerRef.current.position.y) * 0.12;
            }
        }
    });

    // Reverse section order: Home (index 0) at TOP (highest floor), Contact at BOTTOM
    const reversedSectionIndex = (floorIndex) => totalSections - 1 - floorIndex;

    return (
        <group ref={towerRef}>
            <EnergyCore totalHeight={totalHeight} />

            {Array.from({ length: totalSections }).map((_, floorIndex) => {
                // Map floor position to section: floor 0 (bottom) = Contact, floor 7 (top) = Home
                const sectionIndex = reversedSectionIndex(floorIndex);
                // Assign consecutive adjacent faces: face 0,1,2,3 for sectionIndex % 4
                const faceIndex = sectionIndex % 4;
                // Flip faces so story 0 shows its open face (reverse default opaque-facing behavior)
                const floorYaw = faceIndex * (Math.PI / 2) + Math.PI;
                return (
                    <TowerFloor
                        key={floorIndex}
                        position={[0, floorIndex * floorHeight, 0]}
                        // Rotate the floor so its local -Z is the open face for that story
                        rotation={[0, floorYaw, 0]}
                        // Floor content uses local -Z as the open face, so keep isOpen true
                        isOpen={true}
                        isActive={currentSection === sectionIndex}
                        isIntro={isIntro}
                        mode={mode}
                        sectionName={sections?.[sectionIndex]?.name || `Section ${sectionIndex + 1}`}
                        sectionIndex={sectionIndex}
                        onSectionSelect={onSectionSelect}
                        floorIndex={floorIndex}
                    />
                );
            })}

            {/* Base - Endless Fictional FictionalLand */}
            {(() => {
                const baseHeight = 20 * TOWER_SCALE;
                const baseY = -(floorHeight / 2) - (2 * TOWER_SCALE);
                return <FictionalLand position={[0, baseY, 0]} />;
            })()}
        </group>
    );
}

// ============================================
// CAMERA CONTROLLER - Animates from base up to tower top
// ============================================
function CameraController({ currentSection, mode, floorHeight, totalSections, isIntro, introProgress, towerScrollProgress, zoomLevel = 1, groupShiftY = 0, globalScale = 1, towerOffsetY = 0 }) {
    const { camera, invalidate } = useThree();
    const scaledFloorHeight = floorHeight * globalScale;
    const totalHeight = scaledFloorHeight * totalSections;
    const anchorYRef = useRef(null);
    const lastInitDeps = useRef({ totalSections: null, scaledFloorHeight: null, groupShiftY: null });
    const lastSectionRef = useRef(currentSection);

    useEffect(() => {
        // Initialize anchor Y so it's stable across frames and only recalculated
        // when key parameters change (prevents drift when other animations run).
        if (
            lastInitDeps.current.totalSections !== totalSections ||
            lastInitDeps.current.scaledFloorHeight !== scaledFloorHeight ||
            lastInitDeps.current.groupShiftY !== groupShiftY ||
            lastInitDeps.current.towerOffsetY !== towerOffsetY
        ) {
            // Account for the extra tower offset that is applied inside the scaled group
            anchorYRef.current = groupShiftY + (towerOffsetY || 0) + (totalSections - 1) * scaledFloorHeight + (scaledFloorHeight / 2);
            lastInitDeps.current = { totalSections, scaledFloorHeight, groupShiftY, towerOffsetY };
        }
    }, [totalSections, scaledFloorHeight, groupShiftY, towerOffsetY]);

    useEffect(() => {
        // Ensure a redraw when section/zoom changes while frameloop is on demand.
        invalidate();
    }, [currentSection, mode, zoomLevel, towerScrollProgress, introProgress, invalidate]);

    useFrame(() => {
        let targetX, targetY, targetZ, lookAtY;

        // FOV Zoom effect - default 50, ranges slightly with zoomLevel
        camera.fov = 65 * (1 + zoomLevel * 0.2);
        camera.updateProjectionMatrix();

        if (isIntro) {
            // Animate camera from looking at base -> looking straight at tower top restated for group shift
            const startY = 40;
            // Fix: Account for towerOffsetY and add extra height for 3D perspective of top
            const realTowerTop = groupShiftY + totalHeight + (towerOffsetY || 0);

            // Aim for height = realTowerTop + 3.0 * h (Very steep angle)
            const endY = realTowerTop + scaledFloorHeight * 3.0;
            const startLookY = groupShiftY;
            // Look at center of top floor (matches normal mode baseTargetY)
            const endLookY = realTowerTop - scaledFloorHeight * 0.5;

            targetX = (1 - introProgress) * 20;
            targetY = startY + (endY - startY) * introProgress;
            // Keep camera distance independent of tower scale so camera doesn't auto-retreat
            targetZ = 95 * zoomLevel; // fixed distance (not multiplied by TOWER_SCALE)
            lookAtY = startLookY + (endLookY - startLookY) * introProgress;
        } else if (mode === 'TOWER_SCROLL') {
            // Scrollable Tower Mode - map towerScrollProgress to fractional floor index
            // so camera Y follows the same anchor-based floor positions (prevents drift).
            const fractionalFloor = (1 - towerScrollProgress) * (totalSections - 1);
            const anchor = anchorYRef.current ?? (groupShiftY + (towerOffsetY || 0) + (totalSections - 1) * scaledFloorHeight + (scaledFloorHeight / 2));

            // If the tower is at the top position (initial post-intro state),
            // nudge the camera up a bit and look slightly below the top surface
            // so ~10-20% of the top face is visible. Otherwise follow floors normally.
            if (fractionalFloor === 0) {
                const topSurfaceY = anchor + scaledFloorHeight * 0.3; // top surface world Y
                // Place camera slightly above the top surface to reveal the rim
                targetY = topSurfaceY + scaledFloorHeight * 0.3; // ~1.1*h above center
                // Look a bit below the top surface so a sliver of it is visible
                lookAtY = anchor + scaledFloorHeight * 0.05;
                targetX = 0;
                targetZ = 110 * zoomLevel;
            } else {
                targetX = 0;
                targetY = anchor - fractionalFloor * scaledFloorHeight;
                // Keep camera distance independent of tower scale for consistent framing
                targetZ = 120 * zoomLevel;
                lookAtY = targetY;
            }
        } else {
            // Normal section view
            const floorIndex = totalSections - 1 - currentSection;
            const angle = (floorIndex * 0.15) % (Math.PI * 2);
            // Orbit radius should not force camera further away when tower scale increases
            const radius = 42 * zoomLevel * globalScale;
            targetX = Math.sin(angle) * radius;
            targetZ = Math.cos(angle) * radius;
            // Use stable anchor to compute exact Y per section to avoid cumulative drift
            const anchor = anchorYRef.current ?? (groupShiftY + (totalSections - 1) * scaledFloorHeight + (scaledFloorHeight / 2));
            const baseTargetY = anchor - currentSection * scaledFloorHeight;

            // Adjust camera for "Home" (Top) section to show a subtle 3D perspective
            if (currentSection === 0) {
                // We want a small slice (~10-20%) of the top surface visible when
                // the home/top story is active. Compute the top surface Y and place
                // the camera just above it while looking slightly below the surface
                // to reveal the edge.
                const topSurfaceY = baseTargetY + scaledFloorHeight * 0.5;
                // Position the camera a bit above the top surface (≈1.1*h above center)
                targetY = topSurfaceY + scaledFloorHeight * 0.6; // baseTargetY + 1.1*h
                // Look slightly below the top surface so a small portion of it is visible
                // (around 10-20% of the surface area visually).
                lookAtY = baseTargetY + scaledFloorHeight * 0.35;

                // Keep a frontal orbit for the home view to avoid lateral settling
                targetX = 0;
                targetZ = 95 * zoomLevel;
            } else {
                targetY = baseTargetY;
                lookAtY = targetY;
            }
        }

        // Clamp targetZ to avoid extreme distances when scale is large
        const MIN_Z = 30;
        const MAX_Z = 220;
        targetZ = Math.max(MIN_Z, Math.min(targetZ, MAX_Z));

        // Smooth camera movement
        const speed = isIntro ? 0.05 : (mode === 'TOWER_SCROLL' ? 0.12 : 0.08);

        // For normal section navigation, force Y exactly to the computed target to avoid
        // any interpolation accumulation. Keep X/Z smoothed for visual polish.
        if (!isIntro && mode !== 'TOWER_SCROLL') {
            camera.position.y = targetY;
            lastSectionRef.current = currentSection;
        }

        camera.position.x += (targetX - camera.position.x) * speed;
        // camera.position.y is forced above for normal mode; otherwise interpolate
        if (isIntro || mode === 'TOWER_SCROLL') {
            camera.position.y += (targetY - camera.position.y) * speed;
        }
        camera.position.z += (targetZ - camera.position.z) * speed;
        camera.lookAt(0, lookAtY, 0);
    });

    return null;
}

// ============================================
// MAIN SCENE
// ============================================
function Scene({ currentSection, nextSection, totalSections, mode, isIntro, onExplore, introProgress, towerScrollProgress, onSectionSelect, sections, zoomLevel }) {
    const floorHeight = 28 * TOWER_SCALE;
    const totalHeight = floorHeight * totalSections;

    // Shift and Scale settings
    // After intro settles, we make it bigger and shift it up
    const globalScale = 1 + (introProgress * 0.15); // Scale up to 1.15x
    const groupShiftY = introProgress * 15; // Shift up by 15 units
    // Move the tower upward (world units) without moving the ring/intro with it
    const towerOffsetY = 38;

    return (
        <>
            <color attach="background" args={['#020101']} />
            {/* Fog: push start back to 180 so intro elements (at dist ~100) are not greyed out */}
            <fog attach="fog" args={['#020101', 180, Math.max(400, 400 * TOWER_SCALE)]} />
            <ambientLight intensity={0.4} /> {/* Increased ambient */}
            <directionalLight position={[20, 40, 20]} intensity={0.8} />

            <CameraController
                currentSection={currentSection}
                mode={mode}
                floorHeight={floorHeight}
                totalSections={totalSections}
                isIntro={isIntro}
                introProgress={introProgress}
                towerScrollProgress={towerScrollProgress}
                zoomLevel={zoomLevel}
                groupShiftY={groupShiftY}
                globalScale={globalScale}
                towerOffsetY={towerOffsetY}
            />

            <CosmicBackground isIntro={isIntro} />

            <group position={[0, groupShiftY, 0]} scale={[globalScale, globalScale, globalScale]}>
                {/* Tower-only offset so ring/intro cluster stays put */}
                <group position={[0, towerOffsetY / (globalScale || 1), 0]}>
                    <CosmicTower
                        currentSection={currentSection}
                        nextSection={nextSection}
                        totalSections={totalSections}
                        mode={mode}
                        isIntro={isIntro}
                        towerScrollProgress={towerScrollProgress}
                        onSectionSelect={onSectionSelect}
                        sections={sections}
                    />
                </group>

                <IntroElement
                    position={[0, (totalSections - 1) * floorHeight - floorHeight / 2 + 72, 0]}
                    onExplore={onExplore}
                    isVisible={isIntro || mode === 'TOWER_SCROLL'}
                />
            </group>
        </>
    );
}
// ============================================
// MAIN EXPORT
// ============================================
export default function CosmicTowerBackground({
    currentSection = 0,
    nextSection = null,
    totalSections = 8,
    mode = 'VIEWING',
    isIntro = false,
    onExplore = () => { },
    towerScrollProgress = 0,
    onSectionSelect = () => { },
    sections = [],
    zoomLevel = 1
}) {
    const [introProgress, setIntroProgress] = useState(0);
    const [isSceneReady, setIsSceneReady] = useState(false);

    // Mark scene as ready after a brief delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSceneReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Animate intro progress from 0 to 1 over 2.4 seconds for a cinematic yet snappy transition
    useEffect(() => {
        if (isIntro && isSceneReady) {
            let startTime = null;
            const duration = 2400;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic for smooth deceleration
                const eased = 1 - Math.pow(1 - progress, 3);
                setIntroProgress(eased);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        } else {
            setIntroProgress(1);
        }
    }, [isIntro, isSceneReady]);
    // Ensure hooks are always called in the same order: compute canvas settings
    const canvasSettings = useMemo(() => getOptimizedCanvasSettings(), []);
    const frameloopMode = mode === 'VIEWING' ? 'demand' : 'always';

    const getOpacity = () => {
        if (isIntro) return 1;
        switch (mode) {
            case 'COLLAPSE': return 0.6;
            case 'ROTATE': return 1;
            case 'EXPAND': return 0.6;
            case 'TOWER_SCROLL': return 1;
            default: return 0.25;
        }
    };

    // Don't render visual Canvas until scene is ready, but keep hooks executed
    if (!isSceneReady) {
        return null;
    }

    return (
        <>
            <div
                className="cosmic-tower-bg"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    opacity: getOpacity(),
                    transition: 'opacity 0.4s ease',
                }}
            >
                <Canvas 
                    camera={{ position: [20, 40, 120 / TOWER_SCALE], fov: 50 }} 
                    gl={{ 
                        antialias: canvasSettings.antialias,
                        powerPreference: canvasSettings.powerPreference,
                        alpha: true,
                        stencil: false,
                        depth: true,
                    }}
                    dpr={canvasSettings.pixelRatio}
                    performance={{ min: 0.5 }}
                    frameloop={frameloopMode}
                    onCreated={({ gl }) => {
                        gl.setClearColor('#000000', 0);
                    }}
                >
                    <Scene
                        currentSection={currentSection}
                        nextSection={nextSection}
                        totalSections={totalSections}
                        mode={mode}
                        isIntro={isIntro}
                        onExplore={onExplore}
                        introProgress={introProgress}
                        towerScrollProgress={towerScrollProgress}
                        onSectionSelect={onSectionSelect}
                        sections={sections}
                        zoomLevel={zoomLevel}
                    />
                </Canvas>
            </div>

            <style jsx global>{`
        .intro-avatar-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }
        
        .intro-avatar-img {
            max-height: 100%;
            width: auto;
            object-fit: contain;
            filter: drop-shadow(0 0 20px rgba(0,0,0,0.5));
            mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
        }

        .intro-board-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: 'Poppins', sans-serif;
            color: #fff;
            padding: 2rem;
        }

        .intro-board-title {
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 1.1;
            margin-bottom: 2rem;
        }

        .intro-board-title .hindi {
            font-size: 3.5rem;
            color: #ff6b6b;
            font-weight: 300;
            text-shadow: 0 0 15px rgba(255, 107, 107, 0.6);
        }

        .intro-board-title .name {
            font-size: 6rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -2px;
            background: linear-gradient(135deg, #fff 0%, #AD2831 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 10px rgba(173, 40, 49, 0.5));
        }

        .intro-board-divider {
            width: 80px;
            height: 4px;
            background: #AD2831;
            margin-bottom: 2rem;
            border-radius: 2px;
            box-shadow: 0 0 15px #AD2831;
        }

        .intro-board-tagline {
            font-size: 2.5rem;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 3rem;
            font-weight: 500;
        }

        .intro-board-cta {
            padding: 1.2rem 4rem;
            background: linear-gradient(90deg, #AD2831 0%, #850F18 100%);
            border: none;
            color: white; /* Base color */
            font-size: 2rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(173, 40, 49, 0.4);
        }

        .intro-board-cta:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 20px 50px rgba(173, 40, 49, 0.6);
            background: linear-gradient(90deg, #ff4d4d 0%, #a61e1e 100%);
        }
        
        .intro-board-cta span {
            color: inherit;
            position: relative;
            z-index: 1;
        }

        /* === TOWER FLOOR HOLOGRAPHIC PANELS === */
        
        .tower-floor-panel {
            background: rgba(10, 5, 8, 0.85);
            border: 1px solid rgba(173, 40, 49, 0.4);
            border-left: 4px solid #AD2831;
            padding: 1.5rem 2.5rem;
            color: white;
            font-family: 'Poppins', sans-serif;
            text-align: center;
            cursor: pointer;
            backdrop-filter: blur(8px);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            min-width: 280px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        }

        .tower-floor-panel:hover, .tower-floor-panel.active {
            background: rgba(43, 10, 15, 0.9);
            border-color: #ff4d4d;
            box-shadow: 0 0 30px rgba(173, 40, 49, 0.4);
            transform: scale(1.05);
        }

        .panel-header {
            font-size: 1.5rem;
            letter-spacing: 3px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 0.3rem;
            text-transform: uppercase;
        }

        .panel-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.8rem;
            background: linear-gradient(90deg, #fff, #ffcccc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 1px;
        }

        .panel-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 1.2rem;
            color: #AD2831;
            font-weight: 600;
            letter-spacing: 2px;
        }
        
        .tower-floor-panel:hover .panel-footer, 
        .tower-floor-panel.active .panel-footer {
            color: #ff6b6b;
        }
        
        .panel-glow {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(173,40,49,0.2) 0%, transparent 60%);
            opacity: 0;
            transition: opacity 0.4s;
            pointer-events: none;
        }
        
        .tower-floor-panel:hover .panel-glow {
            opacity: 1;
        }
      `}</style>
        </>
    );
}
