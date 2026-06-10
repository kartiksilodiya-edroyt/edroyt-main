'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Data ──────────────────────────────────────────────────────────────────
const statistics = [
  {
    value: 8,
    suffix: '+',
    label: 'Years of\nExperience',
    desc: 'Deep enterprise and startup expertise',
    size: 'large',   // dominant card
  },
  {
    value: 500,
    suffix: '+',
    label: 'Projects\nDelivered',
    desc: 'Across fintech, health, SaaS, e-commerce',
    size: 'large',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Industries\nServed',
    desc: 'From regulated finance to consumer apps',
    size: 'small',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client\nSatisfaction',
    desc: 'Because results speak louder than promises',
    size: 'small',
  },
];

// ── Animated Counter ──────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix = '',
  large = false,
}: {
  value: number;
  suffix?: string;
  large?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 50;
    const delay = 30;
    let step = 0;
    // Ease-out: heavier at start, slows at end
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3); // ease-out cubic
      const current = Math.round(progress * value);
      setCount(current);
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, (duration - delay * steps) / steps + delay);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className={`font-black tabular-nums leading-none tracking-tight ${
        large
          ? 'text-[6rem] md:text-[8rem] lg:text-[9rem]'
          : 'text-[4.5rem] md:text-[5.5rem]'
      }`}
      style={{
        background: 'linear-gradient(135deg, #22c578 10%, #7fffc4 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {count}
      {suffix}
    </span>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function CompanyOverview() {
  return (
    <section className="relative bg-[#08090d] overflow-hidden py-24 md:py-32">

      {/* ── Diagonal slash accent ──────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Big diagonal rule */}
        <div
          className="absolute"
          style={{
            width: '140%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(34,197,120,0.18) 30%, rgba(34,197,120,0.35) 50%, rgba(34,197,120,0.18) 70%, transparent 100%)',
            top: '38%',
            left: '-20%',
            transform: 'rotate(-8deg)',
          }}
        />
        {/* Faint second rule */}
        <div
          className="absolute"
          style={{
            width: '100%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(34,197,120,0.07) 40%, rgba(34,197,120,0.07) 60%, transparent 100%)',
            top: '62%',
            transform: 'rotate(-8deg)',
          }}
        />
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-20 w-[480px] h-[480px] rounded-full bg-[#22c578] opacity-[0.03] blur-[120px]" />
        {/* Bottom-right glow */}
        <div className="absolute -bottom-32 -right-16 w-[360px] h-[360px] rounded-full bg-[#22c578] opacity-[0.04] blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section header ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            {/* Eyebrow with tick mark */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block w-5 h-5 rounded-sm flex-shrink-0"
                style={{ background: '#22c578' }}
                aria-hidden
              />
              <span className="text-[#22c578] text-xs font-bold tracking-[0.22em] uppercase">
                By the Numbers
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.0] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              The proof is
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #22c578, #7fffc4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                in the output.
              </span>
            </h2>
          </div>

          <p className="text-[#8a9bb0] text-base leading-relaxed max-w-xs md:text-right">
            Numbers earned through execution, not promises. Every metric is a
            milestone we shipped alongside real clients.
          </p>
        </motion.div>

        {/* ── Asymmetric bento grid ────────────────────── */}
        {/*
          Layout intention:
          Row 1 (desktop): [LARGE stat col-span-5] | [LARGE stat col-span-5] | [empty col-span-2 — breathing room]
          Row 2 (desktop): [small] [small] split under left two cols + a label block on right
          On mobile: single-column stacked
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">

          {/* ── Large cards (first two) ─────────────────── */}
          {statistics.slice(0, 2).map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-[#0d0f15] hover:bg-[#111420] transition-colors duration-300 px-8 py-10 md:px-10 md:py-12 flex flex-col justify-between overflow-hidden"
              style={{ minHeight: 260 }}
            >
              {/* Hover green edge */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#22c578] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                aria-hidden
              />

              {/* Index number */}
              <span className="text-[#4a5568] text-xs font-bold tracking-[0.18em] uppercase mb-6 block">
                0{i + 1} —
              </span>

              {/* Giant counter */}
              <div className="flex-1 flex items-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} large />
              </div>

              {/* Label + desc */}
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p
                    className="text-white font-bold text-lg leading-snug whitespace-pre-line"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {stat.label}
                  </p>
                  <p className="text-[#4a5568] text-sm mt-1 leading-relaxed">{stat.desc}</p>
                </div>
                {/* Arrow indicator */}
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c578"
                  strokeWidth={2}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
            </motion.div>
          ))}

          {/* ── Small cards (last two, side by side on desktop) ── */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
            {statistics.slice(2).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.24 + i * 0.12 }}
                className="group relative bg-[#0d0f15] hover:bg-[#111420] transition-colors duration-300 px-8 py-8 md:px-10 md:py-10 overflow-hidden"
              >
                {/* Hover green bottom edge (different from large cards) */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#22c578] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden
                />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[#4a5568] text-xs font-bold tracking-[0.18em] uppercase mb-4 block">
                      0{i + 3} —
                    </span>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} large={false} />
                    <p
                      className="text-white font-bold text-base leading-snug whitespace-pre-line mt-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.label}
                    </p>
                    <p className="text-[#4a5568] text-sm mt-1 leading-relaxed">{stat.desc}</p>
                  </div>

                  {/* Decorative tally marks */}
                  <div
                    className="flex-shrink-0 flex gap-[3px] mt-2 opacity-20 group-hover:opacity-60 transition-opacity"
                    aria-hidden
                  >
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="w-[2px] rounded-full bg-[#22c578]"
                        style={{
                          height: j === 4 ? 2 : 18,
                          transform: j === 4 ? 'rotate(-65deg) translateY(6px)' : undefined,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom strip ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.06] pt-8"
        >
          <p className="text-[#4a5568] text-sm">
            Every number above maps to a real project, a real team, a real outcome.
          </p>
          <button
            className="flex items-center gap-2 text-sm font-semibold text-[#22c578] hover:text-white transition-colors group"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            See our work
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>

      </div>
    </section>
  );
}