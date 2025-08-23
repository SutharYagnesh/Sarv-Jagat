import { HeroSection } from "@/components/sections/hero-section"
import { ProductCategoriesSection } from "@/components/sections/product-categories-section"
import { IndustriesSection } from "@/components/sections/industries-section"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { CTASection } from "@/components/sections/cta-section"
import { OrganizationSchema } from "@/components/structured-data"

export const metadata = {
  title: "Sarv Jagat Corporation | Industrial Air Compressor Manufacturer",
  description:
    "Leading manufacturer of industrial air compressors, pneumatic tools, and compressed air solutions. Reciprocating, screw, and oil-free compressors for all industries.",
  alternates: {
    canonical: "https://sarvjagat.com",
  },
  openGraph: {
    title: "Sarv Jagat Corporation | Industrial Air Compressor Manufacturer",
    description:
      "Leading manufacturer of industrial air compressors, pneumatic tools, and compressed air solutions for all industries.",
    url: "https://sarvjagat.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sarv Jagat Corporation - Industrial Air Compressor Solutions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarv Jagat Corporation | Industrial Air Compressor Manufacturer",
    description:
      "Leading manufacturer of industrial air compressors, pneumatic tools, and compressed air solutions for all industries.",
    images: ["/og-image.jpg"],
  },
}

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <ProductCategoriesSection />
      <IndustriesSection />
      <StatsSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  )
}
