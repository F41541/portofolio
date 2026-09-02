import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Info, AlertTriangle, Lightbulb, CheckCircle2, ArrowUpRight } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

export interface CalloutProps {
  type?: "info" | "warning" | "tip" | "success";
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  type = "info",
  title,
  children,
}) => {
  const configs = {
    info: {
      icon: Info,
      border: "border-cyan-500/30",
      bg: "bg-cyan-950/20",
      iconColor: "text-cyan-400",
      titleColor: "text-cyan-300",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-amber-500/30",
      bg: "bg-amber-950/20",
      iconColor: "text-amber-400",
      titleColor: "text-amber-300",
    },
    tip: {
      icon: Lightbulb,
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
      iconColor: "text-accent-emerald",
      titleColor: "text-emerald-300",
    },
    success: {
      icon: CheckCircle2,
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
      iconColor: "text-accent-emerald",
      titleColor: "text-emerald-300",
    },
  };

  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <div
      className={`my-6 rounded-xl border ${config.border} ${config.bg} p-4 md:p-5 text-sm text-text-primary backdrop-blur-sm`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-1 ${config.titleColor}`}>{title}</h4>
          )}
          <div className="text-text-secondary leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={`mt-10 mb-4 text-3xl font-extrabold tracking-tight text-text-primary scroll-mt-24 ${
        className || ""
      }`}
      {...props}
    />
  ),
  h2: ({ className, id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId =
      id ||
      (typeof children === "string"
        ? children.toLowerCase().replace(/\W+/g, "-")
        : undefined);
    return (
      <h2
        id={headingId}
        className={`group flex items-center gap-2 mt-12 mb-4 text-2xl font-bold tracking-tight text-text-primary scroll-mt-24 border-b border-border-subtle/50 pb-2 ${
          className || ""
        }`}
        {...props}
      >
        <span>{children}</span>
        {headingId && (
          <a
            href={`#${headingId}`}
            aria-label="Link to section"
            className="opacity-0 group-hover:opacity-100 text-accent-emerald transition-opacity ml-1"
          >
            #
          </a>
        )}
      </h2>
    );
  },
  h3: ({ className, id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId =
      id ||
      (typeof children === "string"
        ? children.toLowerCase().replace(/\W+/g, "-")
        : undefined);
    return (
      <h3
        id={headingId}
        className={`group flex items-center gap-2 mt-8 mb-3 text-xl font-semibold tracking-tight text-text-primary scroll-mt-24 ${
          className || ""
        }`}
        {...props}
      >
        <span>{children}</span>
        {headingId && (
          <a
            href={`#${headingId}`}
            aria-label="Link to section"
            className="opacity-0 group-hover:opacity-100 text-accent-emerald transition-opacity ml-1"
          >
            #
          </a>
        )}
      </h3>
    );
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={`my-4 text-base leading-relaxed text-text-secondary ${
        className || ""
      }`}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={`my-4 ml-6 list-disc space-y-2 text-text-secondary marker:text-accent-emerald ${
        className || ""
      }`}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={`my-4 ml-6 list-decimal space-y-2 text-text-secondary marker:text-accent-cyan ${
        className || ""
      }`}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={`leading-relaxed ${className || ""}`} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={`my-6 border-l-4 border-accent-emerald bg-surface-card/60 rounded-r-lg px-5 py-4 italic text-text-primary backdrop-blur-sm ${
        className || ""
      }`}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={`my-10 border-border-subtle ${className || ""}`}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-xl border border-border-subtle">
      <table className={`w-full border-collapse text-sm ${className || ""}`} {...props} />
    </div>
  ),
  th: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={`border-b border-border-subtle bg-surface-card px-4 py-3 text-left font-semibold text-text-primary ${
        className || ""
      }`}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={`border-b border-border-subtle/50 px-4 py-3 text-text-secondary ${
        className || ""
      }`}
      {...props}
    />
  ),
  pre: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement>) => {
    return <CodeBlock {...props}>{children}</CodeBlock>;
  },
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // If inside pre or has language class, let pre render CodeBlock
    const isInline = !className?.includes("language-");
    if (isInline) {
      return (
        <code
          className={`rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs md:text-sm text-accent-emerald border border-border-subtle ${
            className || ""
          }`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  a: ({
    href = "",
    children,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-0.5 font-medium text-accent-emerald hover:underline ${
            className || ""
          }`}
          {...props}
        >
          <span>{children}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={`font-medium text-accent-emerald hover:underline ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-8 overflow-hidden rounded-xl border border-border-subtle bg-surface-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || "Article illustration"}
        className="w-full object-cover max-h-[500px]"
        loading="lazy"
        {...props}
      />
      {alt && (
        <p className="py-2 text-center text-xs text-text-muted italic bg-surface-ground">
          {alt}
        </p>
      )}
    </div>
  ),
  Callout,
  CodeBlock,
};
