import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactCta } from "@/components/sections";
import { BreadcrumbListJsonLd, ServiceCatalogJsonLd } from "@/components/seo";
import { SITE_URL } from "@/lib/utils";
import { StoreCatalogClient, StoreServiceItem } from "@/components/store";
import { SERVICES } from "@/data/store-services";

export const metadata: Metadata = {
  title: "Layanan & Etalase Produk | Laxstudio",
  description:
    "Katalog resmi layanan rekayasa perangkat lunak Laxstudio (M. Faisal Fahri). Menghadirkan 3-Tier Arsitektur: Website Astro & Local SEO, Web App & SaaS MVP Next.js, Sistem Bisnis & ERP Laravel Vue, serta paket Managed Care Plan.",
  alternates: {
    canonical: "/store",
  },
  openGraph: {
    title: "Layanan & Jasa Web Development | Laxstudio",
    description:
      "Daftar penawaran paket 3-Tier Laxstudio Stack: Website Astro Kilat, SaaS Next.js MVP, dan Enterprise ERP Laravel Vue dengan integrasi pembayaran Duitku resmi.",
    url: `${SITE_URL}/store`,
  },
};

export default function StorePage() {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      <BreadcrumbListJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Layanan & Etalase", url: `${SITE_URL}/store` },
        ]}
      />
      <ServiceCatalogJsonLd
        services={SERVICES.map((s) => ({
          name: s.title,
          description: s.description,
          price: s.price,
          url: `${SITE_URL}/store#${s.id}`,
          category: s.category,
        }))}
      />

      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle/60 relative">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-accent-emerald/5 blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10" />

        <Container className="space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Layanan &amp; Solusi{" "}
              <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                Laxstudio Stack
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Standarisasi 3-Tier rekayasa perangkat lunak: Website Astro kilat &amp; Local SEO, Web App &amp; SaaS MVP Next.js, hingga Sistem Bisnis &amp; ERP Multi-Tenant Laravel Vue dengan integrasi resmi Duitku.
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
