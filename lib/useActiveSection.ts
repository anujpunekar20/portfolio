import { useEffect, useState } from "react";
import type { SectionId } from "./scroll";

const SECTION_IDS: SectionId[] = [
  "home",
  "about",
  "work",
  "projects",
  "contact",
];

// The section crossing the middle of the scroll area, or the last one once
// scrolled to the bottom (Contact is too short to ever reach the middle).
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    // The page scrolls inside the sections' parent (`.scrollArea`), not the window.
    const scrollArea = document.getElementById("home")?.parentElement;
    if (!scrollArea) return;

    function updateActiveSection() {
      if (!scrollArea) return;
      const atBottom =
        scrollArea.scrollTop + scrollArea.clientHeight >=
        scrollArea.scrollHeight - 1;
      if (atBottom) {
        setActiveSection("contact");
        return;
      }
      const middle =
        scrollArea.getBoundingClientRect().top + scrollArea.clientHeight / 2;
      let current: SectionId = "home";
      for (const id of SECTION_IDS) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= middle) current = id;
      }
      setActiveSection(current);
    }

    updateActiveSection();
    scrollArea.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    return () => scrollArea.removeEventListener("scroll", updateActiveSection);
  }, []);

  return activeSection;
}
