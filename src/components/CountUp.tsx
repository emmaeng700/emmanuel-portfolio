'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string; // e.g. "20+" or "3+"
  style?: React.CSSProperties;
}

export default function CountUp({ value, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState('0');
  const [started, setStarted] = useState(false);

  // Parse number and suffix (e.g. "20+" → num=20, suffix="+")
  const num = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let current = 0;
    const inc = num / steps;
    const timer = setInterval(() => {
      current += inc;
      if (current >= num) {
        setDisplayed(`${num}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayed(`${Math.floor(current)}${suffix}`);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [started, num, suffix]);

  return <span ref={ref} style={style}>{displayed}</span>;
}
