/**
 * TimeaAgent knowledge base: short answers derived from CV_CONTEXT.md.
 * Used for the chat agent at the bottom of the site. Simple keyword matching;
 * no API or backend required. Edit this file to add or change Q&A content.
 */

/** Each entry: keywords (lowercase) that trigger the answer; answer shown to the visitor. */
export const KNOWLEDGE = [
  {
    keywords: ['who are you', 'what do you do', 'tell me about yourself', 'introduce', 'hello', 'hi '],
    answer: "I'm Timea — a Senior Product Designer based in Berlin. I focus on clear, intuitive design and love turning complex problems into simple experiences. I'm passionate about sustainability, design systems, and using data to guide product decisions.",
  },
  {
    keywords: ['where', 'based', 'location', 'city', 'berlin', 'live'],
    answer: "I'm based in Berlin.",
  },
  {
    keywords: ['how many years', 'years of experience', 'how long', 'experience', 'how much experience'],
    answer: "I have over 12 years of experience in product design, UX/UI, design systems, and research-led work—from early roles through to my current role at Ecosia.",
  },
  {
    keywords: ['contact', 'email', 'reach', 'get in touch', 'hire', 'work together'],
    answer: "You can reach me at work@timea.cc. I'm open to new projects and conversations.",
  },
  {
    keywords: ['ecosia', 'current role', 'current job', 'where do you work', 'present'],
    answer: "I've been a Senior Product Designer at Ecosia since Feb 2020. Ecosia is the search engine that uses 100% of its profits for climate projects (240M+ trees planted, 20M+ users). I work on onboarding experiments, the install funnel for Ecosia Browser, and scaling our Design System.",
  },
  {
    keywords: ['onboarding', 'conversion', 'experiments'],
    answer: "At Ecosia I ran 12 onboarding experiments that increased conversion by about 20–25% and short-term retention by 3–5% across 20M+ users.",
  },
  {
    keywords: ['browser', 'ecosia browser', 'install funnel', '100k', 'dau'],
    answer: "I designed and tested the install funnel for Ecosia Browser under a two-month deadline. The browser grew to 100k DAU and over €1M revenue.",
  },
  {
    keywords: ['design system', 'flora', 'component', 'design ops'],
    answer: "I've helped scale Ecosia's Design System: component health tracking, contribution processes, cross-team reviews. I own complex components and shared libraries used across product areas.",
  },
  {
    keywords: ['dojo', 'dojo madness', 'lolsumo', 'zack', 'esports'],
    answer: "Before Ecosia I was a Product Designer at Dojo Madness (Berlin esports startup). I designed Lolsumo (500k+ downloads, 70k DAU) and built Zack, a gaming assistant released to 10k beta users. Cross-platform work at startup speed.",
  },
  {
    keywords: ['kiwi', 'kiwi.ki', 'proptech'],
    answer: "I was a UI Designer at KIWI.KI (key-free access for buildings, 175k+ units). I led design across 10 apps and built a UI library unifying B2B and B2C products. Lots of software–hardware integration and cross-team workshops.",
  },
  {
    keywords: ['skills', 'what are you good at', 'expertise', 'tools'],
    answer: "Design: Design Systems, prototyping, workshop facilitation, A/B testing, accessibility, data analysis, design strategy. UX research: interviews, usability testing, surveys. Tools: Figma, Framer, Miro, Cursor, VS Code, Looker, Jira, and more.",
  },
  {
    keywords: ['education', 'degree', 'study', 'university', 'school'],
    answer: "I have a BA in Visual Arts (Graphic Arts) from the Art and Design University of Cluj-Napoca, Romania, and a diploma in Computer Science/Mathematics from Don Orione High School, Oradea.",
  },
  {
    keywords: ['course', 'certification', 'learning', 'bootcamp', 'codecademy'],
    answer: "I'm doing the Front-End Engineer track on Codecademy and completed Memorisely's AI Coding Bootcamp (Feb 2026). I've also done the Figma MCP and Cursor Workshop (Dec 2025) and Design Tokens Mastery (Nov 2025).",
  },
  {
    keywords: ['language', 'languages', 'speak', 'german', 'romanian', 'english'],
    answer: "English — fluent. Romanian — native. German — intermediate. Hungarian — intermediate.",
  },
  {
    keywords: ['sustainability', 'ethical', 'climate', 'mission'],
    answer: "Sustainability and ethical design are central to me. At Ecosia we're mission-driven: 100% of profits go to climate projects. I care about making design inclusive and accessible and using it for something genuinely good.",
  },
  {
    keywords: ['resume', 'cv', 'download'],
    answer: "There's a 'Download CV' link in the footer. If you don't see it yet, you can email me at work@timea.cc and I'll send it.",
  },
];

/** Shown when no keyword match is found. */
export const DEFAULT_ANSWER =
  "I'm not sure about that—please email me at work@timea.cc and I'll get back to you. You can also ask about my experience, Ecosia, design systems, or how to contact me.";

/**
 * Picks an answer from KNOWLEDGE based on the user's message (lowercased).
 * Returns the first matching entry's answer, or DEFAULT_ANSWER.
 */
export function getAnswerForQuestion(message) {
  if (!message || typeof message !== 'string') return DEFAULT_ANSWER;
  const lower = message.trim().toLowerCase();
  if (lower.length === 0) return DEFAULT_ANSWER;
  for (const { keywords, answer } of KNOWLEDGE) {
    if (keywords.some((k) => lower.includes(k))) return answer;
  }
  return DEFAULT_ANSWER;
}
