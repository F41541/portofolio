"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className = "",
  language: propLanguage,
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  // Extract raw text from children
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) {
      const elementProps = node.props as { children?: React.ReactNode };
      return extractText(elementProps.children);
    }
    return "";
  };

  const rawCode = extractText(children).trim();

  // Detect language from class (e.g. language-typescript)
  const match = /language-(\w+)/.exec(className || "");
  const language = propLanguage || (match ? match[1] : "text");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="group relative my-6 rounded-xl border border-border-subtle bg-surface-ground/90 backdrop-blur-sm overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-card/80 border-b border-border-subtle text-xs font-mono text-text-secondary">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-accent-emerald" />
          <span className="font-semibold text-text-primary">
            {filename || language.toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-elevated hover:bg-surface-elevated/80 border border-border-subtle hover:border-accent-emerald/40 text-text-secondary hover:text-text-primary transition-all duration-150 text-xs focus:outline-none focus:ring-1 focus:ring-accent-emerald"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent-emerald" />
              <span className="text-accent-emerald font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-text-primary">
        <pre className="!bg-transparent !p-0 !m-0 font-mono text-xs md:text-sm">
          {children}
        </pre>
      </div>
    </div>
  );
};
