import type { Metadata } from "next";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Code2,
  Server,
  Shield,
  Zap,
  GraduationCap,
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Box,
  Binary,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProfilePageJsonLd, BreadcrumbListJsonLd } from "@/components/seo";

export const metadata: Metadata = {
  title: "About | Alex Vance - AI & Full-Stack Systems Engineer",
  description:
    "Engineering philosophy, distributed systems journey, modern autonomous AI agent architectures, hardware/software stack, and open source impact of Alex Vance.",
  openGraph: {
    title: "About | Alex Vance - AI & Full-Stack Systems Engineer",
    description:
      "Journey from distributed systems to modern autonomous AI agent architectures.",
  },
};

const PHILOSOPHIES = [
  {
    icon: <Layers className="w-5 h-5 text-emerald-400" />,
    title: "Systems First, Frameworks Second",
    subtitle: "Enduring Fundamentals",
    description:
      "Frameworks evolve rapidly, but foundational computer science principles—data locality, cache hierarchies, protocol ergonomics, and concurrency primitives—remain invariants. I engineer systems by modeling data flows and state lifetimes first, picking the cleanest tooling to materialize them.",
  },
  {
    icon: <Binary className="w-5 h-5 text-cyan-400" />,
    title: "Determinism in Probabilistic AI",
    subtitle: "Hardened Agent Frameworks",
    description:
      "Large Language Models provide unprecedented cognitive elasticity, but production demands predictability. I treat LLMs not as magic boxes, but as nondeterministic compute nodes bounded by strict state validation, cyclic state graphs, fallback policies, and typed schemas.",
  },
  {
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    title: "Observability as a First-Class Citizen",
    subtitle: "Zero Blind Spots",
    description:
      "If you cannot measure internal state, you cannot reason about latency or failure. Telemetry, structured logs, and distributed trace propagation (via eBPF / OpenTelemetry) are designed directly into the domain models from day zero, not patched on post-incident.",
  },
  {
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    title: "Zero Waste & Mechanical Sympathy",
    subtitle: "Performance at the Metal",
    description:
      "Whether it is eliminating unnecessary allocations in Go garbage-collected runtimes, minimizing round-trips over gRPC connections, or optimizing vector quantization in Rust, understanding underlying hardware mechanics produces scalable architectures that save real compute dollars.",
  },
];

const HARDWARE_STACK = [
  {
    label: "Primary Machine",
    spec: "Apple MacBook Pro 16\" (M3 Max, 64GB Unified Memory, 2TB NVMe)",
    desc: "Mobile workstation for rapid multi-model benchmarking & full-stack development",
  },
  {
    label: "Dev Cluster & Compute",
    spec: "Custom Linux Node (AMD Ryzen 9 7950X, 128GB DDR5, Dual RTX 4090 24GB)",
    desc: "Local PyTorch fine-tuning, Ollama/vLLM inference testing & heavy container builds",
  },
  {
    label: "Peripherals & Display",
    spec: "Dell UltraSharp 32\" 4K USB-C Hub + Ergodox EZ Mechanical Keyboard",
    desc: "Ergonomic configuration tuned for long async focus sessions",
  },
];

const SOFTWARE_STACK = [
  {
    category: "Editor & Terminal",
    items: ["Neovim (Lua config)", "VS Code (Remote SSH)", "Ghostty / WezTerm", "Tmux", "Zsh + Starship"],
  },
  {
    category: "Operating Systems",
    items: ["macOS Sequoia (Daily)", "Arch Linux (Custom Kernel)", "Debian / Ubuntu Server"],
  },
  {
    category: "Core Languages",
    items: ["TypeScript / Node / Bun", "Go (Golang)", "Python 3.12+", "Rust", "SQL (Postgres)"],
  },
  {
    category: "AI & Vector Tooling",
    items: ["LangGraph / LangChain", "Qdrant / Pinecone", "PyTorch / Transformers", "Ollama / vLLM"],
  },
];

const CREDENTIALS = [
  {
    title: "B.S. in Computer Science",
    issuer: "University of California, Berkeley",
    period: "2015 — 2019",
    detail: "Focus on Distributed Systems, Operating Systems & Concurrent Computing.",
  },
  {
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    period: "Verified",
    detail: "Enterprise-grade multi-region architectures, VPC topologies, and IAM zero-trust.",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    period: "Verified",
    detail: "Production cluster operations, etcd backups, container networking & CNI plugins.",
  },
];

