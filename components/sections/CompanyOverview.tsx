'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const statistics = [
  { label: 'Years of Experience', value: 8, suffix: '+' },
  { label: 'Projects Delivered', value: 500, suffix: '+' },
  { label: 'Industries Served', value: 15, suffix: '+' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold gradient-text tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function CompanyOverview() {
  return (
    <section className="section-padding bg-edroyt-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-edroyt-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-edroyt-green-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
            By the Numbers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lorem Ipsum Dolor Sit Amet
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et magnis.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center py-12 px-6 bg-edroyt-surface/90 hover:bg-edroyt-green/5 transition-colors group"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="w-8 h-0.5 bg-edroyt-green/40 group-hover:bg-edroyt-green/80 transition-colors my-3 rounded-full" />
              <p className="text-gray-500 text-sm font-medium text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
