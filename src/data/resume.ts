export const personal = {
  name: "Emmanuel Acheampong Oppong",
  shortName: "Emmanuel",
  tagline: "Systems thinker. Full-stack builder. Open-source contributor.",
  subTagline: "CS @ Grambling State · NVIDIA · Google · Building things that matter.",
  email: "emmanuelopponga98@gmail.com",
  linkedin: "https://linkedin.com/in/emmanuel-oppong-acheampong",
  github: "https://github.com/emmaeng700",
  website: "https://emmanuelopponga.com",
  openSourcePage: "https://emmanuelopponga.com/opensourcecontributions",
};

export const education = {
  school: "Grambling State University",
  degree: "Bachelor of Science in Computer Science",
  gpa: "3.93",
  expected: "May 2028",
  location: "Grambling, Louisiana",
  coursework: [
    "Object-Oriented Programming",
    "Software Engineering",
    "Data Structures & Algorithms",
    "Operating Systems",
    "Computer Networks",
    "Cloud Computing",
  ],
  awards: [
    "Dean's List (2024, 2025)",
    "Presidential Scholarship",
    "Vanda African Math Olympiad '18 — Gold Medalist",
  ],
};

export const experience = [
  {
    company: "Outamation",
    role: "Extern",
    period: "May 2026 – Present",
    location: "Remote",
    bullets: [
      "Built modular, AI-powered pipelines to process 200+ page mortgage blob files — combining OCR (Tesseract, PaddleOCR), PDF parsing (PyMuPDF), and RAG techniques for intelligent data extraction, classification, and search.",
      "Developed a document retrieval system using LlamaIndex and Retrieval-Augmented Generation (RAG), optimized for multi-document mortgage blobs; enhanced precision through chunk tuning, metadata filtering, and evaluation of open-source LLMs including Mistral and Phi-2.",
      "Conducted end-to-end evaluation benchmarking OCR accuracy, RAG retrieval quality, and routing performance across 200+ page documents; delivered a technical report outlining model trade-offs, optimization strategies, and final deployment recommendations.",
    ],
    tags: ["RAG", "LlamaIndex", "OCR", "PyMuPDF", "Mistral", "Phi-2", "Python"],
  },
  {
    company: "Develop for Good",
    role: "Engineer",
    period: "May 2026 – Aug 2026",
    location: "Remote",
    bullets: [
      "Selected from a competitive applicant pool to engineer a full website redesign for LiberArte Inc., a NYC nonprofit advancing racial, social, and climate justice through the arts.",
      "Leading visual design, information architecture, and low/no-code implementation to deliver a high-performing, accessible, mobile-responsive platform supporting storytelling, community engagement, and fundraising.",
      "Collaborating in weekly client-facing meetings and cross-functional team syncs; managing project scope and delivery milestones across a 16-week engagement.",
    ],
    tags: ["Web Design", "Accessibility", "Nonprofits", "Information Architecture"],
  },
  {
    company: "Grambling State University",
    role: "Undergraduate Research Assistant",
    period: "Jan 2025 – Present",
    location: "Grambling, LA",
    bullets: [
      "Researching ML-based adaptive OTP verification; engineered an OTP workflow using AES-GCM encryption and Redis for secure token storage, single-use enforcement via TTL-based expiration, and replay attack mitigation.",
      "Analyzed behavioral anomaly signals in authentication logs to identify suspicious access patterns and proposed risk-based controls to strengthen system security posture.",
      "Documented system architecture and experimental findings; contributing research outputs to support ongoing lab publications and security infrastructure improvements.",
    ],
    tags: ["Security", "ML", "Redis", "AES-GCM", "Python", "Research"],
  },
  {
    company: "Hubtel Ghana",
    role: "Software Engineer Intern",
    period: "May 2023 – Aug 2023",
    location: "Accra, Ghana",
    bullets: [
      "Built an IoT data pipeline (Kafka Connect, MQTT, PostgreSQL) for real-time sensor processing — improved infrastructure downtime detection by 40%.",
      "Wrote automated unit and integration tests (Spring Boot, JUnit, Postman) increasing reliability and edge-case coverage across distributed services.",
      "Shipped Firebase push notifications delivering real-time device and workflow status updates with sub-10ms latency.",
    ],
    tags: ["Kafka", "MQTT", "PostgreSQL", "Spring Boot", "Firebase"],
  },
];

