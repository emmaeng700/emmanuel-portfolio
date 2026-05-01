import { skills } from '@/data/resume';
import SkillsGlobe from '@/components/SkillsGlobe';

const groupColors: Record<string, { bg: string; color: string; border: string }> = {
  Languages:               { bg: 'rgba(99,102,241,0.08)',  color: '#818cf8', border: 'rgba(99,102,241,0.2)' },
  'Infrastructure & Cloud':{ bg: 'rgba(52,211,153,0.08)',  color: '#34d399', border: 'rgba(52,211,153,0.2)' },
  'Frameworks & Libraries':{ bg: 'rgba(245,158,11,0.08)',  color: '#fbbf24', border: 'rgba(245,158,11,0.2)' },
  Tools:                   { bg: 'rgba(236,72,153,0.08)',  color: '#f472b6', border: 'rgba(236,72,153,0.2)' },
  Concepts:                { bg: 'rgba(56,189,248,0.08)',  color: '#38bdf8', border: 'rgba(56,189,248,0.2)' },
};

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '96px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <p className="section-label" style={{ marginBottom: 12 }}>Skills</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
          Technical toolkit
        </h2>
      </div>

      {/* 3-D interactive globe */}
      <div style={{ marginBottom: 40, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>DRAG TO ROTATE · AUTO-SPINS</span>
        </div>
        <SkillsGlobe />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {Object.entries(skills).map(([group, items]) => {
          const style = groupColors[group] ?? groupColors.Tools;
          return (
            <div key={group} className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: style.color }} />
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: style.color }}>{group}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      background: style.bg,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
