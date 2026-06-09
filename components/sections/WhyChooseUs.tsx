'use client';

import { motion } from 'framer-motion';
import { Users, Zap, TrendingUp, Heart, Shield, Award } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Engineering Team',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
  },
  {
    icon: Zap,
    title: 'Agile Development Process',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Architecture',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
  },
  {
    icon: Heart,
    title: 'Long-Term Partnership',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean massa.',
  },
];

const metrics = [
  { label: 'Projects Delivered', value: '500+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Team Members', value: '150+' },
  { label: 'Industries Served', value: '15+' },
  { label: 'Years of Experience', value: '8+' },
  { label: 'Global Offices', value: '4' },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-edroyt-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-edroyt-green/5 via-transparent to-edroyt-green-accent/5" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Lorem Ipsum Dolor <span className="gradient-text">Sit Amet</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis dis parturient.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-edroyt-green/15 group-hover:bg-edroyt-green/25 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                    <feature.icon className="w-5 h-5 text-edroyt-green-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — metrics panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 glow-border overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />

              <div className="relative">
                <p className="text-xs font-bold text-edroyt-green uppercase tracking-widest mb-6">Performance Metrics</p>
                <div className="grid grid-cols-2 gap-px bg-white/5 rounded-xl overflow-hidden">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                      className="flex flex-col items-center justify-center py-6 px-4 bg-edroyt-dark/80 hover:bg-edroyt-green/8 transition-colors"
                    >
                      <span className="text-2xl font-bold gradient-text">{metric.value}</span>
                      <span className="text-xs text-gray-500 mt-1 text-center">{metric.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60',
                      'https://images.pexels.com/photos/7749095/pexels-photo-7749095.jpeg?auto=compress&cs=tinysrgb&w=60',
                      'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=60',
                    ].map((src, i) => (
                      <img key={i} src={src} alt="client" className="w-8 h-8 rounded-full object-cover border-2 border-edroyt-dark" />
                    ))}
                  </div>
                  <div>
                    <span className="text-white text-sm font-medium">200+ happy clients</span>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-edroyt-green text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-5 -right-5 glass-light rounded-2xl px-5 py-3 border border-edroyt-green/20"
            >
              <span className="text-xs font-bold text-edroyt-green">ISO Certified</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