export const programs = [
  {
    company: "AI4ALL",
    role: "Ignite Fellow",
    period: "Mar 2026 – Present",
    location: "Remote",
    bullets: [
      "Competitively selected for AI4ALL's Ignite Program — a 13-week AI/ML portfolio project track focused on building responsible, socially impactful AI systems with mentorship from industry professionals.",
      "Developing an AI/ML portfolio project applying machine learning to a real-world problem, with emphasis on fairness, interpretability, and ethical deployment.",
      "Participating in a 7-week career readiness track including resume workshops, technical interview prep, and direct exposure to AI professionals across the industry.",
    ],
    tags: ["AI/ML", "Responsible AI", "Python", "Career Readiness"],
  },
  {
    company: "Nvidia",
    role: "Summer Bridge Program — Participant",
    period: "Summer 2025",
    location: "Virtual",
    bullets: [
      "Competitively selected for a 6-week program offering structured exposure to NVIDIA's AI and GPU ecosystem, engineering culture, and early-career development pathways.",
      "Paired with an NVIDIA engineer mentor for weekly 1:1s covering GPU architecture, parallel computing fundamentals, and navigating a career in systems-level software.",
      "Attended technical sessions on CUDA programming and accelerated computing; applied concepts in a self-directed exploration of GPU memory optimization patterns.",
    ],
    tags: ["CUDA", "GPU Architecture", "Parallel Computing", "AI Infrastructure"],
  },
  {
    company: "Basta × Google — Code2Career (G-SWEP)",
    role: "Software Engineering Fellow",
    period: "Aug 2024 – Dec 2024",
    location: "Virtual",
    bullets: [
      "Competitively selected for a 10-week program pairing first-generation CS students of color with Google Software Engineers for 1:1 technical mentorship and career guidance.",
      "Completed weekly live workshops on Data Structures & Algorithms and technical interview preparation; practiced problem-solving patterns under timed conditions with mentor feedback.",
      "Reviewed system design concepts and mock interview performance with mentor; applied learnings to strengthen internship application strategy across competitive recruiting cycles.",
    ],
    tags: ["DSA", "System Design", "Technical Interviews"],
  },
  {
    company: "ALX Africa",
    role: "Software Engineering Program",
    period: "Apr 2024",
    location: "Remote",
    bullets: [
      "Completed ALX Africa's rigorous, project-based software engineering curriculum covering full-stack development, systems programming, and professional software engineering practices.",
      "Built and shipped multiple projects under real-world constraints and strict deadlines, developing strong habits around version control, code review, and iterative delivery.",
      "Gained foundational depth in Linux, shell scripting, C programming, and web development as part of a globally recognized African tech talent pipeline.",
    ],
    tags: ["Linux", "C", "Shell Scripting", "Full-Stack"],
  },
];

export const projects = [
  {
    name: "Spring Boot Actuator Dashboard",
    subtitle: "Production Observability Stack",
    description:
      "Full production observability stack with live actuator endpoint monitoring, Spring Cache integration across 3 named caches, and SBOM generation via CycloneDX for supply chain transparency. Features real-time SSE event streaming, dark mode UI, and keyboard shortcuts.",
    tech: ["Java", "Spring Boot", "SSE", "CycloneDX", "Maven"],
    github: "https://github.com/emmaeng700/javaprojects",
    highlight: "Full observability stack with SBOM + real-time SSE streaming",
    category: "fullstack",
  },
  {
    name: "Go Container",
    subtitle: "Minimal Container Runtime",
    description:
      "Built a minimal container runtime in Go using Linux namespaces (UTS, PID, MNT) and cgroups for process isolation and resource limits — mirroring core Docker internals. Implemented a chroot filesystem sandbox with mounted pseudo-filesystems (/proc, /sys).",
    tech: ["Go", "Linux", "Namespaces", "cgroups", "chroot"],
    github: "https://github.com/emmaeng700/distributed-systems",
    highlight: "Mirrors Docker internals from scratch",
    category: "systems",
  },
  {
    name: "NanoSQL",
    subtitle: "SQLite-like Database Engine",
    description:
      "Engineered a SQLite-like relational database engine in C with B-tree indexing, persistent page-based storage, and a CLI supporting INSERT/SELECT with a custom tokenizer and parser. Node splitting and rebalancing logic maintains B-tree invariants under high-load writes.",
    tech: ["C", "B-tree", "Page Storage", "CLI"],
    github: "https://github.com/emmaeng700/C-Database",
    highlight: "B-tree indexing and persistent storage from scratch",
    category: "systems",
  },
  {
    name: "MedStroke AI",
    subtitle: "Stroke Triage System",
    description:
      "Full-stack stroke triage system with NIHSS scoring and automated tPA eligibility logic using a Random Forest risk model trained on patient blood-sample features. FastAPI backend serving ML inference; clinician-facing React dashboard with feature attribution.",
    tech: ["Python", "FastAPI", "TensorFlow", "React", "Random Forest"],
    github: "https://github.com/emmaeng700/stroke-diagnoser",
    highlight: "ML-powered clinical decision support",
    category: "ml",
  },
];

