"use client";

import * as React from "react";
import {
  executeTerminalCommand,
  AVAILABLE_COMMANDS,
  TerminalExecutionResult,
  SkillCategory,
  ProjectInfo,
  CareerItem,
} from "@/lib/terminal-commands";
import { Container } from "@/components/ui/Container";
import {
  Terminal as TerminalIcon,
  Check,
  Copy,
  Trash2,
  CornerDownLeft,
  Sparkles,
  ExternalLink,
  Code2,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Briefcase,
  Layers,
  Cpu,
} from "lucide-react";

interface HistoryEntry {
  id: string;
  command: string;
  timestamp: string;
  result: TerminalExecutionResult;
}

const QUICK_COMMANDS = ["help", "skills", "projects", "experience", "hire", "contact", "stack"];

export function AiTerminal() {
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<HistoryEntry[]>(() => [
    {
      id: "init-1",
      command: "whoami",
      timestamp: "00:00:01",
      result: executeTerminalCommand("whoami"),
    },
    {
      id: "init-2",
      command: "help",
      timestamp: "00:00:02",
      result: executeTerminalCommand("help"),
    },
  ]);

  const [commandHistory, setCommandHistory] = React.useState<string[]>(["whoami", "help"]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(-1);
  const [copied, setCopied] = React.useState(false);

  const terminalBufferRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isInitialMount = React.useRef(true);

  const scrollToBottom = () => {
    if (terminalBufferRef.current) {
      terminalBufferRef.current.scrollTop = terminalBufferRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [history]);

  const handleExecute = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const timeStr = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const res = executeTerminalCommand(cmd);

    if (res.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          command: cmd,
          timestamp: timeStr,
          result: res,
        },
      ]);
    }

    setCommandHistory((prev) => [cmd, ...prev.filter((c) => c !== cmd)]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleExecute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleClear = () => {
    setHistory([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCopy = () => {
    const textToCopy = history
      .map((entry) => {
        let content = `$ ${entry.command}\n`;
        if (entry.result.output.text) {
          content += entry.result.output.text + "\n";
        } else if (entry.result.output.data) {
          content += JSON.stringify(entry.result.output.data, null, 2) + "\n";
        }
        return content;
      })
      .join("\n");

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      id="interactive-terminal"
      className="py-12 md:py-20 relative border-b border-border-subtle/40"
    >
      <Container className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Command Shell</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Web Dev Terminal
            </h2>
            <p className="text-sm text-text-secondary max-w-xl">
              Cek spesifikasi tech stack, proyek aktif, pengalaman kerja, atau status ketersediaan proyek langsung melalui CLI interaktif.
            </p>
          </div>

          {/* Quick Command Pills for quick clicks */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs text-text-muted font-mono whitespace-nowrap mr-1">
              Quick commands:
            </span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  handleExecute(cmd);
                  focusInput();
                }}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface-elevated text-emerald-400 border border-border-subtle hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Obsidian Box */}
        <div
          onClick={focusInput}
          className="w-full rounded-xl bg-surface-card border border-border-subtle shadow-2xl shadow-black/80 overflow-hidden font-mono text-sm transition-all focus-within:border-emerald-500/40"
        >
          {/* Window Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111317] border-b border-border-subtle select-none">
            {/* Dots + Window Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
              </div>
              <div className="flex items-center gap-2 pl-2 text-xs text-text-muted">
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-text-secondary font-medium">
                  faisal@dev-workspace:~$ (web-fullstack-env)
                </span>
                <span className="sm:hidden text-text-secondary font-medium">
                  faisal@dev
                </span>
              </div>
            </div>

            {/* Actions: Live status, Copy, Clear */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE SESSION</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className="p-1.5 rounded text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
                title="Copy Terminal Output"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="p-1.5 rounded text-text-muted hover:text-red-400 hover:bg-surface-elevated transition-colors"
                title="Clear Output Buffer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Content Buffer */}
          <div
            ref={terminalBufferRef}
            className="p-4 sm:p-6 min-h-[340px] max-h-[500px] overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed"
          >
            {/* Session Welcome Info */}
            <div className="text-text-muted space-y-1 pb-2 border-b border-border-subtle/40">
              <div className="text-emerald-400 font-semibold">
                M. Faisal Fahri Developer Shell v2.6.4 (linux-web-core)
              </div>
              <div>
                Ketik <span className="text-cyan-400 font-semibold">&apos;help&apos;</span> untuk melihat perintah atau klik chip di atas.
              </div>
            </div>

            {/* History Items */}
            {history.map((entry) => (
              <div key={entry.id} className="space-y-2">
                {/* Command prompt row */}
                <div className="flex items-center gap-2 text-text-muted">
                  <span className="text-emerald-400 font-bold">faisal@dev:~$</span>
                  <span className="text-text-primary font-semibold">{entry.command}</span>
                  <span className="text-[10px] text-text-muted ml-auto font-sans">
                    {entry.timestamp}
                  </span>
                </div>

                {/* Output render */}
                <div className="pl-4 sm:pl-6 text-text-secondary border-l border-border-subtle/60 py-1">
                  {renderTerminalOutput(entry.result.output)}
                </div>
              </div>
            ))}

            {/* Active Command Input Line */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-emerald-400 font-bold whitespace-nowrap">faisal@dev:~$</span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik perintah (contoh: 'skills', 'projects', 'hire')..."
                  className="w-full bg-transparent text-text-primary placeholder:text-text-muted/60 focus:outline-none font-mono text-xs sm:text-sm py-0.5"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button
                  type="button"
                  onClick={() => handleExecute(input)}
                  className="p-1 text-text-muted hover:text-emerald-400 transition-colors"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function renderTerminalOutput(output: TerminalExecutionResult["output"]) {
  switch (output.type) {
    case "help": {
      const commands = output.data as typeof AVAILABLE_COMMANDS;
      return (
        <div className="space-y-2">
          <div className="text-emerald-400 font-semibold mb-2">Available System Commands:</div>
          <div className="grid grid-cols-1 gap-1.5">
            {commands.map((c) => (
              <div key={c.command} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="w-28 text-cyan-400 font-semibold">{c.command}</span>
                <span className="text-text-secondary text-xs">{c.description}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "skills": {
      const skills = output.data as SkillCategory[];
      return (
        <div className="space-y-4">
          <div className="text-emerald-400 font-semibold">Categorized Technical Expertise:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((category) => (
              <div
                key={category.category}
                className="p-3 rounded-lg bg-surface-elevated/60 border border-border-subtle space-y-2"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{category.category}</span>
                </div>
                <div className="space-y-1.5 pl-2 border-l border-border-subtle">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="text-text-primary font-medium">{item.name}: </span>
                      <span className="text-text-muted">{item.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "projects": {
      const projects = output.data as ProjectInfo[];
      return (
        <div className="space-y-3">
          <div className="text-emerald-400 font-semibold">Flagship Engineered Systems:</div>
          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.slug}
                className="p-3 rounded-lg bg-surface-elevated/60 border border-border-subtle space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-text-primary font-bold">{p.name}</span>
                    <span className="text-xs text-text-muted">({p.slug})</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {p.metrics}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{p.tagline}</p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded bg-surface-ground text-[10px] text-text-muted border border-border-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "experience": {
      const experience = output.data as CareerItem[];
      return (
        <div className="space-y-3">
          <div className="text-emerald-400 font-semibold">Career Timeline &amp; Systems Architecture:</div>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-surface-elevated/60 border border-border-subtle space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-text-primary font-bold">{exp.role}</span>
                    <span className="text-text-muted">@ {exp.company}</span>
                  </div>
                  <span className="text-xs text-cyan-400 font-mono">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-text-secondary pl-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "hire": {
      const hire = output.data as typeof import("@/lib/terminal-commands").TERMINAL_HIRE;
      return (
        <div className="space-y-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <div className="text-emerald-400 font-bold text-sm">{hire.status}</div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-text-primary font-semibold">Available For:</span>
              <ul className="list-disc list-inside text-text-secondary pl-1 pt-1">
                {hire.engagementTypes.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-text-primary font-semibold">Target Roles:</span>
              <ul className="list-disc list-inside text-text-secondary pl-1 pt-1">
                {hire.roles.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="pt-2 text-text-muted">
              To discuss opportunities, run <span className="text-cyan-400 font-semibold">&apos;contact&apos;</span> or email direct.
            </div>
          </div>
        </div>
      );
    }

    case "contact": {
      const contact = output.data as typeof import("@/lib/terminal-commands").TERMINAL_CONTACT;
      return (
        <div className="space-y-2 p-3 rounded-lg bg-surface-elevated/60 border border-border-subtle">
          <div className="text-emerald-400 font-semibold text-xs">Direct Contact Endpoints:</div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-text-muted w-20">Email:</span>
              <a href={`mailto:${contact.email}`} className="text-emerald-400 hover:underline">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-text-muted w-20">GitHub:</span>
              <a href={contact.github} target="_blank" rel="noreferrer" className="text-text-primary hover:underline">
                {contact.github}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-text-muted w-20">LinkedIn:</span>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-text-primary hover:underline">
                {contact.linkedin}
              </a>
            </div>
            <div className="pt-1 text-[11px] text-text-muted">
              Lokasi: {contact.location}
            </div>
          </div>
        </div>
      );
    }

    case "stack": {
      const stack = output.data as typeof import("@/lib/terminal-commands").TERMINAL_STACK;
      return (
        <div className="space-y-2 p-3 rounded-lg bg-surface-elevated/60 border border-border-subtle">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>Application Tech Stack &amp; Architecture:</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div>
              <span className="text-cyan-400 font-semibold">Web Runtime:</span>{" "}
              <span className="text-text-secondary">{stack.runtime}</span>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Frontend:</span>{" "}
              <span className="text-text-secondary">{stack.frontend_ecosystem}</span>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Backend:</span>{" "}
              <span className="text-text-secondary">{stack.backend_stack}</span>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Database &amp; Cache:</span>{" "}
              <span className="text-text-secondary">{stack.database_cache}</span>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">DevOps &amp; Infra:</span>{" "}
              <span className="text-text-secondary">{stack.devops_infra}</span>
            </div>
          </div>
        </div>
      );
    }

    case "error":
      return (
        <div className="text-red-400 text-xs">
          {output.text}
        </div>
      );

    case "text":
    default:
      return (
        <div className="whitespace-pre-line text-xs sm:text-sm text-text-secondary">
          {output.text}
        </div>
      );
  }
}
