'use client';

/**
 * Nav component — two modes:
 *
 * MOBILE  (≤768 px): fixed bottom tab bar.
 * DESKTOP (>768 px): floating vertical pill that slides in from whichever
 *                    edge the mouse approaches (left or right, within 48 px).
 *                    Labels expand on hover; slides back out when the mouse
 *                    leaves both the edge zone and the panel itself.
 */

import { useEffect, useRef, useState } from 'react';
import { Home, User, Briefcase, FolderOpen, Mail } from 'lucide-react';

const TABS = [
  { id: 'hero',       label: 'Home',     Icon: Home       },
  { id: 'about',      label: 'About',    Icon: User       },
  { id: 'experience', label: 'Work',     Icon: Briefcase  },
  { id: 'projects',   label: 'Projects', Icon: FolderOpen },
  { id: 'contact',    label: 'Contact',  Icon: Mail       },
] as const;

const EDGE_THRESHOLD = 48; // px from left/right edge that triggers the panel

export default function MobileNav() {
  const [isMobile, setIsMobile] = useState(false);
  const [active,   setActive]   = useState<string>('hero');

  /* Desktop-only state */
  const [edgeSide, setEdgeSide] = useState<'left' | 'right' | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Breakpoint detection ───────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Active section tracking (always on) ───────────────── */
  useEffect(() => {
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
  }, []);

  /* ── Desktop edge-hover detection ──────────────────────── */
  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      const nearLeft  = e.clientX < EDGE_THRESHOLD;
      const nearRight = e.clientX > window.innerWidth - EDGE_THRESHOLD;

      if (nearLeft || nearRight) {
        if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
        setEdgeSide(nearLeft ? 'left' : 'right');
        setPanelOpen(true);
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const handlePanelLeave = () => {
    hideTimer.current = setTimeout(() => {
      setPanelOpen(false);
      setEdgeSide(null);
    }, 300);
  };
  const handlePanelEnter = () => {
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ══════════════════════════════════════════════════════════
     MOBILE — bottom tab bar
  ══════════════════════════════════════════════════════════ */
  if (isMobile) {
    return (
      <>
        <div style={{ height: 72 }} />
        <nav style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          height: 64,
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          borderTop: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        }}>
          {TABS.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button key={id} onClick={() => goTo(id)} aria-label={label} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 3, flex: 1, height: '100%',
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px',
                WebkitTapHighlightColor: 'transparent',
                color: isActive ? '#6366f1' : '#55556a',
                transition: 'color 0.2s ease',
              }}>
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 28, borderRadius: 10,
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                  transition: 'background 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow: isActive ? '0 0 12px rgba(99,102,241,0.3)' : 'none',
                }}>
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                </span>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.04em',
                  fontFamily: 'monospace', textTransform: 'uppercase',
                }}>{label}</span>
              </button>
            );
          })}
        </nav>
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════
     DESKTOP — vertical edge panel
  ══════════════════════════════════════════════════════════ */
  const fromLeft = edgeSide === 'left' || (!edgeSide && panelOpen);
  const slide    = panelOpen ? '0%' : (fromLeft ? '-110%' : '110%');

  return (
    <nav
      onMouseEnter={handlePanelEnter}
      onMouseLeave={handlePanelLeave}
      style={{
        position: 'fixed',
        top: '50%',
        left: fromLeft ? 12 : undefined,
        right: !fromLeft ? 12 : undefined,
        transform: `translateY(-50%) translateX(${slide})`,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: '10px 6px',
        borderRadius: 18,
        background: 'rgba(10,10,15,0.88)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(99,102,241,0.22)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.08)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.28,0.64,1)',
        pointerEvents: panelOpen ? 'auto' : 'none',
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => goTo(id)}
            title={label}
            aria-label={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 12,
              background: isActive ? 'rgba(99,102,241,0.14)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? '#6366f1' : '#8888aa',
              transition: 'background 0.18s ease, color 0.18s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.07)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 22, height: 22, flexShrink: 0,
            }}>
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.6} />
            </span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}>
              {label}
            </span>
          </button>
        );
      })}

      {/* Subtle edge indicator stripe */}
      <div style={{
        position: 'absolute',
        top: '50%',
        [fromLeft ? 'left' : 'right']: -1,
        transform: 'translateY(-50%)',
        width: 3,
        height: 40,
        borderRadius: 99,
        background: 'linear-gradient(to bottom, transparent, #6366f1, transparent)',
        opacity: 0.6,
      }} />
    </nav>
  );
}
