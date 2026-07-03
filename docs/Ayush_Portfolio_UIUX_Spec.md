# Ayush Kumar Pandey — Portfolio Website
### UI/UX Design Specification (Agent-Ready)

Companion document to `Ayush_Portfolio_PRD.md`. This file defines the concrete visual system, layout rules, component states, and interaction micro-specs an agent needs to implement the design consistently — no ambiguity left to interpretation.

---

## 1. Design Principles

1. **Every interactive element has two states minimum: resting and alive.** Nothing on this site should look inert. Buttons, cards, icons, links — all respond to proximity or hover.
2. **One accent, used with intent.** The accent color never appears decoratively — only on things that are clickable, currently focused, or a key data point (skill bar fill, terminal cursor, active nav link).
3. **Typography carries hierarchy, not color.** Scale and weight do the work; color stays restrained.
4. **Motion has purpose.** Every animation should either (a) guide attention, (b) confirm an action, or (c) add personality at a moment of delight (terminal responses, easter eggs). No motion "because it's cool."
5. **The terminal is a first-class citizen, not a gimmick bolted on.** Its visual language (monospace, scanlines, blinking cursor) should echo subtly elsewhere on the site — e.g. code-style brackets around section labels, monospace used for metadata (dates, tech tags).

---

## 2. Design Tokens

### 2.1 Color system

```css
:root {
  /* Base */
  --bg-primary: #0A0A0C;
  --bg-secondary: #111318;
  --bg-elevated: #17191F;
  --border-subtle: #24262E;

  /* Text */
  --text-primary: #F2F2F0;
  --text-secondary: #A0A3AD;
  --text-muted: #63666F;

  /* Accent — default recommendation: terminal green.
     Swap this single token if Ayush picks violet instead. */
  --accent: #39FF88;
  --accent-dim: #1E7A48;
  --accent-glow: rgba(57, 255, 136, 0.25);

  /* Semantic */
  --success: #39FF88;
  --warning: #FFC939;
  --error: #FF5C5C;

  /* Terminal-specific */
  --term-bg: #0D0F12;
  --term-header: #1A1D22;
  --term-text: #D7FFEA;
  --term-prompt: var(--accent);
}
```

*Alternate accent palette (violet variant, swap wholesale if chosen):* `--accent: #8B5CF6; --accent-dim: #4C2E8A; --accent-glow: rgba(139, 92, 246, 0.25);`

### 2.2 Typography scale

| Token | Font | Size (desktop) | Size (mobile) | Weight | Use |
|---|---|---|---|---|---|
| `--font-display` | Space Grotesk | 96–140px | 44–64px | 700 | Hero name, section dividers |
| `--font-h1` | Space Grotesk | 56px | 32px | 600 | Section titles |
| `--font-h2` | Space Grotesk | 32px | 24px | 600 | Card titles |
| `--font-body` | Inter | 16–18px | 15px | 400 | Paragraphs |
| `--font-small` | Inter | 13px | 12px | 400 | Meta, labels |
| `--font-mono` | JetBrains Mono | 15px | 14px | 400/500 | Terminal, tags, code refs |

Line height: 1.1 for display, 1.5 for body. Letter-spacing: -0.02em on display type, 0.02em on all-caps labels.

### 2.3 Spacing & grid

- Base unit: `8px`. All spacing values are multiples of 8 (8, 16, 24, 32, 48, 64, 96, 128).
- Max content width: `1280px`, centered, `padding-inline: 24px` mobile / `64px` desktop.
- Section vertical rhythm: `128px` desktop / `64px` mobile between major sections.

### 2.4 Radius & elevation

- Cards: `16px` radius.
- Buttons/pills: `999px` (full pill) for primary CTAs, `8px` for secondary/utility buttons.
- Elevation via subtle border (`--border-subtle`) + soft glow (`box-shadow: 0 0 40px var(--accent-glow)`) on hover/focus, not drop shadows — keeps the dark-mode aesthetic flat and intentional rather than skeuomorphic.

---

## 3. Component Specifications

### 3.1 Hero Section
- Full viewport height (`100svh` to handle mobile browser chrome correctly).
- Name renders in `--font-display`, split into individually animated characters or words (stagger-in on load, ~40ms stagger delay, ease-out).
- Sub-line: role tagline in `--font-mono`, typewriter-animates in after name settles.
- Below: a single-line live terminal preview (non-interactive, decorative) auto-typing `$ whoami` → response, looping every ~8s. This previews the real terminal section and signals "this site has a terminal" immediately.
- Scroll cue: small bouncing chevron + `--font-mono` label "scroll" — disappears after first scroll event.
- Optional scroll-lock: page doesn't release to normal scroll until hero animation completes OR user scrolls with intent (>200px scroll delta) — implement as a soft lock (max 1.5s delay), never a hard trap that frustrates impatient visitors.

### 3.2 Magnetic Button
- Detection radius: 80px from button center.
- On cursor within radius: button translates toward cursor position, max displacement 12px, using `transform: translate()` with spring easing (Framer Motion `type: "spring", stiffness: 150, damping: 15`).
- On cursor leave: snaps back to `translate(0,0)` with same spring.
- On click: quick scale-down (`0.96`) + scale-up bounce, ~150ms.

