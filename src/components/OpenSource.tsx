import { openSource, openSourceStats } from '@/data/resume';
import { GitMerge, GitPullRequest } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import CountUp from '@/components/CountUp';
import AnimatedSection from '@/components/AnimatedSection';

export default function OpenSource() {
  return (
    <section id="opensource" style={{ padding: '96px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Open Source</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', maxWidth: 520 }}>
            Contributing to production codebases
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: '0.92rem', maxWidth: 580, lineHeight: 1.7 }}>
            Merged PRs to React, Kubernetes, Apache Kafka, and pgjdbc — infrastructure powering Meta, LinkedIn, JPMorgan,
            and thousands of engineering teams. 20+ PRs submitted, 4+ CLAs signed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {openSource.map((os) => {
            const merged = os.status === 'merged';
            return (
              <a key={os.repo} href={os.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: 24, height: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {merged
                        ? <GitMerge size={16} style={{ color: '#8b5cf6' }} />
                        : <GitPullRequest size={16} style={{ color: '#f59e0b' }} />
                      }
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: 999,
                        background: merged ? 'rgba(139,92,246,0.12)' : 'rgba(245,158,11,0.12)',
                        color: merged ? '#8b5cf6' : '#f59e0b',
                        border: `1px solid ${merged ? 'rgba(139,92,246,0.25)' : 'rgba(245,158,11,0.25)'}`,
                      }}>
                        {merged ? 'Merged' : 'Active PR'}
                      </span>
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}><GithubIcon size={15} /></span>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: 'monospace', marginBottom: 8, color: 'var(--text-primary)' }}>
                    {os.repo}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.6 }}>
                    {os.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
          {[
            { label: 'Merged PRs', value: openSourceStats.mergedPRs, sub: 'React, Kafka, K8s, pgjdbc' },
            { label: 'Total PRs', value: openSourceStats.totalPRs, sub: 'Across major OSS repos' },
            { label: 'CLAs Signed', value: openSourceStats.clas, sub: 'Contributor agreements' },
            { label: 'Active PRs', value: openSourceStats.activePRs, sub: 'facebook/react' },
          ].map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80}>
              <div style={{ padding: '20px 24px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--background)' }}>
                <p style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--accent)' }}>
                  <CountUp value={stat.value} />
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.88rem', marginTop: 2 }}>{stat.label}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 2 }}>{stat.sub}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
