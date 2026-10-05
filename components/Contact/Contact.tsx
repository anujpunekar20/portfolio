"use client";

import { useState } from "react";
import { unlockAchievement } from "@/lib/achievements";
import { Button, Input, Textarea, Tooltip } from "@anuj20/void-ui";
import { LuCalendar } from "react-icons/lu";
import { GithubIcon, LinkedinIcon, MailIcon } from "../Icons";
import sectionStyles from "../Section.module.css";
import iconChipStyles from "../IconChip.module.css";
import styles from "./Contact.module.css";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);

    if (response?.ok) {
      form.reset();
      setStatus("sent");
      unlockAchievement("party-up");
      return;
    }
    const body = await response?.json().catch(() => null);
    setErrorMessage(
      body?.error ?? "Couldn't send right now. Try email instead.",
    );
    setStatus("error");
  };

  return (
    <section id="contact" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>04 / CONTACT</div>
      <h2 className={sectionStyles.heading}>Let&apos;s build something.</h2>
      <p className={styles.intro}>
        Open to full-time roles and interesting freelance work. Reach out any of
        these ways.
      </p>
      <div className={styles.actions}>
        <Tooltip
          label="Email"
          trigger={
            <a
              href="mailto:anujkakarot@gmail.com"
              aria-label="Email"
              className={iconChipStyles.iconChip}
            >
              <MailIcon />
            </a>
          }
        />
        <Tooltip
          label="LinkedIn"
          trigger={
            <a
              href="https://www.linkedin.com/in/anuj-punekar"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className={iconChipStyles.iconChip}
            >
              <LinkedinIcon />
            </a>
          }
        />
        <Tooltip
          label="GitHub"
          trigger={
            <a
              href="https://github.com/anujpunekar20"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className={iconChipStyles.iconChip}
            >
              <GithubIcon />
            </a>
          }
        />
        <Tooltip
          label="Book a call"
          trigger={
            <a
              href="https://cal.com/anuj-punekar"
              target="_blank"
              rel="noopener"
              aria-label="Book a call"
              className={iconChipStyles.iconChip}
            >
              <LuCalendar size={20} aria-hidden />
            </a>
          }
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <Input label="Name" name="name" required maxLength={100} />
          <Input label="Email" name="email" type="email" required />
        </div>
        <Textarea
          label="Message"
          name="message"
          required
          maxLength={5000}
          rows={5}
        />
        {/* honeypot: hidden from people, filled in by bots */}
        <input
          className={styles.honeypot}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />
        <div className={styles.submitRow}>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
          {/* the live region stays mounted (remounting it can skip the
              announcement); only the inner span is re-keyed to retype */}
          <p role="status" className={styles.status}>
            <span key={status} className={styles.statusText}>
              {status === "sent" && "Sent. I'll get back to you soon."}
              {status === "error" && errorMessage}
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
