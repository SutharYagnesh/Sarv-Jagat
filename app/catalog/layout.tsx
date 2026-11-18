export const metadata = {
  title: 'Download Industrial Air Compressor Catalogs | Sarv Jagat - SJ',
  description: 'Download brochures and explore technical specifications for Sarv Jagat - SJ industrial air compressors, screw compressors, and accessories.',
  alternates: {
    canonical: 'https://www.sarvjagat.com/catalog',
  },
  openGraph: {
    title: 'Download Industrial Air Compressor Catalogs | Sarv Jagat - SJ',
    description: 'Download brochures and explore technical specifications for Sarv Jagat - SJ industrial air compressors.',
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
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
