import About from '@/sections/about/about';
import HeroSection from '@/sections/hero-section/hero-section';
import HeroSvgs from '@/sections/hero-section/hero-svgs/hero-svgs';
import StringGrid from '@/sections/hero-section/string-grid/string-grid';
import Projects from '@/sections/projects/projects';
import Statement from '@/sections/statement/statement';
import styles from './page.module.scss';

export default function Home() {
    return (
        <main className={styles.home}>
            <StringGrid />
            <HeroSection />
            <Statement />
            <Projects />
            <About />
            <HeroSvgs />
        </main>
    );
}
