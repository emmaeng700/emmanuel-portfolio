'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${pct}%`,
        height: 3,
        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6ee7f7)',
        zIndex: 9999,
        transition: 'width 0.08s linear',
        boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)',
        borderRadius: '0 2px 2px 0',
      }}
    />
  );
}
