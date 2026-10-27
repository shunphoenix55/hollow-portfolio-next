import type { Metadata, Viewport } from 'next';
import { SiteMenu } from '@/components/navigation/SiteMenu';
import { SiteFooter } from '@/components/sections/footer/SiteFooter';
import { menuLinks } from '@/content/journey';
import { site } from '@/content/site';
import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#000107',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <SiteMenu links={menuLinks} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
