"use client";

import Image from "next/image";
import { experience } from "@/lib/data";
import { Inventory } from "../Inventory/Inventory";
import { SkillChip } from "../SkillChip/SkillChip";
import sectionStyles from "../Section.module.css";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section id="work" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>02 / WORK</div>
      <h2 className={sectionStyles.heading}>Experience</h2>
      <p className={styles.summary}>
        Full-stack developer with 1.5+ years shipping features end-to-end, from
        Go and gRPC APIs and PostgreSQL schemas to Vue and Svelte frontends.
        Comfortable with API design, schema design, and component-driven UI
        across fast-moving product teams.
      </p>
      <div className={styles.list}>
        {experience.map((job, i) => {
          const isCurrent = job.dates.endsWith("Present");
          return (
            <details
              key={job.company}
              className={`${styles.job} ${isCurrent ? styles.current : ""}`}
              open={i === 0}
            >
              <summary className={styles.summaryRow}>
                <span className={styles.dates}>
                  {job.dates.split(" — ").map((date) => (
                    <span key={date}>{date}</span>
                  ))}
                </span>
                {job.logo && (
                  <Image
                    src={job.logo}
                    alt={`${job.company} logo`}
                    width={40}
                    height={40}
                    className={styles.logo}
                  />
                )}
                <div className={styles.head}>
                  <span className={styles.company}>
                    {job.company}
                    {isCurrent ? (
                      <span className={`${styles.status} ${styles.active}`}>
                        In progress
                      </span>
                    ) : (
                      <span className={styles.status}>Complete</span>
                    )}
                  </span>
                  <div className={styles.role}>{job.role}</div>
                  <p className={styles.desc}>{job.desc}</p>
                </div>
                <span className={styles.chevron} aria-hidden>
                  ▾
                </span>
              </summary>
              <div className={styles.body}>
                {job.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className={styles.project}>
                    {project.name && (
                      <h3 className={styles.projectName}>{project.name}</h3>
                    )}
                    <ul className={styles.bullets}>
                      {project.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className={styles.stack}>
                  {job.stack.map((skill) => (
                    <SkillChip key={skill} name={skill} />
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
      <div className={styles.skills}>
        <Inventory />
      </div>
    </section>
  );
}
