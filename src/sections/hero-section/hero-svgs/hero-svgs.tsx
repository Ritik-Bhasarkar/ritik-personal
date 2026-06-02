'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { heroSvgs, type HeroSvg } from '@/lib/assets/hero-svgs';
import styles from './hero-svgs.module.scss';

interface Pt {
    x: number;
    y: number;
}

type EditKey = 'hero' | 'statement' | 'about';

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));
const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));
const lerpPt = (a: Pt, b: Pt, t: number): Pt => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
});
const cloneSvgs = (): HeroSvg[] =>
    heroSvgs.map(s => ({ ...s, hero: { ...s.hero }, statement: { ...s.statement }, about: { ...s.about } }));

interface HeroSvgsProps {
    // 'travel' = full hero -> statement -> work-dock -> about journey (home).
    // 'about' = static at the about layout (standalone /about route).
    variant?: 'travel' | 'about';
}

const isDev = process.env.NODE_ENV === 'development';

// section keyframe nearest the viewport center — captured once when the editor turns on,
// then locked so dragged logos don't jump as you scroll.
const detectSectionKey = (isAbout: boolean): EditKey => {
    if (isAbout) return 'about';
    const docCenter = (el: Element | null): number | null => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
    };
    const viewCenter = window.scrollY + window.innerHeight / 2;
    const cands: [EditKey, number | null][] = [
        ['hero', docCenter(document.querySelector('[data-hero]'))],
        ['statement', docCenter(document.getElementById('statement'))],
        ['about', docCenter(document.querySelector('.about'))],
    ];
    let best: EditKey = 'hero';
    let bestDist = Infinity;
    for (const [key, center] of cands) {
        if (center == null) continue;
        const dist = Math.abs(center - viewCenter);
        if (dist < bestDist) {
            bestDist = dist;
            best = key;
        }
    }
    return best;
};

