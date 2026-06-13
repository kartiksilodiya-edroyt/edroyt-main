'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// ── Data ──────────────────────────────────────────────────────────────────
const projects = [
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
  },

  // ── Mobile ───────────────────────────────────────
  {
    id: 'atpace',
    title: 'Atpace — Grow Atpace',
    client: 'Atpace',
    industry: 'Health & Wellness',
    category: 'Mobile',
    description: `A personalized growth and wellness app that recommends curated journeys, tracks progress, and surfaces insights tailored to each user's goals. Features an intelligent recommendation engine and a beautifully crafted mobile UI.`,
    accent: '#8b5cf6',
    emoji: '🚀',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'OpenAI'],
    results: ['Personalized journeys', 'AI-driven recommendations', 'Habit tracking engine', '340% DAU growth'],
    featured: true,
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
  },
];

const categories = ['Web', 'Mobile', 'AI / ML'] as const;
type Category = (typeof categories)[number] | 'All';

const categoryMeta: Record<string, { index: string; verb: string; tagline: string }> = {
  'Web':     { index: '01', verb: 'Build',   tagline: 'Scalable web platforms engineered for performance and growth.' },
  'Mobile':  { index: '02', verb: 'Ship',    tagline: 'Intuitive mobile experiences across iOS and Android.' },
  'AI / ML': { index: '03', verb: 'Analyse', tagline: 'Data-driven intelligence that turns raw inputs into outcomes.' },
};

// ── Theme-aware color tokens ───────────────────────────────────────────────
function useColors(isDark: boolean) {
  return {
    bgPrimary:            isDark ? '#08090d'                       : '#f8fafc',
    bgSecondary:          isDark ? '#0d0f15'                       : '#eef2f7',

    textPrimary:          isDark ? '#ffffff'                       : '#0f172a',
    textMuted:            isDark ? '#8a9bb0'                       : '#475569',
    textDim:              isDark ? '#4a5568'                       : '#64748b',

    green:                isDark ? '#22c578'                       : '#16a34a',
    greenLight:           isDark ? '#7fffc4'                       : '#15803d',

    cardBg:               isDark ? 'rgba(255,255,255,0.02)'        : '#ffffff',
    cardBgHover:          isDark ? 'rgba(34,197,120,0.04)'         : '#f0fdf4',
    cardBorder:           isDark ? 'rgba(255,255,255,0.06)'        : 'rgba(0,0,0,0.10)',
    cardShadow:           isDark ? 'none'                          : '0 1px 4px rgba(0,0,0,0.06)',
    cardShadowHover:      isDark ? 'none'                          : '0 4px 16px rgba(22,163,74,0.10)',

    greenBg:              isDark ? 'rgba(34,197,120,0.08)'         : 'rgba(22,163,74,0.10)',
    greenBg06:            isDark ? 'rgba(34,197,120,0.06)'         : 'rgba(22,163,74,0.08)',
    greenBorder22:        isDark ? 'rgba(34,197,120,0.22)'         : 'rgba(22,163,74,0.28)',

    ghostStroke:          isDark ? 'rgba(34,197,120,0.06)'         : 'rgba(22,163,74,0.18)',
    categoryNumStroke:    isDark ? 'rgba(34,197,120,0.15)'         : 'rgba(22,163,74,0.22)',

    borderSubtle06:       isDark ? 'rgba(255,255,255,0.06)'        : 'rgba(0,0,0,0.09)',
    borderSubtle05:       isDark ? 'rgba(255,255,255,0.05)'        : 'rgba(0,0,0,0.08)',

    heroGlow:             isDark
      ? 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,120,0.10), transparent)'
      : 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(22,163,74,0.08), transparent)',

    // Filter tabs
    filterActiveBg:       isDark ? '#22c578'                       : '#16a34a',
    filterActiveShadow:   isDark ? '0 0 24px rgba(34,197,120,0.25)': '0 0 20px rgba(22,163,74,0.20)',
    filterInactiveBorder: isDark ? 'rgba(255,255,255,0.10)'        : 'rgba(0,0,0,0.15)',
    filterInactiveColor:  isDark ? '#8a9bb0'                       : '#64748b',
    filterHoverColor:     isDark ? '#fff'                          : '#0f172a',
    filterHoverBorder:    isDark ? 'rgba(255,255,255,0.25)'        : 'rgba(0,0,0,0.30)',

    // Stats bar section
    statsCardBg:          isDark ? 'rgba(255,255,255,0.02)'        : '#ffffff',
    statsCardBorder:      isDark ? 'rgba(255,255,255,0.06)'        : 'rgba(0,0,0,0.10)',
    statsCardDivider:     isDark ? 'rgba(255,255,255,0.05)'        : 'rgba(0,0,0,0.08)',
    statsHoverBg:         isDark ? 'rgba(34,197,120,0.04)'         : 'rgba(22,163,74,0.06)',

    // Industries pill
    industryBg:           isDark ? 'rgba(255,255,255,0.02)'        : '#ffffff',
    industryBorder:       isDark ? 'rgba(255,255,255,0.06)'        : 'rgba(0,0,0,0.10)',
    industryColor:        isDark ? '#8a9bb0'                       : '#475569',
    industryHoverColor:   isDark ? '#fff'                          : '#0f172a',
    industryHoverBorder:  isDark ? 'rgba(34,197,120,0.25)'         : 'rgba(22,163,74,0.35)',
    industryHoverBg:      isDark ? 'rgba(34,197,120,0.05)'         : 'rgba(22,163,74,0.06)',

    // CTA
    ctaGradient:          isDark
      ? 'linear-gradient(to top, rgba(34,197,120,0.07), transparent)'
      : 'linear-gradient(to top, rgba(22,163,74,0.06), transparent)',
    ctaBorderLine:        isDark ? 'rgba(34,197,120,0.3)'          : 'rgba(22,163,74,0.35)',

    btnBorder:            isDark ? 'rgba(255,255,255,0.10)'        : 'rgba(0,0,0,0.15)',
    btnBorderHover:       isDark ? 'rgba(34,197,120,0.3)'          : 'rgba(22,163,74,0.40)',
    btnBgHover:           isDark ? 'rgba(34,197,120,0.05)'         : 'rgba(22,163,74,0.06)',

    statLabelColor:       isDark ? '#4a5568'                       : '#94a3b8',

    // Featured badge
    featuredBg:           isDark ? 'rgba(34,197,120,0.15)'         : 'rgba(22,163,74,0.12)',
    featuredBorder:       isDark ? 'rgba(34,197,120,0.25)'         : 'rgba(22,163,74,0.30)',

    // Client label
    clientColor:          isDark ? '#4a5568'                       : '#94a3b8',
  };
}

