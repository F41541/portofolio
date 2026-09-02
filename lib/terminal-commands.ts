export interface CommandOutput {
  type: "text" | "tree" | "projects" | "skills" | "experience" | "contact" | "hire" | "stack" | "help" | "error";
  text?: string;
  data?: any;
}

export interface TerminalExecutionResult {
  clear?: boolean;
  output: CommandOutput;
}

export interface ProjectInfo {
  name: string;
  slug: string;
  tagline: string;
  tags: string[];
  metrics: string;
}

export interface SkillCategory {
  category: string;
  items: { name: string; level?: string; notes?: string }[];
}

export interface CareerItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export const TERMINAL_PROJECTS: ProjectInfo[] = [
  {
    name: "EdgeAI Inference Mesh",
    slug: "edge-inference-mesh",
    tagline: "Sub-50ms model serving cluster at the network edge with WebAssembly runtimes",
    tags: ["Rust", "Wasm", "ONNX", "Kubernetes", "gRPC"],
    metrics: "50k req/s, p99 < 42ms",
  },
  {
    name: "Autonomous Trading Engine",
    slug: "autonomous-trading-engine",
    tagline: "Low-latency algorithmic order router and risk engine handling real-time order books",
    tags: ["C++", "Python", "ZeroMQ", "PostgreSQL", "WebSocket"],
    metrics: "Sub-millisecond execution, 99.999% SLA",
  },
  {
    name: "Distributed Task Queue",
    slug: "distributed-task-queue",
    tagline: "High-throughput asynchronous task orchestrator with Raft consensus and priority queues",
    tags: ["Go", "Redis", "Distributed Systems", "Protobuf"],
    metrics: "10M+ daily events, zero data loss",
  },
  {
    name: "Realtime Telemetry & APM",
    slug: "cloud-native-observability",
    tagline: "Multi-tenant tracing pipeline streaming 100k+ events/sec with eBPF probes",
    tags: ["TypeScript", "ClickHouse", "eBPF", "Kafka", "Grafana"],
    metrics: "100k+ events/sec ingested, real-time dashboarding",
  },
];

export const TERMINAL_SKILLS: SkillCategory[] = [
  {
    category: "AI & Machine Learning",
    items: [
      { name: "LLM Agent Frameworks", notes: "LangChain, LlamaIndex, AutoGen" },
      { name: "Model Fine-tuning & RAG", notes: "LoRA, QLoRA, Vector DBs (Pinecone, Qdrant)" },
      { name: "Inference & Optimization", notes: "vLLM, TensorRT, ONNX, Ollama" },
      { name: "Core ML Tools", notes: "PyTorch, Hugging Face, Scikit-learn" },
    ],
  },
  {
    category: "Backend & Distributed Systems",
    items: [
      { name: "Languages", notes: "TypeScript, Python, Go, Rust" },
      { name: "Frameworks & Protocols", notes: "Node.js, FastAPI, gRPC, GraphQL, WebSocket" },
      { name: "Data Stores", notes: "PostgreSQL, Redis, ClickHouse, MongoDB" },
      { name: "Streaming & Queues", notes: "Apache Kafka, RabbitMQ, BullMQ" },
    ],
  },
  {
    category: "Cloud, DevOps & Infra",
    items: [
      { name: "Container & Orchestration", notes: "Docker, Kubernetes, Helm" },
      { name: "Cloud Providers", notes: "AWS, GCP, Cloudflare Workers/Pages, Vercel" },
      { name: "Observability & CI/CD", notes: "Prometheus, Grafana, OpenTelemetry, GitHub Actions" },
      { name: "IaC & Security", notes: "Terraform, Vault, IAM, OAuth2/OIDC" },
    ],
  },
  {
    category: "Frontend & Full-Stack",
    items: [
      { name: "Frameworks", notes: "Next.js 15 (App Router), React 19, Remix" },
      { name: "Styling & UI", notes: "Tailwind CSS, Radix UI, Framer Motion" },
      { name: "State & Data Fetching", notes: "TanStack Query, Zustand, Server Actions" },
      { name: "Tooling & Standards", notes: "TypeScript, Vite, Webpack, Playwright, Jest" },
    ],
  },
];

