import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: "Services | Sarv Jagat",
    description: "Explore Sarv Jagat's comprehensive services including installation, annual maintenance contracts (AMC), repair, technical support, and spare parts supply for air compressors.",
    keywords: ["air compressor services", "compressor maintenance", "compressor repair", "technical support", "spare parts", "AMC", "Sarv Jagat services"],
    openGraph: {
      title: "Services | Sarv Jagat",
      description: "Comprehensive services for air compressors: installation, maintenance, repair, and support.",
      url: "https://sarvjagat.com/services",
      siteName: "Sarv Jagat",
      images: [
        {
          url: "/og-services.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
};