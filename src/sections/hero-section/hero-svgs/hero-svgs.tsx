'use client';

import { useEffect, useRef, useState } from 'react';
import { heroSvgs } from '@/lib/assets/hero-svgs';
import { DEFAULT_ASSET_MODE, type AssetMode } from '@/lib/assets/floating-assets';
import styles from './hero-svgs.module.scss';

// Flip to false (or delete the button block) once positions are captured.
const SHOW_CAPTURE_BUTTON = true;

interface Point {
    x: number;
    y: number;
}

const round1 = (n: number): number => Math.round(n * 10) / 10;

const isMode = (v: string | null): v is AssetMode =>
    v === 'chaos' || v === 'cleaned' || v === 'notebook';

interface HeroSvgsProps {
    hideIds?: string[];
}

export default function HeroSvgs({ hideIds = [] }: HeroSvgsProps) {
    const items = heroSvgs.filter(svg => !hideIds.includes(svg.id));

    const [mode, setMode] = useState<AssetMode>(DEFAULT_ASSET_MODE);
    const [overrides, setOverrides] = useState<
        Partial<Record<AssetMode, Record<string, Point>>>
    >({});
    const [draggingId, setDraggingId] = useState<string | null>(null);

    const stageRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef<{
        id: string;
        pointerId: number;
        startX: number;
        startY: number;
        originX: number;
        originY: number;
    } | null>(null);

    // Follow the active mode published on the parent element's data-mode.
    useEffect(() => {
        const parent = stageRef.current?.parentElement;
        if (!parent) return;
        const read = () => {
            const m = parent.getAttribute('data-mode');
            if (isMode(m)) setMode(m);
        };
        read();
        const observer = new MutationObserver(read);
        observer.observe(parent, { attributes: true, attributeFilter: ['data-mode'] });
        return () => observer.disconnect();
    }, []);

    const startDrag = (
        e: React.PointerEvent<HTMLImageElement>,
        id: string,
        originX: number,
        originY: number,
    ) => {
        dragRef.current = {
            id,
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            originX,
            originY,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
        setDraggingId(id);
    };

    const onDrag = (e: React.PointerEvent<HTMLImageElement>) => {
        const d = dragRef.current;
        const rect = stageRef.current?.getBoundingClientRect();
        if (!d || d.pointerId !== e.pointerId || !rect) return;
        const nx = round1(d.originX + ((e.clientX - d.startX) / rect.width) * 100);
        const ny = round1(d.originY + ((e.clientY - d.startY) / rect.height) * 100);
        setOverrides(prev => ({
            ...prev,
            [mode]: { ...prev[mode], [d.id]: { x: nx, y: ny } },
        }));
    };

    const endDrag = (e: React.PointerEvent<HTMLImageElement>) => {
        const d = dragRef.current;
        if (!d || d.pointerId !== e.pointerId) return;
        dragRef.current = null;
        setDraggingId(null);
    };

    const capturePositions = () => {
        const snippet = items
            .map(svg => {
                const base = svg.positions[mode];
                const o = overrides[mode]?.[svg.id];
                const x = round1(o?.x ?? base.x);
                const y = round1(o?.y ?? base.y);
                return `  // ${svg.id}\n      ${mode}: { x: ${x}, y: ${y} },`;
            })
            .join('\n');
        console.log(`/* hero svg ${mode} positions */\n${snippet}`);
        void navigator.clipboard?.writeText(snippet).catch(() => {});
    };

    return (
        <div className={styles['hero-svgs']} data-mode={mode} ref={stageRef}>
            {items.map(svg => {
                const base = svg.positions[mode];
                const o = overrides[mode]?.[svg.id];
                const x = o?.x ?? base.x;
                const y = o?.y ?? base.y;
                return (
                    <img
                        key={svg.id}
                        className={styles['hero-svgs--item']}
                        src={svg.src}
                        alt={svg.label}
                        draggable={false}
                        onPointerDown={e => startDrag(e, svg.id, x, y)}
                        onPointerMove={onDrag}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${svg.width}px`,
                            transform: `translate(-50%, -50%) rotate(${base.rotation ?? 0}deg)`,
                            transition: draggingId === svg.id ? 'none' : undefined,
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
