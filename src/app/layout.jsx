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
        apple: '/favicon/apple-icon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={poppins.variable}>
            <head>
                <link rel="icon" href="/favicon/favicon.ico" />
                <link rel="icon" type="image/png" sizes="192x192" href="/favicon/web-app-manifest-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/favicon/web-app-manifest-512x512.png" />
                <link rel="apple-touch-icon" href="/favicon/apple-icon.png" />
                <link rel="manifest" href="/favicon/manifest.json" />
                <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
                <meta name="p:domain_verify" content="3a5d927052ec99de85b7be0a0103b087"/>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
