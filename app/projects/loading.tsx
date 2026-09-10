import React from "react";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div className="py-16 md:py-24 border-b border-border-subtle/60 relative flex-1">
      <Container className="space-y-10">
        {/* Header Skeleton */}
        <div className="max-w-3xl space-y-4">
          <Skeleton className="h-10 sm:h-14 w-3/4 rounded-2xl" />
          <Skeleton className="h-5 w-full max-w-xl rounded-lg" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="p-6 rounded-2xl border border-border-subtle bg-surface-card/40 space-y-5">
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="flex items-center gap-2 pt-2 border-t border-border-subtle/50">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
        </div>

        {/* Project Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-border-subtle bg-surface-card/40 space-y-5"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-7 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-16 rounded" />
              </div>
              <div className="pt-4 border-t border-border-subtle/60 flex items-center justify-between">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-28 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
