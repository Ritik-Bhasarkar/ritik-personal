'use client';

import { useGrid } from '@/context/grid';
import styles from './grid-toggle.module.scss';

export default function GridToggle() {
    const { gridVisible, toggleGrid } = useGrid();

    return (
        <button
            className={`${styles['grid-toggle']} ${gridVisible ? '' : styles['grid-toggle--off']}`}
            onClick={toggleGrid}
            aria-label={`${gridVisible ? 'Hide' : 'Show'} grid lines`}
            aria-pressed={gridVisible}
        >
            <svg viewBox="0 0 16 16" aria-hidden="true">
                <line x1="1" y1="6" x2="15" y2="6" />
                <line x1="1" y1="10" x2="15" y2="10" />
                <line x1="6" y1="1" x2="6" y2="15" />
                <line x1="10" y1="1" x2="10" y2="15" />
                {!gridVisible && <line x1="2" y1="14" x2="14" y2="2" className={styles['grid-toggle--slash']} />}
            </svg>
        </button>
    );
}
