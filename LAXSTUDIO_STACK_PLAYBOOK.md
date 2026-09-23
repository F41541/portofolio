# LAXSTUDIO TECH STACK PLAYBOOK
*Master Architectural Blueprint, Service Tiering Matrix & Engineering Standards*
**Author:** Laxstudio — M. Faisal Fahri (S.Kom)
**Version:** 1.0.0 — Production Standard

---

## 1. Executive Summary & Visi Arsitektur

Laxstudio Stack adalah standarisasi teknologi rekayasa perangkat lunak yang dirancang untuk menjawab dualitas kebutuhan: **Kecepatan pengiriman produk (velocity)** dan **ketahanan sistem bisnis (robustness)**. 

Alih-alih memaksakan satu framework untuk segala skenario (*one-size-fits-all fallacy*), Laxstudio membagi seluruh lanskap proyek ke dalam 3 tier fungsional spesifik:

```
                       ┌────────────────────────────────────────┐
                       │            LAXSTUDIO STACK             │
                       └───────────────────┬────────────────────┘
                                           │
         ┌─────────────────────────────────┼────────────────────────────────┐
         ▼                                 ▼                                ▼
  [ TIER 1: WEBSITE & SEO ]     [ TIER 2: WEB APPLICATION ]      [ TIER 3: BUSINESS SYSTEM ]
       Astro Ecosystem               Next.js + React               Laravel + Vue (Flagship)
  ─────────────────────────     ─────────────────────────      ──────────────────────────────
  • Landing Pages               • Interactive Web Apps         • ERP & Supply Chain
  • Company Profiles            • Complex Dashboards           • Multi-branch POS & Kasir
  • UMKM Catalogues             • SaaS Frontend                • Manufacturing & Ops
  • High-Impact Local SEO       • Custom Web Applications      • Finance & Accounting
  • Fast Content / Blogs        • Premium SSR Workspaces       • Multi-tenant SaaS Platforms
```

> **Prinsip Dasar Laxstudio:** **Astro** untuk website & SEO konten. **Laravel + Vue** sebagai stack inti utama (*continuous core workhorse*) untuk sistem bisnis berbasis database. **Next.js + React** untuk aplikasi interaktif dan proyek yang membutuhkan SSR.

---

## 2. Matriks Pemilihan Teknologi (Decision Tree)

Gunakan panduan berikut sebelum memulai proyek baru atau mengajukan proposal klien:

| Parameter Evaluasi | Tier 1: Astro | Tier 2: Next.js + React | Tier 3: Laravel + Vue |
|---|---|---|---|
| **Karakteristik Beban** | Read-heavy (95%+ statis) | Read/Write seimbang, interaktif | Write-heavy, transaksional relasional |
| **SEO & Core Web Vitals** | Kritis (Lighthouse 100) | Penting (SSR / ISR) | Tidak relevan (Back-office / Auth) |
| **Database & Relasi** | File markdown / Headless CMS | PostgreSQL / MySQL via Prisma | MySQL / PostgreSQL + Eloquent ORM |
| **Otentikasi & RBAC** | Tidak ada / Minimal auth | NextAuth / Auth.js / JWT | Spatie Permission / Laravel Breeze/Fortify |
| **Background Processing** | Tidak ada | Serverless / In-memory queue | Redis, Horizon, Queue Workers, Cron |
| **Multi-tenancy** | Tidak relevan | Row-level tenant filter | Hybrid: Scoped DB atau Dedicated DB |
| **Estimasi Pengerjaan** | 3 – 7 Hari Kerja | 2 – 4 Minggu | 1 – 3 Bulan |

---

## 3. Spesifikasi Mendalam Tiap Tier

### Tier 1: WEBSITE — Astro Ecosystem

> **Misi:** Kecepatan ekstrem, zero-cost database hosting, skor SEO sempurna, dan kemudahan pengelolaan bagi UMKM & klien korporat.

* **Core Stack:** Astro 4/5, TypeScript, Tailwind CSS.
* **Content Management Strategy:** **Hybrid Git-based CMS** menggunakan **Astro Content Collections** yang dipadukan dengan antarmuka visual **Keystatic** (`/keystatic`).
  * Konten artikel, profil UMKM, dan metadata SEO tersimpan sebagai Markdown/YAML di repositori Git.
  * Klien non-teknis mendapatkan dashboard visual tanpa perlu database terpisah atau langganan cloud CMS berbayar.
* **UI & Styling:** Tailwind CSS dengan standar design token yang selaras dengan shadcn (warna semantik, radius, tipografi responsif).
* **Integrasi Bisnis:** Tombol pemesanan cepat WhatsApp (Click-to-Chat dengan pre-filled message) dan formulir lead generation terhubung ke Webhook / Email.
* **Deployment Default:** Cloudflare Pages / Vercel (Edge CDN, SSL otomatis, zero-maintenance).

