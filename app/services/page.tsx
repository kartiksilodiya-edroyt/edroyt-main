'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, Globe, Palette, Building2, Database, Package,
  BarChart2, Server, LineChart, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// ── Data ──────────────────────────────────────────────────────────────────
const services = [
  {
    id: 'mobile-solutions',
    icon: Smartphone,
    category: 'Product',
    title: 'Mobile Solutions',
    pills: [
      { label: 'React Native', color: 'blue' },
      { label: 'Flutter', color: 'purple' },
      { label: 'Swift', color: 'blue' },
      { label: 'Kotlin', color: 'purple' },
    ],
    description:
      "When you are thinking of the mobile app for your product, it's not the development that needs to be done. Starting from its UX to UI and then heading towards the development phase is done by only 10% of the companies and luckily we are one of them to build intuitive, aesthetic and valuable mobile applications.",
  },
  {
    id: 'web-solutions',
    icon: Globe,
    category: 'Product',
    title: 'Web Solutions',
    pills: [
      { label: 'Next.js', color: 'blue' },
      { label: 'TypeScript', color: 'purple' },
      { label: 'Tailwind CSS', color: 'purple' },
      { label: 'Node.js', color: 'blue' },
    ],
    description:
      'The ever-expanding digital world demands a strong digital presence. We provide web-based solutions starting from landing pages to complex web-based admins. Anything for the web is our expertise to get your project done successfully.',
  },
  {
    id: 'ui-ux-solution',
    icon: Palette,
    category: 'Product',
    title: 'UI–UX Solution',
    pills: [
      { label: 'Figma', color: 'purple' },
      { label: 'Framer', color: 'blue' },
      { label: 'Prototyping', color: 'blue' },
      { label: 'User Research', color: 'purple' },
    ],
    description:
      'There are only a few companies that understand the difference between user interfaces and user experiences. Any project with good UX and satisfactory UI is rare and we are proud to have such talents to get it done for you.',
  },
  {
    id: 'enterprise-solutions',
    icon: Building2,
    category: 'Enterprise',
    title: 'Enterprise Solutions',
    pills: [
      { label: 'SAP', color: 'blue' },
      { label: 'Odoo ERP', color: 'purple' },
      { label: 'Salesforce', color: 'purple' },
      { label: 'Oracle', color: 'blue' },
    ],
    description:
      'We ensure a fast-track transformation through the adoption of new technologies on industry-leading platforms. Vast experience in implementation and customisation of leading ERP products and open-source-based ERP solutions.',
  },
  {
    id: 'big-data',
    icon: Database,
    category: 'Enterprise',
    title: 'Big Data Solution',
    pills: [
      { label: 'Apache Spark', color: 'blue' },
      { label: 'Kafka', color: 'purple' },
      { label: 'Hadoop', color: 'purple' },
      { label: 'Snowflake', color: 'blue' },
    ],
    description:
      'Data is a valuable asset for your business, but getting value from it can be challenging. We are here to help you with optimising your big data problems and turning raw information into competitive advantage.',
  },
  {
    id: 'product-development',
    icon: Package,
    category: 'Enterprise',
    title: 'Product Development',
    pills: [
      { label: 'Agile / Scrum', color: 'purple' },
      { label: 'CI / CD', color: 'blue' },
      { label: 'Microservices', color: 'blue' },
      { label: 'DevOps', color: 'purple' },
    ],
    description:
      'With extensive experience helping companies develop products across a wide range of industries, we handle research, development, and marketing completely in-house. Products are built on trust — leverage our skilled team to make your dream a reality.',
  },
  {
    id: 'data-science',
    icon: LineChart,
    category: 'Intelligence',
    title: 'Data Science',
    pills: [
      { label: 'Python', color: 'blue' },
      { label: 'TensorFlow', color: 'purple' },
      { label: 'PyTorch', color: 'purple' },
      { label: 'scikit-learn', color: 'blue' },
    ],
    description:
      'By leveraging real-time data processing and predictive analytics, we help companies run experiments on their data in search of valuable insights. Deep expertise in machine learning, statistics, AI, and software engineering to solve analytical problems.',
  },
  {
    id: 'infrastructure-support',
    icon: Server,
    category: 'Intelligence',
    title: 'Infrastructure Support',
    pills: [
      { label: 'AWS', color: 'blue' },
      { label: 'Kubernetes', color: 'purple' },
      { label: 'Terraform', color: 'purple' },
      { label: 'Docker', color: 'blue' },
    ],
    description:
      'Infrastructure support ensures your critical applications perform optimally and supports business continuity by minimising unplanned downtime. Proactive monitoring, predictive analytics, and continuous diagnostics across all layers of your IT stack.',
  },
  {
    id: 'data-visualization',
    icon: BarChart2,
    category: 'Intelligence',
    title: 'Data Visualization',
    pills: [
      { label: 'Power BI', color: 'purple' },
      { label: 'Tableau', color: 'blue' },
      { label: 'D3.js', color: 'blue' },
      { label: 'Grafana', color: 'purple' },
    ],
    description:
      'Leveraging real-time data processing and predictive analytics, we help companies run experiments on their data in search of actionable information. We translate complex datasets into clear visual stories that drive decisions.',
  },
];

