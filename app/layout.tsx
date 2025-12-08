import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://shoppingwed.com'),
  title: {
    default: 'ShoppingWed - Premium Products',
    template: '%s | ShoppingWed',
  },
  description: 'Discover curated premium products at ShoppingWed. Shop the latest trends in fashion, gadgets, and lifestyle.',
  keywords: ['shopping', 'ecommerce', 'premium', 'deals', 'buy online'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shoppingwed.com',
    siteName: 'ShoppingWed',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShoppingWed',
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
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
