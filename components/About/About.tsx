"use client";

import { ChipGroups } from "../ChipGroups/ChipGroups";
import sectionStyles from "../Section.module.css";
import styles from "./About.module.css";

const games = [
  {
    label: "Playing",
    items: ["VALORANT", "Overwatch", "Rocket League", "Marvel Rivals"],
  },
  {
    label: "Favorites",
    items: [
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
      <div className={styles.games}>
        <ChipGroups groups={games} />
      </div>
    </section>
  );
}
