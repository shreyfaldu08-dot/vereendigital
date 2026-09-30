import React from 'react';
import '../index.css'; // Global Tailwind styles

export const metadata = {
  title: 'Vereen Digital',
  description: 'Digital ecosystem engineering and UI/UX design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-primary-bg min-h-screen text-primary-text font-sans cursor-none selection:bg-accent-lime selection:text-dark-text">
        {children}
      </body>
    </html>
  );
}
