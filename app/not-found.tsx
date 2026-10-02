import Link from "next/link";
import sectionStyles from "@/components/Section.module.css";

export default function NotFound() {
  return (
    <section className={sectionStyles.section}>
      <div className={sectionStyles.eyebrow}>404</div>
      <h1 className={sectionStyles.heading}>Game over: page not found.</h1>
      <p>
        That page doesn&apos;t exist. <Link href="/">Back to the start</Link>.
      </p>
    </section>
  );
}
