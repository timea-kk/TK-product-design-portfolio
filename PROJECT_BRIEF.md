# PROJECT BRIEF: AI-Assisted Portfolio Website

**Document purpose:** Single source of truth for scope, technical decisions, and requirements. No implementation begins until this brief is approved.

---

## Who We're Building For (Context Only)

*This section gives the build team a clear picture of the portfolio owner. It is **not** site content — actual copy, project details, and metrics for the website will be supplied by the owner.*

**Structured CV reference:** For the About page and any narrative or project content, use **`CV_CONTEXT.md`** in this project. It contains the full career history, education, courses, and skills in editable form so we don’t rely on screenshots when drafting copy.

- **Portfolio owner:** Timea Konya — Senior Product Designer, Berlin.
- **Current context:** Long-term role at a mission-driven product company (sustainability, ethical design, large user base). Work spans onboarding experiments, conversion and retention at scale, design system scaling (component libraries, contribution workflows, cross-team use), and product launches with measurable business impact.
- **Career arc (summary):** Earlier roles include Product Designer at an esports startup (cross-platform apps, growth metrics, startup speed); UI Designer at a proptech company (10 apps, UI library scaling, B2B/B2C, software–hardware integration); Junior Product Designer (brand, end-to-end web/mobile, small team lead); and early experience in print production. Full detail in `CV_CONTEXT.md`.
- **Education & learning:** BA in Visual Arts (Graphic Arts); high school diploma in Computer Science/Mathematics. Ongoing front-end learning: Codecademy Front-End Engineer track; Memorisely AI Coding Bootcamp (Feb 2026); Figma MCP & Cursor Workshop (Dec 2025); Design Tokens Mastery (Nov 2025). Informs theming (tokens), tooling (Cursor/VS Code), and the “technical curiosity” angle of the site.
- **Values that should inform tone and priorities:** Sustainability and ethical design; passion for complex problems and design systems; love of using data to guide impactful design decisions; research-led strategy (user interviews, usability testing, data analysis); strong collaboration with engineers and cross-functional teams.
- **Evidence of specializations (for calibration only):** Growth work with quantified impact (conversion, retention, DAU, revenue); design systems at scale (many components, multiple libraries, health tracking, contribution processes); mixed-methods approach (qualitative research + quantitative analysis + experimentation); facilitation of design sprints, ideation, and strategy alignment. Skills include Design Systems, A/B Testing, Accessibility, Data Analysis, AI Tools & Prototyping, workshop facilitation, OKR/roadmapping — all of which the portfolio structure and growth layer should support.
- **Why this matters for the build:** The site should feel credible for someone who has shipped at scale and cares about systems, accessibility, and ethics. The growth personality layer (Section 8) should feel intelligent and experiment-aware, not gimmicky. Case study structure should support problem → role → process → outcomes → metrics → impact. Tone should be professional, clear, and aligned with sustainability and inclusive design values. The owner uses Figma, Cursor, and VS Code and is comfortable with design-token thinking — theming and code explanations can assume design literacy and beginner-level coding.

---

## Design & portfolio inspiration

Two reference portfolios the owner likes. Use for tone, structure, and craft — **not** for copying content or layout verbatim.