export const openSource = [
  {
    repo: "pgjdbc/pgjdbc",
    description: "Merged PR to the official PostgreSQL JDBC driver",
    url: "https://github.com/pgjdbc/pgjdbc",
    status: "merged",
  },
  {
    repo: "kubernetes-client/java",
    description: "Merged PR to the official Kubernetes Java client",
    url: "https://github.com/kubernetes-client/java",
    status: "merged",
  },
  {
    repo: "apache/kafka",
    description: "Merged PR to Apache Kafka — powering infrastructure at Meta, LinkedIn & JPMorgan",
    url: "https://github.com/apache/kafka",
    status: "merged",
  },
  {
    repo: "facebook/react",
    description: "Active PR — StrictMode regression investigation",
    url: "https://github.com/facebook/react",
    status: "active",
  },
];

export const openSourceStats = {
  mergedPRs: "3+",
  activePRs: "1",
  totalPRs: "20+",
  clas: "4+",
};

export const skills = {
  Languages: ["Python", "Java", "Go", "C", "C++", "TypeScript", "JavaScript", "SQL"],
  "Frameworks & Libraries": [
    "Spring Boot", "React", "Next.js", "FastAPI", "TensorFlow",
    "Spring MVC", "Spring Data JPA", "JUnit", "LlamaIndex",
  ],
  "Infrastructure & Cloud": [
    "Kafka", "Redis", "PostgreSQL", "Docker", "Kubernetes",
    "Linux", "AWS (S3, DynamoDB, Bedrock)", "Firebase", "H2",
  ],
  Tools: [
    "Git / GitHub", "Bash", "CI/CD", "Figma", "Postman",
    "Maven", "CycloneDX", "Spring Actuator", "IntelliJ",
  ],
  Concepts: [
    "Distributed Systems", "Microservices", "REST APIs",
    "Event-Driven Architecture", "RAG / LLMs", "System Design",
    "GPU / Parallel Computing (CUDA)", "Data Structures & Algorithms",
  ],
};

export const leadership = [
  {
    org: "JPMorgan Chase — Data for Good Hackathon",
    role: "Selected Participant (Competitive Invite)",
    period: "Apr 2026",
    detail: "Applied data analysis and ML to a real-world community problem, translating raw datasets into actionable insights and a working prototype under time pressure.",
  },
  {
    org: "The Lantern Network",
    role: "Student Ambassador",
    period: "Dec 2025 – Present",
    detail: "Selected as mentee and ambassador; attended the 13th Annual CLRM Conference and 4th Annual EFMR Conference in Washington, D.C. as an all-expenses-paid invited participant.",
  },
  {
    org: "National Society of Black Engineers (NSBE)",
    role: "Chapter Treasurer",
    period: "Jan 2025 – Present",
    detail: "Managed chapter budget; secured $3K in corporate partnerships funding technical events, workshops, and mentorship for a 300+ member community.",
  },
  {
    org: "ColorStack",
    role: "Member",
    period: "Aug 2024 – Present",
    detail: "Active member of ColorStack's community dedicated to increasing success of Black and Latinx CS students — leveraging job referral networks and peer recruiting knowledge.",
  },
  {
    org: "Karat",
    role: "Member",
    period: "Oct 2024 – Present",
    detail: "Access to structured technical interview practice and assessment resources used by top companies globally.",
  },
];

export const certifications = [
  {
    issuer: "HackerRank",
    name: "Software Engineer Certification",
    period: "Dec 2025",
    detail: "Passed HackerRank's Software Engineer and Software Engineer Intern certification exams — demonstrating proficiency in algorithmic problem solving, SQL query design, and REST API development.",
  },
];
