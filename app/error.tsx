"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("Unhandled runtime error captured in error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <Container>
        <div className="max-w-lg mx-auto text-center space-y-6">
          {/* Glowing error icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-xl shadow-red-500/10">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-xl -z-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
              Terjadi Kesalahan Sistem
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Aplikasi mengalami kendala teknis tak terduga saat memproses permintaan ini. Silakan coba muat ulang atau kembali ke halaman utama.
            </p>
          </div>

          {error?.message && (
            <div className="p-3.5 rounded-xl bg-surface-elevated/80 border border-border-subtle text-left max-w-md mx-auto">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
                Detail Error
              </span>
              <p className="text-xs font-mono text-red-400/90 break-words leading-relaxed">
                {error.message}
              </p>
              {error.digest && (
                <span className="block text-[10px] font-mono text-text-muted mt-1.5">
                  Digest ID: {error.digest}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => reset()}
              variant="primary"
              size="md"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </Button>

            <Button
              href="/"
              variant="secondary"
              size="md"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Ke Beranda</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
