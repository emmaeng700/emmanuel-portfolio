export default function Currently() {
  const also = [
    {
      role: "Extern",
      company: "Outamation",
      detail: "AI-powered RAG pipelines for mortgage document intelligence",
      color: "#34d399",
    },
    {
      role: "Ignite Fellow",
      company: "AI4ALL",
      detail: "Responsible AI/ML portfolio project with industry mentorship",
      color: "#f59e0b",
    },
    {
      role: "Research Assistant",
      company: "Grambling State University",
      detail: "ML-based adaptive OTP verification & authentication security",
      color: "#38bdf8",
    },
  ];

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span className="glow-dot" />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            Currently
          </span>
        </div>

        {/* Featured primary role */}
        <div
          style={{
            padding: '24px 28px',
            borderRadius: 12,
            border: '1px solid rgba(99,102,241,0.35)',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.06) 100%)',
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Live pulse */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 10px #6366f1' }} />
              <div style={{
                position: 'absolute', inset: -4, borderRadius: '50%',
                border: '1px solid rgba(99,102,241,0.4)',
                animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
              }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Engineer</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>@</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#818cf8' }}>Develop for Good</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Engineering a full website redesign for <strong style={{ color: 'var(--text-primary)' }}>LiberArte Inc.</strong> — a NYC nonprofit advancing racial, social, and climate justice through the arts.
              </p>
            </div>
          </div>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px', borderRadius: 999,
            background: 'rgba(99,102,241,0.15)', color: '#818cf8',
            border: '1px solid rgba(99,102,241,0.3)', whiteSpace: 'nowrap',
          }}>
            May 2026 – Aug 2026
          </span>
        </div>

        {/* Secondary active roles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {also.map((item) => (
            <div
              key={item.company}
              style={{
                padding: '14px 18px',
                borderRadius: 10,
                border: `1px solid ${item.color}1a`,
                background: `${item.color}07`,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: item.color }}>{item.company}</span>
              </div>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{item.role}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
