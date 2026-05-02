'use client';

/**
 * MobileNav — fixed bottom tab bar, mobile-only (≤768 px).
 * Highlights the active section as the user scrolls.
 */

import { useEffect, useState } from 'react';
import { Home, User, Briefcase, FolderOpen, Mail } from 'lucide-react';

const TABS = [
  { id: 'hero',       label: 'Home',     Icon: Home       },
  { id: 'about',      label: 'About',    Icon: User       },
  { id: 'experience', label: 'Work',     Icon: Briefcase  },
  { id: 'projects',   label: 'Projects', Icon: FolderOpen },
  { id: 'contact',    label: 'Contact',  Icon: Mail       },
] as const;

export default function MobileNav() {
  const [visible, setVisible]   = useState(false);
  const [active,  setActive]    = useState<string>('hero');

  /* ── Show only on narrow screens ────────────────────────── */
  useEffect(() => {
    const check = () => setVisible(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Track active section ────────────────────────────────── */
  useEffect(() => {
    if (!visible) return;
    const sections = TABS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { threshold: 0.3 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [visible]);

  if (!visible) return null;

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Spacer so page content isn't hidden under the bar */}
      <div style={{ height: 72 }} />

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 64,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderTop: '1px solid rgba(99, 102, 241, 0.2)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
      }}>
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => goTo(id)}
              aria-label={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                flex: 1,
                height: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 4px',
                WebkitTapHighlightColor: 'transparent',
                color: isActive ? '#6366f1' : '#55556a',
                transition: 'color 0.2s ease',
              }}
            >
              {/* Icon pill — lifts + glows when active */}
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 28,
                borderRadius: 10,
                background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                transform: isActive ? 'translateY(-2px)' : 'none',
                transition: 'background 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: isActive ? '0 0 12px rgba(99,102,241,0.3)' : 'none',
              }}>
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
              </span>

              {/* Label */}
              <span style={{
                fontSize: '0.58rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
