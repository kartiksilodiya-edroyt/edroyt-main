'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { getProjectById, getRelatedProjects, Project } from '@/data/project';


function useColors(isDark: boolean) {
  return {
    bg:        isDark ? '#08090d'                          : '#f8fafc',
    text:      isDark ? '#e8eaf0'                          : '#0f172a',
    textMuted: isDark ? '#8a9bb0'                          : '#475569',
    textDim:   isDark ? '#4a5568'                          : '#64748b',
    border:    isDark ? 'rgba(255,255,255,0.07)'           : 'rgba(0,0,0,0.10)',
    borderMid: isDark ? 'rgba(255,255,255,0.10)'           : 'rgba(0,0,0,0.13)',  // slightly stronger for section dividers
    accent:    isDark ? '#22c578'                          : '#16a34a',
    accentDim: isDark ? 'rgba(34,197,120,0.10)'           : 'rgba(22,163,74,0.12)',
    accentBorder: isDark ? 'rgba(34,197,120,0.25)'        : 'rgba(22,163,74,0.35)',
    panel:     isDark ? '#0b0c12'                          : '#eef2f7',
    ghost:     isDark ? 'rgba(255,255,255,0.03)'           : 'rgba(0,0,0,0.03)',
    cardBg:    isDark ? 'rgba(255,255,255,0.02)'           : '#ffffff',
  };
}

// ── Gradient text — solid dark in light mode, no fading tail ─────────────
function gradientText(isDark: boolean): React.CSSProperties {
  if (isDark) {
    return {
      background: 'linear-gradient(140deg, #e8eaf0 0%, #6b7280 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }
  // Light: plain solid color — avoids the faded #6b7280 tail problem
  return { color: '#0f172a' };
}

// ── Animation ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any },
  },
});

// ── Section divider ──────────────────────────────────────────────────────────
function SectionLabel({ index, label, colors }: {
  index: string;
  label: string;
  colors: ReturnType<typeof useColors>;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      borderTop: `1px solid ${colors.borderMid}`,
      paddingTop: 20, marginBottom: 56,
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
        color: colors.accent, fontVariantNumeric: 'tabular-nums',
      }}>
        {index}
      </span>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: colors.textDim }}>
        —
      </span>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: colors.textMuted, textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

