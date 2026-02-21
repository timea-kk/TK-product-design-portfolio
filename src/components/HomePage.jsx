/**
 * HomePage
 * ---------
 * Main landing page: hero (intro + typewriter headline), bio paragraph, and featured project cards.
 * Uses theme CSS variables for colors so every theme looks consistent.
 * No router yet – project and About pages are placeholders for later.
 */

import { Header } from './Header';
import { Logo } from './Logo';
import { RotatingDescriptor } from './RotatingDescriptor';
import { TimeaAgent } from './TimeaAgent';

/** Placeholder project data until real case studies and routes exist. slug is used as list key and future route. */
const PLACEHOLDER_PROJECTS = [
  { title: "Building Ecosia's Onboarding Experience", tagline: "A smooth first-time experience that boosted conversion by 25%.", slug: 'ecosia-onboarding' },
  { title: "Scaling Design Operations at Ecosia", tagline: "Establishing a shared ownership model for Ecosia's Design System – Flora.", slug: 'ecosia-ops' },
  { title: "Install Funnel for the Ecosia Browser", tagline: "Launched Ecosia's browser in just two months, reaching 100k DAU.", slug: 'ecosia-browser' },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24">
      <Header />

      <main>
        {/* Hero: greeting, logo, typewriter headline, and short bio. aria-labelledby links section to h1 for screen readers. */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-24" aria-labelledby="hero-heading">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-semibold text-[var(--color-muted)] md:text-xl">Hi, I&apos;m</p>
            <Logo className="h-7 w-auto md:h-8" />
            <span className="sr-only">Timea</span>
          </div>
          <h1 id="hero-heading" className="mt-2 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[var(--color-headline)] md:text-5xl">
            I&apos;m a <RotatingDescriptor /> who creates with clarity and purpose.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
            People describe me as <strong className="font-semibold text-[var(--color-brand)]">thoughtful, analytical, and structured</strong>. I enjoy connecting dots others miss and bringing clarity to ambiguity through deep thinking and systematic problem solving. I care about making design inclusive and accessible, and about using it for something genuinely good.
          </p>
        </section>

        {/* Featured projects: grid of placeholder cards. id="projects" is the anchor for future in-page links. */}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="text-2xl font-bold text-[var(--color-brand)]">
            Recent Projects
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Here are some examples of how I work with cross-functional teams, and how I blend research, evaluation and execution.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLACEHOLDER_PROJECTS.map((p) => (
              <li key={p.slug}>
                <article className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] transition-[var(--a11y-motion)] hover:shadow-md">
                  {/* Placeholder image block – replace with real image or link when project pages exist */}
                  <div
                    className="h-40 w-full bg-[var(--color-border)]"
                    aria-hidden="true"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-brand)]">{p.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{p.tagline}</p>
                    <span className="mt-3 inline-block text-sm font-medium text-[var(--color-brand)]">
                      Read case study →
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer: copyright and placeholder links. Update hrefs when real URLs are ready. */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-6">
        <div className="mx-auto flex max-w-6xl justify-between text-sm text-[var(--color-muted)]">
          <span>© Timea Konya</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--color-brand)]">LinkedIn</a>
            <a href="#" className="hover:text-[var(--color-brand)]">Download CV</a>
          </div>
        </div>
      </footer>

      {/* Sticky chat bar: visitors can ask about Timea’s experience; answers from local knowledge base. */}
      <TimeaAgent />
    </div>
  );
}
