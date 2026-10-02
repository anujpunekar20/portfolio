export type SectionId = "home" | "about" | "work" | "projects" | "contact";

export function scrollToSection(event: React.MouseEvent, id: SectionId) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
