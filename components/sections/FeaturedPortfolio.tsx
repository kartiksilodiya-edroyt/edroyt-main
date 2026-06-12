'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const portfolioLogos = [
  { id: 'seize-the-ads',   name: 'Seize The Ads',  industry: 'AdTech',           emoji: '📈', accent: '#3b82f6' },
  { id: 'my-work',         name: 'MyWork',          industry: 'Productivity',      emoji: '💼', accent: '#6366f1' },
  { id: 'atpace',          name: 'Atpace',          industry: 'Health & Wellness', emoji: '🚀', accent: '#8b5cf6' },
  { id: 'sell-it',         name: 'Sell It',         industry: 'E-commerce',        emoji: '⚡', accent: '#f59e0b' },
  { id: 'meinstein',       name: 'mEinstein',       industry: 'EdTech',            emoji: '🧠', accent: '#f97316' },
  { id: 'kalkii-fresh',    name: 'Kalkii Fresh',    industry: 'Food & Delivery',   emoji: '🌿', accent: '#22c55e' },
  { id: 'niramaya-health', name: 'Niramaya Health', industry: 'Healthcare',        emoji: '🏥', accent: '#ef4444' },
  { id: 'crack-detection', name: 'Crack Detection', industry: 'Civil Engineering', emoji: '🔍', accent: '#3b82f6' },
  { id: 'smart-dvr',       name: 'Smart DVR',       industry: 'IoT / Security',    emoji: '📹', accent: '#10b981' },
];

const marqueeItems = [...portfolioLogos, ...portfolioLogos];

export default function FeaturedPortfolio() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Subtle top/bottom gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{ background: 'var(--green)' }}
                aria-hidden
              />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'var(--green)' }}
              >
                Our Work
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'var(--text-primary)',
              }}
            >
              Trusted By<br className="hidden md:block" /> Builders
            </h2>
          </div>

          <Link href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{
                border: '1px solid var(--border-medium)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'var(--text-primary)';
                el.style.borderColor = 'var(--border-green)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = 'var(--text-secondary)';
                el.style.borderColor = 'var(--border-medium)';
              }}
            >
              View All Projects <ArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Marquee rows ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {/* Edge fade masks — use bg-primary so they blend in both themes */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: 'linear-gradient(90deg, var(--bg-primary) 0%, transparent 100%)' }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: 'linear-gradient(270deg, var(--bg-primary) 0%, transparent 100%)' }}
          />

          {/* Row 1 — left */}
          <div className="overflow-hidden mb-4">
            <div
              className="flex gap-4"
              style={{ animation: 'marquee-left 32s linear infinite', width: 'max-content' }}
            >
              {marqueeItems.map((item, i) => (
                <LogoCard key={`r1-${i}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2 — right */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4"
              style={{ animation: 'marquee-right 38s linear infinite', width: 'max-content' }}
            >
              {[...marqueeItems].reverse().map((item, i) => (
                <LogoCard key={`r2-${i}`} item={item} />
              ))}
            </div>
          </div>
        </motion.div>

        <style>{`
          @keyframes marquee-left {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    </section>
  );
}

function LogoCard({ item }: { item: typeof portfolioLogos[number] }) {
  return (
    <Link href={`/portfolio#${item.id}`}>
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border cursor-pointer transition-all duration-300 select-none group"
        style={{
          background: `${item.accent}0d`,
          borderColor: `${item.accent}22`,
          minWidth: '200px',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${item.accent}55`;
          el.style.background = `${item.accent}1a`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${item.accent}22`;
          el.style.background = `${item.accent}0d`;
        }}
      >
        {/* Emoji icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}30` }}
        >
          {item.emoji}
        </div>

        {/* Text */}
        <div>
          <p
            className="text-sm font-bold leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: 'var(--text-primary)',
            }}
          >
            {item.name}
          </p>
          <p
            className="text-[10px] font-medium mt-0.5"
            style={{ color: 'var(--text-muted)' }}
          >
            {item.industry}
          </p>
        </div>

        {/* Accent dot */}
        <div
          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ background: item.accent }}
        />
      </div>
    </Link>
  );
}