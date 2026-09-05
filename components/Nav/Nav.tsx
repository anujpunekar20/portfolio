"use client";

import styles from "./Nav.module.css";
import { scrollToSection, type SectionId } from "@/lib/scroll";

const links: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className={styles.nav}>
      <a
        href="#home"
        className={styles.logo}
        onClick={(e) => scrollToSection(e, "home")}
      >
        AP_
      </a>
      <div className={styles.links}>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => scrollToSection(e, link.id)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
