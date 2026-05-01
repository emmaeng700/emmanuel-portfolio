import { leadership, certifications } from '@/data/resume';
import { Users, Zap, Globe, Award, BookOpen } from 'lucide-react';

const icons = [
  <Zap key="zap" size={16} />,
  <Globe key="globe" size={16} />,
  <Users key="users" size={16} />,
  <BookOpen key="book" size={16} />,
  <BookOpen key="book2" size={16} />,
];

export default function Leadership() {
  return (
    <section id="leadership" style={{ padding: '96px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Leadership & Community</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Beyond the code
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
          {leadership.map((l, i) => (
            <div key={l.org} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  {icons[i] ?? icons[0]}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.3, marginBottom: 2 }}>{l.org}</p>
                  <p style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 500 }}>{l.role}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: 2 }}>{l.period}</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>{l.detail}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Certifications</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {certifications.map((c) => (
                <div key={c.name} className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', flexShrink: 0 }}>
                    <Award size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: 2 }}>{c.issuer} · {c.period}</p>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', maxWidth: 480, lineHeight: 1.6 }}>{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
