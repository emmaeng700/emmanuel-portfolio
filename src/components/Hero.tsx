'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { personal } from '@/data/resume';
import { Mail, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

const roles = [
  'Systems Engineer',
  'Full-Stack Builder',
  'Open-Source Contributor',
  'GPU/CUDA Enthusiast',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', maxWidth: 740, position: 'relative', zIndex: 1 }}>

        {/* Profile photo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{
            position: 'relative',
            width: 110,
            height: 110,
            borderRadius: '50%',
            padding: 3,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)',
            boxShadow: '0 0 32px rgba(99,102,241,0.25)',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--background)' }}>
              <Image
                src="/me.jpg"
                alt="Emmanuel Acheampong Oppong"
                width={110}
                height={110}
                style={{ objectFit: 'cover', objectPosition: 'center top', width: '100%', height: '100%' }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Available badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, border: '1px solid var(--border)', background: 'var(--surface)', marginBottom: 24, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span className="glow-dot" />
          Open to SWE internships · Summer / Fall 2026
        </div>

        {/* Name */}
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
          Emmanuel Acheampong<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Oppong
          </span>
        </h1>

        {/* Typewriter role */}
        <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 24, height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>&gt; </span>
          <span style={{ marginLeft: 8 }}>{displayed}</span>
          <span style={{ display: 'inline-block', width: 2, height: '1.2em', background: 'var(--accent)', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
        </div>

        {/* Tagline */}
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          CS @ Grambling State · NVIDIA Bridge · Google G-SWEP · Hubtel internship · Merged PRs to React & Kafka
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <a
            href="#projects"
            style={{
              padding: '12px 28px',
              borderRadius: 10,
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            View Projects
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 28px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <GithubIcon size={16} /> GitHub
          </a>
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          {[
            { href: personal.linkedin, icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
            { href: personal.github, icon: <GithubIcon size={18} />, label: 'GitHub' },
            { href: `mailto:${personal.email}`, icon: <Mail size={18} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'var(--text-muted)', animation: 'bounce 2s infinite' }}
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </a>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
      `}</style>
    </section>
  );
}
