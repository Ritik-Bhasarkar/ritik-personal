'use client';

import styles from './project-carousel.module.scss';

interface ProjectCarouselProps {
    images: string[];
    figPrefix?: string;
    duration?: number;
    playing?: boolean;
    reverse?: boolean;
}

export default function ProjectCarousel({
    images,
    figPrefix = 'FIG',
    duration = 28,
    playing = false,
    reverse = false,
}: ProjectCarouselProps) {
    if (images.length === 0) return null;

    // Build a base set wide enough to overflow the viewport, then duplicate it
    // once so the -50% marquee translate loops seamlessly on every screen size.
    const repeat = Math.max(2, Math.ceil(8 / images.length));
    const base = Array.from({ length: repeat }, () => images).flat();
    const slides = [...base, ...base];

    const trackClass = `${styles['project-carousel--track']} ${
        reverse ? styles['project-carousel--track--reverse'] : ''
    }`;

    return (
        <div
            className={`${styles['project-carousel']} ${playing ? styles['project-carousel--playing'] : ''}`}
            style={{ '--carousel-dur': `${duration}s` } as React.CSSProperties}
        >
            <div className={trackClass}>
                {slides.map((src, index) => (
                    <figure className={styles['project-carousel--shot']} key={`${src}-${index}`}>
                        <figcaption className={styles['project-carousel--shot--tag']}>
                            {figPrefix}.{String((index % images.length) + 1).padStart(2, '0')}
                        </figcaption>
                        <img
                            className={styles['project-carousel--shot--img']}
                            src={src}
                            alt=""
                            loading="lazy"
                            decoding="async"
                        />
                    </figure>
                ))}
            </div>
        </div>
    );
}
