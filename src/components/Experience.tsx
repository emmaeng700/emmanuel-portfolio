import { experience } from '@/data/resume';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '96px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Experience</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Where I&apos;ve worked
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {experience.map((exp, i) => (
            <div
              key={exp.company}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 0,
                borderLeft: '2px solid var(--border)',
                paddingLeft: 28,
                paddingBottom: i < experience.length - 1 ? 48 : 0,
                position: 'relative',
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: -7,
                top: 6,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'var(--accent)',
                border: '2px solid var(--surface)',
                boxShadow: '0 0 0 3px rgba(99,102,241,0.2)',
              }} />

              {/* Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 2 }}>{exp.company}</h3>
                  <p style={{ color: 'var(--accent)', fontSize: '0.88rem', fontWeight: 500 }}>{exp.role}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 500 }}>{exp.period}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{exp.location}</p>
                </div>
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.2em', fontSize: '0.7rem' }}>▸</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {exp.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
