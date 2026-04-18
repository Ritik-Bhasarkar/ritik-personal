'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import styles from './hero-annotations.module.scss';

const MUSIC_WORDS = ['tap', 'to', 'play', 'the', 'station'];
const BIO_LINE1 = ['a', 'short', 'note'];
const BIO_LINE2 = ['about', 'the', 'work'];

const BASE = 300;
const STEP = 100;

export default function HeroAnnotations() {
    const musicRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wordClass = `.${styles['hero-annotations--word']}`;
        const pathClass = `.${styles['hero-annotations--path']}`;
        const headClass = `.${styles['hero-annotations--arrow-head']}`;

        const run = (container: HTMLDivElement, wordCount: number) => {
            const words = container.querySelectorAll(wordClass);
            const small = container.querySelector('small');
            const path = container.querySelector(pathClass);
            const head = container.querySelector(headClass);
            const wordsEnd = BASE + wordCount * STEP;

            animate(words, {
                opacity: [0, 1],
                delay: stagger(STEP, { start: BASE }),
                duration: 250,
                ease: 'outQuad',
            });
            animate(small, {
                opacity: [0, 0.75],
                delay: wordsEnd + 100,
                duration: 300,
                ease: 'outQuad',
            });
            animate(path, {
                strokeDashoffset: [1, 0],
                delay: wordsEnd + 300,
                duration: 650,
                ease: 'outCubic',
            });
            animate(head, {
                opacity: [0, 1],
                delay: wordsEnd + 950,
                duration: 200,
                ease: 'outQuad',
            });
        };

        if (musicRef.current) run(musicRef.current, MUSIC_WORDS.length);
        if (bioRef.current) run(bioRef.current, BIO_LINE1.length + BIO_LINE2.length);
    }, []);

    return (
        <>
            <div
                ref={musicRef}
                className={`${styles['hero-annotations--note']} ${styles['hero-annotations--note-music']}`}
            >
                {MUSIC_WORDS.map((w, i) => (
                    <span key={i} className={styles['hero-annotations--word']}>{w} </span>
                ))}
                <small>— RITIK© RADIO</small>
                <svg viewBox="0 0 120 60">
                    <path
                        className={styles['hero-annotations--path']}
                        d="M 10 55 C 20 30, 60 10, 110 6"
                        pathLength="1"
                    />
                    <path
                        className={styles['hero-annotations--arrow-head']}
                        d="M 110 6 L 100 2 L 104 12 Z"
                    />
                </svg>
            </div>

            <div
                ref={bioRef}
                className={`${styles['hero-annotations--note']} ${styles['hero-annotations--note-bio']}`}
            >
                {BIO_LINE1.map((w, i) => (
                    <span key={i} className={styles['hero-annotations--word']}>{w} </span>
                ))}
                <br />
                {BIO_LINE2.map((w, i) => (
                    <span key={i + BIO_LINE1.length} className={styles['hero-annotations--word']}>{w} </span>
                ))}
                <small>— bio, below</small>
                <svg viewBox="0 0 160 80">
                    <path
                        className={styles['hero-annotations--path']}
                        d="M 150 40 C 110 44, 70 52, 20 58"
                        pathLength="1"
                    />
                    <path
                        className={styles['hero-annotations--arrow-head']}
                        d="M 20 58 L 32 52 L 30 64 Z"
                    />
                </svg>
            </div>
        </>
    );
}
