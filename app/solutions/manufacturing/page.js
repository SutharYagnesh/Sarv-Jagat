import { PageHero } from "@/components/page-hero"
import { ManufacturingSolution } from "@/components/sections/manufacturing-solution"
import { CaseStudies } from "@/components/sections/case-studies"
import { ProductRecommendations } from "@/components/sections/product-recommendations"

export const metadata = {
  title: "Manufacturing Solutions | Sarv Jagat Corporation - Industrial Air Compressors",
  description:
    "Specialized compressed air solutions for manufacturing industries. Reciprocating and screw compressors designed for production lines, assembly operations, and industrial automation.",
  openGraph: {
    title: "Manufacturing Solutions | Sarv Jagat Corporation",
    description:
      "Specialized compressed air solutions for manufacturing industries with reliable performance and energy efficiency.",
    images: ["/sj-process implement-metal fabrication-ind.jpg"],
  },
}

export default function ManufacturingSolutionPage() {
  const breadcrumbItems = [{ label: "Solutions", href: "/solutions" }, { label: "Manufacturing" }]

  return (
    <>
      <PageHero
        title="Manufacturing Solutions"
        description="Powering production lines with reliable compressed air solutions. Our industrial-grade compressors ensure consistent performance for assembly operations, pneumatic tools, and automated systems."
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/sj-process implement-metal fabrication-ind.jpg"
      />
      <ManufacturingSolution />
      <CaseStudies industry="manufacturing" />
      <ProductRecommendations category="manufacturing" />
    </>
  )
}
