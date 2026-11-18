import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Industrial Compressed Air Solutions by Industry | Sarv Jagat - SJ',
    description: 'Explore how Sarv Jagat - SJ provides energy-efficient industrial compressed air systems for Automotive, Pharmaceuticals, Food & Beverage, Textile, Metal Fabrication, Plastics, and Heavy Manufacturing.',
    alternates: {
      canonical: 'https://www.sarvjagat.com/industries',
    },
    keywords: [
      'industries',
      'automotive air compressor',
      'pharmaceutical compressed air',
      'food grade air compressor',
      'textile compressor',
      'metal fabrication compressed air',
      'plastic pet blow molding',
      'Sarv Jagat - SJ',
      'SJ'
    ],
    openGraph: {
      title: 'Industrial Compressed Air Solutions by Industry | Sarv Jagat - SJ',
      description: 'Explore tailored compressed air solutions for Automotive, Pharmaceuticals, Food & Beverage, Textile, and Manufacturing industries by Sarv Jagat - SJ.',
      url: 'https://www.sarvjagat.com/industries',
      siteName: 'Sarv Jagat - SJ',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: 'https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png',
          width: 1200,
          height: 630,
          alt: 'Sarv Jagat - SJ Industries',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Industrial Compressed Air Solutions by Industry | Sarv Jagat - SJ',
      description: 'Tailored compressed air systems for manufacturing industries by Sarv Jagat - SJ.',
      images: ['https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};
