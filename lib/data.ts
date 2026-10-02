export const skillGroups = [
  {
    label: "Backend",
    skills: [
      "Golang",
      "Python",
      "gRPC",
      "ConnectRPC",
      "Protocol Buffers",
      "REST APIs",
      "GraphQL",
      "Node.js",
      "Express.js",
    ],
  },
  {
    label: "Frontend",
    skills: [
      "TypeScript",
      "JavaScript",
      "Svelte",
      "SvelteKit",
      "Vue",
      "React",
      "Tailwind CSS",
      "StyleX",
    ],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Ent ORM", "SQLC"],
  },
  { label: "Cloud", skills: ["AWS", "GCP"] },
  {
    label: "Tools",
    skills: [
      "Docker",
      "Git",
      "GitHub Actions",
      "Buf",
      "Typst",
      "Figma",
      "Playwright",
    ],
  },
];

export interface Job {
  company: string;
  role: string;
  dates: string;
  desc: string;
  logo?: string;
  stack: string[];
  projects: { name?: string; bullets: string[] }[];
}

export const experience: Job[] = [
  {
    company: "Codesmithdev (MXA)",
    role: "Associate Software Engineer",
    dates: "Apr '26 — Present",
    desc: "Building the RFQ module and equipment management tooling in Vue.js.",
    logo: "/logos/codesmithdev.jpg",
    stack: ["Vue", "Tailwind CSS"],
    projects: [
      {
        name: "Mechanical X Advantage: HVAC services platform",
        bullets: [
          "Led the RFQ module: vendor invitation, an external review surface for vendors, and accept/reject flows with role-based views.",
          "Built equipment management: a categorized form with inline validation, equipment ID tracking, and a paginated asset list.",
        ],
      },
    ],
  },
  {
    company: "Wauld",
    role: "Associate Software Engineer",
    dates: "Jul '25 — Apr '26",
    desc: "Owned the Go credential API — 5,000+ credentials issued for 350+ users.",
    logo: "/logos/wauld.jpg",
    stack: ["Golang", "ConnectRPC", "Ent ORM", "PostgreSQL", "SvelteKit"],
    projects: [
      {
        bullets: [
          "Owned the credential lifecycle API in Go (issuance, revocation, expiry, downloads) serving 5,000+ credentials across 350+ users with role-based access.",
          "Built the image-attribute feature end-to-end: data model, API contracts, a draft/publish flow, and the Svelte designer UI.",
          "Shipped bulk credential operations (send, void, download, reporting) with async email notifications.",
          "Added a credential-expiry notification pipeline with graduated alerts and a background migration worker.",
          "Delivered the credential change-request flow: recipient submission UI, publish-only gating, admin alerts, and re-issuance.",
        ],
      },
    ],
  },
  {
    company: "Codesmithdev (ALTA / Edopia)",
    role: "Associate Software Engineer",
    dates: "Dec '24 — Jul '25",
    desc: "Built the Svelte intake wizard and Avatar Studio.",
    logo: "/logos/codesmithdev.jpg",
    stack: ["Golang", "Svelte", "TypeScript", "PostgreSQL", "Typst"],
    projects: [
      {
        name: "ALTA: language assessment platform",
        bullets: [
          "Architected a branching multi-step intake wizard that adapts by department and role to recommend an assessment and quote pricing, integrated with HubSpot.",
          "Enforced field-level and cross-field validation with step-progress persistence to cut drop-off.",
        ],
      },
      {
        name: "Edopia: AI-powered learning platform",
        bullets: [
          "Shipped the Avatar Studio: a Go service layer and a gamified Svelte UI with five progression levels and a live layered preview.",
          "Built a Typst PDF pipeline that emails formatted documents, plus four student lifecycle notifications.",
        ],
      },
    ],
  },
  {
    company: "Appointy",
    role: "Software Engineer Intern",
    dates: "May '24 — Jul '24",
    desc: "Shipped Go REST/gRPC APIs and GraphQL endpoints.",
    logo: "/logos/appointy.png",
    stack: ["Golang", "gRPC", "GraphQL"],
    projects: [
      {
        bullets: [
          "Built REST APIs in Go with a REST-to-gRPC adapter over internal services, and integrated GraphQL via Jaal.",
          "Wrote error-normalization middleware mapping gRPC status codes to consistent HTTP payloads with request-scoped logging.",
        ],
      },
    ],
  },
];

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  github: string;
  image?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    name: "void-ui",
    desc: "A dark-first React component library with a sharp, brutalist look — no rounded corners, no shadows, one accent color.",
    tags: ["React", "TypeScript", "StyleX"],
    github: "https://github.com/anujpunekar20/void-ui",
    image: "/screenshots/void-ui.png",
    live: "https://anujpunekar20.github.io/void-ui/",
  },
  {
    name: "Dubbit",
    desc: "Video translation with lip-sync: a Flask API chaining Whisper (speech recognition), NLLB-200 (translation), Coqui TTS and Wav2Lip into one automated pipeline.",
    tags: ["Python", "Flask", "Whisper", "Wav2Lip"],
    github: "https://github.com/anujpunekar20/dubbit",
  },
];
