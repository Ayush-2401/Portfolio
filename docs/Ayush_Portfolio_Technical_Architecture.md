# Ayush Kumar Pandey — Portfolio Website
### Technical Architecture Document (Agent-Ready)

Companion to `Ayush_Portfolio_PRD.md` and `Ayush_Portfolio_UIUX_Spec.md`. Defines project structure, data flow, and implementation contracts so any AI coding agent picking this up mid-project makes consistent decisions.

---

## 1. Stack Summary

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSG for SEO on a portfolio; easy Vercel deploy; matches his existing self-hosting plan for GitHub stats |
| Language | TypeScript | Type-safe command table & virtual FS reduce agent-introduced bugs across sessions |
| Styling | Tailwind CSS + CSS custom properties | Design tokens from UI/UX spec map directly to Tailwind theme extension |
| Animation | Framer Motion (component-level) + GSAP/ScrollTrigger (horizontal rail, complex scroll choreography) | Framer for React-idiomatic transitions; GSAP for the specific scroll-jacking behaviors Framer doesn't do as cleanly |
| 3D (optional hero) | `@react-three/fiber` + `drei` | Only if hero shader/particle background is greenlit — isolate behind a lazy-loaded component so it doesn't tax initial load if unused |
| Charts | Recharts | Skill bars / radar chart |
| State (terminal) | Zustand | Lightweight, avoids prop-drilling command history & virtual FS state through the tree |
| Deployment | Vercel | Static export + serverless functions if needed for live "now status" widget |
| Package manager | pnpm | Fast installs; use whatever the agent's environment already defaults to if pnpm unavailable |

---

## 2. Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, metadata, ThemeProvider
│   ├── page.tsx                   # Single-page composition of all sections
│   ├── globals.css                # Design tokens, Tailwind base layer
│   └── resume/
│       └── page.tsx                # Print-optimized standalone resume view (stretch goal, PRD 4.17)
├── components/
│   ├── hero/
│   │   ├── Hero.tsx
│   │   └── KineticName.tsx
│   ├── nav/
│   │   ├── Nav.tsx
│   │   └── CommandPalette.tsx      # Cmd+K quick nav (PRD 4.5)
│   ├── about/About.tsx
│   ├── tech-stack/
│   │   ├── Marquee.tsx
│   │   └── HoverSwapGrid.tsx
│   ├── projects/
│   │   ├── ProjectRail.tsx         # horizontal scroll-jacked rail (desktop)
│   │   ├── ProjectCardMobile.tsx   # swipeable card (mobile)
│   │   └── ProjectCard.tsx
│   ├── experience/Timeline.tsx
│   ├── terminal/
│   │   ├── Terminal.tsx            # shell chrome + scrollback + input
│   │   ├── commandRegistry.ts      # command table, see Section 4
│   │   ├── virtualFileSystem.ts    # FS tree, see Section 4
│   │   ├── useTerminalStore.ts     # Zustand store: history, cwd, scrollback
│   │   └── QuickCommandChips.tsx   # mobile command shortcuts
│   ├── contact/Contact.tsx
│   ├── footer/Footer.tsx
│   └── shared/
│       ├── CustomCursor.tsx
│       ├── MagneticButton.tsx
│       ├── ScrollReveal.tsx        # IntersectionObserver wrapper
│       ├── SectionDivider.tsx      # "BUILD / SHIP" oversized dividers
│       └── ThemeToggle.tsx
├── lib/
│   ├── content/
│   │   ├── projects.ts             # single source of truth for project data
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── site-copy.ts            # bio, taglines, microcopy strings
│   ├── hooks/
│   │   ├── useMagnetic.ts
│   │   ├── useReducedMotion.ts
│   │   └── useIsTouchDevice.ts
│   └── analytics.ts                # optional, privacy-friendly (e.g. Vercel Analytics/Plausible)
├── public/
│   ├── files/
│   │   ├── Ayush_Kumar_Pandey_Resume.pdf
│   │   └── Ayush_Kumar_Pandey_CV.pdf
│   ├── fonts/                      # self-hosted font files if not using next/font with Google Fonts
│   └── images/
├── styles/ (if not fully Tailwind-in-JSX)
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 3. Data Model — Content Sources

