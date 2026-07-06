import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Marquee from '@/components/tech-stack/Marquee';
import HoverSwapGrid from '@/components/tech-stack/HoverSwapGrid';
import SectionDivider from '@/components/shared/SectionDivider';
import ProjectRail from '@/components/projects/ProjectRail';
import Timeline from '@/components/experience/Timeline';
import Terminal from '@/components/terminal/Terminal';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';
import { BrainCircuit, Bot, Code2, Cpu, Globe, Database, Network, TerminalSquare } from 'lucide-react';

const coreSkills = [
  { icon: <Code2 size={32} />, label: "Java Full-Stack", codeSnippet: "SpringApplication.run(App.class)" },
  { icon: <BrainCircuit size={32} />, label: "Machine Learning", codeSnippet: "model.fit(X_train, y_train)" },
  { icon: <Globe size={32} />, label: "React & Next.js", codeSnippet: "export default function App()" },
  { icon: <Cpu size={32} />, label: "Computer Vision", codeSnippet: "cv2.CascadeClassifier()" },
  { icon: <Database size={32} />, label: "Cloud Databases", codeSnippet: "SELECT * FROM users WHERE active=1" },
  { icon: <Bot size={32} />, label: "AI Agents", codeSnippet: "agent_executor.invoke(prompt)" },
  { icon: <Network size={32} />, label: "System Design", codeSnippet: "new AWS.AutoScaling()" },
  { icon: <TerminalSquare size={32} />, label: "DevOps & CI/CD", codeSnippet: "docker-compose up -d" },
];

export default function Home() {
  return (
    <main className="bg-bg-primary min-h-screen text-text-primary selection:bg-accent selection:text-bg-primary">
      <Hero />
      <About />
      
      {/* Tech Stack Section */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto py-16">
        <div className="font-mono text-[13px] text-text-muted mb-8">~/core-skills</div>
        <HoverSwapGrid items={coreSkills} />
      </section>
      <Marquee />

      <SectionDivider word1="BUILD" word2="SHIP" />
      <ProjectRail />
      
      <Timeline />
      
      <SectionDivider word1="CODE" word2="DEBUG" />
      <Terminal />
      
      <Contact />
      <Footer />
    </main>
  );
}
