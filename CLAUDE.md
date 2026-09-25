# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js 16 Notice

This project uses Next.js 16 with Turbopack, React 19, and the React Compiler. APIs and conventions differ from older Next.js versions (e.g., `params` and `searchParams` in layouts and pages are Promises that must be `await`ed). Always consult documentation in `node_modules/next/dist/docs/` and review `AGENTS.md` when unsure.

## Development Commands

- **Development server**: `pnpm dev`
- **Build**: `pnpm build`
- **Production start**: `pnpm start`
- **Lint**: `pnpm lint` (runs `eslint`)
- **Lint single file**: `pnpm exec eslint <file_path>`
- **Type check**: `pnpm exec tsc --noEmit`
- **Format code**: `pnpm format` (runs `prettier --write .`)

_Note: No automated test suite (Jest/Vitest) is currently configured in `package.json`._

## Architecture & Codebase Structure

### 1. Internationalization (`next-intl`)

- **Routing**: Handled in `src/i18n/routing.ts` supporting `en` (default), `zh-CN`, and `zh-TW`. Every route is locale-prefixed: `/[locale]/...`.
- **Navigation**: Always import `Link`, `useRouter`, `usePathname`, and `redirect` from `@/i18n/navigation` (never directly from `next/link` or `next/navigation`) to ensure locale persistence.
- **Messages**: Stored in `src/messages/{en,zh-CN,zh-TW}.json`. When adding translated strings, add keys across all three files using PascalCase namespaces matching the component or page.

### 2. Route Groups & Layout Shell

- `src/app/[locale]/(app)/`: Authenticated application shell.
  - The layout wraps pages in `SidebarProvider` (`src/lib/sidebar-context.tsx`), renders fixed `TopNav` and collapsible `LeftRail` (`src/components/left-rail.tsx`), and dynamically adjusts content margin via `SidebarContentOffset` (`src/components/sidebar-content-offset.tsx`).
  - Standard page container within this shell is `<div className="mx-auto max-w-3xl space-y-8">`.
- `src/app/[locale]/(auth)/`: Unauthenticated views (`/login`, `/signup`, `/forgot-password`).

### 3. Middleware & Authentication

- `middleware.ts`: Orchestrates `next-intl` localization and route guards using session cookies.
  - Protected routes (`/dashboard`, `/setup`, `/settings`, `/projects`, `/record`, `/profile`, `/help`) redirect unauthenticated requests to `/${locale}/login?from=...`.
  - Auth routes redirect authenticated sessions back to `/${locale}/dashboard`.
- **Session management**: JWT cookie authentication implemented in `src/lib/session.ts` using `jose` marked with `server-only`. Read session in Server Components with `await getSession()`. Server actions for auth reside in `src/lib/auth.ts`.

### 4. Component Library & Base UI Conventions

- Components in `src/components/ui/` use `shadcn` styling built over **`@base-ui/react`** primitives (not Radix UI).
- **Critical pattern**: Base UI uses the `render` prop for element composition instead of `asChild`. For example:
  ```tsx
  <DropdownMenuItem render={<Link href="/profile" className="..." />}>
    Profile
  </DropdownMenuItem>
  ```
  Applies to `DropdownMenuTrigger`, `DropdownMenuItem`, `TooltipTrigger`, etc.

### 5. Styling & Design Tokens

- **Tailwind CSS v4**: Configured via `@import 'tailwindcss'` and `@theme inline` in `src/app/globals.css`.
- **Tokens & Theming**: Theme variables set on `:root` and `.dark` with OKLCH colors. Use semantic utilities (`bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-destructive`). Use `border-white/8` for dark-mode-safe panel borders.
- **Brand Palette**: Product accent is violet → indigo (`text-violet-400`, `bg-violet-500/15`, `from-violet-500 to-indigo-600`).
- **Typography**: Configured in `src/lib/fonts.ts` using `next/font/google`:
  - `font-sans` (`--font-sans`): Inter for body copy.
  - `font-heading` (`--font-heading`): Sora for headings and card titles.

### 6. Animation Layer

- Powered by `motion/react` (`motion` package v13).
- Reusable transitions and animation wrappers are in `src/components/animations/` (`PageTransition`, `FadeIn`, `StaggerContainer`) with easing and variant definitions in `src/lib/motion.ts`.
