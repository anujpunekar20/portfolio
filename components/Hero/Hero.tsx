"use client";

import { Button } from "@anuj20/void-ui";
import Image from "next/image";
import { scrollToSection } from "@/lib/scroll";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes -- literal copy, not a stray comment */}
        <div className={styles.eyebrow}>// PORTFOLIO</div>
        <h1 className={styles.heading}>Hi, I&apos;m Anuj Punekar</h1>
        <p className={styles.tagline}>
          Your go-to full-stack dev with a knack for video games.
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