| Portfolio | Link | Why it’s referenced |
|-----------|------|----------------------|
| **Andy Weir** | [andyryanweir.com](https://www.andyryanweir.com/) | Hand-coded Product Designer portfolio. Use as inspiration for a fully coded, designer-led site. |
| **Ben Shih** | [benshih.design](https://www.benshih.design/) | Senior Growth Product Designer \| AI & Growth Design. Strong growth-design positioning (“Data x AI x Design”), clear hero + “Explore my projects,” case studies with tags (e.g. #Growth design, #0 to 1), outcome metrics in cards (e.g. “activation rate by 19%”), side projects and articles sections, casual-but-professional tone (“Hey, this is Ben”). Good reference for growth personality, case study presentation, and information hierarchy. |

When making design or content-structure decisions, consider what works in these sites (e.g. scannable project cards, visible metrics, clear navigation between Work / About / Projects) and adapt to this project’s requirements and accessibility standards.

---

## Current site (content reference)

The new coded portfolio will **recreate and replace** the owner’s current Framer site. Use the live site as the **content and structure reference** for what we’re building — not for visual or technical implementation.

**Homepage:** [timea-kk.framer.website](https://timea-kk.framer.website/)

**Pages we are recreating (start with these):**

| Page | URL |
|------|-----|
| About me | [timea-kk.framer.website/about-me](https://timea-kk.framer.website/about-me) |
| Building Ecosia’s Onboarding Experience | [timea-kk.framer.website/project-ecosia-onboarding-experiments](https://timea-kk.framer.website/project-ecosia-onboarding-experiments) |
| Scaling Design Operations at Ecosia | [timea-kk.framer.website/project-ecosia-ops](https://timea-kk.framer.website/project-ecosia-ops) |
| Install Funnel for the Ecosia Browser | [timea-kk.framer.website/project-ecosia-browser](https://timea-kk.framer.website/project-ecosia-browser) |

There are **more projects** on the current site; we will add those as separate project pages **after** these four are done. Plan the architecture so adding more project routes is straightforward.

**Tools for learning & growth (optional / TBD):**  
On the current homepage, lower on the page, there is a section “Tools for learning & growth” with three Notion-based guides:

- [Guide to Giving and Receiving Feedback](https://www.notion.so/Guide-to-Giving-and-Receiving-Feedback-28ec6a2b481d8084af91e6b52d523470)
- [Guide to Assertive Communication](https://www.notion.so/Guide-to-Assertive-Communication-28ec6a2b481d80fa898fd1deede0a40c)
- [Guide to Unpacking Annual Feedback](https://www.notion.so/Guide-to-Unpacking-Annual-Feedback-28fc6a2b481d801f90a2cc4031ff444f)

The owner is **unsure whether these bring enough value** to keep. For the first phase, **do not** implement this section unless the owner decides to include it. If included later, it can be a simple list of links with short descriptions (same as current).

---

## 1. Overview

### Who You Are
- **Role:** Senior Product Designer
- **Specializations:**
  - Growth & experimentation
  - Optimization & metrics-driven design
  - Design systems
  - Accessibility
  - Cross-functional product thinking
- **Values:** Sustainability and ethical design; data-driven, research-led decisions; systems thinking.
- **Background:** Recently completed an AI coding bootcamp for designers; learning front-end development.

### Project Purpose
This portfolio will:
- Showcase product and growth work (with room for quantified outcomes and impact)
- Demonstrate systems thinking and design-system experience
- Reflect accessibility and ethical-design values
- Signal technical curiosity and coding literacy
- Show AI-assisted development capability

### Delivery Format
- **Fully coded website** — not no-code, not Framer.
- All content static; no backend, CMS, or database.

---

## 2. Technical Stack (Locked)

| Layer | Choice | Notes |
|-------|--------|--------|
| Build tool | **Vite** | Fast dev server, optimized production builds |
| UI framework | **React** | Component-based, widely understood |
| Styling | **Tailwind CSS** | Utility-first, theming-friendly |
| Deployment | **GitHub Pages** | Static deployment only |

### Constraints
- No backend
- No CMS
- No database
- All content stored locally in the project

### Collaboration Assumptions
- You understand design deeply.
- You are a beginner in code.
- You cannot make engineering architecture decisions yourself.
- All architectural decisions must be explained in plain language before implementation.
- Every file must contain clear comments: what the file does, what each major block does, and why decisions were made.

---

## 3. Site Structure

### 3.1 Home Page
- **Hero section** with positioning statement (e.g. “A Growth Product Designer” / “Currently Senior Product Designer @ Ecosia” — ref. current Framer site)
- **Short intro** about you
- **Featured projects** — phase 1: the 3 case studies we’re building (Onboarding, Design Ops, Ecosia Browser); add more project cards as more project pages are added
- **Clickable project cards**
- **Subtle micro-interactions**
- **Growth personality elements** (see Section 8; e.g. microcopy under CTA like “This button performs +23% better than the old one”)

### 3.2 About Page
- Professional journey
- Growth specialization
- Design systems philosophy
- Sustainability / ethical design (as part of narrative, if desired)
- Interest in coding
- AI bootcamp mention
- Accessibility values
- Optional: mention of ADHD and cognitive accessibility awareness

### 3.3 Project Pages
- Each project has its own **dedicated route/page**.
- **Phase 1 (start with these 3 case studies):** Building Ecosia’s Onboarding Experience; Scaling Design Operations at Ecosia; Install Funnel for the Ecosia Browser. More projects will be added later (architecture should make adding new project routes easy).
- Each project page must include:
  - Problem statement
  - Your role
  - Process
  - Outcomes
  - Growth metrics
  - Impact
  - Clear storytelling structure
  - Clean visual hierarchy

### 3.4 Tools for learning & growth (optional / TBD)
- On the current Framer site, the homepage includes a section linking to three Notion guides (feedback, assertive communication, unpacking annual feedback). Owner is undecided on value. **Do not implement in phase 1** unless the owner asks for it. If added later: simple list of links with short descriptions.

---

## 4. Navigation

- **Persistent header navigation**
- Links to: **Home**, **About**, **Projects**
- **Theme picker** (see Section 5)
- **Accessibility icon** (opens accessibility panel; see Section 6)
- **Fully responsive**
- **Mobile-first** layout
- **Keyboard accessible**

---

## 5. Core Feature: Theme System (Critical)

### Requirement
A **global theme picker** that switches between distinct visual themes.

### Themes (initial set)
The designprompts.dev pages below are **inspiration for the general vibe only** — not to be copied. Colors, typography, and UI tone should feel **similar in spirit** to each reference but be **adapted and original** for this portfolio (no copy-paste of those designs).

The following themes must be implemented; more may be added later.

- **Bauhaus** — vibe reference: [designprompts.dev/bauhaus](https://designprompts.dev/bauhaus)
- **Terminal** — vibe reference: [designprompts.dev/terminal](https://designprompts.dev/terminal)
- **Neo-brutalism** — vibe reference: [designprompts.dev/neo-brutalism](https://designprompts.dev/neo-brutalism)
- **Sketch** — vibe reference: [designprompts.dev/sketch](https://designprompts.dev/sketch)
- **Retro** — vibe reference: [designprompts.dev/retro](https://designprompts.dev/retro)
- **Material Design** — vibe reference: [designprompts.dev/material-design](https://designprompts.dev/material-design)

### Theme Switching Must
- Change **typography**
- Change **color system**
- Change **UI tone**
- **Maintain accessibility contrast standards** (WCAG AA)
- **Persist across pages** (e.g. local storage)
- Be **architected cleanly and modularly**

### Technical Approach
- Use a **scalable theming approach** (e.g. CSS variables + Tailwind configuration).
- Before implementation, explain:
  - How themes are structured
  - How switching works
  - How to add a new theme

---

## 6. Accessibility System (Very Important)

Accessibility is a **core value**. The site must:

- Meet **WCAG AA** standards
- Use **semantic HTML**
- Have **proper contrast ratios**
- Be **fully keyboard navigable**
- Include **clear focus states**
- Use **ARIA only where appropriate** (not as a substitute for semantics)

### Accessibility Panel (Feature)
An **accessibility icon in the header** opens a panel that allows users to:

- **Reduce motion** (disable animations)
- **Increase contrast** mode
- **Increase text size**
- **Persist** user preferences (e.g. local storage)

### Reduced Motion Must
- Disable animations
- Disable scroll-triggered effects
- Respect `prefers-reduced-motion` (system preference)

Implementation of the accessibility system must be **clearly explained** in the codebase and in any architecture overview.

---

## 7. Motion & Micro-Interactions

### Include
- Subtle **hover states**
- **Button** micro-interactions
- **Scroll-triggered** animations (where appropriate)
- **Smooth transitions**
- Optional **light page transitions**

### Constraints
- Motion must be **subtle**
- Motion must be **disable-able** (via accessibility panel)
- Motion must **not cause cognitive overload**

---

## 8. Growth Personality Layer

Add **subtle growth-oriented “quirks”** in the UI to reinforce positioning as a growth designer.

### Examples
- Microcopy under buttons (e.g. *“This button performs 12% better than the last one.”*)
- Fake A/B labels (e.g. “Variant B”)
- Tooltips referencing experiments
- Small metric callouts
- “Optimized for conversion” notes

### Tone
- **Subtle**
- **Intelligent**
- **Not gimmicky**
- Reinforce growth/experimentation positioning
- Feel credible for someone who has shipped experiments and design systems at scale (e.g. conversion, retention, component libraries, cross-team impact)

---

## 9. Performance Requirements

The site must:

- Be **optimized for fast loading**
- **Avoid heavy dependencies**
- **Optimize images**
- Follow **best practices**

### Lighthouse Targets
- Aim for **Lighthouse score 90+** in:
  - Performance
  - Accessibility
  - Best Practices

Before or during implementation, explain:
- What Lighthouse measures
- How we optimize for it

---

## 10. Analytics

Implement **lightweight analytics**.

### Track
- Page views
- Project clicks
- Button interactions

### Documentation
Explain:
- What is being tracked
- Where tracking is implemented
- How you could run simple experiments later (e.g. A/B ideas)

### Constraint
- **Avoid heavy analytics frameworks**; keep it minimal.

---

## 11. Responsiveness

All pages must:

- Be **mobile-first**
- Work across **breakpoints**
- Use **scalable layout systems**
- **Avoid layout breaks**
- Be **tested** across common device sizes

---

## 12. Collaboration Process

### Before Any Implementation
The following must be proposed and approved first:

1. **Final architecture overview**
2. **Folder structure**
3. **Routing strategy**
4. **Theming strategy**
5. **Accessibility architecture**

Then **pause for your approval** before writing implementation code.

### Do Not
- Over-engineer
- Use unnecessary abstraction
- Dump full code without explanation

### If Unclear
- Ask clarifying questions before implementation.

---

## Before we start: quick decisions

These don’t need to be in the brief forever — just confirmed so the architecture and first build don’t assume wrong.

| Topic | Question | Default if you don’t specify |
|-------|----------|-----------------------------|
| **Copy** | Use the current Framer site (and `CV_CONTEXT.md`) as the source for all phase 1 page content? | Yes — we’ll recreate from there; you can edit copy in the repo later. |
| **Images** | Case studies and About may use images (screenshots, diagrams, photo). How should we handle them in phase 1? | Use **placeholders** (e.g. neutral rectangles or simple illustrations); you replace with real assets when ready. |
| **Footer** | Do you want a footer with e.g. LinkedIn, Download CV, contact email? (Your Framer site has these.) | Yes — include a simple footer with LinkedIn + Download CV (+ optional email). |
| **Analytics** | Any preference for the lightweight analytics tool (e.g. Plausible, Umami, or defer until after launch)? | Defer exact tool; architecture will leave a clear place to add a script or hook. |

Once these are confirmed (or the defaults are fine), the next step is the **architecture proposal** — no code until you approve that.

---

## Approval

- [ ] I have reviewed this brief.
- [ ] I approve the scope and requirements as stated.
- [ ] Quick decisions above: confirmed or I’ve noted changes.
- [ ] I am ready for the next step: architecture proposal (folder structure, routing, theming, accessibility) — **then** implementation.

*Once you confirm approval, the next deliverable will be the architecture overview and explanations only; no code until you approve that as well.*
