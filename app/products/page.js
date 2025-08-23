import { ProductCatalog } from "@/components/sections/product-catalog"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "Products | Industrial Equipment & Solutions",
  description:
    "Browse our comprehensive range of industrial equipment including air compressors, pneumatic tools, dryers, and vacuum pumps.",
  openGraph: {
    title: "Products | Industrial Equipment & Solutions",
    description:
      "Browse our comprehensive range of industrial equipment including air compressors, pneumatic tools, dryers, and vacuum pumps.",
    images: ["/industrial-equipment.png"],
  },
}

export default function ProductsPage({ searchParams }) {
  const breadcrumbItems = [{ label: "Products" }]

  return (
    <>
      <PageHero
        title="Our Products"
        description="Discover our comprehensive range of industrial equipment designed to meet the diverse needs of modern manufacturing and industrial operations."
        breadcrumbItems={breadcrumbItems}
      />
      <ProductCatalog searchParams={searchParams} />
    </>
  )
}
