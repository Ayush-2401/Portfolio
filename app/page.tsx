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
import { BrainCircuit, Bot, Code2, Cpu } from 'lucide-react';

const coreSkills = [
  { icon: <Code2 size={32} />, label: "Java Full-Stack", codeSnippet: "SpringApplication.run(App.class)" },
  { icon: <BrainCircuit size={32} />, label: "Machine Learning", codeSnippet: "model.fit(X_train, y_train)" },
  { icon: <Cpu size={32} />, label: "Computer Vision", codeSnippet: "cv2.CascadeClassifier()" },
  { icon: <Bot size={32} />, label: "AI Agents", codeSnippet: "agent_executor.invoke(prompt)" },
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
