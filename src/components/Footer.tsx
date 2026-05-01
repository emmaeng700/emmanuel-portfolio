import { personal } from '@/data/resume';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 24px', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
        Built by{' '}
        <a href={personal.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500 }}>
          {personal.shortName}
        </a>
        {' '}· Next.js + Tailwind · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
