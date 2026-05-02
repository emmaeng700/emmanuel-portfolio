'use client';

/**
 * ScrollReveal — globally observes every .card and [data-sr] element.
 * When a section scrolls into view its cards streak in one by one
 * with a short stagger delay, giving the whole site a modern cascade feel.
 */

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Collect all revealable elements
    const targets = Array.from(
      document.querySelectorAll('.card, [data-sr]'),
    ) as HTMLElement[];

    if (!targets.length) return;

    // ── Set initial hidden state ────────────────────────────
    targets.forEach((el) => {
      el.style.opacity        = '0';
      el.style.transform      = 'translateY(26px)';
      el.style.transition     = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)';
      el.style.willChange     = 'opacity, transform';
    });

    // ── Group by nearest section (or body) ─────────────────
    const sectionMap = new Map<Element, HTMLElement[]>();
    targets.forEach((el) => {
      const sec = el.closest('section') ?? document.body;
      if (!sectionMap.has(sec)) sectionMap.set(sec, []);
      sectionMap.get(sec)!.push(el);
    });

    // ── One observer per section ────────────────────────────
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const cards = sectionMap.get(entry.target) ?? [];
          cards.forEach((el, i) => {
            // Stagger: 80 ms between each card
            setTimeout(() => {
              el.style.opacity   = '1';
              el.style.transform = 'translateY(0)';
            }, i * 80);
          });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -48px 0px' },
    );

    sectionMap.forEach((_, sec) => io.observe(sec));

    return () => io.disconnect();
  }, []);

  return null;
}
