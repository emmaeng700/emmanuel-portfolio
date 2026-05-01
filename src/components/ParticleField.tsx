'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Organic flow-field angle derived from sin/cos composition */
function flowAngle(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.038 + t * 0.35) *
    Math.cos(y * 0.028 + t * 0.22) *
    Math.PI * 2.8
  );
}

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const w = mount.clientWidth;
    const h = mount.clientHeight;

    /* ── Scene ─────────────────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Particles ─────────────────────────────────────────── */
    const COUNT = 170;

    // Typed arrays for SoA layout — fast cache access in tight loop
    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const pz = new Float32Array(COUNT);
    const ox = new Float32Array(COUNT); // home
    const oy = new Float32Array(COUNT);
    const oz = new Float32Array(COUNT);
    const vx = new Float32Array(COUNT);
    const vy = new Float32Array(COUNT);
    const vz = new Float32Array(COUNT);

    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 170;
      const y = (Math.random() - 0.5) * 125;
      const z = (Math.random() - 0.5) * 55;
      px[i] = ox[i] = x;
      py[i] = oy[i] = y;
      pz[i] = oz[i] = z;
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      // Base color: #6366f1 indigo
      colors[i * 3]     = 0.388;
      colors[i * 3 + 1] = 0.400;
      colors[i * 3 + 2] = 0.945;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

    const mat = new THREE.PointsMaterial({
      size: 1.15,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      vertexColors: true,
    });
    scene.add(new THREE.Points(geo, mat));

    /* ── Constellation lines ───────────────────────────────── */
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.10,
    });
    let linesMesh: THREE.LineSegments | null = null;

    const updateLines = () => {
      const pts: number[] = [];
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const dz = pz[i] - pz[j];
          if (dx * dx + dy * dy + dz * dz < 900) {
            pts.push(px[i], py[i], pz[i], px[j], py[j], pz[j]);
          }
        }
      }
      if (linesMesh) scene.remove(linesMesh);
      const lg = new THREE.BufferGeometry();
      lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
      linesMesh = new THREE.LineSegments(lg, lineMat);
      scene.add(linesMesh);
    };

    /* ── Mouse / cursor ────────────────────────────────────── */
    const mouse   = { nx: 0, ny: 0 };
    const mouseW  = new THREE.Vector3();
    const cameraTarget = { x: 0, y: 0, z: 80 };
    const raycaster = new THREE.Raycaster();
    const zPlane    = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (e: MouseEvent) => {
      mouse.nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ny = -(e.clientY / window.innerHeight - 0.5) * 2;
      raycaster.setFromCamera(new THREE.Vector2(mouse.nx, mouse.ny), camera);
      raycaster.ray.intersectPlane(zPlane, mouseW);
      cameraTarget.x = mouse.nx * 9;
      cameraTarget.y = mouse.ny * 6;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Click burst ───────────────────────────────────────── */
    interface Burst { x: number; y: number; age: number }
    const bursts: Burst[] = [];

    const onClickBurst = () => {
      // Only burst when hero is visible
      if (window.scrollY < window.innerHeight) {
        bursts.push({ x: mouseW.x, y: mouseW.y, age: 0 });
      }
    };
    window.addEventListener('click', onClickBurst);

    /* ── Resize ────────────────────────────────────────────── */
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation ─────────────────────────────────────────── */
    const REPEL_R  = 26;
    const REPEL_F  = 0.18;
    const SPRING   = 0.0025;
    const DAMP     = 0.945;
    const FLOW     = 0.017;
    const MAX_V    = 1.1;
    // indigo base
    const BR = 0.388, BG = 0.400, BB = 0.945;

    let frame = 0;
    let time  = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      time += 0.003;

      const scrollFrac = Math.min(window.scrollY / 700, 1);

      for (let i = 0; i < COUNT; i++) {
        /* Flow field */
        const angle = flowAngle(px[i], py[i], time);
        vx[i] += Math.cos(angle) * FLOW;
        vy[i] += Math.sin(angle) * FLOW;

        /* Spring home */
        vx[i] += (ox[i] - px[i]) * SPRING;
        vy[i] += (oy[i] - py[i]) * SPRING;
        vz[i] += (oz[i] - pz[i]) * SPRING;

        /* Cursor repulsion */
        const cdx  = px[i] - mouseW.x;
        const cdy  = py[i] - mouseW.y;
        const cd2  = cdx * cdx + cdy * cdy;
        const cdist = Math.sqrt(cd2);

        if (cdist < REPEL_R && cdist > 0.1) {
          const f = (1 - cdist / REPEL_R) * REPEL_F;
          vx[i] += (cdx / cdist) * f;
          vy[i] += (cdy / cdist) * f;
        }

        /* Burst explosions */
        for (const b of bursts) {
          const bdx = px[i] - b.x;
          const bdy = py[i] - b.y;
          const bd  = Math.sqrt(bdx * bdx + bdy * bdy);
          if (bd < 60 && bd > 0.1) {
            const f = (1 - bd / 60) * 1.4 * Math.max(0, 1 - b.age / 18);
            vx[i] += (bdx / bd) * f;
            vy[i] += (bdy / bd) * f;
          }
        }

        /* Damp + clamp */
        vx[i] *= DAMP;
        vy[i] *= DAMP;
        vz[i] *= DAMP;
        const spd = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        if (spd > MAX_V) { vx[i] = (vx[i] / spd) * MAX_V; vy[i] = (vy[i] / spd) * MAX_V; }

        /* Integrate */
        px[i] += vx[i];
        py[i] += vy[i];
        pz[i] += vz[i];

        /* Write position */
        positions[i * 3]     = px[i];
        positions[i * 3 + 1] = py[i];
        positions[i * 3 + 2] = pz[i];

        /* Color: indigo → bright cyan-white when cursor close */
        const prox = Math.max(0, 1 - cdist / REPEL_R);
        colors[i * 3]     = BR + prox * 0.55;
        colors[i * 3 + 1] = BG + prox * 0.55;
        colors[i * 3 + 2] = BB - prox * 0.05;
      }

      /* Age + prune bursts */
      for (let b = bursts.length - 1; b >= 0; b--) {
        if (++bursts[b].age > 28) bursts.splice(b, 1);
      }

      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate    = true;

      if (frame % 3 === 0) updateLines();

      /* Camera: parallax + scroll zoom-out */
      camera.position.x += (cameraTarget.x - camera.position.x) * 0.03;
      camera.position.y += (cameraTarget.y - camera.position.y) * 0.03;
      camera.position.z += (80 + scrollFrac * 35 - camera.position.z) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClickBurst);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
