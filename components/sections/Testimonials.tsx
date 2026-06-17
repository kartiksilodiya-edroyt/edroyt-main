'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import type * as THREE_TYPES from 'three';

interface DeployEvent {
  id: number; project: string; client: string; city: string;
  lat: number; lon: number; status: 'live' | 'deploying'; time: string;
}
interface Vec3 { x: number; y: number; z: number; }
interface ArcObject { line: THREE_TYPES.Line; pts: THREE_TYPES.Vector3[]; mat: THREE_TYPES.LineBasicMaterial; color: number; }
interface Packet { t: number; speed: number; arc: ArcObject; mesh: THREE_TYPES.Mesh; trail: THREE_TYPES.Mesh[]; }
interface PulseRing { mesh: THREE_TYPES.Mesh; t: number; speed: number; nodeIdx: number; }
interface GlobeCanvasProps { activeIndex: number; onNodeClick: (index: number) => void; theme: string; }
interface DeployCardProps { event: DeployEvent; isActive: boolean; onClick: () => void; }
interface StatItem { label: string; value: string; }

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  relation?: string;
  color: 'blue' | 'purple' | 'dark' | 'white';
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Krati Vyas is, without question, a visionary marketing leader whose impact is felt in every endeavor she touches. Her creativity is truly unparalleled—she has an extraordinary ability to take complex visions and bring them to life with breathtaking clarity and brilliance. Krati doesn't just craft campaigns; she tells stories that connect, inspire, and leave a lasting impression.",
    name: "Prithwi Thakuria",
    role: "CEO & Founder, mEinstein",
    color: "blue",
  },
  {
    id: 2,
    quote: "I've had the pleasure of working with Krati on multiple projects, and her impact is always exceptional. As a UI designer, she creates stunning, user-friendly interfaces. Her leadership skills foster creativity and collaboration within teams. Krati also excels in marketing, effectively championing ideas to stakeholders. What truly sets Krati apart is her unwavering commitment to excellence.",
    name: "Nikhil Kheradi",
    role: "Marketing Head, Teledigital, Nepal",
    color: "purple",
  },
  {
    id: 3,
    quote: "Krati and her team did an exceptional job building the brand identity for both Grower and Musoulic. What stands out is their ability to understand the intent behind the brand—not just execute a brief. Their communication is clear, structured and proactive, with strong handholding throughout the process. Highly recommend them for anyone looking to build a strong brand.",
    name: "Grover Amit",
    role: "Founder, CEO of Grower Consulting, Delhi",
    color: "white",
  },
  {
    id: 4,
    quote: "It was a pleasure to work with Krati and her team. Throughout our project, they consistently displayed prompt response, strong work ethic and professionalism. Extremely happy with the output and looking forward to collab with their team in future as well.",
    name: "Sakshi Bansal Gupta",
    role: "Head of Marketing and BDE, Litmus, Nepal",
    color: "blue",
  },
  {
    id: 5,
    quote: "I've had the privilege of working closely with Krati Vyas, who heads the global market strategy for mEinstein, and I can confidently say she's the backbone of our business. Krati brings unparalleled strategic vision, deeply understanding market trends and user needs. Her ability to craft and execute market strategies has been crucial in driving user adoption.",
    name: "Prashant Kumar",
    role: "Founder, Innovquant",
    color: "purple",
  },
  {
    id: 6,
    quote: "I highly recommend Krati as a UX Designer. Her multifaceted expertise in interaction design, user research, and data analysis sets her apart. Krati's work ethic and attention to detail are exceptional, and her ability to seamlessly integrate data analytics into usability studies is impressive. She consistently demonstrates a deep understanding of UX principles.",
    name: "Pooja Kulkarni",
    role: "Krati's Colleague",
    color: "dark",
  },
  {
    id: 7,
    quote: "She is very sincere and dedicated person to work with. I have worked with her in one of the data project where she helped me in dashboard design to make it user friendly. She has a good knowledge in data and design altogether.",
    name: "Sundram Choudhary",
    role: "Krati's Colleague",
    color: "white",
  },
];

const DEPLOY_EVENTS: DeployEvent[] = [
  { id:1, project:'Seize The Ads', client:'Seize The Ads', city:'Indore', lat:22.7196, lon:75.8577, status:'live', time:'2s ago' },
  { id:2, project:'MyWork Platform', client:'MyWork', city:'Indore', lat:22.7196, lon:75.8577, status:'live', time:'18s ago' },
  { id:3, project:'Atpace — Grow Atpace', client:'Atpace', city:'Indore', lat:22.7196, lon:75.8577, status:'deploying', time:'34s ago' },
  { id:4, project:'Sell It — Selling Made Simple', client:'Sell It', city:'Indore', lat:22.7196, lon:75.8577, status:'live', time:'1m ago' },
  { id:5, project:'mEinstein', client:'mEinstein', city:'Indore', lat:22.7196, lon:75.8577, status:'live', time:'2m ago' },
  { id:6, project:'Kalkii Fresh', client:'Kalkii Fresh', city:'Indore', lat:22.7196, lon:75.8577, status:'live', time:'4m ago' },
  { id:7, project:'Niramaya Health', client:'Niramaya Health', city:'Indore', lat:22.7196, lon:75.8577, status:'live', time:'6m ago' },
  { id:8, project:'Crack Detection System', client:'Infrastructure Client', city:'Indore', lat:22.7196, lon:75.8577, status:'deploying', time:'8m ago' },
  { id:9, project:'Smart DVR', client:'Smart DVR', city:'Indore', lat:22.7196, lon:75.8577, status:'live', time:'10m ago' },
];

