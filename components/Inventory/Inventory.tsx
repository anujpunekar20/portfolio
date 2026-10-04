import { skillGroups } from "@/lib/data";
import { skillIcons } from "@/lib/skillIcons";
import styles from "./Inventory.module.css";

// Skills laid out like a game inventory: one panel of square slots per group.
export function Inventory() {
  return (
    <div className={styles.inventory}>
      {skillGroups.map((group) => (
        <div key={group.label} className={styles.group}>
          <h3 className={styles.groupLabel}>{group.label}</h3>
          <ul className={styles.slots}>
            {group.items.map((item) => {
              const Icon = skillIcons[item];
              return (
                <li key={item} className={styles.slot}>
                  {/* Empty icon box keeps text-only skills aligned with the rest. */}
                  <span className={styles.icon}>
                    {Icon && <Icon aria-hidden />}
                  </span>
                  <span className={styles.name}>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
