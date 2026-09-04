export const skills = [
  "Golang",
  "Node.js",
  "Svelte",
  "Vue",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "MySQL",
  "AWS",
] as const;

export interface Job {
  company: string;
  role: string;
  dates: string;
  desc: string;
}

export const experience: Job[] = [
  {
    company: "Codesmithdev (MXA)",
    role: "Associate Software Engineer",
    dates: "Apr '26 — Present",
    desc: "Building the RFQ module and equipment management tooling in Vue.js.",
  },
  {
    company: "Wauld",
    role: "Associate Software Engineer",
    dates: "Jul '25 — Apr '26",
    desc: "Owned the Go credential API — 5,000+ credentials issued for 350+ users.",
  },
  {
    company: "Codesmithdev (ALTA / Edopia)",
    role: "Associate Software Engineer",
    dates: "Dec '24 — Jul '25",
    desc: "Built the Svelte intake wizard and Avatar Studio.",
  },
  {
    company: "Appointy",
    role: "Software Engineer Intern",
    dates: "May '24 — Jul '24",
    desc: "Shipped Go REST/gRPC APIs and GraphQL endpoints.",
  },
];

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  github: string;
}

export const projects: Project[] = [
  {
    name: "void-ui",
    desc: "A dark-first React component library with a sharp, brutalist look — no rounded corners, no shadows, one accent color.",
    tags: ["React", "TypeScript", "StyleX"],
    github: "https://github.com/anujpunekar20/void-ui",
  },
];
