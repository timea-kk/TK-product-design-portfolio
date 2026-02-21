# Portfolio — Timea Konya

A static portfolio site for **Timea Konya** (Senior Product Designer). It includes six visual themes, an accessibility panel, and a typewriter-style hero headline. All content and behaviour are implemented in the project—no backend or CMS.

---

## What this project is

- **Purpose:** Showcases product and growth design work in a professional, accessible way.
- **Current scope:** One page: hero (with the typewriter line), short bio, and placeholder project cards. The structure supports adding About and project pages later.
- **Reference docs:** `PROJECT_BRIEF.md` contains the full brief; `CV_CONTEXT.md` contains the career and copy reference.

---

## Tech stack

| Layer | Tool | Role |
|-------|------|------|
| Dev server and build | **Vite** | Runs the preview server and produces the production build. |
| UI | **React** | The interface is built from reusable components (Header, HomePage, etc.). |
| Styling | **Tailwind CSS** | Utility classes for layout and appearance; themes and a11y control the underlying tokens (colors, fonts). |
| Icons | **Lucide React** | Supplies the accessibility icon in the header. |
| Deployment | **Static hosting** (e.g. GitHub Pages) | The built folder is uploaded; no server or database is required. |

---

## Getting started

```bash
# Install dependencies
npm install

# Run the dev server (typically http://localhost:5173)
npm run dev

# Build for production (output in dist/)
npm run build

# Preview the production build
npm run preview
```

---

## Project structure

```
Portfolio/
├── index.html              The single HTML page: empty area for the app + loads the app and applies the saved theme
├── package.json            Dependencies and scripts (dev, build, etc.)
├── vite.config.js          Vite settings (e.g. base path for GitHub Pages)
├── tailwind.config.js      Tells Tailwind which files to scan and how colors/fonts map to the theme
├── postcss.config.js       Runs Tailwind and Autoprefixer when building CSS
├── public/                 Static assets (served as-is, no build step)
│   ├── Logo.svg
│   ├── favicon.svg
│   └── LOGO-INSTRUCTIONS.md
├── src/
│   ├── main.jsx            Entry point: draws the app into the page and loads global styles
│   ├── App.jsx             Wraps the site in theme and accessibility, then renders HomePage
│   ├── index.css           Global styles: Tailwind, default colors/fonts, a11y, typewriter cursor
│   ├── themes/
│   │   └── index.css       One block per theme (Bauhaus, Terminal, etc.): colors and fonts for each
│   ├── context/
│   │   ├── ThemeContext.jsx  Stores the selected theme and applies it across the page
│   │   └── A11yContext.jsx   Stores a11y options (motion, contrast, text size) and applies them
│   └── components/
│       ├── HomePage.jsx     Main page: hero, project cards, footer
│       ├── Header.jsx       Top bar: logo, Home link, theme switcher, a11y button
│       ├── Logo.jsx         Logo graphic (color comes from the active theme)
│       ├── RotatingDescriptor.jsx  Typewriter line in the hero, with cursor and highlight
│       ├── ThemeSwitcher.jsx        Theme dropdown in the header
│       └── A11yPanel.jsx    Panel opened by the a11y icon (reduce motion, high contrast, text size)
├── PROJECT_BRIEF.md
└── CV_CONTEXT.md
```

---

## How everything connects

The project can be understood in three parts: **what loads first**, **how the look is controlled**, and **what appears on the page**.

---

### 1. What loads first (when the site is opened)

**index.html** is the only HTML document. It:

- Defines an **empty area** where the app will be drawn.
- Tells the browser to **run the main app file** (`main.jsx`), which builds the interface.
- Runs a **small script** that applies the last saved theme immediately, so the page does not flash a default theme before the stored one is applied.

**main.jsx** is the entry point:

- It **loads the global styles** (`index.css`).
- It **draws the app** (starting with `App.jsx`) into that empty area. The header, hero, cards, and footer all come from React components started here.

**App.jsx** is the top-level wrapper:

- It **wraps the site** in two layers: theme, then accessibility. Every part of the site can then use the current theme and a11y options.
- It **loads the theme styles** (`themes/index.css`) so all six themes have their colors and fonts defined.
- It **renders the HomePage** (hero, projects, footer).

Order of execution: **index.html** → **main.jsx** (starts app and loads base CSS) → **App.jsx** (adds theme and a11y, loads theme CSS, renders HomePage).

---

### 2. How the look is controlled (themes and accessibility)

**Themes**

- **ThemeContext** stores the selected theme (Bauhaus, Terminal, etc.) and persists it so it survives refresh.
- When the theme changes, the **page receives a label** (e.g. `theme-bauhaus`). The file **themes/index.css** has one block per label; each block sets the colors and fonts for that theme. The site uses the same color names (e.g. brand, headline); the active theme block supplies the values.
- **ThemeSwitcher** is the dropdown in the header. Selecting a theme updates ThemeContext, which updates the page label and saves the choice. The Logo and all components that use theme colors and fonts update automatically.

**Accessibility**

