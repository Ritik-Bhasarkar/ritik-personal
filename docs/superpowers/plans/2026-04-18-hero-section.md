# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port Hero V6.html into the Next.js app as typed, themed, reusable components under `src/sections/hero-section/`.

**Architecture:** Server Components for static markup, `'use client'` only for music player state, live clock, and cursor halo. Hero palette (`--hero-*`) scoped to `.hero-section` in its own SCSS. Fonts loaded via `next/font/google` and exposed as CSS variables on `<html>`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), SCSS Modules, Vitest + React Testing Library

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/cursor-halo/cursor-halo.tsx` | Mouse-tracking halo, `'use client'` |
| Create | `src/components/cursor-halo/cursor-halo.scss` | Halo styles |
| Create | `src/components/music-player/music-player.tsx` | Fake-timer player, collapse/expand, `'use client'` |
| Create | `src/components/music-player/music-player.scss` | Player styles |
| Create | `src/sections/hero-section/hero-section.tsx` | Assembles all sub-components |
| Create | `src/sections/hero-section/hero-section.scss` | Hero token definitions + grid background |
| Create | `src/sections/hero-section/topnav/topnav.tsx` | Brand + MusicPlayer + nav links, `'use client'` |
| Create | `src/sections/hero-section/topnav/topnav.scss` | Topnav styles |
| Create | `src/sections/hero-section/availability-pill/availability-pill.tsx` | Blinking dot + status text |
| Create | `src/sections/hero-section/availability-pill/availability-pill.scss` | Pill + blink animation |
| Create | `src/sections/hero-section/hero-meta/hero-meta.tsx` | Live IST clock, `'use client'` |
| Create | `src/sections/hero-section/hero-meta/hero-meta.scss` | Meta styles |
| Create | `src/sections/hero-section/hero-main/hero-main.tsx` | Name + bio |
| Create | `src/sections/hero-section/hero-main/hero-main.scss` | Name + bio styles |
| Create | `src/sections/hero-section/hero-footer/hero-footer.tsx` | Scroll cue + socials |
| Create | `src/sections/hero-section/hero-footer/hero-footer.scss` | Footer styles |
| Create | `src/sections/hero-section/hero-annotations/hero-annotations.tsx` | Editorial SVG annotations |
| Create | `src/sections/hero-section/hero-annotations/hero-annotations.scss` | Annotation styles |
| Modify | `src/app/layout.tsx` | Add Space Mono + Caveat font variables |
| Modify | `src/app/page.tsx` | Replace placeholder content with `<HeroSection />` |
| Modify | `src/styles/variables/color.scss` | Add hero token block |
| Delete | `src/components/navbar/navbar.tsx` | Replaced by topnav |
| Delete | `src/components/navbar/navbar.scss` | Replaced by topnav |
| Create | `vitest.config.ts` | Test runner config |
| Create | `vitest.setup.ts` | jest-dom matchers |
| Create | `src/components/cursor-halo/cursor-halo.test.tsx` | Render test |
| Create | `src/components/music-player/music-player.test.tsx` | State/interaction tests |
| Create | `src/sections/hero-section/hero-meta/hero-meta.test.tsx` | Clock render + tick test |

---

## Task 1: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json`
- Modify: `tsconfig.json`

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        globals: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 4: Add test scripts to `package.json`**

In the `"scripts"` block, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Add vitest types to `tsconfig.json`**

In `compilerOptions`, add:
```json
"types": ["vitest/globals", "@testing-library/jest-dom"]
```

- [ ] **Step 6: Verify setup with a smoke test**

Create `src/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
describe('vitest', () => {
    it('works', () => expect(1 + 1).toBe(2));
});
```

Run: `npm test`
Expected: `1 passed`

- [ ] **Step 7: Delete smoke test and commit**

```bash
rm src/smoke.test.ts
git add vitest.config.ts vitest.setup.ts package.json tsconfig.json
git commit -m "Add Vitest and React Testing Library"
```

---

