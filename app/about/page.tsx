'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ArrowRight, Users, Briefcase, Globe2, Clock } from 'lucide-react';
import Link from 'next/link';

// ── Data ──────────────────────────────────────────────────────────────────
const coreValues = [
  {
    index: '01',
    title: 'Inside Edroyt',
    description:
      'Our belief is that the culture and people of an organization speak louder than any portfolio. In order to foster an ecosystem that allows for the development of each individual as well as the development of a team. It is their progress by which we gauge our success, which ultimately brings delight to the clients, as teamwork makes the dream come true.',
  },
  {
    index: '02',
    title: 'Project & Strategy',
    description:
      'Our belief is that the culture and people of an organization speak louder than any portfolio. In order to foster an ecosystem that allows for the development of each individual as well as the development of a team. It is their progress by which we gauge our success, which ultimately brings delight to the clients, as teamwork makes the dream come true.',
  },
  {
    index: '03',
    title: 'Trust & Accountability',
    description:
      'As a startup company, we understand the importance of building trust with clients. It is our responsibility to do the work that needs to be done, and we take the initiative to correct mistakes as soon as possible without impacting your product or service. As we learn and grow through the opportunities you provide, we will become better.',
  },
];

const team = [
  { name: 'Prashant Kumar',    role: 'Co-Founder',                      initials: 'PK' },
  { name: 'Krati Vyas',        role: 'Team Lead',                        initials: 'KV' },
  { name: 'Vikas Tank',        role: 'Sr. Backend Developer',            initials: 'VT' },
  { name: 'Ayush Kumrawat',    role: 'Business Development Executive',   initials: 'AK' },
  { name: 'Garima Bansal',     role: 'Quality Assurance',                initials: 'GB' },
  { name: 'Ritik Toppo',       role: 'Python Developer',                 initials: 'RT' },
  { name: 'Mahek Joshi',       role: 'Frontend Developer',               initials: 'MJ' },
  { name: 'Sakina Ali',        role: 'Designer',                         initials: 'SA' },
];

const timeline = [
  { year: '2019', title: 'Started as Freelancers',      description: 'A group of passionate engineers and designers began their journey taking on freelance projects and building real-world solutions.' },
  { year: '2020', title: 'Moved Into Small Companies',  description: 'Gained hands-on enterprise experience and sharpened skills across diverse domains — fintech, health, retail, and logistics.' },
  { year: '2021', title: 'Founded Edroyt',              description: 'Launched Edroyt with a clear belief: enterprise-grade software should not be exclusive to large corporations.' },
  { year: '2022', title: 'First 20 Clients',            description: 'Onboarded 20+ clients across India, delivering end-to-end web, mobile, and AI-powered solutions.' },
  { year: '2023', title: 'Team of 30+',                 description: 'Grew to a team of 30+ engineers, designers, and strategists working across multiple domains and time zones.' },
  { year: '2024', title: '100+ Projects Shipped',       description: 'Crossed the 100-project milestone — each one a story of precision, collaboration, and measurable business impact.' },
];

