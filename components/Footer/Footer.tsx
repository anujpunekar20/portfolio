import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Anuj Punekar</span>
      <span className={styles.available}>● available for work</span>
    </footer>
  );
}
