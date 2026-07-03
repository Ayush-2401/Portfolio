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
      { name: "Java", level: 95 },
      { name: "Python", level: 90 },
      { name: "JavaScript / TypeScript", level: 85 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    category: "Java & Web",
    skills: [
      { name: "Spring Boot / JavaFX", level: 85 },
      { name: "React / Vite", level: 85 },
      { name: "Flask / FastAPI", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "AI & ML",
    skills: [
      { name: "TensorFlow / PyTorch", level: 80 },
      { name: "OpenCV / YOLOv8", level: 85 },
      { name: "Prompt Engineering", level: 95 },
      { name: "Agentic Workflows", level: 90 },
    ],
  },
  {
    category: "Tools & Automation",
    skills: [
      { name: "Android Studio", level: 80 },
      { name: "Git / GitHub / Docker", level: 85 },
      { name: "n8n / UiPath RPA", level: 80 },
      { name: "AWS (EC2/S3)", level: 75 },
    ],
  },
];
