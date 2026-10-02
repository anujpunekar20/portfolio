export type SectionId = "home" | "about" | "work" | "projects" | "contact";

export function scrollToId(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToSection(event: React.MouseEvent, id: SectionId) {
  event.preventDefault();
  scrollToId(id);
}
