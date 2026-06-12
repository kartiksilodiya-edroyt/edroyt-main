'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image'; 

const quickLinks = [
  { label: 'Home',         href: '/'            },
  { label: 'About',        href: '/about'        },
  { label: 'Services',     href: '/services'     },
  { label: 'Portfolio',    href: '/portfolio'    },
  // { label: 'Technologies', href: '/technologies' },
  { label: 'Contact',      href: '/contact'      },
];

const services = [
  { label: 'Custom Software',    href: '/services#custom-software'    },
  { label: 'Web Development',    href: '/services#web-development'    },
  { label: 'Mobile Development', href: '/services#mobile-development' },
  { label: 'AI & Automation',    href: '/services#ai-automation'      },
  { label: 'Cloud & DevOps',     href: '/services#cloud-devops'       },
  { label: 'UI/UX Design',       href: '/services#ui-ux-design'       },
];

const socialLinks = [
  { icon: Twitter,  href: '#', label: 'Twitter'  },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github,   href: '#', label: 'GitHub'   },
];

export default function Footer() {
  return (
    <footer className="bg-[#080C10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top CTA strip */}
        <div className="py-10 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Ready to build something that lasts?</h3>
            <p className="text-gray-500 text-sm">Tell us what you're solving — we'll tell you how we'd approach it.</p>
          </div>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 bg-edroyt-green hover:bg-edroyt-green-secondary text-white font-semibold rounded-lg text-sm shadow-lg shadow-edroyt-green/20 transition-colors flex-shrink-0"
            >
              Start a Project <ArrowRight size={15} />
            </motion.button>
          </Link>
        </div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center justify-center flex-shrink-0">
  <div className="relative w-[180px] h-[50px] transition-transform duration-300 hover:scale-105">
    <Image
      src="/logo/edroyt-logo-removebg-preview.png"
      alt="Edroyt"
      fill
      priority
      sizes="180px"
      className="object-contain object-left"
    />
  </div>
</Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Production-grade software built by engineers who take ownership — from first commit to long-term uptime.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-edroyt-green/20 rounded-lg text-gray-500 hover:text-edroyt-green-accent transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-500 hover:text-white text-sm transition-colors inline-flex items-center group gap-1.5">
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 text-edroyt-green transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Services</h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-gray-500 hover:text-white text-sm transition-colors inline-flex items-center group gap-1.5">
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 text-edroyt-green transition-opacity" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-gray-500 text-sm">
                <MapPin size={15} className="mt-0.5 text-edroyt-green flex-shrink-0" />
                <span>Indore, Madhya Pradesh</span>
              </li>
              <li>
                <a href="mailto:hello@edroyt.com" className="flex items-center gap-2.5 text-gray-500 hover:text-edroyt-green-accent text-sm transition-colors">
                  <Mail size={15} className="text-edroyt-green flex-shrink-0" />
                  hello@edroyt.com
                </a>
              </li>
              <li>
                <a href="tel:+14155551234" className="flex items-center gap-2.5 text-gray-500 hover:text-edroyt-green-accent text-sm transition-colors">
                  <Phone size={15} className="text-edroyt-green flex-shrink-0" />
                  +1 (415) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Edroyt. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs">
            <Link href="#" className="text-gray-600 hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}