## Task 2: Add fonts to layout and hero token block

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/styles/variables/color.scss`

- [ ] **Step 1: Update `src/app/layout.tsx`**

Replace the file entirely:
```tsx
import type { Metadata } from 'next';
import { Caveat, Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/context/theme';
import '@/styles/global.scss';

const inter = Inter({ subsets: ['latin'] });

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-mono',
});

const caveat = Caveat({
    weight: ['400', '600'],
    subsets: ['latin'],
    variable: '--font-hand',
});

export const metadata: Metadata = {
    title: 'Ritik Bhasarkar',
    description: 'Personal website',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${spaceMono.variable} ${caveat.variable}`}
        >
            <body className={inter.className}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

- [ ] **Step 2: Add hero tokens to `src/styles/variables/color.scss`**

Append at the end of the file (after the closing `}` of `:root`):
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

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/styles/variables/color.scss
git commit -m "Add Space Mono, Caveat fonts and hero CSS tokens"
```

---

## Task 3: CursorHalo component

**Files:**
- Create: `src/components/cursor-halo/cursor-halo.tsx`
- Create: `src/components/cursor-halo/cursor-halo.scss`
- Create: `src/components/cursor-halo/cursor-halo.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/cursor-halo/cursor-halo.test.tsx`:
```tsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CursorHalo from './cursor-halo';

describe('CursorHalo', () => {
    it('renders the halo element', () => {
        const { container } = render(<CursorHalo />);
        expect(container.querySelector('.cursor-halo')).toBeInTheDocument();
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- cursor-halo
```
Expected: FAIL — `Cannot find module './cursor-halo'`

- [ ] **Step 3: Create `src/components/cursor-halo/cursor-halo.scss`**

```scss
@use "@/mixins.scss" as *;

.cursor-halo {
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(
        closest-side,
        rgba(17, 17, 17, 0.08),
        rgba(17, 17, 17, 0)
    );
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    mix-blend-mode: multiply;
    transition: opacity 0.3s;
}
```

- [ ] **Step 4: Create `src/components/cursor-halo/cursor-halo.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import './cursor-halo.scss';

export default function CursorHalo() {
    const haloRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hero = document.querySelector('[data-hero]') as HTMLElement | null;
        const halo = haloRef.current;
        if (!hero || !halo) return;

        const onMove = (e: MouseEvent) => {
            const r = hero.getBoundingClientRect();
            halo.style.left = `${e.clientX - r.left}px`;
            halo.style.top = `${e.clientY - r.top}px`;
        };
        const onLeave = () => { halo.style.opacity = '0'; };
        const onEnter = () => { halo.style.opacity = '1'; };

        hero.addEventListener('mousemove', onMove);
        hero.addEventListener('mouseleave', onLeave);
        hero.addEventListener('mouseenter', onEnter);

        return () => {
            hero.removeEventListener('mousemove', onMove);
            hero.removeEventListener('mouseleave', onLeave);
            hero.removeEventListener('mouseenter', onEnter);
        };
    }, []);

    return <div ref={haloRef} className="cursor-halo" />;
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- cursor-halo
```
Expected: `1 passed`

- [ ] **Step 6: Commit**

```bash
git add src/components/cursor-halo/
git commit -m "Add CursorHalo component"
```

---

## Task 4: MusicPlayer component

