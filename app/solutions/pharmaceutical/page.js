import { PageHero } from "@/components/page-hero"
import { PharmaceuticalSolution } from "@/components/sections/pharmaceutical-solution"
import { CaseStudies } from "@/components/sections/case-studies"
import { ProductRecommendations } from "@/components/sections/product-recommendations"

export const metadata = {
  title: "Pharmaceutical Solutions | Sarv Jagat Corporation - Oil-Free Medical Air Compressors",
  description:
    "Medical-grade oil-free compressed air solutions for pharmaceutical manufacturing. Clean air systems meeting FDA and cGMP standards for drug production and packaging.",
  openGraph: {
    title: "Pharmaceutical Solutions | Sarv Jagat Corporation",
    description:
      "Medical-grade oil-free compressed air solutions for pharmaceutical manufacturing meeting FDA standards.",
    images: ["/pharmaceutical-facility.png"],
  },
}

export default function PharmaceuticalSolutionPage() {
  const breadcrumbItems = [{ label: "Solutions", href: "/solutions" }, { label: "Pharmaceutical" }]

  return (
    <>
      <PageHero
        title="Pharmaceutical Solutions"
        description="Medical-grade oil-free compressed air systems designed for pharmaceutical manufacturing. Meeting FDA, cGMP, and ISO standards for clean air requirements in drug production and packaging."
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/pharmaceutical-clean-room.png"
      />
      <PharmaceuticalSolution />
      <CaseStudies industry="pharmaceutical" />
      <ProductRecommendations category="pharmaceutical" />
    </>
  )
}
