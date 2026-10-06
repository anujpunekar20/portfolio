"use client";

import { useEffect } from "react";
import sectionStyles from "../Section.module.css";

// Plays each section heading's wave once, the first time it scrolls up to the middle of the
// screen, where the reader is looking (a heading peeking in at the bottom on load doesn't count).
export function HeadingWaveTrigger() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-wave-played", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    for (const heading of document.querySelectorAll(
      `.${sectionStyles.heading}`,
    )) {
      observer.observe(heading);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
