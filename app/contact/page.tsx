'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, MessageSquare, Zap, Shield, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from 'next-themes';
import { z } from 'zod';

const clientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     z.string().email('Please enter a valid email'),
  company:   z.string().optional(),
  service:   z.string().optional(),
  budget:    z.string().optional(),
  details:   z.string().min(10, 'Please describe your project (at least 10 characters)'),
});


type FormData = {
  firstName: string;
  lastName:  string;
  email:     string;
  company:   string;
  service:   string;
  budget:    string;
  details:   string;
  honeypot:  string; // anti-spam, always stays empty for real users
};

const emptyForm: FormData = {
  firstName: '', lastName: '', email: '',
  company: '', service: '', budget: '', details: '', honeypot: '',
};

// ── Theme-aware color tokens ───────────────────────────────────────────────
function useColors(isDark: boolean) {
  return {
    bgPrimary:          isDark ? '#08090d'                        : '#f8fafc',
    bgSecondary:        isDark ? '#0a0f08'                        : '#eef2f7',
    textPrimary:        isDark ? '#ffffff'                        : '#0f172a',
    textMuted:          isDark ? '#9ca3af'                        : '#475569',
    textDim:            isDark ? '#6b7280'                        : '#64748b',
    textDimmer:         isDark ? '#374151'                        : '#94a3b8',
    green:              isDark ? '#22c578'                        : '#16a34a',
    greenAccent:        isDark ? '#22c578'                        : '#16a34a',
    greenLight:         isDark ? '#7fffc4'                        : '#15803d',
    greenBg6:           isDark ? 'rgba(34,197,120,0.06)'          : 'rgba(22,163,74,0.06)',
    greenBg8:           isDark ? 'rgba(34,197,120,0.08)'          : 'rgba(22,163,74,0.08)',
    greenBg10:          isDark ? 'rgba(34,197,120,0.10)'          : 'rgba(22,163,74,0.10)',
    greenBg15:          isDark ? 'rgba(34,197,120,0.15)'          : 'rgba(22,163,74,0.12)',
    greenBg20:          isDark ? 'rgba(34,197,120,0.20)'          : 'rgba(22,163,74,0.15)',
    greenBorder20:      isDark ? 'rgba(34,197,120,0.20)'          : 'rgba(22,163,74,0.25)',
    greenBorder30:      isDark ? 'rgba(34,197,120,0.30)'          : 'rgba(22,163,74,0.35)',
    greenBorder40:      isDark ? 'rgba(34,197,120,0.40)'          : 'rgba(22,163,74,0.45)',
    heroBg:             isDark
      ? 'linear-gradient(to bottom, rgba(34,197,120,0.08), transparent, transparent)'
      : 'linear-gradient(to bottom, rgba(22,163,74,0.06), transparent, transparent)',
    heroBlob:           isDark ? 'rgba(34,197,120,0.06)'          : 'rgba(22,163,74,0.05)',
    formSectionBg:      isDark
      ? 'linear-gradient(to bottom, #08090d, #0a0f08, #08090d)'
      : 'linear-gradient(to bottom, #f8fafc, #eef2f7, #f8fafc)',
    separatorLine:      isDark
      ? 'linear-gradient(to right, transparent, rgba(34,197,120,0.20), transparent)'
      : 'linear-gradient(to right, transparent, rgba(22,163,74,0.25), transparent)',
    glassBg:            isDark ? 'rgba(255,255,255,0.02)'         : '#ffffff',
    glassBorder:        isDark ? 'rgba(255,255,255,0.05)'         : 'rgba(0,0,0,0.09)',
    glassShadow:        isDark ? 'none'                           : '0 2px 12px rgba(0,0,0,0.06)',
    glassCornerGlow:    isDark ? 'rgba(34,197,120,0.06)'          : 'rgba(22,163,74,0.05)',
    inputBg:            isDark ? 'rgba(8,9,13,0.80)'              : '#f8fafc',
    inputBorder:        isDark ? 'rgba(255,255,255,0.10)'         : 'rgba(0,0,0,0.12)',
    inputFocusBorder:   isDark ? '#22c578'                        : '#16a34a',
    inputText:          isDark ? '#ffffff'                        : '#0f172a',
    inputPlaceholder:   isDark ? '#374151'                        : '#94a3b8',
    selectBg:           isDark ? 'rgba(8,9,13,0.80)'              : '#f8fafc',
    selectBorder:       isDark ? 'rgba(255,255,255,0.10)'         : 'rgba(0,0,0,0.12)',
    selectText:         isDark ? '#ffffff'                        : '#0f172a',
    labelColor:         isDark ? '#6b7280'                        : '#64748b',
    trustColor:         isDark ? '#6b7280'                        : '#64748b',
    stepConnector:      isDark ? 'rgba(255,255,255,0.05)'         : 'rgba(0,0,0,0.08)',
    contactItemHover:   isDark ? '#22c578'                        : '#16a34a',
    contactValueColor:  isDark ? '#d1d5db'                        : '#334155',
    successBg:          isDark ? 'rgba(34,197,120,0.20)'          : 'rgba(22,163,74,0.15)',
    successBorder:      isDark ? 'rgba(34,197,120,0.40)'          : 'rgba(22,163,74,0.45)',
    successTextMuted:   isDark ? '#9ca3af'                        : '#475569',
    successSendAnother: isDark ? '#4b5563'                        : '#64748b',
    successSendHover:   isDark ? '#9ca3af'                        : '#334155',
    btnBg:              isDark ? '#22c578'                        : '#16a34a',
    btnHoverBg:         isDark ? '#1aad68'                        : '#15803d',
    btnShadow:          isDark ? 'rgba(34,197,120,0.20)'          : 'rgba(22,163,74,0.20)',
    bottomTextColor:    isDark ? '#374151'                        : '#94a3b8',
    errorColor:         isDark ? '#f87171'                        : '#dc2626',
  };
}

