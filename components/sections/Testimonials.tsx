'use client';

import { useEffect, useRef, useState } from 'react';
import type * as THREE_TYPES from 'three';

interface DeployEvent {
  id: number; project: string; client: string; city: string;
  lat: number; lon: number; status: 'live' | 'deploying'; time: string;
}
interface Vec3 { x: number; y: number; z: number; }
interface ArcObject { line: THREE_TYPES.Line; pts: THREE_TYPES.Vector3[]; mat: THREE_TYPES.LineBasicMaterial; }
interface Packet { t: number; speed: number; arc: ArcObject; mesh: THREE_TYPES.Mesh; }
interface GlobeCanvasProps { activeIndex: number; onNodeClick: (index: number) => void; }
interface DeployCardProps { event: DeployEvent; isActive: boolean; onClick: () => void; }
interface StatItem { label: string; value: string; }

const DEPLOY_EVENTS: DeployEvent[] = [
  {
    id: 1,
    project: 'Seize The Ads',
    client: 'Seize The Ads',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'live',
    time: '2s ago',
  },
  {
    id: 2,
    project: 'MyWork Platform',
    client: 'MyWork',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'live',
    time: '18s ago',
  },
  {
    id: 3,
    project: 'Atpace — Grow Atpace',
    client: 'Atpace',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'deploying',
    time: '34s ago',
  },
  {
    id: 4,
    project: 'Sell It — Selling Made Simple',
    client: 'Sell It',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'live',
    time: '1m ago',
  },
  {
    id: 5,
    project: 'mEinstein',
    client: 'mEinstein',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'live',
    time: '2m ago',
  },
  {
    id: 6,
    project: 'Kalkii Fresh',
    client: 'Kalkii Fresh',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'live',
    time: '4m ago',
  },
  {
    id: 7,
    project: 'Niramaya Health',
    client: 'Niramaya Health',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'live',
    time: '6m ago',
  },
  {
    id: 8,
    project: 'Crack Detection System',
    client: 'Infrastructure Client',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'deploying',
    time: '8m ago',
  },
  {
    id: 9,
    project: 'Smart DVR',
    client: 'Smart DVR',
    city: 'Indore',
    lat: 22.7196,
    lon: 75.8577,
    status: 'live',
    time: '10m ago',
  },
];

const ARCS: [number, number][] = [
  [0,1],[1,4],[4,2],[2,6],[6,5],[3,4],[7,0],[1,7],[7,2],[5,3],
];

const GLOBAL_STATS: StatItem[] = [
  { value:'9+',     label:'Products Live'      },
  { value:'99.98%', label:'Uptime'             },
  { value:'4.1s',   label:'Avg Deploy Time'    },
  { value:'1,200+', label:'Deploys This Month' },
];

// Approximate India border coordinates [lat, lon]
const INDIA_OUTLINE: [number, number][] = [
  [23.6,68.1],[24.3,68.7],[23.0,68.4],[22.0,68.9],[21.0,69.8],[22.5,70.5],[21.6,72.2],
  [20.6,72.9],[19.9,73.0],[17.4,73.2],[15.7,73.7],[14.8,74.0],[13.3,74.7],[11.9,75.4],
  [10.8,76.3],[8.5,77.0],[8.1,77.5],[8.3,78.1],[9.1,79.2],[10.3,79.9],[11.1,79.8],
  [11.5,79.8],[12.5,80.2],[13.6,80.2],[13.1,80.1],[14.7,80.2],[15.8,80.7],
  [17.0,82.3],[18.2,83.4],[18.9,84.0],[19.8,85.0],[20.5,85.8],[21.4,86.7],[22.2,87.2],
  [21.6,87.8],[22.5,88.4],[22.4,88.7],[23.0,89.1],[22.4,89.8],[22.7,90.3],[22.2,91.0],
  [23.6,91.4],[24.1,92.2],[23.6,92.9],[25.0,93.3],[27.0,95.0],[28.2,97.3],[27.5,97.7],
  [27.0,95.0],[28.0,94.0],[29.0,93.0],[28.3,92.0],[27.8,91.7],[27.5,91.5],[27.0,90.0],
  [27.3,89.6],[27.9,88.8],[28.2,88.2],[28.0,87.0],[30.0,81.5],[30.4,79.5],[31.5,77.5],
  [32.0,76.5],[32.7,74.6],[33.1,73.7],[34.0,72.4],[35.0,70.9],[36.0,70.0],[35.5,69.5],
  [34.8,69.2],[34.1,69.2],[33.5,70.5],[32.5,71.0],[31.5,70.9],[30.5,70.6],[29.9,70.1],
  [28.5,70.6],[27.4,70.3],[26.5,70.0],[25.0,70.0],[23.6,68.1],
];

