export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CategoryClient from "@/components/sections/category-client"
import { ItemListSchema } from "@/components/structured-data"

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const category = await Category.findOne({ slug }).lean();

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.name} | Sarv Jagat Corporation`,
    description: `Leading Manufacturers, Exporters and Wholesaler of ${category.name} and related products.`,
    alternates: {
      canonical: `https://sarvjagat.com/products/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} | Sarv Jagat Corporation`,
      description: `Explore our extensive range of ${category.name} designed for various industrial applications ensuring optimal performance and efficiency.`,
      url: `https://sarvjagat.com/products/category/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | Sarv Jagat Corporation`,
      description: `Leading Manufacturers of ${category.name}.`,
    },
    keywords: [category.name, "Air Compressors", "Industrial Equipment", "Wholesaler", "Manufacturer"],
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  await connectDB();
  
  const category = await Category.findOne({ slug }).lean();
  if (!category) {
    notFound();
  }

  const productsRaw = await Product.find({ category: category.name, status: "Published" }).lean();
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ItemListSchema items={products} categoryName={category.name} url={`https://sarvjagat.com/products/category/${slug}`} />
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Header */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 mb-8">
          <h1 className="text-3xl font-serif text-gray-800 tracking-tight mb-4">{category.name}</h1>
          <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2 border-b border-gray-100 pb-4">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>&gt;</span>
            <Link href="/products" className="hover:text-red-600">Products</Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">{category.name}</span>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
            Leading Manufacturers, Exporters and Wholesaler of {products.map(p => p.title).join(", ")}. 
            Explore our extensive range of {category.name} designed for various industrial applications ensuring optimal performance and efficiency.
          </p>
        </div>

        <CategoryClient products={products} categoryName={category.name} />
      </div>
    </div>
  )
}