All portfolio content lives in typed data files under `lib/content/`, **not hardcoded in components**. This is the key contract for multi-session agent work: an agent updating a project or adding a new one should only ever touch `lib/content/*.ts`, never hunt through component JSX.

```ts
// lib/content/projects.ts
export interface Project {
  id: string;                 // slug, also used as terminal `cat projects/<id>.md` key
  name: string;
  pitch: string;               // one-line description
  description: string;         // longer, used in cat output
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverStyle: 'gradient' | 'image';
  coverImage?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'flatledger',
    name: 'FlatLedger',
    pitch: 'Decentralized, serverless peer-to-peer bill splitter for flatmates.',
    description: '...',
    techStack: ['Rust', 'Ed25519', 'mDNS', 'UPI Deep Links'],
    githubUrl: 'https://github.com/Ayush-2401/...',
    coverStyle: 'gradient',
    featured: true,
  },
  // ...SLAM Navigation, Traventure, Flight Aggregator, Scientific Calculator, Interactive Visual Sandbox
];
```

Same pattern for `skills.ts` (category → skill → proficiency level for the ASCII/animated bar meters) and `experience.ts` (timeline entries: coursework, certifications, milestones).

---

## 4. Terminal Subsystem — Implementation Contract

This is the most stateful, highest-risk-of-bugs part of the site, so its contract is spelled out precisely.

### 4.1 Virtual file system shape

```ts
// lib/terminal/virtualFileSystem.ts
type VNode =
  | { type: 'file'; name: string; content: string | (() => void) } // content string OR a side-effect (e.g. trigger download)
  | { type: 'dir'; name: string; children: VNode[] };

export const rootFS: VNode = {
  type: 'dir',
  name: '~',
  children: [
    { type: 'file', name: 'resume.pdf', content: () => downloadFile('/files/Ayush_Kumar_Pandey_Resume.pdf') },
    { type: 'file', name: 'cv.pdf', content: () => downloadFile('/files/Ayush_Kumar_Pandey_CV.pdf') },
    { type: 'file', name: 'about.md', content: 'about-bio-string-or-key' },
    { type: 'file', name: 'contact.txt', content: 'contact-block-string' },
    { type: 'file', name: 'skills.json', content: 'skills-summary-string' },
    {
      type: 'dir',
      name: 'projects',
      children: projects.map(p => ({ type: 'file', name: `${p.id}.md`, content: p.description })),
    },
  ],
};
```

### 4.2 Command registry shape

```ts
// lib/terminal/commandRegistry.ts
export interface TerminalContext {
  cwd: string[];             // path segments from root
  setCwd: (path: string[]) => void;
  print: (lines: TerminalLine[]) => void;
  clear: () => void;
  navigateSite: (sectionId: string) => void; // smooth-scroll GUI page
  setTheme: (theme: ThemeName) => void;
}

export type CommandHandler = (args: string[], ctx: TerminalContext) => void | Promise<void>;

export const commands: Record<string, { description: string; handler: CommandHandler }> = {
  help: { description: 'List available commands', handler: helpHandler },
  whoami: { description: 'Who is Ayush?', handler: whoamiHandler },
  about: { description: 'Short bio', handler: aboutHandler },
  skills: { description: 'List skills', handler: skillsHandler },
  projects: { description: 'List or open projects', handler: projectsHandler },
  resume: { description: 'Download resume', handler: resumeHandler },
  cv: { description: 'Download CV', handler: cvHandler },
  contact: { description: 'Contact info', handler: contactHandler },
  socials: { description: 'Social links', handler: socialsHandler },
  education: { description: 'Education details', handler: educationHandler },
  cat: { description: 'Print file contents / trigger file action', handler: catHandler },
  ls: { description: 'List directory contents', handler: lsHandler },
  cd: { description: 'Change directory', handler: cdHandler },
  clear: { description: 'Clear terminal', handler: clearHandler },
  theme: { description: 'Switch color theme', handler: themeHandler },
  neofetch: { description: 'System info, but about Ayush', handler: neofetchHandler },
  matrix: { description: '???', handler: matrixHandler },
  history: { description: 'Show command history', handler: historyHandler },
  exit: { description: 'Return to top of page', handler: exitHandler },
  gui: { description: 'Return to top of page', handler: exitHandler },
};
```

