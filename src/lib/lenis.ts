import type Lenis from 'lenis';

let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null): void => {
    instance = lenis;
};

// Smooth-scroll the page to a section. Falls back to native smooth scroll
// if Lenis hasn't mounted yet.
export const scrollToSection = (target: string): void => {
    if (instance) {
        instance.scrollTo(target, { duration: 1.2 });
        return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
};
