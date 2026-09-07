import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
    return (
        <main className={styles.page}>
            <nav className={styles.nav} aria-label="Primary navigation">
                <span className={styles.brand}>RITIK©</span>
                <span className={styles.status}>ERROR / 404</span>
            </nav>

            <section className={styles.content}>
                <p className={styles.kicker}>[ page not found ]</p>
                <h1 className={styles.title}>Lost in the pixels<span>?</span></h1>
                <p className={styles.description}>
                    The page you’re looking for wandered off somewhere else.
                </p>
                <Link className={styles.homeLink} href="/">
                    <span>←</span> Back to home
                </Link>
            </section>

            <p className={styles.coordinates}>404° 00&apos; 00&quot; N / 404° 00&apos; 00&quot; E</p>
        </main>
    );
}