// ── Gradient text helper (safe in both modes — plain color in light) ───────
function gradientTextStyle(isDark: boolean, green: string, greenLight: string): React.CSSProperties {
  if (isDark) {
    return {
      background: `linear-gradient(135deg,${green},${greenLight})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }
  return { color: green };
}

// ── Filter Tab ────────────────────────────────────────────────────────────
function FilterTab({
  label,
  active,
  onClick,
  isDark,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  isDark: boolean;
}) {
  const c = useColors(isDark);
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-full text-sm font-medium transition-all"
      style={
        active
          ? {
              background: c.filterActiveBg,
              border: `1px solid ${c.filterActiveBg}`,
              color: '#fff',
              boxShadow: c.filterActiveShadow,
            }
          : {
              border: `1px solid ${c.filterInactiveBorder}`,
              background: 'transparent',
              color: c.filterInactiveColor,
            }
      }
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = c.filterHoverColor;
          (e.currentTarget as HTMLElement).style.borderColor = c.filterHoverBorder;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.color = c.filterInactiveColor;
          (e.currentTarget as HTMLElement).style.borderColor = c.filterInactiveBorder;
        }
      }}
    >
      {label}
    </button>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  isDark,
}: {
  project: (typeof projects)[number];
  index: number;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const c = useColors(isDark);

  // In light mode the translucent accent overlays look washed-out on white,
  // so we bump opacity slightly and add a card shadow for elevation.
  const cardBg      = hovered ? `${project.accent}${isDark ? '08' : '0d'}` : (isDark ? 'rgba(255,255,255,0.02)' : '#ffffff');
  const cardBorder  = hovered ? `${project.accent}${isDark ? '44' : '60'}` : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.10)');
  const cardShadow  = isDark ? 'none' : (hovered ? `0 6px 24px ${project.accent}20` : '0 1px 4px rgba(0,0,0,0.06)');

  // Visual panel background: slightly more opaque in light mode for readability
  const panelBg = `linear-gradient(135deg, ${project.accent}${isDark ? '12' : '18'}, ${project.accent}${isDark ? '06' : '0c'}, ${isDark ? 'rgba(8,9,13,0.8)' : 'rgba(248,250,252,0.9)'})`;

  return (
    <motion.div
      id={project.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${cardBorder}`,
        background: cardBg,
        boxShadow: cardShadow,
        position: 'relative',
      }}
    >
      {/* Top glow line */}
      <div
        aria-hidden
        className="absolute top-0 left-8 right-8 h-px transition-opacity duration-500 z-10"
        style={{
          opacity: hovered ? 1 : 0,
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      <div className="grid lg:grid-cols-2">

        {/* Visual panel */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ minHeight: '260px', background: panelBg }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              opacity: isDark ? 0.06 : 0.08,
              backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Corner accents */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-bl-full"
            style={{ opacity: isDark ? 0.10 : 0.14, background: `radial-gradient(circle, ${project.accent}, transparent)` }}
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full"
            style={{ opacity: isDark ? 0.10 : 0.14, background: `radial-gradient(circle, ${project.accent}, transparent)` }}
          />

          {/* Central content */}
          <div className="relative z-10 text-center px-8">
            <div className="text-6xl mb-4">{project.emoji}</div>
            <div
              className="text-2xl font-black tracking-tight mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: project.accent }}
            >
              {project.title}
            </div>
            <div
              className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
              style={{
                color: project.accent,
                border: `1px solid ${project.accent}40`,
                background: `${project.accent}${isDark ? '12' : '18'}`,
              }}
            >
              {project.industry}
            </div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm"
                style={{
                  background: c.featuredBg,
                  color: c.green,
                  border: `1px solid ${c.featuredBorder}`,
                }}
              >
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="p-7 lg:p-9 flex flex-col justify-center gap-5"
          style={{ background: isDark ? 'transparent' : 'rgba(255,255,255,0.85)' }}
        >

          {/* Title row */}
          <div>
            <p
              className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-1.5"
              style={{ color: c.clientColor }}
            >
              {project.client}
            </p>
            <div className="flex items-start justify-between gap-3">
              <h3
                className="text-xl font-black leading-snug transition-colors duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: hovered ? project.accent : c.textPrimary,
                }}
              >
                {project.title}
              </h3>
              <Link
                href={`/portfolio/${project.id}`}
                className="flex-shrink-0 mt-1 transition-all duration-300"
                style={{ opacity: hovered ? 1 : 0 }}
              >
                <span
                  className="flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap"
                  style={{ color: c.green }}
                >
                  View case study <ExternalLink size={11} />
                </span>
              </Link>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13.5px] leading-relaxed" style={{ color: c.textMuted }}>
            {project.description}
          </p>

          {/* Stack */}
          <div>
            <p
              className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2.5"
              style={{ color: c.textDim }}
            >
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
                  style={{
                    background: `${project.accent}${isDark ? '10' : '15'}`,
                    color: project.accent,
                    border: `1px solid ${project.accent}${isDark ? '28' : '35'}`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <p
              className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2.5"
              style={{ color: c.textDim }}
            >
              Results
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {project.results.map((r, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[12.5px]" style={{ color: c.textMuted }}>
                  <CheckCircle size={11} style={{ color: c.green, flexShrink: 0 }} />
                  {r}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (resolvedTheme ?? theme ?? 'dark') : 'dark';
  const isDark = currentTheme !== 'light';
  const c = useColors(isDark);

  const visibleCategories =
    activeCategory === 'All' ? categories : categories.filter((cat) => cat === activeCategory);

  return (
    <div className="min-h-screen font-sans" style={{ background: c.bgPrimary }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background: c.bgPrimary }}>
        <div
          aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: c.heroGlow }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none pr-6 hidden lg:block"
          style={{
            fontSize: 'clamp(6rem,18vw,14rem)',
            color: 'transparent',
            WebkitTextStroke: `1px ${c.ghostStroke}`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          WORK
        </div>

        <div className="max-w-4xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: c.green }} aria-hidden />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: c.green }}>
              Case Studies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="font-black leading-[1.04] mb-6 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.8rem, 7vw, 5rem)', color: c.textPrimary }}
          >
            Work That{' '}
            <span style={gradientTextStyle(isDark, c.green, c.greenLight)}>
              Speaks
            </span>
            <br />For Itself
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: c.textMuted }}
          >
            Every project is a testament to our engineering precision, design thinking, and relentless focus on outcomes that actually move the needle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 flex flex-wrap gap-10 md:gap-16"
          >
            {[['9+', 'Live Products'], ['15+', 'Industries Served'], ['98%', 'Client Satisfaction']].map(([num, label]) => (
              <div key={label}>
                <p
                  className="text-3xl font-black"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textPrimary }}
                >
                  {num}
                </p>
                <p
                  className="text-[11px] mt-1 tracking-[0.14em] uppercase font-semibold"
                  style={{ color: c.statLabelColor }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter Tabs ──────────────────────────────── */}
      <section className="pb-10" style={{ background: c.bgPrimary }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-2"
          >
            {(['All', ...categories] as const).map((cat) => (
              <FilterTab
                key={cat}
                label={cat === 'All' ? 'All Projects' : cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                isDark={isDark}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category Groups ───────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          {visibleCategories.map((cat, catIdx) => {
            const meta = categoryMeta[cat];
            const catProjects = projects.filter((p) => p.category === cat);
            const sectionBg = catIdx % 2 === 0 ? c.bgPrimary : c.bgSecondary;

            return (
              <section key={cat} className="py-16 md:py-20" style={{ background: sectionBg }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-10">

                  {/* Category header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-10 pb-6"
                    style={{ borderBottom: `1px solid ${c.borderSubtle06}` }}
                  >
                    <div className="flex items-end gap-6">
                      <span
                        className="text-[4rem] md:text-[5rem] font-black leading-none select-none hidden sm:block"
                        style={{
                          color: 'transparent',
                          WebkitTextStroke: `1px ${c.categoryNumStroke}`,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {meta.index}
                      </span>
                      <div>
                        <span
                          className="inline-block text-[10px] font-bold tracking-[0.24em] uppercase mb-2 px-2 py-0.5 rounded"
                          style={{
                            color: c.green,
                            border: `1px solid ${c.greenBorder22}`,
                            background: c.greenBg06,
                          }}
                        >
                          {meta.verb}
                        </span>
                        <h2
                          className="text-2xl md:text-3xl font-black"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textPrimary }}
                        >
                          {cat}
                        </h2>
                        <p className="text-sm mt-1" style={{ color: c.textDim }}>{meta.tagline}</p>
                      </div>
                    </div>
                    <span className="text-sm hidden md:block" style={{ color: c.textDim }}>
                      {catProjects.length} project{catProjects.length !== 1 ? 's' : ''}
                    </span>
                  </motion.div>

                  {/* Cards */}
                  <div className="flex flex-col gap-4">
                    {catProjects.map((project, i) => (
                      <ProjectCard key={project.id} project={project} index={i} isDark={isDark} />
                    ))}
                  </div>

                </div>
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* ── Stats Bar ────────────────────────────────── */}
      <section className="py-20" style={{ background: c.bgSecondary }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
            style={{
              background: c.statsCardBg,
              border: `1px solid ${c.statsCardBorder}`,
              boxShadow: isDark ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            {[
              { value: '100+', label: 'Projects Delivered' },
              { value: '50+',  label: 'Clients Worldwide'  },
              { value: '15+',  label: 'Industries Served'  },
              { value: '98%',  label: 'Client Satisfaction'},
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center py-10 px-6 transition-colors"
                style={{
                  borderRight: i < 3 ? `1px solid ${c.statsCardDivider}` : 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = c.statsHoverBg}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <div
                  className="text-3xl font-black mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    // Stats gradient: safe to use on both since it's a standalone div, not text on a bg
                    ...(isDark
                      ? {
                          background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }
                      : { color: c.green }),
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: c.textDim }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────── */}
      <section className="py-20" style={{ background: c.bgPrimary }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: c.green }} aria-hidden />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: c.green }}>
                Industries
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textPrimary }}
            >
              Sectors We've Served
            </h2>
            <p className="text-lg max-w-xl" style={{ color: c.textMuted }}>
              From regulated industries to high-growth startups — our solutions adapt to any domain.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {['AdTech', 'Health & Wellness', 'E-commerce', 'EdTech', 'Food & Delivery', 'Healthcare',
              'Civil Engineering', 'IoT / Security', 'Productivity', 'Fintech', 'Logistics', 'SaaS'].map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full text-sm transition-all cursor-default"
                style={{
                  border: `1px solid ${c.industryBorder}`,
                  background: c.industryBg,
                  color: c.industryColor,
                  boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = c.industryHoverColor;
                  (e.currentTarget as HTMLElement).style.borderColor = c.industryHoverBorder;
                  (e.currentTarget as HTMLElement).style.background = c.industryHoverBg;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = c.industryColor;
                  (e.currentTarget as HTMLElement).style.borderColor = c.industryBorder;
                  (e.currentTarget as HTMLElement).style.background = c.industryBg;
                }}
              >
                {ind}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: c.bgSecondary }}>
        <div
          aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: c.ctaGradient }}
        />
        <div
          aria-hidden className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${c.ctaBorderLine}, transparent)` }}
        />
        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: c.green }} aria-hidden />
              <span
                className="text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ color: c.green }}
              >
                Let's Build Together
              </span>
            </div>
            <h2
              className="font-black mb-5 tracking-tight leading-[1.04]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: c.textPrimary }}
            >
              Ready to build something{' '}
              <span style={gradientTextStyle(isDark, c.green, c.greenLight)}>
                remarkable?
              </span>
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: c.textMuted }}>
              Tell us about your project and we'll find the right solution together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm"
                  style={{
                    background: `linear-gradient(135deg,${isDark ? '#0d7040' : '#15803d'},${c.green})`,
                    boxShadow: `0 0 40px ${c.greenBg}`,
                  }}
                >
                  Start a project <ArrowRight size={15} />
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    border: `1px solid ${c.btnBorder}`,
                    background: 'transparent',
                    color: c.textPrimary,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = c.btnBorderHover;
                    (e.currentTarget as HTMLElement).style.background = c.btnBgHover;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = c.btnBorder;
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  View services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}