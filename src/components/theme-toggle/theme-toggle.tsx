'use client';

import { useTheme } from '@/context/theme';
import styles from './theme-toggle.module.scss';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            className={styles['theme-toggle']}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <svg viewBox="0 0 16 16" aria-hidden="true">
                {isDark ? (
                    // Moon
                    <path d="M14 10.5a6 6 0 0 1-8-8 6 6 0 1 0 8 8z" />
                ) : (
                    // Sun
                    <>
                        <circle cx="8" cy="8" r="3" />
                        <line x1="8" y1="1" x2="8" y2="3" />
                        <line x1="8" y1="13" x2="8" y2="15" />
                        <line x1="1" y1="8" x2="3" y2="8" />
                        <line x1="13" y1="8" x2="15" y2="8" />
                        <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" />
                        <line x1="11.54" y1="11.54" x2="12.95" y2="12.95" />
                        <line x1="12.95" y1="3.05" x2="11.54" y2="4.46" />
                        <line x1="4.46" y1="11.54" x2="3.05" y2="12.95" />
                    </>
                )}
            </svg>
        </button>
    );
}
