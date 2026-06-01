import About from '@/sections/about/about';
import HeroSection from '@/sections/hero-section/hero-section';
import HeroSvgs from '@/sections/hero-section/hero-svgs/hero-svgs';
import Statement from '@/sections/statement/statement';

export default function Home() {
    return (
        <>
            <HeroSection />
            <Statement />
            {/* Work section — coming later */}
            <About />
            <HeroSvgs />
        </>
    );
}
