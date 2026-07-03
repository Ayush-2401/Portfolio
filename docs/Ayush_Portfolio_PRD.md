# Ayush Pandey — Interactive Portfolio Website
### Product Requirements Document (Agent-Ready Handoff)

**Owner:** Ayush Pandey (B.Tech ISE, Presidency University Bangalore)
**Purpose:** A dynamic, highly interactive personal portfolio + an in-browser interactive terminal that lets recruiters "query" Ayush like a CLI tool.
**Audience for this doc:** AI coding agents (Claude Code / Cursor / Antigravity, etc.) implementing the build in one or more handoff sessions.

---

## 1. Vision & Design Direction

### 1.1 Reference site analysis — landonorris.com
The brief is to match the *feel*, not the *content*, of landonorris.com. What that site actually does, mechanically:

- **Full-bleed, oversized typography** as the hero — the name itself is the dominant graphic element, not a photo.
- **Scroll-locked hero** ("tap to lock / back to scroll") — the first viewport holds the visitor briefly before releasing them into the page, building anticipation.
- **Horizontal-scrolling photo rail** in the middle of an otherwise vertical page — a deliberate rhythm break.
- **Hover-swap image cards** (base image → hover image) for the "Helmets Hall of Fame" grid — every tile has a resting state and an alive state.
- **One bold accent color** (lime green) used sparingly against near-black/white — never decorative, always a signal ("this is clickable / this is a highlight").
- **Section headers split across two lines in huge type** ("ON / TRACK") used as visual anchors between content blocks.
- **Marquee/logo strip** for partners — infinite horizontal scroll of trust signals.
- **Custom cursor states, magnetic buttons, micro-copy** ("Load Norris") that inject personality into utilitarian UI moments.
- Real-time, motion-first — almost every element has a resting state and a triggered state.

### 1.2 Translating this to a student/developer portfolio
You don't have race photos — you have **code, projects, and documentation**. The equivalent moves:

| Lando Norris mechanic | Ayush portfolio equivalent |
|---|---|
| Oversized name hero with scroll-lock | Hero with your name in huge kinetic type + a live-typing terminal prompt as the sub-element that "unlocks" scroll |
| Horizontal photo rail | Horizontal project rail — scroll sideways through project cards with GitHub stat badges |
| Hover-swap image grid (Helmets) | Hover-swap **tech stack grid** — resting state shows icon, hover state shows a mini code snippet or usage example |
| Lime green accent | Pick ONE accent (see 1.4) used only for CTAs, links, and terminal cursor/prompt |
| "ON TRACK / OFF TRACK" giant section dividers | "BUILD / SHIP" or "CODE / DEPLOY" giant dividers between Projects and Experience |
| Partner logo marquee | Tech-stack / tools marquee (Java, React, FastAPI, Android Studio, Git, etc.) infinite scroll |
| Custom cursor + magnetic buttons | Same — magnetic buttons on every CTA, custom cursor that morphs near clickable elements |

### 1.3 Non-negotiable constraint from the brief
Do **not** clone landonorris.com's layout, imagery, or copy. Only reuse the underlying *interaction patterns* listed above, reskinned entirely around Ayush's content and a dev/terminal aesthetic.

### 1.4 Visual identity (agent should propose 2–3 options, but a strong default)
- **Base palette:** near-black background (`#0A0A0A` / `#0D0F12`), off-white text (`#F2F2F0`), one electric accent — recommend **terminal green** (`#39FF88` or `#00FF9C`) or **electric violet** (`#8B5CF6`) to differentiate from the generic "hacker green" cliché if he wants to stand out.
- **Typography:** A geometric/monospace pairing —
  - Display: `Space Grotesk` or `General Sans` (matches the "Ledger Punk" identity already used in FlatLedger — reuse for brand consistency across his projects)
  - Body: `Inter`
  - Terminal/code: `JetBrains Mono` (already his established mono choice)
