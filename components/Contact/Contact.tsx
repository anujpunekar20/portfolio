"use client";

import { Tooltip } from "@anuj20/void-ui";
import { GithubIcon, LinkedinIcon, MailIcon } from "../Icons";
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
        <Tooltip
          label="Email"
          trigger={
            <a
              href="mailto:anujkakarot@gmail.com"
              aria-label="Email"
              className={styles.iconChip}
            >
              <MailIcon />
            </a>
          }
        />
        <Tooltip
          label="LinkedIn"
          trigger={
            <a
              href="https://www.linkedin.com/in/anuj-punekar"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className={styles.iconChip}
            >
              <LinkedinIcon />
            </a>
          }
        />
        <Tooltip
          label="GitHub"
          trigger={
            <a
              href="https://github.com/anujpunekar20"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className={styles.iconChip}
            >
              <GithubIcon />
            </a>
          }
        />
      </div>
    </section>
  );
}
