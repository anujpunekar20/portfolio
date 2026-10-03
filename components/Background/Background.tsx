"use client";

import { useEffect, useRef } from "react";
import { SECTION_SHAPES } from "@/lib/shapes";
import { useActiveSection } from "@/lib/useActiveSection";
import styles from "./Background.module.css";

type Particle = { x: number; y: number; ease: number };

// A cloud of small squares that assembles into a large PlayStation-style
// outline for the section in view, rotating slowly and morphing between shapes.
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Particles and rotation live in refs so a section change only swaps the
  // targets; the cloud keeps its positions and drifts into the new shape.
  const particlesRef = useRef<Particle[]>([]);
  const angleRef = useRef(0);
  const activeSection = useActiveSection();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color = getComputedStyle(canvas)
      .getPropertyValue("--void-accent")
      .trim();
    if (particlesRef.current.length === 0) {
      const particleCount = innerWidth < 768 ? 250 : 500;
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        ease: 0.02 + Math.random() * 0.04,
      }));
    }
    const particles = particlesRef.current;
    const shape = SECTION_SHAPES[activeSection](particles.length);
    let frame = 0;

    function resize() {
      if (!canvas || !context) return;
      const pixelRatio = Math.min(devicePixelRatio, 2);
      canvas.width = innerWidth * pixelRatio;
      canvas.height = innerHeight * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function draw() {
      if (!context) return;
      const radius = Math.min(innerWidth, innerHeight) * 0.35;
      const cos = Math.cos(angleRef.current);
      const sin = Math.sin(angleRef.current);
      context.clearRect(0, 0, innerWidth, innerHeight);
      context.fillStyle = color;
      particles.forEach((particle, i) => {
        const point = shape[i];
        const targetX =
          innerWidth / 2 + (point.x * cos - point.y * sin) * radius;
        const targetY =
          innerHeight / 2 + (point.x * sin + point.y * cos) * radius;
        const ease = reduceMotion ? 1 : particle.ease;
        particle.x += (targetX - particle.x) * ease;
        particle.y += (targetY - particle.y) * ease;
        context.fillRect(particle.x, particle.y, 2, 2);
      });
    }

    // ponytail: no visibilitychange handling, browsers already pause rAF in hidden tabs.
    function animate() {
      angleRef.current += 0.002;
      draw();
      frame = requestAnimationFrame(animate);
    }

    function handleResize() {
      resize();
      draw();
    }

    resize();
    if (reduceMotion) draw();
    else animate();
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSection]);

  return (
    <canvas ref={canvasRef} className={styles.background} aria-hidden="true" />
  );
}
