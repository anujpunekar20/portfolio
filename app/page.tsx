import { Nav } from "@/components/Nav/Nav";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Work } from "@/components/Work/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Work />
    </>
  );
}
