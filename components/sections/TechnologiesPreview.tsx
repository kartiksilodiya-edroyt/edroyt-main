'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { technologies } from '@/data/technologies';
import { ArrowRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  frontend: 'from-sky-500/20 to-blue-500/20 border-sky-500/20',
  backend: 'from-emerald-500/20 to-green-500/20 border-emerald-500/20',
  database: 'from-orange-500/20 to-amber-500/20 border-orange-500/20',
  cloud: 'from-violet-500/20 to-purple-500/20 border-violet-500/20',
  devops: 'from-rose-500/20 to-red-500/20 border-rose-500/20',
};

const categoryDot: Record<string, string> = {
  frontend: 'bg-sky-400',
  backend: 'bg-emerald-400',
  database: 'bg-orange-400',
  cloud: 'bg-violet-400',
  devops: 'bg-rose-400',
};

export default function TechnologiesPreview() {
  return (
    <section className="section-padding bg-edroyt-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-edroyt-green/5 via-transparent to-edroyt-green-accent/5" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lorem Ipsum Dolor Sit Amet
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
          </p>
        </motion.div>

        {/* Logo grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3 mb-14">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.4, type: 'spring' }}
              whileHover={{ y: -6, scale: 1.08 }}
              className={`relative flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-br ${categoryColors[tech.category]} border group cursor-default`}
            >
              <div className="absolute inset-0 rounded-xl bg-edroyt-surface/80 group-hover:bg-transparent transition-colors" />

              {tech.logo ? (
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-8 h-8 object-contain relative z-10"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      const fallback = parent.querySelector('.fallback-dot');
                      if (fallback) (fallback as HTMLElement).style.display = 'block';
                    }
                  }}
                />
              ) : (
                <div className={`w-6 h-6 rounded-full ${categoryDot[tech.category]} relative z-10`} />
              )}
              <div className="fallback-dot hidden">
                <div className={`w-6 h-6 rounded-full ${categoryDot[tech.category]}`} />
              </div>

              <span className="text-[9px] font-semibold text-gray-500 group-hover:text-gray-300 transition-colors text-center leading-tight relative z-10">
                {tech.name}
              </span>

              {/* Glow on hover */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${categoryColors[tech.category]}`} />
            </motion.div>
          ))}
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {Object.entries(categoryDot).map(([cat, dot]) => (
            <div key={cat} className="flex items-center gap-2 text-sm text-gray-500">
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              <span className="capitalize">{cat}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/technologies">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white hover:bg-white/5 transition-colors text-sm font-medium"
            >
              View All Technologies
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
