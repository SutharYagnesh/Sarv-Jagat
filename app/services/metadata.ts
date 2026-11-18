import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: "Air Compressor Services, Maintenance & AMC | Sarv Jagat - SJ",
    description: "Comprehensive industrial air compressor services: expert commissioning & installation, 24/7 technical support, genuine OEM spare parts, and Annual Maintenance Contracts (AMC) by Sarv Jagat - SJ.",
    alternates: {
      canonical: "https://www.sarvjagat.com/services",
    },
    keywords: [
      "air compressor services",
      "compressor maintenance AMC",
      "compressor repair",
      "air compressor installation",
      "genuine spare parts",
      "screw compressor servicing",
      "Sarv Jagat - SJ",
      "SJ"
    ],
    openGraph: {
      title: "Air Compressor Services, Maintenance & AMC | Sarv Jagat - SJ",
      description: "Expert installation, annual maintenance contracts (AMC), repair, and genuine parts supply for industrial compressors by Sarv Jagat - SJ.",
      url: "https://www.sarvjagat.com/services",
      siteName: "Sarv Jagat - SJ",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png",
          width: 1200,
          height: 630,
          alt: "Sarv Jagat - SJ Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Air Compressor Services, Maintenance & AMC | Sarv Jagat - SJ",
      description: "Industrial compressor maintenance, repair, and technical support by Sarv Jagat - SJ.",
      images: ["https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png"],
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