**Files:**
- Create: `src/components/music-player/music-player.tsx`
- Create: `src/components/music-player/music-player.scss`
- Create: `src/components/music-player/music-player.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/music-player/music-player.test.tsx`:
```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MusicPlayer from './music-player';

beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
    }));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('MusicPlayer', () => {
    it('renders collapsed by default', () => {
        render(<MusicPlayer />);
        expect(screen.getByTestId('music-player')).toHaveClass('music-player--collapsed');
    });

    it('expands on first click', () => {
        render(<MusicPlayer />);
        fireEvent.click(screen.getByTestId('music-player'));
        expect(screen.getByTestId('music-player')).not.toHaveClass('music-player--collapsed');
    });

    it('shows label when expanded', () => {
        render(<MusicPlayer />);
        fireEvent.click(screen.getByTestId('music-player'));
        expect(screen.getByText('RITIK© RADIO')).toBeInTheDocument();
    });

    it('starts playing on first click', () => {
        render(<MusicPlayer />);
        fireEvent.click(screen.getByTestId('music-player'));
        expect(screen.getByTestId('music-player')).toHaveClass('music-player--playing');
    });

    it('pauses on second click', () => {
        render(<MusicPlayer />);
        fireEvent.click(screen.getByTestId('music-player')); // expand + play
        fireEvent.click(screen.getByTestId('music-player')); // pause
        expect(screen.getByTestId('music-player')).not.toHaveClass('music-player--playing');
    });

    it('shows duration when expanded', () => {
        render(<MusicPlayer />);
        fireEvent.click(screen.getByTestId('music-player'));
        expect(screen.getByText('6:59')).toBeInTheDocument();
    });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- music-player
```
Expected: FAIL — `Cannot find module './music-player'`

- [ ] **Step 3: Create `src/components/music-player/music-player.scss`**

```scss
@use "@/mixins.scss" as *;

.music-player {
    position: relative;
    display: inline-flex;
    align-items: center;
    color: var(--hero-ink);
    cursor: pointer;
    user-select: none;

    &--brk {
        position: absolute;
        width: 14px;
        height: 14px;
        border: 1.5px solid var(--hero-ink);
        pointer-events: none;

        &--tl { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
        &--tr { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
        &--bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
        &--br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
    }

    &--inner {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 18px;
        white-space: nowrap;
        overflow: hidden;
        transition: all 0.35s cubic-bezier(0.6, 0.05, 0.2, 1);
    }

    &--collapsed &--inner {
        width: 58px;
        height: 58px;
        padding: 0;
        justify-content: center;
    }

    &--eq {
        display: inline-flex;
        gap: 2px;
        align-items: flex-end;
        height: 16px;
        width: 18px;
        justify-content: center;

        i {
            display: block;
            width: 2px;
            background: var(--hero-ink);
            height: 4px;
        }
    }

    &--playing &--eq {
        i:nth-child(1) { animation: hero-eq 0.7s ease-in-out infinite alternate; }
        i:nth-child(2) { animation: hero-eq 1.0s ease-in-out infinite alternate; }
        i:nth-child(3) { animation: hero-eq 0.55s ease-in-out infinite alternate; }
        i:nth-child(4) { animation: hero-eq 1.2s ease-in-out infinite alternate; }
        i:nth-child(5) { animation: hero-eq 0.85s ease-in-out infinite alternate; }
    }

    &--label {
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        font-weight: 700;
        font-family: var(--font-mono);
    }

    &--play {
        width: 22px;
        height: 22px;
        background: var(--hero-ink);
        display: grid;
        place-items: center;
        flex: none;

        svg {
            width: 10px;
            height: 10px;
            fill: var(--hero-paper);
        }
    }

    &--time {
        font-size: 11px;
        letter-spacing: 0.08em;
        font-variant-numeric: tabular-nums;
        color: var(--hero-muted);
        font-family: var(--font-mono);

        &--now { color: var(--hero-ink); }
    }

    &--progress {
        position: relative;
        width: 220px;
        height: 2px;
        background: rgba(17, 17, 17, 0.25);
        flex: none;

        &--fill {
            position: absolute;
            left: 0;
            top: -1px;
            bottom: -1px;
            background: var(--hero-ink);
            width: 0%;
            transition: width 0.2s linear;
        }

        &--knob {
            position: absolute;
            top: 50%;
            width: 7px;
            height: 7px;
            background: var(--hero-ink);
            transform: translate(-50%, -50%);
            left: 0%;
            transition: left 0.2s linear;
        }
    }

    &--hint {
        position: absolute;
        top: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);
        font-size: 9px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--hero-muted);
        white-space: nowrap;
        pointer-events: none;
        font-family: var(--font-mono);
    }
}

@keyframes hero-eq {
    from { height: 3px; }
    to { height: 16px; }
}
```

