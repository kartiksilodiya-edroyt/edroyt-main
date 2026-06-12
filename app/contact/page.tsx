'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Clock, ArrowRight, CheckCircle2, MessageSquare, Zap, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// ── Rotating sticker ─────────────────────────────────────────────────────
function ContactSticker() {
  const text = 'GET IN TOUCH · LET\'S BUILD · ';
  const chars = text.split('');

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      className="relative w-full h-full"
    >
      {/* Outer rotating ring of text */}
      <svg viewBox="0 0 120 120" className="w-full h-full absolute inset-0">
        <defs>
          <path
            id="circle-path"
            d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
          />
        </defs>
        {chars.map((char, i) => (
          <text
            key={i}
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="0.5"
            fill="#22c578"
            fontFamily="monospace"
          >
            <textPath href="#circle-path" startOffset={`${(i / chars.length) * 100}%`}>
              {char}
            </textPath>
          </text>
        ))}
      </svg>

      {/* Center icon — doesn't rotate (counter-rotated) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-10 h-10 rounded-full bg-edroyt-green/20 border border-edroyt-green/40 flex items-center justify-center">
          <MessageSquare size={16} className="text-edroyt-green-accent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Process steps ────────────────────────────────────────────────────────
const processSteps = [
  { num: '01', title: 'Send your brief',         desc: 'Tell us what you\'re building, the problem you\'re solving, and your timeline.' },
  { num: '02', title: 'Scoping call (30 min)',   desc: 'We meet, ask the hard questions, and align on scope before any proposal.' },
  { num: '03', title: 'Proposal in 48 hours',    desc: 'You get a clear, itemised proposal — no vague estimates or padded scope.' },
  { num: '04', title: 'Dedicated team assigned', desc: 'One engineer owns your project from kick-off to production. No hand-offs.' },
];

// ── Trust signals ────────────────────────────────────────────────────────
const trustSignals = [
  { icon: Zap,     label: 'Response within 24 hours' },
  { icon: Shield,  label: 'NDA on request'           },
  { icon: CheckCircle2, label: 'No lock-in contracts' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-edroyt-dark">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-green/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-edroyt-green/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center">

            {/* ── THE STICKER — signature element ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="relative w-28 h-28 mb-10"
            >
              <ContactSticker />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-3xl"
            >
              <span className="inline-block text-edroyt-green text-xs font-bold tracking-widest uppercase mb-4">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Tell Us What<br />
                <span className="gradient-text">You're Solving.</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                No forms that disappear into a void. A real engineer reads every message and responds within one business day.
              </p>
            </motion.div>

            {/* Trust signals row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {trustSignals.map((t) => (
                <span key={t.label} className="flex items-center gap-2 text-sm text-gray-500">
                  <t.icon size={14} className="text-edroyt-green" />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Separator line */}
      <div className="h-px bg-gradient-to-r from-transparent via-edroyt-green/20 to-transparent" />

      {/* ── Form + Info ───────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-edroyt-dark via-[#0a0f08] to-edroyt-dark pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 xl:gap-16 items-start">

            {/* ── Left: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="glass rounded-2xl p-7 md:p-10 border border-white/5 relative overflow-hidden">
                {/* Subtle corner glow */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-edroyt-green/6 rounded-full blur-[60px] pointer-events-none" />

                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Send a brief</h2>
                      <p className="text-gray-500 text-sm">Takes 3 minutes. We'll come prepared to your first call.</p>
                    </div>

                    <form
                      className="space-y-5"
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                          <Input
                            placeholder="Alex"
                            className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                          <Input
                            placeholder="Chen"
                            className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Work Email</label>
                        <Input
                          type="email"
                          placeholder="alex@company.com"
                          className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Company</label>
                        <Input
                          placeholder="Acme Corp"
                          className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 h-11"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Service Needed</label>
                          <select className="w-full h-11 px-4 bg-edroyt-dark/80 border border-white/10 rounded-md text-white focus:border-edroyt-green focus:outline-none text-sm">
                            <option value="">Select…</option>
                            <option>Custom Software</option>
                            <option>Web Development</option>
                            <option>Mobile Development</option>
                            <option>AI & Automation</option>
                            <option>Cloud & DevOps</option>
                            <option>UI/UX Design</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Budget Range</label>
                          <select className="w-full h-11 px-4 bg-edroyt-dark/80 border border-white/10 rounded-md text-white focus:border-edroyt-green focus:outline-none text-sm">
                            <option value="">Select…</option>
                            <option>$25k – $50k</option>
                            <option>$50k – $100k</option>
                            <option>$100k – $250k</option>
                            <option>$250k+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Project Details
                        </label>
                        <Textarea
                          placeholder="Describe the problem you're solving, the system you need built, or the outcome you're working toward…"
                          rows={5}
                          className="bg-edroyt-dark/80 border-white/10 focus:border-edroyt-green text-white placeholder:text-gray-700 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-edroyt-green hover:bg-edroyt-green-secondary text-white h-12 text-sm font-semibold shadow-lg shadow-edroyt-green/20 group"
                      >
                        <Send size={15} className="mr-2 group-hover:translate-x-0.5 transition-transform" />
                        Send Brief
                      </Button>

                      <p className="text-center text-xs text-gray-700">
                        We respond within one business day. NDA available on request.
                      </p>
                    </form>
                  </>
                ) : (
                  /* ── Success state ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-5"
                  >
                    <div className="w-14 h-14 rounded-full bg-edroyt-green/20 border border-edroyt-green/40 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={26} className="text-edroyt-green-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Brief received.</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                      Someone from our engineering team will read this and get back to you within one business day — no automated responses.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* ── Right: Info column ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="space-y-5"
            >

              {/* Direct contact */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h2 className="text-base font-bold text-white mb-5 uppercase tracking-wider text-xs text-gray-500">Direct Contact</h2>
                <div className="space-y-4">
                  {[
                    { icon: Mail,  label: 'Email',    value: 'hello@edroyt.com',   href: 'mailto:hello@edroyt.com' },
                    { icon: Phone, label: 'Phone',    value: '+1 (415) 555-1234',  href: 'tel:+14155551234'        },
                    { icon: MapPin,label: 'Location', value: 'Indore, Madhya Pradesh', href: null },
                    { icon: Clock, label: 'Hours',    value: 'Mon–Fri, 9 AM – 6 PM IST', href: null               },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3.5 group">
                      <div className="w-8 h-8 rounded-lg bg-edroyt-green/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={14} className="text-edroyt-green" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-gray-300 hover:text-edroyt-green-accent text-sm transition-colors truncate block">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-300 text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What happens next */}
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-5">What Happens Next</h2>
                <div className="space-y-4">
                  {processSteps.map((step, i) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-edroyt-green/15 border border-edroyt-green/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-mono font-bold text-edroyt-green">{step.num}</span>
                        </div>
                        {i < processSteps.length - 1 && (
                          <div className="w-px flex-1 bg-white/5 mt-1.5 mb-0" style={{ minHeight: 20 }} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-white text-sm font-semibold leading-tight mb-1">{step.title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offices
              <div className="glass rounded-2xl p-6 border border-white/5">
                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Global Presence</h2>
                <div className="grid grid-cols-2 gap-x-4">
                  {[
                    { city: 'Mumbai',      type: 'HQ'     },
                    { city: 'New York',    type: 'Office'  },
                    { city: 'London',      type: 'Office'  },
                    { city: 'Singapore',   type: 'Office'  },
                  ].map((o) => (
                    <div key={o.city} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                      <span className="text-gray-400 text-sm">{o.city}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-edroyt-green/10 text-edroyt-green font-bold tracking-wide">
                        {o.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}