function latLonToVec3(lat: number, lon: number, radius: number): Vec3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y:  radius * Math.cos(phi),
    z:  radius * Math.sin(phi) * Math.sin(theta),
  };
}

function GlobeCanvas({ activeIndex, onNodeClick }: GlobeCanvasProps) {
  const mountRef  = useRef<HTMLDivElement>(null);
  const activeRef = useRef<number>(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;
    let animId: number;
    const intervalIds: ReturnType<typeof setInterval>[] = [];

    const init = async (): Promise<(() => void) | void> => {
      const THREE = await import('three');
      const mount = mountRef.current;
      if (!mount) return;

      const W = mount.clientWidth, H = mount.clientHeight;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 500);
      camera.position.set(0, 0, 4.2);

      const R = 1.5, C_GREEN = 0x22c578, C_DIM = 0x0d7040;

      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(R, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x080c10, transparent: true, opacity: 0.92 }),
      ));

      const gridGroup = new THREE.Group();
      const lineMat   = new THREE.LineBasicMaterial({ color: C_DIM, transparent: true, opacity: 0.13 });
      for (let lat = -75; lat <= 75; lat += 15) {
        const pts: THREE_TYPES.Vector3[] = [];
        for (let lon = 0; lon <= 360; lon += 3) {
          const v = latLonToVec3(lat, lon - 180, R + 0.002);
          pts.push(new THREE.Vector3(v.x, v.y, v.z));
        }
        gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
      }
      for (let lon = 0; lon < 360; lon += 15) {
        const pts: THREE_TYPES.Vector3[] = [];
        for (let lat = -90; lat <= 90; lat += 3) {
          const v = latLonToVec3(lat, lon - 180, R + 0.002);
          pts.push(new THREE.Vector3(v.x, v.y, v.z));
        }
        gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
      }
      scene.add(gridGroup);

      scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.08, 32, 32), new THREE.MeshBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0.032, side: THREE.BackSide })));
      scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.18, 32, 32), new THREE.MeshBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0.012, side: THREE.BackSide })));

      // Stars
      const starPos = new Float32Array(600 * 3);
      for (let i = 0; i < 600; i++) {
        const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1), r = 3.5 + Math.random() * 5;
        starPos[i * 3] = r * Math.sin(p) * Math.cos(t);
        starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        starPos[i * 3 + 2] = r * Math.cos(p);
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x1a3a26, size: 0.018, transparent: true, opacity: 0.6 })));

      // ── India border outline ──────────────────────────────────────────────
      const indiaLineMat = new THREE.LineBasicMaterial({ color: 0x22c578, transparent: true, opacity: 0.55 });
      const indiaPts = INDIA_OUTLINE.map(([lat, lon]) => {
        const v = latLonToVec3(lat, lon, R + 0.004);
        return new THREE.Vector3(v.x, v.y, v.z);
      });
      const indiaLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(indiaPts), indiaLineMat);
      scene.add(indiaLine);

      // Nodes
      const nodeMeshes: THREE_TYPES.Mesh[] = [];
      const ringMeshes: THREE_TYPES.Mesh[] = [];
      const nodeGeo = new THREE.SphereGeometry(0.035, 10, 10);
      const ringGeo = new THREE.RingGeometry(0.052, 0.068, 32);

      DEPLOY_EVENTS.forEach((ev, i) => {
        const pos = latLonToVec3(ev.lat, ev.lon, R + 0.012);
        const v3  = new THREE.Vector3(pos.x, pos.y, pos.z);
        const mesh = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: C_GREEN }));
        mesh.position.copy(v3); mesh.userData = { index: i };
        scene.add(mesh); nodeMeshes.push(mesh);
        const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0.3, side: THREE.DoubleSide }));
        ring.position.copy(v3); ring.lookAt(0, 0, 0);
        scene.add(ring); ringMeshes.push(ring);
      });

      // Arcs
      function buildArc(p1: Vec3, p2: Vec3, segments = 60): THREE_TYPES.Vector3[] {
        const v1 = new THREE.Vector3(p1.x, p1.y, p1.z).normalize();
        const v2 = new THREE.Vector3(p2.x, p2.y, p2.z).normalize();
        const pts: THREE_TYPES.Vector3[] = [];
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const arc = new THREE.Vector3().lerpVectors(v1, v2, t).normalize();
          arc.multiplyScalar(R + 0.015 + Math.sin(t * Math.PI) * 0.45);
          pts.push(arc);
        }
        return pts;
      }

      const arcObjects: ArcObject[] = [];
      ARCS.forEach(([ai, bi]) => {
        const pa = latLonToVec3(DEPLOY_EVENTS[ai].lat, DEPLOY_EVENTS[ai].lon, R);
        const pb = latLonToVec3(DEPLOY_EVENTS[bi].lat, DEPLOY_EVENTS[bi].lon, R);
        const pts = buildArc(pa, pb);
        const mat = new THREE.LineBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0.18 });
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
        scene.add(line); arcObjects.push({ line, pts, mat });
      });

      // Packets
      const packetGeo = new THREE.SphereGeometry(0.022, 6, 6);
      const packets: Packet[] = [];
      function spawnPacket() {
        if (packets.length >= 8) return;
        const arc = arcObjects[Math.floor(Math.random() * arcObjects.length)];
        const mesh = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: 0x6eefb4, transparent: true }));
        scene.add(mesh); packets.push({ t: 0, speed: 0.006 + Math.random() * 0.006, arc, mesh });
      }
      intervalIds.push(setInterval(spawnPacket, 400));

      // Drag — default rotation centered on India
      let isDragging = false, prevX = 0, prevY = 0, autoSpin = true;
      let rotY = -1.35; // longitude offset to center India
      let rotX = -0.22; // slight tilt to show subcontinent

      const onMouseDown = (e: MouseEvent) => { isDragging = true; autoSpin = false; prevX = e.clientX; prevY = e.clientY; };
      const onMouseMove = (e: MouseEvent) => { if (!isDragging) return; rotY += (e.clientX - prevX) * 0.004; rotX += (e.clientY - prevY) * 0.004; prevX = e.clientX; prevY = e.clientY; };
      const onMouseUp   = () => { isDragging = false; };
      renderer.domElement.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      let lastTX = 0, lastTY = 0;
      renderer.domElement.addEventListener('touchstart', (e: TouchEvent) => { autoSpin = false; lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY; });
      renderer.domElement.addEventListener('touchmove', (e: TouchEvent) => { rotY += (e.touches[0].clientX - lastTX) * 0.004; rotX += (e.touches[0].clientY - lastTY) * 0.004; lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY; });

      const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
      renderer.domElement.addEventListener('click', (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(nodeMeshes);
        if (hits.length > 0) onNodeClick(hits[0].object.userData.index as number);
      });

      const onResize = () => { camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); };
      window.addEventListener('resize', onResize);

      let elapsed = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        elapsed += 0.008;
        if (autoSpin) rotY += 0.0012; // slower spin so India stays in view longer

        const globeMesh = scene.children[0] as THREE_TYPES.Mesh;
        globeMesh.rotation.y = rotY; globeMesh.rotation.x = rotX;
        gridGroup.rotation.y = rotY; gridGroup.rotation.x = rotX;

        const euler = new THREE.Euler(rotX, rotY, 0);

        // Animate India border with rotation + pulsing opacity
        const indiaNewPts = INDIA_OUTLINE.map(([lat, lon]) => {
          const v = latLonToVec3(lat, lon, R + 0.004);
          return new THREE.Vector3(v.x, v.y, v.z).applyEuler(euler);
        });
        indiaLine.geometry.setFromPoints(indiaNewPts);
        (indiaLine.geometry.attributes.position as THREE_TYPES.BufferAttribute).needsUpdate = true;
        indiaLineMat.opacity = 0.35 + Math.sin(elapsed * 1.2) * 0.2;

        nodeMeshes.forEach((m, i) => {
          const base = latLonToVec3(DEPLOY_EVENTS[i].lat, DEPLOY_EVENTS[i].lon, R + 0.012);
          m.position.copy(new THREE.Vector3(base.x, base.y, base.z).applyEuler(euler));
          const isActive = activeRef.current === i, pulse = Math.sin(elapsed * 3 + i) * 0.5 + 0.5;
          m.scale.setScalar(isActive ? 1.6 + pulse * 0.4 : 1 + pulse * 0.15);
          (m.material as THREE_TYPES.MeshBasicMaterial).color.setHex(isActive ? 0x6eefb4 : C_GREEN);
          const rv = new THREE.Vector3(base.x, base.y, base.z).applyEuler(euler);
          ringMeshes[i].position.copy(rv); ringMeshes[i].lookAt(camera.position);
          (ringMeshes[i].material as THREE_TYPES.MeshBasicMaterial).opacity = isActive ? 0.5 + pulse * 0.3 : 0.15 + pulse * 0.08;
          ringMeshes[i].scale.setScalar(isActive ? 1.5 + pulse * 0.5 : 1 + pulse * 0.1);
        });

        arcObjects.forEach(({ line, pts, mat }, ai) => {
          line.geometry.setFromPoints(pts.map((p) => p.clone().applyEuler(euler)));
          (line.geometry.attributes.position as THREE_TYPES.BufferAttribute).needsUpdate = true;
          mat.opacity = 0.12 + Math.sin(elapsed * 0.8 + ai) * 0.06;
        });

        for (let i = packets.length - 1; i >= 0; i--) {
          const pk = packets[i]; pk.t += pk.speed;
          const idx = Math.min(Math.floor(pk.t * pk.arc.pts.length), pk.arc.pts.length - 1);
          pk.mesh.position.copy(pk.arc.pts[idx].clone().applyEuler(euler));
          const a = pk.t > 0.8 ? 1 - (pk.t - 0.8) / 0.2 : Math.min(pk.t / 0.1, 1);
          (pk.mesh.material as THREE_TYPES.MeshBasicMaterial).opacity = a * 0.9;
          if (pk.t >= 1) { scene.remove(pk.mesh); packets.splice(i, 1); }
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId); intervalIds.forEach(clearInterval);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    };

    const cleanup = init();
    return () => { cleanup.then((fn) => fn?.()); };
  }, [onNodeClick]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />;
}

