export async function generateMetadata() {
  return {
    title: 'Download Industrial Air Compressor Catalogs | Sarv Jagat - SJ',
    description: 'Download complete product catalogs, engineering brochures, technical specifications, and dimensional drawings for Sarv Jagat - SJ rotary screw and reciprocating air compressors.',
    alternates: {
      canonical: 'https://www.sarvjagat.com/catalog',
    },
    openGraph: {
      title: 'Download Industrial Air Compressor Catalogs | Sarv Jagat - SJ',
      description: 'Download product catalogs and technical specifications for Sarv Jagat - SJ air compressors.',
      url: 'https://www.sarvjagat.com/catalog',
      siteName: 'Sarv Jagat - SJ',
      type: 'website',
      locale: 'en_US',
      images: [{ url: 'https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png', width: 1200, height: 630, alt: 'Sarv Jagat - SJ Catalogs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Download Air Compressor Catalogs | Sarv Jagat - SJ',
      description: 'Technical brochures and catalogs for industrial compressors by Sarv Jagat - SJ.',
      images: ['https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    keywords: ['product catalogs', 'air compressor brochure', 'technical specifications', 'rotary screw catalog', 'Sarv Jagat - SJ', 'SJ'],
  };
}
