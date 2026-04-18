import styles from './hero-main.module.scss';

export default function HeroMain() {
    return (
        <div className={styles['hero-main']}>
            <h1 className={styles['hero-main--name']}>
                Ritik
                <br />
                Bhasarkar<em>.</em>
            </h1>
            <p className={styles['hero-main--bio']}>
                Frontend developer building quiet, considered interfaces — component
                systems, motion, and the small details that make software feel physical.
                Currently booking new projects.
            </p>
        </div>
    );
}
