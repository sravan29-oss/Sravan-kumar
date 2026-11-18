import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AboutHoloVisual: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Silicon Processor Base
    const chipGeo = new THREE.BoxGeometry(2.4, 0.25, 2.4);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      roughness: 0.2,
      metalness: 0.85,
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    group.add(chipMesh);

    // 1b. Glowing Core Circuit Die on top of chip
    const dieGeo = new THREE.BoxGeometry(1.2, 0.35, 1.2);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x180306,
      emissive: 0xff1e38,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.9,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.y = 0.1;
    group.add(dieMesh);

    // 2. Surrounding Connector Pins (Gold/Crimson Pins)
    const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0xff4d6d });
    for (let i = -1; i <= 1; i += 0.4) {
      // Along X edges
      const pin1 = new THREE.Mesh(pinGeo, pinMat);
      pin1.position.set(i, -0.15, 1.25);
      pin1.rotation.x = Math.PI / 2;
      group.add(pin1);

      const pin2 = new THREE.Mesh(pinGeo, pinMat);
      pin2.position.set(i, -0.15, -1.25);
      pin2.rotation.x = Math.PI / 2;
      group.add(pin2);

      // Along Z edges
      const pin3 = new THREE.Mesh(pinGeo, pinMat);
      pin3.position.set(1.25, -0.15, i);
      pin3.rotation.z = Math.PI / 2;
      group.add(pin3);

      const pin4 = new THREE.Mesh(pinGeo, pinMat);
      pin4.position.set(-1.25, -0.15, i);
      pin4.rotation.z = Math.PI / 2;
      group.add(pin4);
    }

    // 3. Floating Holographic Data Cubes (representing React Components / Architecture)
    const nodes: { mesh: THREE.Mesh; angle: number; speed: number; yOffset: number }[] = [];
    const nodeCount = 5;
    const colors = [0xff1e38, 0xff4d6d, 0xffffff, 0xe11d48, 0xff7185];

    for (let i = 0; i < nodeCount; i++) {
      const size = 0.28 + Math.random() * 0.15;
      const nodeGeo = new THREE.BoxGeometry(size, size, size);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x08080c,
        emissive: colors[i],
        emissiveIntensity: 0.6,
        wireframe: true,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      group.add(nodeMesh);

      nodes.push({
        mesh: nodeMesh,
        angle: (i * Math.PI * 2) / nodeCount,
        speed: 0.4 + Math.random() * 0.3,
        yOffset: 0.8 + Math.random() * 0.8,
      });
    }

    // 4. Subtle Wireframe Dome
    const domeGeo = new THREE.SphereGeometry(2.8, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0xff1e38,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    group.add(domeMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff1e38, 4, 15);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0xbe123c, 2.5, 10);
    backLight.position.set(-2, -1, -3);
    scene.add(backLight);

    // Mouse Interaction
    let targetRotationX = 0.4;
    let targetRotationY = 0;
    let currentRotationX = 0.4;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.6;
      targetRotationX = 0.4 + y * 0.4;
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

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      group.rotation.x = currentRotationX;
      group.rotation.y = currentRotationY + time * 0.2;

      // Animate floating nodes
      nodes.forEach((node) => {
        const curAngle = node.angle + time * node.speed;
        const radius = 1.6;
        node.mesh.position.x = Math.cos(curAngle) * radius;
        node.mesh.position.z = Math.sin(curAngle) * radius;
        node.mesh.position.y = node.yOffset + Math.sin(time * 2 + curAngle) * 0.2;
        node.mesh.rotation.x = time * 0.8;
        node.mesh.rotation.y = time * 0.6;
      });

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
      chipGeo.dispose();
      dieGeo.dispose();
      pinGeo.dispose();
      domeGeo.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[460px] rounded-2xl overflow-hidden glass-card border border-[#ff1e38]/25 p-4 flex flex-col justify-between">
      {/* Reticle & Tech Labels */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff1e38] animate-ping" />
          <span className="text-[#ff4d6d]">REACT_ENGINE_CORE</span>
        </div>
        <span className="text-neutral-500">v18.3.1 // TS-ES6+</span>
      </div>

      {/* 3D Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Cyber Grid Base Glow */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#ff1e38]/10 to-transparent pointer-events-none z-10" />

      {/* Footer Info HUD */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-neutral-400 pt-2 border-t border-white/5">
        <span>ARCH: COMPONENT_SYSTEM</span>
        <span className="text-[#ff1e38] font-semibold">STATUS: OPTIMAL</span>
      </div>
    </div>
  );
};

