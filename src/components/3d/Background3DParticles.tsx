import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

interface LightStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  width: number;
}

export const Background3DParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 45 : 110;
    const streakCount = isMobile ? 3 : 7;

    const particles: Particle[] = [];
    const colors = ['#ff1e38', '#ff4d6d', '#ffffff', '#e50914', '#ffa0ac'];

    for (let i = 0; i < particleCount; i++) {
      const isRed = Math.random() > 0.35;
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 + 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: -0.6 - Math.random() * 0.8,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        baseAlpha: Math.random() * 0.7 + 0.2,
        color: isRed ? (Math.random() > 0.5 ? '#ff1e38' : '#ff4d6d') : '#ffffff',
      });
    }

    const streaks: LightStreak[] = [];
    for (let i = 0; i < streakCount; i++) {
      streaks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 200 + 100,
        speed: Math.random() * 1.5 + 0.6,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.25 + 0.08,
        width: Math.random() * 1.5 + 0.5,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const fov = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;

      // Draw subtle light streaks
      for (const streak of streaks) {
        streak.x += Math.cos(streak.angle) * streak.speed;
        streak.y += Math.sin(streak.angle) * streak.speed;

        if (streak.x > width + 200 || streak.y > height + 200) {
          streak.x = Math.random() * width * 0.5 - 100;
          streak.y = -100;
        }

        const grad = ctx.createLinearGradient(
          streak.x,
          streak.y,
          streak.x - Math.cos(streak.angle) * streak.length,
          streak.y - Math.sin(streak.angle) * streak.length
        );
        grad.addColorStop(0, `rgba(255, 30, 56, ${streak.alpha})`);
        grad.addColorStop(1, 'rgba(255, 30, 56, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = streak.width;
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(
          streak.x - Math.cos(streak.angle) * streak.length,
          streak.y - Math.sin(streak.angle) * streak.length
        );
        ctx.stroke();
      }

      // Draw 3D projected particles
      for (const p of particles) {
        p.z += p.vz;
        p.x += p.vx;
        p.y += p.vy;

        if (p.z <= 10) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        const scale = fov / (fov + p.z);
        const x2d = cx + p.x * scale;
        const y2d = cy + p.y * scale;

        if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
          const depthAlpha = Math.min(1, Math.max(0.1, (1000 - p.z) / 900)) * p.baseAlpha;
          const currentSize = Math.max(0.6, p.size * scale * 2.2);

          ctx.beginPath();
          ctx.arc(x2d, y2d, currentSize, 0, Math.PI * 2);

          if (p.color === '#ffffff') {
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(255, 30, 56, ${depthAlpha})`;
            // Soft halo for red particles
            if (scale > 0.4) {
              ctx.shadowColor = '#ff1e38';
              ctx.shadowBlur = 8 * scale;
            }
          }
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
};

