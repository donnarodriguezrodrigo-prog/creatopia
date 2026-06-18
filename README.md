# 🎨 Creatopia Portfolio
**Purposeful Creativity** — Donna May Rodrigo's Professional Portfolio

Built with **Next.js 14**, **Supabase**, and deployed on **Vercel**.

---

## 🚀 Deployment Guide (Step by Step)

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **SQL Editor** → Paste the entire contents of `supabase-schema.sql` → Run
3. Go to **Storage** → Create these buckets — **make sure "Public bucket" is toggled ON for each**:
   - `portfolio`
   - `certificates`
   - `profile`
   - `logo` (optional, for your brand logo)
4. Copy your **Project URL**, **anon key**, and **service_role key** from Settings → API

### Step 2: Deploy to Vercel

1. Push this project to a **GitHub repo**
2. Go to [vercel.com](https://vercel.com) → Import your GitHub repo
3. Set these **Environment Variables** in Vercel (Settings → Environment Variables), then click **Save** for each:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `ADMIN_PASSWORD` | Choose a strong password (no quotes, no trailing spaces) |
| `NEXTAUTH_SECRET` | Any random string (32+ chars) |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel domain |
| `NEXT_PUBLIC_CALENDLY_URL` | Your Calendly link |
| `NEXT_PUBLIC_ZOOM_LINK` | Your Zoom meeting link |

⚠️ **Important:** After adding/changing env variables, you must **Redeploy** (Deployments → ⋯ → Redeploy) for changes to take effect.

4. Click **Deploy** ✅

### Step 3: Custom Domain

In Vercel → Your Project → Settings → Domains:
- Add your custom domain, or use the free subdomain: `creatopia-portfolio.vercel.app`

---

## 🔐 Admin Panel

- URL: `yourdomain.com/admin`
- Password: whatever you set as `ADMIN_PASSWORD`
- Dashboard: `yourdomain.com/admin/dashboard`

### Admin Features:
- ✅ Add/Edit/Delete portfolio items (with image upload + preview)
- ✅ Add/Edit/Delete certificates (with image upload + preview)
- ✅ Upload/update your profile photo (shows on Hero section)
- ✅ View & mark contact messages as read
- ✅ Update site settings (bio, social links, Calendly, Zoom, etc.)

---

## 📬 Contact Form (Formspree + Supabase)

Messages are sent to **both**:
1. **Formspree** → you get an email notification instantly
2. **Supabase** → saved in `contact_messages` table, viewable in Admin → Messages

To set up Formspree:
1. Create account at [formspree.io](https://formspree.io)
2. Create a new form → copy the form ID from the URL (`formspree.io/f/XXXXXXXX`)
3. In `components/sections/ContactSection.tsx`, update:
   ```ts
   const FORMSPREE_ID = 'your_formspree_id_here';
   ```

---

## 📅 Calendly + Zoom Setup

1. Create account at [calendly.com](https://calendly.com)
2. In Calendly: Settings → Integrations → **Zoom** → Connect
3. This auto-adds Zoom links to every booked meeting
4. Copy your Calendly page URL
5. Add it via **Admin Panel → Settings → Calendly URL**

---

## 🖼️ Adding Your Logo / Profile Photo

The logo image URL is hardcoded as `LOGO_URL` in three files (since it rarely changes):
- `components/Navbar.tsx`
- `app/admin/page.tsx`
- `app/admin/dashboard/page.tsx`

To update it: upload your new logo to the `logo` bucket in Supabase Storage, copy its public URL, and replace `LOGO_URL` in those three files.

Your **profile photo** (shown in the Hero section) is uploaded directly via **Admin Panel → Settings → Profile Photo** — no code editing needed.

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

## 🛠 Troubleshooting

**Images not displaying after upload:**
Make sure the Supabase Storage bucket has "Public bucket" toggled ON (Storage → bucket → Settings).

**Admin login says "Incorrect password" only on Vercel (works locally):**
The `ADMIN_PASSWORD` env variable isn't set correctly in Vercel, or you forgot to redeploy after adding it. Check Settings → Environment Variables, then redeploy.

**500 error on `/api/admin/auth`:**
Check Vercel → Deployments → your deployment → Function Logs for the actual error message.

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

Built with ❤️ for **Creatopia** — Purposeful Creativity
