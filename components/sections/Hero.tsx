'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react';

const techStickers = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', col: 0, row: 0 },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', col: 1, row: 0 },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', col: 2, row: 0 },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', col: 3, row: 0 },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', col: 0, row: 1 },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', col: 1, row: 1 },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', col: 2, row: 1 },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg', col: 3, row: 1 },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', col: 0, row: 2 },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', col: 1, row: 2 },
  { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg', col: 2, row: 2 },
  { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg', col: 3, row: 2 },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg', col: 0, row: 3 },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', col: 1, row: 3 },
  { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', col: 2, row: 3 },
  { name: 'NestJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg', col: 3, row: 3 },
];

const floatDelays = [0, 0.5, 1, 1.5, 0.3, 0.8, 1.3, 0.2, 0.7, 1.2, 0.4, 0.9, 0.1, 0.6, 1.1, 1.4];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-edroyt-dark"
      style={{ isolation: 'isolate', zIndex: 0 }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-edroyt-green/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-edroyt-green-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-edroyt-green/5 rounded-full blur-[80px]" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div style={{ y, opacity }} className="relative w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* ── LEFT ── */}
            <div>
              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-edroyt-green/10 border border-edroyt-green/20 mb-7"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-edroyt-green-accent animate-pulse" />
                <span className="text-sm text-edroyt-green-accent font-medium">Enterprise Software Solutions</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.2rem] font-bold leading-[1.1] tracking-tight mb-6"
              >
                <span className="text-white">Transforming Ideas into </span>
                <br />
                <span className="gradient-text">Scalable Digital Solutions</span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.7 }}
                className="text-gray-400 text-lg leading-relaxed mb-9 max-w-lg"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.7 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-7 py-3.5 bg-edroyt-green hover:bg-edroyt-green-secondary text-white font-semibold rounded-lg shadow-xl shadow-edroyt-green/25 transition-colors"
                  >
                    Start Your Project
                    <ArrowRight size={17} />
                  </motion.button>
                </Link>
                <Link href="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-7 py-3.5 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white font-medium rounded-lg transition-all"
                  >
                    Explore Our Work
                    <ArrowUpRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="flex items-center gap-8 pt-8 border-t border-white/8"
              >
                {[
                  { value: '500+', label: 'Projects' },
                  { value: '98%', label: 'Satisfaction' },
                  { value: '150+', label: 'Engineers' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT — Tech Sticker Grid ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-edroyt-green/20 via-transparent to-edroyt-green-accent/10 blur-2xl scale-110" />

              {/* Grid container */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-br from-edroyt-green/20 via-white/5 to-edroyt-green-accent/10 glow-border overflow-hidden">
                <div className="rounded-[1.4rem] overflow-hidden bg-[#0D1117]">

                  {/* Header bar – fake window chrome */}
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5 bg-[#0B0F14]">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                    <span className="ml-4 text-xs text-gray-600 font-mono">edroyt / tech-stack</span>
                  </div>

                  {/* 4×4 logo grid */}
                  <div className="grid grid-cols-4 gap-0">
                    {techStickers.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        className="relative flex flex-col items-center justify-center gap-2 p-4 border border-white/[0.04] bg-[#0D1117] hover:bg-edroyt-green/8 transition-colors cursor-default group"
                        style={{
                          animation: `float ${5 + (index % 3)}s ease-in-out infinite`,
                          animationDelay: `${floatDelays[index]}s`,
                        }}
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-edroyt-green/10 to-transparent" />

                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-9 h-9 object-contain relative z-10"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="text-[10px] font-medium text-gray-500 group-hover:text-gray-300 transition-colors text-center leading-tight relative z-10">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer bar */}
                  <div className="flex items-center justify-between px-5 py-3 bg-[#0B0F14] border-t border-white/5">
                    <span className="text-xs text-gray-600 font-mono">20+ technologies</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-edroyt-green animate-pulse" />
                      <span className="text-xs text-edroyt-green font-mono">production ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
