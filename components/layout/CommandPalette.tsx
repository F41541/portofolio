"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ArrowUpRight,
  FileText,
  Folder,
  Globe,
  CornerDownLeft,
  X,
} from "lucide-react";
import {
  NAV_ROUTES,
  PROJECTS_DATA,
  BLOG_POSTS_DATA,
  SOCIAL_LINKS,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigasi" | "Proyek" | "Artikel" | "Sosial";
  href: string;
  external?: boolean;
}

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;

  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = React.useCallback(() => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalOpen(false);
    }
    setQuery("");
    setSelectedIndex(0);
  }, [isControlled, controlledOnClose]);

  // Listen to global open events & keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isControlled && controlledOnClose) {
          if (isOpen) {
            controlledOnClose();
          } else {
            // If parent manages it, trigger window event or sync
            window.dispatchEvent(new CustomEvent("toggle-command-palette"));
          }
        } else {
          setInternalOpen((prev) => !prev);
        }
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    const handleCustomOpen = () => {
      if (!isControlled) {
        setInternalOpen(true);
      }
    };

    const handleCustomToggle = () => {
      if (!isControlled) {
        setInternalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    window.addEventListener("toggle-command-palette", handleCustomToggle);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
      window.removeEventListener("toggle-command-palette", handleCustomToggle);
    };
  }, [isOpen, isControlled, controlledOnClose, handleClose]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Construct searchable list
  const allItems = React.useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [];

    // Routes
    NAV_ROUTES.forEach((route) => {
      items.push({
        id: `route-${route.href}`,
        title: route.name,
        subtitle: route.description,
        category: "Navigasi",
        href: route.href,
      });
    });

    // Projects
    PROJECTS_DATA.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        title: proj.title,
        subtitle: `${proj.category} • ${proj.tags.join(", ")}`,
        category: "Proyek",
        href: proj.href,
      });
    });

    // Blog
    BLOG_POSTS_DATA.forEach((post) => {
      items.push({
        id: `blog-${post.id}`,
        title: post.title,
        subtitle: `${post.category} • ${post.readTime}`,
        category: "Artikel",
        href: post.href,
      });
    });

    // Social Links
    SOCIAL_LINKS.forEach((soc) => {
      items.push({
        id: `social-${soc.name}`,
        title: soc.name,
        subtitle: soc.handle,
        category: "Sosial",
        href: soc.href,
        external: true,
      });
    });

    return items;
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Keep selected index within bounds
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation inside the list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        executeItem(current);
      }
    }
  };

  const executeItem = (item: CommandItem) => {
    handleClose();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  // Scroll active item into view
  React.useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: CommandItem["category"]) => {
    switch (category) {
      case "Navigasi":
        return <Globe className="w-4 h-4 text-emerald-400" />;
      case "Proyek":
        return <Folder className="w-4 h-4 text-cyan-400" />;
      case "Artikel":
        return <FileText className="w-4 h-4 text-amber-400" />;
      case "Sosial":
        return <ArrowUpRight className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-2xl bg-surface-card border border-border-subtle rounded-xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-border-subtle gap-3 bg-surface-elevated/40">
          <Search className="w-5 h-5 text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Ketik perintah, rute, proyek, atau artikel..."
            className="w-full bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none text-sm sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-text-muted hover:text-text-primary rounded"
              aria-label="Bersihkan pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-text-muted bg-surface-elevated border border-border-subtle rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="overflow-y-auto flex-1 p-2 divide-y divide-border-subtle/20 max-h-[60vh] scrollbar-thin scrollbar-thumb-surface-elevated"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-text-muted text-sm">
              Tidak ada hasil yang cocok untuk &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                const isCurrentPage = pathname === item.href;

                return (
                  <button
                    key={item.id}
                    data-index={index}
                    type="button"
                    onClick={() => executeItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors text-sm group",
                      isSelected
                        ? "bg-surface-elevated text-text-primary border border-emerald-500/30"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50 border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="p-1.5 rounded-md bg-surface-ground/80 border border-border-subtle shrink-0">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="truncate">
                        <div className="font-medium text-text-primary flex items-center gap-2">
                          <span className="truncate">{item.title}</span>
                          {isCurrentPage && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                              halaman ini
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-xs text-text-muted truncate mt-0.5 font-mono">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-text-muted">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted/70 bg-surface-ground/50 px-2 py-0.5 rounded border border-border-subtle/50">
                        {item.category}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-surface-elevated/60 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-surface-ground border border-border-subtle rounded">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-surface-ground border border-border-subtle rounded">
                ↓
              </kbd>{" "}
              Navigasi
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-surface-ground border border-border-subtle rounded">
                ↵
              </kbd>{" "}
              Pilih
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-surface-ground border border-border-subtle rounded">
                ESC
              </kbd>{" "}
              Tutup
            </span>
          </div>
          <span className="font-mono text-[11px] text-text-muted hidden sm:inline-block">
            {filteredItems.length} hasil
          </span>
        </div>
      </div>
    </div>
  );
};