export default function HeroSvgs({ variant = 'travel' }: HeroSvgsProps) {
    const isAbout = variant === 'about';
    const itemsRef = useRef<(HTMLImageElement | null)[]>([]);
    const curRef = useRef<Pt[]>([]);
    const opRef = useRef<number[]>([]);
    const dataRef = useRef<HeroSvg[]>(cloneSvgs());
    const editRef = useRef(false);
    const keyRef = useRef<EditKey>(isAbout ? 'about' : 'hero');
    const dragRef = useRef<{ i: number; offX: number; offY: number } | null>(null);

    const [edit, setEdit] = useState(false);
    const [editKey, setEditKey] = useState<EditKey>(isAbout ? 'about' : 'hero');
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    useEffect(() => {
        editRef.current = edit;
    }, [edit]);

    const toggleEdit = (): void => {
        const next = !edit;
        if (next) {
            // lock the keyframe to whatever section is in view when editing starts
            const key = detectSectionKey(isAbout);
            keyRef.current = key;
            setEditKey(key);
        }
        setEdit(next);
    };

    useEffect(() => {
        // mobile: drop the travelling logos and skip the scroll-driven positioning
        if (!isAbout && window.matchMedia('(max-width: 480px)').matches) return;

        const pct = (p: Pt): Pt => ({
            x: (p.x / 100) * window.innerWidth,
            y: (p.y / 100) * window.innerHeight,
        });

        curRef.current = heroSvgs.map(svg => pct(isAbout ? svg.about : svg.hero));
        opRef.current = heroSvgs.map(() => 1);

        const docTop = (el: Element | null): number | null =>
            el ? el.getBoundingClientRect().top + window.scrollY : null;

        let raf = 0;
        const frame = () => {
            if (editRef.current) {
                // locked keyframe — positions stay put regardless of scroll
                const key = keyRef.current;
                heroSvgs.forEach((_, i) => {
                    const el = itemsRef.current[i];
                    if (!el || dragRef.current?.i === i) return;
                    const p = pct(dataRef.current[i][key]);
                    const cur = curRef.current[i];
                    cur.x += (p.x - cur.x) * 0.3;
                    cur.y += (p.y - cur.y) * 0.3;
                    el.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`;
                    el.style.opacity = '1';
                    el.style.pointerEvents = 'auto';
                    opRef.current[i] = 1;
                });
                raf = requestAnimationFrame(frame);
                return;
            }

            const sY = window.scrollY;
            const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-dock]'));
            const sT = docTop(document.getElementById('statement'));
            const wT = docTop(document.getElementById('work') ?? document.getElementById('work-v2'));
            const aT = docTop(document.querySelector('.about'));

            heroSvgs.forEach((_, i) => {
                const el = itemsRef.current[i];
                // a logo being dragged is owned by the pointer; the journey reclaims it on release
                if (!el || dragRef.current?.i === i) return;

                const data = dataRef.current[i];
                const heroPx = pct(data.hero);
                const stmtPx = pct(data.statement);
                const aboutPx = pct(data.about);

                let target: Pt;
                let releaseT = 0;
                let targetOp = 1;

                if (isAbout || sT == null || wT == null || aT == null) {
                    target = isAbout ? aboutPx : heroPx;
                } else {
                    // dock point: 2 logos per card, clustered at the card's top-right
                    let dockPx = aboutPx;
                    if (cards.length) {
                        const r = cards[i % cards.length].getBoundingClientRect();
                        const slot = Math.floor(i / cards.length);
                        dockPx = { x: r.right - 30 - slot * 36, y: r.top + 30 };
                    }

                    if (sY < sT) {
                        target = lerpPt(heroPx, stmtPx, clamp01(sY / (sT || 1)));
                    } else if (sY < wT) {
                        // approaching the work section: fade the logos out
                        const p = clamp01((sY - sT) / ((wT - sT) || 1));
                        target = lerpPt(stmtPx, dockPx, p);
                        targetOp = 1 - p;
                    } else {
                        const holdEnd = wT + (aT - wT) * 0.85;
                        if (sY < holdEnd) {
                            target = dockPx; // stay hidden while the work section is in view
                            targetOp = 0;
                        } else {
                            releaseT = clamp01((sY - holdEnd) / ((aT - holdEnd) || 1));
                            target = lerpPt(dockPx, aboutPx, releaseT);
                            // only the about-bound logos fade back in past the work section
                            targetOp = data.showOnAbout ? releaseT : 0;
                        }
                    }
                }

                const cur = curRef.current[i];
                cur.x += (target.x - cur.x) * 0.16;
                cur.y += (target.y - cur.y) * 0.16;

                const op = opRef.current[i] + (targetOp - opRef.current[i]) * 0.16;
                opRef.current[i] = op;

                el.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%)`;
                el.style.opacity = `${op}`;
                // invisible logos (e.g. over the work section) must not eat clicks
                el.style.pointerEvents = op > 0.05 ? 'auto' : 'none';
            });

            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
    }, [isAbout]);

    const save = async (): Promise<void> => {
        setStatus('saving');
        try {
            const res = await fetch('/api/svg-positions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataRef.current),
            });
            setStatus(res.ok ? 'saved' : 'error');
        } catch {
            setStatus('error');
        }
    };

    const onPointerDown = (i: number) => (e: ReactPointerEvent<HTMLImageElement>) => {
        const el = itemsRef.current[i];
        if (!el) return;
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        const cur = curRef.current[i] ?? { x: e.clientX, y: e.clientY };
        dragRef.current = { i, offX: e.clientX - cur.x, offY: e.clientY - cur.y };
    };

    const onPointerMove = (i: number) => (e: ReactPointerEvent<HTMLImageElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.i !== i) return;
        const el = itemsRef.current[i];
        if (!el) return;
        const x = clamp(e.clientX - drag.offX, 0, window.innerWidth);
        const y = clamp(e.clientY - drag.offY, 0, window.innerHeight);
        curRef.current[i] = { x, y };
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    const onPointerUp = (i: number) => (e: ReactPointerEvent<HTMLImageElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.i !== i) return;
        dragRef.current = null;
        const el = itemsRef.current[i];
        el?.releasePointerCapture(e.pointerId);
        // play mode: clearing the drag lets the scroll journey ease the logo back in.
        // authoring mode: persist the new position for the locked section and save.
        if (editRef.current) {
            const cur = curRef.current[i];
            dataRef.current[i][keyRef.current] = {
                x: (cur.x / window.innerWidth) * 100,
                y: (cur.y / window.innerHeight) * 100,
            };
            void save();
        }
    };

    return (
        <>
            <div
                className={`${styles['hero-svgs']} ${!isAbout ? styles['hero-svgs--travel'] : ''} ${edit ? styles['hero-svgs--editing'] : ''}`}
            >
                {heroSvgs.map((svg, i) => (
                    <img
                        key={svg.id}
                        ref={el => {
                            itemsRef.current[i] = el;
                        }}
                        className={styles['hero-svgs--item']}
                        src={svg.src}
                        alt={svg.label}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        style={{ width: `${svg.width}px`, opacity: 0 }}
                        onPointerDown={onPointerDown(i)}
                        onPointerMove={onPointerMove(i)}
                        onPointerUp={onPointerUp(i)}
                        onPointerCancel={onPointerUp(i)}
                    />
                ))}
            </div>

            {isDev && (
                <div className={styles['hero-svgs--controls']}>
                    <button
                        type="button"
                        className={styles['hero-svgs--controls--btn']}
                        onClick={toggleEdit}
                        aria-pressed={edit}
                    >
                        {edit ? '● Positioning' : '○ Position'}
                    </button>
                    {edit && (
                        <span className={styles['hero-svgs--controls--hint']}>
                            drag logos · editing <b>{editKey}</b>
                            {status === 'saving' && ' · saving…'}
                            {status === 'saved' && ' · saved'}
                            {status === 'error' && ' · save failed'}
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
