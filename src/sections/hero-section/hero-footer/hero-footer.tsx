'use client';

import { scrollToSection } from '@/lib/lenis';
import links from '../../../../public/links.json';
import styles from './hero-footer.module.scss';

export default function HeroFooter() {
    return (
        <div className={styles['hero-footer']}>
            <button
                type="button"
                className={styles['hero-footer--scroll']}
                onClick={() => scrollToSection('#work-v2')}
            >
                <span className={styles['hero-footer--scroll-arrow']} />
                Scroll — <b>Selected Work</b>
            </button>
            <div className={styles['hero-footer--socials']}>
                <a href={links.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span> ↗</a>
                <a href={links.resume} target="_blank" rel="noopener noreferrer"><span>Resume</span> ↗</a>
                <a href={links.x} target="_blank" rel="noopener noreferrer"><span>Twitter</span> ↗</a>
                <a href={links.email}><span>Email</span> ↗</a>
            </div>
        </div>
    );
}
