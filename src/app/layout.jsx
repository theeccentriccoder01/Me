import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/cosmic-tower.css';

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
});

export const metadata = {
    title: 'Sagnik Chakraborty - Self-made Portfolio',
    description: 'Portfolio of Sagnik Chakraborty - Front-End Developer, AI/ML enthusiast, and technology fanatic.',
    icons: {
        icon: '/favicon/favicon.ico',
        apple: '/favicon/apple-touch-icon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.variable}>
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
