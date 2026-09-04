"use client";

import { Badge, Button, Card } from "@anuj20/void-ui";
import Image from "next/image";
import { projects } from "@/lib/data";
import sectionStyles from "../Section.module.css";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <section id="projects" className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>03 / PROJECTS</div>
      <h2 className={sectionStyles.heading}>Projects</h2>
      <div className={styles.list}>
        {projects.map((project) => (
          <Card key={project.name}>
            <div className={styles.cardInner}>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={900}
                  height={280}
                  className={styles.image}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  Drop a {project.name} screenshot
                </div>
              )}
              <div className={styles.title}>{project.name}</div>
              <p className={styles.desc}>{project.desc}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener"
                className={styles.githubLink}
              >
                <Button variant="outline">View on GitHub</Button>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
