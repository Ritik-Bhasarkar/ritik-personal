'use client';

import { useRef, useCallback } from 'react';
import { animate } from 'animejs';
import MusicPlayer from '@/components/music-player/music-player';
import styles from './topnav.module.scss';

function ScrambleLink({ href, label }: { href: string; label: string }) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const animRef = useRef<ReturnType<typeof animate> | null>(null);

    const start = useCallback(() => {
        const chars = label.split('');
        const len = chars.length;
        const state = { progress: 0 };

        animRef.current?.pause();
        animRef.current = animate(state, {
            progress: [0, len],
            duration: len * 60,
            ease: 'linear',
            onUpdate: () => {
                if (!spanRef.current) return;
                const locked = Math.floor(state.progress);
                spanRef.current.textContent = chars
                    .map((ch, i) => (i < locked ? ch : chars[Math.floor(Math.random() * len)]))
                    .join('');
            },
            onComplete: () => {
                if (spanRef.current) spanRef.current.textContent = label;
            },
        });
    }, [label]);

    const stop = useCallback(() => {
        animRef.current?.pause();
        if (spanRef.current) spanRef.current.textContent = label;
    }, [label]);

    return (
        <a href={href} onMouseEnter={start} onMouseLeave={stop}>
            [<span ref={spanRef}>{label}</span>]
        </a>
    );
}

export default function Topnav() {
    return (
        <nav className={styles.topnav}>
            <div className={styles['topnav--brand']}>RITIK©</div>
            <div className={styles['topnav--center']}>
                <MusicPlayer />
            </div>
            <div className={styles['topnav--links']}>
                <ScrambleLink href="#work" label="Work" />
                <ScrambleLink href="#about" label="About" />
                <ScrambleLink href="#contact" label="Contact" />
            </div>
        </nav>
    );
}
