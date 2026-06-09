'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Mail, ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-edroyt-dark via-[#0d1f10] to-edroyt-dark" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-edroyt-green/12 rounded-full blur-[100px]" />
      </div>
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-edroyt-green/40 to-transparent" />
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-edroyt-green/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-edroyt-green/10 border border-edroyt-green/20 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-edroyt-green-accent animate-pulse" />
            <span className="text-sm text-edroyt-green-accent font-medium">Ready to start?</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Lorem Ipsum Dolor<br />
            <span className="gradient-text">Sit Amet Consectetur</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Cum sociis natoque penatibus et magnis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-edroyt-green hover:bg-edroyt-green-secondary text-white font-semibold rounded-lg shadow-2xl shadow-edroyt-green/30 transition-colors text-base"
              >
                <Calendar size={18} />
                Schedule Consultation
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white font-medium rounded-lg transition-all text-base"
              >
                <Mail size={18} />
                Contact Us
              </motion.button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600"
          >
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-edroyt-green" />Free Initial Consultation</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-edroyt-green" />Response within 24 hours</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-edroyt-green" />Flexible Engagement Models</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
