'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { skills } from '@/data/resume';

/* ── Color map (matches Skills.tsx) ───────────────────────── */
const COLORS: Record<string, { bg: string; fg: string }> = {
  Languages:                { bg: '#1e1b4b', fg: '#818cf8' },
  'Infrastructure & Cloud': { bg: '#064e3b', fg: '#34d399' },
  'Frameworks & Libraries': { bg: '#451a03', fg: '#fbbf24' },
  Tools:                    { bg: '#500724', fg: '#f472b6' },
  Concepts:                 { bg: '#082f49', fg: '#38bdf8' },
};

/* ── Canvas text → Sprite ──────────────────────────────────── */
function makeSprite(text: string, bg: string, fg: string): THREE.Sprite {
  const W = 320, H = 68, R = 26;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Pill
  ctx.beginPath();
  ctx.moveTo(R, 0);
  ctx.lineTo(W - R, 0);
  ctx.quadraticCurveTo(W, 0, W, R);
  ctx.lineTo(W, H - R);
  ctx.quadraticCurveTo(W, H, W - R, H);
  ctx.lineTo(R, H);
  ctx.quadraticCurveTo(0, H, 0, H - R);
  ctx.lineTo(0, R);
  ctx.quadraticCurveTo(0, 0, R, 0);
  ctx.closePath();
  ctx.fillStyle = bg + 'dd';
  ctx.fill();
  ctx.strokeStyle = fg;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Text
  ctx.fillStyle = fg;
  ctx.font = 'bold 21px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, H / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(19, 4.0, 1);
  return sprite;
}

/* ── Fibonacci sphere distribution ────────────────────────── */
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

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let w = mount.clientWidth;
    let h = mount.clientHeight;

    /* ── Scene ─────────────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.z = 70;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Globe group ───────────────────────────────────────── */
    const globe = new THREE.Group();
    scene.add(globe);

    // Wireframe sphere
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(23, 28, 20),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.055 }),
    ));

    // Equatorial glow ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(24.5, 0.18, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.22 }),
    );
    ring.rotation.x = Math.PI / 2;
    globe.add(ring);

    // Meridian ring (tilted 90°)
    const ring2 = ring.clone();
    ring2.rotation.x = 0;
    ring2.rotation.y = Math.PI / 4;
    globe.add(ring2);

    /* ── Skill sprites ─────────────────────────────────────── */
    const allSkills: { text: string; group: string }[] = [];
    for (const [group, items] of Object.entries(skills)) {
      for (const item of items as string[]) {
        allSkills.push({ text: item, group });
      }
    }

    const N = allSkills.length;
    const RADIUS = 33;

    allSkills.forEach((sk, i) => {
      const c = COLORS[sk.group] ?? COLORS.Tools;
      const sprite = makeSprite(sk.text, c.bg, c.fg);
      const [x, y, z] = fibSphere(N, i, RADIUS);
      sprite.position.set(x, y, z);
      globe.add(sprite);
    });

    /* ── Mouse ─────────────────────────────────────────────── */
    let targetRotX = 0;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let autoRotSpeed = 0.0028;

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = (e.clientX - lastX) * 0.008;
        const dy = (e.clientY - lastY) * 0.006;
        globe.rotation.y += dx;
        globe.rotation.x += dy;
        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        targetRotX = -(e.clientY / window.innerHeight - 0.5) * 0.6;
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      autoRotSpeed = 0;
      (mount as HTMLElement).style.cursor = 'grabbing';
    };
    const onMouseUp = () => {
      isDragging = false;
      autoRotSpeed = 0.0028;
      (mount as HTMLElement).style.cursor = 'grab';
    };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    /* ── Touch drag ─────────────────────────────────────────── */
    let touchX = 0, touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; autoRotSpeed = 0; };
    const onTouchMove  = (e: TouchEvent) => {
      globe.rotation.y += (e.touches[0].clientX - touchX) * 0.01;
      globe.rotation.x += (e.touches[0].clientY - touchY) * 0.008;
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { autoRotSpeed = 0.0028; };
    mount.addEventListener('touchstart', onTouchStart, { passive: true });
    mount.addEventListener('touchmove',  onTouchMove,  { passive: true });
    mount.addEventListener('touchend',   onTouchEnd);

    /* ── Resize ─────────────────────────────────────────────── */
    const onResize = () => {
      w = mount.clientWidth; h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ─────────────────────────────────────────────── */
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        globe.rotation.y  += autoRotSpeed;
        globe.rotation.x  += (targetRotX - globe.rotation.x) * 0.03;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      mount.removeEventListener('touchstart', onTouchStart);
      mount.removeEventListener('touchmove',  onTouchMove);
      mount.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: 500, cursor: 'grab' }}
      aria-label="3D skills globe — drag to rotate"
    />
  );
}
