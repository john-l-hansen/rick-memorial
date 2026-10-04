# Richard Earl LaDow Jr. — Memorial Tribute & Celebration of Life

> **October 5, 1957 — June 8, 2026**  
> *“Truly, a loving brother to all.”*  
> **Husband — Father — Papa — Son — Brother — Uncle — Friend**

---

## About the Project

This repository houses the design system and web application for the memorial tribute celebrating the life of **Richard Earl LaDow Jr. ("Rick")**.

It provides family, friends, and loved ones with a dedicated space to:
- Learn about the **Celebration of Life gathering** in Azusa, California
- Add the event to **Google Calendar / Apple Calendar / Outlook**
- Get turn-by-turn **directions to the venue**
- **RSVP** directly for the memorial gathering
- Share personal stories and reflections in the **Digital Memory Book**
- View and download the official **Memorial Tribute Flyer**

---

## Celebration of Life Service Details

| Detail | Information |
| :--- | :--- |
| **Date** | **Saturday, November 7, 2026** |
| **Time** | **11:00 a.m. — 3:00 p.m.** |
| **Location** | **Fraternal Order of Eagles — Azusa Aerie #2810**<br>1603 San Gabriel Canyon Road<br>Azusa, California 91702 |
| **RSVP Deadline** | **November 1, 2026** |
| **RSVP Email** | [`ricksmemorialtribute11276@gmail.com`](mailto:ricksmemorialtribute11276@gmail.com) |

> *“We invite you to bring a favorite memory of Rick, written down or simply carried in your heart. There will be a special place to leave your written memories for our family to keep, and time to share stories together for those who would like to.”*

---

## Design System (`design/`)

The design language is authored in **[Elyx](https://github.com/elyx-design/agents)** (`.elyx`) and symbolically mirrors the warm earth and linen aesthetic of **[lindyladow.com](https://www.lindyladow.com/)**:

- **Palette:** Warm Linen (`#FAF8F6`), Soft Alabaster (`#F4EFEC`), Warm Sand (`#EBE2DD`), Deep Earth Primary (`#5C4B40`), Rich Chestnut (`#6B5649`), and Midnight Espresso (`#1F1814`).
- **Typography:** Classical serif display (`Cormorant Garamond`) with italic emotional accents paired with clean, accessible sans-serif (`Inter`) for UI.
- **Components:**
  - `design/tokens.elyx` — Full color scale, typography definitions, shadows, and radii
  - `design/memorial-screen.elyx` — Full screen composite canvas
  - `design/components/Button.elyx` — Primary, secondary, and outline button variants
  - `design/components/EventDetailsCard.elyx` — Gathering details card
  - `design/components/PhotoGallery.elyx` — Memory photo triptych frames
  - `elyx.json` — Workspace configuration

---

## Tech Stack & Architecture

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom brand earth-tone scales
- **Typography:** `next/font/google` (Cormorant Garamond & Inter)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting / Deployment:** Zero-cost deployment ready for [Vercel](https://vercel.com/) or Cloudflare Pages

---

## Getting Started

### 1. Run Locally

```bash
# Clone the repository
git clone https://github.com/john-l-hansen/rick-memorial.git
cd rick-memorial

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Opening in Elyx

1. Launch the **Elyx** desktop application.
2. Select **Open Folder** (or **Clone from Git**) and choose this repository directory.
3. Elyx will automatically read `elyx.json` and load the design canvas under `design/`.

---

## Free One-Click Deployment (Vercel)

1. Import this repository into [Vercel](https://vercel.com/new).
2. Click **Deploy**.
3. Your memorial website will be live with instant global CDN caching and free SSL.
