import React from "react";
import { MDXComponents } from "./MDXComponents";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  // Simple, robust markdown line parser supporting headers, lists, code blocks, blockquotes, paragraphs, hr, images
  const elements: React.ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal Rule: ---, ___, ***
    if (/^(---|___|\*\*\*)$/.test(line.trim())) {
      elements.push(
        <MDXComponents.hr key={`hr-${i}`} />
      );
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const language = line.trim().replace(/^```/, "");
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <MDXComponents.pre key={`code-${i}`}>
          <code className={language ? `language-${language}` : undefined}>
            {codeLines.join("\n")}
          </code>
        </MDXComponents.pre>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <MDXComponents.blockquote key={`quote-${i}`}>
          <p>{parseInlineMarkdown(quoteLines.join(" "))}</p>
        </MDXComponents.blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      elements.push(
        <MDXComponents.ul key={`ul-${i}`}>
          {listItems.map((item, idx) => (
            <MDXComponents.li key={idx}>
              {parseInlineMarkdown(item)}
            </MDXComponents.li>
          ))}
        </MDXComponents.ul>
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <MDXComponents.ol key={`ol-${i}`}>
          {listItems.map((item, idx) => (
            <MDXComponents.li key={idx}>
              {parseInlineMarkdown(item)}
            </MDXComponents.li>
          ))}
        </MDXComponents.ol>
      );
      continue;
    }

    // Headings: H1-H6
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const HeadingTag = (`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6");
      const Component = (MDXComponents[HeadingTag as keyof typeof MDXComponents] || HeadingTag) as React.ComponentType<any>;
      elements.push(
        React.createElement(
          Component,
          { key: `h-${i}` },
          parseInlineMarkdown(text)
        )
      );
      i++;
      continue;
    }

    // Paragraph (lines that are not code blocks, blockquotes, lists, headings, or hr)
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("```") &&
      !/^(---|___|\*\*\*)$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <MDXComponents.p key={`p-${i}`}>
          {parseInlineMarkdown(paragraphLines.join(" "))}
        </MDXComponents.p>
      );
    } else {
      // Defensive fallback to prevent infinite loop
      i++;
    }
  }

  return <div className="article-body max-w-none">{elements}</div>;
};

// Helper for bold, italic, code, links, and images inline
function parseInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    // Image: ![alt](url)
    const imgMatch = remaining.match(/!\[(.*?)\]\((.+?)\)/);
    // Bold: **text** (excluding leading/trailing space inside delimiters)
    const boldMatch = remaining.match(/(?<!\*)\*\*(?!\s)([^*]+?)(?<!\s)\*\*(?!\*)/);
    // Italic: *text* (excluding ** and leading/trailing space inside delimiters)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\s)([^*]+?)(?<!\s)\*(?!\*)/);
    // Inline code: `code`
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Link: [text](url)
    const linkMatch = remaining.match(/(?<!\!)\[(.+?)\]\((.+?)\)/);

    // Find earliest match
    const matches = [
      imgMatch ? { type: "image", index: imgMatch.index!, match: imgMatch } : null,
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
      italicMatch ? { type: "italic", index: italicMatch.index!, match: italicMatch } : null,
      codeMatch ? { type: "code", index: codeMatch.index!, match: codeMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
    ]
      .filter((m): m is NonNullable<typeof m> => m !== null)
      .sort((a, b) => a.index - b.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0];
    if (first.index > 0) {
      parts.push(remaining.substring(0, first.index));
    }

    if (first.type === "image") {
      const rawSrc = first.match[2].trim();
      const safeSrc = /^(https?:\/\/|\/)/i.test(rawSrc) ? rawSrc : "#";
      parts.push(
        <img
          key={`img-${key++}`}
          src={safeSrc}
          alt={first.match[1]}
          loading="lazy"
          className="rounded-xl border border-border-subtle my-6 max-w-full h-auto"
        />
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    } else if (first.type === "bold") {
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-text-primary">
          {first.match[1]}
        </strong>
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    } else if (first.type === "italic") {
      parts.push(
        <em key={`em-${key++}`} className="italic text-text-primary">
          {first.match[1]}
        </em>
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    } else if (first.type === "code") {
      parts.push(
        <code
          key={`c-${key++}`}
          className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs text-accent-emerald border border-border-subtle"
        >
          {first.match[1]}
        </code>
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    } else if (first.type === "link") {
      parts.push(
        <MDXComponents.a key={`a-${key++}`} href={first.match[2]}>
          {first.match[1]}
        </MDXComponents.a>
      );
      remaining = remaining.substring(first.index + first.match[0].length);
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}
