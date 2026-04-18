'use client';

import { useEffect, useRef } from 'react';
import styles from './cursor-halo.module.scss';

export default function CursorHalo() {
    const haloRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hero = document.querySelector('[data-hero]');
        const halo = haloRef.current;
        if (!hero || !halo) return;

        const onMove = (e: Event) => {
            const me = e as MouseEvent;
            const rect = hero.getBoundingClientRect();
            halo.style.left = `${me.clientX - rect.left}px`;
            halo.style.top = `${me.clientY - rect.top}px`;
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

    return <div ref={haloRef} className={styles['cursor-halo']} />;
}