const ARCS: [number, number][] = [
  [0,1],[1,4],[4,2],[2,6],[6,5],[3,4],[7,0],[1,7],[7,2],[5,3],
];

const GLOBAL_STATS: StatItem[] = [
  { value:'9+', label:'Products Live' },
  { value:'99.98%', label:'Uptime' },
  { value:'4.1s', label:'Avg Deploy Time' },
  { value:'1,200+', label:'Deploys This Month' },
];

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

const GLOBE_THEME_COLORS = {
  dark: {
    globeBg: 0x060a0e,
    dotColor: 0x0d4a2e,
    dotOpacity: 0.55,
    green: 0x22c578,
    teal: 0x0ff5d0,
    cyan: 0x00e5ff,
    bright: 0x6eefb4,
    activeHighlight: 0xffffff,
    starColor: 0x3aff9a,
    starOpacity: 0.75,
    specOpacity: 0.028,
    atmoOpacity: [0.08, 0.055, 0.028, 0.010] as [number, number, number, number],
  },
  light: {
    globeBg: 0xe9f1ec,
    dotColor: 0x7fc99e,
    dotOpacity: 0.65,
    green: 0x16a34a,
    teal: 0x0e9488,
    cyan: 0x0891b2,
    bright: 0x166534,
    activeHighlight: 0x0f1117,
    starColor: 0x4ade80,
    starOpacity: 0.45,
    specOpacity: 0.05,
    atmoOpacity: [0.11, 0.075, 0.04, 0.016] as [number, number, number, number],
  },
};

function latLonToVec3(lat: number, lon: number, radius: number): Vec3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y:  radius * Math.cos(phi),
    z:  radius * Math.sin(phi) * Math.sin(theta),
  };
}