---

### Tier 2: WEB APPLICATION — Next.js + React Fullstack

> **Misi:** Solusi produk startup, aplikasi SaaS modern, dashboard analitik interaktif, dan antarmuka bervelocity tinggi.

* **Core Stack:** Next.js 16 (App Router & Turbopack), React 19, TypeScript, Tailwind CSS, `shadcn/ui` (Radix Primitives).
* **Backend Layer:** Next.js Server Actions & Route Handlers murni (Node.js runtime).
* **Data Access Layer:** **Prisma ORM** terhubung ke database relasional (MySQL / PostgreSQL). Skema database dideklarasikan secara type-safe via `prisma/schema.prisma`.
* **State Management & UI:** Server Components untuk data fetching minim footprint JS, Client Components untuk interaksi UI kaya (Framer Motion, Lucide Icons, Data Tables).
* **Otentikasi & Session:** Auth.js (NextAuth) dengan HTTP-only cookies, Google OAuth, dan email credentials.
* **Deployment Default:** Vercel (Production/Trial) atau Docker container pada VPS Laxstudio / VPS Klien.

---

### Tier 3: BUSINESS SYSTEM — Laravel + Vue Monolithic Powerhouse

> **Misi:** Sistem inti operasional bisnis perusahaan (ERP, POS, Finansial, Inventaris Pabrik) yang membutuhkan konsistensi ACID, transaksi database ketat, dan background jobs yang intensif.

* **Core Stack:** Laravel 11/12 (PHP 8.3/8.4), Vue 3 (Composition API & Script Setup), **Inertia.js v2**, Tailwind CSS, `shadcn-vue`.
* **Arsitektur Monolitik:** Inertia.js menjembatani backend Laravel yang kokoh dengan frontend Vue yang reaktif tanpa overhead mengelola API REST/GraphQL terpisah.
* **Multi-tenancy Architecture (Hybrid Bertingkat via `stancl/tenancy`):**
  1. **Tingkat 1 (SaaS UMKM / Budget-Friendly):** *Single Database Multi-tenancy* dengan Global Scopes otomatis berdasarkan `tenant_id`. Menghemat biaya VPS, puluhan klien dapat hidup dalam 1 instance database tanpa kebocoran data.
  2. **Tingkat 2 (Enterprise / Manufacturing / Large POS):** *Multi-Database Multi-tenancy*. Klien mendapatkan database terisolasi tersendiri. Menjamin kepatuhan audit finansial, kemudahan backup mandiri, dan zero-leakage guarantee.
* **Background Jobs & Integrasi:** Laravel Queues (Redis/Database), Laravel Horizon, Task Scheduler (Cron), PDF Invoicing (Dompdf/Browsershot), dan integrasi Printer Thermal ESC/POS untuk modul kasir POS.
* **Deployment Default:** VPS Ubuntu Linux terkelola (Coolify, Docker Compose, atau Laravel Forge) dengan Nginx, PHP-FPM, MySQL 8, dan Redis Cache.

---

## 4. Standarisasi Ekosistem Lokal Indonesia

Setiap sistem yang dibangun oleh Laxstudio wajib memenuhi standar integrasi pasar Indonesia:

### 4.1 Payment Gateway — Duitku API v2
* **Arsitektur Dual-Mode Signature:** Mendukung verifikasi signature modern `HMAC-SHA256` dengan fallback aman `MD5` (`timingSafeEqual` untuk mencegah *timing attack*).
* **Metode Pembayaran Standar:**
  * Virtual Account: Mandiri, BRI, BNI, Permata, CIMB Niaga, Maybank.
  * E-Wallet & QRIS: QRIS Dinamis (ShopeePay, GoPay, Dana, OVO, LinkAja).
  * Retail Store: Alfamart & Indomaret.
* **Webhook & Mutasi:** Endpoint callback terverifikasi secara ketat dengan idempotency key guna mencegah duplikasi pengisian saldo atau konfirmasi ganda pesanan.

### 4.2 Notifikasi Transaksional — WhatsApp API
* **Gateway Provider:** Integrasi langsung dengan API WhatsApp lokal terjangkau (Fonnte / Wablas).
* **Use Cases:**
  * Pengiriman nomor tagihan (Virtual Account / QRIS) segera setelah checkout.
  * Notifikasi instan konfirmasi pembayaran ke pembeli dan notifikasi penjualan ke pemilik toko/admin.
  * Pengiriman ringkasan struk kasir POS atau invoice PDF ke nomor WhatsApp pelanggan.

---

## 5. Strategi Infrastruktur & Multi-Target Deployment

