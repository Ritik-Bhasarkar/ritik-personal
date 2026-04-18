import styles from './hero-annotations.module.scss';

export default function HeroAnnotations() {
    return (
        <>
            <div className={`${styles['hero-annotations--note']} ${styles['hero-annotations--note-music']}`}>
                tap to play the station
                <small>— RITIK© RADIO</small>
                <svg viewBox="0 0 120 60">
                    <path d="M 10 55 C 20 30, 60 10, 110 6" />
                    <path className={styles['hero-annotations--arrow-head']} d="M 110 6 L 100 2 L 104 12 Z" />
                </svg>
            </div>

            <div className={`${styles['hero-annotations--note']} ${styles['hero-annotations--note-bio']}`}>
                a short note
                <br />
                about the work
                <small>— bio, below</small>
                <svg viewBox="0 0 160 80">
                    <path d="M 150 40 C 110 44, 70 52, 20 58" />
                    <path className={styles['hero-annotations--arrow-head']} d="M 20 58 L 32 52 L 30 64 Z" />
                </svg>
            </div>
        </>
    );
}
