import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Apple AirPods Max | High-Fidelity Audio, Perfected',
  description: 'Experience the revolutionary Apple AirPods Max wireless noise cancelling headphones. Computational audio, Active Noise Cancellation, Spatial Audio with dynamic head tracking, and ultra-high-fidelity acoustics.',
  keywords: ['Apple AirPods Max', 'AirPods Max', 'Active Noise Cancellation', 'Apple Audio', 'Spatial Audio', 'High-Fidelity Headphones'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-void text-white selection:bg-apple-blue/40 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
