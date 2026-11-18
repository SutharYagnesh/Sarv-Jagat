export const metadata = {
  title: 'Air Compressor AMC (Annual Maintenance Contracts) | Sarv Jagat - SJ',
  description: 'Maximize equipment uptime with Sarv Jagat - SJ Annual Maintenance Contracts (AMC). Scheduled preventive servicing, emergency breakdown response, and genuine spare parts.',
  alternates: {
    canonical: 'https://www.sarvjagat.com/services/amc',
  },
  openGraph: {
    title: 'Air Compressor AMC (Annual Maintenance Contracts) | Sarv Jagat - SJ',
    description: 'Scheduled preventive servicing and emergency breakdown response for industrial compressors by Sarv Jagat - SJ.',
    url: 'https://www.sarvjagat.com/services/amc',
    siteName: 'Sarv Jagat - SJ',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png', width: 1200, height: 630, alt: 'Air Compressor AMC - Sarv Jagat - SJ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Air Compressor AMC (Annual Maintenance Contracts) | Sarv Jagat - SJ',
    description: 'Scheduled preventive servicing for industrial air compressors by Sarv Jagat - SJ.',
    images: ['https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

export default function AMCLayout({ children }: { children: React.ReactNode }) {
  return children;
}
