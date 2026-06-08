# ⚡ Cyber Portfolio — Next.js + TypeScript + Supabase

A futuristic, cyber-tech AI/ML & Backend Engineer portfolio with a full admin dashboard.

---

## 🚀 Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | Next.js 14 (App Router), TypeScript     |
| Styling   | Tailwind CSS, custom CSS animations     |
| Animation | Framer Motion                           |
| Backend   | Supabase (Postgres + Storage)           |
| Auth      | Cookie-based admin session              |
| Fonts     | JetBrains Mono, Syne, Space Mono        |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Public portfolio (server component)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Cyber theme CSS
│   ├── admin/
│   │   ├── page.tsx              # Admin login page
│   │   ├── LoginForm.tsx         # Login form (client)
│   │   └── dashboard/
│   │       ├── page.tsx          # Dashboard (checks auth)
│   │       └── AdminDashboard.tsx # Full CRUD dashboard
│   └── api/
│       ├── contact/route.ts      # Contact form handler
│       └── admin/
│           ├── login/route.ts    # Login → sets cookie
│           ├── logout/route.ts   # Clears cookie
│           ├── resume/route.ts   # PDF upload
│           └── [section]/route.ts # Generic CRUD
├── components/sections/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx           # Typing animation + terminal
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx       # With roadmap modal
│   ├── AchievementsSection.tsx
│   ├── ExperienceSection.tsx     # Timeline
│   ├── EducationSection.tsx      # CGPA/Percentage
│   ├── ContactSection.tsx        # Form + resume download
│   └── Footer.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   └── server.ts             # Server + service client
│   ├── data.ts                   # All Supabase queries
│   ├── auth.ts                   # Admin session helpers
│   └── utils.ts
└── types/index.ts                # All TypeScript interfaces
```

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon key** from Settings → API

### 3. Run the database schema

1. Open **Supabase → SQL Editor**
2. Paste and run the entire contents of `supabase_schema.sql`
3. This creates all tables, RLS policies, storage bucket, and seeds default data

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ **IMPORTANT**: Change `ADMIN_USERNAME` and `ADMIN_PASSWORD` before deploying!

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — your portfolio is live!

---

## 🔐 Admin Dashboard

Go to `/admin` and log in with your credentials.

**What you can do:**
- ✅ Add / Edit / Delete **Projects** (with build roadmap)
- ✅ Add / Edit / Delete **Skills** (by category)
- ✅ Add / Edit / Delete **Achievements**
- ✅ Add / Edit / Delete **Experience**
- ✅ Add / Edit / Delete **Education** (CGPA or Percentage)
- ✅ Edit **Contact Info** (name, email, LinkedIn, GitHub, Twitter, bio)
- ✅ Upload **Resume PDF** to Supabase Storage (or paste URL)

Public visitors see only the rendered portfolio — no edit controls.

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all `.env.local` variables to your Vercel project's Environment Variables.

Set `NEXT_PUBLIC_SITE_URL` to your production domain.

---

## 🎨 Customization

### Change your name & info
1. Log into `/admin` → **Contact** tab
2. Update Name, Email, LinkedIn, GitHub, Hero Summary
3. Click **Save Contact Info** — updates the live site instantly

### Change admin password
Edit `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `.env.local` (or Vercel env vars).

### Change the typing animation titles
Edit `TITLES` array in `src/components/sections/HeroSection.tsx`.

### Add email notifications for contact form
In `src/app/api/contact/route.ts`, integrate [Resend](https://resend.com) or SendGrid:
```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ from: 'onboarding@resend.dev', to: 'you@email.com', ... });
```

---

## 📄 License

MIT — use freely for your own portfolio.
