'use client';

import { motion } from 'framer-motion';
import { Users, Zap, TrendingUp, Heart } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Engineering Team',
    description:
      '150+ engineers with battle-tested architecture knowledge and 12 years of domain expertise across enterprise, startup, and scale-up environments.',
  },
  {
    icon: Zap,
    title: 'Agile Development Process',
    description:
      'Weekly sprint reviews, live dashboards, and a dedicated tech lead on every project. No black boxes — from kickoff to first milestone in 2 weeks.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Architecture',
    description:
      'We design for the 10x version of your product from day one. Clean architecture, zero technical debt, built to grow without costly rewrites.',
  },
  {
    icon: Heart,
    title: 'Long-Term Partnership',
    description:
      "98% client retention because we don't close a project until you're genuinely happy. We obsess over your growth long after launch.",
  },
];

const metrics = [
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Team Members', value: '150+' },
  { label: 'Industries Served', value: '15+' },
  { label: 'Years of Experience', value: '8+' },
  { label: 'Global Offices', value: '4' },
];

const clientPhotos = [
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60',
  'https://images.pexels.com/photos/7749095/pexels-photo-7749095.jpeg?auto=compress&cs=tinysrgb&w=60',
  'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=60',
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: '#08090d' }}>

      {/* ── Background ─────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Vertical rule left-side accent */}
        <div
          className="absolute top-0 bottom-0 w-px left-[10%] hidden lg:block"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(34,197,120,0.10) 30%, rgba(34,197,120,0.10) 70%, transparent)' }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.04]"
          style={{ background: '#22c578' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section label ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
          <span className="text-[#22c578] text-[11px] font-bold tracking-[0.22em] uppercase">
            Why Choose Us
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

          {/* ── LEFT: headline + feature list ───────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2
                className="text-4xl md:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.04] tracking-tight mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Perks of choosing
                <br />
                <span style={{
                  background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  the right partner.
                </span>
              </h2>
              <p className="text-[#8a9bb0] text-base leading-relaxed mb-12 max-w-md">
                We bring battle-tested architecture, a team of 150+ engineers, and 12 years of
                domain knowledge. Your in-house team focuses on the vision — we execute at scale.
              </p>
            </motion.div>

            {/* Feature rows */}
            <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.09 }}
                  className="group flex gap-5 py-6 cursor-default"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(34,197,120,0.08)',
                      border: '1px solid rgba(34,197,120,0.14)',
                    }}
                  >
                    <feature.icon size={16} style={{ color: '#22c578' }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-white font-bold text-[15px] mb-1.5 group-hover:text-[#7fffc4] transition-colors duration-200"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#4a5568] text-sm leading-relaxed group-hover:text-[#8a9bb0] transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover tick */}
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5"
                    style={{ background: 'rgba(34,197,120,0.12)' }}>
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#22c578" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: metrics panel ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="relative lg:sticky lg:top-28"
          >
            {/* Panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#0d0f15',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Panel header bar */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: '#22c578' }}>
                  Performance Metrics
                </span>
                {/* Live indicator */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: '#22c578',
                      animation: 'ping 1.6s ease-in-out infinite',
                    }}
                  />
                  <span className="text-[11px] text-[#4a5568] font-medium">Live</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div
                className="grid grid-cols-2 gap-px"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.07 }}
                    className="group flex flex-col items-start justify-between p-5 transition-colors duration-300 cursor-default"
                    style={{ background: '#0d0f15' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = '#0d0f15';
                    }}
                  >
                    {/* Top accent line on hover */}
                    <div
                      className="w-full h-px mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(90deg,#22c578,transparent)' }}
                      aria-hidden
                    />
                    <span
                      className="text-3xl font-black leading-none tabular-nums"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {metric.value}
                    </span>
                    <span className="text-[11px] text-[#4a5568] mt-2 leading-tight font-medium">
                      {metric.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Footer strip */}
              <div
                className="px-6 py-5 flex items-center justify-between gap-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Avatar stack + rating */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {clientPhotos.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        aria-hidden
                        className="w-8 h-8 rounded-full object-cover"
                        style={{ border: '2px solid #0d0f15' }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">200+ happy clients</p>
                    <div className="flex gap-0.5 mt-1.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width={10} height={10} viewBox="0 0 24 24" fill="#22c578">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ISO badge */}
                <div
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide"
                  style={{
                    color: '#22c578',
                    border: '1px solid rgba(34,197,120,0.22)',
                    background: 'rgba(34,197,120,0.06)',
                  }}
                >
                  ISO Certified
                </div>
              </div>
            </div>

            {/* Floating callout — 2-week delivery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="absolute -bottom-5 -left-5 rounded-xl px-4 py-3 hidden md:flex items-center gap-3"
              style={{
                background: '#111420',
                border: '1px solid rgba(34,197,120,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,197,120,0.12)' }}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#22c578" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold leading-none">First delivery in 2 weeks</p>
                <p className="text-[#4a5568] text-[11px] mt-1">Kickoff → working prototype</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
}