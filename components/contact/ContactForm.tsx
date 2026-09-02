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
  | "ai-agent"
  | "fullstack"
  | "cloud-infra"
  | "advisory";

export type BudgetRange =
  | "under-5k"
  | "5k-15k"
  | "15k-50k"
  | "50k-plus"
  | "advisory-retainer";

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
    id: "ai-agent",
    label: "AI / Agent System",
    desc: "Autonomous LLM workflows, RAG & vector memory",
  },
  {
    id: "fullstack",
    label: "Full-Stack Architecture",
    desc: "Production Next.js, Go/Python APIs & distributed state",
  },
  {
    id: "cloud-infra",
    label: "Cloud / Infra Scaling",
    desc: "Kubernetes, eBPF telemetry, high-throughput pipelines",
  },
  {
    id: "advisory",
    label: "Consultation / Advisory",
    desc: "Architectural audits, team mentorship & tech strategy",
  },
];

const BUDGET_OPTIONS: { id: BudgetRange; label: string }[] = [
  { id: "under-5k", label: "< $5k (Small Sprint / Audit)" },
  { id: "5k-15k", label: "$5k - $15k (Core Feature / MVP)" },
  { id: "15k-50k", label: "$15k - $50k (Full System Architecture)" },
  { id: "50k-plus", label: "$50k+ (Enterprise Multi-Month Build)" },
  { id: "advisory-retainer", label: "Advisory / Retainer (Monthly)" },
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    scope: "ai-agent",
    budget: "15k-50k",
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
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address (e.g. name@domain.com)";
        return undefined;
      case "message":
        if (!value.trim()) return "Project description is required";
        if (value.trim().length < 15)
          return `Please provide a bit more detail (${value.trim().length}/15 chars min)`;
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
      // Simulate real network submission with realistic latency
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
    } catch {
      setSubmissionError(
        "Transmission failed. Please try again or reach out directly at alex@engineer.dev"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      scope: "ai-agent",
      budget: "15k-50k",
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
            {/* Emerald check icon with pulse animation */}
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
                Message Dispatched!
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Thank you for reaching out,{" "}
                <span className="font-semibold text-text-primary">
                  {formData.name}
                </span>
                . Your inquiry has been routed to my direct inbox. I will review
                your project scope and reply within 24 hours.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border-subtle text-left max-w-md mx-auto space-y-2 font-mono text-xs text-text-muted">
              <div className="flex justify-between">
                <span>Sender:</span>
                <span className="text-text-primary">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Scope:</span>
                <span className="text-emerald-400 capitalize">
                  {formData.scope.replace("-", " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Budget:</span>
                <span className="text-cyan-400">{formData.budget}</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp:</span>
                <span className="text-text-secondary">
                  {new Date().toISOString()}
                </span>
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
                Send Another Message
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
                Direct Inquiry Channel
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                Tell Me About Your Project
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary">
                Fill out the form below or pick a specific scope to receive a tailored
                technical proposal.
              </p>
            </div>

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-text-secondary flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  Your Name <span className="text-emerald-400">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Satoshi Nakamoto"
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
                  Email Address <span className="text-emerald-400">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="e.g. name@company.com"
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
                Project Scope / Primary Need
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
                Estimated Budget Range
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
                  Project Details & Goals <span className="text-emerald-400">*</span>
                </label>
                <span className="text-[11px] font-mono text-text-muted">
                  {formData.message.length} chars
                </span>
              </div>
              <Textarea
                rows={4}
                placeholder="Tell me about your architecture, current bottlenecks, desired timeline, or key technical challenges..."
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
                    Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Send Transmission
                  </>
                )}
              </Button>
            </div>

            {/* Trust disclaimer */}
            <p className="text-center text-[11px] font-mono text-text-muted">
              🔒 Encrypted transmission. All communications are strictly
              confidential under mutual NDA upon request.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
