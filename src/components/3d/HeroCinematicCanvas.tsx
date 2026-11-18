import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundManager } from '../common/SoundEffectManager';

interface HeroCinematicCanvasProps {
  onInteraction?: () => void;
}

export const HeroCinematicCanvas: React.FC<HeroCinematicCanvasProps> = ({ onInteraction }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 1. Three.js Background 3D Universe Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Central Metallic & Crimson Geometric Core (Behind the portrait plane)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, -2); // Behind portrait
    universeGroup.add(coreGroup);

    // Faceted Dodecahedron Structure
    const polyGeo = new THREE.DodecahedronGeometry(2.4, 0);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0x07070b,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    coreGroup.add(polyMesh);

    // Wireframe Cage with Glowing Crimson Edges
    const wireGeo = new THREE.DodecahedronGeometry(2.44, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff1e38,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Inner Radiant Energy Core
    const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff1e38,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 2. Animated Concentric Orbital Rings (Crimson Energy Lines)
    const rings: THREE.Mesh[] = [];
    const ringRadii = [3.4, 4.1, 4.8];
    const ringColors = [0xff1e38, 0xff4d6d, 0xbe123c];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.04, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4 - i * 0.08,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = (Math.PI / 3) + (i * Math.PI) / 6;
      ringMesh.rotation.y = (i * Math.PI) / 5;
      coreGroup.add(ringMesh);
      rings.push(ringMesh);
    });

    // 3. Floating 3D Holographic Developer Tech Nodes (React, TS, JS, HTML5, CSS3, Three.js)
    const techNodes: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yBase: number }[] = [];
    const techData = [
      { name: 'React', color: 0x61dafb },
      { name: 'TypeScript', color: 0x3178c6 },
      { name: 'JavaScript', color: 0xf7df1e },
      { name: 'Three.js', color: 0xff1e38 },
      { name: 'HTML5', color: 0xe34f26 },
      { name: 'Tailwind', color: 0x38bdf8 },
    ];

    techData.forEach((tech, idx) => {
      const size = 0.22;
      const nodeGeo = new THREE.BoxGeometry(size, size, size);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a10,
        emissive: tech.color,
        emissiveIntensity: 0.7,
        wireframe: true,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      coreGroup.add(nodeMesh);

      techNodes.push({
        mesh: nodeMesh,
        angle: (idx * Math.PI * 2) / techData.length,
        speed: 0.25 + (idx % 2) * 0.1,
        radius: 3.2 + (idx % 3) * 0.4,
        yBase: (idx - 2.5) * 0.7,
      });
    });

    // 4. Floating 3D Embers & Volumetric Particle Field
    const emberCount = 140;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount * 3; i += 3) {
      emberPositions[i] = (Math.random() - 0.5) * 16;
      emberPositions[i + 1] = (Math.random() - 0.5) * 16;
      emberPositions[i + 2] = (Math.random() - 0.5) * 10 - 1;

      // Crimson & Gold Embers
      if (Math.random() > 0.3) {
        emberColors[i] = 1.0; // R
        emberColors[i + 1] = 0.12; // G
        emberColors[i + 2] = 0.22; // B
      } else {
        emberColors[i] = 1.0; // R
        emberColors[i + 1] = 0.8; // G
        emberColors[i + 2] = 0.3; // Gold sparkle
      }
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    emberGeo.setAttribute('color', new THREE.BufferAttribute(emberColors, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a0507, 2);
    scene.add(ambientLight);

    const redHeroLight = new THREE.PointLight(0xff1e38, 5, 20);
    redHeroLight.position.set(0, 0, -1);
    scene.add(redHeroLight);

    const rimLightLeft = new THREE.PointLight(0xff1e38, 3, 15);
    rimLightLeft.position.set(-4, 2, 2);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.PointLight(0xff4d6d, 3, 15);
    rimLightRight.position.set(4, -2, 2);
    scene.add(rimLightRight);

    // Mouse tracking for parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      targetX = x * 0.6;
      targetY = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Damped camera parallax
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      universeGroup.rotation.y = currentX + elapsed * 0.15;
      universeGroup.rotation.x = currentY + Math.sin(elapsed * 0.5) * 0.05;

      // Core rotation
      polyMesh.rotation.x = elapsed * 0.2;
      polyMesh.rotation.y = elapsed * 0.3;
      wireMesh.rotation.x = -elapsed * 0.15;
      wireMesh.rotation.y = elapsed * 0.25;
      innerMesh.rotation.z = elapsed * 0.5;

      // Concentric rings
      rings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * (0.2 + idx * 0.15) * (idx % 2 === 0 ? 1 : -1);
      });

      // Orbiting tech nodes
      techNodes.forEach((node) => {
        const curAngle = node.angle + elapsed * node.speed;
        node.mesh.position.x = Math.cos(curAngle) * node.radius;
        node.mesh.position.z = Math.sin(curAngle) * node.radius;
        node.mesh.position.y = node.yBase + Math.sin(elapsed * 2 + curAngle) * 0.3;
        node.mesh.rotation.x = elapsed;
        node.mesh.rotation.y = elapsed * 0.8;
      });

      // Embers floating
      embers.rotation.y = -elapsed * 0.02;

      // Pulsing crimson light
      redHeroLight.intensity = 4.5 + Math.sin(elapsed * 3) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      polyGeo.dispose();
      wireGeo.dispose();
      innerGeo.dispose();
      emberGeo.dispose();
    };
  }, []);

  // 2. Interactive 3D Card Perspective Tilt
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (-y / rect.height) * 12,
      y: (x / rect.width) * 12,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.play('hover');
    if (onInteraction) onInteraction();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    soundManager.play('cinematicImpact');
    if (onInteraction) onInteraction();
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] lg:h-[660px] flex items-center justify-center select-none">
      {/* 3D WebGL Background Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Volumetric Crimson Halo behind Portrait */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[320px] h-[440px] md:w-[420px] md:h-[540px] rounded-full bg-gradient-to-t from-[#ff1e38]/30 via-[#e11d48]/15 to-transparent blur-[70px] animate-pulse-slow" />
      </div>

      {/* Main Cinematic Hero Card with Sravan's Actual Photograph */}
      <div
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative z-20 w-[300px] sm:w-[350px] md:w-[390px] h-[460px] sm:h-[530px] md:h-[580px] rounded-3xl overflow-hidden glass-card border border-[#ff1e38]/50 shadow-[0_0_50px_rgba(255,30,56,0.35),0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer group"
      >
        {/* Animated Crimson Scanning Laser Line */}
        <div className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff1e38] to-transparent z-30 animate-pulse" />

        {/* Ambient Red Rim Glow Frame */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#ff1e38]/40 group-hover:border-[#ff1e38] transition-colors duration-500 z-30 shadow-[inset_0_0_30px_rgba(255,30,56,0.3)]" />

        {/* Top HUD Telemetry Bar */}
        <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between text-[11px] font-mono text-neutral-300 bg-[#08080d]/80 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-ping" />
            <span className="text-[#ff4d6d] font-bold">IDENTITY: AUTHENTIC</span>
          </div>
          <span className="text-neutral-400">DEV_ID // SK-2026</span>
        </div>

        {/* THE REAL UPLOADED PORTRAIT (100% natural, unwarped, original face & identity preserved) */}
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <img
            src="/assets/sravan-portrait.png"
            alt="Sravan Kumar Naredla - Frontend Developer"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter drop-shadow-[0_10px_25px_rgba(255,30,56,0.3)]"
            loading="eager"
          />

          {/* Smooth Dark Gradient Mask at bottom to blend into deep black background */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#040407] via-[#040407]/80 to-transparent pointer-events-none z-20" />

          {/* Side Crimson Volumetric Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff1e38]/10 via-transparent to-[#ff1e38]/10 pointer-events-none z-20" />
        </div>

        {/* Bottom Hero Card Details Overlay */}
        <div className="absolute bottom-4 inset-x-4 z-30 space-y-1.5 p-4 rounded-2xl bg-[#07080d]/90 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#ff4d6d] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff1e38]" />
              PRIMARY HUMAN VISUAL
            </span>
            <span className="text-[10px] font-mono text-neutral-400">HYDERABAD, IN</span>
          </div>

          <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide">
            SRAVAN KUMAR NAREDLA
          </h3>

          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs font-mono">
            <span className="text-neutral-300">FRONTEND ARCHITECT</span>
            <span className="text-[#ff1e38] font-bold group-hover:text-glow transition-all">
              REACT.JS &bull; TS
            </span>
          </div>
        </div>

        {/* Cybernetic Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ff1e38] pointer-events-none z-30" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ff1e38] pointer-events-none z-30" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ff1e38] pointer-events-none z-30" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ff1e38] pointer-events-none z-30" />
      </div>
    </div>
  );
};

