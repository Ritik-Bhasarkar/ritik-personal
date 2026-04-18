import type { Metadata } from 'next';
import { Caveat, Inter, Space_Mono } from 'next/font/google';
import { ThemeProvider } from '@/context/theme';
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

export const metadata: Metadata = {
    title: 'Ritik Bhasarkar',
    description: 'Personal website',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${spaceMono.variable} ${caveat.variable}`}
        >
            <body className={inter.className}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
