"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// ── Types ──────────────────────────────────────────────────────────────────
interface TerminalLine {
  delay: number;
  type: "cmd" | "out";
  prompt?: string;
  text: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const WORDS = ["Build.", "Deploy.", "Scale.", "Innovate."];

const HERO_PILLS = [
  {
    label: "AI Automation",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-[11px] h-[11px]" style={{ color: "var(--green)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Cloud Infrastructure",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-[11px] h-[11px]" style={{ color: "var(--green)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    label: "Cyber Security",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-[11px] h-[11px]" style={{ color: "var(--green)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    label: "Custom Software",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-[11px] h-[11px]" style={{ color: "var(--green)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    label: "System Integration",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-[11px] h-[11px]" style={{ color: "var(--green)" }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const HERO_STATS = [
  { value: "500+", label: "Projects Shipped", accent: true },
  { value: "98%", label: "Client Retention", accent: false },
  { value: "150+", label: "Engineers", accent: false },
  { value: "12+", label: "Years in Tech", accent: false },
];

const TERMINAL_LINES: TerminalLine[] = [
  { delay: 300, type: "cmd", prompt: "$", text: "edroyt status --all" },
  { delay: 800, type: "out", text: "● System: <span style='color:var(--green)'>OPERATIONAL</span>" },
  { delay: 1100, type: "out", text: "● Uptime: <span style='color:var(--green)'>99.98%</span> (last 90 days)" },
  { delay: 1500, type: "cmd", prompt: "$", text: "deploy --project fincore-v3" },
  { delay: 2000, type: "out", text: "↳ Building image... <span style='color:var(--green)'>✓</span>" },
  { delay: 2300, type: "out", text: "↳ Running tests... <span style='color:var(--green)'>247/247 passed ✓</span>" },
  { delay: 2700, type: "out", text: "↳ Deploying to prod... <span style='color:var(--green)'>✓ Live in 4.2s</span>" },
  { delay: 3200, type: "cmd", prompt: "$", text: "analytics --client atpace" },
  { delay: 3700, type: "out", text: "↳ DAU: <span style='color:var(--green)'>+340%</span> since launch" },
  { delay: 4000, type: "out", text: "↳ Avg load time: <span style='color:var(--green)'>68ms</span>" },
  { delay: 4300, type: "out", text: "↳ Error rate: <span style='color:var(--green)'>0.001%</span>" },
];

// ── Three.js color palettes per theme ─────────────────────────────────────
const THEME_COLORS = {
  dark: {
    bg: 0x08090d,
    nodeBase: 0x22c578,
    nodeMid: 0x0d7040,
    nodeDim: 0x083d24,
    nodeAccent: 0x6eefb4,
    edgeColor: 0x22c578,
    dustColor: 0x0d7040,
    bright: 0xaaffdd,
  },
  light: {
    bg: 0xf0f4f8,
    nodeBase: 0x16a34a,
    nodeMid: 0x15803d,
    nodeDim: 0xbbf7d0,
    nodeAccent: 0x4ade80,
    edgeColor: 0x16a34a,
    dustColor: 0x86efac,
    bright: 0x166534,
  },
};

// ── Neural Network Canvas ──────────────────────────────────────────────────
function NeuralCanvas({ theme }: { theme: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") return;

    let animFrameId: number;
    let intervalIds: ReturnType<typeof setInterval>[] = [];

    const colors = theme === "light" ? THEME_COLORS.light : THEME_COLORS.dark;

    const loadThree = async () => {
      const THREE = await import("three");
      const mount = mountRef.current;
      if (!mount) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(colors.bg, 1);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 500);
      camera.position.set(0, 0, 22);

      const NODE_COUNT = 85, SX = 18, SY = 10, SZ = 6, CDIST = 5.5;

      const nodes: {
        mesh: any;
        vel: any;
        baseHex: number;
        pulseT: number;
        isPulsing: boolean;
      }[] = [];

      const gS = new THREE.SphereGeometry(0.09, 8, 8);
      const gL = new THREE.SphereGeometry(0.16, 8, 8);

      for (let i = 0; i < NODE_COUNT; i++) {
        const isHub = i < 10;
        const hex = isHub ? colors.nodeBase : i % 3 === 0 ? colors.nodeMid : colors.nodeDim;
        const m = new THREE.MeshBasicMaterial({ color: hex });
        const mesh = new THREE.Mesh(isHub ? gL : gS, m);
        const p = new THREE.Vector3(
          (Math.random() - 0.5) * SX * 2,
          (Math.random() - 0.5) * SY * 2,
          (Math.random() - 0.5) * SZ * 2
        );
        mesh.position.copy(p);
        scene.add(mesh);
        nodes.push({
          mesh,
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.004,
            (Math.random() - 0.5) * 0.004,
            (Math.random() - 0.5) * 0.002
          ),
          baseHex: hex,
          pulseT: 0,
          isPulsing: false,
        });
      }

      const MAX_E = 400;
      const eArr = new Float32Array(MAX_E * 2 * 3);
      const eGeo = new THREE.BufferGeometry();
      eGeo.setAttribute("position", new THREE.BufferAttribute(eArr, 3));
      const eLines = new THREE.LineSegments(
        eGeo,
        new THREE.LineBasicMaterial({ color: colors.edgeColor, transparent: true, opacity: theme === "light" ? 0.15 : 0.1 })
      );
      scene.add(eLines);

      const adj: [number, number][] = [];

      function rebuildEdges() {
        adj.length = 0;
        let ec = 0;
        for (let i = 0; i < NODE_COUNT && ec < MAX_E; i++) {
          for (let j = i + 1; j < NODE_COUNT && ec < MAX_E; j++) {
            const d = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
            if (d < CDIST) {
              const b = ec * 6;
              const pi = nodes[i].mesh.position;
              const pj = nodes[j].mesh.position;
              eArr[b] = pi.x; eArr[b + 1] = pi.y; eArr[b + 2] = pi.z;
              eArr[b + 3] = pj.x; eArr[b + 4] = pj.y; eArr[b + 5] = pj.z;
              adj.push([i, j]);
              ec++;
            }
          }
        }
        for (let k = ec * 6; k < MAX_E * 6; k++) eArr[k] = 0;
        eGeo.attributes.position.needsUpdate = true;
        eGeo.setDrawRange(0, ec * 2);
      }

      const pGeo = new THREE.SphereGeometry(0.065, 6, 6);
      const packets: { t: number; speed: number; fi: number; ti: number; mesh: any }[] = [];
      const MAX_P = 15;

      function spawnPacket() {
        if (packets.length >= MAX_P || adj.length === 0) return;
        const [fi, ti] = adj[Math.floor(Math.random() * adj.length)];
        const dot = new THREE.Mesh(pGeo, new THREE.MeshBasicMaterial({ color: colors.nodeAccent }));
        dot.position.copy(nodes[fi].mesh.position);
        scene.add(dot);
        packets.push({ t: 0, speed: 0.008 + Math.random() * 0.012, fi, ti, mesh: dot });
      }

      const spawnId = setInterval(spawnPacket, 200);
      intervalIds.push(spawnId);

      const halos: { mesh: any; ni: number }[] = [];
      const hGeo = new THREE.RingGeometry(0.22, 0.30, 32);
      for (let i = 0; i < 6; i++) {
        const h = new THREE.Mesh(
          hGeo,
          new THREE.MeshBasicMaterial({ color: colors.nodeBase, transparent: true, opacity: 0.1, side: THREE.DoubleSide })
        );
        h.position.copy(nodes[i].mesh.position);
        scene.add(h);
        halos.push({ mesh: h, ni: i });
      }

      const dPos = new Float32Array(300 * 3);
      for (let i = 0; i < 300; i++) {
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(2 * Math.random() - 1);
        const r = 8 + Math.random() * 6;
        dPos[i * 3] = r * Math.sin(p) * Math.cos(t);
        dPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        dPos[i * 3 + 2] = r * Math.cos(p);
      }
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
      scene.add(new THREE.Points(dGeo, new THREE.PointsMaterial({
        color: colors.dustColor,
        size: 0.06,
        transparent: true,
        opacity: theme === "light" ? 0.35 : 0.2
      })));

      const pulseId = setInterval(() => {
        const n = nodes[Math.floor(Math.random() * NODE_COUNT)];
        n.isPulsing = true;
        n.pulseT = 0;
      }, 280);
      intervalIds.push(pulseId);

      const bright = new THREE.Color(colors.bright);
      const clock = new THREE.Clock();
      let fc = 0;

      function animate() {
        animFrameId = requestAnimationFrame(animate);
        const e = clock.getElapsedTime();
        fc++;

        nodes.forEach((n) => {
          n.mesh.position.add(n.vel);
          const p = n.mesh.position;
          if (Math.abs(p.x) > SX) n.vel.x *= -1;
          if (Math.abs(p.y) > SY) n.vel.y *= -1;
          if (Math.abs(p.z) > SZ) n.vel.z *= -1;
        });

        if (fc % 3 === 0) rebuildEdges();

        camera.position.x = Math.sin(e * 0.06) * 1.5;
        camera.position.y = Math.cos(e * 0.04) * 0.8;
        camera.lookAt(0, 0, 0);

        nodes.forEach((n) => {
          if (!n.isPulsing) return;
          n.pulseT += 0.045;
          const g = Math.sin(n.pulseT * Math.PI);
          if (n.mesh.material) {
            (n.mesh.material as any).color.setHex(colors.nodeBase);
            (n.mesh.material as any).color.lerp(bright, g * 0.9);
            n.mesh.scale.setScalar(1 + g * 2.2);
          }
          if (n.pulseT >= 1) {
            n.isPulsing = false;
            if (n.mesh.material) (n.mesh.material as any).color.setHex(n.baseHex);
            n.mesh.scale.setScalar(1);
          }
        });

        halos.forEach(({ mesh: h, ni }, idx) => {
          h.position.copy(nodes[ni].mesh.position);
          h.rotation.z = e * 0.4 + idx;
          if (h.material) (h.material as any).opacity = 0.05 + Math.sin(e * 1.4 + idx * 1.1) * 0.05;
        });

        for (let i = packets.length - 1; i >= 0; i--) {
          const pk = packets[i];
          pk.t += pk.speed;
          pk.mesh.position.lerpVectors(nodes[pk.fi].mesh.position, nodes[pk.ti].mesh.position, pk.t);
          if (pk.mesh.material) {
            const a = pk.t > 0.75 ? 1 - (pk.t - 0.75) / 0.25 : 1;
            (pk.mesh.material as any).opacity = a;
            (pk.mesh.material as any).transparent = true;
          }
          if (pk.t >= 1) {
            scene.remove(pk.mesh);
            nodes[pk.ti].isPulsing = true;
            nodes[pk.ti].pulseT = 0;
            packets.splice(i, 1);
          }
        }

        renderer.render(scene, camera);
      }

      animate();

      const handleResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(animFrameId);
        intervalIds.forEach(clearInterval);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    };

    const cleanup = loadThree();
    return () => {
      cleanup.then((fn) => fn?.());
    };
    // Re-mount canvas when theme changes
  }, [theme]);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}

// ── Terminal ───────────────────────────────────────────────────────────────
function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme !== "light";

  const renderLines = () => {
    const body = bodyRef.current;
    if (!body) return;
    body.innerHTML = "";

    TERMINAL_LINES.forEach((line) => {
      setTimeout(() => {
        if (!bodyRef.current) return;
        const div = document.createElement("div");
        div.style.cssText =
          "display:flex;gap:10px;align-items:baseline;opacity:0;animation:fadeInLine 0.3s forwards;font-family:Courier New,monospace;font-size:0.82rem;line-height:1.8;";
        if (line.type === "cmd") {
          div.innerHTML = `<span style="color:var(--green);flex-shrink:0">${line.prompt}</span><span style="color:var(--text-primary)">${line.text}</span>`;
        } else {
          div.innerHTML = `<span style="color:var(--text-secondary)">${line.text}</span>`;
        }
        bodyRef.current!.appendChild(div);
        bodyRef.current!.scrollTop = bodyRef.current!.scrollHeight;
      }, line.delay);
    });
  };

  useEffect(() => {
    if (!document.getElementById("terminal-keyframe")) {
      const style = document.createElement("style");
      style.id = "terminal-keyframe";
      style.textContent = `@keyframes fadeInLine { to { opacity: 1; } }`;
      document.head.appendChild(style);
    }
    renderLines();
    const id = setInterval(() => renderLines(), 6500);
    return () => clearInterval(id);
  }, []);

  // Re-render lines on theme change so inline colors update
  useEffect(() => {
    renderLines();
  }, [theme]);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-green)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: isDark
          ? "0 0 60px rgba(34,197,120,.06)"
          : "0 0 60px rgba(22,163,74,.08), 0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "var(--bg-secondary)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: 8, fontFamily: "monospace" }}>
          edroyt — live-metrics.sh
        </span>
      </div>
      {/* Body */}
      <div ref={bodyRef} style={{ padding: "22px 20px", minHeight: 280 }} />
    </div>
  );
}

// ── Main Hero Component ────────────────────────────────────────────────────
export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [nodeCount, setNodeCount] = useState(4829);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid SSR mismatch
  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (resolvedTheme ?? theme ?? "dark") : "dark";
  const isDark = currentTheme !== "light";

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setNodeCount((n) => n + Math.floor(Math.random() * 5 - 1)),
      1500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ── Global styles ─────────────────────────────── */}
      <style>{`
        @keyframes ping {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.4; transform:scale(1.4); }
        }
        @keyframes bounce {
          from { transform: translateX(-50%) translateY(0); }
          to { transform: translateX(-50%) translateY(6px); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-inner { animation: ticker 30s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }
        .tech-ticker-inner { animation: ticker 25s linear infinite reverse; }
      `}</style>