- [ ] **Step 4: Create `src/components/music-player/music-player.tsx`**

```tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import './music-player.scss';

// TODO: wire audio src — swap DURATION for audio.duration, elapsed for audio.currentTime
const DURATION = 419; // 6:59

const fmt = (s: number): string => {
    const clamped = Math.max(0, Math.floor(s));
    return `${Math.floor(clamped / 60)}:${String(clamped % 60).padStart(2, '0')}`;
};

export default function MusicPlayer() {
    const [collapsed, setCollapsed] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const startedAtRef = useRef<number>(0);
    const elapsedRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);

    const stopRaf = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    const tick = useCallback(() => {
        const next = (Date.now() - startedAtRef.current) / 1000;
        const looped = next >= DURATION ? 0 : next;
        if (next >= DURATION) startedAtRef.current = Date.now();
        elapsedRef.current = looped;
        setElapsed(looped);
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    const startPlayback = useCallback(() => {
        startedAtRef.current = Date.now() - elapsedRef.current * 1000;
        rafRef.current = requestAnimationFrame(tick);
    }, [tick]);

    useEffect(() => () => stopRaf(), [stopRaf]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (collapsed) {
            setCollapsed(false);
            setPlaying(true);
            startPlayback();
            return;
        }
        const prog = (e.target as HTMLElement).closest('.music-player--progress');
        if (prog) {
            const r = prog.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
            const next = pct * DURATION;
            elapsedRef.current = next;
            setElapsed(next);
            if (playing) startedAtRef.current = Date.now() - next * 1000;
        } else {
            setPlaying(prev => {
                if (prev) {
                    stopRaf();
                    return false;
                }
                startPlayback();
                return true;
            });
        }
    };

    const pct = Math.min(100, (elapsed / DURATION) * 100);

    return (
        <div
            data-testid="music-player"
            className={[
                'music-player',
                collapsed ? 'music-player--collapsed' : '',
                playing ? 'music-player--playing' : '',
            ].filter(Boolean).join(' ')}
            onClick={handleClick}
        >
            <span className="music-player--brk music-player--brk--tl" />
            <span className="music-player--brk music-player--brk--tr" />
            <span className="music-player--brk music-player--brk--bl" />
            <span className="music-player--brk music-player--brk--br" />
            <div className="music-player--inner">
                <span className="music-player--eq">
                    <i /><i /><i /><i /><i />
                </span>
                {!collapsed && (
                    <>
                        <span className="music-player--label">RITIK© RADIO</span>
                        <span className="music-player--play">
                            <svg viewBox="0 0 10 10">
                                {playing
                                    ? <path d="M1,0 h3 v10 h-3 Z M6,0 h3 v10 h-3 Z" />
                                    : <polygon points="1,0 9,5 1,10" />}
                            </svg>
                        </span>
                        <span className="music-player--time music-player--time--now">
                            {fmt(elapsed)}
                        </span>
                        <span className="music-player--progress">
                            <span
                                className="music-player--progress--fill"
                                style={{ width: `${pct}%` }}
                            />
                            <span
                                className="music-player--progress--knob"
                                style={{ left: `${pct}%` }}
                            />
                        </span>
                        <span className="music-player--time">{fmt(DURATION)}</span>
                    </>
                )}
            </div>
            {collapsed && (
                <span className="music-player--hint">click to play ↑</span>
            )}
        </div>
    );
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- music-player
```
Expected: `6 passed`

- [ ] **Step 6: Commit**

```bash
git add src/components/music-player/
git commit -m "Add MusicPlayer component"
```

---

## Task 5: Topnav

**Files:**
- Create: `src/sections/hero-section/topnav/topnav.tsx`
- Create: `src/sections/hero-section/topnav/topnav.scss`

- [ ] **Step 1: Create `src/sections/hero-section/topnav/topnav.scss`**

