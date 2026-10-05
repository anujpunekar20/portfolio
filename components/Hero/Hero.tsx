"use client";

import { useState } from "react";
import { Button } from "@anuj20/void-ui";
import Image from "next/image";
import { scrollToSection } from "@/lib/scroll";
import styles from "./Hero.module.css";

// The first line renders on load (and for crawlers); the rest appear on roll.
const taglines = [
  "Full-stack dev who owns the backend: Go and gRPC APIs in production.",
  "Your go-to full-stack dev with a knack for video games.",
  "Builds the boring parts so the shiny parts work.",
  "Turns vague tickets into shipped features.",
  "Happiest somewhere between the database and the button.",
  "Writes code the next person can actually read.",
  "Ships end to end, then sweats the details.",
];

// Index of the tagline to roll in next, given the one currently showing.
function pickNextTagline(currentIndex: number, count: number): number {
  // draw from one slot fewer than count, then skip over the current line's slot
  const nextIndex = Math.floor(Math.random() * (count - 1));
  return nextIndex >= currentIndex ? nextIndex + 1 : nextIndex;
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // the line rolling out; null when no roll is in progress
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);

  const roll = () => {
    if (outgoingIndex !== null) return;
    setOutgoingIndex(currentIndex);
    setCurrentIndex(pickNextTagline(currentIndex, taglines.length));
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes -- literal copy, not a stray comment */}
        <div className={styles.eyebrow}>// PORTFOLIO</div>
        <h1 className={styles.heading}>Hi, I&apos;m Anuj Punekar</h1>
        {/* hover rolls it with a mouse, tap rolls it on touch */}
        <p
          className={styles.tagline}
          onPointerEnter={(event) => event.pointerType === "mouse" && roll()}
          onClick={roll}
        >
          {outgoingIndex !== null && (
            <span
              key={`out-${outgoingIndex}`}
              className={styles.rollOut}
              aria-hidden
              onAnimationEnd={() => setOutgoingIndex(null)}
            >
              {taglines[outgoingIndex]}
            </span>
          )}
          <span
            key={currentIndex}
            className={outgoingIndex !== null ? styles.rollIn : undefined}
          >
            {taglines[currentIndex]}
          </span>
        </p>
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

      <Image
        src="/anuj-punekar.jpeg"
        alt="Anuj Punekar"
        width={280}
        height={280}
        priority
        className={styles.photo}
      />
    </section>
  );
}
