import { programs } from '@/data/resume';

export default function Programs() {
  return (
    <section id="programs" style={{ padding: '96px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <p className="section-label" style={{ marginBottom: 12 }}>Programs & Fellowships</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Competitively selected programs
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: '0.92rem', maxWidth: 480 }}>
          Every program here had a selective application process. None were just sign-ups.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {programs.map((p) => (
          <div key={p.company} className="card" style={{ padding: 28 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>{p.company}</h3>
                <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>{p.role}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{p.period}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{p.location}</p>
              </div>
            </div>

            {/* Bullets */}
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.25em', fontSize: '0.65rem' }}>▸</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.65 }}>{b}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
