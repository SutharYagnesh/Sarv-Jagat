import { PageHero } from "@/components/page-hero"
import { AutomotiveSolution } from "@/components/sections/automotive-solution"
import { CaseStudies } from "@/components/sections/case-studies"
import { ProductRecommendations } from "@/components/sections/product-recommendations"

export const metadata = {
  title: "Automotive Solutions | Sarv Jagat Corporation - Air Compressors for Auto Industry",
  description:
    "Compressed air solutions for automotive manufacturing, service centers, and repair shops. High-performance compressors for painting, assembly, and pneumatic tools.",
  openGraph: {
    title: "Automotive Solutions | Sarv Jagat Corporation",
    description: "Compressed air solutions for automotive manufacturing, service centers, and repair shops.",
    images: ["/automotive-manufacturing.png"],
  },
}

export default function AutomotiveSolutionPage() {
  const breadcrumbItems = [{ label: "Solutions", href: "/solutions" }, { label: "Automotive" }]

  return (
    <>
      <PageHero
        title="Automotive Solutions"
        description="Comprehensive compressed air solutions for automotive manufacturing, painting operations, assembly lines, and service centers. Engineered for precision and reliability."
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/automotive-assembly-line.png"
      />
      <AutomotiveSolution />
      <CaseStudies industry="automotive" />
      <ProductRecommendations category="automotive" />
    </>
  )
}