      {/* ── Hero Section ──────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          background: "var(--bg-primary)",
        }}
      >
        {/* Neural Canvas — re-mounts on theme change via key prop */}
        <NeuralCanvas theme={currentTheme} />

        {/* Overlay — lighter in light mode */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: isDark
              ? "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(8,9,13,.5) 0%, rgba(8,9,13,.72) 55%, rgba(8,9,13,.96) 100%)"
              : "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(240,244,248,.3) 0%, rgba(240,244,248,.65) 55%, rgba(240,244,248,.97) 100%)",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, padding: "120px 20px 80px", maxWidth: 700, margin: "0 auto" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid var(--border-green)",
              background: isDark ? "rgba(34,197,120,.06)" : "rgba(22,163,74,.08)",
              padding: "7px 18px",
              borderRadius: 100,
              marginBottom: 28,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--green)",
                animation: "ping 1.6s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--green)",
              }}
            >
              {nodeCount.toLocaleString()} nodes active globally
            </span>
          </div>

          {/* Eyebrow */}
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 12,
            }}
          >
            Enterprise Technology Partner
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.03,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              color: "var(--text-primary)",
            }}
          >
            <span>We&nbsp;</span>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                height: "1.1em",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  transform: `translateY(-${wordIndex * 1.1}em)`,
                  transition: "transform 0.55s cubic-bezier(.22,1,.36,1)",
                }}
              >
                {WORDS.map((word) => (
                  <span
                    key={word}
                    style={{
                      background: "linear-gradient(135deg, var(--green), var(--green-light))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "block",
                      lineHeight: 1.1,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </span>
            <br />
            <span>Your Business.</span>
          </h1>

          {/* Sub */}
          <p
            style={{
              maxWidth: 480,
              margin: "0 auto 36px",
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.75,
            }}
          >
            From intelligent automation to enterprise cloud infrastructure — we engineer software that eliminates
            bottlenecks, accelerates delivery, and compounds value over time.
          </p>

          {/* Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {HERO_PILLS.map((pill) => (
              <div
                key={pill.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "1px solid var(--border-subtle)",
                  background: isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)",
                  padding: "6px 14px",
                  borderRadius: 100,
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  cursor: "default",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-green)";
                  el.style.background = isDark ? "rgba(34,197,120,.06)" : "rgba(22,163,74,.06)";
                  el.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-subtle)";
                  el.style.background = isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)";
                  el.style.color = "var(--text-secondary)";
                }}
              >
                {pill.icon}
                {pill.label}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 56 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, var(--green-dim), var(--green))",
                color: "#fff",
                border: "none",
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .2s",
                boxShadow: `0 0 40px var(--green-glow), 0 2px 8px rgba(0,0,0,.4)`,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 60px var(--green-glow-strong)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px var(--green-glow), 0 2px 8px rgba(0,0,0,.4)`;
              }}
            >
              Start Building
              <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all .2s",
                backdropFilter: "blur(8px)",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-green)";
                (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(34,197,120,.05)" : "rgba(22,163,74,.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              View Our Work
              <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 36,
              borderTop: "1px solid var(--border-subtle)",
              paddingTop: 32,
            }}
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    ...(stat.accent
                      ? {
                          background: "linear-gradient(135deg, var(--green), var(--green-light))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : { color: "var(--text-primary)" }),
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            animation: "bounce 0.9s ease-in-out infinite alternate",
          }}
        >
          <svg
            width={18} height={18}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ color: "var(--text-muted)", opacity: 0.5 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Ticker ────────────────────────────────────── */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-secondary)",
          padding: "14px 0",
        }}
      >
        <div className="ticker-inner" style={{ display: "flex", gap: 60, width: "max-content" }}>
          {[...Array(2)].flatMap((_, i) =>
            [
              "AI Automation", "Cloud Native", "Full Stack Development", "DevOps & CI/CD",
              "System Integration", "Cyber Security", "Data Engineering", "Mobile Applications",
              "Digital Transformation",
            ].map((item) => (
              <div
                key={`${i}-${item}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
                {item}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Tech Ticker ───────────────────────────────── */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-secondary)",
          padding: "12px 0",
        }}
      >
        <div className="tech-ticker-inner" style={{ display: "flex", gap: 48, width: "max-content" }}>
          {[...Array(2)].flatMap((_, i) =>
            ["React", "Next.js", "Node.js", "TypeScript", "Python", "Django", "PostgreSQL",
              "Docker", "Prisma", "Redis", "AWS", "GraphQL", "Kubernetes", "Tailwind"].map((tech) => (
              <div
                key={`${i}-${tech}`}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ display: "inline-block", width: 20, height: 1, background: "var(--green)", opacity: 0.4 }} />
                {tech}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Terminal Section ──────────────────────────── */}
      <section
        id="terminal-section"
        style={{ background: "var(--bg-secondary)", padding: "80px 40px" }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <Terminal />

          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 16,
                color: "var(--text-primary)",
              }}
            >
              Real Results,<br />Real Time.
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 28 }}>
              We don't just ship code — we track, measure, and iterate. Every project comes with live dashboards,
              automated alerts, and a team that cares about your numbers as much as you do.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { label: "Live Dashboards" },
                { label: "Auto Alerts" },
                { label: "99.9% Uptime" },
                { label: "Instant Deploys" },
              ].map((chip) => (
                <div
                  key={chip.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-card)",
                    padding: "8px 14px",
                    borderRadius: 8,
                    fontSize: "0.78rem",
                    color: "var(--text-secondary)",
                    transition: "all .2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-green)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}