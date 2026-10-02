"use client";

import { useSyncExternalStore } from "react";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/lib/events";
import { scrollToSection } from "@/lib/scroll";
import styles from "./Nav.module.css";

const noopSubscribe = () => () => {};

export function Nav() {
  // navigator isn't available during SSR, so server and first client render use the Ctrl label
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac/.test(navigator.userAgent),
    () => false,
  );

  return (
    <nav className={styles.nav}>
      <a
        href="#home"
        className={styles.logo}
        onClick={(event) => scrollToSection(event, "home")}
      >
        AP_
      </a>
      <button
        type="button"
        className={styles.paletteButton}
        onClick={() =>
          window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))
        }
      >
        <span className={styles.keyboardLabel}>
          Press {isMac ? "⌘" : "Ctrl "} + K
        </span>
        <span className={styles.touchLabel}>Menu</span>
      </button>
    </nav>
  );
}
