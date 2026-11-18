export const metadata = {
  title: "Contact Us & Request a Quote | Sarv Jagat - SJ",
  description:
    "Get in touch with Sarv Jagat - SJ for industrial air compressor inquiries, sales quotes, factory visits, AMC service support, and 24/7 technical assistance. Call +91 91574 87233 or email connect@sarvjagat.com.",
  alternates: {
    canonical: "https://www.sarvjagat.com/contact",
  },
  openGraph: {
    title: "Contact Us & Request a Quote | Sarv Jagat - SJ",
    description:
      "Get in touch with Sarv Jagat - SJ for industrial air compressor inquiries, price quotes, and technical support.",
    url: "https://www.sarvjagat.com/contact",
    siteName: "Sarv Jagat - SJ",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png", width: 1200, height: 630, alt: "Contact Sarv Jagat - SJ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Request a Quote | Sarv Jagat - SJ",
    description: "Get in touch with Sarv Jagat - SJ for compressor price quotes and technical assistance.",
    images: ["https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
