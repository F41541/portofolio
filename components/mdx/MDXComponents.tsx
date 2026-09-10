import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

function sanitizeHref(url?: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (
    (lower.startsWith("/") && !lower.startsWith("//")) ||
    lower.startsWith("#") ||
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:")
  ) {
    return trimmed;
  }
  return "#";
}

function getHeadingText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getHeadingText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return getHeadingText(props.children);
  }
  return "";
}

function slugifyHeading(node: React.ReactNode): string {
  const text = getHeadingText(node);
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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
    const headingId = id || slugifyHeading(children) || undefined;
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
    const headingId = id || slugifyHeading(children) || undefined;
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
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={`mt-6 mb-2 text-lg font-semibold tracking-tight text-text-primary ${
        className || ""
      }`}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={`mt-4 mb-2 text-base font-semibold tracking-tight text-text-primary ${
        className || ""
      }`}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={`mt-4 mb-1 text-sm font-semibold tracking-tight text-text-secondary ${
        className || ""
      }`}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={`my-8 border-t border-border-subtle ${className || ""}`}
      {...props}
    />
  ),
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
  pre: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement>) => {
    return <CodeBlock {...props}>{children}</CodeBlock>;
  },
  a: ({
    href = "",
    children,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const safeHref = sanitizeHref(href);
    const isHttp = /^https?:\/\//i.test(safeHref);
    const isDirect = isHttp || /^(mailto:|tel:)/i.test(safeHref);

    if (isHttp) {
      return (
        <a
          href={safeHref}
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

    if (isDirect) {
      return (
        <a
          href={safeHref}
          className={`font-medium text-accent-emerald hover:underline ${
            className || ""
          }`}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={safeHref}
        className={`font-medium text-accent-emerald hover:underline ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </Link>
    );
  },
  CodeBlock,
};