function GlobeCanvas({ activeIndex, onNodeClick, theme }: GlobeCanvasProps) {
  const mountRef  = useRef<HTMLDivElement>(null);
  const activeRef = useRef<number>(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;
    let animId: number;
    const intervalIds: ReturnType<typeof setInterval>[] = [];
    const palette = theme === 'light' ? GLOBE_THEME_COLORS.light : GLOBE_THEME_COLORS.dark;

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

      const R = 1.5;
      const C_GREEN  = palette.green;
      const C_TEAL   = palette.teal;
      const C_BRIGHT = palette.bright;

      const globeMesh = new THREE.Mesh(
        new THREE.SphereGeometry(R, 64, 64),
        new THREE.MeshBasicMaterial({ color: palette.globeBg, transparent: true, opacity: 0.97 }),
      );
      scene.add(globeMesh);

      const dotGroup = new THREE.Group();
      const dotGeo   = new THREE.SphereGeometry(0.006, 4, 4);
      for (let lat = -85; lat <= 85; lat += 5) {
        const cosLat = Math.cos(lat * Math.PI / 180);
        const lonStep = Math.max(5, Math.round(5 / Math.max(cosLat, 0.1)));
        for (let lon = 0; lon < 360; lon += lonStep) {
          const v = latLonToVec3(lat, lon - 180, R + 0.003);
          const dot = new THREE.Mesh(
            dotGeo,
            new THREE.MeshBasicMaterial({ color: palette.dotColor, transparent: true, opacity: palette.dotOpacity }),
          );
          dot.position.set(v.x, v.y, v.z);
          dotGroup.add(dot);
        }
      }
      scene.add(dotGroup);

      const atmoLayers = [
        { r: 1.03, o: palette.atmoOpacity[0] },
        { r: 1.08, o: palette.atmoOpacity[1] },
        { r: 1.15, o: palette.atmoOpacity[2] },
        { r: 1.26, o: palette.atmoOpacity[3] },
      ];
      atmoLayers.forEach(({ r, o }) => {
        scene.add(new THREE.Mesh(
          new THREE.SphereGeometry(R * r, 40, 40),
          new THREE.MeshBasicMaterial({ color: C_GREEN, transparent: true, opacity: o, side: THREE.BackSide }),
        ));
      });

      const specGeo  = new THREE.CircleGeometry(0.38, 32);
      const specMesh = new THREE.Mesh(
        specGeo,
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: palette.specOpacity, side: THREE.DoubleSide }),
      );
      specMesh.position.set(-0.62, 0.85, R * 1.01);
      scene.add(specMesh);

      const STAR_COUNT = 900;
      const starPos   = new Float32Array(STAR_COUNT * 3);
      const starSizes = new Float32Array(STAR_COUNT);
      for (let i = 0; i < STAR_COUNT; i++) {
        const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1), r = 4 + Math.random() * 6;
        starPos[i * 3]     = r * Math.sin(p) * Math.cos(t);
        starPos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
        starPos[i * 3 + 2] = r * Math.cos(p);
        starSizes[i] = Math.random() < 0.12 ? 0.038 : Math.random() < 0.35 ? 0.022 : 0.012;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute('size',     new THREE.BufferAttribute(starSizes, 1));
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: palette.starColor, size: 0.022, transparent: true, opacity: palette.starOpacity, sizeAttenuation: true })));

      const indiaLineMat  = new THREE.LineBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0.7 });
      const indiaLineMat2 = new THREE.LineBasicMaterial({ color: C_BRIGHT, transparent: true, opacity: 0.22 });
      const indiaPts = INDIA_OUTLINE.map(([lat, lon]) => {
        const v = latLonToVec3(lat, lon, R + 0.005);
        return new THREE.Vector3(v.x, v.y, v.z);
      });
      const indiaLine  = new THREE.Line(new THREE.BufferGeometry().setFromPoints(indiaPts), indiaLineMat);
      const indiaLine2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints(
        INDIA_OUTLINE.map(([lat, lon]) => { const v = latLonToVec3(lat, lon, R + 0.012); return new THREE.Vector3(v.x, v.y, v.z); })
      ), indiaLineMat2);
      scene.add(indiaLine);
      scene.add(indiaLine2);

      const nodeMeshes: THREE_TYPES.Mesh[]  = [];
      const ring1Meshes: THREE_TYPES.Mesh[] = [];
      const ring2Meshes: THREE_TYPES.Mesh[] = [];
      const nodeGeo  = new THREE.SphereGeometry(0.03, 12, 12);
      const ring1Geo = new THREE.RingGeometry(0.05, 0.062, 40);
      const ring2Geo = new THREE.RingGeometry(0.075, 0.083, 40);
      const pulseRings: PulseRing[] = [];

      DEPLOY_EVENTS.forEach((ev, i) => {
        const pos = latLonToVec3(ev.lat, ev.lon, R + 0.014);
        const v3  = new THREE.Vector3(pos.x, pos.y, pos.z);

        const node = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: C_BRIGHT }));
        node.position.copy(v3); node.userData = { index: i };
        scene.add(node); nodeMeshes.push(node);

        const r1 = new THREE.Mesh(ring1Geo, new THREE.MeshBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
        r1.position.copy(v3); r1.lookAt(0, 0, 0);
        scene.add(r1); ring1Meshes.push(r1);

        const r2 = new THREE.Mesh(ring2Geo, new THREE.MeshBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0.18, side: THREE.DoubleSide }));
        r2.position.copy(v3); r2.lookAt(0, 0, 0);
        scene.add(r2); ring2Meshes.push(r2);

        [0, 0.5].forEach(offset => {
          const prGeo  = new THREE.RingGeometry(0.05, 0.062, 40);
          const prMesh = new THREE.Mesh(prGeo, new THREE.MeshBasicMaterial({ color: C_GREEN, transparent: true, opacity: 0, side: THREE.DoubleSide }));
          prMesh.position.copy(v3); prMesh.lookAt(0, 0, 0);
          scene.add(prMesh);
          pulseRings.push({ mesh: prMesh, t: offset, speed: 0.008 + Math.random() * 0.004, nodeIdx: i });
        });
      });

      const ARC_COLORS = [C_GREEN, C_TEAL, palette.cyan, C_BRIGHT];
      const arcObjects: ArcObject[] = [];

      function buildArc(p1: Vec3, p2: Vec3, segments = 80): THREE_TYPES.Vector3[] {
        const v1 = new THREE.Vector3(p1.x, p1.y, p1.z).normalize();
        const v2 = new THREE.Vector3(p2.x, p2.y, p2.z).normalize();
        const pts: THREE_TYPES.Vector3[] = [];
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const arc = new THREE.Vector3().lerpVectors(v1, v2, t).normalize();
          arc.multiplyScalar(R + 0.018 + Math.sin(t * Math.PI) * 0.52);
          pts.push(arc);
        }
        return pts;
      }

      ARCS.forEach(([ai, bi], arcIdx) => {
        const pa  = latLonToVec3(DEPLOY_EVENTS[ai].lat, DEPLOY_EVENTS[ai].lon, R);
        const pb  = latLonToVec3(DEPLOY_EVENTS[bi].lat, DEPLOY_EVENTS[bi].lon, R);
        const pts = buildArc(pa, pb);
        const col = ARC_COLORS[arcIdx % ARC_COLORS.length];
        const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.22 });
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
        scene.add(line);
        arcObjects.push({ line, pts, mat, color: col });
      });

      const packetGeo  = new THREE.SphereGeometry(0.028, 8, 8);
      const trailGeo   = new THREE.SphereGeometry(0.014, 6, 6);
      const packets: Packet[] = [];
      const TRAIL_LEN = 5;

      function spawnPacket() {
        if (packets.length >= 10) return;
        const arc  = arcObjects[Math.floor(Math.random() * arcObjects.length)];
        const mesh = new THREE.Mesh(packetGeo, new THREE.MeshBasicMaterial({ color: arc.color, transparent: true }));
        const trail: THREE_TYPES.Mesh[] = [];
        for (let k = 0; k < TRAIL_LEN; k++) {
          const tm = new THREE.Mesh(trailGeo, new THREE.MeshBasicMaterial({ color: arc.color, transparent: true, opacity: 0 }));
          scene.add(tm);
          trail.push(tm);
        }
        scene.add(mesh);
        packets.push({ t: 0, speed: 0.005 + Math.random() * 0.007, arc, mesh, trail });
      }
      intervalIds.push(setInterval(spawnPacket, 350));

      let isDragging = false, prevX = 0, prevY = 0, autoSpin = true;
      let rotY = -1.35, rotX = -0.22;

      const onMouseDown = (e: MouseEvent) => { isDragging = true; autoSpin = false; prevX = e.clientX; prevY = e.clientY; };
      const onMouseMove = (e: MouseEvent) => { if (!isDragging) return; rotY += (e.clientX - prevX) * 0.004; rotX += (e.clientY - prevY) * 0.004; prevX = e.clientX; prevY = e.clientY; };
      const onMouseUp   = () => { isDragging = false; };
      renderer.domElement.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      let lastTX = 0, lastTY = 0;
      renderer.domElement.addEventListener('touchstart', (e: TouchEvent) => { autoSpin = false; lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY; }, { passive: true });
      renderer.domElement.addEventListener('touchmove', (e: TouchEvent) => { rotY += (e.touches[0].clientX - lastTX) * 0.004; rotX += (e.touches[0].clientY - lastTY) * 0.004; lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY; }, { passive: true });

      const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
      renderer.domElement.addEventListener('click', (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(nodeMeshes);
        if (hits.length > 0) onNodeClick(hits[0].object.userData.index as number);
      });

      const onResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', onResize);

      let elapsed = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        elapsed += 0.008;
        if (autoSpin) rotY += 0.0010;

        const euler = new THREE.Euler(rotX, rotY, 0);

        globeMesh.rotation.set(rotX, rotY, 0);
        dotGroup.rotation.set(rotX, rotY, 0);

        const updIndia = (line: THREE_TYPES.Line, rOff: number) => {
          const pts = INDIA_OUTLINE.map(([lat, lon]) => {
            const v = latLonToVec3(lat, lon, R + rOff);
            return new THREE.Vector3(v.x, v.y, v.z).applyEuler(euler);
          });
          line.geometry.setFromPoints(pts);
          (line.geometry.attributes.position as THREE_TYPES.BufferAttribute).needsUpdate = true;
        };
        updIndia(indiaLine, 0.005);
        updIndia(indiaLine2, 0.013);
        indiaLineMat.opacity  = 0.45 + Math.sin(elapsed * 1.4) * 0.25;
        indiaLineMat2.opacity = 0.12 + Math.sin(elapsed * 1.4 + 1) * 0.1;

        nodeMeshes.forEach((m, i) => {
          const base    = latLonToVec3(DEPLOY_EVENTS[i].lat, DEPLOY_EVENTS[i].lon, R + 0.014);
          const worldPos = new THREE.Vector3(base.x, base.y, base.z).applyEuler(euler);
          m.position.copy(worldPos);
          const isActive = activeRef.current === i;
          const pulse    = Math.sin(elapsed * 3.5 + i * 1.2) * 0.5 + 0.5;
          m.scale.setScalar(isActive ? 1.8 + pulse * 0.6 : 1.1 + pulse * 0.12);
          (m.material as THREE_TYPES.MeshBasicMaterial).color.setHex(isActive ? palette.activeHighlight : C_BRIGHT);

          [ring1Meshes, ring2Meshes].forEach((rArr, ri) => {
            rArr[i].position.copy(worldPos);
            rArr[i].lookAt(camera.position);
            const baseOpacity = ri === 0 ? 0.45 : 0.18;
            (rArr[i].material as THREE_TYPES.MeshBasicMaterial).opacity = isActive
              ? baseOpacity + pulse * 0.35
              : (baseOpacity * 0.4) + pulse * 0.06;
            rArr[i].scale.setScalar(isActive ? 1.4 + pulse * 0.5 : 1 + pulse * 0.08);
          });
        });

        pulseRings.forEach(pr => {
          pr.t += pr.speed;
          if (pr.t > 1) pr.t -= 1;
          const base     = latLonToVec3(DEPLOY_EVENTS[pr.nodeIdx].lat, DEPLOY_EVENTS[pr.nodeIdx].lon, R + 0.014);
          const worldPos = new THREE.Vector3(base.x, base.y, base.z).applyEuler(euler);
          pr.mesh.position.copy(worldPos);
          pr.mesh.lookAt(camera.position);
          const isActive = activeRef.current === pr.nodeIdx;
          const sc = 1 + pr.t * (isActive ? 3.5 : 2.2);
          pr.mesh.scale.setScalar(sc);
          const op = isActive ? (1 - pr.t) * 0.65 : (1 - pr.t) * 0.22;
          (pr.mesh.material as THREE_TYPES.MeshBasicMaterial).opacity = op;
        });

        arcObjects.forEach(({ line, pts, mat }, ai) => {
          line.geometry.setFromPoints(pts.map((p) => p.clone().applyEuler(euler)));
          (line.geometry.attributes.position as THREE_TYPES.BufferAttribute).needsUpdate = true;
          mat.opacity = 0.15 + Math.sin(elapsed * 0.9 + ai * 0.7) * 0.1;
        });

        for (let i = packets.length - 1; i >= 0; i--) {
          const pk = packets[i];
          pk.t += pk.speed;
          const totalPts = pk.arc.pts.length;
          const idx = Math.min(Math.floor(pk.t * totalPts), totalPts - 1);
          const curPos = pk.arc.pts[idx].clone().applyEuler(euler);
          pk.mesh.position.copy(curPos);
          const a = pk.t > 0.85 ? 1 - (pk.t - 0.85) / 0.15 : Math.min(pk.t / 0.08, 1);
          (pk.mesh.material as THREE_TYPES.MeshBasicMaterial).opacity = a;

          pk.trail.forEach((tm, ti) => {
            const trailT  = pk.t - (ti + 1) * 0.025;
            if (trailT < 0) { (tm.material as THREE_TYPES.MeshBasicMaterial).opacity = 0; return; }
            const tIdx = Math.min(Math.floor(trailT * totalPts), totalPts - 1);
            tm.position.copy(pk.arc.pts[tIdx].clone().applyEuler(euler));
            (tm.material as THREE_TYPES.MeshBasicMaterial).opacity = a * (1 - (ti + 1) / (TRAIL_LEN + 1)) * 0.55;
          });

          if (pk.t >= 1) {
            scene.remove(pk.mesh);
            pk.trail.forEach(tm => scene.remove(tm));
            packets.splice(i, 1);
          }
        }

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        intervalIds.forEach(clearInterval);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    };

    const cleanup = init();
    return () => { cleanup.then((fn) => fn?.()); };
  }, [onNodeClick, theme]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }} />;
}

