# Anmol Malhan — Frontend Portfolio

Personal portfolio site. Built to feel fast, deliberate, and motion-aware while staying accessible.

## Stack

- **Next.js 16** (App Router, experimental View Transitions)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** with custom design tokens (`globals.css`)
- **GSAP** (ScrollTrigger) and **Lenis** for animation and smooth scroll
- **lucide-react** for icons
- **Resend** for the optional contact-form mail path (mailto fallback when env is unset)

## Local development

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:3000>.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest unit tests once |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:e2e` | Run Playwright smoke tests (auto-starts the dev/start server) |

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout, metadata, JSON-LD, SmoothScroll wrapper
│   ├── template.tsx                # Pass-through (kept lean to protect LCP)
│   ├── page.tsx                    # Home (hero, code section, horizontal carousel, footer reveal)
│   ├── globals.css                 # Tokens, @theme, motion-safe rules, view-transition opts
│   ├── manifest.ts                 # PWA manifest
│   ├── sitemap.ts                  # /sitemap.xml (static + project routes)
│   ├── robots.ts                   # /robots.txt
│   ├── opengraph-image.tsx         # /opengraph-image (auto OG for the site)
│   ├── loading.tsx                 # Route-level loading UI
│   ├── not-found.tsx               # Global 404
│   ├── global-error.tsx            # Top-level error boundary
│   ├── about/page.tsx
│   ├── contact/
│   │   ├── page.tsx                # Server Component (renders status banner from searchParams)
│   │   ├── layout.tsx
│   │   ├── ContactForm.tsx         # Client component with terminal-style submit UX
│   │   ├── StatusBanner.tsx        # Server-rendered success/error after JS-less submit
│   │   └── actions.ts              # "use server" — validation, rate-limit, Resend or mailto
│   └── projects/
│       ├── page.tsx                # Listing
│       └── [slug]/
│           ├── page.tsx            # Case study renderer (structured sections + metrics)
│           ├── not-found.tsx
│           └── opengraph-image.tsx # Per-project OG image
├── components/
│   ├── ui/
│   │   ├── Header.tsx
│   │   └── ThemeToggle.tsx         # useSyncExternalStore against <html data-theme>
│   ├── animations/
│   │   ├── CustomCursor.tsx
│   │   └── SmoothScroll.tsx        # Lenis wired into the GSAP ticker
│   └── home/
│       ├── HeroSection.tsx
│       ├── CodeSection.tsx
│       ├── ProjectsCarousel.tsx
│       └── FooterReveal.tsx
└── data/
    └── projects.ts                 # Project catalogue (Project, ProjectSection, ProjectMetric)

tests/
├── unit/contact-actions.test.ts    # Vitest — server-action validation, rate limit, Resend paths
└── e2e/smoke.spec.ts               # Playwright — routing, hero animation, contact submit, 404
```

## Environment

```bash
# Required in production. Falls back to http://localhost:3000 if unset.
NEXT_PUBLIC_SITE_URL=https://anmolmalhan.com

# Optional contact-form mail backend (Resend). When unset the form opens
# the visitor's default mail client instead.
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

See `.env.example` for the canonical list.

## Notes

- Custom design tokens live in `src/app/globals.css` under `:root` and `@theme inline`. Add new colors in both blocks so Tailwind can generate utilities.
- The contact form is **progressively enhanced**: without JS, the `<form action={sendContactForm}>` server action redirects with status; with JS, the client intercepts for an inline terminal animation.
- The fixed footer reveal uses an IntersectionObserver to toggle `inert`, so keyboard users don't tab into invisible content.
- Hero text initial state is set both in CSS (so SSR paint doesn't flash) and via `gsap.set(lines, { yPercent: 120, y: 0 })` (the explicit `y: 0` is load-bearing — without it GSAP reads the CSS matrix as a pixel offset and stacks another 120% on top).
- `@emnapi/core` and `@emnapi/runtime` are pinned as devDeps to satisfy `npm ci` on Linux. They're nested deps of `@rolldown/binding-wasm32-wasi` (pulled in by vitest); npm on macOS doesn't resolve their top-level lockfile entries, which breaks the strict Linux install. Remove once upstream npm fixes wasm32-wasi transitive resolution.

## Deployment

Vercel auto-deploys from `main`. CI (GitHub Actions) runs lint, typecheck, Vitest, build, and Playwright on every PR and push.
