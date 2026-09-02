import React from "react";
import { MDXComponents } from "./MDXComponents";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  // Simple, robust markdown line parser supporting headers, lists, code blocks, blockquotes, paragraphs
  const elements: React.ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

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
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <MDXComponents.blockquote key={`quote-${i}`}>
          <p>{quoteLines.join(" ")}</p>
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

    // Headings
    if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      elements.push(
        <MDXComponents.h3 key={`h3-${i}`}>{text}</MDXComponents.h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      elements.push(
        <MDXComponents.h2 key={`h2-${i}`}>{text}</MDXComponents.h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      const text = line.replace("# ", "").trim();
      elements.push(
        <MDXComponents.h1 key={`h1-${i}`}>{text}</MDXComponents.h1>
      );
      i++;
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("> ") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("```")
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
    }
  }

  return <div className="article-body max-w-none">{elements}</div>;
};

// Helper for bold, code, links inline
function parseInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code: `code`
    const codeMatch = remaining.match(/`(.+?)`/);
    // Link: [text](url)
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

    // Find earliest match
    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
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

    if (first.type === "bold") {
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-text-primary">
          {first.match[1]}
        </strong>
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
