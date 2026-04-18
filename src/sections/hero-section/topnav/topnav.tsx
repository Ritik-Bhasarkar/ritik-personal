'use client';

import MusicPlayer from '@/components/music-player/music-player';
import styles from './topnav.module.scss';

export default function Topnav() {
    return (
        <nav className={styles.topnav}>
            <div className={styles['topnav--brand']}>RITIK©</div>
            <div className={styles['topnav--center']}>
                <MusicPlayer />
            </div>
            <div className={styles['topnav--links']}>
                <a href="#work">Work</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );
}