```scss
@use "@/mixins.scss" as *;

.topnav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 22px 36px;
    border-bottom: 1px solid var(--hero-ink);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    z-index: 3;
    font-family: var(--font-mono);

    &--brand {
        font-weight: 700;
        letter-spacing: 0.22em;
        color: var(--hero-ink);
    }

    &--center {
        justify-self: center;
        position: relative;
    }

    &--links {
        justify-self: end;
        display: flex;
        gap: 22px;

        a {
            color: var(--hero-ink);
            text-decoration: none;
            opacity: 0.7;

            &:hover { opacity: 1; }
        }
    }
}

@media (max-width: 720px) {
    .topnav {
        grid-template-columns: 1fr 1fr;
        padding: 16px 20px;

        &--center {
            grid-column: 1 / -1;
            order: 3;
            margin-top: 12px;
            justify-self: start;
        }

        &--links { gap: 14px; }
    }
}
```

- [ ] **Step 2: Create `src/sections/hero-section/topnav/topnav.tsx`**

```tsx
'use client';

import MusicPlayer from '@/components/music-player/music-player';
import './topnav.scss';

export default function Topnav() {
    return (
        <nav className="topnav">
            <div className="topnav--brand">RITIK©</div>
            <div className="topnav--center">
                <MusicPlayer />
            </div>
            <div className="topnav--links">
                <a href="#work">Work</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/hero-section/topnav/
git commit -m "Add Topnav component"
```

---

## Task 6: AvailabilityPill

**Files:**
- Create: `src/sections/hero-section/availability-pill/availability-pill.tsx`
- Create: `src/sections/hero-section/availability-pill/availability-pill.scss`

- [ ] **Step 1: Create `src/sections/hero-section/availability-pill/availability-pill.scss`**

```scss
@use "@/mixins.scss" as *;

.availability-pill {
    position: absolute;
    top: 110px;
    left: 36px;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    z-index: 2;
    font-family: var(--font-mono);
    color: var(--hero-ink);

    &--dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--hero-avail);
        animation: avail-blink 1.1s steps(2) infinite;
        box-shadow: 0 0 0 3px rgba(26, 163, 74, 0.18);
    }
}

@keyframes avail-blink {
    50% { opacity: 0.2; }
}

@media (max-width: 480px) {
    .availability-pill {
        top: 160px;
        left: 20px;
    }
}
```

- [ ] **Step 2: Create `src/sections/hero-section/availability-pill/availability-pill.tsx`**

```tsx
import './availability-pill.scss';

export default function AvailabilityPill() {
    return (
        <div className="availability-pill">
            <span className="availability-pill--dot" />
            Open to freelance · Q3 &apos;26
        </div>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/hero-section/availability-pill/
git commit -m "Add AvailabilityPill component"
```

---

## Task 7: HeroMeta (live clock)

**Files:**
- Create: `src/sections/hero-section/hero-meta/hero-meta.tsx`
- Create: `src/sections/hero-section/hero-meta/hero-meta.scss`
- Create: `src/sections/hero-section/hero-meta/hero-meta.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/sections/hero-section/hero-meta/hero-meta.test.tsx`:
```tsx
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroMeta from './hero-meta';

const TIME_RE = /^\d{2}:\d{2}:\d{2}$/;

describe('HeroMeta', () => {
    it('renders role text', () => {
        const { getByText } = render(<HeroMeta />);
        expect(getByText(/frontend developer/i)).toBeInTheDocument();
    });

    it('renders location text', () => {
        const { getByText } = render(<HeroMeta />);
        expect(getByText(/Pune, IN/i)).toBeInTheDocument();
    });

    it('renders a valid IST time string', () => {
        const { container } = render(<HeroMeta />);
        const clock = container.querySelector('.hero-meta--clock');
        expect(clock?.textContent).toMatch(TIME_RE);
    });

    it('updates the clock after 1 second', () => {
        vi.useFakeTimers();
        const { container } = render(<HeroMeta />);
        const clock = container.querySelector('.hero-meta--clock');
        act(() => { vi.advanceTimersByTime(1000); });
        expect(clock?.textContent).toMatch(TIME_RE);
        vi.useRealTimers();
    });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- hero-meta
```
Expected: FAIL — `Cannot find module './hero-meta'`

