export async function generateMetadata() {
  return {
    title: 'Authorized Dealers & Global Distribution Network | Sarv Jagat - SJ',
    description: 'Find authorized Sarv Jagat - SJ industrial air compressor dealers, distribution partners, and international service centers across India and worldwide.',
    alternates: {
      canonical: 'https://www.sarvjagat.com/dealers',
    },
    openGraph: {
      title: 'Authorized Dealers & Global Distribution Network | Sarv Jagat - SJ',
      description: 'Authorized Sarv Jagat - SJ air compressor dealers and global distribution network.',
      url: 'https://www.sarvjagat.com/dealers',
      siteName: 'Sarv Jagat - SJ',
      type: 'website',
      locale: 'en_US',
      images: [{ url: 'https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png', width: 1200, height: 630, alt: 'Sarv Jagat - SJ Dealers' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Authorized Dealers & Global Network | Sarv Jagat - SJ',
      description: 'Authorized Sarv Jagat - SJ dealers and global distribution network.',
      images: ['https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    keywords: ['dealers', 'service centers', 'partners', 'air compressor dealers', 'Sarv Jagat dealers', 'worldwide export', 'global distribution', 'Sarv Jagat - SJ', 'SJ'],
  };
}
