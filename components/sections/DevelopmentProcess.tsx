'use client';

import { motion } from 'framer-motion';
import { Search, ClipboardList, PenTool, Code2, TestTube, Rocket } from 'lucide-react';

const steps = [
  { step: 1, title: 'Discovery', icon: Search, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean.' },
  { step: 2, title: 'Planning', icon: ClipboardList, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean.' },
  { step: 3, title: 'Design', icon: PenTool, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean.' },
  { step: 4, title: 'Development', icon: Code2, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean.' },
  { step: 5, title: 'Testing', icon: TestTube, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean.' },
  { step: 6, title: 'Launch', icon: Rocket, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor aenean.' },
];

export default function DevelopmentProcess() {
  return (
    <section className="section-padding bg-edroyt-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-edroyt-surface to-edroyt-dark" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lorem Ipsum Dolor Sit Amet
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus.
          </p>
        </motion.div>

        {/* Process grid — horizontal on desktop */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-px bg-gradient-to-r from-transparent via-edroyt-green/40 to-transparent z-0" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Circle + icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 w-[52px] h-[52px] rounded-full bg-edroyt-dark border-2 border-edroyt-green/40 hover:border-edroyt-green flex items-center justify-center mb-5 shadow-lg shadow-edroyt-green/10 group-hover:shadow-edroyt-green/30 transition-all cursor-default"
                >
                  <step.icon className="w-5 h-5 text-edroyt-green-accent" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-edroyt-green flex items-center justify-center text-[9px] font-bold text-white">
                    {step.step}
                  </span>
                </motion.div>

                <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
