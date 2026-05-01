'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const onEnter = () => ringEl.style.transform += ' scale(2)';
    const onLeave = () => {
      // reset scale
    };

    window.addEventListener('mousemove', onMove);

    // interactive targets
    const targets = document.querySelectorAll('a, button, [data-hover]');
    targets.forEach(t => {
      t.addEventListener('mouseenter', onEnter);
      t.addEventListener('mouseleave', onLeave);
    });

    // Smooth ring follow
    let rafId: number;
    const follow = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      rafId = requestAnimationFrame(follow);
    };
    follow();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#6366f1',
          boxShadow: '0 0 10px #6366f1, 0 0 20px rgba(99,102,241,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s',
          mixBlendMode: 'screen',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(99,102,241,0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  );
}
