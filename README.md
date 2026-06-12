# 🎨 Creatopia Portfolio
**Purposeful Creativity** — Donna May Rodrigo's Professional Portfolio

Built with **Next.js 14**, **Supabase**, and deployed on **Vercel**.

---

## 🚀 Deployment Guide (Step by Step)

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **SQL Editor** → Paste the entire contents of `supabase-schema.sql` → Run
3. Go to **Storage** → Create these buckets (all **Public**):
   - `portfolio`
   - `certificates`
   - `profile`
4. Copy your **Project URL** and **anon key** from Settings → API

### Step 2: Deploy to Vercel

1. Push this project to a **GitHub repo**
2. Go to [vercel.com](https://vercel.com) → Import your GitHub repo
3. Set these **Environment Variables** in Vercel:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `ADMIN_PASSWORD` | Choose a strong password |
| `NEXTAUTH_SECRET` | Any random string (32+ chars) |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel domain |
| `NEXT_PUBLIC_CALENDLY_URL` | Your Calendly link |
| `NEXT_PUBLIC_ZOOM_LINK` | Your Zoom meeting link |

4. Click **Deploy** ✅

### Step 3: Custom Domain (Strikingly-style)

In Vercel → Your Project → Settings → Domains:
- Add your custom domain (e.g. `creatopia.com` or `donnamayrrodrigo.com`)
- Or use the free Vercel subdomain: `creatopia-portfolio.vercel.app`

---

## 🔐 Admin Panel

- URL: `yourdomain.com/admin`
- Use the `ADMIN_PASSWORD` you set in env variables
- Dashboard at: `yourdomain.com/admin/dashboard`

### Admin Features:
- ✅ Add/Edit/Delete portfolio items (with image upload)
- ✅ Add/Edit/Delete certificates (with image upload)
- ✅ View & mark contact messages as read
- ✅ Update site settings (bio, social links, Calendly, Zoom, etc.)

---

## 📅 Calendly + Zoom Setup

1. Create account at [calendly.com](https://calendly.com)
2. In Calendly: Settings → Integrations → **Zoom** → Connect
3. This auto-adds Zoom links to every booked meeting
4. Copy your Calendly page URL
5. Add it to Supabase `site_settings` table, key: `calendly_url`
   OR update it in the **Admin Panel → Settings**

---

## 🎨 Brand Kit Used

| Color | Hex |
|-------|-----|
| Blush | `#F9E7E7` |
| Rose | `#F6A2A2` |
| Wine | `#9E3D42` |
| Deep Wine | `#420407` |
| Near Black | `#190c0e` |

Fonts: **Bebas Neue** (headings) + **Montserrat** (body)

---

## 📁 Project Structure

```
creatopia-portfolio/
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout with fonts
│   ├── globals.css           # Global styles
│   ├── admin/
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/        # Admin dashboard
│   └── api/
│       ├── contact/          # Contact form API
│       └── admin/auth/       # Admin auth API
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── PortfolioSection.tsx
│       ├── CertificatesSection.tsx
│       ├── ServicesSection.tsx
│       └── ContactSection.tsx
├── lib/
│   └── supabase.ts           # Supabase client + types
├── middleware.ts             # Admin route protection
├── supabase-schema.sql       # Database setup
└── vercel.json               # Vercel config
```

---

## 🛠 Local Development

```bash
npm install
cp .env.local.example .env.local
# Fill in your env variables
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

Built with ❤️ for **Creatopia** — Purposeful Creativity
