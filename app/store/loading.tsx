import React from "react";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function StoreLoading() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden py-16 md:py-24">
      <Container className="space-y-12">
        {/* Header Skeleton */}
        <div className="max-w-3xl space-y-4">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-10 sm:h-14 w-3/4 rounded-2xl" />
          <Skeleton className="h-5 w-full max-w-xl rounded-lg" />
        </div>

        {/* 4 Store Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border-subtle bg-surface-card/40 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <div className="space-y-2 pt-2 border-t border-border-subtle/60">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
              <div className="pt-6 border-t border-border-subtle">
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
