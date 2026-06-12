import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Edroyt | Transforming Ideas Into Scalable Digital Solutions',
  description: 'We help startups and enterprises build innovative software, AI-powered solutions, and digital experiences that accelerate business growth.',
  keywords: ['software development', 'web development', 'mobile development', 'AI solutions', 'cloud services', 'enterprise software'],
  authors: [{ name: 'Edroyt' }],
  creator: 'Edroyt',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edroyt-main.vercel.app/',
    siteName: 'Edroyt',
    title: 'Edroyt | Transforming Ideas Into Scalable Digital Solutions',
    description: 'We help startups and enterprises build innovative software, AI-powered solutions, and digital experiences that accelerate business growth.',
    images: [
      {
        url: 'https://images.pexels.com/photo-3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Edroyt - Premium Software Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edroyt | Transforming Ideas Into Scalable Digital Solutions',
    description: 'We help startups and enterprises build innovative software, AI-powered solutions, and digital experiences.',
    images: ['https://images.pexels.com/photo-3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning prevents next-themes hydration mismatch warning
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}