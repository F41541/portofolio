export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  tags: string[];
}

export interface BlogPostItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface RouteItem {
  name: string;
  href: string;
  description: string;
  shortcut?: string;
}

export interface SocialLinkItem {
  name: string;
  href: string;
  handle: string;
  external: true;
}

export const NAV_ROUTES: RouteItem[] = [
  { name: "Home", href: "/", description: "Overview & Featured Highlights" },
  { name: "Projects", href: "/projects", description: "Production systems, microservices & apps" },
  { name: "Blog", href: "/blog", description: "Technical deep dives & engineering journals" },
  { name: "About", href: "/about", description: "Background, tech stack & experience" },
  { name: "Contact", href: "/contact", description: "Let's connect and build together" },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "distributed-task-queue",
    title: "Distributed Task Queue Engine",
    description: "High-throughput asynchronous task orchestrator in Go & Redis with raft consensus.",
    category: "Systems",
    href: "/projects#distributed-task-queue",
    tags: ["Go", "Redis", "Distributed Systems", "gRPC"],
  },
  {
    id: "edge-inference-mesh",
    title: "Edge AI Inference Mesh",
    description: "Sub-50ms model serving cluster at the network edge with WebAssembly runtimes.",
    category: "AI & Infra",
    href: "/projects#edge-inference-mesh",
    tags: ["Rust", "Wasm", "ONNX", "Kubernetes"],
  },
  {
    id: "cloud-native-observability",
    title: "Realtime Telemetry & APM",
    description: "Multi-tenant tracing pipeline streaming 100k+ events/sec with eBPF probes.",
    category: "Observability",
    href: "/projects#cloud-native-observability",
    tags: ["TypeScript", "ClickHouse", "eBPF", "Kafka"],
  },
  {
    id: "autonomous-trading-engine",
    title: "Low-Latency Order Router",
    description: "Algorithmic market making and risk gateway with sub-millisecond execution.",
    category: "Fintech",
    href: "/projects#autonomous-trading-engine",
    tags: ["C++", "ZeroMQ", "WebSocket", "PostgreSQL"],
  },
];

export const BLOG_POSTS_DATA: BlogPostItem[] = [
  {
    id: "zero-alloc-go-patterns",
    title: "Zero-Allocation Memory Patterns in Go",
    description: "Optimizing hot execution paths by controlling escape analysis and heap thrashing.",
    category: "Go",
    href: "/blog#zero-alloc-go-patterns",
    date: "Feb 2026",
    readTime: "6 min read",
    tags: ["Go", "Performance", "Memory"],
  },
  {
    id: "ebpf-kernel-profiling",
    title: "Deep Observability with eBPF in Production",
    description: "How kernel-level probes eliminate overhead in high-scale microservices.",
    category: "Systems",
    href: "/blog#ebpf-kernel-profiling",
    date: "Jan 2026",
    readTime: "8 min read",
    tags: ["Linux", "eBPF", "Kernel", "Networking"],
  },
  {
    id: "event-sourcing-at-scale",
    title: "Architecting CQRS & Event Sourcing for 10M Events",
    description: "Lessons learned designing event streams, snapshotting, and idempotent projections.",
    category: "Architecture",
    href: "/blog#event-sourcing-at-scale",
    date: "Dec 2025",
    readTime: "10 min read",
    tags: ["Architecture", "PostgreSQL", "Kafka"],
  },
];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: "GitHub",
    href: "https://github.com",
    handle: "@engineer",
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    handle: "in/engineer",
    external: true,
  },
  {
    name: "Twitter / X",
    href: "https://x.com",
    handle: "@engineer_dev",
    external: true,
  },
  {
    name: "Email",
    href: "mailto:alex@engineer.dev",
    handle: "alex@engineer.dev",
    external: true,
  },
];
