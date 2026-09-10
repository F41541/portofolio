import React from "react";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <Container>
        <div className="max-w-lg mx-auto text-center space-y-6">
          {/* Subtle Glowing 404 Badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="px-4 py-2 rounded-2xl bg-surface-elevated border border-border-subtle text-accent-emerald font-mono text-sm font-bold flex items-center gap-2 shadow-xl shadow-accent-emerald/5">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>ERROR 404</span>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-accent-emerald/10 blur-xl -z-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Halaman atau rute yang Anda tuju tidak tersedia di direktori sistem. Kemungkinan tautan sudah diperbarui atau URL yang diketikkan keliru.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              href="/"
              variant="primary"
              size="md"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Button>

            <Button
              href="/projects"
              variant="secondary"
              size="md"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Lihat Semua Proyek</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
