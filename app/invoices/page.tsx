import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { BreadcrumbListJsonLd } from "@/components/seo";
import { InvoiceChecker } from "@/components/invoice";
import { ContactCta } from "@/components/sections";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cek Status Transaksi & Invoice | Laxstudio",
  description:
    "Lacak status pesanan, verifikasi bukti pembayaran Duitku Payment Gateway, cek nomor Virtual Account, dan pantau status transaksi layanan web development Laxstudio.",
  openGraph: {
    title: "Cek Status Transaksi & Invoice | Laxstudio",
    description:
      "Lacak status pesanan dan konfirmasi pembayaran Duitku Payment Gateway resmi Laxstudio secara real-time.",
    url: `${SITE_URL}/invoices`,
  },
};

export default function InvoicesPage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Cek Transaksi & Invoice", url: `${SITE_URL}/invoices` },
        ]}
      />

      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle/60 relative">
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

        <Container className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Cek Status Transaksi &amp;{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Invoice Pesanan
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Gunakan form di bawah ini untuk mencari tagihan pesanan, memeriksa nomor Virtual Account, memverifikasi status pelunasan Duitku secara real-time, atau mencetak bukti faktur.
            </p>
          </div>

          {/* Interactive Invoice Checker Client with Suspense boundary */}
          <div className="max-w-4xl">
            <Suspense
              fallback={
                <div className="p-8 rounded-3xl border border-border-subtle bg-surface-card animate-pulse text-center text-sm text-text-muted">
                  Memuat portal pencarian invoice...
                </div>
              }
            >
              <InvoiceChecker />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* Direct CTA */}
      <ContactCta />
    </div>
  );
}
