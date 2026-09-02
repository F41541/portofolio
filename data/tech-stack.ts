export type TechCategory =
  | "all"
  | "ai-ml"
  | "backend"
  | "frontend"
  | "cloud-devops";

export interface TechItem {
  name: string;
  category: "ai-ml" | "backend" | "frontend" | "cloud-devops";
  level: "Mastery" | "Advanced" | "Proficient";
  years: number;
  productionUsage: string;
  featured?: boolean;
  iconSlug?: string;
  tags: string[];
}

export interface TechCategoryGroup {
  id: TechCategory;
  name: string;
  description: string;
  skills: TechItem[];
}

export const TECH_STACK: TechItem[] = [
  // AI & Machine Learning
  {
    name: "OpenAI / Anthropic APIs",
    category: "ai-ml",
    level: "Mastery",
    years: 3,
    productionUsage: "High-scale LLM integrations, function calling schemas, streaming responses, and token cost optimization across 10M+ monthly calls.",
    featured: true,
    tags: ["LLMs", "Claude", "GPT-4o", "Prompt Engineering"],
  },
  {
    name: "LangChain / LangGraph",
    category: "ai-ml",
    level: "Mastery",
    years: 2,
    productionUsage: "Cyclic multi-agent state machines, memory checkpoints, human-in-the-loop orchestrations, and deterministic tool execution.",
    featured: true,
    tags: ["Multi-Agent", "Graph Execution", "State Machine"],
  },
  {
    name: "Vector DBs (Qdrant / Pinecone)",
    category: "ai-ml",
    level: "Advanced",
    years: 3,
    productionUsage: "Large-scale vector indexing (50M+ vectors), hybrid BM25 + dense neural retrieval, payload filtering, and sub-10ms P99 search.",
    featured: true,
    tags: ["HNSW", "RAG", "Embeddings", "Quantization"],
  },
  {
    name: "PyTorch",
    category: "ai-ml",
    level: "Proficient",
    years: 3,
    productionUsage: "Custom embedding fine-tuning, classification heads, tensor operations, and model quantization for low-latency inference.",
    featured: false,
    tags: ["Deep Learning", "Tensors", "Model Fine-Tuning"],
  },
  {
    name: "HuggingFace Ecosystem",
    category: "ai-ml",
    level: "Advanced",
    years: 3,
    productionUsage: "Transformers pipeline integration, local open-weight model serving (Llama 3 / Mistral), and tokenization benchmarking.",
    featured: false,
    tags: ["Transformers", "Llama 3", "Inference"],
  },

  // Backend & Distributed Systems
  {
    name: "Go (Golang)",
    category: "backend",
    level: "Mastery",
    years: 4,
    productionUsage: "Ultra low-latency microservices, concurrent goroutine worker pools, zero-allocation ring buffers, and custom gRPC streaming APIs.",
    featured: true,
    tags: ["Concurrency", "Microservices", "gRPC", "Zero-Alloc"],
  },
  {
    name: "Python / FastAPI",
    category: "backend",
    level: "Mastery",
    years: 5,
    productionUsage: "Async web gateways, AI orchestration backends, Pydantic validation pipelines, and Celery / Redis background worker clusters.",
    featured: true,
    tags: ["AsyncIO", "Pydantic", "APIs", "REST"],
  },
  {
    name: "PostgreSQL / Prisma",
    category: "backend",
    level: "Mastery",
    years: 5,
    productionUsage: "Complex relational modeling, indexing strategies (B-Tree, GIN, BRIN), partition tables, connection pooling (PgBouncer), and ACID pipelines.",
    featured: true,
    tags: ["Relational", "SQL", "Migrations", "ORM"],
  },
  {
    name: "Redis",
    category: "backend",
    level: "Mastery",
    years: 4,
    productionUsage: "Distributed locks (Redlock), multi-agent session state stores, pub/sub messaging, rate limiting token buckets, and hot caching layers.",
    featured: true,
    tags: ["Caching", "Pub/Sub", "In-Memory", "Distributed Locks"],
  },
  {
    name: "Node.js / Bun",
    category: "backend",
    level: "Advanced",
    years: 5,
    productionUsage: "Full-stack server runtimes, high-concurrency event loops, edge compute endpoints, and TypeScript backend utilities.",
    featured: false,
    tags: ["JavaScript", "TypeScript", "Async", "V8 Engine"],
  },
  {
    name: "Apache Kafka",
    category: "backend",
    level: "Advanced",
    years: 3,
    productionUsage: "Event streaming topologies handling 50k+ events/second, consumer group partitioning, replay pipelines, and dead-letter queues.",
    featured: false,
    tags: ["Streaming", "Event-Driven", "Pub/Sub", "Data Pipelines"],
  },

  // Frontend & Web Architecture
  {
    name: "Next.js 15 (App Router)",
    category: "frontend",
    level: "Mastery",
    years: 4,
    productionUsage: "Server Components (RSC), dynamic server action mutations, streaming SSR with Suspense, intercepting routes, and parallel slots.",
    featured: true,
    tags: ["React 19", "RSC", "SSR", "App Router"],
  },
  {
    name: "React 19",
    category: "frontend",
    level: "Mastery",
    years: 5,
    productionUsage: "Modern hook architectures, optimistic state updates, useActionState, client-side caching graphs, and fluid micro-interactions.",
    featured: true,
    tags: ["UI", "Hooks", "Concurrent Mode", "Component Design"],
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: "Mastery",
    years: 5,
    productionUsage: "Strict type systems, generative generic utilities, AST parsing, schema synchronization with backends, and zero-runtime overhead.",
    featured: true,
    tags: ["Type Safety", "Generics", "Strict", "Tooling"],
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: "Mastery",
    years: 4,
    productionUsage: "High-contrast tech-brutalist design systems, responsive layouts, CSS custom property tokens, and fluid typography hierarchies.",
    featured: false,
    tags: ["Design Systems", "CSS", "Responsive", "Tokens"],
  },
  {
    name: "WebSockets / SSE",
    category: "frontend",
    level: "Advanced",
    years: 4,
    productionUsage: "Bidirectional state syncing, real-time token stream consumers, collaborative multi-cursor canvas experiences, and reconnect fallbacks.",
    featured: false,
    tags: ["Realtime", "Streaming", "Sockets", "EventSource"],
  },
  {
    name: "WebAssembly (Wasm)",
    category: "frontend",
    level: "Proficient",
    years: 2,
    productionUsage: "Browser-side Rust computation kernels for graph rendering, image transforms, and sub-millisecond mathematical calculations.",
    featured: false,
    tags: ["Rust in Browser", "Performance", "Canvas", "Low-Level"],
  },

  // Cloud & DevOps Infrastructure
  {
    name: "Docker & Containerization",
    category: "cloud-devops",
    level: "Mastery",
    years: 5,
    productionUsage: "Multi-stage minimal distroless builds, local reproducible dev environments, vulnerability image scanning, and compose setups.",
    featured: true,
    tags: ["Containers", "Distroless", "Multi-stage", "Optimization"],
  },
  {
    name: "Kubernetes (K8s)",
    category: "cloud-devops",
    level: "Advanced",
    years: 3,
    productionUsage: "Deployment manifests, Horizontal Pod Autoscaling (HPA), ingress controllers, ConfigMaps/Secrets management, and statefulsets.",
    featured: true,
    tags: ["Orchestration", "HPA", "Cloud Native", "Helm"],
  },
  {
    name: "AWS (ECS, S3, RDS, Lambda)",
    category: "cloud-devops",
    level: "Advanced",
    years: 4,
    productionUsage: "Production cloud topologies with VPC peering, auto-scaling ECS Fargate clusters, IAM least-privilege security, and S3 CDN backbones.",
    featured: false,
    tags: ["Cloud", "IAM", "ECS", "Serverless"],
  },
  {
    name: "Cloudflare (Workers, Pages)",
    category: "cloud-devops",
    level: "Mastery",
    years: 3,
    productionUsage: "Edge routing, global caching rules, zero-trust access gateways, and sub-10ms serverless function execution across 300+ PoPs.",
    featured: true,
    tags: ["Edge Computing", "Serverless", "DDoS Protection", "CDN"],
  },
  {
    name: "GitHub Actions & CI/CD",
    category: "cloud-devops",
    level: "Mastery",
    years: 5,
    productionUsage: "Automated test suites, preview environment deployment bots, matrix builds, release tagging, and static security analysis (SAST).",
    featured: false,
    tags: ["Automation", "CI/CD", "Testing", "DevOps"],
  },
  {
    name: "Terraform (IaC)",
    category: "cloud-devops",
    level: "Proficient",
    years: 2,
    productionUsage: "Declarative infrastructure provisioning for multi-environment staging & production clouds with state locking.",
    featured: false,
    tags: ["IaC", "Declarative", "Cloud Automation"],
  },
];

export const TECH_CATEGORIES: { id: TechCategory; label: string; count?: number }[] = [
  { id: "all", label: "All Technologies" },
  { id: "ai-ml", label: "AI & Machine Learning" },
  { id: "backend", label: "Backend & Distributed" },
  { id: "frontend", label: "Frontend & Architecture" },
  { id: "cloud-devops", label: "Cloud & DevOps" },
];
