"use client";

import { Card } from "@anuj20/void-ui";
import Image from "next/image";
import { experience, summary } from "@/lib/data";
import { SkillChip } from "../SkillChip/SkillChip";
import sectionStyles from "../Section.module.css";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section id="work" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>02 / WORK</div>
      <h2 className={sectionStyles.heading}>Experience</h2>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.list}>
        {experience.map((job, i) => (
          <Card key={job.company}>
            <details className={styles.job} open={i === 0}>
              <summary className={styles.summaryRow}>
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
                  <div className={styles.row}>
                    <span className={styles.company}>{job.company}</span>
                    <span className={styles.dates}>{job.dates}</span>
                  </div>
                  <div className={styles.role}>{job.role}</div>
                  <p className={styles.desc}>{job.desc}</p>
                </div>
                <span className={styles.chevron} aria-hidden>
                  ▾
                </span>
              </summary>
              <div className={styles.body}>
                {job.projects.map((p, pi) => (
                  <div key={pi} className={styles.project}>
                    {p.name && <h3 className={styles.projectName}>{p.name}</h3>}
                    <ul className={styles.bullets}>
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className={styles.stack}>
                  {job.stack.map((s) => (
                    <SkillChip key={s} name={s} />
                  ))}
                </div>
              </div>
            </details>
          </Card>
        ))}
      </div>
    </section>
  );
}
