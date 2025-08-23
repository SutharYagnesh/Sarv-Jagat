import { PageHero } from "@/components/page-hero"
import { ReciprocatingCompressors } from "@/components/sections/reciprocating-compressors"
import { TechnicalSpecs } from "@/components/sections/technical-specs"
import { CompressorComparison } from "@/components/sections/compressor-comparison"

export const metadata = {
  title: "Reciprocating Air Compressors | Sarv Jagat Corporation - SJ-RC Series",
  description:
    "High-performance reciprocating piston air compressors from 3HP to 30HP. Single and two-stage models for industrial applications with reliable performance and energy efficiency.",
  openGraph: {
    title: "Reciprocating Air Compressors | Sarv Jagat Corporation",
    description: "High-performance reciprocating piston air compressors from 3HP to 30HP for industrial applications.",
    images: ["/reciprocating-compressor-range.png"],
  },
}

export default function ReciprocatingCompressorsPage() {
  const breadcrumbItems = [{ label: "Products", href: "/products" }, { label: "Reciprocating Compressors" }]

  return (
    <>
      <PageHero
        title="SJ-RC Series Reciprocating Air Compressors"
        description="Robust and reliable reciprocating piston air compressors designed for continuous industrial operation. Available in single and two-stage configurations from 3HP to 30HP."
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/reciprocating-compressor-hero.png"
      />
      <ReciprocatingCompressors />
      <TechnicalSpecs category="reciprocating" />
      <CompressorComparison category="reciprocating" />
    </>
  )
}