// pill positions: [top-left, top-right, bottom-left, bottom-right]
const pillPositions = [
  { top: '-10px', left: '56px' },
  { top: '-10px', right: '40px' },
  { bottom: '-10px', left: '72px' },
  { bottom: '-10px', right: '24px' },
] as const;

// In light mode, pills get slightly more muted/professional tones
const pillColorsDark: Record<string, { bg: string; text: string }> = {
  blue:   { bg: '#5b8ff9', text: '#fff' },
  purple: { bg: '#a78bfa', text: '#fff' },
};
const pillColorsLight: Record<string, { bg: string; text: string }> = {
  blue:   { bg: '#3b6fd4', text: '#fff' },
  purple: { bg: '#7c3aed', text: '#fff' },
};

const categories = ['Product', 'Enterprise', 'Intelligence'] as const;
type Category = (typeof categories)[number] | 'All';

const categoryMeta: Record<string, {
  index: string;
  verb: string;
  tagline: string;
  count: number;
}> = {
  Product: {
    index: '01',
    verb: 'Build',
    tagline: 'From pixel-perfect interfaces to powerful mobile experiences.',
    count: 3,
  },
  Enterprise: {
    index: '02',
    verb: 'Scale',
    tagline: 'Transform your operations with enterprise-grade platforms and data.',
    count: 3,
  },
  Intelligence: {
    index: '03',
    verb: 'Analyse',
    tagline: 'Turn raw data into decisions with science, infrastructure, and vision.',
    count: 3,
  },
};

