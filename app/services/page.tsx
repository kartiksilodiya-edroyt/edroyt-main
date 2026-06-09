'use client';

import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Brain, Cloud, Palette, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    icon: Code2,
    benefits: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Aenean commodo ligula eget',
      'Donec quam felis ultricies',
      'Nulla consequat massa quis',
    ],
    process: [
      { step: 'Discovery', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Architecture', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Development', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Testing', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Deployment', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Support', description: 'Lorem ipsum dolor sit amet consectetur.' },
    ],
    technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    icon: Globe,
    benefits: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Aenean commodo ligula eget',
      'Donec quam felis ultricies',
      'Nulla consequat massa quis',
    ],
    process: [
      { step: 'Planning', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Design', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Frontend', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Backend', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Integration', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Launch', description: 'Lorem ipsum dolor sit amet consectetur.' },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    icon: Smartphone,
    benefits: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Aenean commodo ligula eget',
      'Donec quam felis ultricies',
      'Nulla consequat massa quis',
    ],
    process: [
      { step: 'Strategy', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'UX Design', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Development', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Testing', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Beta', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Launch', description: 'Lorem ipsum dolor sit amet consectetur.' },
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'REST APIs', 'GraphQL'],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    icon: Brain,
    benefits: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Aenean commodo ligula eget',
      'Donec quam felis ultricies',
      'Nulla consequat massa quis',
    ],
    process: [
      { step: 'Assessment', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Data Strategy', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Modeling', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Integration', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Validation', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Monitoring', description: 'Lorem ipsum dolor sit amet consectetur.' },
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'AWS SageMaker'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    icon: Cloud,
    benefits: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Aenean commodo ligula eget',
      'Donec quam felis ultricies',
      'Nulla consequat massa quis',
    ],
    process: [
      { step: 'Assessment', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Architecture', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Migration', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Automation', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Monitoring', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Optimization', description: 'Lorem ipsum dolor sit amet consectetur.' },
    ],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    icon: Palette,
    benefits: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit',
      'Aenean commodo ligula eget',
      'Donec quam felis ultricies',
      'Nulla consequat massa quis',
    ],
    process: [
      { step: 'Research', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Strategy', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Wireframes', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Visual Design', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Prototyping', description: 'Lorem ipsum dolor sit amet consectetur.' },
      { step: 'Testing', description: 'Lorem ipsum dolor sit amet consectetur.' },
    ],
    technologies: ['Figma', 'Adobe XD', 'Principle', 'UserTesting', 'Hotjar', 'Maze'],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-edroyt-dark">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-green/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Lorem Ipsum <span className="gradient-text">Dolor Sit Amet</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview quick nav */}
      <section className="py-10 bg-edroyt-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((s) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/8 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                <s.icon size={14} className="text-edroyt-green-accent" />
                {s.title}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Service detail sections */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className={`section-padding ${isEven ? 'bg-edroyt-dark' : 'bg-edroyt-surface'} relative overflow-hidden`}
          >
            {!isEven && (
              <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />
            )}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
              <div className={`grid lg:grid-cols-2 gap-14 lg:gap-20 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={!isEven ? 'lg:order-2' : ''}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-edroyt-green/15 flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-edroyt-green-accent" />
                    </div>
                    <span className="text-edroyt-green text-xs font-mono uppercase tracking-widest">Service 0{index + 1}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{service.title}</h2>
                  <p className="text-gray-400 text-[15px] leading-relaxed mb-8">{service.description}</p>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Key Benefits</h3>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {service.benefits.map((b, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-gray-400 text-sm">
                          <CheckCircle className="w-4 h-4 text-edroyt-green-accent flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-edroyt-green hover:bg-edroyt-green-secondary text-white rounded-lg font-semibold text-sm shadow-lg shadow-edroyt-green/25 transition-colors"
                    >
                      Start a Project <ArrowRight size={15} />
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Process + Tech */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className={`space-y-5 ${!isEven ? 'lg:order-1' : ''}`}
                >
                  <div className="glass rounded-2xl p-6 border border-white/5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Our Process</h3>
                    <div className="space-y-3">
                      {service.process.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-edroyt-green/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-edroyt-green font-mono mt-0.5">
                            {i + 1}
                          </div>
                          <div>
                            <span className="text-white text-sm font-semibold">{step.step}</span>
                            <p className="text-gray-600 text-xs mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6 border border-white/5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((t) => (
                        <span key={t} className="px-3 py-1.5 rounded-lg bg-edroyt-green/10 text-edroyt-green-accent text-xs font-medium border border-edroyt-green/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
