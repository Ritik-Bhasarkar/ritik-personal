'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './music-player.module.scss';

// TODO: wire up real audio — swap DURATION + RAF timer for audio.currentTime listeners
const DURATION = 419; // 6:59 placeholder

function fmt(s: number): string {
    const clamped = Math.max(0, Math.floor(s));
    return `${Math.floor(clamped / 60)}:${String(clamped % 60).padStart(2, '0')}`;
}

export default function MusicPlayer() {
    const [collapsed, setCollapsed] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const startedAtRef = useRef(0);
    const rafRef = useRef<number>(0);

    const tick = useCallback(() => {
        const next = (Date.now() - startedAtRef.current) / 1000;
        if (next >= DURATION) {
            startedAtRef.current = Date.now();
            setElapsed(0);
        } else {
            setElapsed(next);
        }
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    const startPlayback = useCallback(() => {
        startedAtRef.current = Date.now() - elapsed * 1000;
        rafRef.current = requestAnimationFrame(tick);
    }, [elapsed, tick]);

    const stopPlayback = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
    }, []);

    useEffect(() => {
        if (playing) {
            startPlayback();
        } else {
            stopPlayback();
        }
        return stopPlayback;
    }, [playing, startPlayback, stopPlayback]);

    const handleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        if (collapsed) {
            setCollapsed(false);
            setPlaying(true);
            return;
        }

        // EQ bars click → collapse
        if (target.closest(`.${styles['music-player--eq']}`)) {
            setCollapsed(true);
            return;
        }

        // Progress bar click → seek
        const progressEl = target.closest(`.${styles['music-player--progress']}`);
        if (progressEl) {
            const rect = (progressEl as HTMLElement).getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const newElapsed = pct * DURATION;
            setElapsed(newElapsed);
            startedAtRef.current = Date.now() - newElapsed * 1000;
            return;
        }

        setPlaying(p => !p);
    };

    const pct = Math.min(100, (elapsed / DURATION) * 100);

    return (
        <div
            className={`${styles['music-player']} ${collapsed ? styles['music-player--collapsed'] : ''} ${playing ? styles['music-player--playing'] : ''}`}
            onClick={handleClick}
        >
            <span className={`${styles['music-player--brk']} ${styles['music-player--brk-tl']}`} />
            <span className={`${styles['music-player--brk']} ${styles['music-player--brk-tr']}`} />
            <span className={`${styles['music-player--brk']} ${styles['music-player--brk-bl']}`} />
            <span className={`${styles['music-player--brk']} ${styles['music-player--brk-br']}`} />

            {/* Clip wrapper: overflow hidden so content is masked during width animation */}
            <div className={styles['music-player--clip']}>
                <div className={styles['music-player--inner']}>
                    <span className={styles['music-player--eq']}>
                        <i /><i /><i /><i /><i />
                    </span>
                    <span className={styles['music-player--label']}>RITIK© RADIO</span>
                    <span className={styles['music-player--play']}>
                        <svg viewBox="0 0 10 10">
                            {playing ? (
                                <path d="M1,0 H4 V10 H1 Z M6,0 H9 V10 H6 Z" />
                            ) : (
                                <polygon points="1,0 9,5 1,10" />
                            )}
                        </svg>
                    </span>
                    <span className={`${styles['music-player--time']} ${styles['music-player--time-now']}`}>
                        {fmt(elapsed)}
                    </span>
                    <span className={styles['music-player--progress']}>
                        <span className={styles['music-player--progress-fill']} style={{ width: `${pct}%` }} />
                        <span className={styles['music-player--progress-knob']} style={{ left: `${pct}%` }} />
                    </span>
                    <span className={styles['music-player--time']}>6:59</span>
                </div>
            </div>

            {collapsed && (
                <span className={styles['music-player--hint']}>click to play ↑</span>
            )}
        </div>
    );
}