const OPEN_SOURCE_IMPACT = [
  {
    stat: "12k+",
    label: "GitHub Stars Across Projects",
    desc: "Created and contributed to open-source distributed queues, agent runtimes, and developer tooling.",
  },
  {
    stat: "50M+",
    label: "Docker Image Pulls",
    desc: "Maintained lightweight distroless container images widely adopted by Go and Python teams.",
  },
  {
    stat: "100k+",
    label: "Technical Readers",
    desc: "Published deep dives on zero-allocation Go, eBPF telemetry, and multi-agent memory patterns.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 lg:py-20 flex-1 flex flex-col space-y-16 sm:space-y-24">
      {/* Inject JSON-LD */}
      <ProfilePageJsonLd
        name="About | Alex Vance - AI & Full-Stack Systems Engineer"
        description="Engineering philosophy, distributed systems journey, modern autonomous AI agent architectures, hardware/software stack, and open source impact of Alex Vance."
        url="https://alexvance.dev/about"
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "https://alexvance.dev" },
          { name: "About", url: "https://alexvance.dev/about" },
        ]}
      />

      <Container>
        {/* Section 1: Executive Bio */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <Badge variant="emerald" dot className="font-mono text-xs">
              Executive Profile
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
              Engineering Resilient Systems &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Autonomous Intelligence
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed pt-2">
              Hi, I&apos;m Alex Vance. Over the last 8+ years, I have navigated the
              evolution of software architecture — starting with high-throughput
              financial transaction gateways and distributed consensus engines,
              to modern agentic AI networks running at the network edge.
            </p>
          </div>

          {/* Narrative paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed font-normal border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <p>
              My journey began in low-level systems programming: analyzing CPU
              cache lines, profiling Go garbage collector pause times, and
              building real-time market event streams handling hundreds of millions
              in transactional volume. That era instilled a deep respect for
              hardware limits and deterministic predictability.
            </p>
            <p>
              When the generative AI paradigm shift arrived, I realized the biggest
              unsolved challenge wasn&apos;t just training models—it was wrapping
              probabilistic neural nets into dependable, observable, and low-latency
              production architectures. Today, I lead architecture at the
              intersection of distributed backends and multi-agent AI graphs,
              helping engineering teams ship autonomous agents with 99.9%
              execution integrity.
            </p>
            <p>
              I believe great software is crafted at the boundary where rigorous
              systems engineering meets fluid, intuitive human experiences.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-emerald-400">
                8+
              </div>
              <div className="text-xs text-text-muted mt-1">
                Years in Systems &amp; Web
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-cyan-400">
                10M+
              </div>
              <div className="text-xs text-text-muted mt-1">
                Monthly Active Endpoints
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-emerald-400">
                &lt;10ms
              </div>
              <div className="text-xs text-text-muted mt-1">
                P99 Vector Retrieval SLA
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-card border border-border-subtle">
              <div className="text-2xl font-bold font-mono text-cyan-400">
                99.9%
              </div>
              <div className="text-xs text-text-muted mt-1">
                Agent State Reliability
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Section 2: Engineering Philosophy */}
      <div className="bg-surface-card/40 border-y border-border-subtle py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-2">
              <Badge variant="cyan" className="font-mono text-xs">
                Core Mindset
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Engineering Principles &amp; Philosophy
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                The technical tenets that guide every architectural decision, RFC,
                and pull request I produce.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PHILOSOPHIES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-card border border-border-subtle hover:border-border-accent transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-emerald-400/80 mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Section 3: Hardware & Software Setup */}
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-2">
            <Badge variant="emerald" className="font-mono text-xs">
              Environment
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Work Environment &amp; Development Setup
            </h2>
            <p className="text-sm sm:text-base text-text-secondary">
              A high-efficiency workstation tuned for local model fine-tuning,
              kernel-level debugging, and rapid full-stack iteration.
            </p>
          </div>

          <div className="space-y-8">
            {/* Hardware */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Laptop className="w-4 h-4 text-emerald-400" />
                Hardware Infrastructure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {HARDWARE_STACK.map((hw, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-2"
                  >
                    <div className="text-xs font-mono font-semibold text-emerald-400">
                      {hw.label}
                    </div>
                    <div className="text-sm font-semibold text-text-primary leading-snug">
                      {hw.spec}
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {hw.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Tooling Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Software Toolchain &amp; Runtimes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SOFTWARE_STACK.map((group, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-3"
                  >
                    <div className="text-xs font-mono font-semibold text-text-secondary">
                      {group.category}
                    </div>
                    <ul className="space-y-1.5">
                      {group.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-text-muted flex items-center gap-2 font-mono"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                          <span className="text-text-primary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Section 4: Education, Credentials & Open Source */}
      <div className="bg-surface-card/40 border-y border-border-subtle py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-2">
              <Badge variant="cyan" className="font-mono text-xs">
                Credentials &amp; Ecosystem
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Education &amp; Open Source Impact
              </h2>
              <p className="text-sm sm:text-base text-text-secondary">
                Academic foundations, cloud certifications, and public developer
                contributions.
              </p>
            </div>

            {/* Open Source Impact Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OPEN_SOURCE_IMPACT.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-card border border-border-subtle space-y-2"
                >
                  <div className="text-3xl font-bold font-mono text-emerald-400">
                    {item.stat}
                  </div>
                  <div className="text-sm font-semibold text-text-primary">
                    {item.label}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Certs */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Degrees &amp; Formal Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CREDENTIALS.map((cred, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-surface-card border border-border-subtle space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-emerald-400 border border-emerald-500/20">
                          {cred.period}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-text-primary pt-1">
                        {cred.title}
                      </h4>
                      <p className="text-xs text-emerald-400 font-mono">
                        {cred.issuer}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed pt-2">
                      {cred.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Section 5: Direct CTA */}
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-surface-card to-cyan-500/10 p-8 sm:p-12 text-center space-y-6">
            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Let&apos;s Build Your Next Architecture
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Interested in working together or reviewing your systems topology?
                Explore current projects or reach out directly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto font-mono text-sm group">
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-mono text-sm">
                  <span>Explore Case Studies</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
