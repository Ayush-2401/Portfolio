# Ayush Kumar Pandey — Portfolio Website
### Development Workflow Document (Agent-Ready)

Companion to the PRD, UI/UX Spec, and Technical Architecture doc. This defines *how* an AI coding agent (or a sequence of agent sessions) should approach building this project — order of operations, definition of done per phase, and handoff hygiene between sessions.

---

## 1. How to Use This Document

Each phase below has: a goal, concrete tasks, and a "definition of done" checklist. An agent starting a fresh session should:
1. Read the PRD, UI/UX Spec, and Technical Architecture doc first (in that order).
2. Check which phase the repo is currently in (look for a `PROGRESS.md` at repo root — create one if it doesn't exist yet, see §7).
3. Continue from the first unchecked item in the current phase. Don't restart earlier phases unless something is visibly broken.

---

## 2. Phase 0 — Scaffold & Design Tokens

**Goal:** A running Next.js app with the full design system wired up but no real content or animation yet.

Tasks:
- Initialize Next.js (App Router) + TypeScript + Tailwind.
- Implement all design tokens from UI/UX Spec §2 as Tailwind theme extension + CSS custom properties in `globals.css`.
- Set up `next/font` for Space Grotesk, Inter, JetBrains Mono.
- Build a bare-bones typography/component test page (`/dev/style-guide` route, removable before launch) to visually verify tokens render correctly — this catches token mistakes early instead of after 10 components are built on top of a bug.

**Definition of done:** Style guide page shows correct fonts, colors, spacing at both mobile and desktop widths. No console errors.

---

## 3. Phase 1 — Static Structure & Real Content

**Goal:** Every section from PRD §2 exists, in order, with real copy and project data — zero animation, zero terminal. This is deliberately "boring" so content accuracy is verified before motion complexity is layered on.

Tasks:
- Populate `lib/content/projects.ts`, `skills.ts`, `experience.ts`, `site-copy.ts` with Ayush's real information (pull from resume/CV content already generated in prior sessions if available, rather than inventing placeholder copy).
- Build each section component per PRD §2 order: Hero, About, Tech Marquee, Projects (grid is fine at this stage, rail comes in Phase 3), Experience, Terminal (static placeholder box only), Contact, Footer.
- Confirm resume/CV PDF files exist in `public/files/` — if not, flag this back to Ayush rather than proceeding with a broken link.

**Definition of done:** Full page scrolls top to bottom with real content, responsive at mobile/tablet/desktop, no broken links or placeholder lorem ipsum remaining anywhere.

---

## 4. Phase 2 — Terminal Subsystem (build in isolation)

**Goal:** The terminal works completely as its own component before being wired into the page, per Technical Architecture §4.

Tasks:
- Implement `virtualFileSystem.ts` and `commandRegistry.ts` per the contract in the architecture doc.
- Implement `Terminal.tsx` shell (chrome, scrollback, blinking cursor, input handling, history via Up/Down).
- Implement every command from PRD §3.3 — check off each one individually, don't batch-approve.
- Implement resume/cv download flow with the fake progress-bar sequence.
- Add mobile quick-command chips + safe-area input positioning.
- Manually test every command listed in the PRD's command table, including the unknown-command fallback and easter eggs.

**Definition of done:** Every command in PRD §3.3 works correctly on both desktop (keyboard) and mobile (touch + chips). `resume`/`cv` trigger real file downloads. `aria-live` announces new output (spot-check with a screen reader or browser accessibility tree inspector).

---

## 5. Phase 3 — Motion & Interaction Layer

**Goal:** Layer in every interaction spec from UI/UX Spec §3 on top of the now-correct static structure.

Suggested order (roughly low-risk to high-risk):
1. Scroll-reveal pattern (§3.9) — global, low risk, high visual payoff.
2. Magnetic buttons (§3.2) + custom cursor (§3.3), with touch-device fallback per §4 of the UI/UX spec.
3. Hover-swap tech grid (§3.6) and marquee (§3.5).
4. Section dividers with scroll-triggered reveal (§3.7).
5. Project card tilt + hover states (§3.4).
6. Horizontal scroll-jacked project rail (GSAP ScrollTrigger) — highest technical risk, do last among motion work so a bug here doesn't block everything else being reviewable.
7. Hero kinetic name stagger + scroll-lock (§3.1) — do this last of all animation work since it's the first thing visitors see and deserves the most polish/iteration time once everything else is stable.

**Definition of done:** Every interaction listed above works at 60fps on a mid-range device (not just a dev machine), respects `prefers-reduced-motion`, and degrades gracefully (no cursor-follow, no tilt) on touch devices.

---

## 6. Phase 4 — Stretch Features (prioritized per PRD §4)

Only start this phase once Phases 0–3 are fully done and reviewed. Pull from the PRD's ranked list in order:
1. Command palette (Cmd/Ctrl+K quick nav)
2. Konami code easter egg
3. Live GitHub stats (self-hosted per Ayush's existing plan)
4. Animated skill bars/radar chart
5. WebGL/shader hero background (only if time and performance budget allow — recheck Lighthouse score after adding)
6. Print-optimized `/resume` route
7. Anything further down the list only with explicit go-ahead from Ayush — don't silently scope-creep into sound design or a mini-game without confirming it's wanted.

---

## 7. Session Handoff Hygiene

Because this build will likely span multiple AI agent sessions, maintain a `PROGRESS.md` at repo root with this structure, updated at the end of every session:

```markdown
# Build Progress

## Current phase: [0-4]

## Completed
- [x] Phase 0: scaffold + tokens
- [x] Phase 1: static structure + content
- [ ] Phase 2: terminal subsystem (in progress — commands 1-12 of 19 done)

## Known issues / TODO
- resume.pdf placeholder still in use, needs real file from Ayush
- horizontal rail janky on Firefox, needs investigation

## Notes for next session
- Terminal `theme` command not yet wired to global site theme toggle — decide if it should be
```

This prevents each new agent session from re-deriving context from scratch or, worse, re-doing completed work differently and creating inconsistency.

---

## 8. Definition of "Launch Ready"

Before treating the site as done:
- [ ] All PRD §3.3 terminal commands functional
- [ ] Lighthouse mobile performance ≥ 90, accessibility ≥ 95
- [ ] All content reviewed by Ayush for accuracy (no placeholder text, correct project links)
- [ ] Resume/CV downloads verified on both desktop and mobile browsers
- [ ] `prefers-reduced-motion` verified end-to-end
- [ ] Cross-browser check: Chrome, Safari, Firefox (desktop), Safari iOS + Chrome Android (mobile)
- [ ] OG image / meta tags set for link previews when shared (LinkedIn, WhatsApp, etc. — relevant since this will be shared during internship outreach)
- [ ] Custom domain (if any) connected and HTTPS verified on Vercel
