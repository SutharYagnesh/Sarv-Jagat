import { PageHero } from "@/components/page-hero"
import { IndustrySolutions } from "@/components/sections/industry-solutions"
import { SolutionsBenefits } from "@/components/sections/solutions-benefits"
import { ProcessFlow } from "@/components/sections/process-flow"

export const metadata = {
  title: "Industry Compressed Air Solutions | Sarv Jagat - SJ",
  description:
    "Comprehensive, energy-efficient compressed air solutions for manufacturing, automotive, textile, pharmaceutical, and food processing industries by Sarv Jagat - SJ.",
  alternates: {
    canonical: "https://www.sarvjagat.com/solutions",
  },
  openGraph: {
    title: "Industry Compressed Air Solutions | Sarv Jagat - SJ",
    description:
      "Comprehensive compressed air solutions for manufacturing, automotive, textile, and pharmaceutical industries by Sarv Jagat - SJ.",
    url: "https://www.sarvjagat.com/solutions",
    siteName: "Sarv Jagat - SJ",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png", width: 1200, height: 630, alt: "Sarv Jagat - SJ Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Compressed Air Solutions | Sarv Jagat - SJ",
    description: "Tailored compressed air solutions for manufacturing by Sarv Jagat - SJ.",
    images: ["https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
}

export default function SolutionsPage() {
  const breadcrumbItems = [{ label: "Solutions" }]

  return (
    <>
      <PageHero
        title="Industry Solutions"
        description="Tailored compressed air solutions designed to meet the unique requirements of diverse industries. From manufacturing to pharmaceuticals, we deliver reliable, efficient, and cost-effective solutions."
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/sj-main-page.png"
      />
      <IndustrySolutions />
      <SolutionsBenefits />
      <ProcessFlow />
    </>
  )
}
