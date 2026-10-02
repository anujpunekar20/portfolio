import { SkillChip } from "../SkillChip/SkillChip";
import styles from "./ChipGroups.module.css";

export function ChipGroups({
  groups,
}: {
  groups: { label: string; items: string[] }[];
}) {
  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <div key={group.label} className={styles.group}>
          <h3 className={styles.groupLabel}>{group.label}</h3>
          <div className={styles.chips}>
            {group.items.map((item) => (
              <SkillChip key={item} name={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
