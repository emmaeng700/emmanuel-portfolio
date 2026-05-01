import { education } from '@/data/resume';
import { Trophy, GraduationCap, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <section id="about" style={{ padding: '96px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <p className="section-label" style={{ marginBottom: 12 }}>About</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', maxWidth: 560 }}>
          Building at the intersection of systems and intelligence
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {/* Bio card */}
        <div className="card" style={{ padding: 32, gridColumn: 'span 1' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            I&apos;m a Computer Science student at Grambling State University with a{' '}
            <strong style={{ color: 'var(--text-primary)' }}>3.93 GPA</strong>, passionate about
            systems-level engineering, distributed infrastructure, and applied ML.
          </p>
          <br />
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            I&apos;ve built container runtimes, database engines, and clinical AI tools — and I&apos;ve shipped
            merged PRs to <strong style={{ color: 'var(--text-primary)' }}>React</strong>,{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Kubernetes</strong>, and{' '}
            <strong style={{ color: 'var(--text-primary)' }}>pgjdbc</strong> while still in school.
            I hold a{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Vanda African Math Olympiad Gold Medal</strong> and
            care deeply about building things that matter for underrepresented communities.
          </p>
        </div>

        {/* Education card */}
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <GraduationCap size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Education</span>
          </div>
          <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{education.school}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 4 }}>{education.degree}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 16 }}>
            GPA {education.gpa} · Expected {education.expected}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {education.coursework.map((c) => (
              <span key={c} className="tag">{c}</span>
            ))}
          </div>
        </div>

        {/* Awards card */}
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Trophy size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Awards & Recognition</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {education.awards.map((a) => (
              <div key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>✦</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coursework tag cloud */}
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <BookOpen size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Beyond the degree</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            NVIDIA Bridge Program alumnus. Google G-SWEP Fellow. JPMorgan Hackathon participant.
            NSBE Treasurer managing a 300+ member community. I thrive in fast-paced, high-stakes environments.
          </p>
        </div>
      </div>
    </section>
  );
}