// ── Value Card ────────────────────────────────────────────────────────────
function ValueCard({ item, index }: { item: typeof coreValues[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl p-6 transition-all duration-300"
      style={{
        background: hovered ? 'rgba(34,197,120,0.04)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(34,197,120,0.28)' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top glow */}
      <div
        aria-hidden
        className="absolute top-0 left-8 right-8 h-px transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0, background: 'linear-gradient(90deg, transparent, #22c578, transparent)' }}
      />
      <div className="flex items-start gap-5">
        <span
          className="text-[3rem] font-black leading-none select-none flex-shrink-0 hidden sm:block"
          style={{ color: 'transparent', WebkitTextStroke: '1px rgba(34,197,120,0.18)', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.index}
        </span>
        <div>
          <h3
            className="text-lg font-black mb-3 transition-colors duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: hovered ? '#7fffc4' : '#fff' }}
          >
            {item.title}
          </h3>
          <p className="text-[13.5px] leading-relaxed" style={{ color: '#8a9bb0' }}>
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Team Card ─────────────────────────────────────────────────────────────
function TeamCard({ member, index }: { member: typeof team[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  // gradient per card for variety
  const gradients = [
    'linear-gradient(135deg,#0d7040,#22c578)',
    'linear-gradient(135deg,#1a3a6b,#4a90d9)',
    'linear-gradient(135deg,#4a1a6b,#a855f7)',
    'linear-gradient(135deg,#6b3a1a,#f59e0b)',
    'linear-gradient(135deg,#1a4a3a,#10b981)',
    'linear-gradient(135deg,#3a1a4a,#ec4899)',
    'linear-gradient(135deg,#0d4040,#06b6d4)',
    'linear-gradient(135deg,#4a3a1a,#f97316)',
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex gap-4 items-center p-5 rounded-xl transition-all duration-300"
      style={{
        background: hovered ? 'rgba(34,197,120,0.04)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(34,197,120,0.25)' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top glow */}
      <div
        aria-hidden
        className="absolute top-0 left-6 right-6 h-px transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0, background: 'linear-gradient(90deg, transparent, #22c578, transparent)' }}
      />
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-black"
        style={{ background: gradients[index % gradients.length], color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {member.initials}
      </div>
      <div>
        <p
          className="font-bold text-[15px] transition-colors duration-200"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: hovered ? '#7fffc4' : '#fff' }}
        >
          {member.name}
        </p>
        <p className="text-[11.5px] mt-0.5 font-medium" style={{ color: '#22c578' }}>
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans" style={{ background: '#08090d' }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div
          aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,120,0.10), transparent)' }}
        />
        {/* Ghost text */}
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none pr-6 hidden lg:block"
          style={{
            fontSize: 'clamp(6rem,18vw,14rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(34,197,120,0.06)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          ABOUT
        </div>

        <div className="max-w-4xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>
              Who We Are
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="font-black text-white leading-[1.04] mb-6 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.8rem,7vw,5rem)' }}
          >
            A Great Story Starts<br />with a{' '}
            <span style={{
              background: 'linear-gradient(135deg,#22c578,#7fffc4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Friendly Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: '#8a9bb0' }}
          >
            AI-driven tech startup based in Indore, Madhya Pradesh. We strive to empower organizations with solutions that streamline operations, enhance productivity, and foster growth.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 flex flex-wrap gap-10 md:gap-16"
          >
            {[
              { icon: Users,     num: '30+',  label: 'Team Members'      },
              { icon: Clock,     num: '5',    label: 'Years in Business'  },
              { icon: Globe2,    num: '50+',  label: 'Clients Worldwide'  },
              { icon: Briefcase, num: '100+', label: 'Projects Completed' },
            ].map(({ icon: Icon, num, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(34,197,120,0.08)', border: '1px solid rgba(34,197,120,0.15)' }}>
                  <Icon size={15} style={{ color: '#22c578' }} />
                </div>
                <div>
                  <p className="text-2xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{num}</p>
                  <p className="text-[10px] mt-0.5 tracking-[0.14em] uppercase font-semibold" style={{ color: '#4a5568' }}>{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────── */}
      <section className="py-20" style={{ background: '#0d0f15' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>Our Story</span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-black text-white mb-6 leading-[1.1]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                From Freelancers to{' '}
                <span style={{
                  background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Enterprise Partners
                </span>
              </h2>
              <div className="space-y-4 text-[14.5px] leading-relaxed" style={{ color: '#8a9bb0' }}>
                <p>
                  We started out as freelancers, then moved into small companies, finally dreaming of launching our own company based on our belief that enterprise application development should not be exclusive.
                </p>
                <p>
                  Our core focus is to analyze each user's problem and provide the most appropriate solution to solve their problems. Every line of code we write is backed by empathy for the end user and respect for the client's vision.
                </p>
                <p>
                  Today, Edroyt is a growing team of engineers, designers, and strategists working out of Indore — and remotely across the globe — to build technology that genuinely moves businesses forward.
                </p>
              </div>
            </motion.div>

            {/* Right — Mission & Vision cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              {[
                {
                  icon: Target, verb: 'Mission',
                  text: 'To democratize enterprise-grade software — making powerful, scalable, and intelligent technology accessible to every business, regardless of size or sector.',
                },
                {
                  icon: Eye, verb: 'Vision',
                  text: 'To become the most trusted technology partner for ambitious organizations across South Asia and beyond, known for engineering excellence and human-first design.',
                },
              ].map(({ icon: Icon, verb, text }, i) => {
                const [hov, setHov] = useState(false);
                return (
                  <div
                    key={verb}
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                    className="relative p-6 rounded-xl transition-all duration-300"
                    style={{
                      background: hov ? 'rgba(34,197,120,0.04)' : 'rgba(255,255,255,0.02)',
                      border: hov ? '1px solid rgba(34,197,120,0.28)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      aria-hidden className="absolute top-0 left-8 right-8 h-px transition-opacity duration-500"
                      style={{ opacity: hov ? 1 : 0, background: 'linear-gradient(90deg, transparent, #22c578, transparent)' }}
                    />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(34,197,120,0.1)', border: '1px solid rgba(34,197,120,0.2)' }}>
                        <Icon size={17} style={{ color: '#22c578' }} />
                      </div>
                      <div>
                        <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-2 px-2 py-0.5 rounded"
                          style={{ color: '#22c578', border: '1px solid rgba(34,197,120,0.22)', background: 'rgba(34,197,120,0.06)' }}>
                          {verb}
                        </span>
                        <p className="text-[13.5px] leading-relaxed" style={{ color: '#8a9bb0' }}>{text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────── */}
      <section className="py-20" style={{ background: '#08090d' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The Core Values That<br />Drive Everything
            </h2>
            <p className="text-lg max-w-xl" style={{ color: '#8a9bb0' }}>
              Quickly incubate functional channels with multidisciplinary architectures. Authoritatively fabricate formulate exceptional innovation.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {coreValues.map((item, i) => (
              <ValueCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {/* Marquee tagline */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-14 overflow-hidden py-5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex gap-16 whitespace-nowrap" style={{ animation: 'marqueeSlide 18s linear infinite' }}>
              {['WE INNOVATE', 'WE CREATE', 'WE THRIVE', 'WE INNOVATE', 'WE CREATE', 'WE THRIVE', 'WE INNOVATE', 'WE CREATE', 'WE THRIVE'].map((t, i) => (
                <span key={i} className="text-[1.5rem] font-black tracking-[0.18em]"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: i % 3 === 0 ? '#22c578' : 'transparent',
                    WebkitTextStroke: i % 3 !== 0 ? '1px rgba(34,197,120,0.25)' : 'none',
                  }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Team ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#0d0f15' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header — mirrors Services category header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10 pb-6"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-end gap-6">
              <span
                className="text-[4rem] md:text-[5rem] font-black leading-none select-none hidden sm:block"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(34,197,120,0.15)', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                04
              </span>
              <div>
                <span className="inline-block text-[10px] font-bold tracking-[0.24em] uppercase mb-2 px-2 py-0.5 rounded"
                  style={{ color: '#22c578', border: '1px solid rgba(34,197,120,0.22)', background: 'rgba(34,197,120,0.06)' }}>
                  People
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Our Team
                </h2>
                <p className="text-sm mt-1" style={{ color: '#4a5568' }}>
                  The builders, thinkers, and creators behind every project.
                </p>
              </div>
            </div>
            <span className="text-sm hidden md:block" style={{ color: '#4a5568' }}>
              {team.length} members
            </span>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────── */}
      <section className="py-20" style={{ background: '#08090d' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How We Got Here
            </h2>
          </motion.div>

          {/* Timeline — horizontal on desktop */}
          <div className="relative">
            {/* Vertical line mobile / horizontal line desktop */}
            <div className="hidden lg:block absolute top-5 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,120,0.3) 10%, rgba(34,197,120,0.3) 90%, transparent)' }} />

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="flex-1 lg:px-5 relative"
                >
                  {/* Dot */}
                  <div className="lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 mb-4 lg:mb-0 flex lg:justify-center">
                    <div className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: '#22c578', boxShadow: '0 0 12px rgba(34,197,120,0.5)', border: '2px solid rgba(34,197,120,0.2)' }} />
                  </div>

                  <div className="lg:mt-7 p-5 rounded-xl transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.04)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,120,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    }}
                  >
                    <div className="text-[11px] font-black tracking-[0.2em] mb-2" style={{ color: '#22c578', fontFamily: 'monospace' }}>
                      {event.year}
                    </div>
                    <h3 className="font-bold text-[14px] text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {event.title}
                    </h3>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: '#8a9bb0' }}>{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — mirrors Services/Portfolio exactly ─── */}
      <section className="py-24 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(34,197,120,0.07), transparent)' }} />
        <div aria-hidden className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,120,0.3), transparent)' }} />

        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ background: '#22c578' }} aria-hidden />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: '#22c578' }}>
                Let's Build Together
              </span>
            </div>
            <h2
              className="font-black text-white mb-5 tracking-tight leading-[1.04]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem,5vw,3.5rem)' }}
            >
              Ready to build something{' '}
              <span style={{
                background: 'linear-gradient(135deg,#22c578,#7fffc4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                remarkable?
              </span>
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#8a9bb0' }}>
              Tell us about your project and we'll find the right solution together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg,#0d7040,#22c578)', boxShadow: '0 0 40px rgba(34,197,120,0.22)' }}
                >
                  Start a project <ArrowRight size={15} />
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'transparent' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,120,0.3)'; (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,120,0.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  View services
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marqueeSlide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

    </div>
  );
}