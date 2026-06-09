'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ExternalLink } from 'lucide-react';

const featuredProjects = [
  {
    id: 'fintech-platform',
    title: 'Lorem Ipsum Fintech Platform',
    client: 'Lorem Corp',
    industry: 'Financial Services',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis.',
    image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Kubernetes'],
    result: 'Processing $2B+ annual transactions',
    color: 'from-emerald-500/20',
  },
  {
    id: 'healthcare-portal',
    title: 'Lorem Ipsum Healthcare Portal',
    client: 'MedTech Ipsum',
    industry: 'Healthcare',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis.',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Azure', 'Docker'],
    result: 'Serving 500+ healthcare facilities',
    color: 'from-sky-500/20',
  },
  {
    id: 'ecommerce-platform',
    title: 'Lorem Ipsum E-commerce Platform',
    client: 'RetailMax Ipsum',
    industry: 'Retail',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    technologies: ['Next.js', 'React Native', 'Node.js', 'Redis', 'AWS'],
    result: '300% increase in conversion rate',
    color: 'from-violet-500/20',
  },
];

export default function FeaturedPortfolio() {
  return (
    <section className="section-padding bg-edroyt-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Lorem Ipsum<br className="hidden md:block" /> Dolor Sit
            </h2>
          </div>
          <Link href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-5 py-2.5 border border-white/15 text-gray-400 hover:text-white hover:border-white/30 rounded-full text-sm font-medium transition-all"
            >
              View All Projects <ArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/portfolio#${project.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="group h-full glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} via-edroyt-dark/60 to-edroyt-dark/20`} />

                    {/* Industry */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/40 text-white backdrop-blur-sm border border-white/10">
                        {project.industry}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <ExternalLink size={14} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-xs text-gray-600 mb-1">{project.client}</p>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-edroyt-green-accent transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded bg-white/5 text-gray-500">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-edroyt-green-accent text-xs font-semibold">
                      <TrendingUp size={13} />
                      {project.result}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
