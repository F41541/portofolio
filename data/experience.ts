export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: "Full-time" | "Contract" | "Leadership" | "Advisory";
  current?: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "lead-ai-systems-architect",
    role: "Lead AI & Systems Architect",
    company: "Autonomous Scale Labs",
    companyUrl: "https://example.com",
    location: "San Francisco, CA (Remote)",
    period: "2023 — Present",
    type: "Full-time",
    current: true,
    description:
      "Directing core architecture for multi-agent reasoning systems, high-throughput model serving pipelines, and edge inference runtimes serving 10M+ monthly users.",
    achievements: [
      "Engineered an autonomous agent orchestration graph handling 100k+ concurrent user sessions with 99.9% state execution reliability.",
      "Spearheaded hybrid vector search engine in Rust and Qdrant, dropping P99 retrieval latency from 180ms to 8.4ms across 50M document embeddings.",
      "Designed real-time telemetry pipeline consuming 50k events/sec into ClickHouse with automated anomaly detection.",
      "Mentored a team of 8 senior full-stack and machine learning engineers across async code reviews and architectural RFDs.",
    ],
    techStack: ["LangGraph", "Python", "Rust", "Next.js 15", "Go", "Qdrant", "Redis", "Kafka", "Kubernetes"],
  },
  {
    id: "senior-backend-engineer",
    role: "Senior Distributed Systems Engineer",
    company: "Nexus Financial Technologies",
    companyUrl: "https://example.com",
    location: "New York, NY",
    period: "2021 — 2023",
    type: "Full-time",
    description:
      "Architected fault-tolerant transactional settlement gateways and high-velocity market event streaming pipelines with strict sub-millisecond SLAs.",
    achievements: [
      "Built Go event ingestion service processing $200M+ in daily transaction volume with zero message loss and exactly-once semantics.",
      "Optimized PostgreSQL query plans, connection pooling, and table partitioning, reducing DB CPU load by 42% during market open spikes.",
      "Implemented comprehensive eBPF network tracing and Prometheus alerts, identifying microservice bottlenecks before customer impact.",
      "Led containerization and migration of 14 legacy services onto Kubernetes with zero-downtime rolling deployments.",
    ],
    techStack: ["Go", "PostgreSQL", "Apache Kafka", "Docker", "Kubernetes", "gRPC", "Prometheus", "AWS"],
  },
  {
    id: "full-stack-engineer",
    role: "Full-Stack Software Engineer",
    company: "Hyperion Digital Products",
    companyUrl: "https://example.com",
    location: "Austin, TX",
    period: "2019 — 2021",
    type: "Full-time",
    description:
      "Developed high-traffic collaborative SaaS web applications, responsive component design systems, and real-time interactive dashboards.",
    achievements: [
      "Shipped collaborative multi-user canvas editor with WebSockets and CRDTs delivering fluid 60 FPS interactions under heavy load.",
      "Refactored frontend codebase to Next.js and TypeScript, improving Core Web Vitals (LCP reduced by 60%, CLS to 0).",
      "Created reusable UI component library adopted across 4 core product teams, speeding feature delivery by 35%.",
      "Automated CI/CD pipelines with GitHub Actions, reducing deployment cycle times from 45 minutes to under 5 minutes.",
    ],
    techStack: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "WebSockets", "Redis", "PostgreSQL"],
  },
  {
    id: "systems-software-consultant",
    role: "Open Source Systems Contributor & Consultant",
    company: "Independent / Core Engineering",
    companyUrl: "https://github.com",
    location: "Remote",
    period: "2018 — 2019",
    type: "Contract",
    description:
      "Consulted for high-growth tech startups on API performance optimization, caching strategies, and database architecture.",
    achievements: [
      "Audited and optimized database queries and Redis caching for a consumer mobile app, saving 55% in cloud infrastructure bills.",
      "Contributed bug fixes and performance enhancements to open-source distributed storage and CLI developer toolkits.",
      "Published technical guides on zero-allocation Go patterns and concurrent state machines with 100k+ total views.",
    ],
    techStack: ["Go", "Python", "Redis", "Docker", "Linux", "Git", "SQL"],
  },
];
