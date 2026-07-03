export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: "education" | "certification" | "work";
}

export const experience: ExperienceItem[] = [
  {
    id: "btech",
    title: "B.Tech in Information Science and Engineering",
    organization: "Presidency University, Bangalore",
    date: "2022 - 2026",
    description: "Coursework highlights in Data Structures, Algorithms, AI, and Systems Design.",
    type: "education",
  },
  {
    id: "nptel-llms",
    title: "NPTEL Certification: Large Language Models",
    organization: "IIT / NPTEL",
    date: "2024",
    description: "Explored the architecture, training, and deployment of LLMs.",
    type: "certification",
  },
  {
    id: "nptel-vr",
    title: "NPTEL Certification: VR/AR",
    organization: "IIT / NPTEL",
    date: "2023",
    description: "Studied the principles and applications of Virtual and Augmented Reality.",
    type: "certification",
  },
];