function DeployCard({ event, isActive, onClick }: DeployCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '12px 14px', borderRadius: 10, cursor: 'pointer', transition: 'all .2s',
        border: isActive ? '1px solid rgba(34,197,120,.45)' : '1px solid rgba(255,255,255,.06)',
        background: isActive ? 'rgba(34,197,120,.07)' : 'rgba(255,255,255,.02)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: event.status === 'live' ? '#22c578' : '#ffbd2e' }} />
        {event.status === 'live' && (
          <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(34,197,120,.4)', animation: 'pingRing 1.8s ease-in-out infinite' }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isActive ? '#fff' : '#cbd5e1' }}>{event.project}</span>
          <span style={{ fontSize: '0.65rem', color: '#4a5568', flexShrink: 0, marginLeft: 8 }}>{event.time}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: '0.68rem', color: '#4a5568' }}>{event.client}</span>
          <span style={{ fontSize: '0.68rem', color: '#22c578' }}>📍 {event.city}</span>
        </div>
      </div>
    </div>
  );
}

export default function GlobalDeploySection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [deployCount, setDeployCount] = useState<number>(1247);

  useEffect(() => {
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % DEPLOY_EVENTS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setDeployCount((n) => n + Math.floor(Math.random() * 3)), 3200);
    return () => clearInterval(id);
  }, []);

  const active = DEPLOY_EVENTS[activeIndex];

  return (
    <section style={{ background: '#08090d', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes pingRing {
          0%   { opacity:.7; transform:scale(1);   }
          100% { opacity:0;  transform:scale(2.4); }
        }
        @keyframes fadeSlide {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0);   }
        }
        .gds-grid { display:grid; grid-template-columns:280px 1fr 280px; gap:28px; align-items:center; }
        .gds-globe-wrap { position:relative; aspect-ratio:1/1; max-height:520px; }
        .gds-stats-bar { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-top:56px; background:rgba(255,255,255,.04); border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,.06); }
        .gds-stat-cell { padding:28px 24px; text-align:center; background:#0d0f15; transition:background .2s; }
        .gds-right-panel { display:flex; flex-direction:column; gap:8px; }
        @media(max-width:1024px){
          .gds-grid{grid-template-columns:1fr;gap:24px;}
          .gds-globe-wrap{max-height:380px;width:100%;}
          .gds-right-panel{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
          .gds-infra-block{grid-column:1/-1;}
        }
        @media(max-width:640px){
          .gds-globe-wrap{max-height:300px;}
          .gds-stats-bar{grid-template-columns:repeat(2,1fr);}
          .gds-stat-cell{padding:20px 16px;}
          .gds-right-panel{grid-template-columns:1fr;}
          .gds-infra-block{grid-column:unset;}
        }
      `}</style>

      <div style={{ position:'absolute',top:'10%',left:'5%',width:500,height:500,background:'radial-gradient(circle,rgba(34,197,120,.055) 0%,transparent 70%)',pointerEvents:'none' }} />
      <div style={{ position:'absolute',bottom:'5%',right:'5%',width:400,height:400,background:'radial-gradient(circle,rgba(34,197,120,.04) 0%,transparent 70%)',pointerEvents:'none' }} />

      <div style={{ maxWidth:1260,margin:'0 auto',padding:'0 24px' }}>

<div style={{ textAlign:'center',marginBottom:64 }}>
  <span style={{ display:'inline-flex',alignItems:'center',gap:8,fontSize:'.7rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'#22c578',marginBottom:16 }}>
    <span style={{ display:'inline-block',width:6,height:6,borderRadius:'50%',background:'#22c578',animation:'pingRing 1.6s ease-in-out infinite' }} />
    Trusted Digital Partner
  </span>

  <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:700,color:'#fff',letterSpacing:'-.02em',lineHeight:1.1,marginBottom:16 }}>
    Transforming Ideas Into{' '}
    <span style={{ background:'linear-gradient(135deg,#22c578,#7fffc4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
      Scalable Digital Products
    </span>
  </h2>

  <p style={{ color:'#8a9bb0',fontSize:'1rem',lineHeight:1.7,maxWidth:520,margin:'0 auto' }}>
    From startups to enterprises, we design, develop, and deliver modern web and mobile solutions that drive growth, improve efficiency, and create lasting business impact.
  </p>
</div>

        <div className="gds-grid">

          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            <p style={{ fontSize:'.65rem',fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'#4a5568',marginBottom:8 }}>Recent Deployments</p>
            {DEPLOY_EVENTS.slice(0,4).map((ev,i) => (
              <DeployCard key={ev.id} event={ev} isActive={activeIndex===i} onClick={() => setActiveIndex(i)} />
            ))}
          </div>

          <div className="gds-globe-wrap">
            <GlobeCanvas activeIndex={activeIndex} onNodeClick={setActiveIndex} />
            <div
              key={activeIndex}
              style={{ position:'absolute',bottom:20,left:'50%',transform:'translateX(-50%)',background:'rgba(8,9,13,.88)',border:'1px solid rgba(34,197,120,.3)',borderRadius:10,padding:'10px 18px',backdropFilter:'blur(12px)',whiteSpace:'nowrap',animation:'fadeSlide .35s ease forwards',zIndex:10 }}
            >
              <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                <div style={{ width:7,height:7,borderRadius:'50%',background:active.status==='live'?'#22c578':'#ffbd2e',flexShrink:0 }} />
                <span style={{ fontSize:'.8rem',fontWeight:600,color:'#fff' }}>{active.project}</span>
                <span style={{ fontSize:'.72rem',color:'#22c578',fontWeight:500 }}>{active.city}</span>
                <span style={{ fontSize:'.65rem',color:'#4a5568',border:'1px solid rgba(255,255,255,.08)',padding:'2px 8px',borderRadius:100 }}>
                  {active.status==='live'?'● LIVE':'⟳ DEPLOYING'}
                </span>
              </div>
            </div>
            <div style={{ position:'absolute',top:16,left:'50%',transform:'translateX(-50%)',background:'rgba(8,9,13,.75)',border:'1px solid rgba(34,197,120,.18)',borderRadius:100,padding:'5px 16px',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',gap:8,zIndex:10 }}>
              <div style={{ width:6,height:6,borderRadius:'50%',background:'#22c578',animation:'pingRing 1.4s ease-in-out infinite' }} />
              <span style={{ fontSize:'.68rem',fontWeight:700,letterSpacing:'.12em',color:'#22c578' }}>
                {deployCount.toLocaleString()} deploys this month
              </span>
            </div>
          </div>

          <div className="gds-right-panel">
            <div>
              <p style={{ fontSize:'.65rem',fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'#4a5568',marginBottom:8 }}>Also Live</p>
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                {DEPLOY_EVENTS.slice(4).map((ev,i) => (
                  <DeployCard key={ev.id} event={ev} isActive={activeIndex===i+4} onClick={() => setActiveIndex(i+4)} />
                ))}
              </div>
            </div>
            <div className="gds-infra-block" style={{ marginTop:12,paddingTop:16,borderTop:'1px solid rgba(255,255,255,.06)' }}>
              <p style={{ fontSize:'.65rem',fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'#4a5568',marginBottom:10 }}>Infrastructure</p>
              {([
                { label:'Avg Response', value:'68ms'   },
                { label:'Error Rate',   value:'0.001%' },
                { label:'Active States',value:'12'     },
              ] as StatItem[]).map((s) => (
                <div key={s.label} style={{ display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,.04)' }}>
                  <span style={{ fontSize:'.72rem',color:'#4a5568' }}>{s.label}</span>
                  <span style={{ fontSize:'.72rem',fontWeight:600,color:'#22c578',fontVariantNumeric:'tabular-nums' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gds-stats-bar">
          {GLOBAL_STATS.map((s,i) => (
            <div
              key={s.label} className="gds-stat-cell"
              style={{ borderRight:i<GLOBAL_STATS.length-1?'1px solid rgba(255,255,255,.05)':'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background='#111420'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background='#0d0f15'; }}
            >
              <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:'2rem',fontWeight:700,background:'linear-gradient(135deg,#22c578,#7fffc4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:8 }}>
                {s.value}
              </div>
              <div style={{ fontSize:'.68rem',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'#4a5568' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}