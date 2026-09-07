import type { Metadata } from 'next';
import { Caveat, Dancing_Script, Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/context/theme';
import { GridProvider } from '@/context/grid';
import SmoothScroll from '@/components/smooth-scroll/smooth-scroll';
import '@/styles/global.scss';

const inter = Inter({ subsets: ['latin'] });

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-mono',
});

const caveat = Caveat({
    weight: ['400', '600'],
    subsets: ['latin'],
    variable: '--font-hand',
});

const dancingScript = Dancing_Script({
    weight: ['500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-display',
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    ),
    title: 'Ritik Bhasarkar',
    description: 'Frontend Developer & wannabe Creative',
    openGraph: {
        title: 'Ritik Bhasarkar',
        description: 'Frontend Developer & wannabe Creative',
        type: 'website',
        images: [
            {
                url: '/images/meta/meta-image.png',
                width: 2940,
                height: 1602,
                alt: 'Ritik Bhasarkar - Frontend Developer & wannabe Creative',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ritik Bhasarkar',
        description: 'Frontend Developer & wannabe Creative',
        images: ['/images/meta/meta-image.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${spaceMono.variable} ${caveat.variable} ${dancingScript.variable}`}
        >
            <body className={inter.className}>
                <ThemeProvider>
                    <GridProvider>
                        <SmoothScroll>{children}</SmoothScroll>
                    </GridProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