- **A11yContext** stores the options from the accessibility panel (reduce motion, high contrast, text size), persists them, and applies them across the page (e.g. larger text, no animations).
- **index.css** contains the rules that respond to those options (e.g. when reduce motion is on, transitions and the typewriter cursor animations are disabled).
- **A11yPanel** is the panel opened by the a11y icon. Its checkboxes and text-size dropdown update A11yContext, which then updates the page.
- **RotatingDescriptor** (the typewriter) reads these settings. If reduce motion is enabled (from the panel or the system), it shows only the first phrase as plain text, with no typing or blinking.

In short: **ThemeContext** and **A11yContext** hold the settings; the **CSS files** define their visual effect; **ThemeSwitcher** and **A11yPanel** are the UI that change those settings.

---

### 3. What appears on the page (components)

**HomePage** is the main content:

- It renders the **Header** (logo, Home link, theme switcher, a11y button).
- Below that, the **hero**: “Hi, I’m” + logo + headline with **RotatingDescriptor** (the typewriter line) + bio paragraph.
- Then the **project cards** (placeholder data for now).
- Then the **footer**.

**Header** contains:

- The **Logo** (colour comes from the active theme).
- The **ThemeSwitcher** dropdown.
- The button that opens **A11yPanel** (the panel that appears below the header with reduce motion, high contrast, text size).

**RotatingDescriptor** is the rotating line in the hero:

- It cycles through phrases (e.g. “Growth Product Designer”, “Design systems enthusiast”).
- For each phrase it types character by character, then the cursor blinks twice, then the cursor fades out, then the line fades and the next phrase types in. Each character has the theme’s highlight colour behind it.
- If reduce motion is on (from the panel or the system), it shows only the first phrase with no animation.

**HomePage** composes **Header**, **Logo**, **RotatingDescriptor**, **ThemeSwitcher**, and **A11yPanel**. They all read the current theme and a11y settings from context, so changing theme or a11y updates the whole page.

---

### 4. Where settings and content are stored

- **Theme:** The selected theme is stored in the browser (localStorage) under `portfolio-theme`, so it persists across refreshes.
- **Accessibility:** The panel choices are stored (e.g. under `portfolio-a11y`) so they persist.
- **Content:** Text and project data live in the component files (e.g. the phrase list in RotatingDescriptor, the placeholder projects in HomePage). There is no database or CMS; changing copy or projects is done by editing those files.

---

### 5. The two style files

- **index.css** — Base layer: Tailwind, default colors and fonts, accessibility rules (reduced motion, high contrast), and the typewriter cursor animations. It defines the default look and the rules that respond to a11y.
- **themes/index.css** — Theme overrides only: for each theme (Bauhaus, Terminal, Sketch, etc.) it defines that theme’s colors and fonts. When the theme is switched, the page label changes and the matching block in this file applies. Some themes add extra rules (e.g. Sketch’s dot grid, Neo-brutalism’s sharp corners).

Components use Tailwind classes; many of those classes use theme or a11y variables, so changing theme or a11y updates the look across the site.

---

### 6. Config files

- **vite.config.js** — Vite settings. For GitHub Pages in a subfolder, the base path is set here.
- **tailwind.config.js** — Tells Tailwind which files to scan for class names and how colour/font names map to theme variables.
- **postcss.config.js** — Configures the build to run Tailwind and Autoprefixer on the CSS. It is rarely changed.

---

## Flow summary (what loads what)

1. **index.html** — The page: empty area, load main.jsx, apply saved theme to avoid a flash.
2. **main.jsx** — Loads global CSS and draws the app into that area (starting with App).
3. **App.jsx** — Wraps the app in theme and a11y, loads theme CSS, then renders HomePage.
4. **HomePage** — Renders Header (Logo, ThemeSwitcher, a11y button → A11yPanel) and hero (RotatingDescriptor), then project cards and footer.

Theme and a11y settings live in ThemeContext and A11yContext; the CSS files use them to control colours, fonts, motion, and text size across the site.

---

## Adding a new theme

1. In **ThemeContext.jsx**, add the new theme id to the themes list.
2. In **themes/index.css**, add a new block for that theme (copy an existing one and change colours/fonts).
3. In **ThemeSwitcher.jsx**, add the desired label to the dropdown (e.g. “My New Theme”).
4. In **index.html**, in the small script at the top, add the new theme id to the “valid” list so the saved theme is applied correctly on first load.

---

## Adding a new page (e.g. About)

1. Add a router (e.g. React Router) and in **App.jsx** define routes: one for Home, one for About (or Projects, etc.).
2. Create the new page component (e.g. AboutPage.jsx) and add a link in the Header (e.g. “About” next to “Home”).
3. For GitHub Pages, a redirect may be needed so that visiting a URL like `yoursite.com/about` directly still loads the app; the host’s documentation explains how.

---

## Reference docs

- **PROJECT_BRIEF.md** — Full scope, themes, accessibility, and collaboration approach.
- **CV_CONTEXT.md** — Career and copy used on the site.
- **AGENT_SETUP.md** — How to enable the LLM chat agent (OpenAI + Vercel).
- **public/LOGO-INSTRUCTIONS.md** — Notes on the logo asset.
