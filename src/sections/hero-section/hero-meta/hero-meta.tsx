'use client';

import { useEffect, useState } from 'react';
import GridToggle from '@/components/grid-toggle/grid-toggle';
import styles from './hero-meta.module.scss';

function getIST(): string {
    return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date());
}

export default function HeroMeta() {
    const [clock, setClock] = useState(getIST());

    useEffect(() => {
        const id = setInterval(() => setClock(getIST()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={styles['hero-meta']}>
            <div className={styles['hero-meta--row']}>
                <span>
                    Frontend Developer
                    <br />
                    Pune, IN · IST <b className={styles['hero-meta--clock']}>{clock}</b>
                </span>
                <GridToggle />
            </div>
        </div>
    );
}
