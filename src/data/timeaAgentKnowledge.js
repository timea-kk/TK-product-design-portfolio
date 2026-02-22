/**
 * TimeaAgent knowledge base: short answers derived from CV_CONTEXT.md.
 * Used for the chat agent at the bottom of the site. No API or backend required.
 *
 * Matching: each entry is scored by how many of its keywords appear in the user
 * message (substring match, case-insensitive). The highest-scoring entry wins.
 * Edit this file to add or change Q&A content.
 */

/** Each entry: keywords (lowercase) that score points; answer shown to the visitor. */
export const KNOWLEDGE = [
  // Intro / greeting
  {
    keywords: [
      'who are you', 'what do you do', 'tell me about yourself', 'introduce',
      'hello', 'hi ', 'hey ', 'hey there', 'about timea',
      'timea konya', 'konya', 'nice to meet', 'hiya', 'howdy',
      'who is timea', 'is this timea',
    ],
    answer: "I'm Timea, a Senior Product Designer based in Berlin. I focus on clear, intuitive design and love turning complex problems into simple experiences. I'm passionate about sustainability, design systems, and using data to guide product decisions.",
  },

  // Location
  {
    keywords: [
      'where are you based', 'where do you live', 'what city are you in', 'location',
      'berlin', 'germany', 'europe', 'where are you from', 'are you in berlin',
      'what country',
    ],
    answer: "I'm based in Berlin, Germany. Most of my career has been at Berlin-based product companies and startups.",
  },

  // Years of experience / seniority
  {
    keywords: [
      'how many years', 'years of experience', 'how long have you been', 'how long did you',
      'how much experience', 'how senior', 'background', 'work history',
      'how experienced', 'track record', 'design experience', 'your experience',
      'experience in product', 'experience in design', 'experience in ux',
    ],
    answer: "I have over 12 years of experience in product design, UX/UI, design systems, and research-led work, from early roles through to my current role at Ecosia.",
  },

  // Contact / reach me
  {
    keywords: [
      'contact', 'email', 'reach', 'get in touch', 'hire me', 'available',
      'open to', 'how to contact', 'how do i reach', 'find you online',
      'reach out', 'talk to you', 'connect with you', 'get a hold of',
      'drop you a line', 'send you a message',
      'phone', 'phone number', 'telephone', 'mobile',
    ],
    answer: "You can reach me at work@timea.cc. I'm open to new projects and conversations.",
  },

  // Salary / rate / cost
  {
    keywords: [
      'salary', 'hourly rate', 'day rate', 'what do you charge', 'compensation',
      'how much do you cost', 'budget for', 'pricing', 'how much would it cost',
      'what is your rate', 'what is your fee',
    ],
    answer: "That's best discussed directly. Email me at work@timea.cc with a bit of detail about the role or project and we can go from there.",
  },

  // Work together / collaborate / project pitch
  {
    keywords: [
      'work together', 'collaborate', 'partnership', "let's work", 'can we work',
      'would you be interested', 'pitch', 'proposal', 'interested in working',
    ],
    answer: "Always happy to chat about potential work. Email me at work@timea.cc and we can take it from there.",
  },

  // Job search / open to work / availability
  {
    keywords: [
      'looking for a job', 'open to work', 'job search', 'actively looking',
      'seeking a role', 'when can you start', 'notice period', 'are you available',
      'are you open to', 'new opportunity', 'new role', 'on the market',
      'looking for opportunities', 'are you hiring', 'could i hire you',
      'freelance', 'freelancer', 'contract', 'full-time', 'full time',
      'availability', 'looking for work', 'open for work',
    ],
    answer: "My notice period means I can start a new position from May 2026. Open to the right conversations, whether that's a full-time role or an interesting project. Email me at work@timea.cc to talk specifics.",
  },

  // Remote / hybrid / location requirements
  {
    keywords: [
      'remote', 'hybrid', 'on-site', 'onsite', 'work from home',
      'office work', 'location requirement', 'relocation', 'willing to relocate',
      'can you work remotely', 'distributed team', 'time zone', 'timezone', 'cet',
      'async', 'synchronous', 'in-person',
    ],
    answer: "I prefer remote, and I'm open to hybrid if the company is based in Berlin. Fully on-site isn't something I'm looking for right now.",
  },

  // Current role at Ecosia
  {
    keywords: [
      'ecosia', 'current role', 'current job', 'where do you work', 'where are you working',
      'current company', 'current employer', 'search engine', 'what do you work on',
      'what are you working on', 'day job', 'currently working', 'right now',
    ],
    answer: "I've been a Senior Product Designer at Ecosia since Feb 2020. Ecosia is the search engine that uses 100% of its profits for climate projects (240M+ trees planted, 20M+ users). I work on onboarding experiments, the install funnel for Ecosia Browser, and scaling our Design System.",
  },

  // Onboarding experiments / growth / conversion
  {
    keywords: [
      'onboarding', 'conversion', 'experiment', 'retention', 'growth design',
      'a/b test', 'ab test', 'conversion rate', 'kpi', 'activation',
      'user acquisition', 'increase conversion', 'onboarding experiments',
      'onboarding strategy', 'user activation', 'onboarding project',
    ],
    answer: "At Ecosia I ran 12 onboarding experiments that increased conversion by about 20–25% and short-term retention by 3–5% across 20M+ users.",
  },

  // Ecosia Browser / install funnel
  {
    keywords: [
      'ecosia browser', 'install funnel', 'browser install', 'earth day',
      'browser launch', 'browser revenue', 'switch browser',
      '100k dau', 'browser project', 'install flow',
    ],
    answer: "I designed and tested the install funnel for Ecosia Browser under a two-month deadline. The browser grew to 100k DAU and over €1M revenue. We launched on Earth Day 2024.",
  },

  // Design system / Flora / design ops
  {
    keywords: [
      'design system', 'flora', 'design ops', 'design operation',
      'design token', 'figma library', 'component library', 'shared library',
      'governance', 'contribution process', 'component health',
      'design infrastructure', 'system thinking', 'flora design system',
    ],
    answer: "I've helped scale Ecosia's Design System (Flora): component health tracking, contribution processes, cross-team reviews. I own complex components and shared libraries used across product areas.",
  },

  // Dojo Madness / gaming / esports
  {
    keywords: [
      'dojo', 'dojo madness', 'lolsumo', 'zack', 'esports', 'gaming',
      'league of legends', 'esport', 'gaming app', 'coaching app',
      'lol coaching', 'gaming assistant',
      'about dojo', 'work at dojo',
    ],
    answer: "Before Ecosia I was a Product Designer at Dojo Madness (Berlin esports startup). I designed Lolsumo (500k+ downloads, 70k DAU) and built Zack, a gaming assistant released to 10k beta users. Cross-platform work at startup speed.",
  },

  // KIWI.KI
  {
    keywords: [
      'kiwi', 'kiwi.ki', 'proptech', 'key-free', 'residential buildings',
      'smart access', 'hardware integration', 'property tech', 'access control',
      'about kiwi', 'work at kiwi',
    ],
    answer: "I was a UI Designer at KIWI.KI (key-free access for buildings, 175k+ units). I led design across 10 apps and built a UI library unifying B2B and B2C products. Lots of software–hardware integration and cross-team workshops.",
  },

  // Airfy
  {
    keywords: [
      'airfy', 'first job', 'early career', 'junior role', 'public wifi',
      'free wifi', 'wifi startup', 'first design job',
    ],
    answer: "At Airfy I was a Junior Product Designer working on free secure WiFi for public spaces. I redesigned the brand identity and owned end-to-end product design for web and mobile.",
  },

  // Startup experience
  {
    keywords: [
      'startup experience', 'startup environment', 'startup speed',
      'fast-paced', 'fast paced', 'ambiguity', 'small company', 'small team',
      'scale-up', 'scaleup', 'growth stage', 'early stage company',
      'pre-product', 'high growth', 'zero to one',
    ],
    answer: "Most of my career has been at startups (Airfy, KIWI.KI, Dojo Madness) before joining Ecosia. Cross-platform work, small teams, startup speed.",
  },

  // Skills / tools / technical
  {
    keywords: [
      'skills', 'expertise', 'tools', 'what can you do', 'specialise', 'speciali',
      'figma', 'framer', 'miro', 'cursor', 'looker', 'jira', 'notion', 'vs code',
      'design tool', 'prototyp', 'stakeholder management', 'okr', 'roadmap',
      'do you code', 'can you code', 'coding skills', 'technical skills',
      'what software', 'what programs do you use',
    ],
    answer: "Design: Design Systems, prototyping, workshop facilitation, A/B testing, accessibility, data analysis, design strategy, OKR planning. UX research: interviews, usability testing, surveys. Tools: Figma, Framer, Miro, Cursor, VS Code, Looker, Jira, and more. I'm also learning front-end development (HTML, CSS, React).",
  },

  // Education / degree
  {
    keywords: [
      'education', 'degree', 'study', 'university', 'school', 'studied',
      'graduate', 'romania', 'cluj', 'art school', 'visual arts', 'graphic arts',
      'what did you study', 'where did you study', 'academic background',
      'university degree', 'college',
    ],
    answer: "I have a BA in Visual Arts (Graphic Arts) from the Art and Design University of Cluj-Napoca, Romania, and a diploma in Computer Science/Mathematics from Don Orione High School, Oradea.",
  },

  // Courses / certifications / ongoing learning
  {
    keywords: [
      'course', 'certification', 'learning', 'bootcamp', 'codecademy', 'memorisely',
      'ai coding', 'front-end course', 'frontend course', 'recently learned',
      'studying', 'upskilling', 'self-taught', 'continuous learning',
      'what are you learning', 'currently learning', 'tokens studio',
    ],
    answer: "I'm doing the Front-End Engineer track on Codecademy and completed Memorisely's AI Coding Bootcamp (Feb 2026). I've also done the Figma MCP and Cursor Workshop (Dec 2025) and Design Tokens Mastery (Nov 2025).",
  },

  // Languages spoken
  {
    keywords: [
      'language', 'languages', 'speak', 'german', 'romanian', 'english', 'hungarian',
      'multilingual', 'fluent in', 'native language', 'what languages do you speak',
      'how many languages',
    ],
    answer: "English: fluent. Romanian: native. German: intermediate. Hungarian: intermediate.",
  },

  // Sustainability / ethics / values / mission
  {
    keywords: [
      'sustainability', 'ethical design', 'climate', 'trees', 'environment',
      'mission-driven', 'values', 'social good', 'purpose-driven',
      'green tech', 'planet', 'nonprofit', 'non-profit',
      'meaningful work', 'impact-driven', 'why ecosia', 'do you care about',
      'what do you believe in', 'design ethics',
    ],
    answer: "Sustainability and ethical design are central to me. At Ecosia we're mission-driven: 100% of profits go to climate projects. I care about making design inclusive and accessible and using it for something genuinely good.",
  },

  // What's it like working with you / collaboration style
  {
    keywords: [
      'what is it like', 'how is it like', 'how are you to work', 'like working with you',
      'work with you', 'collaborat', 'working with me', 'your work style',
      'team player', 'what kind of colleague', 'describe yourself', 'as a colleague',
      'day to day', 'communication style', 'team dynamic', 'describe you',
      'working style', 'how do you communicate', 'are you easy to work with',
      'what are you like to work', 'how do you give feedback', 'how do you handle conflict',
      'cross-functional', 'how do you work with engineers',
      'work with product managers', 'work with product manager', 'work with pm',
      'work with engineer', 'work with developer',
    ],
    answer: "I care about doing good work, making things clear, and leaving projects better than I found them. I bring structure when things feel messy, keep stakeholders in the loop, and make sure engineers and other designers feel part of the process. People I've worked with at Ecosia describe me as data-driven, organised, and good at breaking down complex problems. Collaboration with me tends to be a 4.9★ experience, apparently.",
  },

  // Design process / methodology / how you work
  {
    keywords: [
      'process', 'how do you approach', 'how do you tackle', 'methodology',
      'how do you design', 'workflow', 'design sprint', 'design thinking',
      'double diamond', 'iterate', 'validate', 'handoff', 'design process',
      'how do you start', 'where do you start', 'first step', 'how do you prioritize',
      'how do you prioritise', 'decision making', 'how do you decide',
      'how do you structure', 'how do you plan',
      'how do you work', 'design philosophy', 'philosophy',
      'handle feedback', 'receive feedback', 'deal with feedback',
      'approach a new',
    ],
    answer: "I start by making sense of the problem before jumping to solutions. I use checkpoints to validate direction, balance evidence with judgment, and try to build systems that scale quality over time. I co-create with engineers rather than just handing off, and I automate whatever drains energy so we can focus on the work that matters.",
  },

  // Strengths / passions / what you enjoy
  {
    keywords: [
      'strength', 'enjoy', 'love about', 'like most', 'favourite part', 'favorite part',
      'passion', 'what do you like', 'good at', 'proud of',
      'what motivates', 'what drives', 'what excites', 'best at',
      'what are you known for', 'thrive', 'zone of genius', 'what lights you up',
      'what gets you excited', 'natural strength',
      'what kind of designer', 'type of designer', 'what type of designer',
    ],
    answer: "I enjoy complex problem solving, designing for growth with experiments and data, and building systems that scale. I like bringing clarity when things feel messy, co-creating with teams, and connecting design work to real impact. Evidence-based design and ownership are important to me.",
  },

  // Management / leadership / mentoring other designers
  {
    keywords: [
      'manage designers', 'design lead', 'team lead', 'people management',
      'manage a team', 'managed a team', 'have you managed', 'have you led',
      'leadership', 'mentor', 'mentoring designers',
      'junior designers', 'design manager', 'lead a team',
      'grow a design team', 'people leader', 'ic vs manager',
    ],
    answer: "I've mentored designers, led cross-functional projects, and facilitated workshops across product, engineering, and operations. For more detail, email me at work@timea.cc.",
  },

  // B2B vs B2C / industry / sector
  {
    keywords: [
      'b2b', 'b2c', 'enterprise', 'consumer product', 'saas', 'business-to-business',
      'business-to-consumer', 'industry experience', 'what industries', 'what sectors',
      'what verticals', 'have you worked in', 'domain experience',
    ],
    answer: "I've worked across B2B and B2C: KIWI.KI had both, Ecosia is B2C at scale, and Dojo Madness was consumer-facing. Industries include green tech, proptech, esports, and connectivity.",
  },

  // Accessibility / inclusive design
  {
    keywords: [
      'accessibility', 'a11y', 'inclusive design', 'wcag',
      'screen reader', 'keyboard navigation', 'colour contrast', 'color contrast',
      'disabled users', 'assistive technology', 'aria labels', 'focus states',
      'visual impairment', 'accessible design', 'web accessibility',
    ],
    answer: "Accessibility is a core value for me, not an afterthought. I design with WCAG standards in mind, advocate for semantic HTML and clear focus states, and try to make sure experiences work for everyone, including people using assistive technology.",
  },

  // User research methods
  {
    keywords: [
      'user research', 'usability testing', 'user interview', 'research methods',
      'research approach', 'qualitative research', 'quantitative research',
      'survey design', 'moderated testing', 'unmoderated testing', 'discovery research',
      'research insights', 'how do you do research', 'user testing',
    ],
    answer: "I use a mixed-methods approach: qualitative insights from user interviews and usability testing, combined with quantitative data and experimentation. At Ecosia I've run moderated and unmoderated sessions, surveys, and A/B tests to inform product direction.",
  },

  // Resume / CV
  {
    keywords: [
      'resume', 'download cv', 'download your cv', 'get your cv', 'your cv',
      'pdf', 'curriculum vitae', 'can i have your cv', 'where is your cv',
      'send me your cv', 'download your resume', 'get your resume',
    ],
    answer: "There's a 'Download CV' link in the footer. If you don't see it yet, you can email me at work@timea.cc and I'll send it.",
  },

  // Testimonials / what colleagues say / how others describe you
  {
    keywords: [
      'testimonial', 'reference', 'recommendation', 'what do people say',
      'what do colleagues say', 'endorsement', 'vouch for you', 'linkedin recommendation',
      'ina', 'abhishek', 'sofia', 'bárbara', 'barbara',
      'how would others', 'how would people', 'others describe', 'people describe',
      'say about you', 'think of you', 'how do people see', 'others say about',
      'what do your colleagues', 'what do coworkers', 'former colleagues',
      'peers think', 'colleagues think',
    ],
    answer: "People I've worked with describe me as: systems-thinking and structured (Ina, Head of Design at Ecosia), data-driven and great at breaking down opaque problems (Abhishek, Engineering Manager), good at connecting projects to company goals (Sofia, Content Designer), and proactive with research-backed decisions and organised Figma files (Bárbara, Frontend Engineer).",
  },

  // Projects / portfolio / case studies
  {
    keywords: [
      'case study', 'portfolio', 'what have you built', 'what have you worked on',
      'show me your work', 'examples of your work', 'sample work',
      'what projects', 'past projects', 'previous work', 'show your work',
      'what did you design', 'featured work', 'key projects',
      'project', 'recent projects', 'recent work', 'your projects',
      'some projects', 'design work', 'what have you designed',
      'examples of your design', 'show me examples',
    ],
    answer: "My main projects are: Building Ecosia's Onboarding Experience (12 experiments, +20–25% conversion), Scaling Design Operations at Ecosia with the Flora Design System, and the Install Funnel for Ecosia Browser (100k DAU, €1M+ revenue). Earlier work includes Lolsumo and Zack at Dojo Madness, and a UI library across 10 apps at KIWI.KI.",
  },

  // LinkedIn / social media / online presence
  {
    keywords: [
      'linkedin', 'twitter', 'instagram', 'dribbble', 'behance',
      'social media', 'follow you', 'social profile', 'online profile',
      'where can i find you online', 'find you on social', 'your linkedin',
    ],
    answer: "For work enquiries email is best: work@timea.cc. You can also find me on LinkedIn by searching Timea Konya.",
  },

  // How this site was built / tech stack / moved from Framer
  {
    keywords: [
      'this site', 'this website', 'your website', 'this portfolio', 'built with',
      'tech stack', 'vite', 'react', 'tailwind', 'how did you build this',
      'who coded this', 'how was this made', 'why not framer', 'moved from framer',
      'old site', 'previous portfolio', 'coded portfolio',
    ],
    answer: "This site is built with Vite, React, and Tailwind CSS. I designed it and coded it with AI tools (Cursor, Claude Code). It replaced my Framer portfolio so I'd have more control over the code and the experience. It's part of my front-end learning journey.",
  },

  // What you're looking for in your next role
  {
    keywords: [
      'looking for in your next', 'next role', 'ideal role', 'dream job',
      'ideal position', 'what kind of job', 'what type of job', 'what role are you',
      'what are you looking for in a', 'ideal company', 'what do you want in',
      'next position', 'next opportunity', 'next step in your career',
    ],
    answer: "I'm looking for a Senior Product Designer role in a space that matters. Industries I'm drawn to: green tech, healthcare, developer tools, and regulation. The work I care most about involves design systems, cross-functional collaboration, and designing for growth. Available from May 2026.",
  },

  // Hobbies / life outside work
  {
    keywords: [
      'hobby', 'hobbies', 'outside work', 'free time', 'personal interests',
      'what do you do for fun', 'non-work interests', 'weekend', 'spare time',
      'life outside design', 'outside of design', 'outside of work',
    ],
    answer: "Outside of work I care a lot about sustainability and good design in general. Lately I've been enjoying learning to code: the Codecademy Front-End Engineer track and AI coding bootcamps have been part of that.",
  },
];

/** Shown when no keyword scores any points. */
export const DEFAULT_ANSWER =
  "That's a bit outside what I can answer here! You can ask me about my experience, skills, how I work, or how to get in touch. Or email me directly at work@timea.cc.";

/**
 * Picks the best answer from KNOWLEDGE by scoring each entry:
 * counts how many of its keywords appear in the (lowercased) message,
 * then returns the answer from the highest-scoring entry.
 * Falls back to DEFAULT_ANSWER if nothing matches.
 */
export function getAnswerForQuestion(message) {
  if (!message || typeof message !== 'string') return DEFAULT_ANSWER;
  const lower = message.trim().toLowerCase();
  if (lower.length === 0) return DEFAULT_ANSWER;

  let bestScore = 0;
  let bestAnswer = DEFAULT_ANSWER;

  for (const { keywords, answer } of KNOWLEDGE) {
    const score = keywords.filter((k) => lower.includes(k)).length;
    if (score > 0 && score >= bestScore) {
      bestScore = score;
      bestAnswer = answer;
    }
  }

  return bestAnswer;
}
