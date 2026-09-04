"use client";

import { Badge } from "@anuj20/void-ui";
import { skills } from "@/lib/data";
import sectionStyles from "../Section.module.css";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>01 / ABOUT</div>
      <h2 className={sectionStyles.heading}>
        Full-stack developer, systems-minded.
      </h2>
      <p className={styles.bio}>
        I build backend services and frontend interfaces across whatever
        stack the problem calls for — Go APIs, Svelte wizards, React
        libraries. Off the clock: probably making a video game.
      </p>
      <div className={styles.skills}>
        {skills.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  );
}
