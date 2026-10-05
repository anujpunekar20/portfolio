"use client";

import { useEffect, useState } from "react";
import { Button } from "@anuj20/void-ui";
import Image from "next/image";
import { scrollToSection } from "@/lib/scroll";
import { HeroGrid } from "./HeroGrid";
import styles from "./Hero.module.css";

// The first line types out on load (and is what crawlers see); the rest appear on roll.
const taglines = [
  "Full-stack dev who owns the backend: Go and gRPC in production.",
  "Your go-to full-stack dev with a knack for video games.",
  "Builds the boring parts so the shiny parts work.",
  "Turns vague tickets into shipped features.",
  "Happiest somewhere between the database and the button.",
  "Writes code the next person can actually read.",
  "Ships end to end, then sweats the details.",
];

// Reserves the tagline's height, so typing never pushes the buttons down.
const longestTagline = taglines.reduce((longest, line) =>
  line.length > longest.length ? line : longest,
);

// Index of the tagline to roll in next, given the one currently showing.
function pickNextTagline(currentIndex: number, count: number): number {
  // draw from one slot fewer than count, then skip over the current line's slot
  const nextIndex = Math.floor(Math.random() * (count - 1));
  return nextIndex >= currentIndex ? nextIndex + 1 : nextIndex;
}

// Holds the typing state, so each typed character re-renders only the tagline, not the whole hero.
function HeroTagline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // the line queued to type once the current one is backspaced; null when not rolling
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [typedLength, setTypedLength] = useState(0);
  const line = taglines[currentIndex];

  // One character per tick: backspace fast, then type. Reduced motion jumps straight to the end.
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let step: () => void;
    let delay: number;
    if (nextIndex !== null) {
      delay = 8;
      step =
        typedLength > 0 && !reducedMotion
          ? () => setTypedLength(typedLength - 1)
          : () => {
              setCurrentIndex(nextIndex);
              setNextIndex(null);
              setTypedLength(reducedMotion ? taglines[nextIndex].length : 0);
            };
    } else if (typedLength < line.length) {
      delay = 15;
      step = () =>
        setTypedLength(reducedMotion ? line.length : typedLength + 1);
    } else {
      return;
    }
    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [nextIndex, typedLength, line]);

  const roll = () => {
    // mid-backspace: ignore; mid-typing: finish the line now instead of making the visitor wait
    if (nextIndex !== null) return;
    if (typedLength < line.length) {
      setTypedLength(line.length);
      return;
    }
    setNextIndex(pickNextTagline(currentIndex, taglines.length));
  };

  // hover rolls it with a mouse, tap rolls it on touch
  return (
    <p
      className={styles.tagline}
      onPointerEnter={(event) => event.pointerType === "mouse" && roll()}
      onClick={roll}
    >
      <span className={styles.screenReaderOnly}>{line}</span>
      <span className={styles.reserve} aria-hidden>
        {longestTagline}
      </span>
      <span className={styles.typed} aria-hidden>
        {line.slice(0, typedLength)}
        {/* solid while typing, then blinks a few times and stops (WCAG 2.2.2) */}
        <span
          className={`${styles.cursor} ${typedLength === line.length && nextIndex === null ? styles.blinking : ""}`}
        >
          _
        </span>
      </span>
    </p>
  );
}

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <HeroGrid />
      <div className={styles.content}>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes -- literal copy, not a stray comment */}
        <div className={styles.eyebrow}>// PORTFOLIO</div>
        {/* title-screen scale: each word on its own line, sized to fill the column */}
        <h1 className={styles.heading}>
          <span>Anuj</span> <span>Punekar</span>
        </h1>
        <HeroTagline />
        <div className={styles.player}>
          <Image
            src="/anuj-punekar.jpeg"
            alt="Anuj Punekar"
            width={144}
            height={144}
            priority
            className={styles.photo}
          />
          <dl className={styles.stats}>
            <div className={styles.statRow}>
              <dt>CLASS</dt>
              <dd>Full-stack, backend-first</dd>
            </div>
            <div className={styles.statRow}>
              <dt>MAIN</dt>
              <dd>Go&nbsp;· gRPC&nbsp;· React&nbsp;· Svelte</dd>
            </div>
            <div className={styles.statRow}>
              <dt>HI-SCORE</dt>
              <dd>
                Go credential API: <span className={styles.lit}>10,000+</span>{" "}
                issued, <span className={styles.lit}>450+</span> users
              </dd>
            </div>
          </dl>
        </div>
        <div className={styles.actions}>
          <Button
            href="#projects"
            onClick={(event) => scrollToSection(event, "projects")}
            variant="solid"
            size="lg"
          >
            View Projects
          </Button>
          <Button
            href="mailto:anujkakarot@gmail.com"
            variant="outline"
            size="lg"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