- **Motion language:** ease-out cubic-bezier on entrances, spring physics on hover states, 60fps target, `prefers-reduced-motion` fallback mandatory.
- **Grain/texture (optional):** a subtle noise overlay (like Emanuele Milella's site) adds tactility without hurting performance if done as a CSS `background-image` data-URI, not a video.

---

## 2. Site Structure (Single-Page Scroll, sectioned)

1. **Hero** — kinetic name, role tagline, live terminal snippet auto-typing "whoami", scroll-lock micro-interaction, magnetic CTA ("Enter Terminal" / "Scroll to explore")
2. **About** — short bio, horizontally-scrolling "now playing" style facts (CGPA, university, current focus)
3. **Tech Stack Marquee** — infinite scroll logo strip + hover-swap grid (icon → code snippet)
4. **Projects** — horizontal-scroll rail (desktop) / swipeable cards (mobile): FlatLedger, SLAM Navigation, Traventure, Flight Aggregator, Scientific Calculator, Interactive Visual Sandbox. Each card: cover art (generated/abstract, not stock), tech badges, one-line pitch, links to GitHub/live demo, and a "cat project.md" terminal easter egg link.
5. **Experience/Timeline** — vertical scroll-triggered timeline (coursework highlights, certifications: NPTEL LLMs, NPTEL VR/AR)
6. **Interactive Terminal Section** — the centerpiece feature (full spec in Section 3)
7. **Contact** — magnetic social icons, email copy-to-clipboard with confirmation micro-animation, optional contact form
8. **Footer** — big closing statement in oversized type (mirrors "Always bringing the fight." device), GitHub stats widget (self-hosted per his existing plan), signature-style flourish

---

## 3. Interactive Terminal — Full Feature Spec

### 3.1 Concept
A real, keyboard-driven terminal component embedded in the page (not a separate app) styled like a proper CLI (macOS/Linux terminal chrome: traffic-light dots, blinking block cursor, monospace, scanline flicker optional). Visitors type commands to retrieve information about Ayush — including triggering a real file download for resume/CV.

### 3.2 Recommended implementation approach
- Build a **custom lightweight terminal component** (don't pull in jQuery Terminal — keep the stack modern React/Vue + vanilla state machine) for full control over styling and mobile behavior. Reference `xterm.js` only if a truly authentic terminal renderer is wanted; otherwise a custom `<input>` + scrollback `<div>` is lighter and easier for an agent to build correctly.
- Maintain a **virtual file system** object (JS object tree) so `ls`, `cd`, `cat` behave consistently — this also gives you `resume.pdf` and `cv.pdf` as literal "files" a visitor can `cat` or `download`.
- Command parser: split input → match against a command table → execute handler → append output block to scrollback → auto-scroll to bottom.
- Command history: Up/Down arrow cycles previous commands (store in array + index pointer).
- Tab-completion for command names and file names (nice-to-have, high delight-to-effort ratio).

### 3.3 Command table (baseline — agent should implement all of these)

| Command | Behavior |
|---|---|
| `help` | Lists all available commands with one-line descriptions |
| `whoami` | Prints short identity blurb (name, role, university) |
| `about` | Longer bio paragraph |
| `skills` | Categorized skill list (Java Full-Stack, Computer Vision, Android, AI-assisted dev, etc.) rendered as ASCII-bar skill meters |
| `projects` | Lists project names; `projects <name>` opens/scrolls to that project card |
| `resume` | Triggers **actual file download** of `Ayush_Pandey_Resume.pdf`, prints "Downloading resume.pdf..." with a fake progress bar animation, ends with success line |
| `cv` | Same as above but downloads the multi-page CV PDF |
| `contact` | Prints email (click-to-copy), GitHub, LinkedIn as clickable terminal links |
| `socials` | Lists social links with icons rendered as ASCII/Unicode glyphs |
| `education` | Prints CGPA, semester, university, certifications |
| `cat <file>` | e.g. `cat resume.pdf` triggers same download as `resume`; `cat about.md` prints bio — reinforces the file-system metaphor |
| `ls` | Lists "files" in current virtual directory (`resume.pdf`, `cv.pdf`, `projects/`, `contact.txt`, `skills.json`) |
| `cd <dir>` | Navigate virtual directories (`projects/`, `education/`) — changes prompt path |
| `clear` | Clears scrollback |
| `theme <name>` | Switches terminal color theme (matrix / amber / dracula / light) — also nice-to-have global site theme toggle |
| `sudo make me a sandwich` | Classic XKCD easter egg joke response |
| `matrix` | Triggers a brief falling-code animation overlay for fun |
| `neofetch` | Prints a stylized system-info block but about Ayush instead of a machine (OS: "AyushOS", Uptime: age/years coding, Shell: "curiosity", Packages: project count) — a well-loved dev in-joke, high shareability |
| `history` | Shows command history for the session |
| `exit` / `gui` | Smooth-scrolls back up to the visual (GUI) portfolio from the terminal section |
| unknown command | `command not found: <input>. Type 'help' to see available commands.` |

### 3.4 Resume/CV download — technical note for the agent
- Host `resume.pdf` and `cv.pdf` as static assets in `/public`.
- On `resume`/`cv`/`cat resume.pdf`, trigger a programmatic `<a download>` click (no page navigation), **and** print terminal feedback so the action feels acknowledged, not silent:
  ```
  $ resume
  Locating file... /home/ayush/resume.pdf
  [██████████████████████████] 100%
  ✓ Download started: Ayush_Pandey_Resume.pdf
  ```
- Keep this fast — no artificial delay beyond ~600–900ms total for the fake progress bar, or it reads as slow rather than delightful.

### 3.5 Mobile behavior
- Terminal must have a mobile-friendly on-screen input bar (native mobile keyboards don't do arrow-key history well) — add small "↑ previous command" and a row of quick-tap command chips (`help`, `resume`, `projects`, `contact`) above the input so touch users aren't forced to type everything.

---

## 4. Additional Interactive / "Crazy" Features (researched, ranked by impact-to-effort)

These are drawn from current (2026) award-winning portfolio patterns (Awwwards Site-of-the-Day sites like OHZI Interactive, Dave Holloway, Unseen Studio, and recent Codrops scroll-driven builds) — filtered down to what's realistic for a solo build with AI-agent implementation.

**High impact, low-to-medium effort — do these first:**
1. **Magnetic buttons/links** — element subtly pulls toward cursor within a radius, snaps back on leave. Cheap dopamine, used everywhere in award-winning sites.
2. **Custom cursor** — default cursor hidden; a small dot/ring follows the pointer and morphs (grows, changes color, shows a label like "VIEW" or "OPEN") when hovering interactive elements.
3. **Hover-swap project cards with 3D tilt** — card tilts toward cursor position (max ~10–15°) with a specular highlight, like the OHZI/Dave Holloway examples.
4. **Scroll-triggered reveal animations** — text/images fade-and-rise into view on scroll (IntersectionObserver-driven, not scroll-jank-prone).
5. **Command-palette (⌘K) style quick nav** — separate from the terminal; a `Cmd+K`/`Ctrl+K` spotlight search to jump to any section — dev-audience-friendly and trendy.
6. **Live GitHub stats pulled at build/runtime** — since he's already fixing broken stat widgets, self-host a small serverless function or static JSON refresh instead of relying on flaky third-party badge services.
7. **Animated skill bars / radar chart** — rendered with something like Recharts, animates in on scroll.
8. **Copy-to-clipboard micro-interactions** — email/phone with a satisfying checkmark + toast confirmation.
9. **Dark/matrix "easter egg" konami code** — typing the Konami code anywhere on the site triggers a fun full-screen animation (ties in nicely with the terminal's hacker aesthetic).

**Medium impact, higher effort — do if time allows:**
10. **Horizontal scroll-jacked project rail** — GSAP ScrollTrigger converting vertical scroll into horizontal movement through project cards (matches the Lando Norris photo-rail mechanic directly).
11. **WebGL/shader background in the hero** — subtle particle field or gradient distortion that reacts to cursor position (Three.js + simple GLSL shader — an agent can scaffold this with `@react-three/fiber` reasonably fast).
12. **Live "now" status widget** — pulls from a small API/JSON you update (e.g. "Currently building: Interactive Visual Sandbox" / "Last commit: 2h ago") to make the site feel alive rather than static.
13. **Sound design (optional, muted by default)** — subtle UI click/hover sounds toggled by the user, never autoplaying — a nice polish touch used by high-end studio portfolios (see Codrops' recent 3D-world portfolio piece), but skip if it risks feeling gimmicky for a recruiter audience.
14. **Terminal "chat" mode** — extend the terminal so unrecognized input is answered by a small canned-response FAQ engine (not a full LLM call) about Ayush — a light version of what some terminal-portfolio builders (e.g. Jankiewicz's terminal chat) have done.

**Nice-to-have / stretch:**
15. **Konami-triggered mini-game** (e.g. a tiny Flappy-Bird-style clone using his SLAM/CV skills as a wink) — pure delight, zero business value, only if he wants a standout talking point in interviews.
16. **Theme-aware favicon and OG image** that changes with terminal theme selection.
17. **Print-optimized resume view** — a hidden `/resume` route with clean print CSS, so `resume` command can also open a viewable page, not just force-download.

**What to deliberately skip:** full WebGL "scroll-driven 3D world" (Codrops example) — beautiful but multi-week effort (Three.js + Blender assets + GSAP choreography) and diminishing returns for a recruiter skimming in 90 seconds. Recommend reserving that ambition for a v2 once the core site is shipped and time allows.

---

## 5. Recommended Tech Stack

- **Framework:** Next.js (React) — SSG/SSR for SEO on a portfolio, easy Vercel deployment (already his plan for GitHub stats self-hosting, so infra stays unified)
- **Styling:** Tailwind CSS + CSS variables for theme switching
- **Animation:** Framer Motion (component-level transitions, magnetic buttons, reveal-on-scroll) + GSAP/ScrollTrigger (horizontal rail, complex scroll choreography)
- **3D/shader (optional hero):** `@react-three/fiber` + `drei`
- **Terminal state:** custom React component + Zustand/Context for command history & virtual FS state
- **Charts (skills):** Recharts
- **Deployment:** Vercel (matches his existing self-hosting plan for the GitHub stats widget)
- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (terminal/code)

---

## 6. Build Order (for the AI agent handoff)

1. Scaffold Next.js + Tailwind + fonts + design tokens (colors, spacing, type scale)
2. Static layout: Hero → About → Tech Marquee → Projects → Experience → Contact → Footer (no animation yet, get content correct first)
3. Add motion layer: scroll reveals, magnetic buttons, custom cursor
4. Build the Terminal component in isolation (virtual FS, command parser, history, resume download) — test thoroughly since it's the centerpiece
5. Wire terminal into page as its own section + optional floating "toggle terminal" button accessible from anywhere
6. Add stretch interactive features from Section 4 in priority order
7. Performance pass: lazy-load below-fold sections, compress assets, Lighthouse audit (target 90+ mobile performance even with animation)
8. Accessibility pass: `prefers-reduced-motion`, keyboard navigation for terminal, alt text, color contrast on the accent color against background

---

## 7. Open Questions for Ayush (agent should ask if not already decided)
- Final accent color: terminal green vs. electric violet vs. something else?
- Should the terminal be the *first* thing visitors see (terminal-first landing) or a section within a normal scroll page (as spec'd above)?
- Final resume/CV files ready as PDF assets, or do those need generating first?
- Any preference on sound design (on/off entirely)?
