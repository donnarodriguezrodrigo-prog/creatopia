import type { Metadata } from 'next';
import { Bebas_Neue, Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Creatopia | Donna May Rodrigo – Graphic Designer & Virtual Assistant',
  description:
    'Purposeful Creativity. Professional graphic design and virtual assistant services by Donna May Rodrigo.',
  keywords: ['graphic designer', 'virtual assistant', 'Creatopia', 'Donna May Rodrigo', 'social media graphics', 'Canva design'],
  openGraph: {
    title: 'Creatopia | Donna May Rodrigo',
    description: 'Purposeful Creativity – Professional Graphic Design & VA Services',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} font-montserrat bg-near-black text-white antialiased`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#420407',
              color: '#F9E7E7',
              border: '1px solid #9E3D42',
              fontFamily: 'var(--font-montserrat)',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
