'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  Globe,
  Smartphone,
  Brain,
  FileText,
  Cloud,
  Server,
  Palette,
  Rocket,
  Wrench,
} from 'lucide-react';

const services = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    shortDescription:
      'Tailor-made software solutions designed around your business goals. From enterprise platforms to SaaS products, we build scalable systems that grow with you.',
    icon: Code2,
    num: '01',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    shortDescription:
      'Modern, responsive, and high-performance web applications built using React, Next.js, TypeScript, and the latest web technologies.',
    icon: Globe,
    num: '02',
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    shortDescription:
      'Native and cross-platform mobile applications for iOS and Android with seamless user experiences and production-grade performance.',
    icon: Smartphone,
    num: '03',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    shortDescription:
      'Leverage artificial intelligence, machine learning, predictive analytics, and workflow automation to improve efficiency and decision-making.',
    icon: Brain,
    num: '04',
  },
  {
    id: 'document-processing',
    title: 'Document Processing & OCR',
    shortDescription:
      'Automate document extraction, classification, and processing using OCR, NLP, and intelligent data capture technologies.',
    icon: FileText,
    num: '05',
  },
  {
    id: 'cloud-transformation',
    title: 'Cloud Transformation',
    shortDescription:
      'Migrate, modernize, and optimize applications across AWS, Azure, and Google Cloud while improving security, scalability, and cost efficiency.',
    icon: Cloud,
    num: '06',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortDescription:
      'CI/CD pipelines, Kubernetes, Docker, Infrastructure as Code, monitoring, and observability for reliable software delivery.',
    icon: Server,
    num: '07',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription:
      'Human-centered digital experiences through user research, wireframing, prototyping, visual design, and usability testing.',
    icon: Palette,
    num: '08',
  },
  {
    id: 'product-consulting',
    title: 'Product Development & Consulting',
    shortDescription:
      'From idea validation and product strategy to MVP development and scaling, we help businesses launch successful digital products.',
    icon: Rocket,
    num: '09',
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Support',
    shortDescription:
      'Continuous monitoring, bug fixes, security updates, feature enhancements, and performance optimization for long-term success.',
    icon: Wrench,
    num: '10',
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative bg-[#08090d] overflow-hidden py-24 md:py-32">

      {/* Background texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[140px]"
          style={{ background: '#22c578' }} />
        {/* Horizontal rule crossing the section */}
        <div className="absolute left-0 right-0 h-px top-[42%]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,120,0.12) 20%, rgba(34,197,120,0.12) 80%, transparent)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
              <span className="text-[#22c578] text-[11px] font-bold tracking-[0.22em] uppercase">
                Our Services
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.04] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Not just a dev agency.
              <br />
              <span style={{
                background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Your tech partner.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <p className="text-[#8a9bb0] text-sm leading-relaxed max-w-[280px] md:text-right">
              Engineers, architects, problem-solvers. Our mission: make your
              infrastructure bulletproof and your product unstoppable.
            </p>
            <Link href="/services">
              <motion.span
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-[#22c578] text-sm font-semibold cursor-pointer"
              >
                View all services
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* ── Service list — editorial row layout ── */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <Link href={`/services#${service.id}`}>
                <div className="group flex items-center gap-6 py-6 md:py-7 cursor-pointer">

                  {/* Index */}
                  <span
                    className="text-[11px] font-black tracking-[0.15em] tabular-nums flex-shrink-0 w-8 transition-colors duration-200"
                    style={{ color: '#4a5568', fontFamily: 'monospace' }}
                  >
                    {service.num}
                  </span>

                  {/* Icon box */}
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(34,197,120,0.08)',
                      border: '1px solid rgba(34,197,120,0.12)',
                    }}
                  >
                    <service.icon
                      size={16}
                      style={{ color: '#22c578' }}
                      className="transition-colors duration-200"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="flex-1 text-base md:text-lg font-bold text-[#8a9bb0] group-hover:text-white transition-colors duration-200 leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  {/* Description — visible on md+ */}
                  <p className="hidden lg:block flex-1 text-[#4a5568] text-sm leading-relaxed group-hover:text-[#8a9bb0] transition-colors duration-300 max-w-sm">
                    {service.shortDescription}
                  </p>

                  {/* Arrow */}
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                    style={{ border: '1px solid rgba(34,197,120,0.4)' }}
                  >
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#22c578" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-[#4a5568] text-sm">
            Not sure what you need?{' '}
            <span className="text-[#8a9bb0]">We'll figure it out together.</span>
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg,#0d7040,#22c578)',
                boxShadow: '0 0 28px rgba(34,197,120,0.18)',
              }}
            >
              Start a project
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}