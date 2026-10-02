import { skillIcons } from "@/lib/skillIcons";
import styles from "./SkillChip.module.css";

export function SkillChip({ name }: { name: string }) {
  const Icon = skillIcons[name];
  return (
    <span className={styles.chip}>
      {Icon && <Icon aria-hidden className={styles.icon} />}
      {name}
    </span>
  );
}
