import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://shopwedc.com'),
  title: {
    default: 'ShopWedc - Luxury Collection',
    template: '%s | ShopWedc',
  },
  description: 'Discover curated luxury products at ShopWedc.',
  keywords: ['shopping', 'ecommerce', 'premium', 'luxury', 'deals'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shopwedc.com',
    siteName: 'ShopWedc',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShopWedc',
      },
    ],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        {children}
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}
