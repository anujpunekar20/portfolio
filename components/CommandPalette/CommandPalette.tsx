"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_COMMAND_PALETTE_EVENT, PLAY_TETRIS_EVENT } from "@/lib/events";
import { scrollToId } from "@/lib/scroll";
import styles from "./CommandPalette.module.css";

const commands = [
  { label: "Go to About", run: () => scrollToId("about") },
  { label: "Go to Work", run: () => scrollToId("work") },
  { label: "Go to Projects", run: () => scrollToId("projects") },
  { label: "Go to Contact", run: () => scrollToId("contact") },
  { label: "Go to top", run: () => scrollToId("home") },
  {
    label: "Open GitHub",
    run: () =>
      window.open("https://github.com/anujpunekar20", "_blank", "noopener"),
  },
  {
    label: "Open LinkedIn",
    run: () =>
      window.open(
        "https://www.linkedin.com/in/anuj-punekar",
        "_blank",
        "noopener",
      ),
  },
  {
    label: "Send an email",
    run: () => {
      window.location.href = "mailto:anujkakarot@gmail.com";
    },
  },
  {
    label: "Play Tetris",
    run: () => window.dispatchEvent(new Event(PLAY_TETRIS_EVENT)),
  },
];

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const matches = commands.filter((command) =>
    command.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    const open = () => {
      setQuery("");
      setActiveIndex(0);
      dialogRef.current?.showModal();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, open);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, open);
    };
  }, []);

  useEffect(() => {
    // keep the highlighted option visible when arrowing past the ends of the scrollable list
    document
      .getElementById(`command-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const runCommand = (command: (typeof commands)[number]) => {
    dialogRef.current?.close();
    command.run();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (matches.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % matches.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(
          (index) => (index - 1 + matches.length) % matches.length,
        );
        break;
      case "Enter":
        event.preventDefault();
        runCommand(matches[activeIndex]);
        break;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Command palette"
      onClick={(event) => {
        // clicks on the ::backdrop land on the dialog element itself
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <input
        className={styles.input}
        type="text"
        role="combobox"
        aria-expanded
        aria-controls="command-list"
        aria-activedescendant={
          matches.length > 0 ? `command-${activeIndex}` : undefined
        }
        placeholder="Type a command"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
        }}
        onKeyDown={handleInputKeyDown}
      />
      <ul id="command-list" role="listbox" className={styles.list}>
        {matches.map((command, index) => (
          <li
            key={command.label}
            id={`command-${index}`}
            role="option"
            aria-selected={index === activeIndex}
            className={styles.option}
            onMouseMove={() => setActiveIndex(index)}
            onClick={() => runCommand(command)}
          >
            {command.label}
          </li>
        ))}
        {matches.length === 0 && (
          <li className={styles.empty}>
            No commands match &quot;{query}&quot;.
          </li>
        )}
      </ul>
      <div className={styles.hint}>↑↓ move, Enter run, Esc close</div>
    </dialog>
  );
}
