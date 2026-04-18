import styles from './hero-footer.module.scss';

export default function HeroFooter() {
    return (
        <div className={styles['hero-footer']}>
            <div className={styles['hero-footer--scroll']}>
                <span className={styles['hero-footer--scroll-arrow']} />
                Scroll — <b>Selected Work</b>
            </div>
            <div className={styles['hero-footer--socials']}>
                <a href="https://github.com/ritikbhasarkar" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href="https://read.cv/ritikbhasarkar" target="_blank" rel="noopener noreferrer">Read.cv ↗</a>
                <a href="https://twitter.com/ritikbhasarkar" target="_blank" rel="noopener noreferrer">Twitter ↗</a>
                <a href="mailto:ritik@example.com">Email ↗</a>
            </div>
        </div>
    );
}
