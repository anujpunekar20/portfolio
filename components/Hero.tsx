"use client";

import { Button } from "@anuj20/void-ui";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.eyebrow}>// PORTFOLIO</div>
      <h1 className={styles.heading}>Hi, I&apos;m Anuj Punekar</h1>
      <p className={styles.tagline}>
        Your go-to full-stack dev with a knack for video games.
      </p>
      <div className={styles.actions}>
        <a href="#projects">
          <Button variant="solid" size="lg">
            View Projects
          </Button>
        </a>
        <a href="mailto:anujkakarot@gmail.com">
          <Button variant="outline" size="lg">
            Get In Touch
          </Button>
        </a>
      </div>
    </section>
  );
}
