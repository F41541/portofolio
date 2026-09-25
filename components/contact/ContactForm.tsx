"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCcw,
  MessageSquare,
  Layers,
  Mail,
  User,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FormField } from "@/components/ui/FormField";

export type ProjectScope =
  | "modern-landing-page"
  | "erp-system-umkm"
  | "ecommerce-cms-store"
  | "custom-web-application";

interface FormData {
  name: string;
  email: string;
  scope: ProjectScope;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const SCOPE_OPTIONS: { id: ProjectScope; label: string; desc: string; price: string }[] = [
  {
    id: "modern-landing-page",
    label: "Modern Landing Page & Profil Bisnis",
    desc: "Next.js 16, Tailwind CSS, Core Web Vitals 95+, SEO prima & responsif",
    price: "Mulai Rp 1.250.000",
  },
  {
    id: "erp-system-umkm",
    label: "Sistem ERP & Manajemen Bisnis UMKM",
    desc: "Laravel (PHP) & Vue 3 / Inertia.js, stok gudang, POS kasir & pelaporan keuangan",
    price: "Mulai Rp 3.850.000",
  },
  {
    id: "ecommerce-cms-store",
    label: "Platform E-Commerce & CMS Toko Online",
    desc: "Katalog produk variasi, keranjang belanja, dashboard admin & gateway Duitku",
    price: "Mulai Rp 2.750.000",
  },
  {
    id: "custom-web-application",
    label: "Aplikasi Web Custom & Solusi SaaS Khusus",
    desc: "Rekayasa software web khusus sesuai SOP bisnis, modular, scalable & clean code",
    price: "Mulai Rp 5.000.000",
  },
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    scope: "erp-system-umkm",
    message: "",
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState<string | null>(
    null
  );

  const getFormattedMessage = React.useCallback((data: FormData) => {
    const scopeLabel = SCOPE_OPTIONS.find((s) => s.id === data.scope)?.label || data.scope;

    return (
      `Halo M. Faisal Fahri (Laxstudio),\n\n` +
      `Saya ingin mendiskusikan kebutuhan proyek:\n\n` +
      `• Nama: ${data.name}\n` +
      `• Email: ${data.email}\n` +
      `• Kebutuhan / Scope: ${scopeLabel}\n\n` +
      `Rincian Kebutuhan:\n${data.message}`
    );
  }, []);

  const handleCopySummary = async () => {
    const text = getFormattedMessage(formData);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

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
      const firstInvalidId = nameErr
        ? "contact-name"
        : emailErr
        ? "contact-email"
        : "contact-message";
      document.getElementById(firstInvalidId)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const text = getFormattedMessage(formData);
      const waUrl = `https://wa.me/6287894380774?text=${encodeURIComponent(text)}`;
      if (typeof window !== "undefined") {
        try {
          window.open(waUrl, "_blank", "noopener,noreferrer");
        } catch {
          // If popup is blocked by browser, user can click direct button in success screen
        }
      }
      setIsSuccess(true);
    } catch {
      setSubmissionError(
        "Gagal menyiapkan pesan. Silakan coba lagi atau hubungi via WhatsApp langsung di +62 878-9438-0774"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      scope: "erp-system-umkm",
      message: "",
    });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
    setCopied(false);
    setSubmissionError(null);
  };

  return (
    <div className="relative rounded-2xl border border-border-subtle bg-surface-card p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-8 sm:py-12 text-center space-y-6"
          >
            {/* Emerald check icon */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="absolute inset-0 rounded-full border border-accent-emerald"
              />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                Rincian Pesan Berhasil Disiapkan!
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Terima kasih,{" "}
                <span className="font-semibold text-text-primary">
                  {formData.name}
                </span>
                . Pesan proyek Anda telah disiapkan. Jika jendela WhatsApp tidak terbuka otomatis, silakan klik tombol di bawah untuk melanjutkan chat atau kirim via email.
              </p>
            </div>

            {/* Direct Channel Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
              <Button
                href={`https://wa.me/6287894380774?text=${encodeURIComponent(getFormattedMessage(formData))}`}
                variant="primary"
                size="md"
                className="w-full sm:w-auto gap-2 text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Buka WhatsApp (+62 878-9438-0774)</span>
              </Button>
              <Button
                href={`mailto:laxstudiodev@gmail.com?subject=${encodeURIComponent(`Diskusi Proyek: ${formData.name} - ${formData.scope}`)}&body=${encodeURIComponent(getFormattedMessage(formData))}`}
                variant="secondary"
                size="md"
                className="w-full sm:w-auto gap-2 text-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Kirim via Email</span>
              </Button>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border-subtle text-left max-w-md mx-auto space-y-2.5 text-xs text-text-muted">
              <div className="flex justify-between">
                <span>Pengirim:</span>
                <span className="text-text-primary font-medium">{formData.name} &lt;{formData.email}&gt;</span>
              </div>
              <div className="flex justify-between">
                <span>Scope:</span>
                <span className="text-accent-emerald capitalize font-medium">
                  {SCOPE_OPTIONS.find((s) => s.id === formData.scope)?.label || formData.scope}
                </span>
              </div>
              <div className="pt-2 border-t border-border-subtle/60">
                <span className="block text-[11px] uppercase tracking-wider text-text-muted mb-1 font-mono">Pesan Anda:</span>
                <p className="text-text-secondary whitespace-pre-line leading-relaxed text-xs bg-surface-ground/60 p-2.5 rounded-lg border border-border-subtle">
                  {formData.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="text-xs gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-accent-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Tersalin ke Clipboard!" : "Salin Rincian Pesan"}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="text-xs gap-1.5"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Isi Form Baru</span>
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
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-emerald uppercase tracking-wider">
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
              <FormField
                id="contact-name"
                label="Nama Lengkap"
                icon={<User className="w-3.5 h-3.5 text-accent-emerald" />}
                required
                error={touched.name ? errors.name : undefined}
              >
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
              </FormField>

              <FormField
                id="contact-email"
                label="Alamat Email"
                icon={<Mail className="w-3.5 h-3.5 text-accent-cyan" />}
                required
                error={touched.email ? errors.email : undefined}
              >
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
              </FormField>
            </div>

            {/* Scope Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent-emerald" />
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
                      className={`p-3.5 rounded-xl border text-left transition-all duration-fast ease-spring-snappy focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald active:scale-[0.98] ${
                        isSelected
                          ? "bg-accent-emerald/10 border-accent-emerald/60 shadow-sm shadow-accent-emerald/10 text-text-primary"
                          : "bg-surface-elevated/50 border-border-subtle hover:border-accent-emerald/40 text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <div className="text-xs font-semibold flex items-center justify-between gap-2">
                        <span className={isSelected ? "text-accent-emerald font-bold" : ""}>
                          {opt.label}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isSelected ? "bg-accent-emerald ring-4 ring-accent-emerald/20" : "bg-border-subtle"
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-text-muted mt-1 leading-snug">
                        {opt.desc}
                      </p>
                      <div className="mt-2 text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                        <span>{opt.price}</span>
                        <span className="text-[9px] text-text-muted font-sans font-normal">Katalog Store</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Textarea */}
            <FormField
              id="contact-message"
              label="Rincian &amp; Tujuan Proyek"
              icon={<MessageSquare className="w-3.5 h-3.5 text-accent-emerald" />}
              required
              hint={`${formData.message.length} karakter`}
              error={touched.message ? errors.message : undefined}
            >
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
            </FormField>

            {/* Submission error banner */}
            {submissionError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
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
                isLoading={isSubmitting}
                className="w-full text-sm font-medium group"
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Kirim Pesan</span>
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
