'use client';

/**
 * Animated network graph for the OpenSource section.
 * Shows Emmanuel's central node connected to React, Kafka, K8s, and pgjdbc.
 * Pulses travel along edges — green for merged PRs, amber for active.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Node {
  label: string;
  x: number;
  y: number;
  color: number;
  cssColor: string;
  status: 'merged' | 'active' | 'center';
  radius: number;
}

const NODES: Node[] = [
  { label: 'Emmanuel',       x:  0,    y:  0,   color: 0x6366f1, cssColor: '#6366f1', status: 'center', radius: 3.2 },
  { label: 'facebook/react', x: -13,   y:  8,   color: 0xf59e0b, cssColor: '#f59e0b', status: 'active', radius: 2.0 },
  { label: 'apache/kafka',   x:  13,   y:  8,   color: 0x34d399, cssColor: '#34d399', status: 'merged', radius: 2.0 },
  { label: 'kubernetes',     x:  0,    y: -10,  color: 0x34d399, cssColor: '#34d399', status: 'merged', radius: 2.0 },
  { label: 'pgjdbc',         x: -12,   y: -6,   color: 0x34d399, cssColor: '#34d399', status: 'merged', radius: 2.0 },
];

/* Glowing circle texture */
function circleTex(color: string): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0.0, color + 'ff');
  g.addColorStop(0.45, color + 'bb');
  g.addColorStop(1.0,  color + '00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export default function RepoGraph() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let w = mount.clientWidth;
    let h = mount.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 500);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Node sprites ────────────────────────────────────── */
    NODES.forEach((nd) => {
      const tex  = circleTex(nd.cssColor);
      const mat  = new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const sp   = new THREE.Sprite(mat);
      sp.scale.setScalar(nd.radius * 2.2);
      sp.position.set(nd.x, nd.y, 0);
      scene.add(sp);

      /* Subtle outer ring */
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(nd.radius * 1.1, nd.radius * 1.35, 48),
        new THREE.MeshBasicMaterial({ color: nd.color, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
      );
      ring.position.set(nd.x, nd.y, -0.1);
      scene.add(ring);
    });

    /* ── Edges ────────────────────────────────────────────── */
    // Edges connect center (index 0) to each repo node
    const edgeIndices = [1, 2, 3, 4]; // indices into NODES array (repos)

    // Static edge lines
    edgeIndices.forEach((ri) => {
      const start  = new THREE.Vector3(NODES[0].x, NODES[0].y, 0);
      const end    = new THREE.Vector3(NODES[ri].x, NODES[ri].y, 0);
      const edgeGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
      const merged  = NODES[ri].status === 'merged';
      scene.add(new THREE.Line(
        edgeGeo,
        new THREE.LineBasicMaterial({
          color: merged ? 0x34d399 : 0xf59e0b,
          transparent: true,
          opacity: 0.22,
        }),
      ));
    });

    /* ── Pulse beams ──────────────────────────────────────── */
    // One animated particle per edge traveling from center to repo
    interface Pulse { t: number; speed: number; nodeIdx: number; sprite: THREE.Sprite }
    const pulses: Pulse[] = [];

    edgeIndices.forEach((ri, j) => {
      const merged = NODES[ri].status === 'merged';
      const pTex   = circleTex(merged ? '#34d399' : '#f59e0b');
      const pMat   = new THREE.SpriteMaterial({ map: pTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const sp     = new THREE.Sprite(pMat);
      sp.scale.setScalar(1.4);
      scene.add(sp);
      pulses.push({ t: j / edgeIndices.length, speed: 0.004 + Math.random() * 0.003, nodeIdx: ri, sprite: sp });
    });

    /* ── HTML labels ──────────────────────────────────────── */
    // Labels as overlay divs positioned by projecting 3D → screen
    const labelEls: HTMLDivElement[] = [];
    NODES.forEach((nd) => {
      const el = document.createElement('div');
      el.textContent = nd.label;
      el.style.cssText = `
        position:absolute; pointer-events:none; white-space:nowrap;
        font-size:0.7rem; font-weight:700; font-family:monospace;
        color:${nd.cssColor}; text-shadow:0 0 8px ${nd.cssColor}88;
        transform:translate(-50%,-50%); opacity:0.9;
      `;
      mount.style.position = 'relative';
      mount.appendChild(el);
      labelEls.push(el);
    });

    /* ── Resize ───────────────────────────────────────────── */
    const onResize = () => {
      w = mount.clientWidth; h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ─────────────────────────────────────────── */
    let animId: number;
    let time = 0;
    const tmpV = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      /* Gentle scene tilt */
      scene.rotation.z = Math.sin(time * 0.18) * 0.06;

      /* Pulse beams */
      pulses.forEach((p) => {
        p.t = (p.t + p.speed) % 1;
        const start = NODES[0];
        const end   = NODES[p.nodeIdx];
        p.sprite.position.set(
          start.x + (end.x - start.x) * p.t,
          start.y + (end.y - start.y) * p.t,
          0.5,
        );
        // Fade in/out at endpoints
        const fade = Math.sin(p.t * Math.PI);
        (p.sprite.material as THREE.SpriteMaterial).opacity = fade * 0.9;
      });

      /* Update HTML label positions */
      NODES.forEach((nd, i) => {
        tmpV.set(nd.x, nd.y, 0).applyMatrix4(scene.matrixWorld).project(camera);
        const sx = ((tmpV.x + 1) / 2) * w;
        const sy = ((-tmpV.y + 1) / 2) * h;
        const el = labelEls[i];
        // Clamp labels so they never clip at edges
        const labelX = Math.max(36, Math.min(w - 36, sx));
        el.style.left = labelX + 'px';
        el.style.top  = Math.min(h - 16, sy + NODES[i].radius * 13) + 'px';
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      labelEls.forEach((el) => { if (mount.contains(el)) mount.removeChild(el); });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: 240, position: 'relative', overflow: 'hidden' }}
      aria-hidden="true"
    />
  );
}