function DeployCard({ event, isActive, onClick }: DeployCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '12px 14px', borderRadius: 10, cursor: 'pointer', transition: 'all .2s',
        border: isActive ? '1px solid var(--border-green)' : '1px solid var(--border-subtle)',
        background: isActive ? 'rgba(34,197,120,.08)' : 'var(--bg-card)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: event.status === 'live' ? 'var(--green)' : '#ffbd2e' }} />
        {event.status === 'live' && (
          <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid var(--border-green)', animation: 'pingRing 1.8s ease-in-out infinite' }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.project}</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', flexShrink: 0 }}>{event.time}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{event.client}</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--green)' }}>📍 {event.city}</span>
        </div>
      </div>
    </div>
  );
}

// ── Testimonial helpers ──────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const CARD_TINT: Record<
  Testimonial['color'],
  {
    cardBg: string;
    cardBorder: string;
    avatarBg: string;
    avatarColor: string;
    avatarBorder: string;
    quoteMark: string;
  }
> = {
  blue: {
    cardBg:       'rgba(56,139,253,0.07)',
    cardBorder:   'rgba(56,139,253,0.18)',
    avatarBg:     'rgba(56,139,253,0.15)',
    avatarColor:  '#6eb3ff',
    avatarBorder: 'rgba(56,139,253,0.25)',
    quoteMark:    'rgba(56,139,253,0.10)',
  },
  purple: {
    cardBg:       'rgba(168,85,247,0.07)',
    cardBorder:   'rgba(168,85,247,0.18)',
    avatarBg:     'rgba(168,85,247,0.15)',
    avatarColor:  '#c084fc',
    avatarBorder: 'rgba(168,85,247,0.25)',
    quoteMark:    'rgba(168,85,247,0.10)',
  },
  dark: {
    cardBg:       'rgba(255,255,255,0.04)',
    cardBorder:   'rgba(255,255,255,0.10)',
    avatarBg:     'rgba(255,255,255,0.08)',
    avatarColor:  'rgba(255,255,255,0.65)',
    avatarBorder: 'rgba(255,255,255,0.12)',
    quoteMark:    'rgba(255,255,255,0.06)',
  },
  white: {
    cardBg:       'rgba(34,197,120,0.06)',
    cardBorder:   'rgba(34,197,120,0.16)',
    avatarBg:     'rgba(34,197,120,0.14)',
    avatarColor:  '#22c578',
    avatarBorder: 'rgba(34,197,120,0.22)',
    quoteMark:    'rgba(34,197,120,0.09)',
  },
};

