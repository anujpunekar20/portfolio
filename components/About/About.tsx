"use client";

import { skillGroups } from "@/lib/data";
import { SkillChip } from "../SkillChip/SkillChip";
import sectionStyles from "../Section.module.css";
import styles from "./About.module.css";

const games = [
  {
    label: "Playing",
    titles: ["VALORANT", "Overwatch", "Rocket League", "Marvel Rivals"],
  },
  {
    label: "Favorites",
    titles: [
      "Elden Ring",
      "Dishonored",
      "Celeste",
      "Titanfall 2",
      "Viewfinder",
      "Superliminal",
    ],
  },
];

export function About() {
  return (
    <section id="about" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>01 / ABOUT</div>
      <h2 className={sectionStyles.heading}>
        Full-stack developer, systems-minded.
      </h2>
      <p className={styles.bio}>
        I build backend services and frontend interfaces across whatever stack
        the problem calls for — Go APIs, Svelte wizards, React libraries. Off
        the clock: probably making a video game.
      </p>
      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <div key={group.label} className={styles.group}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <div className={styles.skills}>
              {group.skills.map((skill) => (
                <SkillChip key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.groups} ${styles.games}`}>
        {games.map((group) => (
          <div key={group.label} className={styles.group}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <div className={styles.skills}>
              {group.titles.map((title) => (
                <SkillChip key={title} name={title} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
