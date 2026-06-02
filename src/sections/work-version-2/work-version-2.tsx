'use client';

import { useEffect, useRef, useState } from 'react';
import projectsData from '../../../public/projects.json';
import styles from './work-version-2.module.scss';

interface ProjectContent {
    id: string;
    title: string;
    description: string;
    status?: string;
    link?: string;
    images?: string[];
}

interface Project {
    no: string;
    title: string;
    desc: string;
    link: string;
    images: string[];
    inProgress: boolean;
    accent: string;
}

const ACCENTS = ['#242424', '#e6609b', '#2f93ff', '#d9a46a'];

const CONTENT: ProjectContent[] = projectsData.projects;

const PROJECTS: Project[] = CONTENT.map((project, index) => ({
    no: String(index + 1).padStart(2, '0'),
    title: project.title,
    desc: project.description,
    link: project.link ?? '',
    images: (project.images ?? []).slice(0, 2),
    inProgress: (project.status ?? '').toLowerCase() === 'in progress',
    accent: ACCENTS[index % ACCENTS.length],
}));

export default function WorkVersion2() {
    const [active, setActive] = useState<number | null>(null);
    const [shown, setShown] = useState(0);

    const targetRef = useRef({ x: 0, y: 0 });
    const curRef = useRef({ x: 0, y: 0 });
    const floatRef = useRef<HTMLDivElement>(null);

    const open = (index: number): void => {
        // keep `shown` so the preview fades out with the last project's content intact
        setShown(index);
        setActive(index);
    };

    useEffect(() => {
        targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        curRef.current = { ...targetRef.current };

        let raf = 0;
        const frame = () => {
            const cur = curRef.current;
            const t = targetRef.current;
            const dx = t.x - cur.x;
            const dy = t.y - cur.y;
            cur.x += dx * 0.14;
            cur.y += dy * 0.14;
            const rot = Math.max(-14, Math.min(14, dx * 0.35));
            if (floatRef.current) {
                floatRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%, -50%) rotate(${rot}deg)`;
            }
            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
    }, []);

    const activeProject = PROJECTS[shown];

    return (
        <section
            className={styles['work-version-2']}
            id="work-v2"
            onMouseMove={e => {
                targetRef.current = { x: e.clientX, y: e.clientY };
            }}
            onMouseLeave={() => setActive(null)}
        >
            <div className={styles['work-version-2--inner']}>
                <header className={styles['work-version-2--head']}>
                    <span className={styles['work-version-2--head--label']}>Index</span>
                    <span className={styles['work-version-2--head--count']}>
                        {String(PROJECTS.length).padStart(2, '0')} Projects
                    </span>
                </header>

                <ul className={styles['work-version-2--list']}>
                    {PROJECTS.map((project, index) => {
                        const isActive = index === active;

                        return (
                            <li
                                key={project.no}
                                className={`${styles['work-version-2--row']} ${isActive ? styles['work-version-2--row--active'] : ''} ${
                                    active !== null && !isActive ? styles['work-version-2--row--dim'] : ''
                                }`}
                                style={{ '--accent': project.accent } as React.CSSProperties}
                                onMouseEnter={() => open(index)}
                                onFocus={() => open(index)}
                                onBlur={() => setActive(null)}
                            >
                                {project.link && (
                                    <a
                                        className={styles['work-version-2--row--link']}
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open ${project.title} in a new tab`}
                                    />
                                )}
                                <span className={styles['work-version-2--row--no']}>{project.no}</span>
                                <span className={styles['work-version-2--row--title']}>
                                    {project.title}
                                    {project.inProgress && (
                                        <span className={styles['work-version-2--row--pill']}>
                                            <span
                                                className={styles['work-version-2--row--pill--dot']}
                                                aria-hidden="true"
                                            />
                                            In Progress
                                        </span>
                                    )}
                                </span>
                                <span className={styles['work-version-2--row--desc']}>{project.desc}</span>
                                <span className={styles['work-version-2--row--arrow']} aria-hidden="true">
                                    ↗
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div
                ref={floatRef}
                className={`${styles['work-version-2--float']} ${active !== null ? styles['work-version-2--float--on'] : ''}`}
                style={{ '--accent': activeProject.accent } as React.CSSProperties}
                aria-hidden="true"
            >
                {activeProject.images.length > 0 ? (
                    activeProject.images.map((src, index) => (
                        <img
                            key={src}
                            className={styles['work-version-2--float--card']}
                            style={{ '--i': index } as React.CSSProperties}
                            src={src}
                            alt=""
                            decoding="async"
                        />
                    ))
                ) : (
                    <span className={styles['work-version-2--float--placeholder']}>{activeProject.title}</span>
                )}
            </div>
        </section>
    );
}