// ── TestimonialCard ──────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  isActive = false,
}: {
  testimonial: Testimonial;
  isActive?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.quote.length > 200;
  const displayQuote =
    !expanded && isLong ? testimonial.quote.slice(0, 200) + '…' : testimonial.quote;

  const tint    = CARD_TINT[testimonial.color];
  const initials = getInitials(testimonial.name);

  return (
    <div
      className="tcard"
      style={{
        borderRadius: 20,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: isActive ? 'rgba(34,197,120,0.10)' : tint.cardBg,
        border: isActive
          ? '1px solid rgba(34,197,120,0.30)'
          : `1px solid ${tint.cardBorder}`,
        boxShadow: isActive ? '0 0 0 1px rgba(34,197,120,0.10) inset' : undefined,
      }}
      onMouseEnter={(e) => {
        if (!isActive) return;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 20px 40px rgba(0,0,0,0.28), 0 0 0 1px rgba(34,197,120,0.10) inset';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isActive
          ? '0 0 0 1px rgba(34,197,120,0.10) inset'
          : 'none';
      }}
    >
      {/* Decorative quote mark */}
      <div
        className="tcard-quote-mark"
        style={{
          position: 'absolute', top: 10, right: 16,
          fontSize: '5.5rem', lineHeight: 1,
          color: isActive ? 'rgba(34,197,120,0.13)' : tint.quoteMark,
          fontFamily: 'Georgia, serif', fontWeight: 700,
          pointerEvents: 'none', userSelect: 'none',
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: '0.86rem', lineHeight: 1.75,
          color: 'rgba(255,255,255,0.78)',
          position: 'relative', zIndex: 1,
          marginBottom: 16,
        }}
      >
        "{displayQuote}"
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '0.72rem', fontWeight: 700,
            color: '#22c578',
            padding: 0, marginBottom: 14,
            textDecoration: 'underline', display: 'block',
          }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 14 }} />

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Initials avatar */}
        <div
          style={{
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.03em',
            flexShrink: 0,
            background: isActive ? 'rgba(34,197,120,0.16)' : tint.avatarBg,
            color: isActive ? '#22c578' : tint.avatarColor,
            border: isActive
              ? '1px solid rgba(34,197,120,0.28)'
              : `1px solid ${tint.avatarBorder}`,
          }}
        >
          {initials}
        </div>

        <div>
          <div
            style={{
              fontSize: '0.88rem', fontWeight: 700,
              color: 'rgba(255,255,255,0.92)',
              marginBottom: 2,
            }}
          >
            {testimonial.name}
          </div>
          <div
            style={{
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.40)',
              lineHeight: 1.4,
            }}
          >
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TestimonialsSection ──────────────────────────────────────────────────────

