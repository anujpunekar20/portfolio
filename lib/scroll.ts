export type SectionId = "home" | "about" | "work" | "projects" | "contact";

export function scrollToSection(e: React.MouseEvent, id: SectionId) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
