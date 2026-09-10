"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  Calendar,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const ContactCta: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-surface-ground">
      {/* Subtle ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative rounded-2xl border border-border-subtle bg-surface-card/70 p-8 sm:p-12 lg:p-16 backdrop-blur-sm overflow-hidden"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Headline & Description */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
                Siap Membangun Aplikasi Web{" "}
                <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                  Berkualitas Tinggi?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Tersedia untuk pembuatan web application kustom, integrasi API sistem, modernisasi frontend (Vue/React/Next.js), atau konsultasi teknis.
              </p>
            </div>

            {/* Quick stats / guarantee pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated/70 border border-border-subtle text-xs text-text-secondary">
                <Clock className="w-3.5 h-3.5 text-accent-emerald" />
                <span>Respon Cepat &lt; 24 Jam</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated/70 border border-border-subtle text-xs text-text-secondary">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Clean &amp; Maintainable Code</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated/70 border border-border-subtle text-xs text-text-secondary">
                <Zap className="w-3.5 h-3.5 text-accent-emerald" />
                <span>Full-Stack Support</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                href="/contact"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto text-sm font-medium group"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Jadwalkan Diskusi</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                href="/contact"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-sm font-medium group"
              >
                <Mail className="w-4 h-4 mr-2 text-text-muted group-hover:text-accent-emerald transition-colors" />
                <span>Kirim Pesan Langsung</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
