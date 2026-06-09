'use client';

import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle } from 'lucide-react';

const projects = [
  {
    id: 'fintech-platform',
    title: 'Lorem Ipsum Fintech Platform',
    client: 'Global Lorem Corp',
    industry: 'Financial Services',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Kubernetes', 'TensorFlow'],
    results: ['Processing $2B+ annual transactions', '99.99% uptime achieved', '60% reduction in fraud', 'Real-time regulatory compliance'],
    featured: true,
  },
  {
    id: 'healthcare-portal',
    title: 'Lorem Ipsum Healthcare Portal',
    client: 'MedTech Lorem',
    industry: 'Healthcare',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Azure', 'Docker', 'WebRTC'],
    results: ['Serving 500+ healthcare facilities', '10M+ patient records', 'HIPAA compliant', '40% better outcomes'],
    featured: true,
  },
  {
    id: 'ecommerce-platform',
    title: 'Lorem Ipsum E-commerce Platform',
    client: 'RetailMax Lorem',
    industry: 'Retail',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'React Native', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    results: ['10M+ monthly active users', '300% conversion increase', 'Sub-second load times', '35% higher order value'],
    featured: true,
  },
  {
    id: 'ai-analytics',
    title: 'Lorem Ipsum AI Analytics',
    client: 'DataDriven Lorem',
    industry: 'Technology',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    image: 'https://images.pexels.com/photos/5900145/pexels-photo-5900145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Python', 'TensorFlow', 'PostgreSQL', 'AWS SageMaker', 'D3.js'],
    results: ['1B+ data points daily', '85% prediction accuracy', '50% faster analysis', 'Fortune 500 clients'],
    featured: false,
  },
  {
    id: 'logistics-platform',
    title: 'Lorem Ipsum Logistics Platform',
    client: 'LogiTech Lorem',
    industry: 'Logistics',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    image: 'https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Node.js', 'MongoDB', 'Google Cloud', 'Kubernetes'],
    results: ['500+ vehicle fleet', '25% fuel reduction', '99.5% on-time delivery', 'Real-time tracking'],
    featured: false,
  },
  {
    id: 'education-platform',
    title: 'Lorem Ipsum EdTech Platform',
    client: 'LearnForward Lorem',
    industry: 'Education',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    image: 'https://images.pexels.com/photos/6325188/pexels-photo-6325188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS', 'WebRTC', 'OpenAI'],
    results: ['500K+ active students', '95% completion rate', '40% better outcomes', '20+ languages'],
    featured: false,
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-edroyt-dark">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-green/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">Case Studies</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Lorem Ipsum <span className="gradient-text">Dolor Sit Amet</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-edroyt-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                id={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-edroyt-dark via-edroyt-dark/40 to-transparent lg:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-edroyt-dark/60 lg:hidden" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 text-white backdrop-blur-sm border border-white/10">{project.industry}</span>
                      {project.featured && <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-edroyt-green/20 text-edroyt-green-accent backdrop-blur-sm border border-edroyt-green/20">Featured</span>}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 lg:p-9 flex flex-col justify-center">
                    <p className="text-gray-600 text-xs mb-1.5">{project.client}</p>
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>

                    <div className="mb-5">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5">Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-lg bg-edroyt-green/8 text-edroyt-green-accent text-xs border border-edroyt-green/15">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2.5">Results</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {project.results.map((r, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-gray-400 text-xs">
                            <CheckCircle size={12} className="text-edroyt-green-accent flex-shrink-0" />
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-edroyt-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '$10B+', label: 'Lorem Ipsum Volume' },
              { value: '15+', label: 'Industries Served' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center py-10 px-6 bg-edroyt-dark/80 hover:bg-edroyt-green/5 transition-colors">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-edroyt-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lorem Ipsum Dolor Sit</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Financial Services', 'Healthcare', 'E-commerce', 'Technology', 'Logistics', 'Education', 'Real Estate', 'Manufacturing', 'Media', 'Government', 'Retail', 'Energy'].map((ind, i) => (
              <motion.span key={ind} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="px-4 py-2 rounded-full glass-light text-sm text-gray-400 hover:text-white transition-colors border border-white/5 hover:border-white/15">
                {ind}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
