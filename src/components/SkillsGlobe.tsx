'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { skills } from '@/data/resume';

/* ── Category colors ─────────────────────────────────────── */
const GROUP_CSS: Record<string, string> = {
  Languages:                '#818cf8',
  'Infrastructure & Cloud': '#34d399',
  'Frameworks & Libraries': '#fbbf24',
  Tools:                    '#f472b6',
  Concepts:                 '#38bdf8',
};
// normalised RGB (0–1) for vertex-color buffer
const GROUP_RGB: Record<string, [number, number, number]> = {
  Languages:                [0.506, 0.549, 0.973],
  'Infrastructure & Cloud': [0.204, 0.831, 0.600],
  'Frameworks & Libraries': [0.984, 0.749, 0.141],
  Tools:                    [0.957, 0.447, 0.714],
  Concepts:                 [0.220, 0.741, 0.984],
};
const FALLBACK_RGB: [number, number, number] = [0.957, 0.447, 0.714];

/* ── Helpers ─────────────────────────────────────────────── */
function glowTex(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0.00, '#ffffffff');
  g.addColorStop(0.40, '#ffffff99');
  g.addColorStop(1.00, '#ffffff00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function latCircle(lat: number, R: number, color: number, opacity: number): THREE.Line {
  const y = Math.sin((lat * Math.PI) / 180) * R;
  const r = Math.cos((lat * Math.PI) / 180) * R;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = (i / 80) * Math.PI * 2;
    pts.push(new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t)));
  }
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
}

function meridianLine(lon: number, R: number, opacity: number): THREE.Line {
  const t = (lon * Math.PI) / 180;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 80; i++) {
    const phi = (i / 80) * Math.PI;
    pts.push(new THREE.Vector3(
      R * Math.sin(phi) * Math.cos(t),
      R * Math.cos(phi),
      R * Math.sin(phi) * Math.sin(t),
    ));
  }
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity }),
  );
}