function TestimonialsSection({ isDark }: { isDark: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActiveSlide((s) => (s + 1) % total), 4000);
    return () => clearInterval(id);
  }, [isPaused, total]);

  const prev = () => { setIsPaused(true); setActiveSlide((s) => (s - 1 + total) % total); };
  const next = () => { setIsPaused(true); setActiveSlide((s) => (s + 1) % total); };

  const indices = [
    (activeSlide - 1 + total) % total,
    activeSlide,
    (activeSlide + 1) % total,
  ];

  return (
    <section
      className="gds-section"
      style={{
        background: 'var(--bg-primary)',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(34,197,120,0.055) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 350, height: 350, background: 'radial-gradient(circle,rgba(56,139,253,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1260, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div className="gds-section-header" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 16 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pingRing 1.6s ease-in-out infinite' }} />
            Client Voices
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 16 }}>
            Trusted by{' '}
            <span style={{ background: 'linear-gradient(135deg,var(--green),var(--green-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Builders & Leaders
            </span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            What clients, collaborators, and colleagues say about working with us.
          </p>
        </div>

        {/* ── Trust strip — above carousel ── */}
        <div
          className="gds-trust-strip"
          style={{
            maxWidth: 560,
            margin: '0 auto 52px',
            padding: '18px 32px',
            borderRadius: 14,
            border: '1px solid rgba(34,197,120,0.14)',
            background: 'rgba(34,197,120,0.04)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '40+', label: 'Happy Clients' },
            { value: '5★',  label: 'Avg Rating'    },
            { value: '3',   label: 'Countries'     },
          ].map((s, i, arr) => (
            <>
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg,var(--green),var(--green-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1, marginBottom: 3 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '.65rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div key={`div-${i}`} style={{ width: 1, height: 34, background: 'rgba(34,197,120,0.14)', flexShrink: 0 }} />
              )}
            </>
          ))}
        </div>

        {/* ── Carousel ── */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="tcard-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.12fr 1fr', gap: 20, alignItems: 'start' }}
          >
            {indices.map((idx, pos) => (
              <div
                key={`${idx}-${pos}`}
                className={pos !== 1 ? 'tcard-side' : undefined}
                style={{
                  opacity: pos === 1 ? 1 : 0.62,
                  transform: pos === 1 ? 'scale(1.03)' : 'scale(0.96)',
                  transition: 'opacity 0.45s ease, transform 0.45s ease',
                  cursor: pos !== 1 ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (pos === 0) prev();
                  if (pos === 2) next();
                }}
              >
                <TestimonialCard
                  testimonial={TESTIMONIALS[idx]}
                  isActive={pos === 1}
                />
              </div>
            ))}
          </div>

          {/* Nav */}
          <div className="gds-nav-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 40 }}>
            <button
              onClick={prev}
              className="gds-nav-btn"
              style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border-green)', background: 'rgba(34,197,120,0.08)', color: 'var(--green)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,197,120,0.18)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,197,120,0.08)'; }}
            >
              ‹
            </button>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsPaused(true); setActiveSlide(i); }}
                  style={{
                    width: i === activeSlide ? 24 : 8,
                    height: 8, borderRadius: 4,
                    background: i === activeSlide ? 'var(--green)' : 'rgba(34,197,120,0.22)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="gds-nav-btn"
              style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border-green)', background: 'rgba(34,197,120,0.08)', color: 'var(--green)', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,197,120,0.18)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(34,197,120,0.08)'; }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── GlobalDeploySection (root export) ───────────────────────────────────────

