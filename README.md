# Laxstudio — M. Faisal Fahri (Portfolio & Storefront)

Repositori resmi portofolio dan layanan rekayasa perangkat lunak Laxstudio, dikembangkan dengan **Next.js 16 (App Router & Turbopack)**, **React 19**, **Tailwind CSS**, dan integrasi **Duitku Payment Gateway API v2**.

---

## Laxstudio Tech Stack Playbook

Arsitektur dan standarisasi rekayasa perangkat lunak Laxstudio didefinisikan secara komprehensif pada dokumen [LAXSTUDIO_STACK_PLAYBOOK.md](./LAXSTUDIO_STACK_PLAYBOOK.md):
- **Tier 1 (WEBSITE):** Astro 4/5 + Keystatic CMS + Tailwind CSS (Landing page, Company Profile, UMKM, Local SEO).
- **Tier 2 (WEB APPLICATION):** Next.js 16 + React 19 + Prisma ORM + shadcn/ui (SaaS MVP, Interactive Apps, Dashboards).
- **Tier 3 (BUSINESS SYSTEM):** Laravel 11/12 + Vue 3 + Inertia.js v2 + Hybrid Tenancy (ERP, Stok Multi-Cabang, POS Kasir, Finance).
- **Care Plan:** Managed Linux VPS (Coolify / Docker), Uptime 99.9% SLA, & Pemeliharaan Berkelanjutan.

---

## Fitur Utama

- **Katalog Layanan & Etalase (`/store`)**: Pemesanan layanan 3-tier Laxstudio Stack dan paket pemeliharaan cloud terkelola.
- **Duitku Payment Gateway Integration**:
  - Mendukung Duitku API v2 Inquiry (Virtual Account Mandiri/BRI/BNI/Permata/Maybank, Retail Alfamart, QRIS).
  - Dual-mode callback signature verification (`HMAC-SHA256` & `MD5` fallback).
  - In-memory rate limiting pada endpoint pembuatan tagihan untuk mencegah abuse/bot spam.
  - Penanganan status transaksi dinamis pada halaman konfirmasi (`/store/success`).
- **Portfolio & Case Studies (`/projects`)**: Static Site Generation (SSG) berbasis file konten MDX dengan dynamic OpenGraph image generation (`@vercel/og`).
- **Health Check & Observability (`/api/health`)**: Endpoint probe untuk monitoring uptime.

---

## Variabel Lingkungan (Environment Variables)

Salin `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Daftar variabel yang digunakan:

| Variabel | Deskripsi | Default / Contoh |
|---|---|---|
| `DUITKU_ENV` | Mode gateway: `sandbox` atau `production` | `production` |
| `DUITKU_MERCHANT_CODE` | Kode merchant Duitku | `DS35240` (Sandbox) / `<kode_production>` |
| `DUITKU_API_KEY` | API Key merchant dari Duitku Dashboard | `your_api_key` |
| `DUITKU_CALLBACK_URL` | URL callback webhook Duitku | `https://laxstudio.my.id/api/duitku/callback` |
| `DUITKU_RETURN_URL` | URL pengalihan pasca-pembayaran | `https://laxstudio.my.id/store/success` |
| `NEXT_PUBLIC_SITE_URL` | URL canonical website | `https://laxstudio.my.id` |

---

## Alur Pengujian Duitku Sandbox & Persiapan ACC Production

Saat mengajukan verifikasi merchant Duitku untuk aktivasi mode **Production**, tim Duitku akan melakukan simulasi audit transaksi di website:

1. **Pengujian Sandbox**:
   - Buka halaman `/store`.
   - Pilih salah satu paket layanan (misal: *Arsitektur Aplikasi & Code Review*).
   - Masukkan nama, alamat email, dan nomor WhatsApp valid pada modal checkout.
   - Pilih metode pembayaran (misal: *Mandiri Virtual Account* atau *BRI Virtual Account*).
   - Klik **Lanjut ke Pembayaran Duitku** -> Anda akan dialihkan ke halaman instruksi resmi Duitku Sandbox.
   - Gunakan simulator pembayaran Duitku untuk menyelesaikan transaksi uji coba.
   - Sistem Duitku akan mengirimkan callback ke `/store/duitku-callback` dan mengalihkan browser ke `/store/success`.

2. **Aktivasi Mode Production (Setelah di-ACC Duitku)**:
   Setelah permohonan disetujui:
   - Dapatkan **Production Merchant Code** dan **Production API Key** dari [Duitku Merchant Portal](https://merchant.duitku.com/).
   - Di dashboard hosting (Vercel Project Settings > Environment Variables), ubah:
     - `DUITKU_ENV`: `production`
     - `DUITKU_MERCHANT_CODE`: `<kode_merchant_production>`
     - `DUITKU_API_KEY`: `<api_key_production>`
   - Sistem akan otomatis mengalihkan endpoint inquiry ke `https://passport.duitku.com/...` tanpa perlu mengubah kode sumber.

---

## Skrip Pengembangan (Development Scripts)

```bash
# Menjalankan server development dengan Turbopack
npm run dev

# Menjalankan automated test suite Duitku (node:test bawaan)
npm run test

# Type checking TypeScript
npm run lint

# Kompilasi build production
npm run build

# Menjalankan build lokal
npm run start
```