// ── Next project block ───────────────────────────────────────────────────────
function NextProjectBlock({ project, colors, isDark }: {
  project: Project;
  colors: ReturnType<typeof useColors>;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/portfolio/${project.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          borderTop: `1px solid ${colors.borderMid}`,
          padding: '60px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          gap: 24,
        }}
      >
        <div>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            color: colors.textMuted, textTransform: 'uppercase', marginBottom: 12,
          }}>
            Next Project
          </div>
          <motion.div
            animate={{ x: hovered ? 8 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as any }}
            style={{
              fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900,
              letterSpacing: '-0.03em', lineHeight: 1.05,
              ...gradientText(isDark),
            }}
          >
            {project.title}
          </motion.div>
          <div style={{ fontSize: 14, color: colors.textMuted, marginTop: 10 }}>
            {project.tagline}
          </div>
        </div>

        <motion.div
          animate={{ rotate: hovered ? -45 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            flexShrink: 0,
            width: 56, height: 56, borderRadius: '50%',
            border: `1px solid ${hovered ? colors.accent : colors.borderMid}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hovered ? colors.accent : colors.textMuted,
            transition: 'border-color 0.3s, color 0.3s',
          }}
        >
          <ArrowUpRight size={22} />
        </motion.div>
      </motion.div>
    </Link>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark  = !mounted || resolvedTheme !== 'light';
  const colors  = useColors(isDark);
  const project = getProjectById(id);
  const related = project ? getRelatedProjects(id, 1) : [];
  const nextProject = related[0] ?? null;

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh', background: colors.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 18, color: colors.text, marginBottom: 8 }}>Project not found</div>
          <Link href="/portfolio" style={{ color: colors.accent, fontSize: 14 }}>← Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  const wrap: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    background: colors.bg,
    color: colors.text,
    minHeight: '100vh',
  };

  const container: React.CSSProperties = {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '0 32px',
  };

  return (
    <div style={wrap}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {/* paddingTop: 144px matches Portfolio's pt-36, clearing the fixed navbar */}
      <div style={{ ...container, paddingTop: 144, paddingBottom: 0 }}>

        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 40 }}
        >
          <Link href="/portfolio" style={{ textDecoration: 'none' }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: colors.textMuted,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = colors.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = colors.textMuted)}
            >
              ← Portfolio
            </span>
          </Link>
        </motion.div>

        {/* Top row: title left, meta right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Left: emoji + title */}
          <div>
            <motion.div
              variants={fadeUp(0.05)} initial="hidden" animate="show"
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
            >
              <span style={{ fontSize: 28 }}>{project.emoji}</span>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: colors.accent,
              }}>
                {project.category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp(0.1)} initial="hidden" animate="show"
              style={{
                fontSize: 'clamp(42px, 7vw, 88px)',
                fontWeight: 900, letterSpacing: '-0.04em',
                lineHeight: 0.95, margin: 0,
                ...gradientText(isDark),
              }}
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Right: year + live link */}
          <motion.div
            variants={fadeUp(0.15)} initial="hidden" animate="show"
            style={{ textAlign: 'right', flexShrink: 0, paddingBottom: 8 }}
          >
            <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 10 }}>{project.year}</div>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 700, color: colors.accent,
                  letterSpacing: '0.06em',
                }}>
                  Live site <ExternalLink size={12} />
                </span>
              </a>
            )}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp(0.2)} initial="hidden" animate="show"
          style={{
            fontSize: 'clamp(16px, 2.2vw, 21px)',
            color: colors.textMuted, lineHeight: 1.65,
            maxWidth: 620, margin: 0, marginBottom: 48,
          }}
        >
          {project.tagline}
        </motion.p>

        {/* Horizontal meta strip */}
        <motion.div
          variants={fadeUp(0.25)} initial="hidden" animate="show"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            borderTop: `1px solid ${colors.borderMid}`,
            borderBottom: `1px solid ${colors.borderMid}`,
            background: isDark ? 'transparent' : colors.cardBg,
            borderRadius: isDark ? 0 : 12,
            boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Client',   value: project.client },
            { label: 'Industry', value: project.industry },
            { label: 'Duration', value: project.duration },
            { label: 'Role',     value: project.role },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              style={{
                padding: '24px 0',
                borderRight: i < 3 ? `1px solid ${colors.borderMid}` : 'none',
                paddingRight: i < 3 ? 24 : 0,
                paddingLeft: i > 0 ? 24 : 0,
              }}
            >
              <div style={{
                fontSize: 10, letterSpacing: '0.14em', fontWeight: 700,
                color: colors.textDim, textTransform: 'uppercase', marginBottom: 8,
              }}>
                {label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, lineHeight: 1.4 }}>
                {value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Hero image / placeholder ──────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0.3)} initial="hidden" animate="show"
        style={{ margin: '0 0 96px 0', ...container, paddingTop: 40 }}
      >
        {project.gallery.length > 0 ? (
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: `1px solid ${colors.borderMid}`,
            aspectRatio: '16/8',
            boxShadow: isDark ? 'none' : '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <img
              src={project.gallery[0]}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ) : (
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: `1px solid ${colors.borderMid}`,
            aspectRatio: '16/7',
            background: colors.panel,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            boxShadow: isDark ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            {/* Grid lines — bumped opacity in light mode so they're actually visible */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(${colors.borderMid} 1px, transparent 1px), linear-gradient(90deg, ${colors.borderMid} 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              opacity: isDark ? 1 : 0.6,
            }} />
            {/* Big ghost emoji */}
            <div style={{
              fontSize: 'clamp(80px, 16vw, 160px)',
              opacity: isDark ? 0.12 : 0.15,
              userSelect: 'none', position: 'relative',
            }}>
              {project.emoji}
            </div>
            {/* Accent dot */}
            <div style={{
              position: 'absolute', bottom: 32, right: 32,
              width: 10, height: 10, borderRadius: '50%',
              background: project.accent, opacity: 0.7,
            }} />
          </div>
        )}
      </motion.div>

      {/* ── 01 Overview + Challenge ───────────────────────────────────────── */}
      <div style={{ ...container, marginBottom: 96 }}>
        <motion.div variants={fadeUp()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <SectionLabel index="01" label="Overview" colors={colors} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <motion.p
            variants={fadeUp(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            style={{ fontSize: 17, lineHeight: 1.8, color: colors.text, margin: 0 }}
          >
            {project.overview}
          </motion.p>

          <motion.div
            variants={fadeUp(0.14)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            <div style={{
              fontSize: 10, letterSpacing: '0.14em', fontWeight: 700,
              color: colors.textDim, textTransform: 'uppercase', marginBottom: 16,
            }}>
              The Challenge
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: colors.textMuted, margin: 0 }}>
              {project.challenge}
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {project.technologies.map(tech => (
                <span key={tech} style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
                  padding: '4px 12px', borderRadius: 100,
                  border: `1px solid ${colors.borderMid}`,
                  color: colors.textMuted,
                  background: isDark ? 'transparent' : colors.cardBg,
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 02 Approach ──────────────────────────────────────────────────── */}
      <div style={{ ...container, marginBottom: 96 }}>
        <motion.div variants={fadeUp()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <SectionLabel index="02" label="Approach" colors={colors} />
        </motion.div>

        <div>
          {project.approach.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp(i * 0.06)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 1fr',
                gap: '0 48px',
                padding: '36px 0',
                borderBottom: `1px solid ${colors.borderMid}`,
              }}
            >
              <div style={{
                fontSize: 12, fontWeight: 800, color: colors.accent,
                letterSpacing: '0.08em', paddingTop: 3,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: colors.text, lineHeight: 1.4 }}>
                {step.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.75, color: colors.textMuted }}>
                {step.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 03 Results ───────────────────────────────────────────────────── */}
      <div style={{ ...container, marginBottom: 96 }}>
        <motion.div variants={fadeUp()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <SectionLabel index="03" label="Results" colors={colors} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
          gap: 0,
          borderTop: `1px solid ${colors.borderMid}`,
          borderBottom: `1px solid ${colors.borderMid}`,
          background: isDark ? 'transparent' : colors.cardBg,
          borderRadius: isDark ? 0 : 12,
          overflow: 'hidden',
          boxShadow: isDark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
        }}>
          {project.metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeUp(i * 0.07)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
              style={{
                padding: '40px 32px',
                borderRight: i < project.metrics.length - 1 ? `1px solid ${colors.borderMid}` : 'none',
              }}
            >
              <div style={{
                fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 1,
                // Use accent color — #16a34a in light passes WCAG AA on white
                color: colors.accent,
                marginBottom: 10,
              }}>
                {metric.value}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                color: colors.textMuted, textTransform: 'uppercase',
              }}>
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 04 Outcome ───────────────────────────────────────────────────── */}
      <div style={{ ...container, marginBottom: 96 }}>
        <motion.div variants={fadeUp()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          <SectionLabel index="04" label="Outcome" colors={colors} />
        </motion.div>

        <motion.p
          variants={fadeUp(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          style={{
            fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 500,
            lineHeight: 1.6, color: colors.text,
            maxWidth: 760, margin: 0,
          }}
        >
          {project.outcome}
        </motion.p>
      </div>

      {/* ── Testimonial ──────────────────────────────────────────────────── */}
      {project.testimonial && (
        <div style={{ ...container, marginBottom: 96 }}>
          <motion.div
            variants={fadeUp()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            style={{
              borderTop: `2px solid ${colors.accent}`,
              paddingTop: 40,
              paddingBottom: isDark ? 0 : 40,
              paddingLeft: isDark ? 0 : 36,
              paddingRight: isDark ? 0 : 36,
              borderRadius: isDark ? 0 : 12,
              background: isDark ? 'transparent' : colors.accentDim,
              borderLeft: isDark ? 'none' : `2px solid ${colors.accent}`,
              borderTopLeftRadius: isDark ? 0 : 0,
            }}
          >
            <p style={{
              fontSize: 'clamp(20px, 2.8vw, 28px)', fontStyle: 'italic',
              fontWeight: 500, lineHeight: 1.6, color: colors.text,
              margin: '0 0 28px',
            }}>
              "{project.testimonial.quote}"
            </p>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
              {project.testimonial.author}
            </div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
              {project.testimonial.role}
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      {project.gallery.length > 1 && (
        <div style={{ ...container, marginBottom: 96 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: project.gallery.length > 2 ? '1fr 1fr' : '1fr',
            gap: 12,
          }}>
            {project.gallery.slice(1).map((src, i) => (
              <motion.div
                key={i}
                variants={fadeUp(i * 0.06)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
                style={{
                  borderRadius: 12, overflow: 'hidden',
                  border: `1px solid ${colors.borderMid}`,
                  aspectRatio: '16/10',
                  boxShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.07)',
                }}
              >
                <img
                  src={src}
                  alt={`${project.title} ${i + 2}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Next Project ─────────────────────────────────────────────────── */}
      <div style={{ ...container, paddingBottom: 80 }}>
        {nextProject ? (
          <motion.div
            variants={fadeUp()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          >
            <NextProjectBlock project={nextProject} colors={colors} isDark={isDark} />
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            style={{ borderTop: `1px solid ${colors.borderMid}`, paddingTop: 60, paddingBottom: 20 }}
          >
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: colors.textMuted, textTransform: 'uppercase', marginBottom: 12,
            }}>
              All Work
            </div>
            <Link href="/portfolio" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900,
                  letterSpacing: '-0.03em',
                  display: 'flex', alignItems: 'center', gap: 20,
                  ...gradientText(isDark),
                }}
              >
                Back to Portfolio <ArrowRight size={32} />
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>

    </div>
  );
}