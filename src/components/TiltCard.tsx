'use client';

import { useRef, MouseEvent } from 'react';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function TiltCard({ children, style, className }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -8;
    const tiltY = ((x - cx) / cx) * 8;

    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.opacity = '1';
  };

  const handleLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    glow.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        position: 'relative',
        transition: 'transform 0.15s ease',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
      }}
    >
      {/* Spotlight glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}