// ── Theme-aware color tokens (mirrors About page pattern exactly) ──────────
function useColors(isDark: boolean) {
  return {
    bgPrimary:       isDark ? '#08090d'                     : '#f8fafc',
    bgSecondary:     isDark ? '#0d0f15'                     : '#eef2f7',

    textPrimary:     isDark ? '#ffffff'                     : '#0f172a',
    textMuted:       isDark ? '#8a9bb0'                     : '#475569',
    textDim:         isDark ? '#4a5568'                     : '#64748b',

    green:           isDark ? '#22c578'                     : '#16a34a',
    greenLight:      isDark ? '#7fffc4'                     : '#15803d',

    cardBg:          isDark ? 'rgba(255,255,255,0.02)'      : '#ffffff',
    cardBgHover:     isDark ? 'rgba(34,197,120,0.04)'       : '#f0fdf4',
    cardBorder:      isDark ? 'rgba(255,255,255,0.06)'      : 'rgba(0,0,0,0.10)',
    cardBorderHover: isDark ? 'rgba(34,197,120,0.28)'       : 'rgba(22,163,74,0.40)',
    cardShadow:      isDark ? 'none'                        : '0 1px 4px rgba(0,0,0,0.06)',
    cardShadowHover: isDark ? 'none'                        : '0 4px 16px rgba(22,163,74,0.10)',

    greenBg:         isDark ? 'rgba(34,197,120,0.08)'       : 'rgba(22,163,74,0.10)',
    greenBorder:     isDark ? 'rgba(34,197,120,0.15)'       : 'rgba(22,163,74,0.25)',
    greenBg10:       isDark ? 'rgba(34,197,120,0.10)'       : 'rgba(22,163,74,0.10)',
    greenBorder20:   isDark ? 'rgba(34,197,120,0.20)'       : 'rgba(22,163,74,0.25)',
    greenBg06:       isDark ? 'rgba(34,197,120,0.06)'       : 'rgba(22,163,74,0.08)',
    greenBorder22:   isDark ? 'rgba(34,197,120,0.22)'       : 'rgba(22,163,74,0.28)',

    ghostStroke:     isDark ? 'rgba(34,197,120,0.06)'       : 'rgba(22,163,74,0.18)',
    glowLine:        isDark
      ? 'linear-gradient(90deg, transparent, #22c578, transparent)'
      : 'linear-gradient(90deg, transparent, #16a34a, transparent)',

    connectorLine:   isDark ? 'rgba(34,197,120,0.12)'       : 'rgba(22,163,74,0.18)',

    borderSubtle:    isDark ? 'rgba(255,255,255,0.05)'      : 'rgba(0,0,0,0.08)',
    borderSubtle06:  isDark ? 'rgba(255,255,255,0.06)'      : 'rgba(0,0,0,0.09)',

    filterActiveBg:  isDark ? '#22c578'                     : '#16a34a',
    filterActiveBorder: isDark ? '#22c578'                  : '#16a34a',
    filterActiveShadow: isDark
      ? '0 0 24px rgba(34,197,120,0.25)'
      : '0 0 20px rgba(22,163,74,0.20)',
    filterInactiveBorder: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.15)',
    filterInactiveColor:  isDark ? '#8a9bb0'                : '#64748b',
    filterHoverColor:     isDark ? '#fff'                   : '#0f172a',
    filterHoverBorder:    isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.30)',

    heroGlow:        isDark
      ? 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,120,0.10), transparent)'
      : 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(22,163,74,0.08), transparent)',

    ctaGradient:     isDark
      ? 'linear-gradient(to top, rgba(34,197,120,0.07), transparent)'
      : 'linear-gradient(to top, rgba(22,163,74,0.06), transparent)',
    ctaBorderLine:   isDark ? 'rgba(34,197,120,0.3)'        : 'rgba(22,163,74,0.35)',

    btnBorder:       isDark ? 'rgba(255,255,255,0.10)'      : 'rgba(0,0,0,0.15)',
    btnBorderHover:  isDark ? 'rgba(34,197,120,0.3)'        : 'rgba(22,163,74,0.40)',
    btnBgHover:      isDark ? 'rgba(34,197,120,0.05)'       : 'rgba(22,163,74,0.06)',

    // Ghost number stroke on category headers
    categoryNumStroke: isDark ? 'rgba(34,197,120,0.15)'     : 'rgba(22,163,74,0.22)',

    statLabelColor:  isDark ? '#4a5568'                     : '#94a3b8',
  };
}

// ── Gradient text helper (same as About page — plain color in light mode) ─
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

