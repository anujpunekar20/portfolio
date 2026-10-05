"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroGrid.module.css";

// A blueprint grid behind the hero: a violet cell glides to whichever cell is under the cursor (the glide
// is a CSS transition on --cell-x/--cell-y), and a debug HUD in the corners reads out the pointer.
// Mouse and trackpad only; purely decorative, so it's hidden from screen readers.
export function HeroGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const positionReadout = useRef<HTMLSpanElement>(null);
  const frameReadout = useRef<HTMLSpanElement>(null);
  const speedReadout = useRef<HTMLSpanElement>(null);
  const cellReadout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const section = grid?.closest("section");
    if (!grid || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    // cells are 4rem, so follow the root font size rather than assuming 16px
    const cellSize =
      4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    let pointerX = 0;
    let pointerY = 0;
    let lastFrameX = 0;
    let lastFrameY = 0;
    let lastFrameTime = 0;
    let frameId = 0;

    const track = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      const column = Math.floor(pointerX / cellSize);
      const row = Math.floor(pointerY / cellSize);
      section.style.setProperty("--cell-x", String(column));
      section.style.setProperty("--cell-y", String(row));
      // -1..1 from the hero's center, for the player card's parallax
      section.style.setProperty(
        "--pointer-x",
        ((pointerX / bounds.width) * 2 - 1).toFixed(3),
      );
      section.style.setProperty(
        "--pointer-y",
        ((pointerY / bounds.height) * 2 - 1).toFixed(3),
      );
      positionReadout.current!.textContent = `x:${Math.round(pointerX)}, y:${Math.round(pointerY)}`;
      cellReadout.current!.textContent = `cell:${column},${row}`;
    };

    // frame timing and pointer speed (px per frame), only while the pointer is in the hero
    const readFrame = (time: number) => {
      if (lastFrameTime) {
        const frameMs = time - lastFrameTime;
        frameReadout.current!.textContent = `fps: ${Math.round(1000 / frameMs)} | ms: ${frameMs.toFixed(1)}`;
        speedReadout.current!.textContent = `v:${Math.hypot(pointerX - lastFrameX, pointerY - lastFrameY).toFixed(1)}`;
      }
      lastFrameTime = time;
      lastFrameX = pointerX;
      lastFrameY = pointerY;
      frameId = requestAnimationFrame(readFrame);
    };

    const enter = (event: PointerEvent) => {
      track(event);
      lastFrameTime = 0;
      grid.classList.add(styles.tracking);
      frameId = requestAnimationFrame(readFrame);
    };

    const leave = () => {
      cancelAnimationFrame(frameId);
      grid.classList.remove(styles.tracking);
      for (const property of [
        "--cell-x",
        "--cell-y",
        "--pointer-x",
        "--pointer-y",
      ]) {
        section.style.removeProperty(property);
      }
    };

    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointermove", track);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointermove", track);
      section.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={gridRef} className={styles.grid} aria-hidden>
      <div className={styles.cell} />
      <div className={`${styles.hud} ${styles.topLeft}`}>
        <span ref={positionReadout}>x:0, y:0</span>
        <span ref={frameReadout}>fps: 0 | ms: 0</span>
      </div>
      <span ref={speedReadout} className={`${styles.hud} ${styles.topRight}`}>
        v:0.0
      </span>
      <span ref={cellReadout} className={`${styles.hud} ${styles.bottomLeft}`}>
        cell:0,0
      </span>
    </div>
  );
}