- [ ] **Step 3: Create `src/sections/hero-section/hero-meta/hero-meta.scss`**

```scss
@use "@/mixins.scss" as *;

.hero-meta {
    position: absolute;
    top: 110px;
    right: 36px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--hero-muted);
    text-align: right;
    line-height: 1.8;
    z-index: 2;
    font-family: var(--font-mono);

    &--clock {
        color: var(--hero-ink);
        font-weight: 700;
    }
}

@media (max-width: 480px) {
    .hero-meta {
        top: 160px;
        right: 20px;
        font-size: 9px;
    }
}
```

- [ ] **Step 4: Create `src/sections/hero-section/hero-meta/hero-meta.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import './hero-meta.scss';

function getISTTime(): string {
    return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date());
}

export default function HeroMeta() {
    const [time, setTime] = useState('');

    useEffect(() => {
        setTime(getISTTime());
        const id = setInterval(() => setTime(getISTTime()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="hero-meta">
            Frontend Developer
            <br />
            Pune, IN · IST <b className="hero-meta--clock">{time}</b>
        </div>
    );
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- hero-meta
```
Expected: `4 passed`

- [ ] **Step 6: Commit**

```bash
git add src/sections/hero-section/hero-meta/
git commit -m "Add HeroMeta component with live IST clock"
```

---

## Task 8: HeroMain

**Files:**
- Create: `src/sections/hero-section/hero-main/hero-main.tsx`
- Create: `src/sections/hero-section/hero-main/hero-main.scss`

- [ ] **Step 1: Create `src/sections/hero-section/hero-main/hero-main.scss`**

```scss
@use "@/mixins.scss" as *;

.hero-main {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    padding: 0 36px;

    &--name {
        font-weight: 500;
        font-size: clamp(56px, 9.5vw, 144px);
        line-height: 0.9;
        letter-spacing: -0.025em;
        margin: 0;
        font-family: var(--font-mono);
        color: var(--hero-ink);

        em {
            font-style: normal;
            color: var(--hero-muted);
        }
    }

    &--bio {
        max-width: 520px;
        font-size: 13px;
        line-height: 1.7;
        color: var(--hero-ink);
        margin-top: 24px;
        font-family: var(--font-mono);
    }
}

@media (max-width: 480px) {
    .hero-main {
        padding: 0 20px;

        &--bio { font-size: 12px; }
    }
}
```

- [ ] **Step 2: Create `src/sections/hero-section/hero-main/hero-main.tsx`**

```tsx
import './hero-main.scss';

export default function HeroMain() {
    return (
        <div className="hero-main">
            <h1 className="hero-main--name">
                Ritik
                <br />
                Bhasarkar<em>.</em>
            </h1>
            <p className="hero-main--bio">
                Frontend developer building quiet, considered interfaces — component
                systems, motion, and the small details that make software feel physical.
                Currently booking new projects.
            </p>
        </div>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/hero-section/hero-main/
git commit -m "Add HeroMain component"
```

---

## Task 9: HeroFooter

**Files:**
- Create: `src/sections/hero-section/hero-footer/hero-footer.tsx`
- Create: `src/sections/hero-section/hero-footer/hero-footer.scss`

- [ ] **Step 1: Create `src/sections/hero-section/hero-footer/hero-footer.scss`**

