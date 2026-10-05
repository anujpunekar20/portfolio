import { ACHIEVEMENT_UNLOCKED_EVENT } from "./events";

const UNLOCKED_KEY = "achievements";

export const achievements = {
  "power-user": {
    title: "Power user",
    description: "Used the hacks!",
  },
  completionist: {
    title: "Completionist",
    description: "Reached the end of the page :)",
  },
  "line-clear": { title: "Line clear", description: "Cleared a row in Tetris" },
  "cheat-code": { title: "Cheat code", description: "Hey, you know this?" },
  "party-up": {
    title: "So we frens now?",
    description: "Thank you! I'll get back to you soon!",
  },
};

export type AchievementId = keyof typeof achievements;

// Each trophy fires once per browser: unlocked ids are kept in localStorage.
export function unlockAchievement(id: AchievementId) {
  let unlocked: AchievementId[] = [];
  try {
    unlocked = JSON.parse(localStorage.getItem(UNLOCKED_KEY) ?? "[]");
    if (unlocked.includes(id)) return;
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify([...unlocked, id]));
  } catch {
    // Storage blocked (private mode): still show the trophy, just not remembered.
  }
  window.dispatchEvent(
    new CustomEvent<AchievementId>(ACHIEVEMENT_UNLOCKED_EVENT, { detail: id }),
  );
}
