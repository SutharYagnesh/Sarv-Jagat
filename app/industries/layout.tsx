export const metadata = {
  title: 'Industrial Compressed Air Solutions | Sarv Jagat - SJ',
  description: 'Explore how Sarv Jagat - SJ provides tailored energy-efficient compressed air solutions for manufacturing industries worldwide.',
  alternates: {
    canonical: 'https://www.sarvjagat.com/industries',
  },
  openGraph: {
    title: 'Industrial Compressed Air Solutions | Sarv Jagat - SJ',
    description: 'Tailored compressed air solutions for Automotive, Pharmaceuticals, Food & Beverage, Textile, and Manufacturing by Sarv Jagat - SJ.',
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
    title: 'Industrial Compressed Air Solutions | Sarv Jagat - SJ',
    description: 'Tailored compressed air solutions for manufacturing industries by Sarv Jagat - SJ.',
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
  keywords: ['industries', 'automotive', 'pharmaceuticals', 'food & beverage', 'textile', 'metal fabrication', 'construction', 'mining', 'electronics', 'plastic', 'chemical', 'compressed air solutions', 'Sarv Jagat - SJ', 'SJ'],
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children
}

