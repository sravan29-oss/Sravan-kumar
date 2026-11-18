import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroCanvas3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
    } catch {
      setIsWebGLSupported(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D core components
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Glowing Icosahedron (The "Matrix Core")
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x140205,
      emissive: 0xff1e38,
      emissiveIntensity: 0.45,
      wireframe: true,
      wireframeLinewidth: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 1b. Solid Glowing Core Center
    const centerCoreGeo = new THREE.OctahedronGeometry(0.7, 0);
    const centerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xff1e38,
      emissive: 0xff1e38,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const centerCore = new THREE.Mesh(centerCoreGeo, centerCoreMat);
    coreGroup.add(centerCore);

    // 2. Middle Outer Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(1.8, 0.22, 100, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a24,
      emissive: 0x3d060c,
      roughness: 0.3,
      metalness: 0.85,
      wireframe: true,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    coreGroup.add(knotMesh);

    // 3. Orbiting Data Ring 1
    const ringGeo1 = new THREE.RingGeometry(2.6, 2.65, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff1e38,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh1);

    // 4. Orbiting Data Ring 2 (Dashed/Dotted Tech Ring)
    const ringGeo2 = new THREE.RingGeometry(3.1, 3.14, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff4d6d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 6;
    coreGroup.add(ringMesh2);

    // 5. Orbiting Tech Satellite Spheres
    const satellites: THREE.Mesh[] = [];
    const satCount = 4;
    for (let i = 0; i < satCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xff1e38 });
      const sat = new THREE.Mesh(satGeo, satMat);
      coreGroup.add(sat);
      satellites.push(sat);
    }

    // 6. Floating Ambient Red Dust Particles in 3D Volume
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      // Crimson / Neon Red / White color mix
      if (Math.random() > 0.3) {
        particleColors[i] = 1.0; // R
        particleColors[i + 1] = 0.12; // G
        particleColors[i + 2] = 0.22; // B
      } else {
        particleColors[i] = 0.9;
        particleColors[i + 1] = 0.9;
        particleColors[i + 2] = 0.95;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a0508, 1.8);
    scene.add(ambientLight);

    const redPointLight = new THREE.PointLight(0xff1e38, 4.5, 20);
    redPointLight.position.set(2, 3, 4);
    scene.add(redPointLight);

    const crimsonRimLight = new THREE.PointLight(0xbe123c, 3, 15);
    crimsonRimLight.position.set(-3, -2, -2);
    scene.add(crimsonRimLight);

    const topWhiteRim = new THREE.PointLight(0xffffff, 1.2, 15);
    topWhiteRim.position.set(0, 5, 2);
    scene.add(topWhiteRim);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetRotationY = (x / rect.width) * 0.8;
      targetRotationX = (y / rect.height) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
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
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      coreGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.4) * 0.1;
      coreGroup.rotation.y = currentRotationY + elapsedTime * 0.25;

      // Independent rotations
      innerMesh.rotation.y = -elapsedTime * 0.5;
      innerMesh.rotation.z = elapsedTime * 0.3;

      centerCore.rotation.x = elapsedTime * 0.7;
      centerCore.rotation.y = elapsedTime * 0.9;

      knotMesh.rotation.z = -elapsedTime * 0.15;
      knotMesh.rotation.x = elapsedTime * 0.1;

      ringMesh1.rotation.z = elapsedTime * 0.35;
      ringMesh2.rotation.z = -elapsedTime * 0.25;

      // Orbiting satellites
      satellites.forEach((sat, idx) => {
        const angle = elapsedTime * 1.2 + (idx * (Math.PI * 2)) / satCount;
        const radius = 2.65;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.y = Math.sin(angle) * Math.sin(angle * 0.5) * 0.8;
        sat.position.z = Math.sin(angle) * radius;
      });

      // Slowly rotate particle field
      particleField.rotation.y = -elapsedTime * 0.03;
      particleField.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

      // Pulsing light intensity
      redPointLight.intensity = 4.2 + Math.sin(elapsedTime * 2.5) * 1.2;

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
      innerGeo.dispose();
      knotGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeometry.dispose();
    };
  }, []);

  if (!isWebGLSupported) {
    return (
      <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
        {/* CSS 3D Abstract Fallback */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#ff1e38]/50 animate-ping opacity-25" />
          <div className="absolute w-52 h-52 rounded-full border border-[#ff1e38] shadow-[0_0_30px_#ff1e38] animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute w-40 h-40 rounded-full border-2 border-dashed border-[#ff4d6d]/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '14s' }} />
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#160509] to-[#3a0812] border-2 border-[#ff1e38] shadow-[0_0_40px_rgba(255,30,56,0.6)] flex items-center justify-center transform rotate-45 animate-pulse">
            <span className="text-white font-mono text-xs font-bold -rotate-45 tracking-widest text-glow">DEV_CORE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] md:h-[580px] lg:h-[620px] flex items-center justify-center select-none">
      {/* HUD Holographic Target Overlays */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Outer Circular Reticle */}
        <div className="w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full border border-[#ff1e38]/15 animate-spin" style={{ animationDuration: '30s' }} />
        {/* Dashed Secondary Reticle */}
        <div className="absolute w-[290px] h-[290px] md:w-[390px] md:h-[390px] rounded-full border border-dashed border-[#ff1e38]/25 animate-spin" style={{ animationDuration: '22s', animationDirection: 'reverse' }} />
        {/* Core Glow Radial */}
        <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-[#ff1e38]/10 via-[#880816]/10 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Cybernetic Status Metadata in 3D frame */}
      <div className="absolute bottom-4 left-6 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#070709]/80 border border-[#ff1e38]/25 backdrop-blur-md font-mono text-[11px] text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-ping" />
        <span className="text-[#ff4d6d]">CORE_SYS:</span>
        <span>ONLINE // 60FPS</span>
      </div>

      <div className="absolute top-4 right-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070709]/80 border border-[#ff1e38]/25 backdrop-blur-md font-mono text-[11px] text-neutral-400">
        <span className="text-[#ff1e38]">&#9650;</span>
        <span>WEBGL 3D MATRIX</span>
      </div>

      {/* Main Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};