- Unknown command handled by a fallback in the parser, not the table: `command not found: <input>. Type 'help' to see available commands.`
- `resumeHandler`/`cvHandler` both: (1) print the fake progress-bar sequence from the PRD (§3.4), (2) call the file's `content()` side effect from the virtual FS to trigger the actual `<a download>` click. Keep the download trigger and virtual-FS lookup in sync — don't duplicate file paths in two places.

### 4.3 File download utility

```ts
// lib/utils/downloadFile.ts
export function downloadFile(path: string) {
  const a = document.createElement('a');
  a.href = path;
  a.download = '';           // filename inferred from Content-Disposition or path
  document.body.appendChild(a);
  a.click();
  a.remove();
}
```

### 4.4 Command parsing rules
- Trim + lowercase the command token only (args stay case-sensitive, since file/project names may be case-sensitive).
- Split on whitespace, first token = command, rest = args.
- Support quoted args for future-proofing (`cat "some file.md"`) but not required for launch.
- History: array in Zustand store, capped at 100 entries, Up/Down arrow cycles with a pointer index reset on new submission.

---

## 5. Performance Requirements

- Target Lighthouse mobile performance score ≥ 90 even with animation layer active.
- Code-split heavy, optional components: 3D/shader hero, matrix easter-egg animation, and the terminal itself should all be dynamically imported (`next/dynamic`, `ssr: false` where DOM-dependent) so they don't block first paint.
- Images: use `next/image` with explicit sizes, `priority` only on the hero's above-the-fold asset (if any raster image is used at all — much of this design is typographic/gradient-based, which is cheaper).
- Fonts: `next/font` with `display: swap`, subset to Latin only.
- Respect `prefers-reduced-motion` at the CSS/JS level globally (see UI/UX spec §5) — this also incidentally reduces layout thrash for lower-end devices.
- Marquee and cursor-follow effects must use `transform`/`opacity` only (GPU-composited), never animate `top`/`left`/`width` directly.

---

## 6. Deployment & Environments

- **Hosting:** Vercel, connected to the GitHub repo for CI/CD on push to `main`.
- **Preview deployments:** every PR/branch gets an automatic Vercel preview URL — useful across multi-session agent work to visually verify a change before merging.
- **Environment variables:** none required for MVP (fully static). If a "live now status" widget (PRD §4.12) is added, that needs a small serverless function or a scheduled GitHub Action writing to a static JSON file — prefer the static JSON + scheduled action approach to avoid any secrets/API-key management for a personal portfolio.
- **Analytics (optional):** Vercel Analytics or Plausible — privacy-friendly, no cookie banner required.

---

## 7. Testing Notes (see also `Ayush_Portfolio_Dev_Workflow.md` for process)

- **Terminal command handlers**: unit-testable in isolation since each handler is a pure-ish function taking `(args, ctx)` — mock `ctx` in tests to assert `print`/`setCwd`/`navigateSite` calls without needing a DOM.
- **Virtual FS traversal** (`ls`, `cd`, `cat` path resolution): unit test with a small fixture tree covering root, nested dir, and not-found cases.
- **Resume/CV download**: cannot be meaningfully unit-tested (triggers browser download); verify manually and via a simple Playwright E2E asserting the `<a>` `href` matches the expected file path before click.
- **Responsive/reduced-motion**: manual QA checklist covering mobile terminal input, `prefers-reduced-motion` toggle in OS/browser dev tools, and touch-device cursor fallback.
