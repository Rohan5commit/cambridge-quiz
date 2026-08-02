import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cambridge Quiz - Grade 6',
  description: 'Fun quiz website for 6th grade Cambridge students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {children}
      </body>
    </html>
  );
}
