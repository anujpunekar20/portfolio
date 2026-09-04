"use client";

import { Button } from "@anuj20/void-ui";
import sectionStyles from "../Section.module.css";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>04 / CONTACT</div>
      <h2 className={sectionStyles.heading}>Let&apos;s build something.</h2>
      <p className={styles.intro}>
        Open to full-time roles and interesting freelance work. Reach out any of
        these ways.
      </p>
      <div className={styles.actions}>
        <a href="mailto:anujkakarot@gmail.com">
          <Button variant="solid" size="lg">
            anujkakarot@gmail.com
          </Button>
        </a>
        <a
          href="https://www.linkedin.com/in/anuj-punekar"
          target="_blank"
          rel="noopener"
        >
          <Button variant="outline" size="lg">
            LinkedIn
          </Button>
        </a>
        <a
          href="https://github.com/anujpunekar20"
          target="_blank"
          rel="noopener"
        >
          <Button variant="outline" size="lg">
            GitHub
          </Button>
        </a>
      </div>
    </section>
  );
}