export const TERMINAL_EXPERIENCE: CareerItem[] = [
  {
    role: "Staff AI & Systems Architect",
    company: "Autonomous Scale Labs",
    period: "2023 - Present",
    highlights: [
      "Architected multi-agent LLM orchestration engines serving 10M+ monthly requests.",
      "Engineered sub-50ms vector search retrieval pipeline with hybrid BM25 and dense embeddings.",
      "Led technical infrastructure and high-scale Next.js / TypeScript edge applications.",
    ],
  },
  {
    role: "Senior Distributed Systems Engineer",
    company: "Nexus Cloud Systems",
    period: "2021 - 2023",
    highlights: [
      "Built resilient Raft consensus task queues handling distributed compute workloads.",
      "Cut p99 API latency by 45% through Go zero-allocation patterns and Redis caching layers.",
      "Implemented eBPF-based real-time telemetry pipeline ingesting 100k+ events/sec.",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Vertex Interactive",
    period: "2019 - 2021",
    highlights: [
      "Designed and deployed enterprise SaaS applications in Next.js, React, Node.js, and PostgreSQL.",
      "Delivered real-time collaboration canvas with WebSocket syncing and optimistic mutations.",
    ],
  },
];

export const TERMINAL_CONTACT = {
  email: "alex@engineer.dev",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  x: "https://x.com",
  matrix: "@alex:matrix.org",
  timezone: "UTC-5 (EST) / Flexible for Global Teams",
};

export const TERMINAL_HIRE = {
  status: "🟢 Available for high-impact opportunities",
  roles: [
    "Staff / Senior Full-Stack & AI Engineer",
    "Distributed Systems Architect",
    "Fractional Technical Advisor / Consultant",
  ],
  engagementTypes: [
    "Full-Time (Remote / Hybrid)",
    "Contract / Project Sprint Architecture",
    "Technical Advisory & Systems Review",
  ],
  focusAreas: [
    "Production LLM Agent Workflows & RAG Systems",
    "High-Performance Web Architecture (Next.js 15, React 19)",
    "Distributed Microservices & Cloud-Native Infra",
  ],
};

export const TERMINAL_WHOAMI = {
  name: "Alex Rivera",
  role: "AI & Full-Stack Systems Engineer",
  location: "San Francisco, CA / Remote",
  bio: "5+ years crafting production-grade distributed architectures, autonomous AI pipelines, and ultra-responsive full-stack systems. Passionate about system latency, zero-downtime deployments, and intuitive developer experiences.",
  interests: ["Distributed Consensus", "Local LLMs & Speculative Decoding", "eBPF & Kernel Tracing", "Design Systems & Web Performance"],
};

export const TERMINAL_STACK = {
  runtime: "Next.js 15 (App Router) + React 19 + TypeScript",
  ai_ml: "PyTorch, LangChain, LlamaIndex, vLLM, Hugging Face Transformers",
  styling: "Tailwind CSS + Custom Design Tokens + Framer Motion",
  backend_infra: "Node.js, Go, Rust, PostgreSQL, Redis, ClickHouse, Docker, Kubernetes",
  hosting: "Vercel Edge Network, Cloudflare Workers, AWS",
};

export const AVAILABLE_COMMANDS = [
  { command: "help", description: "Display available CLI commands and usage guide" },
  { command: "skills", description: "List categorized technical expertise across AI, Backend, Cloud & Frontend" },
  { command: "projects", description: "Explore flagship production systems and open-source projects" },
  { command: "experience", description: "Review career timeline, staff roles, and architectural impact" },
  { command: "hire", description: "Check availability status, open roles, and engagement models" },
  { command: "contact", description: "Get direct contact endpoints, social links, and email" },
  { command: "whoami", description: "Display developer bio, background, and core philosophy" },
  { command: "stack", description: "Inspect current application tech stack and architecture" },
  { command: "clear", description: "Clear terminal screen and command history buffer" },
];

export function executeTerminalCommand(input: string): TerminalExecutionResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      output: {
        type: "text",
        text: "",
      },
    };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "clear":
    case "cls":
      return {
        clear: true,
        output: {
          type: "text",
          text: "",
        },
      };

    case "help":
    case "?":
    case "man":
      return {
        output: {
          type: "help",
          data: AVAILABLE_COMMANDS,
        },
      };

    case "skills":
    case "skill":
    case "tech":
    case "techstack":
      return {
        output: {
          type: "skills",
          data: TERMINAL_SKILLS,
        },
      };

    case "projects":
    case "project":
    case "work":
    case "portfolio":
      return {
        output: {
          type: "projects",
          data: TERMINAL_PROJECTS,
        },
      };

    case "experience":
    case "exp":
    case "history":
    case "resume":
    case "career":
      return {
        output: {
          type: "experience",
          data: TERMINAL_EXPERIENCE,
        },
      };

    case "contact":
    case "email":
    case "social":
    case "reach":
      return {
        output: {
          type: "contact",
          data: TERMINAL_CONTACT,
        },
      };

    case "hire":
    case "hireme":
    case "availability":
    case "status":
      return {
        output: {
          type: "hire",
          data: TERMINAL_HIRE,
        },
      };

    case "whoami":
    case "about":
    case "bio":
    case "author":
      return {
        output: {
          type: "text",
          data: TERMINAL_WHOAMI,
          text: `Name: ${TERMINAL_WHOAMI.name}\nTitle: ${TERMINAL_WHOAMI.role}\nLocation: ${TERMINAL_WHOAMI.location}\n\n${TERMINAL_WHOAMI.bio}\n\nCore Focus: ${TERMINAL_WHOAMI.interests.join(" • ")}`,
        },
      };

    case "stack":
    case "sysinfo":
    case "specs":
      return {
        output: {
          type: "stack",
          data: TERMINAL_STACK,
        },
      };

    case "sudo":
      return {
        output: {
          type: "error",
          text: `sudo: permission denied: ${args.join(" ") || "command"}. Nice try! You are operating in sandboxed guest mode.`,
        },
      };

    case "exit":
    case "quit":
      return {
        output: {
          type: "text",
          text: "Interactive terminal session remains active. Type 'help' for command list.",
        },
      };

    default: {
      // Natural language / Conversational question detection
      const lower = trimmed.toLowerCase();
      if (lower.includes("how are you") || lower.includes("hello") || lower.includes("hi")) {
        return {
          output: {
            type: "text",
            text: "Hello! AI Systems Core is online and operating at nominal parameters. Type 'help' or click any command pill to explore.",
          },
        };
      }

      if (lower.includes("ai") || lower.includes("rag") || lower.includes("llm")) {
        return {
          output: {
            type: "text",
            text: "My AI stack leverages PyTorch, LangChain, vLLM, and hybrid vector retrieval systems for production agent workflows. Type 'skills' or 'projects' to see specific systems.",
          },
        };
      }

      if (lower.includes("rate") || lower.includes("salary") || lower.includes("available")) {
        return {
          output: {
            type: "hire",
            data: TERMINAL_HIRE,
          },
        };
      }

      return {
        output: {
          type: "error",
          text: `command not found: "${trimmed}". Type 'help' to see list of valid commands or click a chip below.`,
        },
      };
    }
  }
}
