export interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  slug: string;
  category: "AI / LLM" | "Distributed Systems" | "Data Engineering" | "Frontend & Systems";
  featured: boolean;
  status: "Production" | "Active Benchmark" | "Live Demo" | "Open Source";
  stats: {
    label: string;
    value: string;
  }[];
  architecture: {
    flow: string[];
    highlights: string[];
  };
  metrics: {
    latency: string;
    throughput: string;
    uptime?: string;
  };
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  caseStudyUrl: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "autonomous-multi-agent-orchestration",
    title: "Autonomous Multi-Agent Orchestration Platform",
    tagline: "Resilient state machine & graph-based autonomous agents coordinating distributed tool executions.",
    description:
      "Enterprise agentic execution engine built on top of LangGraph, Python FastAPI, and Next.js 15. Features dynamic sub-agent spawning, multi-turn state checkpointing in Redis, human-in-the-loop validation checkpoints, and streaming token telemetry over SSE.",
    slug: "autonomous-agent-platform",
    category: "AI / LLM",
    featured: true,
    status: "Production",
    stats: [
      { label: "Concurrent Sessions", value: "100k+" },
      { label: "Execution Reliability", value: "99.9%" },
      { label: "State Resumption", value: "<15ms" },
    ],
    architecture: {
      flow: ["Client (Next.js)", "SSE Stream Gateway", "LangGraph Orchestrator", "Redis State Engine", "Tool Worker Pool"],
      highlights: [
        "Dynamic graph branching with cyclic correction loops",
        "Deterministic snapshot serialization with Redis",
        "Streaming token buffers with client-side optimistic UI",
      ],
    },
    metrics: {
      latency: "<12ms",
      throughput: "100k rps",
      uptime: "99.99%",
    },
    techStack: ["LangGraph", "Python", "Next.js 15", "Redis", "TypeScript", "FastAPI", "Docker", "SSE"],
    githubUrl: "https://github.com/example/multi-agent-orchestration",
    liveDemoUrl: "https://agent-demo.example.com",
    caseStudyUrl: "/projects/autonomous-agent-platform",
  },
  {
    id: "distributed-vector-search-rag",
    title: "Distributed Vector Search Engine & RAG Pipeline",
    tagline: "Sub-10ms neural search and hybrid reranking across 50M+ document vectors.",
    description:
      "High-performance semantic retrieval pipeline written in Rust with Qdrant vector database integration and OpenAI embeddings. Features reciprocal rank fusion (RRF), BM25 + dense hybrid search, and semantic caching layer with 68% cache hit rate.",
    slug: "distributed-rag-engine",
    category: "AI / LLM",
    featured: true,
    status: "Active Benchmark",
    stats: [
      { label: "Index Scale", value: "50M+ Vecs" },
      { label: "P99 Query Latency", value: "8.4ms" },
      { label: "Cache Hit Rate", value: "68%" },
    ],
    architecture: {
      flow: ["Ingestion Pipeline", "Chunking & OpenAI Embedding", "Rust Search Core", "Qdrant HNSW Index", "Hybrid Reranker"],
      highlights: [
        "SIMD-accelerated cosine distance compute kernels",
        "Dual-phase hybrid search with Reciprocal Rank Fusion",
        "Asynchronous vector quantization reducing RAM footprint by 4x",
      ],
    },
    metrics: {
      latency: "<10ms",
      throughput: "24k qps",
      uptime: "99.95%",
    },
    techStack: ["Rust", "Qdrant", "OpenAI Embeddings", "FastAPI", "Tokio", "gRPC", "Docker"],
    githubUrl: "https://github.com/example/vector-search-rag",
    liveDemoUrl: "https://search-rag.example.com",
    caseStudyUrl: "/projects/distributed-rag-engine",
  },
  {
    id: "high-throughput-financial-events",
    title: "High-Throughput Financial Event Processing",
    tagline: "Sub-millisecond event streaming gateway processing 50,000 events/sec with zero loss.",
    description:
      "Distributed event stream processor engineered in Go, Apache Kafka, and ClickHouse OLAP. Implements lock-free ring buffers, exactly-once delivery semantics via transactional outbox, and real-time anomaly detection pipelines.",
    slug: "high-throughput-event-stream",
    category: "Data Engineering",
    featured: true,
    status: "Production",
    stats: [
      { label: "Peak Ingestion", value: "50,000 eps" },
      { label: "Ingest-to-Query", value: "<120ms" },
      { label: "Zero Data Loss", value: "100%" },
    ],
    architecture: {
      flow: ["Market Feeds", "Go Ingestion Gateway", "Kafka Cluster", "Stream Aggregator", "ClickHouse OLAP"],
      highlights: [
        "Lock-free memory pools achieving zero garbage collection spikes",
        "Automated partition rebalancing with zero consumer lag",
        "Materialized views in ClickHouse for microsecond metric rollups",
      ],
    },
    metrics: {
      latency: "0.8ms",
      throughput: "50k eps",
      uptime: "99.999%",
    },
    techStack: ["Go", "Apache Kafka", "ClickHouse", "gRPC", "Prometheus", "Kubernetes"],
    githubUrl: "https://github.com/example/financial-event-processing",
    liveDemoUrl: "https://events.example.com",
    caseStudyUrl: "/projects/high-throughput-event-stream",
  },
  {
    id: "next-gen-developer-canvas",
    title: "Next-Gen Developer Knowledge Canvas",
    tagline: "Infinite-canvas visual IDE with real-time WebAssembly graph rendering engine.",
    description:
      "Collaborative architecture mapping and system execution canvas. Uses custom WebAssembly compiled Rust kernels with HTML5 Canvas API and WebSockets for multi-user CRDT synchronization at 60 FPS under 100,000 simultaneous visual nodes.",
    slug: "developer-knowledge-canvas",
    category: "Frontend & Systems",
    featured: true,
    status: "Open Source",
    stats: [
      { label: "Render Frame Rate", value: "60 FPS" },
      { label: "Node Capacity", value: "100k nodes" },
      { label: "Sync Latency", value: "<25ms" },
    ],
    architecture: {
      flow: ["Browser Canvas API", "Rust Wasm Render Core", "CRDT Sync Engine", "WebSocket Mesh", "Edge State Store"],
      highlights: [
        "Spatial quadtree indexing for viewport culling",
        "Zero-copy typed array data transfer between Wasm & JS",
        "Yjs-based conflict-free replicated data types for peer sync",
      ],
    },
    metrics: {
      latency: "16.6ms frame",
      throughput: "60 fps",
    },
    techStack: ["TypeScript", "WebAssembly", "Rust", "Canvas API", "WebSockets", "React 19", "Tailwind CSS"],
    githubUrl: "https://github.com/example/developer-knowledge-canvas",
    liveDemoUrl: "https://canvas.example.com",
    caseStudyUrl: "/projects/developer-knowledge-canvas",
  },
];
