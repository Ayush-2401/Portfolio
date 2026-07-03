export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Python", level: 80 },
      { name: "Rust", level: 70 },
    ],
  },
  {
    category: "Frameworks & Tools",
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "Android Studio", level: 75 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Domains",
    skills: [
      { name: "Full-Stack Web", level: 90 },
      { name: "Computer Vision", level: 75 },
      { name: "AI-assisted Dev", level: 85 },
    ],
  },
];
