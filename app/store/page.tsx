import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactCta } from "@/components/sections";
import { BreadcrumbListJsonLd } from "@/components/seo";
import { SITE_URL } from "@/lib/utils";
import { StoreCatalogClient, StoreServiceItem } from "@/components/store";

export const metadata: Metadata = {
  title: "Layanan & Etalase Produk | Laxstudio",
  description:
    "Katalog penawaran resmi jasa pengembangan aplikasi web full-stack, sistem bisnis UMKM, dan integrasi payment gateway terpercaya Duitku oleh Laxstudio (M. Faisal Fahri).",
  alternates: {
    canonical: "/store",
  },
  openGraph: {
    title: "Layanan & Jasa Web Development | Laxstudio",
    description:
      "Daftar layanan resmi pengembangan aplikasi web modern, landing page, dan integrasi payment gateway resmi Duitku dengan harga transparan.",
    url: `${SITE_URL}/store`,
  },
};

import { SERVICES } from "@/data/store-services";

export default function StorePage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Layanan & Etalase", url: `${SITE_URL}/store` },
        ]}
      />

      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle/60 relative">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

        <Container className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Layanan &amp; Modul Solusi{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Rekayasa Web
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Daftar penawaran paket jasa pengembangan perangkat lunak, integrasi payment gateway Duitku, dan modul sistem bisnis dengan tarif harga transparan (Rupiah) dan pemesanan langsung.
            </p>
          </div>

          {/* Interactive Store Catalog with Rupiah Prices & Checkout Modal */}
          <StoreCatalogClient services={SERVICES} />
        </Container>
      </section>

      {/* Direct CTA */}
      <ContactCta />
    </div>
  );
}
