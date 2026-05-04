import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ErasmusMate',
  description: 'Institutional mobility support with a separate social-support layer.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
