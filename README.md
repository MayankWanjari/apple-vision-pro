# Apple Vision Pro — Landing Page

A premium, scroll-driven landing page and full e-commerce experience inspired by Apple Vision Pro. Built with Next.js 16, Tailwind CSS v4, and GSAP.

This project is a portfolio exercise to explore luxury product web design, cinematic scroll animations, and production-grade e-commerce flows.

![Status](https://img.shields.io/badge/Phase%202A-Complete-success)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8)

---

## Live Demo

> Coming soon — deployment to Vercel pending.

---

## Screenshots

<!-- Add screenshots here once deployed. Suggested: -->
<!-- ![Landing Hero](./docs/screenshots/hero.png) -->
<!-- ![Shop Configurator](./docs/screenshots/shop.png) -->
<!-- ![visionOS Showcase](./docs/screenshots/visionos.png) -->
<!-- ![Checkout Flow](./docs/screenshots/checkout.png) -->

---

## Features

### Landing Experience
- **Cinematic hero** with 150-frame canvas scroll scrub animation
- **Word-by-word text reveals** using GSAP ScrollTrigger
- **Text-over-video feature sections** with gradient overlays
- **Full-bleed editorial closing** with buy CTA
- **Smooth scroll** via Lenis with reduced-motion respect

### Full E-commerce Flow
- **Product configurator** with storage, band color, light seal, and AppleCare+ options
- **Live price calculation** and dynamic totals
- **Slide-in cart drawer** with quantity controls and localStorage persistence
- **Three-step checkout**: Shipping → Payment → Review
- **Form validation** with Zod + react-hook-form
- **Mock order confirmation** with generated order IDs

### Content Pages
- **Technical Specifications** page with sticky sidebar and scroll-spy navigation
- **visionOS showcase** with video backgrounds, app imagery, and environments gallery
- **Book a Demo** page with date picker, time slots, and live summary sidebar

### Account System
- **Dashboard** with sidebar navigation (Overview, Orders, Addresses, Preferences)
- **Order history** with status pills (delivered, shipped, processing)
- **Dynamic order detail pages** (`/account/orders/[id]`)
- **Address management** and **notification preferences** with persistence

### Production Polish
- **Branded 404** page with ambient glow
- **Route-level loading skeletons** for perceived performance
- **Error boundaries** with graceful recovery
- **SEO metadata** per route (title, description, OG tags)
- **Sitemap & robots.txt** for search engine discovery
- **Accessibility**: skip-to-content link, ARIA labels, visible focus states
- **Theme-aware navbar**: transparent at top, adapts light/dark on scroll
- **Core Web Vitals**: LCP 1.78s, CLS 0, INP 8ms

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 with `@theme` block |
| Animations | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| State Management | Zustand (with persist middleware) |
| Forms | react-hook-form + Zod validation |
| Date Picker | react-day-picker + date-fns |
| Font | Inter (via `next/font/google`) |
| Image Optimization | `next/image` with automatic WebP/AVIF |

---

## Project Structure

```
vision-pro-site/
├── app/
│   ├── layout.tsx              # Root layout with Navbar, Footer, SmoothScroll
│   ├── page.tsx                # Landing composition
│   ├── globals.css             # Tailwind v4 @theme, custom properties
│   ├── not-found.tsx           # Branded 404
│   ├── error.tsx               # Global error boundary
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── robots.ts               # robots.txt config
│   ├── shop/                   # Product configurator
│   ├── checkout/               # Multi-step checkout flow
│   │   ├── page.tsx            # Shipping
│   │   ├── payment/
│   │   ├── review/
│   │   └── success/
│   ├── tech-specs/             # Spec tables with scroll spy
│   ├── visionos/               # Video showcase
│   ├── book-demo/              # Demo booking form
│   └── account/                # User dashboard
│       └── orders/[id]/        # Dynamic order details
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Theme-aware, scroll-aware navigation
│   │   └── Footer.tsx          # Multi-column footer
│   ├── sections/               # Landing page sections
│   │   ├── Hero.tsx            # 150-frame canvas scrub
│   │   ├── Statement.tsx       # Word-by-word reveal
│   │   ├── Features.tsx        # Text-over-video sections
│   │   └── Close.tsx           # Editorial closing
│   ├── cart/CartDrawer.tsx     # Slide-in bag
│   ├── checkout/OrderSummary.tsx
│   └── providers/SmoothScroll.tsx
├── lib/
│   ├── gsap.ts                 # GSAP + ScrollTrigger registration
│   ├── mock-data.ts            # Product options
│   ├── cart-store.ts           # Zustand cart state
│   ├── checkout-store.ts       # Zustand checkout state
│   ├── user-store.ts           # Zustand user profile
│   ├── orders-store.ts         # Zustand orders
│   ├── tech-specs-data.ts      # Spec content
│   ├── visionos-data.ts        # Environment data
│   └── demo-booking-data.ts    # Store locations, time slots
└── public/assets/              # Images, videos, hero frames
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9+ (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/vision-pro-site.git
cd vision-pro-site

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
npm run build
npm start
```

---

## Key Design Decisions

**Theme-aware navbar over per-page navbars.** A single `Navbar` component uses `usePathname` and scroll position to adapt its appearance across all routes — avoiding component duplication while achieving Apple-style minimal transparency at the top of every page.

**Zustand over Redux.** For cart, checkout, user, and orders state, Zustand's 1KB footprint and minimal boilerplate keep the codebase lean. The `persist` middleware handles localStorage sync automatically.

**Mock data layer as a seam for Phase 2B.** All data currently comes from typed mock stores (`user-store.ts`, `orders-store.ts`). Phase 2B (authentication + backend) will swap these for Supabase queries without touching UI code — a clean boundary.

**`next/image` everywhere.** Automatic format negotiation (WebP/AVIF) and responsive sizing keep LCP under 2 seconds even with rich hero imagery.

**Route-level loading skeletons.** App Router's `loading.tsx` convention provides near-instant perceived performance during client-side navigation.

---

## Performance

Measured on a production build via Chrome DevTools (Lighthouse + Web Vitals):

- **LCP (Largest Contentful Paint):** 1.78s
- **CLS (Cumulative Layout Shift):** 0
- **INP (Interaction to Next Paint):** 8ms
- **Build time (Turbopack):** ~4.7s
- **Static routes:** all prerendered

---

## Roadmap

### Phase 2A — Frontend Complete ✅
- [x] Product configurator + cart
- [x] Multi-step checkout with validation
- [x] Content pages (Tech Specs, visionOS, Book a Demo)
- [x] Account dashboard and order history
- [x] 404, loading, error boundaries
- [x] SEO and accessibility polish

### Phase 2B — Backend Integration (upcoming)
- [ ] Authentication (Clerk)
- [ ] Database layer (Supabase Postgres)
- [ ] Real Stripe checkout (test mode)
- [ ] Order confirmation emails (Resend)
- [ ] Profile editing and real user sync
- [ ] Admin view for seeded orders

### Phase 3 — Stretch (optional)
- [ ] Wishlist / saved configurations
- [ ] Compare page (Vision Pro vs competitors)
- [ ] Storybook for component library
- [ ] Unit + E2E tests (Vitest + Playwright)

---

## Lessons Learned

A few bugs worth remembering from the build process:

- **Race condition in `handlePlaceOrder`:** Clearing Zustand state before `router.push` fired unwanted `useEffect` guards that redirected the user away from `/checkout/success`. Fix: navigate first, then clear state — and guard the effect with an `isSubmitting` flag.
- **Hydration mismatch in Navbar:** Zustand's `persist` middleware reads from `localStorage` on the client only, so server-rendered bag count always starts at 0 while client hydrates with the stored value. Fixed with a `mounted` guard pattern.
- **Scroll spy off-by-one:** `IntersectionObserver` with a thin detection strip flipped to the next section right after smooth-scroll settled. Replaced with deterministic `getBoundingClientRect().top` check against a fixed offset — predictable and correct.
- **Navbar theme flicker over video:** `elementFromPoint` sampled shifting video frames and bounced between light/dark themes. Solved by making the video hero extend to `y=0` so the navbar always samples a consistent dark background at the top of the page.

---

## License

MIT — feel free to use this code as a reference for your own projects.

---

## Acknowledgements

- Design language inspired by [apple.com/apple-vision-pro](https://www.apple.com/apple-vision-pro/)
- GSAP animation patterns via [GreenSock docs](https://gsap.com/docs/v3/)
- Next.js App Router patterns via [nextjs.org/docs](https://nextjs.org/docs)

---

Built as a learning exercise. If you found this useful, a ⭐ on the repo is appreciated.
