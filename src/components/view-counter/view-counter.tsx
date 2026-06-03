'use client';

import { useEffect, useState } from 'react';
import styles from './view-counter.module.scss';

export default function ViewCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const load = async (): Promise<void> => {
            try {
                const res = await fetch('/api/views', { method: 'POST', signal: controller.signal });
                const data: { count: number | null } = await res.json();
                if (typeof data.count === 'number') setCount(data.count);
            } catch {
                // non-critical — leave the counter hidden on failure
            }
        };
        void load();
        return () => controller.abort();
    }, []);

    if (count === null) return null;

    return (
        <span className={styles['view-counter']} aria-label={`${count} unique visitors`}>
            <span className={styles['view-counter--dot']} aria-hidden="true" />
            {count.toLocaleString()} visitors
        </span>
    );
}
