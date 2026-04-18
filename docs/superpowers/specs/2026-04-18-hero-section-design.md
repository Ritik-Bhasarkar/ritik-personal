# Hero Section — Design Spec
Date: 2026-04-18

## Overview
Port the standalone `Portfolio/Hero V6.html` into the Next.js app (`ritik-personal/`) as a set of reusable, properly-scoped components. The existing `navbar` component is replaced by the hero's own topnav.

## File Structure

```
src/
  components/
    music-player/
      music-player.tsx      ← 'use client', fake timer + TODO audio hook
      music-player.scss
    cursor-halo/
      cursor-halo.tsx       ← 'use client', mouse tracking
      cursor-halo.scss
  sections/
    hero-section/
      hero-section.tsx      ← Server Component, assembles all pieces
      hero-section.scss
      topnav/
        topnav.tsx           ← 'use client' (contains MusicPlayer)
        topnav.scss
      availability-pill/
        availability-pill.tsx
        availability-pill.scss
      hero-meta/
        hero-meta.tsx        ← 'use client' (live clock)
        hero-meta.scss
      hero-main/
        hero-main.tsx
        hero-main.scss
      hero-footer/
        hero-footer.tsx
        hero-footer.scss
      hero-annotations/
        hero-annotations.tsx
        hero-annotations.scss
```

## CSS Variables

Hero-specific tokens scoped to `.hero-section` in `src/styles/variables/color.scss` — not `:root`, so they don't affect the rest of the app:

```scss
.hero-section {
  --hero-ink: #111111;
  --hero-paper: #fafaf7;
  --hero-muted: #6b6b6b;
  --hero-accent: #ef233c;
  --hero-avail: #1aa34a;
  --hero-grid: rgba(17, 17, 17, 0.07);
}
```

## Font

`Space Mono` (400, 700) added to `src/app/layout.tsx` via `next/font/google`. Exposed as `--font-mono` CSS variable on `<html>`. Caveat (annotations) also loaded via `next/font/google`, exposed as `--font-hand`.

## Component Interfaces

### `hero-section.tsx` — Server Component
Assembles all sub-components. Renders `<CursorHalo />` inside the section. No external props.

### `topnav.tsx` — `'use client'`
Renders brand ("RITIK©"), centered `<MusicPlayer />`, and nav links (Work / About / Contact with `href` pointing to `#work`, `#about`, `#contact`). No props.

### `music-player.tsx` — `'use client'`
- Internal state: `playing: boolean`, `elapsed: number`, `rafId: number | null`
- Collapsed by default; click expands and auto-plays
- Fake timer loop via `requestAnimationFrame`
- `// TODO: wire audio src` comment at the `DURATION = 419` constant
- No props

### `availability-pill.tsx` — Server Component
Static markup: blinking green dot + "Open to freelance · Q3 '26". No props.

### `hero-meta.tsx` — `'use client'`
Live IST clock via `useEffect` + `setInterval(1000)`. Static role ("Frontend Developer") and location ("Pune, IN"). No props.

### `hero-main.tsx` — Server Component
Name (`Ritik Bhasarkar.`) and bio paragraph. Static copy. No props.

### `hero-footer.tsx` — Server Component
Scroll cue (arrow + "Scroll — Selected Work") and social links (GitHub, Read.cv, Twitter, Email). Links use `href="#"` with `// TODO: replace with real URLs` comments. No props.

### `hero-annotations.tsx` — Server Component
Both editorial annotations: `.note-music` (tap to play the station) and `.note-bio` (a short note about the work), each with inline SVG arrow. No props.

### `cursor-halo.tsx` — `'use client'`
Absolutely-positioned radial gradient div. Tracks `mousemove` on the hero container via a `data-hero` attribute selector in `useEffect`. Hides on `mouseleave`, shows on `mouseenter`. No props.

## SCSS Conventions
- Every `.scss` file starts with `@use "@/mixins.scss" as *;`
- BEM naming: block matches component name (e.g. `.music-player`, `.hero-section`, `.topnav`)
- Children use `--` separator: `.music-player--eq`, `.topnav--brand`
- Media queries at bottom of file, re-nesting the block
- Mobile breakpoint: `@media (max-width: 480px)` (project standard); hero annotations hide at `@media (max-width: 720px)` matching original design

## Deleted / Replaced
- `src/components/navbar/navbar.tsx` — deleted (replaced by `topnav`)
- `src/components/navbar/navbar.scss` — deleted
- `src/app/page.tsx` — `<Navbar />` removed, `<HeroSection />` added

## Out of Scope
- Real audio file wiring (TODO comment left in `music-player.tsx`)
- Real social link URLs (TODO comment left in `hero-footer.tsx`)
- `#work`, `#about`, `#contact` target sections below the hero
- Color-inverting nav on scroll
