import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'منصة دعوات زفاف رقمية',
  description: 'منصة احترافية لإنشاء دعوات زفاف رقمية وتخزين الذكريات',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
