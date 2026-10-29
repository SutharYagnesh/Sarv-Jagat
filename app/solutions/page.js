import { PageHero } from "@/components/page-hero"
import { IndustrySolutions } from "@/components/sections/industry-solutions"
import { SolutionsBenefits } from "@/components/sections/solutions-benefits"
import { ProcessFlow } from "@/components/sections/process-flow"

export const metadata = {
  title: "Industry Solutions | Sarv Jagat Corporation - Compressed Air Solutions",
  description:
    "Comprehensive compressed air solutions for manufacturing, automotive, textile, pharmaceutical, and food processing industries. Expert consultation and custom solutions.",
  alternates: {
    canonical: "https://www.sarvjagat.com/solutions",
  },
  openGraph: {
    title: "Industry Solutions | Sarv Jagat Corporation",
    description:
      "Comprehensive compressed air solutions for manufacturing, automotive, textile, pharmaceutical, and food processing industries.",
    url: "https://www.sarvjagat.com/solutions",
    images: ["/industrial-solutions.png"],
  },
}

export default function SolutionsPage() {
  const breadcrumbItems = [{ label: "Solutions" }]

  return (
    <>
      <PageHero
        title="Industry Solutions"
        description="Tailored compressed air solutions designed to meet the unique requirements of diverse industries. From manufacturing to pharmaceuticals, we deliver reliable, efficient, and cost-effective solutions."
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/industrial-facility-wide.png"
      />
      <IndustrySolutions />
      <SolutionsBenefits />
      <ProcessFlow />
    </>
  )
}
