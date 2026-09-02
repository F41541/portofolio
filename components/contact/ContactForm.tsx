"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCcw,
  MessageSquare,
  DollarSign,
  Layers,
  Mail,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export type ProjectScope =
  | "laravel-fullstack"
  | "frontend-modern"
  | "api-backend"
  | "consultation";

export type BudgetRange =
  | "under-5jt"
  | "5jt-15jt"
  | "15jt-50jt"
  | "50jt-plus"
  | "monthly-retainer";

interface FormData {
  name: string;
  email: string;
  scope: ProjectScope;
  budget: BudgetRange;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const SCOPE_OPTIONS: { id: ProjectScope; label: string; desc: string }[] = [
  {
    id: "laravel-fullstack",
    label: "Full-Stack Web App",
    desc: "Laravel 11, Inertia.js, Vue 3 / React & arsitektur database",
  },
  {
    id: "frontend-modern",
    label: "Modern Frontend / SPA",
    desc: "Next.js 15, React 19, Vue/Nuxt 3, Tailwind & TypeScript",
  },
  {
    id: "api-backend",
    label: "RESTful API & Integration",
    desc: "Payment gateway, third-party webhook, microservices & Redis",
  },
  {
    id: "consultation",
    label: "Konsultasi & Refactoring",
    desc: "Optimasi query, audit performa web & perbaikan arsitektur",
  },
];

const BUDGET_OPTIONS: { id: BudgetRange; label: string }[] = [
  { id: "under-5jt", label: "< Rp 5 Juta (Landing Page / Fitur Kecil)" },
  { id: "5jt-15jt", label: "Rp 5 Juta - Rp 15 Juta (MVP / Sistem Menengah)" },
  { id: "15jt-50jt", label: "Rp 15 Juta - Rp 50 Juta (Full Web Application)" },
  { id: "50jt-plus", label: "Rp 50 Juta+ (Sistem Enterprise Multi-Modul)" },
  { id: "monthly-retainer", label: "Maintenance / Monthly Retainer" },
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    scope: "laravel-fullstack",
    budget: "5jt-15jt",
    message: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState<string | null>(
    null
  );

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Nama lengkap wajib diisi";
        if (value.trim().length < 2) return "Nama minimal 2 karakter";
        return undefined;
      case "email":
        if (!value.trim()) return "Alamat email wajib diisi";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Format email tidak valid (contoh: nama@domain.com)";
        return undefined;
      case "message":
        if (!value.trim()) return "Deskripsi proyek wajib diisi";
        if (value.trim().length < 15)
          return `Berikan deskripsi lebih detail (${value.trim().length}/15 karakter min)`;
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const messageErr = validateField("message", formData.message);

    const newErrors = {
      name: nameErr,
      email: emailErr,
      message: messageErr,
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (nameErr || emailErr || messageErr) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch {
      setSubmissionError(
        "Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung di faisal.fahri@example.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      scope: "laravel-fullstack",
      budget: "5jt-15jt",
      message: "",
    });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setSubmissionError(null);
  };

  return (
    <div className="relative rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-10 sm:py-14 text-center space-y-6"
          >
            {/* Emerald check icon */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="absolute inset-0 rounded-full border border-emerald-400"
              />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                Pesan Berhasil Terkirim!
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Terima kasih,{" "}
                <span className="font-semibold text-text-primary">
                  {formData.name}
                </span>
                . Pesan Anda telah diterima. Saya akan meninjau rincian proyek Anda dan membalas dalam waktu &lt; 24 jam.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border-subtle text-left max-w-md mx-auto space-y-2 font-mono text-xs text-text-muted">
              <div className="flex justify-between">
                <span>Pengirim:</span>
                <span className="text-text-primary">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Scope:</span>
                <span className="text-emerald-400 capitalize">
                  {formData.scope.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimasi Budget:</span>
                <span className="text-cyan-400">{formData.budget}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={resetForm}
                className="font-mono text-xs"
              >
                <RefreshCcw className="w-3.5 h-3.5 mr-2" />
                Kirim Pesan Lain
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            {/* Header / Intro */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Formulir Kontak
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                Ceritakan Kebutuhan Proyek Anda
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary">
                Isi form di bawah ini untuk mendiskusikan kebutuhan arsitektur sistem, timeline, dan penawaran teknis.
              </p>
            </div>

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  Nama Lengkap <span className="text-emerald-400">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={
                    touched.name && errors.name
                      ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30"
                      : ""
                  }
                />
                {touched.name && errors.name && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  Alamat Email <span className="text-emerald-400">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="nama@perusahaan.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={
                    touched.email && errors.email
                      ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30"
                      : ""
                  }
                />
                {touched.email && errors.email && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Scope Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Lingkup Proyek / Kebutuhan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SCOPE_OPTIONS.map((opt) => {
                  const isSelected = formData.scope === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, scope: opt.id }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-emerald-500/10 border-emerald-500/60 shadow-sm shadow-emerald-500/10 text-text-primary"
                          : "bg-surface-elevated/50 border-border-subtle hover:border-border-accent text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <span className={isSelected ? "text-emerald-400" : ""}>
                          {opt.label}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? "bg-emerald-400 ring-4 ring-emerald-400/20" : "bg-border-subtle"
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-text-muted mt-1 leading-snug">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                Estimasi Anggaran
              </label>
              <div className="relative">
                <select
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      budget: e.target.value as BudgetRange,
                    }))
                  }
                  className="w-full appearance-none bg-surface-ground border border-border-subtle focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald text-text-primary rounded-lg px-4 py-2.5 outline-none transition-colors text-sm cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                      className="bg-surface-elevated text-text-primary"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted font-mono text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  Rincian &amp; Tujuan Proyek <span className="text-emerald-400">*</span>
                </label>
                <span className="text-[11px] font-mono text-text-muted">
                  {formData.message.length} karakter
                </span>
              </div>
              <Textarea
                rows={4}
                placeholder="Ceritakan gambaran sistem yang ingin dibangun, fitur utama, target timeline, atau tantangan teknis saat ini..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                className={
                  touched.message && errors.message
                    ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/30"
                    : ""
                }
              />
              {touched.message && errors.message && (
                <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submission error banner */}
            {submissionError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{submissionError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={isSubmitting}
                className="w-full font-mono text-sm group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengirim Pesan...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
