import { Nav } from "@/components/Nav/Nav";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Work } from "@/components/Work/Work";
import { Projects } from "@/components/Projects/Projects";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
