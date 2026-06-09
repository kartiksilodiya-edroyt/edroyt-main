'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Brain, Cloud, Palette, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
    icon: Code2,
    accent: 'from-emerald-500/15 to-green-500/10',
    border: 'hover:border-emerald-500/30',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
    icon: Globe,
    accent: 'from-sky-500/15 to-blue-500/10',
    border: 'hover:border-sky-500/30',
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
    icon: Smartphone,
    accent: 'from-violet-500/15 to-purple-500/10',
    border: 'hover:border-violet-500/30',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
    icon: Brain,
    accent: 'from-rose-500/15 to-red-500/10',
    border: 'hover:border-rose-500/30',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
    icon: Cloud,
    accent: 'from-orange-500/15 to-amber-500/10',
    border: 'hover:border-orange-500/30',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
    icon: Palette,
    accent: 'from-pink-500/15 to-fuchsia-500/10',
    border: 'hover:border-pink-500/30',
  },
];

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-edroyt-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-edroyt-green/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Lorem Ipsum Dolor<br className="hidden md:block" /> Sit Amet
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={`/services#${service.id}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`group h-full glass rounded-2xl p-6 border border-white/5 ${service.border} transition-all duration-300 cursor-pointer overflow-hidden relative`}
                >
                  {/* Hover gradient fill */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    {/* Number + icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-edroyt-green/15 group-hover:bg-edroyt-green/25 flex items-center justify-center transition-colors">
                        <service.icon className="w-5 h-5 text-edroyt-green-accent" />
                      </div>
                      <span className="text-2xl font-bold text-white/10 group-hover:text-white/20 transition-colors font-mono">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-edroyt-green-accent transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center text-edroyt-green text-sm font-medium gap-1.5 group-hover:gap-2.5 transition-all">
                      Learn more
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all text-sm font-medium"
            >
              View All Services
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
