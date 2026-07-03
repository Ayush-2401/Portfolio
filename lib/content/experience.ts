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
    date: "Sept 2023 - June 2027",
    description: "CGPA: 8.55/10.0. Coursework: DSA, OOP, AI & ML, Software Engineering, Cloud Computing.",
    type: "education",
  },
  {
    id: "work-fullstack",
    title: "AI-Assisted Full-Stack Developer",
    organization: "Independent (Project-Based)",
    date: "2023 - Present",
    description: "Architected 12+ production projects leveraging AI agents for workflows and prompt engineering. Built Java desktop and Android apps.",
    type: "work",
  },
  {
    id: "work-ml",
    title: "Machine Learning & Computer Vision Developer",
    organization: "Independent (Project-Based)",
    date: "2023 - Present",
    description: "Built end-to-end ML pipelines for facial recognition (FaceSort), ASL classification, and license plate detection.",
    type: "work",
  },
  {
    id: "work-automation",
    title: "AI Workflow & Automation Developer",
    organization: "Independent (Project-Based)",
    date: "2025",
    description: "Automated ERP scraping with Selenium and built n8n-based automation workflows orchestrated with AI agents.",
    type: "work",
  },
  {
    id: "nptel-llms",
    title: "NPTEL: Intro to Large Language Models",
    organization: "IIT / IISc",
    date: "2026",
    description: "Covered transformer architecture, LLM pre-training, fine-tuning, and prompt engineering.",
    type: "certification",
  },
  {
    id: "nptel-vr",
    title: "NPTEL: Fundamentals of VR/AR",
    organization: "IIT / IISc",
    date: "2026",
    description: "Covered VR/AR hardware, spatial computing, and interaction design.",
    type: "certification",
  },
];
