'use client';

/**
 * Rotating dodecahedron with glowing edges and orbiting particles —
 * decorative Three.js element for the About section.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CrystalShape() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let w = mount.clientWidth;
    let h = mount.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
    camera.position.z = 38;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Dodecahedron ──────────────────────────────────────── */
    const geo  = new THREE.DodecahedronGeometry(9, 0);
    const wire = new THREE.WireframeGeometry(geo);

    const edges = new THREE.LineSegments(
      wire,
      new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.55 }),
    );
    scene.add(edges);

    /* Subtle translucent faces */
    const faceMesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.04,
        side: THREE.FrontSide,
      }),
    );
    scene.add(faceMesh);

    /* Vertex glow dots */
    const positions = geo.attributes.position;
    const seen = new Set<string>();
    const vPts: number[] = [];
    for (let i = 0; i < positions.count; i++) {
      const key = [
        Math.round(positions.getX(i) * 100),
        Math.round(positions.getY(i) * 100),
        Math.round(positions.getZ(i) * 100),
      ].join(',');
      if (!seen.has(key)) {
        seen.add(key);
        vPts.push(positions.getX(i), positions.getY(i), positions.getZ(i));
      }
    }
    const vGeo = new THREE.BufferGeometry();
    vGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vPts), 3));

    /* Glow sprite texture */
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, '#a78bfaff');
    g.addColorStop(1, '#a78bfa00');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);

    const vMat = new THREE.PointsMaterial({
      size: 1.8,
      map: new THREE.CanvasTexture(c),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xa78bfa,
    });
    scene.add(new THREE.Points(vGeo, vMat));

    /* ── Orbiting ring of particles ────────────────────────── */
    const RING_COUNT = 60;
    const ringPos = new Float32Array(RING_COUNT * 3);
    const rColors = new Float32Array(RING_COUNT * 3);
    for (let i = 0; i < RING_COUNT; i++) {
      rColors[i * 3] = 0.388; rColors[i * 3 + 1] = 0.4; rColors[i * 3 + 2] = 0.945;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3).setUsage(THREE.DynamicDrawUsage));
    ringGeo.setAttribute('color',    new THREE.BufferAttribute(rColors,  3));
    const ringPts = new THREE.Points(
      ringGeo,
      new THREE.PointsMaterial({ size: 0.9, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true }),
    );
    scene.add(ringPts);

    /* ── Mouse parallax ────────────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      w = mount.clientWidth; h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ───────────────────────────────────────────── */
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.008;

      /* Rotate shape */
      edges.rotation.x += 0.003;
      edges.rotation.y += 0.005;
      faceMesh.rotation.copy(edges.rotation);

      /* Camera parallax */
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      /* Orbit ring — two counter-rotating bands */
      for (let i = 0; i < RING_COUNT; i++) {
        const band = i < RING_COUNT / 2 ? 1 : -1;
        const base = (i / (RING_COUNT / 2)) * Math.PI * 2;
        const t    = base + time * band;
        const tilt = band * 0.6; // tilt the orbital plane
        const rx   = 13;
        const ry   = 4;
        ringPos[i * 3]     = rx * Math.cos(t);
        ringPos[i * 3 + 1] = ry * Math.sin(t) * Math.cos(tilt);
        ringPos[i * 3 + 2] = ry * Math.sin(t) * Math.sin(tilt);
      }
      ringGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: 300, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
