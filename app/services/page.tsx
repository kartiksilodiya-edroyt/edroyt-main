'use client';

import { motion } from 'framer-motion';
import {
  Smartphone, Globe, Palette, Building2, Database, Package,
  BarChart2, Server, LineChart, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'mobile-solutions',
    icon: Smartphone,
    category: 'Product',
    title: 'Mobile Solutions',
    description:
      'When you are thinking of the mobile app for your product, its not the development that needs to be done. Starting from its UX to UX and then heading towards the development phase is done by only 10% of the companies and luckily we are one of them to build intuitive, Aesthetic and Valuable Mobile Applications.',
  },
  {
    id: 'web-solutions',
    icon: Globe,
    category: 'Product',
    title: 'Web Solutions',
    description:
      'The ever-expanding digital world demands a strong digital presence. Web solutions for your business are necessary. We provide web-based solutions starting from landing pages to complex web-based admins. Anything for the web is our expertise to get your project done successfully.',
  },
  {
    id: 'ui-ux-solution',
    icon: Palette,
    category: 'Product',
    title: 'UI–UX Solution',
    description:
      'There are only a few companies that understand the difference between user interfaces and user experiences, and it is one of the biggest factors in the success of your product. Any project with good UX and satisfactory UI is rare and we are proud to have such talents to get it done for you.',
  },
  {
    id: 'enterprise-solutions',
    icon: Building2,
    category: 'Enterprise',
    title: 'Enterprise Solutions',
    description:
      'We ensure a fast-track transformation through the adoption of new technologies on industry-leading platforms. InnovQuant along with its ecosystem partners bring in vast experience and expertise in the Implementation and Customization of these leading ERP products and also Open source based ERP solutions like ERP Next.',
  },
  {
    id: 'big-data',
    icon: Database,
    category: 'Enterprise',
    title: 'Big Data Solution',
    description:
      'Data is playing a crucial role in generating business. Data is a valuable asset for your business, but getting value from it can be challenging. But we at Innovquant are here to help you with optimizing your big data problems.',
  },
  {
    id: 'product-development',
    icon: Package,
    category: 'Enterprise',
    title: 'Product Development',
    description:
      'With extensive experience helping companies develop products across a wide range of industries, we are able to help you with your engineering needs. Research, development, and marketing are all handled completely in-house through our full-service capabilities. Products are built on trust and you can leverage our skilled team to make your dream a reality.',
  },
  {
    id: 'data-science',
    icon: LineChart,
    category: 'Intelligence',
    title: 'Data Science',
    description:
      'One of the most important aspects of doing business is being able to leverage the data collected by your applications or services. By leveraging real-time data processing and predictive analytics, we can help companies run experiments on their data in search of valuable insights that can be used to improve business efficiency and productivity. We use our deep expertise in machine learning, statistics, artificial intelligence, and software engineering to solve analytical problems for businesses.',
  },
  {
    id: 'infrastructure-support',
    icon: Server,
    category: 'Intelligence',
    title: 'Infrastructure Support',
    description:
      'Infrastructure support services are essential for any organization and it is a vital element of their corporate IT strategy. Our infrastructure support helps ensure that your critical applications perform optimally and supports business continuity by minimizing unplanned downtime. Our infrastructure support services delivers the right resources at the right time, when you need them most. So you can focus on your core business as we provide proactive monitoring, predictive analytics, continuous diagnostics & remediation across all layers of your IT stack.',
  },
  {
    id: 'data-visualization',
    icon: BarChart2,
    category: 'Intelligence',
    title: 'Data Visualization',
    description:
      'One of the most important aspects of doing business is being able to leverage the data collected by your applications or services. By leveraging real-time data processing and predictive analytics, we can help companies run experiments on their data in search of business insights and actionable information. We use our deep expertise in machine learning, statistics, artificial intelligence, and software engineering to solve analytical problems for businesses.',
  },
];

const categories = ['Product', 'Enterprise', 'Intelligence'];

const categoryMeta: Record<string, { label: string; tagline: string }> = {
  Product: {
    label: 'Build',
    tagline: 'From pixel-perfect interfaces to powerful mobile experiences.',
  },
  Enterprise: {
    label: 'Scale',
    tagline: 'Transform your operations with enterprise-grade platforms and data.',
  },
  Intelligence: {
    label: 'Analyse',
    tagline: 'Turn raw data into decisions with science, infrastructure, and vision.',
  },
};

const cardVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-edroyt-dark font-sans">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(34,197,94,0.12),transparent)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-edroyt-green text-[11px] font-bold tracking-[0.2em] uppercase mb-5"
          >
            What We Do
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight"
          >
            We are{' '}
            <span className="gradient-text">Development</span>
            <br />Experts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Since we strive for early success, we are committed to providing you with the best
            possible service so that your business can be stronger than ever before.
          </motion.p>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[['9', 'Service Areas'], ['100+', 'Projects Delivered'], ['10+', 'Years Experience']].map(
              ([num, label]) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-bold text-white">{num}</p>
                  <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase">{label}</p>
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Category groups ── */}
      {categories.map((cat) => {
        const meta = categoryMeta[cat];
        const catServices = services.filter((s) => s.category === cat);

        return (
          <section key={cat} className="py-20 relative">
            {/* Subtle separator */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex items-end justify-between mb-12 border-b border-white/6 pb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-edroyt-green mb-2 block">
                    {meta.label}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{cat}</h2>
                  <p className="text-gray-500 text-sm mt-1">{meta.tagline}</p>
                </div>
                <span className="text-6xl font-black text-white/4 select-none hidden md:block">
                  {String(categories.indexOf(cat) + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {catServices.map((service, i) => (
                  <motion.div
                    key={service.id}
                    id={service.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={cardVariants}
                    className="group relative bg-white/[0.03] border border-white/6 rounded-2xl p-7 flex flex-col gap-5 overflow-hidden cursor-default
                               hover:border-edroyt-green/30 hover:bg-white/[0.055] transition-all duration-300"
                  >
                    {/* Top glow line — the signature hover accent */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-edroyt-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-edroyt-green/12 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-[18px] h-[18px] text-edroyt-green" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="text-[17px] font-bold text-white leading-snug">{service.title}</h3>
                      <p className="text-gray-400 text-[13.5px] leading-relaxed">{service.description}</p>
                    </div>

                    {/* CTA */}
                    <Link href="/contact">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-edroyt-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                        Start a project <ArrowRight size={12} />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA Banner ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-edroyt-green/8 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight"
          >
            Ready to build something{' '}
            <span className="gradient-text">remarkable?</span>
          </motion.h2>
          <p className="text-gray-400 text-lg mb-10">
            Tell us about your project and we'll find the right solution together.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-edroyt-green hover:bg-edroyt-green-secondary text-white rounded-xl font-semibold shadow-xl shadow-edroyt-green/25 transition-colors"
            >
              Get in Touch <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}