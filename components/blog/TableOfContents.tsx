"use client";

import React, { useEffect, useState } from "react";
import { ListCollapse } from "lucide-react";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  headings?: HeadingItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings: initialHeadings,
}) => {
  const [headings, setHeadings] = useState<HeadingItem[]>(initialHeadings || []);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // If headings not passed directly, parse from DOM in article
    if (!initialHeadings || initialHeadings.length === 0) {
      const elements = Array.from(
        document.querySelectorAll("article h2, article h3")
      );
      const parsed: HeadingItem[] = elements.map((elem) => {
        const id = elem.id || elem.textContent?.toLowerCase().replace(/\W+/g, "-") || "";
        if (!elem.id && id) {
          elem.id = id;
        }
        return {
          id,
          text: elem.textContent || "",
          level: elem.tagName.toLowerCase() === "h2" ? 2 : 3,
        };
      });
      setHeadings(parsed);
    }
  }, [initialHeadings]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
        <ListCollapse className="w-4 h-4 text-accent-emerald" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-2 text-sm border-l border-border-subtle pl-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={`${
                heading.level === 3 ? "pl-3 text-xs" : "font-medium"
              }`}
            >
              <a
                href={`#${heading.id}`}
                className={`block transition-colors duration-200 line-clamp-1 ${
                  isActive
                    ? "text-accent-emerald font-semibold -ml-[13px] pl-3 border-l-2 border-accent-emerald"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(heading.id);
                  if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top, behavior: "smooth" });
                    setActiveId(heading.id);
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
