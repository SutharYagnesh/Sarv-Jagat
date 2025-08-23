import { notFound } from "next/navigation"
import { PageHero } from "@/components/page-hero"
import { ProductDetails } from "@/components/sections/product-details"
import { RelatedProducts } from "@/components/sections/related-products"
import { ProductSchema } from "@/components/structured-data"
import products from "@/data/products.json"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} | Industrial Equipment`,
    description: product.description,
    alternates: {
      canonical: `https://industrialcorp.com/products/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://industrialcorp.com/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const breadcrumbItems = [{ label: "Products", href: "/products" }, { label: product.name }]

  return (
    <>
      <ProductSchema product={product} />
      <PageHero title={product.name} description={product.description} breadcrumbItems={breadcrumbItems} />
      <ProductDetails product={product} />
      <RelatedProducts currentProduct={product} />
    </>
  )
}
