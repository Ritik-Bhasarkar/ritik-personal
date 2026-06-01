import AvailabilityPill from './availability-pill/availability-pill';
import CursorHalo from '@/components/cursor-halo/cursor-halo';
import HeroAnnotations from './hero-annotations/hero-annotations';
import HeroFooter from './hero-footer/hero-footer';
import HeroMain from './hero-main/hero-main';
import HeroMeta from './hero-meta/hero-meta';
import StringGrid from './string-grid/string-grid';
import Topnav from './topnav/topnav';
import styles from './hero-section.module.scss';

export default function HeroSection() {
    return (
        <section className={`${styles['hero-section']} hero-section`} data-hero="">
            <StringGrid />
            <CursorHalo />
            <Topnav />
            <AvailabilityPill />
            <HeroMeta />
            <HeroMain />
            <HeroFooter />
            <HeroAnnotations />
        </section>
    );
}
