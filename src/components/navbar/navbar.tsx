'use client';

import { useTheme } from '@/context/theme';
import './navbar.scss';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <nav className="navbar">
            <div className="navbar--container">
                <span className="navbar--logo">Ritik</span>
                <label className="navbar--toggle" aria-label="Toggle theme">
                    <input
                        type="checkbox"
                        checked={isDark}
                        onChange={toggleTheme}
                    />
                    <span className={`navbar--toggle--track${isDark ? ' navbar--toggle--track--on' : ''}`}>
                        <span className="navbar--toggle--thumb" />
                    </span>
                    <span className="navbar--toggle--label">
                        {isDark ? 'Dark' : 'Light'}
                    </span>
                </label>
            </div>
        </nav>
    );
}
