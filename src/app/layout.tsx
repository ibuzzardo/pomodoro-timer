import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pomodoro Timer',
  description: 'A modern Pomodoro Timer to boost your productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} dark bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}