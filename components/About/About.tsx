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
      <h2 className={sectionStyles.heading}>A gamer who builds things.</h2>
      <p className={styles.bio}>
        I&apos;m a big-time gamer, and it shows in how I build: I care about
        fast feedback, tight controls, and details that feel good to use.
        That&apos;s why there&apos;s a Tetris game hiding on this page — hit ▶
        PLAY. When I&apos;m not playing, I&apos;m probably making a game of my
        own.
      </p>
      <div className={styles.games}>
        <ChipGroups groups={games} />
      </div>
    </section>
  );
}
