'use client';

import { useState } from 'react';
import ProjectCarousel from '@/components/project-carousel/project-carousel';
import projectsData from '../../../public/projects.json';
import styles from './projects.module.scss';

interface ProjectContent {
    id: string;
    title: string;
    description: string;
    status?: string;
    category?: string;
    year?: string;
    tech?: string[];
    link?: string;
    images?: string[];
}

interface Project {
    no: string;
    id: string;
    title: string;
    category: string;
    year: string;
    desc: string;
    tech: string[];
    link: string;
    images: string[];
}

const CONTENT: ProjectContent[] = projectsData.projects;

const PROJECTS: Project[] = CONTENT.map((project, index) => ({
    no: String(index + 1).padStart(2, '0'),
    id: project.id,
    title: project.title,
    category: project.category ?? 'Project',
    year: project.year ?? '',
    desc: project.description,
    tech: project.tech ?? [],
    link: project.link ?? '',
    images: project.images ?? [],
}));

export default function Projects() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [opened, setOpened] = useState<number | null>(null);

    return (
        <section className={styles.projects} id="projects">
            <div className={styles['projects--inner']}>
                <header className={styles['projects--head']}>
                    <p className={styles['projects--eyebrow']}>
                        <span className={styles['projects--eyebrow--dot']} aria-hidden="true" />
                        2024 — 2026, Frontend dev (2 yr exp)
                    </p>
                    <h2 className={styles['projects--title']}>
                        Selected work<em>.</em>
                    </h2>
                    <div className={styles['projects--sub']} />
                </header>

                <div className={styles['projects--list']}>
                    {PROJECTS.map((project, index) => {
                        const expanded = hovered === index || opened === index;

                        return (
                            <article
                                key={project.id}
                                className={`${styles['projects--row']} ${expanded ? styles['projects--row--expanded'] : ''}`}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <button
                                    type="button"
                                    className={styles['projects--bar']}
                                    aria-expanded={expanded}
                                    onClick={() => setOpened(opened === index ? null : index)}
                                >
                                    <span className={styles['projects--bar--no']}>{project.no}</span>
                                    <span className={styles['projects--bar--title']}>{project.title}</span>
                                    <span className={styles['projects--bar--cat']}>{project.category}</span>
                                    <span className={styles['projects--bar--year']}>{project.year}</span>
                                </button>

                                <div className={styles['projects--panel']}>
                                    <div className={styles['projects--panel--inner']}>
                                        <ProjectCarousel
                                            images={project.images}
                                            duration={28}
                                            playing={expanded}
                                        />

                                        <div className={styles['projects--meat']}>
                                            <p className={styles['projects--meat--desc']}>{project.desc}</p>
                                            <div className={styles['projects--meat--side']}>
                                                <div className={styles['projects--meat--chips']}>
                                                    {project.tech.map(tech => (
                                                        <span key={tech}>{tech}</span>
                                                    ))}
                                                </div>
                                                {project.link && (
                                                    <a
                                                        className={styles['projects--meat--visit']}
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        View project
                                                        <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6">
                                                            <path d="M2 11 L11 2 M5 2 H11 V8" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <footer className={styles['projects--foot']}>
                    <span>Selected builds &amp; experiments · 2021 — 2026</span>
                    <a
                        className={styles['projects--foot--link']}
                        href="https://github.com/Ritik-Bhasarkar"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={styles['projects--foot--arrow']}>→</span> More on GitHub
                    </a>
                </footer>
            </div>
        </section>
    );
}
