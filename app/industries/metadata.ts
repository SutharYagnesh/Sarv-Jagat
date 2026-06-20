import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Industries - SarvJagat',
    description: 'Explore how Sarv Jagat provides tailored compressed air solutions for various industries including Automotive, Pharmaceuticals, Food & Beverage, Textile, Metal & Fabrication, Construction, Mining, Electronics, Plastic & PET, and Chemical & Process.',
    openGraph: {
      title: 'Industries - SarvJagat',
      description: 'Explore how Sarv Jagat provides tailored compressed air solutions for various industries including Automotive, Pharmaceuticals, Food & Beverage, Textile, Metal & Fabrication, Construction, Mining, Electronics, Plastic & PET, and Chemical & Process.',
      url: 'https://www.sarvjagat.com/industries',
      siteName: 'SarvJagat',
      type: 'website',
    },
    keywords: ['industries', 'automotive', 'pharmaceuticals', 'food & beverage', 'textile', 'metal fabrication', 'construction', 'mining', 'electronics', 'plastic', 'chemical', 'compressed air solutions', 'SarvJagat'],
  };
};