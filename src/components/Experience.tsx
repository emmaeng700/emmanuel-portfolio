'use client';

import { experience } from '@/data/resume';

/* ── Detect whether an experience is currently active ─────── */
const MONTH_IDX: Record<string, number> = {
  Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
  Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11,
};

function isActive(period: string): boolean {
  if (/present/i.test(period)) return true;
  // Parse end date like "Aug 2026"
  const m = period.match(/([A-Za-z]{3})\s+(\d{4})\s*$/);
  if (m) {
    const now = new Date();
    const ey  = +m[2];
    const em  = MONTH_IDX[m[1]] ?? 0;
    return ey > now.getFullYear() || (ey === now.getFullYear() && em >= now.getMonth());
  }
  return false;
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: '96px 24px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <style>{`
        @keyframes exp-ping {
          0%   { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes exp-pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.6; }
        }
        @keyframes card-glow {
          0%,100% { box-shadow: 0 0 0 1px rgba(52,211,153,0.3), 0 8px 32px rgba(52,211,153,0.07); }
          50%     { box-shadow: 0 0 0 1px rgba(52,211,153,0.65), 0 8px 40px rgba(52,211,153,0.16); }
        }
        /* ── responsive: collapse to left-aligned on small screens ── */
        /* Hide inline period on desktop — the meta column already shows it */
        .exp-mobile-meta { display: none; }

        @media (max-width: 700px) {
          .exp-row        { flex-direction: column !important; }
          .exp-meta-col   { display: none !important; }
          /* Hide the timeline spine (dot + line) on mobile — cards stack directly */
          .exp-center     { display: none !important; }
          .exp-card-col   { padding-left: 0 !important; padding-right: 0 !important;
                            padding-bottom: 32px !important; }
          .exp-card-col-left { padding-right: 0 !important; padding-left: 0 !important;
                               padding-bottom: 32px !important; }
          /* Show inline period again on mobile since meta column is hidden */
          .exp-mobile-meta { display: block !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* ── Section header ───────────────────────────────── */}
        <div style={{ marginBottom: 64 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Experience</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Where I&apos;ve worked
          </h2>
        </div>

        {/* ── Alternating timeline ─────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {experience.map((exp, i) => {
            const isLeft = i % 2 === 0;   // card on left for even indices
            const active = isActive(exp.period);

            /* ── Card content ────────────────────────────── */
            const card = (
              <div
                className="card"
                style={{
                  padding: 28,
                  position: 'relative',
                  overflow: 'hidden',
                  ...(active ? { animation: 'card-glow 2.8s ease-in-out infinite' } : {}),
                }}
              >
                {/* Active shimmer line at top */}
                {active && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, #34d399, #6366f1, #34d399)',
                    backgroundSize: '200% 100%',
                  }} />
                )}

                {/* ACTIVE badge */}
                {active && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                    <span style={{ position: 'relative', display: 'inline-flex', width: 9, height: 9 }}>
                      <span style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: '#34d399', animation: 'exp-ping 1.6s ease-out infinite',
                      }} />
                      <span style={{
                        width: 9, height: 9, borderRadius: '50%', background: '#34d399',
                        position: 'relative', animation: 'exp-pulse 2s ease-in-out infinite',
                      }} />
                    </span>
                    <span style={{
                      fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.12em',
                      color: '#34d399', fontFamily: 'monospace',
                    }}>
                      ACTIVE NOW
                    </span>
                  </div>
                )}

                {/* Header */}
                <div style={{ marginBottom: 14 }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 3 }}>
                    {exp.company}
                  </h3>
                  <p style={{ color: 'var(--accent)', fontSize: '0.88rem', fontWeight: 600 }}>
                    {exp.role}
                  </p>
                  {/* Period/location shown inside card on mobile */}
                  <p className="exp-mobile-meta" style={{
                    color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 4,
                  }}>
                    {exp.period} · {exp.location}
                  </p>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: active ? '#34d399' : 'var(--accent)', flexShrink: 0, marginTop: '0.25em', fontSize: '0.68rem' }}>
                        ▸
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="tag"
                      style={active ? {
                        borderColor: 'rgba(52,211,153,0.25)',
                        color: '#34d399',
                        background: 'rgba(52,211,153,0.07)',
                      } : {}}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );

            /* ── Meta (date + company shown on opposite side) ── */
            const meta = (
              <div style={{
                textAlign: isLeft ? 'left' : 'right',
                paddingTop: 6,
                opacity: 0.85,
              }}>
                <p style={{
                  fontSize: '0.78rem', fontWeight: 700,
                  color: active ? '#34d399' : 'var(--text-muted)',
                  letterSpacing: '0.04em', marginBottom: 6,
                  fontFamily: 'monospace',
                }}>
                  {exp.period}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {exp.location}
                </p>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: 8 }}>
                  {exp.company}
                </p>
              </div>
            );

            return (
              <div
                key={exp.company}
                className="exp-row"
                style={{ display: 'flex', alignItems: 'flex-start' }}
              >
                {/* ── Left panel ─────────────────────────── */}
                <div
                  className={isLeft ? 'exp-card-col-left' : 'exp-meta-col'}
                  style={{
                    flex: 1,
                    paddingRight: 28,
                    paddingBottom: 64,
                    // hide meta column on mobile (via class above)
                    ...(isLeft ? {} : { display: 'flex', justifyContent: 'flex-end' }),
                  }}
                >
                  {isLeft ? card : meta}
                </div>

                {/* ── Centre: dot + vertical line ─────────── */}
                <div
                  className="exp-center"
                  style={{
                    width: 44,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingBottom: 64,
                  }}
                >
                  {/* Dot */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {/* Ping ring for active */}
                    {active && (
                      <span style={{
                        position: 'absolute',
                        inset: -5,
                        borderRadius: '50%',
                        border: '2px solid #34d399',
                        animation: 'exp-ping 1.8s ease-out infinite',
                        pointerEvents: 'none',
                      }} />
                    )}
                    <div style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: active ? '#34d399' : 'var(--accent)',
                      border: '2.5px solid var(--surface)',
                      boxShadow: active
                        ? '0 0 14px rgba(52,211,153,0.6)'
                        : '0 0 0 3px rgba(99,102,241,0.18)',
                      zIndex: 1,
                      position: 'relative',
                      ...(active ? { animation: 'exp-pulse 2s ease-in-out infinite' } : {}),
                    }} />
                  </div>

                  {/* Connecting line to next item */}
                  {i < experience.length - 1 && (
                    <div style={{
                      flex: 1,
                      width: 2,
                      marginTop: 4,
                      background: active
                        ? 'linear-gradient(to bottom, rgba(52,211,153,0.4), var(--border))'
                        : 'var(--border)',
                    }} />
                  )}
                </div>

                {/* ── Right panel ────────────────────────── */}
                <div
                  className={isLeft ? 'exp-meta-col' : 'exp-card-col'}
                  style={{
                    flex: 1,
                    paddingLeft: 28,
                    paddingBottom: 64,
                    ...(isLeft ? {} : {}),
                  }}
                >
                  {isLeft ? meta : card}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
