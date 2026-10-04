"use client";

import { useEffect, useState } from "react";
import {
  achievements,
  unlockAchievement,
  type AchievementId,
} from "@/lib/achievements";
import { ACHIEVEMENT_UNLOCKED_EVENT } from "@/lib/events";
import styles from "./AchievementToast.module.css";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Shows unlocked trophies one at a time, and listens for the Konami code.
export function AchievementToast() {
  // Each entry gets its own key, so the same trophy queued twice (storage
  // blocked) still gets a fresh timer and entrance.
  const [queue, setQueue] = useState<{ id: AchievementId; key: number }[]>([]);
  const current = queue[0];

  useEffect(() => {
    let nextKey = 0;
    const handleUnlock = (event: Event) => {
      const id = (event as CustomEvent<AchievementId>).detail;
      const key = nextKey++;
      setQueue((previousQueue) => [...previousQueue, { id, key }]);
    };

    let konamiProgress = 0;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === KONAMI_CODE[konamiProgress]) konamiProgress++;
      else konamiProgress = event.key === KONAMI_CODE[0] ? 1 : 0;
      if (konamiProgress === KONAMI_CODE.length) {
        konamiProgress = 0;
        unlockAchievement("cheat-code");
      }
    };

    window.addEventListener(ACHIEVEMENT_UNLOCKED_EVENT, handleUnlock);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener(ACHIEVEMENT_UNLOCKED_EVENT, handleUnlock);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!current) return;
    const timeout = setTimeout(
      () => setQueue((previousQueue) => previousQueue.slice(1)),
      4000,
    );
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {current && (
        <div key={current.key} className={styles.toast}>
          <span className={styles.label}>◆ Trophy unlocked</span>
          <span className={styles.title}>{achievements[current.id].title}</span>
          <span className={styles.description}>
            {achievements[current.id].description}
          </span>
        </div>
      )}
    </div>
  );
}
