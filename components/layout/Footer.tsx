'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const quickLinks = [
  { label: 'Home',      href: '/'          },
  { label: 'About',     href: '/about'     },
  { label: 'Services',  href: '/services'  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact',   href: '/contact'   },
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

// Reusable nav link — hover handled on the <a> anchor Next.js renders
function NavLink({
  href,
  label,
  mutedTextColor,
}: {
  href: string;
  label: string;
  mutedTextColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="text-sm inline-flex items-center gap-1.5 transition-colors"
      style={{ color: hovered ? 'var(--text-primary)' : mutedTextColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ArrowRight
        size={11}
        style={{
          color: 'var(--green)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s',
        }}
      />
      {label}
    </Link>
  );
}

export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentTheme   = mounted ? (resolvedTheme ?? theme ?? 'dark') : 'dark';
  const isDark         = currentTheme !== 'light';
  const borderColor    = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)';
  const mutedTextColor = isDark ? 'rgb(107,114,128)'       : 'rgb(100,116,139)';
  const dimTextColor   = isDark ? 'rgb(75,85,99)'          : 'rgb(148,163,184)';

  return (
    <footer
      style={{
        background: isDark ? '#080C10' : 'var(--bg-secondary)',
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Top CTA strip ─────────────────────────────── */}
        <div
          className="py-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Ready to build something that lasts?
            </h3>
            <p className="text-sm" style={{ color: mutedTextColor }}>
              Tell us what you're solving — we'll tell you how we'd approach it.
            </p>
          </div>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg text-sm flex-shrink-0 transition-all"
              style={{
                background: 'linear-gradient(135deg, var(--green-dim), var(--green))',
                boxShadow: isDark
                  ? '0 4px 24px rgba(34,197,120,0.20)'
                  : '0 4px 24px rgba(22,163,74,0.18), 0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              Start a Project <ArrowRight size={15} />
            </motion.button>
          </Link>
        </div>

        {/* ── Main grid ─────────────────────────────────── */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-[180px] h-[50px] transition-transform duration-300 hover:scale-105">
                <Image
                  src="/logo/edroyt-logo-removebg-preview.png"
                  alt="Edroyt"
                  fill
                  priority
                  sizes="180px"
                  className="object-contain object-left"
                  style={{
                    filter: isDark
                      ? 'none'
                      : 'brightness(0) saturate(100%) invert(35%) sepia(60%) saturate(500%) hue-rotate(100deg)',
                  }}
                />
              </div>
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: mutedTextColor }}>
              Production-grade software built by engineers who take ownership — from first commit to long-term uptime.
            </p>

            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <SocialIcon key={s.label} {...s} isDark={isDark} mutedTextColor={mutedTextColor} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href} label={link.label} mutedTextColor={mutedTextColor} />
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.href}>
                  <NavLink href={service.href} label={service.label} mutedTextColor={mutedTextColor} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-sm" style={{ color: mutedTextColor }}>
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--green)' }} />
                <span>Indore, Madhya Pradesh</span>
              </li>
              <li>
                <ContactLink href="mailto:hello@edroyt.com" mutedTextColor={mutedTextColor}>
                  <Mail size={15} className="flex-shrink-0" style={{ color: 'var(--green)' }} />
                  hello@edroyt.com
                </ContactLink>
              </li>
              <li>
                <ContactLink href="tel:+14155551234" mutedTextColor={mutedTextColor}>
                  <Phone size={15} className="flex-shrink-0" style={{ color: 'var(--green)' }} />
                  +1 (415) 555-1234
                </ContactLink>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────── */}
        <div
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <p className="text-xs" style={{ color: dimTextColor }}>
            © {new Date().getFullYear()} Edroyt. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <BottomLink key={item} label={item} dimTextColor={dimTextColor} mutedTextColor={mutedTextColor} />
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

// ── Small sub-components to keep hover state local ────────────────────────

function SocialIcon({
  icon: Icon,
  href,
  label,
  isDark,
  mutedTextColor,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
  isDark: boolean;
  mutedTextColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1, y: -2 }}
      className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
      style={{
        background: hovered
          ? isDark ? 'rgba(34,197,120,0.20)' : 'rgba(22,163,74,0.12)'
          : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        color: hovered ? 'var(--green-light)' : mutedTextColor,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
    >
      <Icon size={15} />
    </motion.a>
  );
}

function ContactLink({
  href,
  mutedTextColor,
  children,
}: {
  href: string;
  mutedTextColor: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 text-sm transition-colors"
      style={{ color: hovered ? 'var(--green-light)' : mutedTextColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

function BottomLink({
  label,
  dimTextColor,
  mutedTextColor,
}: {
  label: string;
  dimTextColor: string;
  mutedTextColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="#"
      className="transition-colors"
      style={{ color: hovered ? mutedTextColor : dimTextColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}