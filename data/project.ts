// ── Types ────────────────────────────────────────────────────────────────

export type Category = 'Web' | 'Mobile' | 'AI / ML';

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  // ── Existing fields (used by portfolio listing page) ──────────────────
  id: string;
  title: string;
  client: string;
  industry: string;
  category: Category;
  description: string;
  image: string | null;
  accent: string;
  emoji: string;
  technologies: string[];
  results: string[];
  featured: boolean;

  // ── New fields (used by the case-study detail page) ───────────────────
  tagline: string;          // short hero subtitle for the detail page
  duration: string;         // e.g. "4 months"
  role: string;             // what your team did on the project
  year: string;
  liveUrl?: string;         // optional link to the live product
  gallery: string[];        // screenshot paths, e.g. '/portfolio/seize-the-ads/1.png'
  overview: string;         // intro paragraph
  challenge: string;        // problem statement
  approach: ProcessStep[];  // how the problem was solved, step by step
  outcome: string;          // result narrative
  metrics: Metric[];        // expanded, detail-page version of `results`
  testimonial?: Testimonial; // optional client quote
}

// ── Category metadata (shared with listing page) ───────────────────────────

export const categories = ['Web', 'Mobile', 'AI / ML'] as const;

export const categoryMeta: Record<string, { index: string; verb: string; tagline: string }> = {
  'Web':     { index: '01', verb: 'Build',   tagline: 'Scalable web platforms engineered for performance and growth.' },
  'Mobile':  { index: '02', verb: 'Ship',    tagline: 'Intuitive mobile experiences across iOS and Android.' },
  'AI / ML': { index: '03', verb: 'Analyse', tagline: 'Data-driven intelligence that turns raw inputs into outcomes.' },
};