function gradientTextStyle(isDark: boolean, green: string, greenLight: string): React.CSSProperties {
  if (isDark) {
    return {
      background: `linear-gradient(135deg,${green},${greenLight})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }
  return { color: green };
}

function ContactSticker({ green }: { green: string }) {
  const text = "GET IN TOUCH · LET'S BUILD · ";
  const chars = text.split('');
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="relative w-full h-full">
      <svg viewBox="0 0 120 120" className="w-full h-full absolute inset-0">
        <defs>
          <path id="circle-path" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
        </defs>
        {chars.map((char, i) => (
          <text key={i} fontSize="7.5" fontWeight="700" letterSpacing="0.5" fill={green} fontFamily="monospace">
            <textPath href="#circle-path" startOffset={`${(i / chars.length) * 100}%`}>{char}</textPath>
          </text>
        ))}
      </svg>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `rgba(${green === '#22c578' ? '34,197,120' : '22,163,74'},0.20)`, border: `1px solid rgba(${green === '#22c578' ? '34,197,120' : '22,163,74'},0.40)` }}>
          <MessageSquare size={16} style={{ color: green }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

const processSteps = [
  { num: '01', title: 'Send your brief',         desc: "Tell us what you're building, the problem you're solving, and your timeline." },
  { num: '02', title: 'Scoping call (30 min)',   desc: 'We meet, ask the hard questions, and align on scope before any proposal.' },
  { num: '03', title: 'Proposal in 48 hours',    desc: 'You get a clear, itemised proposal — no vague estimates or padded scope.' },
  { num: '04', title: 'Dedicated team assigned', desc: 'One engineer owns your project from kick-off to production. No hand-offs.' },
];

const trustSignals = [
  { icon: Zap,          label: 'Response within 24 hours' },
  { icon: Shield,       label: 'NDA on request'           },
  { icon: CheckCircle2, label: 'No lock-in contracts'     },
];

// ── Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {

  const [formData, setFormData]   = useState<FormData>(emptyForm);
  const [loading,  setLoading]    = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,    setError]      = useState<string | null>(null);

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (resolvedTheme ?? theme ?? 'dark') : 'dark';
  const isDark = currentTheme !== 'light';
  const c = useColors(isDark);



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null); // clear error on any change
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Client-side Zod validation — instant feedback without a network round-trip
    const parsed = clientSchema.safeParse(formData);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Please check your inputs.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.');
        return;
      }

      // Trigger the existing success UI and reset form
      setSubmitted(true);
      setFormData(emptyForm);
    } catch {
      setError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: c.bgPrimary }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
     
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: c.heroBg }} />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: c.heroBlob }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }} className="relative w-28 h-28 mb-10">
              <ContactSticker green={c.green} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="max-w-3xl">
              <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4" style={{ color: c.green }}>Contact</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: c.textPrimary }}>
                Tell Us What<br />
                <span style={gradientTextStyle(isDark, c.green, c.greenLight)}>You're Solving.</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto" style={{ color: c.textMuted }}>
                No forms that disappear into a void. A real engineer reads every message and responds within one business day.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-6 mt-10">
              {trustSignals.map((t) => (
                <span key={t.label} className="flex items-center gap-2 text-sm" style={{ color: c.trustColor }}>
                  <t.icon size={14} style={{ color: c.green }} />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-px" style={{ background: c.separatorLine }} />

      {/* ── Form + Info ───────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: c.formSectionBg }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 xl:gap-16 items-start">

            {/* ── Left: Form ── */}
            <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="rounded-2xl p-7 md:p-10 relative overflow-hidden" style={{ background: c.glassBg, border: `1px solid ${c.glassBorder}`, boxShadow: c.glassShadow }}>
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[60px] pointer-events-none" style={{ background: c.glassCornerGlow }} />

                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2" style={{ color: c.textPrimary }}>Send a brief</h2>
                      <p className="text-sm" style={{ color: c.textDim }}>Takes 3 minutes. We'll come prepared to your first call.</p>
                    </div>

                 
                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>

                   
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.labelColor }}>First Name</label>
                          
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Alex"
                            className="h-11"
                            style={{ background: c.inputBg, border: `1px solid ${c.inputBorder}`, color: c.inputText }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.labelColor }}>Last Name</label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Chen"
                            className="h-11"
                            style={{ background: c.inputBg, border: `1px solid ${c.inputBorder}`, color: c.inputText }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.labelColor }}>Work Email</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="alex@company.com"
                          className="h-11"
                          style={{ background: c.inputBg, border: `1px solid ${c.inputBorder}`, color: c.inputText }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.labelColor }}>Company</label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="Acme Corp"
                          className="h-11"
                          style={{ background: c.inputBg, border: `1px solid ${c.inputBorder}`, color: c.inputText }}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.labelColor }}>Service Needed</label>
                          
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full h-11 px-4 rounded-md text-sm focus:outline-none transition-colors"
                            style={{ background: c.selectBg, border: `1px solid ${c.selectBorder}`, color: c.selectText }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = c.inputFocusBorder)}
                            onBlur={(e)  => (e.currentTarget.style.borderColor = c.selectBorder)}
                          >
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
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.labelColor }}>Budget Range</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full h-11 px-4 rounded-md text-sm focus:outline-none transition-colors"
                            style={{ background: c.selectBg, border: `1px solid ${c.selectBorder}`, color: c.selectText }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = c.inputFocusBorder)}
                            onBlur={(e)  => (e.currentTarget.style.borderColor = c.selectBorder)}
                          >
                            <option value="">Select…</option>
                            <option>Rs.25k – Rs.50k</option>
                            <option>Rs.50k – Rs.100k</option>
                            <option>Rs.100k – Rs.250k</option>
                            <option>Rs.250k+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.labelColor }}>Project Details</label>
                        <Textarea
                          name="details"
                          value={formData.details}
                          onChange={handleChange}
                          disabled={loading}
                          placeholder="Describe the problem you're solving, the system you need built, or the outcome you're working toward…"
                          rows={5}
                          className="resize-none"
                          style={{ background: c.inputBg, border: `1px solid ${c.inputBorder}`, color: c.inputText }}
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-center" style={{ color: c.errorColor }}>
                          {error}
                        </p>
                      )}

                    
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ background: c.btnBg, boxShadow: `0 4px 24px ${c.btnShadow}` }}
                        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = c.btnHoverBg; }}
                        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = c.btnBg; }}
                      >
                        {loading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            Send Brief
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs" style={{ color: c.bottomTextColor }}>
                        We respond within one business day. NDA available on request.
                      </p>
                    </form>
                  </>
                ) : (
                 
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-5">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: c.successBg, border: `1px solid ${c.successBorder}` }}>
                      <CheckCircle2 size={26} style={{ color: c.green }} />
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: c.textPrimary }}>Brief received.</h3>
                    <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: c.successTextMuted }}>
                      Someone from our engineering team will read this and get back to you within one business day — no automated responses.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs underline underline-offset-4 transition-colors"
                      style={{ color: c.successSendAnother }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = c.successSendHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = c.successSendAnother)}
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* ── Right: Info column — UNCHANGED ── */}
            <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.55 }} className="space-y-5">
              <div className="rounded-2xl p-6" style={{ background: c.glassBg, border: `1px solid ${c.glassBorder}`, boxShadow: c.glassShadow }}>
                <h2 className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: c.textDim }}>Direct Contact</h2>
                <div className="space-y-4">
                  {[
                    { icon: Mail,   label: 'Email',    value: 'hello@edroyt.com',         href: 'mailto:hello@edroyt.com' },
                    { icon: Phone,  label: 'Phone',    value: '+1 (415) 555-1234',          href: 'tel:+14155551234'        },
                    { icon: MapPin, label: 'Location', value: 'Indore, Madhya Pradesh',     href: null                     },
                    { icon: Clock,  label: 'Hours',    value: 'Mon–Fri, 9 AM – 6 PM IST',  href: null                     },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3.5 group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.greenBg10 }}>
                        <item.icon size={14} style={{ color: c.green }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: c.textDimmer }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm transition-colors truncate block" style={{ color: c.contactValueColor }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = c.green)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = c.contactValueColor)}>
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm" style={{ color: c.contactValueColor }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: c.glassBg, border: `1px solid ${c.glassBorder}`, boxShadow: c.glassShadow }}>
                <h2 className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: c.textDim }}>What Happens Next</h2>
                <div className="space-y-4">
                  {processSteps.map((step, i) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: c.greenBg15, border: `1px solid ${c.greenBorder30}` }}>
                          <span className="text-[9px] font-mono font-bold" style={{ color: c.green }}>{step.num}</span>
                        </div>
                        {i < processSteps.length - 1 && (
                          <div className="w-px flex-1 mt-1.5" style={{ minHeight: 20, background: c.stepConnector }} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-semibold leading-tight mb-1" style={{ color: c.textPrimary }}>{step.title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: c.textDim }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}