"use client";

import { useEffect } from "react";
import sectionStyles from "../Section.module.css";

// Plays each section heading's wave once, the first time the whole heading is on screen.
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
      { threshold: 1 },
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