export default function GlobalDeploySection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [deployCount, setDeployCount] = useState<number>(1247);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const currentTheme = mounted ? (resolvedTheme ?? theme ?? 'dark') : 'dark';
  const isDark = currentTheme !== 'light';

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
    <>
      <style dangerouslySetInnerHTML={{ __html: `
  @keyframes pingRing {
    0%   { opacity:.7; transform:scale(1);   }
    100% { opacity:0;  transform:scale(2.4); }
  }
  @keyframes fadeSlide {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:1; transform:translateY(0);   }
  }

  /* ── Layout ────────────────────────────────────────────────── */
  .gds-grid { display:grid; grid-template-columns:280px 1fr 280px; gap:28px; align-items:center; }
  .gds-globe-wrap { position:relative; aspect-ratio:1/1; max-height:520px; }
  .gds-stats-bar { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin-top:56px; background:var(--border-subtle); border-radius:16px; overflow:hidden; border:1px solid var(--border-subtle); }
  .gds-stat-cell { padding:28px 24px; text-align:center; background:var(--bg-card); transition:background .2s; }
  .gds-right-panel { display:flex; flex-direction:column; gap:8px; }

  /* ── Light mode glass override ─────────────────────────────── */
  [data-theme="light"] .tcard,
  .light .tcard {
    background: rgba(255,255,255,0.70) !important;
    border-color: rgba(0,0,0,0.09) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  [data-theme="light"] .tcard p,
  .light .tcard p {
    color: rgba(15,17,23,0.78) !important;
  }
  [data-theme="light"] .tcard .tcard-author-name {
    color: rgba(15,17,23,0.92) !important;
  }
  [data-theme="light"] .tcard .tcard-author-role {
    color: rgba(15,17,23,0.45) !important;
  }

  /* ── Tablet ────────────────────────────────────────────────── */
  @media(max-width:1024px){
    .gds-grid{grid-template-columns:1fr;gap:24px;}
    .gds-globe-wrap{max-height:380px;width:100%;}
    .gds-right-panel{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .gds-infra-block{grid-column:1/-1;}
  }

  /* ── Phone ─────────────────────────────────────────────────── */
  @media(max-width:768px){
    .gds-section{padding:64px 0 56px !important;}
    .gds-section-header{margin-bottom:40px !important;}
    .gds-grid{grid-template-columns:1fr;}
    .gds-globe-wrap{max-height:320px;}
    .gds-stats-bar{grid-template-columns:repeat(2,1fr);margin-top:40px;}
    .gds-stat-cell{padding:20px 16px;}
    .gds-right-panel{grid-template-columns:1fr 1fr;}
    .gds-infra-block{grid-column:1/-1;}
    .tcard-grid{grid-template-columns:1fr !important;gap:16px !important;}
    .tcard-side{display:none !important;}
    .gds-trust-strip{gap:20px !important;padding:16px 20px !important;margin-bottom:36px !important;}
    .gds-nav-row{gap:10px !important;margin-top:28px !important;}
    .gds-active-badge{white-space:normal !important;max-width:calc(100% - 32px);text-align:center;}
    .gds-active-badge-inner{flex-wrap:wrap;justify-content:center;}
  }

  /* ── Small phone ───────────────────────────────────────────── */
  @media(max-width:480px){
    .gds-section{padding:48px 0 40px !important;}
    .gds-section-header{margin-bottom:32px !important;}
    .gds-globe-wrap{max-height:260px;}
    .gds-stats-bar{grid-template-columns:repeat(2,1fr);gap:1px;margin-top:32px;}
    .gds-stat-cell{padding:16px 12px;}
    .gds-stat-cell > div:first-child{font-size:1.5rem !important;}
    .tcard{padding:22px 18px !important;}
    .tcard-quote-mark{font-size:4rem !important;top:8px !important;right:14px !important;}
    .gds-nav-btn{width:38px !important;height:38px !important;}
    .gds-trust-strip{gap:14px !important;padding:14px !important;}
  }
` }} />

      {/* ── Deploy Section ─────────────────────────────────────────── */}
      <section className="gds-section" style={{ background: 'var(--bg-primary)', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute',top:'10%',left:'5%',width:500,height:500,background:'radial-gradient(circle,rgba(34,197,120,.055) 0%,transparent 70%)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:'5%',right:'5%',width:400,height:400,background:'radial-gradient(circle,rgba(34,197,120,.04) 0%,transparent 70%)',pointerEvents:'none' }} />

        <div style={{ maxWidth:1260,margin:'0 auto',padding:'0 24px' }}>
          <div className="gds-section-header" style={{ textAlign:'center',marginBottom:64 }}>
            <span style={{ display:'inline-flex',alignItems:'center',gap:8,fontSize:'.7rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--green)',marginBottom:16 }}>
              <span style={{ display:'inline-block',width:6,height:6,borderRadius:'50%',background:'var(--green)',animation:'pingRing 1.6s ease-in-out infinite' }} />
              Trusted Digital Partner
            </span>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:700,color:'var(--text-primary)',letterSpacing:'-.02em',lineHeight:1.1,marginBottom:16 }}>
              Transforming Ideas Into{' '}
              <span style={{ background:'linear-gradient(135deg,var(--green),var(--green-light))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                Scalable Digital Products
              </span>
            </h2>
            <p style={{ color:'var(--text-secondary)',fontSize:'1rem',lineHeight:1.7,maxWidth:520,margin:'0 auto' }}>
              From startups to enterprises, we design, develop, and deliver modern web and mobile solutions that drive growth, improve efficiency, and create lasting business impact.
            </p>
          </div>

          <div className="gds-grid">
            <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
              <p style={{ fontSize:'.65rem',fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:8 }}>Recent Deployments</p>
              {DEPLOY_EVENTS.slice(0,4).map((ev,i) => (
                <DeployCard key={ev.id} event={ev} isActive={activeIndex===i} onClick={() => setActiveIndex(i)} />
              ))}
            </div>

            <div className="gds-globe-wrap">
              <GlobeCanvas activeIndex={activeIndex} onNodeClick={setActiveIndex} theme={currentTheme} />
              <div
                key={activeIndex}
                className="gds-active-badge"
                style={{ position:'absolute',bottom:20,left:'50%',transform:'translateX(-50%)',background: isDark ? 'rgba(8,9,13,.88)' : 'rgba(255,255,255,.92)',border:'1px solid var(--border-green)',borderRadius:10,padding:'10px 18px',backdropFilter:'blur(12px)',whiteSpace:'nowrap',animation:'fadeSlide .35s ease forwards',zIndex:10 }}
              >
                <div className="gds-active-badge-inner" style={{ display:'flex',alignItems:'center',gap:10 }}>
                  <div style={{ width:7,height:7,borderRadius:'50%',background:active.status==='live'?'var(--green)':'#ffbd2e',flexShrink:0 }} />
                  <span style={{ fontSize:'.8rem',fontWeight:600,color:'var(--text-primary)' }}>{active.project}</span>
                  <span style={{ fontSize:'.72rem',color:'var(--green)',fontWeight:500 }}>{active.city}</span>
                  <span style={{ fontSize:'.65rem',color:'var(--text-muted)',border:'1px solid var(--border-subtle)',padding:'2px 8px',borderRadius:100 }}>
                    {active.status==='live'?'● LIVE':'⟳ DEPLOYING'}
                  </span>
                </div>
              </div>
              <div style={{ position:'absolute',top:16,left:'50%',transform:'translateX(-50%)',background: isDark ? 'rgba(8,9,13,.75)' : 'rgba(255,255,255,.85)',border:'1px solid var(--border-green)',borderRadius:100,padding:'5px 16px',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',gap:8,zIndex:10,maxWidth:'92%' }}>
                <div style={{ width:6,height:6,borderRadius:'50%',background:'var(--green)',animation:'pingRing 1.4s ease-in-out infinite',flexShrink:0 }} />
                <span style={{ fontSize:'.68rem',fontWeight:700,letterSpacing:'.12em',color:'var(--green)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>
                  {deployCount.toLocaleString()} deploys this month
                </span>
              </div>
            </div>

            <div className="gds-right-panel">
              <div>
                <p style={{ fontSize:'.65rem',fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:8 }}>Also Live</p>
                <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                  {DEPLOY_EVENTS.slice(4).map((ev,i) => (
                    <DeployCard key={ev.id} event={ev} isActive={activeIndex===i+4} onClick={() => setActiveIndex(i+4)} />
                  ))}
                </div>
              </div>
              <div className="gds-infra-block" style={{ marginTop:12,paddingTop:16,borderTop:'1px solid var(--border-subtle)' }}>
                <p style={{ fontSize:'.65rem',fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:10 }}>Infrastructure</p>
                {([
                  { label:'Avg Response', value:'68ms' },
                  { label:'Error Rate',   value:'0.001%' },
                  { label:'Active States',value:'12' },
                ] as StatItem[]).map((s) => (
                  <div key={s.label} style={{ display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize:'.72rem',color:'var(--text-muted)' }}>{s.label}</span>
                    <span style={{ fontSize:'.72rem',fontWeight:600,color:'var(--green)',fontVariantNumeric:'tabular-nums' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="gds-stats-bar">
            {GLOBAL_STATS.map((s,i) => (
              <div
                key={s.label} className="gds-stat-cell"
                style={{ borderRight:i<GLOBAL_STATS.length-1?'1px solid var(--border-subtle)':'none' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background='var(--bg-secondary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background='var(--bg-card)'; }}
              >
                <div style={{ fontFamily:"'Space Grotesk',sans-serif",fontSize:'2rem',fontWeight:700,background:'linear-gradient(135deg,var(--green),var(--green-light))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:8 }}>
                  {s.value}
                </div>
                <div style={{ fontSize:'.68rem',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ────────────────────────────────────── */}
      <TestimonialsSection isDark={isDark} />
    </>
  );
}