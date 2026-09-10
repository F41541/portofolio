"use client";

import React from "react";
import { Search, FilterX, Code2 } from "lucide-react";
import { Input } from "@/components/ui/Input";

export interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchPlaceholder?: string;
  categoryLabel?: string;
  defaultCategory?: string;
  className?: string;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  searchPlaceholder = "Cari...",
  categoryLabel = "Kategori:",
  defaultCategory = "Semua",
  className = "",
}) => {
  return (
    <div className={`p-6 rounded-2xl border border-border-subtle bg-surface-card/60 backdrop-blur-md space-y-5 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 bg-surface-elevated/80 border-border-subtle focus:border-accent-emerald text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-primary px-1.5 py-0.5 rounded bg-surface-ground"
          >
            Hapus
          </button>
        )}
      </div>

      {/* Preset Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-subtle/50">
        <span className="text-xs text-text-muted flex items-center gap-1 mr-1 font-medium">
          <Code2 className="w-3 h-3 text-accent-emerald" />
          {categoryLabel}
        </span>

        {categories.map((tab) => {
          const isSelected = selectedCategory === tab;
          return (
            <button
              key={tab}
              onClick={() => onCategoryChange(tab)}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 font-medium ${
                isSelected
                  ? "bg-accent-emerald text-surface-ground font-semibold shadow-md shadow-emerald-500/20"
                  : "bg-surface-elevated text-text-secondary hover:text-text-primary border border-border-subtle hover:border-text-muted"
              }`}
            >
              {tab}
            </button>
          );
        })}

        {selectedCategory !== defaultCategory && (
          <button
            onClick={() => onCategoryChange(defaultCategory)}
            className="ml-auto text-xs text-accent-emerald hover:underline flex items-center gap-1"
          >
            <FilterX className="w-3 h-3" />
            Reset kategori
          </button>
        )}
      </div>
    </div>
  );
};
