"use client";

import Image from "next/image";
import { SkillChip } from "../SkillChip/SkillChip";
import { projects } from "@/lib/data";
import sectionStyles from "../Section.module.css";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <section id="projects" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>03 / PROJECTS</div>
      <h2 className={sectionStyles.heading}>Projects</h2>
      <div className={styles.list}>
        {projects.map((project, i) => (
          <article key={project.name} className={styles.project}>
            <div className={styles.header}>
              <span className={styles.index}>
                P-{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{project.name}</h3>
            </div>
            {project.image && (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                width={700}
                height={220}
                className={styles.image}
              />
            )}
            <p className={styles.desc}>{project.desc}</p>
            <dl className={styles.spec}>
              <div className={styles.specRow}>
                <dt>Stack</dt>
                <dd className={styles.tags}>
                  {project.tags.map((tag) => (
                    <SkillChip key={tag} name={tag} />
                  ))}
                </dd>
              </div>
              <div className={styles.specRow}>
                <dt>Links</dt>
                <dd className={styles.links}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${project.name} source on GitHub`}
                  >
                    Source <span aria-hidden>↗</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${project.name} live demo`}
                    >
                      Live <span aria-hidden>↗</span>
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