```scss
@use "@/mixins.scss" as *;

.hero-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 22px 36px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    gap: 24px;
    border-top: 1px solid var(--hero-ink);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-family: var(--font-mono);
    color: var(--hero-ink);

    &--scroll {
        display: flex;
        align-items: center;
        gap: 14px;

        b { font-weight: 700; }

        &--arrow {
            display: inline-block;
            width: 28px;
            height: 1px;
            background: var(--hero-ink);
            position: relative;

            &::after {
                content: '';
                position: absolute;
                right: 0;
                top: -3px;
                width: 7px;
                height: 7px;
                border-right: 1px solid var(--hero-ink);
                border-bottom: 1px solid var(--hero-ink);
                transform: rotate(-45deg);
            }
        }
    }

    &--socials {
        justify-self: end;
        display: flex;
        gap: 20px;

        a {
            color: var(--hero-ink);
            text-decoration: none;
            opacity: 0.75;

            &:hover {
                opacity: 1;
                text-decoration: underline;
            }
        }
    }
}

@media (max-width: 480px) {
    .hero-footer {
        padding: 16px 20px;
        grid-template-columns: 1fr;
        gap: 12px;

        &--socials {
            justify-self: start;
            flex-wrap: wrap;
            gap: 14px;
        }
    }
}
```

- [ ] **Step 2: Create `src/sections/hero-section/hero-footer/hero-footer.tsx`**

```tsx
import './hero-footer.scss';

export default function HeroFooter() {
    return (
        <div className="hero-footer">
            <div className="hero-footer--scroll">
                <span className="hero-footer--scroll--arrow" />
                Scroll — <b>Selected Work</b>
            </div>
            <div className="hero-footer--socials">
                {/* TODO: replace with real URLs */}
                <a href="#">GitHub ↗</a>
                <a href="#">Read.cv ↗</a>
                <a href="#">Twitter ↗</a>
                <a href="#">Email ↗</a>
            </div>
        </div>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/hero-section/hero-footer/
git commit -m "Add HeroFooter component"
```

---

## Task 10: HeroAnnotations

**Files:**
- Create: `src/sections/hero-section/hero-annotations/hero-annotations.tsx`
- Create: `src/sections/hero-section/hero-annotations/hero-annotations.scss`

- [ ] **Step 1: Create `src/sections/hero-section/hero-annotations/hero-annotations.scss`**

```scss
@use "@/mixins.scss" as *;

.hero-annotations {
    position: absolute;
    font-family: var(--font-hand);
    font-size: 22px;
    line-height: 1.1;
    color: var(--hero-accent);
    white-space: nowrap;
    z-index: 4;
    pointer-events: none;

    small {
        display: block;
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--hero-accent);
        opacity: 0.75;
        margin-top: 2px;
        font-weight: 500;
    }

    svg {
        position: absolute;
        overflow: visible;
        pointer-events: none;

        path {
            fill: none;
            stroke: var(--hero-accent);
            stroke-width: 1.4;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
    }

    &--arrow-head {
        fill: var(--hero-accent);
        stroke: none;
    }

    &--music {
        top: 120px;
        left: 50%;
        transform: translateX(calc(-50% - 260px));
        text-align: right;

        svg {
            width: 200px;
            height: 70px;
            top: -48px;
            right: -30px;
        }
    }

    &--bio {
        bottom: 220px;
        right: 56px;
        text-align: left;
        max-width: 220px;
        white-space: normal;

        svg {
            width: 200px;
            height: 80px;
            left: -210px;
            top: 10px;
        }
    }
}

@media (max-width: 720px) {
    .hero-annotations {
        display: none;
    }
}
```

- [ ] **Step 2: Create `src/sections/hero-section/hero-annotations/hero-annotations.tsx`**

```tsx
import './hero-annotations.scss';

export default function HeroAnnotations() {
    return (
        <>
            <div className="hero-annotations hero-annotations--music">
                tap to play the station
                <small>— RITIK© RADIO</small>
                <svg viewBox="0 0 120 60">
                    <path d="M 10 55 C 20 30, 60 10, 110 6" />
                    <path className="hero-annotations--arrow-head" d="M 110 6 L 100 2 L 104 12 Z" />
                </svg>
            </div>
            <div className="hero-annotations hero-annotations--bio">
                a short note
                <br />
                about the work
                <small>— bio, below</small>
                <svg viewBox="0 0 160 80">
                    <path d="M 150 40 C 110 44, 70 52, 20 58" />
                    <path className="hero-annotations--arrow-head" d="M 20 58 L 32 52 L 30 64 Z" />
                </svg>
            </div>
        </>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/hero-section/hero-annotations/
git commit -m "Add HeroAnnotations component"
```

