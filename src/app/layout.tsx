import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/auth';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'MatheusBlog',
    icons: {
        icon: [
            {
                url: '/logo.png',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <AuthProvider>
                <body className={poppins.className}>{children}</body>
            </AuthProvider>
        </html>
    );
}
