'use client';

import { useRef, ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  /** How much of the cursor offset to translate (0–1). Default 0.38 */
  strength?: number;
}

/**
 * Wraps children in a div that magnetically follows the cursor
 * when it's within ~70 px of the element's centre.
 */
export default function MagneticWrapper({ children, style, strength = 0.38 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform  = `translate(${dx}px, ${dy}px)`;
    el.style.transition = 'transform 0.12s ease';
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform  = 'translate(0, 0)';
    el.style.transition = 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  };

  return (
    <div
      ref={ref}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
