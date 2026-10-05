"use client";

import { useEffect } from "react";
import { unlockAchievement } from "@/lib/achievements";
import { SECTION_IDS, useActiveSection } from "@/lib/useActiveSection";
import styles from "./XpBar.module.css";

// Scroll progress as a segmented XP bar, levelled up by the section in view.
export function XpBar() {
  const { activeSection, progress } = useActiveSection();
  // Home is level 0, so each level matches its section's NN / eyebrow
  const level = SECTION_IDS.indexOf(activeSection);
  const isMaxLevel = level === SECTION_IDS.length - 1;

  useEffect(() => {
    if (activeSection === "contact") unlockAchievement("completionist");
  }, [activeSection]);

  return (
    <div
      className={`${styles.xpBar} ${isMaxLevel ? styles.maxed : ""}`}
      aria-hidden="true"
    >
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
        />
      </div>
      <span className={styles.level}>
        <span className={styles.levelNumber}>
          {isMaxLevel ? "LV MAX" : `LV ${level}`}
        </span>{" "}
        {activeSection.toUpperCase()}
      </span>
    </div>
  );
}