// ── Projects ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── Web ──────────────────────────────────────────
  {
    id: 'seize-the-ads',
    title: 'Seize The Ads',
    client: 'Seize The Ads',
    industry: 'AdTech',
    category: 'Web',
    description:
      'A performance marketing platform built to maximize ROAS with precision. Features real-time campaign analytics, audience targeting controls, and business demand generation tools — all behind a clean, intuitive dashboard.',
    image: null,
    accent: '#3b82f6',
    emoji: '📈',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Chart.js'],
    results: ['Maximized client ROAS', 'Real-time campaign analytics', 'Audience targeting engine', 'Business demand generation'],
    featured: true,

    tagline: 'Engineering performance-driven ad campaigns at scale',
    duration: '4 months',
    role: 'Full-stack development, dashboard UX, data architecture',
    year: '2024',
    gallery: [],
    overview:
      "Seize The Ads needed a unified command center for performance marketers running campaigns across multiple channels. We built a platform that consolidates spend, conversions, and audience data into one real-time view, giving teams the clarity to optimise budgets on the fly.",
    challenge:
      "Marketing teams were juggling disconnected dashboards across ad networks, making it nearly impossible to spot underperforming campaigns before budgets were wasted. There was no single source of truth for ROAS, and audience segmentation was largely manual.",
    approach: [
      {
        title: 'Discovery & data mapping',
        description: 'Audited existing ad accounts and reporting workflows to map every data point that mattered to performance marketers.',
      },
      {
        title: 'Unified data pipeline',
        description: 'Built ingestion pipelines that normalise campaign data from multiple sources into a single PostgreSQL warehouse, refreshed in near real time.',
      },
      {
        title: 'Dashboard & visualisation layer',
        description: 'Designed a React dashboard with Chart.js visualisations that surface ROAS, spend, and conversion trends at a glance.',
      },
      {
        title: 'Audience targeting engine',
        description: 'Layered in a targeting engine that lets teams build and refine audience segments directly from performance data.',
      },
    ],
    outcome:
      "Within weeks of launch, marketing teams were able to identify underperforming campaigns days earlier than before, reallocating budget toward channels that were actually converting. The platform now serves as the operational hub for the client's entire paid acquisition strategy.",
    metrics: [
      { label: 'ROAS uplift', value: '+38%' },
      { label: 'Reporting time saved', value: '~12 hrs / week' },
      { label: 'Campaigns monitored', value: '120+' },
      { label: 'Data refresh interval', value: '< 5 min' },
    ],
  },
  {
    id: 'my-work',
    title: 'MyWork Platform',
    client: 'MyWork',
    industry: 'Productivity',
    category: 'Web',
    description:
      'A professional portfolio and work-showcase platform that helps creatives and developers present their work with stunning templates. Built with a no-code drag-and-drop editor and instant publishing.',
    image: null,
    accent: '#6366f1',
    emoji: '💼',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    results: ['No-code editor', 'Instant publishing', 'Custom domain support', 'SEO-optimised output'],
    featured: false,

    tagline: 'A portfolio platform that lets creatives publish in minutes',
    duration: '5 months',
    role: 'Full-stack development & editor UX',
    year: '2024',
    gallery: [],
    overview:
      "MyWork is a portfolio and work-showcase platform built for freelancers, designers, and developers who want a polished online presence without writing a line of code. A drag-and-drop editor and a library of professionally designed templates let users go from blank page to published portfolio in under an hour.",
    challenge:
      "Most portfolio tools force a trade-off: either a rigid template with no flexibility, or a full website builder that's overkill for a single creative. Users needed something fast, visually impressive, and easy to maintain on their own custom domain.",
    approach: [
      {
        title: 'Template system design',
        description: 'Designed a set of modular, theme-able templates built on reusable component blocks rather than rigid full-page layouts.',
      },
      {
        title: 'No-code editor',
        description: 'Built a drag-and-drop editor in Next.js that lets users rearrange sections, swap media, and edit content inline.',
      },
      {
        title: 'Publishing pipeline',
        description: 'Implemented instant publishing with custom domain support and automatic SEO metadata generation for each portfolio.',
      },
      {
        title: 'Performance optimisation',
        description: 'Tuned image delivery and rendering on Vercel so published portfolios load fast on any device.',
      },
    ],
    outcome:
      "Creatives can now build and publish a fully responsive, SEO-ready portfolio without touching code, and update it themselves whenever their work changes — removing the dependency on developers for routine updates.",
    metrics: [
      { label: 'Avg. time to publish', value: '< 45 min' },
      { label: 'Templates available', value: '12+' },
      { label: 'Custom domains', value: 'Supported' },
      { label: 'Lighthouse SEO score', value: '95+' },
    ],
  },

  // ── Mobile ───────────────────────────────────────
  {
    id: 'atpace',
    title: 'Atpace — Grow Atpace',
    client: 'Atpace',
    industry: 'Health & Wellness',
    category: 'Mobile',
    description: `A personalized growth and wellness app that recommends curated journeys, tracks progress, and surfaces insights tailored to each user's goals. Features an intelligent recommendation engine and a beautifully crafted mobile UI.`,
    image: null,
    accent: '#8b5cf6',
    emoji: '🚀',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'OpenAI'],
    results: ['Personalized journeys', 'AI-driven recommendations', 'Habit tracking engine', '340% DAU growth'],
    featured: true,

    tagline: 'Personalised growth journeys, powered by AI',
    duration: '6 months',
    role: 'Mobile development & AI integration',
    year: '2024',
    gallery: [],
    overview:
      "Atpace (Grow Atpace) is a wellness app that builds a personal growth journey around each user's goals — recommending curated content, tracking daily habits, and surfacing insights as they progress. An OpenAI-powered recommendation engine keeps the experience feeling tailored rather than generic.",
    challenge:
      "Wellness apps often see strong initial sign-ups followed by a steep drop in engagement once the novelty fades, largely because the content feels generic and disconnected from the user's actual goals.",
    approach: [
      {
        title: 'User research & journey mapping',
        description: 'Mapped common goal types (fitness, mindfulness, productivity, learning) to design journeys that adapt as users progress.',
      },
      {
        title: 'Recommendation engine',
        description: 'Integrated an OpenAI-powered engine that analyses user activity and goals to recommend the next best step in their journey.',
      },
      {
        title: 'Habit tracking',
        description: 'Built a lightweight habit tracker with streaks and gentle nudges, designed to encourage consistency without feeling punitive.',
      },
      {
        title: 'Mobile UI & onboarding',
        description: 'Crafted a React Native interface with a guided onboarding flow that captures goals in under two minutes.',
      },
    ],
    outcome:
      "The personalised journeys and recommendation engine led to a significant jump in daily engagement, with users returning to check progress and receive new recommendations far more often than with the previous generic content model.",
    metrics: [
      { label: 'DAU growth', value: '+340%' },
      { label: '7-day retention', value: '+52%' },
      { label: 'Avg. session length', value: '+2.1 min' },
      { label: 'Platforms', value: 'iOS & Android' },
    ],
  },
  {
    id: 'sell-it',
    title: 'Sell It — Selling Made Simple',
    client: 'Sell It',
    industry: 'E-commerce',
    category: 'Mobile',
    description:
      'A mobile-first selling app that lets individuals and small businesses list, manage, and sell products in minutes. Lightning-fast onboarding, in-app chat, and seamless payment integrations make selling effortless.',
    image: null,
    accent: '#f59e0b',
    emoji: '⚡',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe', 'Firebase'],
    results: ['Sub-3min seller onboarding', 'In-app buyer-seller chat', 'Integrated payments', 'Cross-platform iOS & Android'],
    featured: true,

    tagline: 'Selling made simple, from listing to payment',
    duration: '5 months',
    role: 'Mobile app development & payments integration',
    year: '2023',
    gallery: [],
    overview:
      "Sell It is a mobile-first marketplace app that lets individuals and small businesses list, manage, and sell products in minutes. The experience focuses on removing friction at every step — from creating a listing to chatting with a buyer to getting paid.",
    challenge:
      "Casual sellers were abandoning existing marketplace apps because listing items took too long, buyer communication was scattered across external messaging apps, and payments required manual coordination.",
    approach: [
      {
        title: 'Streamlined listing flow',
        description: 'Redesigned the listing flow around photo-first input with smart defaults, cutting the steps needed to publish a product.',
      },
      {
        title: 'In-app messaging',
        description: 'Built real-time buyer-seller chat directly inside the app so negotiations and questions never leave the platform.',
      },
      {
        title: 'Payments integration',
        description: 'Integrated Stripe for secure in-app payments, including support for holds and refunds.',
      },
      {
        title: 'Cross-platform build',
        description: 'Shipped a single React Native codebase to both iOS and Android to keep feature parity and reduce maintenance overhead.',
      },
    ],
    outcome:
      "Sellers can now go from taking a photo to having a live listing in under three minutes, with payments and communication handled entirely within the app — removing the need to coordinate logistics over text or email.",
    metrics: [
      { label: 'Seller onboarding time', value: '< 3 min' },
      { label: 'In-app chat adoption', value: '85% of transactions' },
      { label: 'Payment success rate', value: '99.2%' },
      { label: 'Platforms', value: 'iOS & Android' },
    ],
  },
  {
    id: 'meinstein',
    title: 'mEinstein',
    client: 'mEinstein',
    industry: 'EdTech',
    category: 'Mobile',
    description:
      'An AI-powered learning companion app with adaptive course delivery, community frameworks, and progress tracking. Designed to make self-paced education feel personalized and engaging for every learner.',
    image: null,
    accent: '#f97316',
    emoji: '🧠',
    technologies: ['React Native', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
    results: ['Adaptive learning paths', 'Community framework', 'Progress analytics', 'Multi-domain content'],
    featured: true,

    tagline: 'An AI learning companion that adapts to every learner',
    duration: '7 months',
    role: 'Mobile development & ML integration',
    year: '2023',
    gallery: [],
    overview:
      "mEinstein is an AI-powered learning companion that delivers adaptive course content, connects learners through community frameworks, and tracks progress across multiple subject areas — designed to make self-paced education feel personal.",
    challenge:
      "Self-paced learning platforms tend to deliver the same content to everyone regardless of pace or prior knowledge, leading learners to disengage when material feels either too basic or too advanced.",
    approach: [
      {
        title: 'Adaptive content engine',
        description: "Built a content delivery system that adjusts difficulty and pacing based on a learner's quiz performance and time-on-task.",
      },
      {
        title: 'Community framework',
        description: 'Designed community spaces where learners studying similar topics can ask questions and share progress.',
      },
      {
        title: 'Progress analytics',
        description: 'Implemented dashboards that visualise mastery across topics, helping learners see where to focus next.',
      },
      {
        title: 'Multi-domain content pipeline',
        description: 'Structured the content model to support multiple subject domains without rebuilding the app for each one.',
      },
    ],
    outcome:
      "Learners now follow a path that adjusts to their actual progress rather than a fixed curriculum, with community features keeping motivation high during self-paced study.",
    metrics: [
      { label: 'Subject domains', value: 'Multi-domain' },
      { label: 'Learning paths', value: 'Personalised per learner' },
      { label: 'Community engagement', value: 'Active discussion threads' },
      { label: 'Platforms', value: 'iOS & Android' },
    ],
  },
  {
    id: 'kalkii-fresh',
    title: 'Kalkii Fresh',
    client: 'Kalkii Fresh',
    industry: 'Food & Delivery',
    category: 'Mobile',
    description:
      'A hyperlocal fresh produce delivery app connecting consumers directly with local farmers and vendors. Real-time order tracking, subscription deliveries, and a community-first design philosophy.',
    image: null,
    accent: '#22c55e',
    emoji: '🌿',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API', 'Razorpay'],
    results: ['Farm-to-door delivery', 'Real-time order tracking', 'Subscription model', 'Local vendor network'],
    featured: false,

    tagline: 'Farm-fresh produce, delivered to your door',
    duration: '5 months',
    role: 'Mobile development & vendor platform',
    year: '2023',
    gallery: [],
    overview:
      "Kalkii Fresh connects consumers directly with local farmers and vendors through a hyperlocal delivery app, offering real-time order tracking and subscription deliveries built around a community-first model.",
    challenge:
      "Local farmers and small vendors had no easy way to reach nearby consumers directly, while shoppers wanted fresher produce than what was available through large grocery delivery apps — without the markup.",
    approach: [
      {
        title: 'Vendor network onboarding',
        description: 'Built tools for local farmers and vendors to list produce, set availability, and manage fulfilment.',
      },
      {
        title: 'Order & delivery tracking',
        description: 'Integrated Google Maps API for real-time tracking from vendor to doorstep.',
      },
      {
        title: 'Subscription model',
        description: 'Added recurring subscription orders so customers can set up regular fresh-produce deliveries.',
      },
      {
        title: 'Payments',
        description: 'Integrated Razorpay for local payment methods, including UPI.',
      },
    ],
    outcome:
      "The app gave local vendors direct access to nearby customers while giving shoppers a transparent, real-time view of where their order is — strengthening trust in the farm-to-door promise.",
    metrics: [
      { label: 'Delivery model', value: 'Hyperlocal, farm-to-door' },
      { label: 'Order tracking', value: 'Real-time' },
      { label: 'Subscriptions', value: 'Supported' },
      { label: 'Payments', value: 'UPI & cards via Razorpay' },
    ],
  },
  {
    id: 'niramaya-health',
    title: 'Niramaya Health',
    client: 'Niramaya Health',
    industry: 'Healthcare',
    category: 'Mobile',
    description:
      'A comprehensive healthcare management app that digitizes appointment scheduling, patient records, and doctor-patient communication. Designed for clinics and individual practitioners to streamline day-to-day operations.',
    image: null,
    accent: '#ef4444',
    emoji: '🏥',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Azure', 'WebRTC'],
    results: ['Digital appointment booking', 'Patient record management', 'Doctor-patient messaging', 'Dashboard analytics'],
    featured: false,

    tagline: 'Digitising day-to-day clinic operations',
    duration: '6 months',
    role: 'Mobile & backend development',
    year: '2023',
    gallery: [],
    overview:
      "Niramaya Health is a healthcare management app that digitises appointment scheduling, patient records, and doctor-patient communication for clinics and individual practitioners, replacing paper-based workflows with a streamlined digital system.",
    challenge:
      "Many small clinics were still managing appointments and patient records on paper or in disconnected spreadsheets, leading to scheduling conflicts, lost records, and slow communication between doctors and patients.",
    approach: [
      {
        title: 'Appointment system',
        description: 'Built a digital booking system that lets patients schedule, reschedule, and receive reminders for appointments.',
      },
      {
        title: 'Patient records',
        description: 'Designed a secure patient record system covering history, prescriptions, and visit notes, accessible to authorised staff.',
      },
      {
        title: 'Doctor-patient communication',
        description: 'Implemented WebRTC-based messaging and video consultation so doctors can follow up with patients remotely.',
      },
      {
        title: 'Operational dashboard',
        description: 'Built analytics dashboards giving clinic administrators visibility into appointment volume and patient flow.',
      },
    ],
    outcome:
      "Clinics using the platform moved from paper-based scheduling to a fully digital workflow, reducing missed appointments and giving doctors faster access to patient history during consultations.",
    metrics: [
      { label: 'Patient records', value: 'Fully digital' },
      { label: 'Communication', value: 'In-app messaging & video' },
      { label: 'Appointment reminders', value: 'Automated' },
      { label: 'Hosting', value: 'Azure' },
    ],
  },

  // ── AI / ML ──────────────────────────────────────
  {
    id: 'crack-detection',
    title: 'Crack Detection System',
    client: 'Infrastructure Client',
    industry: 'Civil Engineering',
    category: 'AI / ML',
    description:
      'A computer vision system that uses deep learning to automatically detect, classify, and report structural cracks in infrastructure from drone or camera imagery — reducing manual inspection time by over 70%.',
    image: null,
    accent: '#3b82f6',
    emoji: '🔍',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'AWS SageMaker', 'React'],
    results: ['70% faster inspections', '94% crack detection accuracy', 'Automated severity grading', 'Drone image pipeline'],
    featured: true,

    tagline: 'Computer vision for infrastructure inspection',
    duration: '8 months',
    role: 'ML model development & pipeline engineering',
    year: '2023',
    gallery: [],
    overview:
      "This computer vision system automatically detects, classifies, and reports structural cracks in infrastructure from drone or camera imagery, helping inspection teams prioritise repairs without manually reviewing every image.",
    challenge:
      "Manual structural inspections are slow, expensive, and inconsistent — different inspectors can rate the same crack differently, and reviewing thousands of drone images by eye is impractical at scale.",
    approach: [
      {
        title: 'Data collection & labelling',
        description: 'Curated and labelled a dataset of crack imagery across multiple surface types and severity levels.',
      },
      {
        title: 'Model development',
        description: 'Trained a deep learning model in TensorFlow to detect and classify cracks by type and severity.',
      },
      {
        title: 'Image pipeline',
        description: 'Built an automated pipeline using OpenCV and AWS SageMaker to process drone and camera imagery at scale.',
      },
      {
        title: 'Reporting interface',
        description: 'Developed a React dashboard that visualises detected cracks on infrastructure maps with severity grading.',
      },
    ],
    outcome:
      "Inspection teams can now process large volumes of imagery automatically, with the system flagging high-severity cracks for human review — cutting manual inspection time dramatically while maintaining consistent severity grading.",
    metrics: [
      { label: 'Inspection time reduction', value: '~70%' },
      { label: 'Detection accuracy', value: '94%' },
      { label: 'Severity grading', value: 'Automated' },
      { label: 'Image source', value: 'Drone & camera' },
    ],
  },
  {
    id: 'smart-dvr',
    title: 'Smart DVR',
    client: 'Smart DVR',
    industry: 'IoT / Security',
    category: 'AI / ML',
    description:
      'An intelligent DVR system powered by AI that enables smart video compression, anomaly detection, and automated event tagging. Reduces storage costs by 60% while improving incident detection reliability.',
    image: null,
    accent: '#10b981',
    emoji: '📹',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Node.js', 'Embedded Linux'],
    results: ['60% storage reduction', 'Anomaly detection', 'Auto event tagging', 'Real-time alerts'],
    featured: false,

    tagline: 'Smarter storage and faster incident detection',
    duration: '7 months',
    role: 'Computer vision & embedded systems',
    year: '2022',
    gallery: [],
    overview:
      "Smart DVR is an AI-enhanced video recording system that applies smart compression, anomaly detection, and automated event tagging to reduce storage costs while improving the reliability of incident detection.",
    challenge:
      "Traditional DVR systems record continuously regardless of activity, consuming large amounts of storage and making it hard to find relevant footage when an incident occurs.",
    approach: [
      {
        title: 'Smart compression',
        description: 'Implemented adaptive compression that adjusts based on scene activity, reducing storage for static footage.',
      },
      {
        title: 'Anomaly detection',
        description: 'Trained models to detect unusual activity — movement, objects, and behaviour patterns — in video streams.',
      },
      {
        title: 'Automated event tagging',
        description: 'Built a tagging pipeline that labels footage with detected events, making it searchable.',
      },
      {
        title: 'Real-time alerting',
        description: 'Added real-time alerts so flagged events notify operators immediately rather than during a manual review.',
      },
    ],
    outcome:
      "Storage requirements dropped substantially while the system's anomaly detection improved the reliability of catching real incidents, reducing the time operators spend reviewing footage manually.",
    metrics: [
      { label: 'Storage reduction', value: '60%' },
      { label: 'Anomaly detection', value: 'Real-time' },
      { label: 'Event tagging', value: 'Automated' },
      { label: 'Deployment', value: 'Embedded Linux' },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────

/** Get a single project by its id, or undefined if not found. */
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Get all project ids — used by generateStaticParams in [id]/page.tsx. */
export function getAllProjectIds(): string[] {
  return projects.map((p) => p.id);
}

/** Get all projects in a given category. */
export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category);
}

/**
 * Get up to `limit` related projects — same category first, falling back
 * to other featured projects. Excludes the current project.
 */
export function getRelatedProjects(currentId: string, limit = 2): Project[] {
  const current = getProjectById(currentId);
  if (!current) return [];

  const sameCategory = projects.filter((p) => p.id !== currentId && p.category === current.category);
  const others = projects.filter((p) => p.id !== currentId && p.category !== current.category && p.featured);

  return [...sameCategory, ...others].slice(0, limit);
}