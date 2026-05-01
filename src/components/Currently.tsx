export default function Currently() {
  const current = [
    {
      role: "Extern",
      company: "Outamation",
      detail: "Building AI-powered RAG pipelines for mortgage document intelligence",
      color: "#34d399",
    },
    {
      role: "Engineer",
      company: "Develop for Good",
      detail: "Engineering a full website redesign for LiberArte Inc., a NYC nonprofit",
      color: "#6366f1",
    },
    {
      role: "Ignite Fellow",
      company: "AI4ALL",
      detail: "Developing a responsible AI/ML portfolio project with industry mentorship",
      color: "#f59e0b",
    },
    {
      role: "Research Assistant",
      company: "Grambling State University",
      detail: "Researching ML-based adaptive OTP verification and authentication security",
      color: "#38bdf8",
    },
  ];

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: '36px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <span className="glow-dot" />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            Currently active
          </span>
        </div>

        {/* Role cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {current.map((item) => (
            <div
              key={item.company}
              style={{
                padding: '16px 20px',
                borderRadius: 10,
                border: `1px solid ${item.color}22`,
                background: `${item.color}08`,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}`, flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: item.color }}>{item.company}</span>
              </div>
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{item.role}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
