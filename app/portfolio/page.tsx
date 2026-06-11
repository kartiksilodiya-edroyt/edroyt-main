'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import image from 'next/image';

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

// ── Filter Tab ────────────────────────────────────────────────────────────
function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-full text-sm font-medium transition-all"
      style={
        active
          ? { background: '#22c578', border: '1px solid #22c578', color: '#fff', boxShadow: '0 0 24px rgba(34,197,120,0.25)' }
          : { border: '1px solid rgba(255,255,255,0.10)', background: 'transparent', color: '#8a9bb0' }
      }
      onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'; } }}
      onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.color = '#8a9bb0'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)'; } }}
    >
      {label}
    </button>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

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
        border: hovered ? `1px solid ${project.accent}44` : '1px solid rgba(255,255,255,0.06)',
        background: hovered ? `${project.accent}08` : 'rgba(255,255,255,0.02)',
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

        {/* Visual panel — branded placeholder */}
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ minHeight: '260px', background: `linear-gradient(135deg, ${project.accent}12, ${project.accent}06, rgba(8,9,13,0.8))` }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent)` }} />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full opacity-10"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent)` }} />

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
              style={{ color: project.accent, border: `1px solid ${project.accent}40`, background: `${project.accent}12` }}
            >
              {project.industry}
            </div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm"
                style={{ background: 'rgba(34,197,120,0.15)', color: '#22c578', border: '1px solid rgba(34,197,120,0.25)' }}
              >
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-7 lg:p-9 flex flex-col justify-center gap-5">

          {/* Title row */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-1.5" style={{ color: '#4a5568' }}>
              {project.client}
            </p>
            <div className="flex items-start justify-between gap-3">
              <h3
                className="text-xl font-black leading-snug transition-colors duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: hovered ? project.accent : '#fff',
                }}
              >
                {project.title}
              </h3>
              <Link
                href={`/portfolio/${project.id}`}
                className="flex-shrink-0 mt-1 transition-all duration-300"
                style={{ opacity: hovered ? 1 : 0 }}
              >
                <span className="flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap" style={{ color: '#22c578' }}>
                  View case study <ExternalLink size={11} />
                </span>
              </Link>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13.5px] leading-relaxed" style={{ color: '#8a9bb0' }}>
            {project.description}
          </p>

          {/* Stack */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2.5" style={{ color: '#4a5568' }}>Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
                  style={{
                    background: `${project.accent}10`,
                    color: project.accent,
                    border: `1px solid ${project.accent}28`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2.5" style={{ color: '#4a5568' }}>Results</p>
            <div className="grid grid-cols-2 gap-1.5">
              {project.results.map((r, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[12.5px]" style={{ color: '#8a9bb0' }}>
                  <CheckCircle size={11} style={{ color: '#22c578', flexShrink: 0 }} />
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

  const visibleCategories =
    activeCategory === 'All' ? categories : categories.filter((c) => c === activeCategory);

  return (
    <div className="min-h-screen font-sans" style={{ background: '#08090d' }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div
          aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,120,0.10), transparent)' }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none pr-6 hidden lg:block"
          style={{
            fontSize: 'clamp(6rem,18vw,14rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(34,197,120,0.06)',
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
            <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>
              Case Studies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="font-black text-white leading-[1.04] mb-6 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}
          >
            Work That{' '}
            <span style={{
              background: 'linear-gradient(135deg,#22c578,#7fffc4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Speaks
            </span>
            <br />For Itself
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: '#8a9bb0' }}
          >
            Every project is a testament to our engineering precision, design thinking, and relentless focus on outcomes that actually move the needle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 flex flex-wrap gap-10 md:gap-16"
          >
            {[['9+', 'Live Products'], ['15+', 'Industries Served'], ['98%', 'Client Satisfaction']].map(([num, label]) => (
              <div key={label}>
                <p className="text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{num}</p>
                <p className="text-[11px] mt-1 tracking-[0.14em] uppercase font-semibold" style={{ color: '#4a5568' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter Tabs ──────────────────────────────── */}
      <section className="pb-10">
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
          {visibleCategories.map((cat) => {
            const meta = categoryMeta[cat];
            const catProjects = projects.filter((p) => p.category === cat);

            return (
              <section key={cat} className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">

                  {/* Category header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-10 pb-6"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-end gap-6">
                      <span
                        className="text-[4rem] md:text-[5rem] font-black leading-none select-none hidden sm:block"
                        style={{ color: 'transparent', WebkitTextStroke: '1px rgba(34,197,120,0.15)', fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {meta.index}
                      </span>
                      <div>
                        <span
                          className="inline-block text-[10px] font-bold tracking-[0.24em] uppercase mb-2 px-2 py-0.5 rounded"
                          style={{ color: '#22c578', border: '1px solid rgba(34,197,120,0.22)', background: 'rgba(34,197,120,0.06)' }}
                        >
                          {meta.verb}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {cat}
                        </h2>
                        <p className="text-sm mt-1" style={{ color: '#4a5568' }}>{meta.tagline}</p>
                      </div>
                    </div>
                    <span className="text-sm hidden md:block" style={{ color: '#4a5568' }}>
                      {catProjects.length} project{catProjects.length !== 1 ? 's' : ''}
                    </span>
                  </motion.div>

                  {/* Cards */}
                  <div className="flex flex-col gap-4">
                    {catProjects.map((project, i) => (
                      <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                  </div>

                </div>
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* ── Stats Bar ────────────────────────────────── */}
      <section className="py-20" style={{ background: '#0d0f15' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
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
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.04)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <div
                  className="text-3xl font-black mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#4a5568' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────── */}
      <section className="py-20" style={{ background: '#08090d' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>Industries</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Sectors We've Served
            </h2>
            <p className="text-lg max-w-xl" style={{ color: '#8a9bb0' }}>
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
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: '#8a9bb0' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,120,0.25)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#8a9bb0';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                {ind}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(34,197,120,0.07), transparent)' }} />
        <div aria-hidden className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,120,0.3), transparent)' }} />
        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>Let's Build Together</span>
            </div>
            <h2
              className="font-black text-white mb-5 tracking-tight leading-[1.04]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Ready to build something{' '}
              <span style={{
                background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                remarkable?
              </span>
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#8a9bb0' }}>
              Tell us about your project and we'll find the right solution together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg,#0d7040,#22c578)', boxShadow: '0 0 40px rgba(34,197,120,0.22)' }}
                >
                  Start a project <ArrowRight size={15} />
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'transparent' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,120,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
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