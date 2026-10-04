import { Nav } from "@/components/Nav/Nav";
import { XpBar } from "@/components/XpBar/XpBar";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Work } from "@/components/Work/Work";
import { Projects } from "@/components/Projects/Projects";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { CommandPalette } from "@/components/CommandPalette/CommandPalette";
import { Tetris } from "@/components/Tetris/Tetris";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Nav />
      <XpBar />
      <Tetris />
      <CommandPalette />
      <div className={styles.scrollArea}>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