Laxstudio menganut prinsip **Infrastruktur Adaptif**:

1. **Fase 0 (Demo / Trial / MVP):**
   * Website & Next.js di-deploy ke Vercel / Cloudflare Pages (Free tier).
   * Database demo menggunakan SQLite atau managed cloud free tier (Neon / Supabase). Klien dapat mengevaluasi aplikasi tanpa mengeluarkan biaya hosting di muka.
2. **Fase 1 (Managed by Laxstudio — Shared / Dedicated VPS):**
   * Dijalankan di atas infrastruktur VPS Laxstudio (Hetzner / DigitalOcean / Linode) menggunakan orkestrasi **Coolify** atau **Docker Compose**.
   * Klien membayar biaya berlangganan retainer bulanan yang mencakup sewa server, monitoring uptime, backup harian otomatis, dan update keamanan.
3. **Fase 2 (Handover Mandiri ke Server Klien):**
   * Laxstudio menyediakan pipeline CI/CD siap pakai via **GitHub Actions**, file konfigurasi `Dockerfile`, dan panduan deployment lengkap. Laxstudio melakukan *deployment setup* sekali jalan dan menyerahkan akses root ke tim IT klien.

---

## 6. Katalog Layanan, Packaging & Monetisasi

Laxstudio menerapkan strategi **Psikologi Harga Berjenjang (*Mulai Dari Anchor*)**. Calon klien disuguhkan harga dasar yang sangat ramah dan kompetitif di pasar (*"Wah murah nih!"*), kemudian biaya berkembang proporsional secara transparan sesuai penambahan fitur, modul kustom, dan kompleksitas SOP bisnis klien (*"Eh ternyata lengkap & bernilai tinggi"*).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        KATALOG RESMI LAYANAN LAXSTUDIO                                 │
├────┬─────────────────────────────┬──────────────────────────┬──────────────────────────┤
│ No │ Layanan & Stack             │ Harga 'Mulai Dari'       │ SLA & Karakteristik      │
├────┼─────────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 1  │ Website UMKM & Profil Bisnis│ Mulai Rp 500.000         │ 3 - 7 Hari Kerja         │
│    │ (Astro + Tailwind CSS)      │                          │ Loading < 1.5s, Local SEO│
├────┼─────────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 2  │ Toko Online & Gateway Duitku│ Mulai Rp 1.200.000       │ 1 - 2 Minggu             │
│    │ (E-Commerce + Duitku v2)    │                          │ QRIS & VA Otomatis       │
├────┼─────────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 3  │ Web App & SaaS MVP          │ Mulai Rp 2.500.000       │ 2 - 4 Minggu             │
│    │ (Next.js 16 + React 19)     │                          │ Dashboard & SSR Kompleks │
├────┼─────────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 4  │ Sistem Bisnis, POS & ERP    │ Mulai Rp 3.500.000       │ 1 - 3 Bulan              │
│    │ (Laravel + Vue — Flagship)  │                          │ Core DB, Multi-Cabang    │
├────┴─────────────────────────────┴──────────────────────────┴──────────────────────────┤
│ OPTIONAL: Care Plan VPS & SLA Retainer: Mulai Rp 350.000 - Rp 450.000 / bulan          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Mekanisme Upsell & Modul Tambahan:
* **Integrasi Payment Gateway Duitku (Untuk Custom App):** +Rp 1.000.000.
* **Integrasi Notifikasi WhatsApp Gateway (Fonnte / Wablas):** +Rp 500.000.
* **Modul Kasir POS Offline/Online + Cetak Struk ESC/POS:** +Rp 2.000.000.
* **Isolasi Database Enterprise Multi-tenant:** +Rp 3.500.000.
* **Modul Akuntansi & Jurnal Keuangan Otomatis:** +Rp 3.000.000.

---

## 7. Panduan Disiplin Kualitas & Kode (*Engineering Rules*)

1. **Surgical Precision:** Jangan menambahkan dependensi atau abstraksi yang tidak diminta. Setiap baris kode harus memiliki justifikasi fungsional langsung.
2. **Type Safety:** Seluruh kode TypeScript wajib lolos pengecekan `tsc --noEmit` tanpa error.
3. **Responsive UI & Accessibility:** Komponen wajib memenuhi standar kontras warna WCAG AA, mendukung navigasi keyboard, dan memiliki layout adaptif mobile-first.
4. **Security by Default:**
   * Tidak ada credential atau private key yang di-hardcode ke repositori.
   * Gunakan `timingSafeEqual` untuk validasi hash dan signature webhook.
   * Sanitasi input dan proteksi CSRF di setiap formulir mutasi data.

---
*Laxstudio — Rekayasa Perangkat Lunak Presisi & Terpercaya.*
