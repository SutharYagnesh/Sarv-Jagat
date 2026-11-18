export const metadata = {
  title: 'About Us | Sarv Jagat - SJ Air Compressors',
  description: 'Learn about Sarv Jagat - SJ: leading manufacturer, exporter, and wholesaler of high-performance industrial rotary screw and reciprocating air compressors since 2011.',
  alternates: {
    canonical: 'https://www.sarvjagat.com/about',
  },
  openGraph: {
    title: 'About Us | Sarv Jagat - SJ Air Compressors',
    description: 'Leading manufacturer, exporter, and wholesaler of premium industrial air compressors by Sarv Jagat - SJ.',
    url: 'https://www.sarvjagat.com/about',
    siteName: 'Sarv Jagat - SJ',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png', width: 1200, height: 630, alt: 'About Sarv Jagat - SJ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Sarv Jagat - SJ Air Compressors',
    description: 'Leading industrial air compressor manufacturer and exporter by Sarv Jagat - SJ.',
    images: ['https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
