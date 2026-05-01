'use client';

import { projects } from '@/data/resume';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/icons';

const categoryColor: Record<string, string> = {
  systems: '#f59e0b',
  ml: '#34d399',
  fullstack: '#6366f1',
};

const categoryLabel: Record<string, string> = {
  systems: 'Systems',
  ml: 'ML / AI',
  fullstack: 'Full-Stack',
};

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '96px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <p className="section-label" style={{ marginBottom: 12 }}>Projects</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', maxWidth: 520 }}>
          Things I&apos;ve built from scratch
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: '0.92rem', maxWidth: 480 }}>
          I like building things that are hard — container runtimes, database engines, clinical AI.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {projects.map((p) => (
          <div key={p.name} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Category badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 999,
                background: `${categoryColor[p.category]}15`,
                color: categoryColor[p.category],
                border: `1px solid ${categoryColor[p.category]}30`,
              }}>
                {categoryLabel[p.category]}
              </span>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <GithubIcon size={15} />
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Title */}
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 2 }}>{p.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{p.subtitle}</p>
            </div>

            {/* Highlight callout */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 500 }}>{p.highlight}</p>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, flex: 1 }}>{p.description}</p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
