"use client";

import { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const COLS = Math.ceil(canvas.width / 60) + 1;
      const ROWS = Math.ceil(canvas.height / 60) + 1;
      const SPACING = 60;

      // Draw animated grid lines
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let i = 0; i < COLS; i++) {
        const x = i * SPACING;
        const wave = Math.sin(t * 0.6 + i * 0.4) * 6;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(167,139,250,${0.04 + Math.abs(Math.sin(t * 0.3 + i * 0.5)) * 0.04})`;
        ctx.moveTo(x, 0);
        ctx.lineTo(x + wave, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let j = 0; j < ROWS; j++) {
        const y = j * SPACING;
        const wave = Math.sin(t * 0.5 + j * 0.4) * 6;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(167,139,250,${0.04 + Math.abs(Math.sin(t * 0.3 + j * 0.5)) * 0.04})`;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y + wave);
        ctx.stroke();
      }

      // Glowing intersection dots
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const x = i * SPACING;
          const y = j * SPACING;
          const pulse = Math.sin(t * 1.2 + i * 0.7 + j * 0.5);
          const opacity = 0.06 + pulse * 0.06;
          if (opacity > 0.07) {
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167,139,250,${opacity})`;
            ctx.fill();
          }
        }
      }

      // Floating glow orbs that drift slowly
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 180 },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 140 },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 120 },
      ];

      for (const orb of orbs) {
        const ox = orb.x + Math.sin(t * 0.2) * 30;
        const oy = orb.y + Math.cos(t * 0.15) * 20;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        grad.addColorStop(0, "rgba(167,139,250,0.05)");
        grad.addColorStop(1, "rgba(167,139,250,0)");
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      t += 0.012;
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
