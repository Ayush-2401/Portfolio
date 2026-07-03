import React from "react";

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-8 md:p-16 space-y-16">
      <header className="space-y-4">
        <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tighter">
          Design System
        </h1>
        <p className="font-mono text-text-secondary">~/dev/style-guide</p>
      </header>

      <section className="space-y-8">
        <h2 className="font-display text-3xl border-b border-border-subtle pb-4">Colors</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Base */}
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-bg-primary border border-border-subtle flex items-end p-3">
              <span className="font-mono text-xs">--bg-primary</span>
            </div>
            <div className="h-24 rounded-lg bg-bg-secondary border border-border-subtle flex items-end p-3">
              <span className="font-mono text-xs">--bg-secondary</span>
            </div>
            <div className="h-24 rounded-lg bg-bg-elevated border border-border-subtle flex items-end p-3">
              <span className="font-mono text-xs">--bg-elevated</span>
            </div>
          </div>

          {/* Accent */}
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-accent text-bg-primary flex items-end p-3">
              <span className="font-mono text-xs font-bold">--accent</span>
            </div>
            <div className="h-24 rounded-lg bg-accent-dim text-accent flex items-end p-3">
              <span className="font-mono text-xs">--accent-dim</span>
            </div>
            <div className="h-24 rounded-lg bg-bg-primary border border-accent shadow-[0_0_40px_var(--color-accent-glow)] flex items-end p-3">
              <span className="font-mono text-xs">--accent-glow</span>
            </div>
          </div>

          {/* Semantic */}
          <div className="space-y-2">
            <div className="h-24 rounded-lg bg-success text-bg-primary flex items-end p-3">
              <span className="font-mono text-xs">--success</span>
            </div>
            <div className="h-24 rounded-lg bg-warning text-bg-primary flex items-end p-3">
              <span className="font-mono text-xs">--warning</span>
            </div>
            <div className="h-24 rounded-lg bg-error text-bg-primary flex items-end p-3">
              <span className="font-mono text-xs">--error</span>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-2 bg-bg-secondary p-4 rounded-lg border border-border-subtle">
            <p className="text-text-primary">Text Primary</p>
            <p className="text-text-secondary">Text Secondary</p>
            <p className="text-text-muted">Text Muted</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-display text-3xl border-b border-border-subtle pb-4">Typography</h2>
        
        <div className="space-y-8">
          <div>
            <p className="font-mono text-text-muted text-sm mb-2">Display (Space Grotesk)</p>
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter">
              BUILD / SHIP
            </h1>
          </div>
          
          <div>
            <p className="font-mono text-text-muted text-sm mb-2">Body (Inter)</p>
            <p className="font-body text-lg max-w-2xl text-text-secondary">
              Every interactive element has two states minimum: resting and alive. 
              Nothing on this site should look inert. Buttons, cards, icons, links — all respond 
              to proximity or hover.
            </p>
          </div>

          <div>
            <p className="font-mono text-text-muted text-sm mb-2">Mono (JetBrains Mono)</p>
            <p className="font-mono text-accent">ayush@portfolio:~$ ./deploy.sh</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-display text-3xl border-b border-border-subtle pb-4">Terminal Components Preview</h2>
        
        <div className="rounded-xl overflow-hidden max-w-2xl border border-border-subtle bg-term-bg shadow-2xl">
          <div className="bg-term-header px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error opacity-80" />
            <div className="w-3 h-3 rounded-full bg-warning opacity-80" />
            <div className="w-3 h-3 rounded-full bg-success opacity-80" />
            <span className="font-mono text-xs text-text-muted ml-2">ayush@portfolio:~</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-2">
            <div className="flex gap-2">
              <span className="text-term-prompt">➜</span>
              <span className="text-text-primary">~/portfolio</span>
              <span className="text-term-text">cat skills.json</span>
            </div>
            <div className="text-term-text whitespace-pre">
{`{
  "design": ["Figma", "UI/UX", "Prototyping"],
  "code": ["React", "Next.js", "TailwindCSS"]
}`}
            </div>
            <div className="flex gap-2">
              <span className="text-term-prompt">➜</span>
              <span className="text-text-primary">~/portfolio</span>
              <span className="w-2 bg-text-primary animate-pulse inline-block" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
