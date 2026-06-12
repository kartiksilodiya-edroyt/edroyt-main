'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';

// ── Particle field ─────────────────────────────────────────────────────────
function ParticleField({ isDark }: { isDark: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    let animId: number;

    const init = async (): Promise<(() => void) | void> => {
      const THREE = await import('three');
      const mount = mountRef.current;
      if (!mount) return;

      const W = mount.clientWidth;
      const H = mount.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
      camera.position.z = 5;

      const COUNT   = 300;
      const pos     = new Float32Array(COUNT * 3);
      const vel     = new Float32Array(COUNT * 3);
      const sizes   = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 18;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        vel[i * 3]     = (Math.random() - 0.5) * 0.0012;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0008;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.0006;
        sizes[i] = 0.5 + Math.random() * 1.5;
      }

      const geo = new THREE.BufferGeometry();
      const posAttr  = new THREE.BufferAttribute(pos,   3);
      const sizeAttr = new THREE.BufferAttribute(sizes, 1);
      posAttr.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute('position', posAttr);
      geo.setAttribute('size',     sizeAttr);

      // Use theme-appropriate particle color
      const particleColor = isDark ? 0x22c578 : 0x16a34a;

      const mat = new THREE.PointsMaterial({
        color:           particleColor,
        transparent:     true,
        opacity:         isDark ? 0.22 : 0.30,
        sizeAttenuation: true,
        size:            0.06,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', onResize);

      const HALF_W = 9, HALF_H = 5, HALF_D = 3;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        for (let i = 0; i < COUNT; i++) {
          pos[i * 3]     += vel[i * 3];
          pos[i * 3 + 1] += vel[i * 3 + 1];
          pos[i * 3 + 2] += vel[i * 3 + 2];
          if (pos[i * 3]     >  HALF_W) pos[i * 3]     = -HALF_W;
          if (pos[i * 3]     < -HALF_W) pos[i * 3]     =  HALF_W;
          if (pos[i * 3 + 1] >  HALF_H) pos[i * 3 + 1] = -HALF_H;
          if (pos[i * 3 + 1] < -HALF_H) pos[i * 3 + 1] =  HALF_H;
          if (pos[i * 3 + 2] >  HALF_D) pos[i * 3 + 2] = -HALF_D;
          if (pos[i * 3 + 2] < -HALF_D) pos[i * 3 + 2] =  HALF_D;
        }
        posAttr.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    };

    const cleanup = init();
    return () => { cleanup.then((fn) => fn?.()); };
  }, [isDark]); // re-mount when theme changes, same pattern as NeuralCanvas

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────
export default function FinalCTA() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (resolvedTheme ?? theme ?? 'dark') : 'dark';
  const isDark = currentTheme !== 'light';

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background — theme-aware */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #08090d 0%, #0d1f10 50%, #08090d 100%)'
            : 'linear-gradient(135deg, #f0f4f8 0%, #e4f0ea 50%, #f0f4f8 100%)',
        }}
      />

      {/* Particle field — re-mounts on theme change via isDark */}
      <ParticleField isDark={isDark} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] rounded-full blur-[90px]"
          style={{
            background: isDark
              ? 'rgba(34, 197, 120, 0.08)'
              : 'rgba(22, 163, 74, 0.10)',
          }}
        />
      </div>

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: isDark
            ? 'linear-gradient(to right, transparent, rgba(34,197,120,0.40), transparent)'
            : 'linear-gradient(to right, transparent, rgba(22,163,74,0.35), transparent)',
        }}
      />
      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: isDark
            ? 'linear-gradient(to right, transparent, rgba(34,197,120,0.20), transparent)'
            : 'linear-gradient(to right, transparent, rgba(22,163,74,0.18), transparent)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{
              background: isDark ? 'rgba(34,197,120,0.10)' : 'rgba(22,163,74,0.08)',
              borderColor: isDark ? 'rgba(34,197,120,0.20)' : 'rgba(22,163,74,0.25)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--green)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--green)' }}>
              Let's talk
            </span>
          </motion.div>

          {/* Headline */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Your Next System<br />
            <span className="gradient-text">Starts Here.</span>
          </h2>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            We scope, build, and run production-grade systems for engineering teams that can't afford downtime.
            Tell us what you're solving — we'll tell you exactly how we'd approach it.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg text-base text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, var(--green-dim), var(--green))',
                  boxShadow: isDark
                    ? '0 0 40px rgba(34,197,120,0.30)'
                    : '0 0 30px rgba(22,163,74,0.25), 0 2px 8px rgba(0,0,0,0.10)',
                }}
              >
                <Calendar size={18} />
                Schedule a Call
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg text-base transition-all border"
                style={{
                  color: 'var(--text-primary)',
                  borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                  background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = isDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.22)';
                  el.style.background   = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
                  el.style.background   = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
                }}
              >
                <Mail size={18} />
                Send a Brief
              </motion.button>
            </Link>
          </div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm"
            style={{ color: isDark ? 'rgb(75,85,99)' : 'rgb(148,163,184)' }}
          >
            {['NDA on request', 'Dedicated engineer from day one', 'No lock-in contracts'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--green)' }} />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}