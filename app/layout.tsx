import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { NextAuthProvider } from '@/components/auth/next-auth-provider';
import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AssessMed - ML Disease Prediction',
  description: 'Machine Learning-Based Disease Prediction System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col bg-background">
              <NavBar />
              <main className="flex-1">{children}</main>
              <SpeedInsights />
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}