---

## Task 11: HeroSection (assembly)

**Files:**
- Create: `src/sections/hero-section/hero-section.tsx`
- Create: `src/sections/hero-section/hero-section.scss`

- [ ] **Step 1: Create `src/sections/hero-section/hero-section.scss`**

```scss
@use "@/mixins.scss" as *;

.hero-section {
    --hero-ink: #111111;
    --hero-paper: #fafaf7;
    --hero-muted: #6b6b6b;
    --hero-accent: #ef233c;
    --hero-avail: #1aa34a;
    --hero-grid: rgba(17, 17, 17, 0.07);

    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background-color: var(--hero-paper);
    background-image:
        linear-gradient(to right, var(--hero-grid) 1px, transparent 1px),
        linear-gradient(to bottom, var(--hero-grid) 1px, transparent 1px);
    background-size: calc(100% / 12) 32px, 32px 32px;
}
```

- [ ] **Step 2: Create `src/sections/hero-section/hero-section.tsx`**

```tsx
import CursorHalo from '@/components/cursor-halo/cursor-halo';
import AvailabilityPill from './availability-pill/availability-pill';
import HeroAnnotations from './hero-annotations/hero-annotations';
import HeroFooter from './hero-footer/hero-footer';
import HeroMain from './hero-main/hero-main';
import HeroMeta from './hero-meta/hero-meta';
import Topnav from './topnav/topnav';
import './hero-section.scss';

export default function HeroSection() {
    return (
        <section className="hero-section" data-hero="">
            <CursorHalo />
            <Topnav />
            <AvailabilityPill />
            <HeroMeta />
            <HeroMain />
            <HeroFooter />
            <HeroAnnotations />
        </section>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/hero-section/hero-section.tsx src/sections/hero-section/hero-section.scss
git commit -m "Add HeroSection assembly component"
```

---

## Task 12: Wire up page and remove old navbar

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/navbar/navbar.tsx`
- Delete: `src/components/navbar/navbar.scss`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import HeroSection from '@/sections/hero-section/hero-section';

export default function Home() {
    return <HeroSection />;
}
```

- [ ] **Step 2: Delete old navbar files**

```bash
rm src/components/navbar/navbar.tsx src/components/navbar/navbar.scss
```

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```
Expected: compiled successfully, no type errors

- [ ] **Step 4: Run all tests**

```bash
npm test
```
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git rm src/components/navbar/navbar.tsx src/components/navbar/navbar.scss
git commit -m "Wire HeroSection to page, remove old navbar"
```

---

## Self-Review

**Spec coverage:**
- ✅ Space Mono + Caveat via `next/font/google` — Task 2
- ✅ Hero CSS tokens scoped to `.hero-section` — Tasks 2 + 11
- ✅ `cursor-halo` using `data-hero` attribute — Task 3
- ✅ `music-player` with fake timer + TODO comment — Task 4
- ✅ `topnav` replaces old navbar — Tasks 5 + 12
- ✅ `availability-pill` with blink animation — Task 6
- ✅ `hero-meta` with live IST clock — Task 7
- ✅ `hero-main` with clamp font size — Task 8
- ✅ `hero-footer` with TODO social links — Task 9
- ✅ `hero-annotations` with SVG arrows — Task 10
- ✅ All `'use client'` boundaries correct — MusicPlayer, Topnav, HeroMeta, CursorHalo
- ✅ Old navbar deleted — Task 12
- ✅ Vitest setup — Task 1

**Type consistency:** All component exports are default, all imports use `@/` alias, all SCSS class names are consistent between `.tsx` and `.scss` files (checked `music-player--collapsed`, `music-player--playing`, `hero-annotations--arrow-head`, `hero-meta--clock`).

**Placeholder scan:** No TBDs. Two intentional `// TODO` comments remain — audio wiring in `music-player.tsx`, social URLs in `hero-footer.tsx`. Both are in scope of the spec's "Out of Scope" section.
