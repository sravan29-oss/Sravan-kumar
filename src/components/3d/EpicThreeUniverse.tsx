import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface EpicThreeUniverseProps {
  timelineProgress: number; // 0 to 12 seconds
  onReady?: () => void;
}

export const EpicThreeUniverse: React.FC<EpicThreeUniverseProps> = ({ timelineProgress, onReady }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const pillarsGroupRef = useRef<THREE.Group | null>(null);
  const embersRef = useRef<THREE.Points | null>(null);
  const redLightRef = useRef<THREE.PointLight | null>(null);
  const goldLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020204, 0.05);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 24); // Start far back in darkness
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. Colossal Monolithic Temple-Style Pillars (Epic Indian Varanasi Architecture)
    const pillarsGroup = new THREE.Group();
    pillarsGroupRef.current = pillarsGroup;
    scene.add(pillarsGroup);

    const pillarGeo = new THREE.BoxGeometry(1.6, 18, 1.6);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x09090e,
      roughness: 0.35,
      metalness: 0.85,
    });
    const runeMat = new THREE.MeshBasicMaterial({
      color: 0xff1e38,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });

    // 8 Towering pillars flanking the majestic path
    const pillarPositions = [
      [-6, 0, 12], [6, 0, 12],
      [-7, 0, 6],  [7, 0, 6],
      [-8, 0, 0],  [8, 0, 0],
      [-9, 0, -6], [9, 0, -6],
    ];

    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, y + 4, z);

      // Engraved glowing crimson rune lattice
      const runeLattice = new THREE.Mesh(pillarGeo, runeMat);
      runeLattice.scale.set(1.02, 1.01, 1.02);
      pillar.add(runeLattice);

      pillarsGroup.add(pillar);
    });

    // 3. Central Monumental 3D Yantra / Cosmic Rings & Centerpiece
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, -4);
    coreGroupRef.current = coreGroup;
    scene.add(coreGroup);

    // Center faceted dodecahedron core
    const coreGeo = new THREE.DodecahedronGeometry(3.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x060609,
      roughness: 0.2,
      metalness: 0.95,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Glowing Crimson Wireframe Shell
    const wireGeo = new THREE.DodecahedronGeometry(3.26, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff1e38,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Astronomical Concentric Rings (Gold and Crimson)
    const ringRadii = [4.5, 5.6, 6.8, 8.2];
    const ringColors = [0xff1e38, 0xffb703, 0xff4d6d, 0xd90429];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.05, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[i],
        emissive: ringColors[i],
        emissiveIntensity: 0.8,
        metalness: 0.9,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3 + (i * Math.PI) / 8;
      ring.rotation.y = (i * Math.PI) / 6;
      coreGroup.add(ring);
    });

    // 4. Floating Embers & Cosmic Dust Particles
    const emberCount = 350;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount * 3; i += 3) {
      emberPositions[i] = (Math.random() - 0.5) * 28;
      emberPositions[i + 1] = (Math.random() - 0.5) * 20;
      emberPositions[i + 2] = (Math.random() - 0.5) * 35;

      // Crimson & Gold Embers
      if (Math.random() > 0.35) {
        emberColors[i] = 1.0; // R
        emberColors[i + 1] = 0.12; // G
        emberColors[i + 2] = 0.22; // B
      } else {
        emberColors[i] = 1.0; // R
        emberColors[i + 1] = 0.82; // G (Gold)
        emberColors[i + 2] = 0.2; // B
      }
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    emberGeo.setAttribute('color', new THREE.BufferAttribute(emberColors, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    embersRef.current = embers;
    scene.add(embers);

    // 5. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x0a0508, 0.6);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xff1e38, 0, 45); // Ignites during timeline
    redLight.position.set(0, 2, -2);
    redLightRef.current = redLight;
    scene.add(redLight);

    const goldLight = new THREE.PointLight(0xffb703, 0, 30);
    goldLight.position.set(0, -2, 5);
    goldLightRef.current = goldLight;
    scene.add(goldLight);

    const topSpot = new THREE.SpotLight(0xffffff, 0, 50, Math.PI / 6, 0.4);
    topSpot.position.set(0, 15, 10);
    scene.add(topSpot);

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous rotation of central structure
      if (coreGroupRef.current) {
        coreGroupRef.current.rotation.y = elapsed * 0.18;
        coreGroupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.08;
      }

      // Embers floating upward
      if (embersRef.current) {
        embersRef.current.rotation.y = elapsed * 0.02;
        embersRef.current.position.y = Math.sin(elapsed * 0.5) * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();
    if (onReady) onReady();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pillarGeo.dispose();
      pillarMat.dispose();
      runeMat.dispose();
      coreGeo.dispose();
      wireGeo.dispose();
      emberGeo.dispose();
    };
  }, []);

  // Update Camera & Lighting based on timelineProgress (0 to 12s)
  useEffect(() => {
    const cam = cameraRef.current;
    const redLight = redLightRef.current;
    const goldLight = goldLightRef.current;
    if (!cam) return;

    const t = timelineProgress;

    // 0 to 2s: Darkness & mystery
    if (t <= 2) {
      cam.position.z = 24 - (t / 2) * 2; // 24 -> 22
      cam.position.y = 1.5;
      if (redLight) redLight.intensity = (t / 2) * 1.5;
      if (goldLight) goldLight.intensity = (t / 2) * 0.5;
    }
    // 2 to 4s: The World Awakens (camera sweeps through towering pillars)
    else if (t <= 4) {
      const p = (t - 2) / 2;
      cam.position.z = 22 - p * 8; // 22 -> 14
      cam.position.y = 1.5 + Math.sin(p * Math.PI) * 0.8;
      if (redLight) redLight.intensity = 1.5 + p * 4;
      if (goldLight) goldLight.intensity = 0.5 + p * 2.5;
    }
    // 4 to 6s: The Energy Awakens (camera pushes close to central cosmic structure)
    else if (t <= 6) {
      const p = (t - 4) / 2;
      cam.position.z = 14 - p * 6; // 14 -> 8
      cam.position.y = 1.5 - p * 0.5;
      if (redLight) redLight.intensity = 5.5 + Math.sin(p * Math.PI * 4) * 2.5;
      if (goldLight) goldLight.intensity = 3 + p * 2;
    }
    // 6 to 8s: Portrait Reveal (camera holds dramatic focal distance)
    else if (t <= 8) {
      const p = (t - 6) / 2;
      cam.position.z = 8 - p * 1.5; // 8 -> 6.5
      cam.position.y = 1.0;
      if (redLight) redLight.intensity = 8;
      if (goldLight) goldLight.intensity = 4.5;
    }
    // 8 to 10s: Title Card Climax (slow dramatic pull back)
    else if (t <= 10) {
      const p = (t - 8) / 2;
      cam.position.z = 6.5 + p * 2; // 6.5 -> 8.5
      cam.position.y = 1.0 + p * 0.5;
      if (redLight) redLight.intensity = 8 - p * 2;
    }
    // 10 to 12s: Seamless transition to normal hero position
    else {
      const p = Math.min(1, (t - 10) / 2);
      cam.position.z = 8.5 - p * 0.5;
      cam.position.y = 1.5;
    }
  }, [timelineProgress]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />;
};