// ── Pill ──────────────────────────────────────────────────────────────────
function FloatingPill({
  label,
  color,
  position,
  delay,
  isDark,
}: {
  label: string;
  color: string;
  position: (typeof pillPositions)[number];
  delay: number;
  isDark: boolean;
}) {
  const map = isDark ? pillColorsDark : pillColorsLight;
  const c = map[color] ?? map.blue;
  return (
    <motion.span
      initial={{ opacity: 0, y: color === 'blue' ? -6 : 6, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: color === 'blue' ? -4 : 4, scale: 0.92 }}
      transition={{ duration: 0.22, delay, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        ...position,
        padding: '4px 13px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        background: c.bg,
        color: c.text,
        pointerEvents: 'none',
        zIndex: 20,
        // Light mode: add a subtle shadow so pills don't float on white
        boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      {label}
    </motion.span>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  isLast,
  isDark,
}: {
  service: (typeof services)[number];
  index: number;
  isLast: boolean;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;
  const c = useColors(isDark);

  return (
    <motion.div
      id={service.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: 'easeOut' }}
      className="group relative"
      style={{ overflow: 'visible' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Connector line */}
      {!isLast && (
        <div
          aria-hidden
          className="absolute bottom-0 left-9 w-px h-6 -mb-6"
          style={{ background: c.connectorLine }}
        />
      )}

      {/* Floating pills */}
      <AnimatePresence>
        {hovered &&
          service.pills.map((pill, i) => (
            <FloatingPill
              key={pill.label}
              label={pill.label}
              color={pill.color}
              position={pillPositions[i]}
              delay={i * 0.07}
              isDark={isDark}
            />
          ))}
      </AnimatePresence>

      <div
        className="relative flex gap-6 p-6 rounded-xl border transition-all duration-300 cursor-default"
        style={{
          overflow: 'visible',
          background:   hovered ? c.cardBgHover : c.cardBg,
          borderColor:  hovered ? c.cardBorderHover : c.cardBorder,
          boxShadow:    hovered ? c.cardShadowHover : c.cardShadow,
        }}
      >
        {/* Top glow line */}
        <div
          aria-hidden
          className="absolute top-0 left-8 right-8 h-px transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: c.glowLine,
          }}
        />

        {/* Icon */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: c.greenBg10,
              border: `1px solid ${c.greenBorder20}`,
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <Icon size={17} style={{ color: c.green }} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className="font-bold text-[16px] leading-snug transition-colors duration-200"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: hovered ? c.green : c.textPrimary,
              }}
            >
              {service.title}
            </h3>
            <Link
              href="/contact"
              className="flex-shrink-0 mt-0.5 transition-opacity duration-300"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              <span
                className="flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap"
                style={{ color: c.green }}
              >
                Start a project <ArrowRight size={11} />
              </span>
            </Link>
          </div>
          <p
            className="text-[13.5px] leading-relaxed"
            style={{ color: c.textMuted }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
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
              border: `1px solid ${c.filterActiveBorder}`,
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

// ── Page ──────────────────────────────────────────────────────────────────
export default function ServicesPage() {
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
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: c.heroGlow }}
        />
        {/* Ghost text */}
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[clamp(6rem,18vw,14rem)] font-black leading-none select-none pointer-events-none pr-6 hidden lg:block"
          style={{
            color: 'transparent',
            WebkitTextStroke: `1px ${c.ghostStroke}`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          SERVICES
        </div>

        <div className="max-w-4xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: c.green }} aria-hidden />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ color: c.green }}
            >
              What We Do
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.04] mb-6 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textPrimary }}
          >
            We are{' '}
            {/* Use gradientTextStyle helper — safe in both modes */}
            <span style={gradientTextStyle(isDark, c.green, c.greenLight)}>
              Development
            </span>
            <br />Experts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: c.textMuted }}
          >
            Since we strive for early success, we are committed to providing you with the best
            possible service so that your business can be stronger than ever before.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 flex flex-wrap gap-10 md:gap-16"
          >
            {[
              ['9', 'Service Areas'],
              ['100+', 'Projects Delivered'],
              ['10+', 'Years Experience'],
            ].map(([num, label]) => (
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap gap-2"
          >
            {(['All', ...categories] as const).map((cat) => (
              <FilterTab
                key={cat}
                label={cat === 'All' ? 'All Services' : cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                isDark={isDark}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category groups ──────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
          style={{ background: c.bgPrimary }}
        >
          {visibleCategories.map((cat, catIdx) => {
            const meta = categoryMeta[cat];
            const catServices = services.filter((s) => s.category === cat);
            // Alternate bg like About page sections
            const sectionBg = catIdx % 2 === 0 ? c.bgPrimary : c.bgSecondary;

            return (
              <section key={cat} className="py-16 md:py-20" style={{ background: sectionBg }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-10">

                  {/* Category header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
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
                      {meta.count} services
                    </span>
                  </motion.div>

                  {/* Service cards */}
                  <div className="grid md:grid-cols-2 gap-4" style={{ overflow: 'visible' }}>
                    {catServices.map((service, i) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        index={i}
                        isLast={i === catServices.length - 1}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: c.bgSecondary }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: c.ctaGradient }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${c.ctaBorderLine}, transparent)` }}
        />

        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
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
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-[1.04]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: c.textPrimary }}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-all"
                  style={{
                    background: `linear-gradient(135deg,${isDark ? '#0d7040' : '#15803d'},${c.green})`,
                    boxShadow: `0 0 40px ${c.greenBg}`,
                  }}
                >
                  Get in touch
                  <ArrowRight size={15} />
                </motion.button>
              </Link>
              <Link href="#mobile-solutions">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                  Browse services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}