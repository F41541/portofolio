import React from "react";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden py-12 md:py-20 animate-in fade-in duration-200">
      <Container className="space-y-12">
        {/* Hero Headline Skeleton */}
        <div className="max-w-4xl space-y-6">
          <Skeleton className="h-6 w-56 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-12 sm:h-16 w-full max-w-2xl rounded-2xl" />
            <Skeleton className="h-12 sm:h-16 w-3/4 rounded-2xl" />
          </div>
          <div className="space-y-2 pt-2">
            <Skeleton className="h-5 w-full max-w-3xl rounded-lg" />
            <Skeleton className="h-5 w-2/3 rounded-lg" />
          </div>
          <div className="flex items-center gap-4 pt-4">
            <Skeleton className="h-12 w-44 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>

        {/* Telemetry Dock Skeleton */}
        <div className="pt-6">
          <div className="rounded-2xl border border-border-subtle bg-surface-card/40 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-44" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
