'use client';

import { useEffect, useRef, useState } from 'react';
import { heroSvgs } from '@/lib/assets/hero-svgs';
import { playSound } from '@/lib/sound';
import styles from './hero-svgs.module.scss';

// Flip to false (or delete the button block) once positions are captured.
const SHOW_CAPTURE_BUTTON = true;

const SOUNDS = '/floating-assets/sound-effects';
const HOVER_SOUND = `${SOUNDS}/mouse-click.mp3`;
const DRAG_SOUND = `${SOUNDS}/AirDrop.wav`;

type Endpoint = 'hero' | 'about';

interface Point {
    x: number;
    y: number;
}

const round1 = (n: number): number => Math.round(n * 10) / 10;
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

interface HeroSvgsProps {
    // 'travel' = scroll-driven hero -> about (home). 'about' = static at the about layout.
    variant?: 'travel' | 'about';
}

export default function HeroSvgs({ variant = 'travel' }: HeroSvgsProps) {
    const isAbout = variant === 'about';
    const interactive = SHOW_CAPTURE_BUTTON;

    const [progress, setProgress] = useState(isAbout ? 1 : 0);
    // Layer fades out while the Statement section covers the viewport (so icons
    // never sit over the statement text), full opacity on hero / about.
    const [layerOpacity, setLayerOpacity] = useState(1);
    const [overrides, setOverrides] = useState<Record<Endpoint, Record<string, Point>>>({
        hero: {},
        about: {},
    });

    const stageRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef<{
        id: string;
        key: Endpoint;
        pointerId: number;
        startX: number;
        startY: number;
        originX: number;
        originY: number;
    } | null>(null);

    // Scroll-driven progress: 0 at hero top, 1 when the About section reaches the
    // top of the viewport — so icons travel wherever About sits in the order.
    useEffect(() => {
        if (isAbout) return;
        let raf = 0;
        const getAboutTop = () => {
            const el = document.querySelector('.about');
            if (!el) return window.innerHeight || 1;
            return el.getBoundingClientRect().top + window.scrollY || 1;
        };
        let aboutTop = getAboutTop();
        const update = () => {
            setProgress(Math.min(1, Math.max(0, window.scrollY / aboutTop)));
            const stmt = document.getElementById('statement');
            const vh = window.innerHeight || 1;
            let fade = 1;
            if (stmt) {
                const r = stmt.getBoundingClientRect();
                const overlap = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
                fade = 1 - Math.min(1, overlap / vh);
            }
            setLayerOpacity(fade);
        };
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };
        const onResize = () => {
            aboutTop = getAboutTop();
            update();
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(raf);
        };
    }, [isAbout]);

    const startDrag = (
        e: React.PointerEvent<HTMLImageElement>,
        id: string,
        heroPos: Point,
        aboutPos: Point,
    ) => {
        const key: Endpoint = progress < 0.5 ? 'hero' : 'about';
        const origin = key === 'hero' ? heroPos : aboutPos;
        dragRef.current = {
            id,
            key,
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            originX: origin.x,
            originY: origin.y,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
        playSound(DRAG_SOUND, 0.4);
    };

    const onDrag = (e: React.PointerEvent<HTMLImageElement>) => {
        const d = dragRef.current;
        const rect = stageRef.current?.getBoundingClientRect();
        if (!d || d.pointerId !== e.pointerId || !rect) return;
        const nx = round1(d.originX + ((e.clientX - d.startX) / rect.width) * 100);
        const ny = round1(d.originY + ((e.clientY - d.startY) / rect.height) * 100);
        setOverrides(prev => ({
            ...prev,
            [d.key]: { ...prev[d.key], [d.id]: { x: nx, y: ny } },
        }));
    };

    const endDrag = (e: React.PointerEvent<HTMLImageElement>) => {
        const d = dragRef.current;
        if (!d || d.pointerId !== e.pointerId) return;
        dragRef.current = null;
    };

    const capturePositions = () => {
        const block = (key: Endpoint) =>
            heroSvgs
                .map(svg => {
                    const o = overrides[key][svg.id];
                    const x = round1(o?.x ?? svg[key].x);
                    const y = round1(o?.y ?? svg[key].y);
                    return `  // ${svg.id}\n    ${key}: { x: ${x}, y: ${y} },`;
                })
                .join('\n');
        const out = `/* hero positions */\n${block('hero')}\n\n/* about positions */\n${block('about')}`;
        console.log(out);
        void navigator.clipboard?.writeText(out).catch(() => {});
    };

    return (
        <div className={styles['hero-svgs']} ref={stageRef}>
            {heroSvgs.map(svg => {
                const heroPos = overrides.hero[svg.id] ?? svg.hero;
                const aboutPos = overrides.about[svg.id] ?? svg.about;
                const x = lerp(heroPos.x, aboutPos.x, progress);
                const y = lerp(heroPos.y, aboutPos.y, progress);
                const opacity = (svg.showOnAbout ? 1 : 1 - progress) * layerOpacity;
                return (
                    <img
                        key={svg.id}
                        className={styles['hero-svgs--item']}
                        src={svg.src}
                        alt={svg.label}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        onMouseEnter={() => playSound(HOVER_SOUND, 0.35)}
                        onPointerDown={
                            interactive ? e => startDrag(e, svg.id, heroPos, aboutPos) : undefined
                        }
                        onPointerMove={interactive ? onDrag : undefined}
                        onPointerUp={interactive ? endDrag : undefined}
                        onPointerCancel={interactive ? endDrag : undefined}
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${svg.width}px`,
                            opacity,
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'auto',
                        }}
                    />
                );
            })}

            {SHOW_CAPTURE_BUTTON && (
                <button
                    type="button"
                    className={styles['hero-svgs--capture']}
                    onClick={capturePositions}
                >
                    Copy SVG positions
                </button>
            )}
        </div>
    );
}
