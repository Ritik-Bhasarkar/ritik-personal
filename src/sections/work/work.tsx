'use client';

import { useState, type CSSProperties } from 'react';
import projectsData from '../../../public/projects.json';
import styles from './work.module.scss';

interface Project {
    no: string;
    title: string;
    desc: string;
    image: string;
    imageAlt: string;
    inProgress: boolean;
    accent: string;
    shadow: string;
    bubbleX: string;
    bubbleY: string;
    bubbleRotate: string;
    bubbleWidth: string;
}

type ProjectVars = CSSProperties & {
    '--project-accent'?: string;
    '--project-shadow'?: string;
    '--bubble-x'?: string;
    '--bubble-y'?: string;
    '--bubble-rotate'?: string;
    '--bubble-width'?: string;
};

interface ProjectContent {
    id: string;
    title: string;
    description: string;
    status?: string;
    image?: string;
}

interface ProjectStyle {
    accent: string;
    shadow: string;
    bubbleX: string;
    bubbleRotate: string;
    bubbleWidth: string;
}

// visual presets cycled by index — content comes from projects.json
const STYLES: ProjectStyle[] = [
    { accent: '#242424', shadow: 'rgba(20, 20, 20, 0.28)', bubbleX: '34%', bubbleRotate: '-4deg', bubbleWidth: '360px' },
    { accent: '#e6609b', shadow: 'rgba(230, 96, 155, 0.26)', bubbleX: '36%', bubbleRotate: '3deg', bubbleWidth: '370px' },
    { accent: '#2f93ff', shadow: 'rgba(47, 147, 255, 0.24)', bubbleX: '33%', bubbleRotate: '-2deg', bubbleWidth: '365px' },
    { accent: '#d9a46a', shadow: 'rgba(217, 164, 106, 0.24)', bubbleX: '36%', bubbleRotate: '4deg', bubbleWidth: '360px' },
];

const CONTENT: ProjectContent[] = projectsData.projects;

const PROJECTS: Project[] = CONTENT.map((project, index) => {
    const style = STYLES[index % STYLES.length];
    return {
        no: String(index + 1).padStart(2, '0'),
        title: project.title,
        desc: project.description,
        image: project.image ?? '',
        imageAlt: `${project.title} project preview`,
        inProgress: (project.status ?? '').toLowerCase() === 'in progress',
        accent: style.accent,
        shadow: style.shadow,
        bubbleX: style.bubbleX,
        // keep each preview vertically aligned with its tab, whatever the count
        bubbleY: `${((index + 0.5) / CONTENT.length) * 100}%`,
        bubbleRotate: style.bubbleRotate,
        bubbleWidth: style.bubbleWidth,
    };
});

export default function Work() {
    const [active, setActive] = useState(0);
    const activeProject = PROJECTS[active];

    return (
        <section className={styles['work']} id="work">
            <div className={styles['work--inner']}>
                <div className={styles['work--head']}>
                    <p className={styles['work--eyebrow']}>
                        Recently Made <span className={styles['work--eyebrow--arrow']}>▶</span>
                    </p>
                </div>

                <div className={styles['work--layout']}>
                    <div className={styles['work--tabs']} aria-label="Project tabs">
                        {PROJECTS.map((project, index) => {
                            const isActive = index === active;

                            return (
                                <button
                                    key={project.no}
                                    type="button"
                                    className={`${styles['work--tab']} ${isActive ? styles['work--tab--active'] : ''}`}
                                    onMouseEnter={() => setActive(index)}
                                    onFocus={() => setActive(index)}
                                    onClick={() => setActive(index)}
                                    aria-pressed={isActive}
                                    style={
                                        {
                                            '--project-accent': project.accent,
                                            '--project-shadow': project.shadow,
                                        } as ProjectVars
                                    }
                                >
                                    <span className={styles['work--tab--icon']}>{project.title.slice(0, 2)}</span>
                                    <span className={styles['work--tab--copy']}>
                                        <span className={styles['work--tab--title']}>{project.title}</span>
                                        <span className={styles['work--tab--desc']}>{project.desc}</span>
                                        {project.inProgress && (
                                            <span className={styles['work--tab--pill']}>
                                                <span className={styles['work--tab--pill--dot']} aria-hidden="true" />
                                                In Progress
                                            </span>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <aside
                        className={styles['work--preview']}
                        style={
                            {
                                '--project-accent': activeProject.accent,
                                '--project-shadow': activeProject.shadow,
                            } as ProjectVars
                        }
                        aria-live="polite"
                        aria-label="Project preview"
                    >
                        <div className={styles['work--preview--stage']}>
                            {PROJECTS.map((project, index) => {
                                const isActive = index === active;

                                return (
                                    <div
                                        key={project.no}
                                        className={`${styles['work--preview--bubble']} ${isActive ? styles['work--preview--bubble--active'] : ''}`}
                                        style={
                                            {
                                                '--bubble-x': project.bubbleX,
                                                '--bubble-y': project.bubbleY,
                                                '--bubble-rotate': project.bubbleRotate,
                                                '--bubble-width': project.bubbleWidth,
                                            } as ProjectVars
                                        }
                                    >
                                        <div className={styles['work--preview--tag']}>{project.title}</div>
                                        <div className={styles['work--preview--frame']}>
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.imageAlt}
                                                    loading={isActive ? 'eager' : 'lazy'}
                                                    decoding="async"
                                                />
                                            ) : (
                                                <div className={styles['work--preview--placeholder']}>
                                                    {project.title}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
