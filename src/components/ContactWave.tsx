'use client';

/**
 * Expanding ring-wave portal for the Contact section.
 * Concentric glowing rings expand outward like signal pulses,
 * with two slow counter-rotating orbital rings.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ContactWave() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let w = mount.clientWidth;
    let h = mount.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Expanding pulse rings ───────────────────────────── */
    const RING_COUNT = 5;
    interface PulseRing { mesh: THREE.Mesh; phase: number }
    const pulseRings: PulseRing[] = [];

    for (let i = 0; i < RING_COUNT; i++) {
      const mesh = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.78, 80),
        new THREE.MeshBasicMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      scene.add(mesh);
      pulseRings.push({ mesh, phase: i / RING_COUNT });
    }

    /* ── Orbiting arcs ───────────────────────────────────── */
    function makeArc(radius: number, segments: number, startAngle: number, arcLen: number, color: number, opacity: number): THREE.Line {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const a = startAngle + (i / segments) * arcLen;
        pts.push(new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), 0));
      }
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
      );
    }

    const arc1 = makeArc(10, 120, 0, Math.PI * 1.4, 0x8b5cf6, 0.35);
    const arc2 = makeArc(14, 120, Math.PI, Math.PI * 1.2, 0x6366f1, 0.22);
    const arc3 = makeArc(7,  80,  Math.PI * 0.3, Math.PI * 1.7, 0xa78bfa, 0.18);
    scene.add(arc1, arc2, arc3);

    /* Small dot particles distributed on a ring */
    const DOT_COUNT = 80;
    const dotPos = new Float32Array(DOT_COUNT * 3);
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3).setUsage(THREE.DynamicDrawUsage));

    const dotTex = (() => {
      const c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      const ctx = c.getContext('2d')!;
      const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, '#a78bfaff');
      g.addColorStop(1, '#a78bfa00');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(c);
    })();

    scene.add(new THREE.Points(
      dotGeo,
      new THREE.PointsMaterial({
        size: 0.55,
        map: dotTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: 0xa78bfa,
      }),
    ));

    /* ── Central glow orb ────────────────────────────────── */
    const orbGeo = (() => {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const ctx = c.getContext('2d')!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0.0, '#6366f1ff');
      g.addColorStop(0.4, '#6366f155');
      g.addColorStop(1.0, '#6366f100');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();

    const orb = new THREE.Sprite(new THREE.SpriteMaterial({
      map: orbGeo, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    orb.scale.setScalar(5);
    scene.add(orb);

    /* ── Resize ──────────────────────────────────────────── */
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

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.006;

      /* Expanding pulse rings */
      pulseRings.forEach((pr) => {
        pr.phase = (pr.phase + 0.0025) % 1;
        const p = pr.phase;
        const scale = 1 + p * 18;
        pr.mesh.scale.setScalar(scale);
        // fade in then out
        const fade = p < 0.15 ? p / 0.15 : (1 - p) / 0.85;
        (pr.mesh.material as THREE.MeshBasicMaterial).opacity = fade * 0.28;
      });

      /* Counter-rotating arcs */
      arc1.rotation.z =  time * 0.28;
      arc2.rotation.z = -time * 0.18;
      arc3.rotation.z =  time * 0.40;

      /* Orbiting dots */
      for (let i = 0; i < DOT_COUNT; i++) {
        const band  = i < DOT_COUNT / 2 ? 1 : -1;
        const angle = (i / (DOT_COUNT / 2)) * Math.PI * 2 + time * band * 0.6;
        const rInner = 9, rOuter = 16;
        const r = rInner + (rOuter - rInner) * ((i % (DOT_COUNT / 2)) / (DOT_COUNT / 2));
        dotPos[i * 3]     = r * Math.cos(angle);
        dotPos[i * 3 + 1] = r * Math.sin(angle) * 0.35; // flatten into ellipse
        dotPos[i * 3 + 2] = Math.sin(angle + time) * 1.5;
      }
      dotGeo.attributes.position.needsUpdate = true;

      /* Central orb pulse */
      const pulse = 1 + Math.sin(time * 2.2) * 0.15;
      orb.scale.setScalar(5 * pulse);
      (orb.material as THREE.SpriteMaterial).opacity = 0.55 + Math.sin(time * 2.2) * 0.12;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: 220, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
