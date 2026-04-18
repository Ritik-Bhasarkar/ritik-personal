import styles from './hero-footer.module.scss';

export default function HeroFooter() {
    return (
        <div className={styles['hero-footer']}>
            <div className={styles['hero-footer--scroll']}>
                <span className={styles['hero-footer--scroll-arrow']} />
                Scroll — <b>Selected Work</b>
            </div>
            <div className={styles['hero-footer--socials']}>
                <a href="https://github.com/ritikbhasarkar" target="_blank" rel="noopener noreferrer"><span>GitHub</span> ↗</a>
                <a href="https://read.cv/ritikbhasarkar" target="_blank" rel="noopener noreferrer"><span>Read.cv</span> ↗</a>
                <a href="https://twitter.com/ritikbhasarkar" target="_blank" rel="noopener noreferrer"><span>Twitter</span> ↗</a>
                <a href="mailto:ritik@example.com"><span>Email</span> ↗</a>
            </div>
        </div>
    );
}
