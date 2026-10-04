"use client";

import { useEffect } from "react";
import { unlockAchievement } from "@/lib/achievements";
import { SECTION_IDS, useActiveSection } from "@/lib/useActiveSection";
import styles from "./XpBar.module.css";

// Scroll progress as a segmented XP bar, levelled up by the section in view.
export function XpBar() {
  const { activeSection, progress } = useActiveSection();
  const level = SECTION_IDS.indexOf(activeSection) + 1;
  const isMaxLevel = level === SECTION_IDS.length;

  useEffect(() => {
    if (activeSection === "contact") unlockAchievement("completionist");
  }, [activeSection]);

  return (
    <div
      className={`${styles.xpBar} ${isMaxLevel ? styles.maxed : ""}`}
      aria-hidden="true"
    >
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progress * 100}%` }} />
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
