'use client';

import { motion } from 'framer-motion';
import {
  Smartphone, Globe, Palette, Building2, Database, Package,
  BarChart2, Server, LineChart, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

// ── Data ──────────────────────────────────────────────────────────────────
const services = [
  {
    id: 'mobile-solutions',
    icon: Smartphone,
    category: 'Product',
    title: 'Mobile Solutions',
    description:
      'When you are thinking of the mobile app for your product, it\'s not the development that needs to be done. Starting from its UX to UI and then heading towards the development phase is done by only 10% of the companies and luckily we are one of them to build intuitive, aesthetic and valuable mobile applications.',
  },
  {
    id: 'web-solutions',
    icon: Globe,
    category: 'Product',
    title: 'Web Solutions',
    description:
      'The ever-expanding digital world demands a strong digital presence. We provide web-based solutions starting from landing pages to complex web-based admins. Anything for the web is our expertise to get your project done successfully.',
  },
  {
    id: 'ui-ux-solution',
    icon: Palette,
    category: 'Product',
    title: 'UI–UX Solution',
    description:
      'There are only a few companies that understand the difference between user interfaces and user experiences. Any project with good UX and satisfactory UI is rare and we are proud to have such talents to get it done for you.',
  },
  {
    id: 'enterprise-solutions',
    icon: Building2,
    category: 'Enterprise',
    title: 'Enterprise Solutions',
    description:
      'We ensure a fast-track transformation through the adoption of new technologies on industry-leading platforms. Vast experience in implementation and customisation of leading ERP products and open-source-based ERP solutions.',
  },
  {
    id: 'big-data',
    icon: Database,
    category: 'Enterprise',
    title: 'Big Data Solution',
    description:
      'Data is a valuable asset for your business, but getting value from it can be challenging. We are here to help you with optimising your big data problems and turning raw information into competitive advantage.',
  },
  {
    id: 'product-development',
    icon: Package,
    category: 'Enterprise',
    title: 'Product Development',
    description:
      'With extensive experience helping companies develop products across a wide range of industries, we handle research, development, and marketing completely in-house. Products are built on trust — leverage our skilled team to make your dream a reality.',
  },
  {
    id: 'data-science',
    icon: LineChart,
    category: 'Intelligence',
    title: 'Data Science',
    description:
      'By leveraging real-time data processing and predictive analytics, we help companies run experiments on their data in search of valuable insights. Deep expertise in machine learning, statistics, AI, and software engineering to solve analytical problems.',
  },
  {
    id: 'infrastructure-support',
    icon: Server,
    category: 'Intelligence',
    title: 'Infrastructure Support',
    description:
      'Infrastructure support ensures your critical applications perform optimally and supports business continuity by minimising unplanned downtime. Proactive monitoring, predictive analytics, and continuous diagnostics across all layers of your IT stack.',
  },
  {
    id: 'data-visualization',
    icon: BarChart2,
    category: 'Intelligence',
    title: 'Data Visualization',
    description:
      'Leveraging real-time data processing and predictive analytics, we help companies run experiments on their data in search of actionable information. We translate complex datasets into clear visual stories that drive decisions.',
  },
];

const categories = ['Product', 'Enterprise', 'Intelligence'] as const;

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

// ── Card ──────────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  isLast,
}: {
  service: (typeof services)[number];
  index: number;
  isLast: boolean;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      id={service.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: 'easeOut' }}
      className="group relative"
    >
      {/* Connector line (not on last card) */}
      {!isLast && (
        <div
          aria-hidden
          className="absolute bottom-0 left-9 w-px h-6 -mb-6"
          style={{ background: 'rgba(34,197,120,0.12)' }}
        />
      )}

      <div
        className="relative flex gap-6 p-6 rounded-xl border transition-all duration-300 overflow-hidden cursor-default"
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,120,0.28)';
          (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.04)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
        }}
      >
        {/* Top glow line */}
        <div
          aria-hidden
          className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, #22c578, transparent)' }}
        />

        {/* Icon column */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: 'rgba(34,197,120,0.1)', border: '1px solid rgba(34,197,120,0.15)' }}
          >
            <Icon size={17} style={{ color: '#22c578' }} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className="text-white font-bold text-[16px] leading-snug group-hover:text-[#7fffc4] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {service.title}
            </h3>
            <Link href="/contact" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
              <span
                className="flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap"
                style={{ color: '#22c578' }}
              >
                Start a project <ArrowRight size={11} />
              </span>
            </Link>
          </div>
          <p className="text-[#8a9bb0] text-[13.5px] leading-relaxed">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <div className="min-h-screen font-sans" style={{ background: '#08090d' }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,120,0.10), transparent)',
          }}
        />
        {/* Large ghost text */}
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[clamp(6rem,18vw,14rem)] font-black leading-none select-none pointer-events-none pr-6 hidden lg:block"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(34,197,120,0.06)',
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
            <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
            <span className="text-[#22c578] text-[11px] font-bold tracking-[0.22em] uppercase">
              What We Do
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-6 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            We are{' '}
            <span style={{
              background: 'linear-gradient(135deg,#22c578,#7fffc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Development
            </span>
            <br />Experts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-[#8a9bb0] text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            Since we strive for early success, we are committed to providing you with the best
            possible service so that your business can be stronger than ever before.
          </motion.p>

          {/* Stat strip */}
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
                  className="text-3xl font-black text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {num}
                </p>
                <p className="text-[11px] text-[#4a5568] mt-1 tracking-[0.14em] uppercase font-semibold">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category groups ──────────────────────────── */}
      {categories.map((cat) => {
        const meta = categoryMeta[cat];
        const catServices = services.filter((s) => s.category === cat);

        return (
          <section key={cat} className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

              {/* Category header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-end justify-between mb-10 pb-6"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-end gap-6">
                  {/* Big index */}
                  <span
                    className="text-[4rem] md:text-[5rem] font-black leading-none select-none hidden sm:block"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(34,197,120,0.15)',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {meta.index}
                  </span>
                  <div>
                    {/* Verb tag */}
                    <span
                      className="inline-block text-[10px] font-bold tracking-[0.24em] uppercase mb-2 px-2 py-0.5 rounded"
                      style={{
                        color: '#22c578',
                        border: '1px solid rgba(34,197,120,0.22)',
                        background: 'rgba(34,197,120,0.06)',
                      }}
                    >
                      {meta.verb}
                    </span>
                    <h2
                      className="text-2xl md:text-3xl font-black text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {cat}
                    </h2>
                    <p className="text-[#4a5568] text-sm mt-1">{meta.tagline}</p>
                  </div>
                </div>

                <span className="text-[#4a5568] text-sm hidden md:block">
                  {meta.count} services
                </span>
              </motion.div>

              {/* Service cards — two-column on large screens */}
              <div className="grid md:grid-cols-2 gap-4">
                {catServices.map((service, i) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={i}
                    isLast={i === catServices.length - 1}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(34,197,120,0.07), transparent)' }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,120,0.3), transparent)' }}
        />

        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
              <span className="text-[#22c578] text-[11px] font-bold tracking-[0.22em] uppercase">
                Let's Build Together
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight leading-[1.04]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ready to build something{' '}
              <span style={{
                background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                remarkable?
              </span>
            </h2>
            <p className="text-[#8a9bb0] text-lg mb-10 leading-relaxed">
              Tell us about your project and we'll find the right solution together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-all"
                  style={{
                    background: 'linear-gradient(135deg,#0d7040,#22c578)',
                    boxShadow: '0 0 40px rgba(34,197,120,0.22)',
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
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all"
                  style={{
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,120,0.3)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
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