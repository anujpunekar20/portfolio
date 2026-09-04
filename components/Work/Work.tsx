"use client";

import { Card } from "@anuj20/void-ui";
import Image from "next/image";
import { experience } from "@/lib/data";
import sectionStyles from "../Section.module.css";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section id="work" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>02 / WORK</div>
      <h2 className={sectionStyles.heading}>Experience</h2>
      <div className={styles.list}>
        {experience.map((job) => (
          <Card key={job.company}>
            <div className={styles.cardInner}>
              <div className={styles.row}>
                <div className={styles.identity}>
                  {job.logo && (
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={40}
                      height={40}
                      className={styles.logo}
                    />
                  )}
                  <div>
                    <div className={styles.company}>{job.company}</div>
                    <div className={styles.role}>{job.role}</div>
                  </div>
                </div>
                <div className={styles.dates}>{job.dates}</div>
              </div>
              <p className={styles.desc}>{job.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