### 3.3 Custom Cursor
- Default OS cursor hidden (`cursor: none`) on desktop only — **always show native cursor on touch devices** (feature-detect, don't rely on viewport width alone).
- Custom cursor: 12px dot, `--accent` fill, `mix-blend-mode: difference` optional for contrast over any background.
- Hover states:
  - Over links/buttons: cursor grows to 48px ring, dot disappears, may show a short label (`"VIEW"`, `"OPEN"`, `"PLAY"`) in `--font-mono` inside the ring.
  - Over project cards: cursor shows `"→"` glyph.
  - Over terminal: reverts to a blinking block cursor style matching terminal aesthetic.
- Cursor position updates via `requestAnimationFrame`, not raw mousemove reflow, to avoid jank.

### 3.4 Project Card (horizontal rail)
- Fixed card width ~380px desktop, full-width minus padding on mobile (swipeable, one card per view).
- Resting state: cover art/abstract gradient, project title, 1-line pitch, tech tag chips (`--font-mono`, small pill outline).
- Hover state (desktop): 3D tilt toward cursor (max 12°, both axes), subtle specular highlight overlay following cursor position within card bounds, tech tags gain `--accent` border.
- Card footer: GitHub icon link + live demo link (if applicable) + a small terminal-glyph button that says "cat this project" — clicking scrolls to and auto-runs `cat projects/<name>.md` in the terminal section as a connective easter egg between GUI and CLI.

### 3.5 Tech Stack Marquee
- Infinite horizontal auto-scroll strip, two rows moving in opposite directions for visual interest (like the reference site's partner strip).
- Pause on hover (accessibility + lets user read).
- Logos rendered in monochrome (`--text-secondary`), shift to full color or `--accent` tint on individual hover.

### 3.6 Hover-Swap Tech Grid
- Grid of tiles, one per core skill/tool.
- Resting: icon + label centered.
- Hover: crossfade (200ms) to a mini code snippet or one-line usage example in `--font-mono` on `--bg-elevated` background — mirrors the Hall-of-Fame hover-swap mechanic from the reference site.

### 3.7 Section Divider ("BUILD / SHIP" style)
- Full-width, oversized `--font-display` text, two words stacked or split, scroll-triggered horizontal reveal (mask-wipe or letter-by-letter fade) as it enters viewport.
- Used exactly twice on the page (before Projects, before Terminal) — overuse dilutes the impact.

### 3.8 Terminal Component
- Window chrome: three traffic-light dots (non-functional, decorative, matches OS terminal convention), title bar text `ayush@portfolio:~$`.
- Body: `--term-bg`, `--font-mono`, scrollback area with auto-scroll-to-bottom on new output.
- Prompt line: `--term-prompt` colored `➜` + current virtual path + blinking block cursor (`::after` pseudo-element, `animation: blink 1s step-end infinite`).
- Input: visually merged into the prompt line (invisible `<input>` overlaying a styled fake-text render, or `contentEditable` span) — no visible browser input chrome (no default border/outline; custom focus ring instead).
- Output blocks: support colored text (success = `--accent`, error = `--error`, muted = `--text-muted`), ASCII-art blocks preserve `white-space: pre`.
- Mobile: sticky quick-command chip row above the input (see PRD 3.5), input bar pinned above the mobile keyboard using `env(safe-area-inset-bottom)` handling.

### 3.9 Scroll-Reveal Pattern (global)
- Elements start `opacity: 0; transform: translateY(24px)`.
- IntersectionObserver threshold `0.2`, triggers once (don't re-animate on scroll-back, it gets annoying on a portfolio a recruiter re-scrolls).
- Duration 500–700ms, ease `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out — reads as premium/snappy rather than sluggish).

### 3.10 Contact Section
- Email displayed in `--font-mono`, click-to-copy: on click, icon morphs to checkmark for 1.5s, small toast "Copied to clipboard" slides in from bottom.
- Social icons: magnetic (reuse 3.2 spec), each with custom cursor label on hover (`"GitHub"`, `"LinkedIn"`).

---

## 4. Responsive Behavior

| Breakpoint | Range | Key changes |
|---|---|---|
| Mobile | < 640px | Single column, swipeable cards replace horizontal rail, custom cursor disabled, terminal gets quick-command chips, hero type scales down ~55% |
| Tablet | 640–1024px | Two-column grids where relevant, rail becomes touch-scroll with snap points, magnetic effects reduced radius |
| Desktop | > 1024px | Full spec as described above |
| Large desktop | > 1600px | Cap max-width at 1280px content, let background/decorative elements extend full-bleed |

Touch devices: disable all cursor-following effects (custom cursor, magnetic buttons, tilt cards) — replace tilt-on-hover with a subtle tap-scale (0.98) for tactile feedback instead.

---

## 5. Accessibility Requirements

- Respect `prefers-reduced-motion: reduce` — disable parallax, tilt, magnetic pull, and hero stagger; keep only opacity crossfades at reduced duration.
- All interactive elements keyboard-navigable: terminal input auto-focuses on section scroll-into-view but must not steal focus if user is mid-keyboard-navigation elsewhere (use `IntersectionObserver` + a "has user interacted with page" flag, not automatic on mount).
- Color contrast: verify `--accent` on `--bg-primary` meets WCAG AA (4.5:1) for any text use; if it doesn't, use accent only for large text/graphics/borders, and lighten for small-text use cases.
- Terminal must be screen-reader-usable: input has `aria-label="Portfolio terminal command input"`, output region is `aria-live="polite"` so new terminal output is announced.
- All images/icons have descriptive `alt` text; decorative elements (cursor, particles) are `aria-hidden="true"`.

---

## 6. Content Tone & Microcopy Guidelines

- Terminal responses: dry, slightly witty, never corporate. Example tone: `"Compiling awesomeness... done."` is fine for a loading state; avoid anything that reads like marketing copy.
- Section labels use terminal/dev vocabulary sparingly: `~/about`, `~/projects`, `~/contact` as small `--font-mono` eyebrow labels above each section's real heading — reinforces the CLI theme without forcing every heading into jargon.
- Keep all body copy in plain, confident first person. No third-person "he" bio-speak.
