import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* an etched, unlit name that resolves glyph by glyph as the footer scrolls in */}
      <div className={styles.wordmark} aria-hidden>
        ANUJ PUNEKAR
      </div>
      <div className={styles.footerRow}>
        <span>© 2026 Anuj Punekar</span>
        <span className={styles.available}>● available for work</span>
      </div>
    </footer>
  );
}
