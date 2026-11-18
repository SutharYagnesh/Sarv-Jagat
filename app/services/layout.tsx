export const metadata = {
  title: 'Air Compressor Services & AMC Support | Sarv Jagat - SJ',
  description: "Comprehensive industrial air compressor services: expert installation, Annual Maintenance Contracts (AMC), repairs, and genuine OEM spare parts supply by Sarv Jagat - SJ.",
  alternates: {
    canonical: 'https://www.sarvjagat.com/services',
  },
  openGraph: {
    title: 'Air Compressor Services & AMC Support | Sarv Jagat - SJ',
    description: 'Expert installation, maintenance contracts, and genuine spare parts supply by Sarv Jagat - SJ.',
    url: 'https://www.sarvjagat.com/services',
    siteName: 'Sarv Jagat - SJ',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png',
        width: 1200,
        height: 630,
        alt: 'Sarv Jagat - SJ Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Air Compressor Services & AMC Support | Sarv Jagat - SJ',
    description: 'Industrial compressor maintenance, repair, and technical support by Sarv Jagat - SJ.',
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
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