/** Even distribution on a sphere (Fibonacci lattice) */
function fibSphere(n: number, i: number, r: number): [number, number, number] {
  const phi   = Math.acos(1 - 2 * (i + 0.5) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

export default function SkillsGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const tipRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let w = mount.clientWidth;
    let h = mount.clientHeight;

    /* ── Scene ───────────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, w / h, 0.1, 1000);
    camera.position.z = 58;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const R = 18; // globe radius (world units)

    /* ── Globe group ─────────────────────────────────────── */
    const globe = new THREE.Group();
    scene.add(globe);

    /* Dark base sphere — gives the globe solid form */
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 48),
      new THREE.MeshBasicMaterial({ color: 0x05050f, transparent: true, opacity: 0.88 }),
    ));

    /* Atmosphere rim glow — rendered on back face with additive blend */
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.09, 32, 24),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ));

    /* Lat/lon grid */
    // Latitudes
    for (let lat = -60; lat <= 60; lat += 30) {
      globe.add(latCircle(lat, R, 0x6366f1, lat === 0 ? 0.50 : 0.16));
    }
    // Tropics — subtle amber
    for (const lat of [23.5, -23.5]) {
      globe.add(latCircle(lat, R, 0xfbbf24, 0.12));
    }
    // Polar circles
    for (const lat of [66.5, -66.5]) {
      globe.add(latCircle(lat, R, 0x6366f1, 0.09));
    }
    // Meridians (every 30°)
    for (let lon = 0; lon < 180; lon += 30) {
      globe.add(meridianLine(lon, R, 0.15));
    }

    /* ── Skill dots ──────────────────────────────────────── */
    const allSkills: { name: string; group: string }[] = [];
    for (const [group, items] of Object.entries(skills)) {
      for (const item of items as string[]) {
        allSkills.push({ name: item, group });
      }
    }
    const N = allSkills.length;

    const dotPos    = new Float32Array(N * 3);
    const dotColors = new Float32Array(N * 3);
    const baseRGB   = new Float32Array(N * 3);
    const localPts: THREE.Vector3[] = [];

    allSkills.forEach((sk, i) => {
      const [x, y, z] = fibSphere(N, i, R);
      dotPos[i * 3] = x; dotPos[i * 3 + 1] = y; dotPos[i * 3 + 2] = z;
      localPts.push(new THREE.Vector3(x, y, z));
      const [r, g, b] = GROUP_RGB[sk.group] ?? FALLBACK_RGB;
      baseRGB[i * 3] = r; baseRGB[i * 3 + 1] = g; baseRGB[i * 3 + 2] = b;
      dotColors[i * 3] = r; dotColors[i * 3 + 1] = g; dotColors[i * 3 + 2] = b;
    });

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const colorAttr = new THREE.BufferAttribute(dotColors, 3);
    colorAttr.setUsage(THREE.DynamicDrawUsage);
    dotGeo.setAttribute('color', colorAttr);

    const dotMat = new THREE.PointsMaterial({
      size: 2.6,
      transparent: true,
      opacity: 1.0,
      vertexColors: true,
      map: glowTex(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    globe.add(new THREE.Points(dotGeo, dotMat));

    /* ── Input state ─────────────────────────────────────── */
    const mouse = { sx: -999, sy: -999 };

    const onHover = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.sx = e.clientX - rect.left;
      mouse.sy = e.clientY - rect.top;
    };
    mount.addEventListener('mousemove', onHover);

    /* Drag */
    let dragging = false, lx = 0, ly = 0, autoRot = 0.004;
    const onDown = (e: MouseEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; autoRot = 0; };
    const onUp   = ()              => { dragging = false; autoRot = 0.004; };
    const onDrag = (e: MouseEvent) => {
      if (!dragging) return;
      globe.rotation.y += (e.clientX - lx) * 0.007;
      globe.rotation.x  = Math.max(-1.1, Math.min(1.1, globe.rotation.x + (e.clientY - ly) * 0.005));
      lx = e.clientX; ly = e.clientY;
    };
    mount.addEventListener('mousedown', onDown);
    mount.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onUp);

    /* Touch */
    let tx = 0, ty = 0;
    const onTStart = (e: TouchEvent) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; autoRot = 0; };
    const onTMove  = (e: TouchEvent) => {
      globe.rotation.y += (e.touches[0].clientX - tx) * 0.009;
      globe.rotation.x  = Math.max(-1.1, Math.min(1.1, globe.rotation.x + (e.touches[0].clientY - ty) * 0.006));
      tx = e.touches[0].clientX; ty = e.touches[0].clientY;
    };
    const onTEnd = () => { autoRot = 0.004; };
    mount.addEventListener('touchstart', onTStart, { passive: true });
    mount.addEventListener('touchmove',  onTMove,  { passive: true });
    mount.addEventListener('touchend',   onTEnd);

    const onResize = () => {
      w = mount.clientWidth; h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation loop ──────────────────────────────────── */
    let animId: number;
    const projV = new THREE.Vector3();
    const worldV = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      /* Auto-rotate + tilt */
      if (!dragging) {
        globe.rotation.y += autoRot;
        // gentle mouse-driven tilt
        const ny = -(mouse.sy / h - 0.5) * 2;
        globe.rotation.x += (ny * 0.22 - globe.rotation.x) * 0.025;
      }

      globe.updateMatrixWorld();

      /* Update dot depth-brightness + find hover */
      let hoverIdx = -1, hoverDist = 22; // px threshold
      let hoverSX = 0, hoverSY = 0;

      for (let i = 0; i < N; i++) {
        worldV.copy(localPts[i]).applyMatrix4(globe.matrixWorld);

        /* Depth: camera at z=58, dot world-z encodes facing.
           Normalise by globe radius to get 0..1 facing factor. */
        const facing = Math.max(0, worldV.z / (R + 2));   // 0 = edge/back, 1 = front centre
        const bright = Math.pow(facing, 1.4) * 1.6;       // smooth falloff, slight over-expose front

        dotColors[i * 3]     = Math.min(baseRGB[i * 3]     * bright, 1);
        dotColors[i * 3 + 1] = Math.min(baseRGB[i * 3 + 1] * bright, 1);
        dotColors[i * 3 + 2] = Math.min(baseRGB[i * 3 + 2] * bright, 1);

        /* Hover detection (front dots only) */
        if (facing > 0.08 && mouse.sx > 0) {
          projV.copy(worldV).project(camera);
          const sx = (projV.x  + 1) / 2 * w;
          const sy = (-projV.y + 1) / 2 * h;
          const d  = Math.hypot(sx - mouse.sx, sy - mouse.sy);
          if (d < hoverDist) { hoverDist = d; hoverIdx = i; hoverSX = sx; hoverSY = sy; }
        }
      }

      dotGeo.attributes.color.needsUpdate = true;

      /* Tooltip */
      if (tipRef.current) {
        if (hoverIdx >= 0) {
          const sk = allSkills[hoverIdx];
          const tip = tipRef.current;
          tip.style.display = 'block';
          tip.style.left    = hoverSX + 'px';
          tip.style.top     = (hoverSY - 42) + 'px';
          tip.textContent   = sk.name;
          tip.style.color   = GROUP_CSS[sk.group] ?? '#fff';
          tip.style.borderColor = (GROUP_CSS[sk.group] ?? '#6366f1') + '55';
        } else {
          tipRef.current.style.display = 'none';
        }
      }
      mount.style.cursor = hoverIdx >= 0 ? 'pointer' : dragging ? 'grabbing' : 'grab';

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onHover);
      mount.removeEventListener('mousedown', onDown);
      mount.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onUp);
      mount.removeEventListener('touchstart', onTStart);
      mount.removeEventListener('touchmove',  onTMove);
      mount.removeEventListener('touchend',   onTEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: 460 }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* HTML tooltip — positioned by JS in animation loop */}
      <div
        ref={tipRef}
        style={{
          display: 'none',
          position: 'absolute',
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
          background: 'rgba(5, 5, 15, 0.92)',
          border: '1px solid #6366f155',
          borderRadius: 8,
          padding: '5px 14px',
          fontSize: '0.78rem',
          fontWeight: 700,
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
          letterSpacing: '0.04em',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      />
    </div>
  );
}
