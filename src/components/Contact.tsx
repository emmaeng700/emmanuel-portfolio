'use client';

import { personal } from '@/data/resume';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '96px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <p className="section-label" style={{ marginBottom: 16 }}>Contact</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Let&apos;s build something together
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.97rem', lineHeight: 1.7, marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
          I&apos;m actively looking for SWE internship opportunities for Summer / Fall 2026.
          Whether it&apos;s an opportunity, a collaboration, or just to say hi — my inbox is open.
        </p>

        <a
          href={`mailto:${personal.email}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 32px',
            borderRadius: 10,
            background: 'var(--accent)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.95rem',
            textDecoration: 'none',
            marginBottom: 48,
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Mail size={18} /> Say hello
        </a>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { href: personal.linkedin, icon: <LinkedinIcon size={16} />, label: 'LinkedIn' },
            { href: personal.github, icon: <GithubIcon size={16} />, label: 'GitHub' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {icon} {label} <ArrowUpRight size={13} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
