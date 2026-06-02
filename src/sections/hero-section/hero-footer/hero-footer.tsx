import links from '../../../../public/links.json';
import styles from './hero-footer.module.scss';

export default function HeroFooter() {
    return (
        <div className={styles['hero-footer']}>
            <div className={styles['hero-footer--scroll']}>
                <span className={styles['hero-footer--scroll-arrow']} />
                Scroll — <b>Selected Work</b>
            </div>
            <div className={styles['hero-footer--socials']}>
                <a href={links.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span> ↗</a>
                <a href={links.resume} target="_blank" rel="noopener noreferrer"><span>Resume</span> ↗</a>
                <a href={links.x} target="_blank" rel="noopener noreferrer"><span>Twitter</span> ↗</a>
                <a href={links.email}><span>Email</span> ↗</a>
            </div>
        </div>
    );
}
