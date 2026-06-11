'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Mail } from 'lucide-react';

// ── Particle field ─────────────────────────────────────────────────────────
function ParticleField() {
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

      // 300 slow-drifting particles
      const COUNT   = 300;
      const pos     = new Float32Array(COUNT * 3);
      const vel     = new Float32Array(COUNT * 3); // drift velocities
      const sizes   = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 18;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

        // Very slow random drift
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

      const mat = new THREE.PointsMaterial({
        color:       0x22c578,
        transparent: true,
        opacity:     0.22,
        sizeAttenuation: true,
        size:        0.06,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Resize
      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', onResize);

      const HALF_W = 9;
      const HALF_H = 5;
      const HALF_D = 3;

      const animate = () => {
        animId = requestAnimationFrame(animate);

        for (let i = 0; i < COUNT; i++) {
          pos[i * 3]     += vel[i * 3];
          pos[i * 3 + 1] += vel[i * 3 + 1];
          pos[i * 3 + 2] += vel[i * 3 + 2];

          // Wrap edges
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
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────
export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-edroyt-dark via-[#0d1f10] to-edroyt-dark" />

      {/* Three.js particle field — replaces the static blob */}
      <ParticleField />

      {/* Soft radial glow behind the content (lighter than before — particles carry the atmosphere) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-edroyt-green/8 rounded-full blur-[90px]" />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-edroyt-green/40 to-transparent" />
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-edroyt-green/20 to-transparent" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-edroyt-green/10 border border-edroyt-green/20 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-edroyt-green-accent animate-pulse" />
            <span className="text-sm text-edroyt-green-accent font-medium">Let's talk</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Next System<br />
            <span className="gradient-text">Starts Here.</span>
          </h2>

          {/* Subtext — specific and confident */}
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            We scope, build, and run production-grade systems for engineering teams that can't afford downtime.
            Tell us what you're solving — we'll tell you exactly how we'd approach it.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-edroyt-green hover:bg-edroyt-green-secondary text-white font-semibold rounded-lg shadow-2xl shadow-edroyt-green/30 transition-colors text-base"
              >
                <Calendar size={18} />
                Schedule a Call
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white font-medium rounded-lg transition-all text-base"
              >
                <Mail size={18} />
                Send a Brief
              </motion.button>
            </Link>
          </div>

          {/* Trust signals — enterprise-specific */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-edroyt-green" />
              NDA on request
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-edroyt-green" />
              Dedicated engineer from day one
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-edroyt-green" />
              No lock-in contracts
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}