'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Image from "next/image";

const servicesMegaMenu = [
  {
    category: 'STRATEGY & INNOVATION',
    items: [
      'Digital Product Strategy',
      'Product Discovery & Research',
      'Rapid Prototyping',
      'Technology Strategy',
      'Innovation & R&D',
    ],
  },
  {
    category: 'SOFTWARE ENGINEERING',
    items: [
      'Custom Software Development',
      'Web Development',
      'Mobile App Development',
      'API Development',
      'Microservices Architecture',
    ],
  },
  {
    category: 'PRODUCT & EXPERIENCE',
    items: [
      'UI/UX Design',
      'Design Systems',
      'User Research',
      'Product Analytics',
      'Accessibility',
    ],
  },
  {
    category: 'AI & DATA',
    items: [
      'AI & Automation',
      'Machine Learning',
      'Data Engineering',
      'Computer Vision',
      'Natural Language Processing',
    ],
  },
  {
    category: 'CLOUD & PLATFORM',
    items: [
      'Cloud & DevOps',
      'Infrastructure as Code',
      'Kubernetes',
      'CI/CD Pipelines',
      'Platform Engineering',
    ],
  },
  {
    category: 'QUALITY & SCALE',
    items: [
      'Quality Assurance',
      'Performance Testing',
      'Security Audits',
      'Load Testing',
      'Observability',
    ],
  },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setIsMegaOpen(true);
  };

  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setIsMegaOpen(false), 120);
  };

  return (
    <>
      {/* ── Navbar bar ── */}
      {/* z-[9999] ensures it paints above Framer Motion transform stacking contexts in the hero */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0 }}
        className={`transition-all duration-300 ${
          isScrolled || isMegaOpen
            ? 'bg-[#070B11]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-10">
          <div className="flex items-center justify-between h-[80px]">

           {/* Logo */}
<Link
  href="/"
  className="flex items-center justify-center flex-shrink-0"
>
  <div className="relative w-[220px] h-[60px] transition-transform duration-300 hover:scale-105">
    <Image
      src="/logo/edroyt-logo-removebg-preview.png"
      alt="Edroyt"
      fill
      priority
      sizes="220px"
      className="object-contain object-left"
    />
  </div>
</Link>
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.href}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    className="relative"
                  >
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                        isMegaOpen ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isMegaOpen ? 'rotate-180 text-edroyt-green' : ''}`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-edroyt-green/50 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 bg-edroyt-green hover:bg-edroyt-green-secondary text-white text-sm font-semibold rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.35)] transition-all duration-300"
                >
                  Get Started
                  <ArrowRight size={15} />
                </motion.button>
              </Link>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mega Menu — rendered as a sibling (not child) of the nav, with explicit top position ── */}
      {/* Keeping it outside the nav avoids overflow:hidden clipping while sharing the same z-index layer */}
      <AnimatePresence>
        {isMegaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
           style={{ zIndex: 9998, position: 'fixed', top: '80px', left: 0, right: 0 }} 
            className="bg-[#0B0F14] border-b border-white/8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)]"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
              <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                {servicesMegaMenu.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-[11px] font-bold tracking-[0.15em] text-edroyt-green mb-4 uppercase">
                      {group.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Link
                            href="/services"
                            onClick={() => setIsMegaOpen(false)}
                            className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-edroyt-green transition-colors flex-shrink-0" />
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer row */}
              <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                <Link
                  href="/services"
                  onClick={() => setIsMegaOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-edroyt-green hover:text-edroyt-green-accent transition-colors"
                >
                  View All Services
                  <ArrowRight size={16} />
                </Link>
                <span className="text-xs text-gray-700">30+ specialized service offerings</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 9997, position: 'fixed', inset: 0 }}
            className="lg:hidden"
          >
            <div
              className="absolute inset-0 bg-edroyt-dark/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-edroyt-dark border-l border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/10">
                <span className="text-white font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 px-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      {link.label}
                      {link.hasMega && <ChevronDown size={16} className="text-gray-500" />}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile services list */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="px-3 text-[10px] font-bold text-edroyt-green uppercase tracking-[0.15em] mb-3">Services</p>
                  {servicesMegaMenu.map((group) => (
                    <div key={group.category} className="mb-5">
                      <p className="px-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-2">{group.category}</p>
                      {group.items.map((item) => (
                        <Link
                          key={item}
                          href="/services"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 py-1.5 px-3 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-gray-700" />
                          {item}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </nav>

              <div className="px-6 py-4 border-t border-white/10">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-edroyt-green hover:bg-edroyt-green-secondary text-white font-semibold rounded-lg transition-colors">
                    Get Started <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
