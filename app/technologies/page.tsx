'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { technologies, technologyCategories } from '@/data/technologies';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  frontend: { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400', glow: 'shadow-sky-500/10' },
  backend:  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
  database: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', glow: 'shadow-orange-500/10' },
  cloud:    { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', glow: 'shadow-violet-500/10' },
  devops:   { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', glow: 'shadow-rose-500/10' },
};

export default function TechnologiesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? technologies
    : technologies.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-edroyt-dark">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-green/8 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-edroyt-green/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
              Technology Stack
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Lorem Ipsum <span className="gradient-text">Dolor Sit Amet</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="pb-12 bg-edroyt-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {[{ id: 'all', label: 'All Technologies' }, ...technologyCategories].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-edroyt-green text-white shadow-lg shadow-edroyt-green/25'
                    : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech grid with logos */}
      <section className="pb-24 bg-edroyt-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filtered.map((tech, index) => {
                const colors = categoryColors[tech.category];
                return (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.04, type: 'spring', stiffness: 180 }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl border ${colors.border} ${colors.bg} shadow-lg ${colors.glow} cursor-default overflow-hidden`}
                  >
                    {/* Glow fill */}
                    <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />

                    {/* Logo */}
                    <div className="relative z-10 w-14 h-14 flex items-center justify-center">
                      {tech.logo ? (
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                        />
                      ) : (
                        <div className={`w-8 h-8 rounded-full ${colors.bg} border ${colors.border}`} />
                      )}
                    </div>

                    <div className="relative z-10 text-center">
                      <h3 className="text-sm font-bold text-white group-hover:text-white transition-colors">
                        {tech.name}
                      </h3>
                      <span className={`text-[10px] font-medium ${colors.text} uppercase tracking-wider`}>
                        {tech.category}
                      </span>
                    </div>

                    <p className="relative z-10 text-gray-600 text-xs text-center leading-relaxed hidden group-hover:block transition-all">
                      {tech.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Category deep-dives */}
      {technologyCategories.map((category, catIndex) => {
        const categoryTechs = technologies.filter(t => t.category === category.id);
        const colors = categoryColors[category.id];
        return (
          <section
            key={category.id}
            className={`section-padding ${catIndex % 2 === 0 ? 'bg-edroyt-surface' : 'bg-edroyt-dark'} relative overflow-hidden`}
          >
            {catIndex % 2 === 0 && (
              <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />
            )}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
              >
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${colors.bg} ${colors.text} border ${colors.border}`}>
                  {category.label}
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {categoryTechs.map((tech, index) => (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    className={`group flex flex-col items-center gap-4 p-6 rounded-2xl border ${colors.border} ${colors.bg} cursor-default`}
                  >
                    {tech.logo && (
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                      />
                    )}
                    <div className="text-center">
                      <h3 className={`text-base font-bold text-white mb-1.5 group-hover:${colors.text} transition-colors`}>
                        {tech.name}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="section-padding bg-edroyt-dark">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Lorem Ipsum Dolor Sit Amet?
            </h2>
            <p className="text-gray-400 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-edroyt-green hover:bg-edroyt-green-secondary text-white font-semibold rounded-lg shadow-lg shadow-edroyt-green/25 transition-colors"
              >
                Discuss Your Project <ArrowRight size={17} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
