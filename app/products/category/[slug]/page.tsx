export const revalidate = 60;
import { cache } from "react"
import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CategoryClient from "@/components/sections/category-client"
import { ItemListSchema } from "@/components/structured-data"
import { fetchWithCache } from "@/lib/memoryCache"

const getCategoryBySlug = cache(async (slug: string) => {
  return await fetchWithCache(`category_doc_${slug}`, async () => {
    await connectDB();
    return await Category.findOne({ slug }).lean();
  }, 300);
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.name} | Sarv Jagat Corporation`,
    description: `Leading Manufacturers, Exporters and Wholesaler of ${category.name} and related products.`,
    alternates: {
      canonical: `https://www.sarvjagat.com/products/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} | Sarv Jagat Corporation`,
      description: `Explore our extensive range of ${category.name} designed for various industrial applications ensuring optimal performance and efficiency.`,
      url: `https://www.sarvjagat.com/products/category/${slug}`,
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

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const products = await fetchWithCache(`category_products_${slug}`, async () => {
    await connectDB();
    const productsRaw = await Product.find({ 
      category: category.name, 
      status: { $regex: /^published$/i } 
    })
      .select('title slug category images order status price modelNumber powerRating pressureRating airFlow')
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(productsRaw));
  }, 300);

  return (
    <div className="min-h-screen bg-gray-50 py-8 overflow-x-hidden max-w-full">
      <ItemListSchema items={products} categoryName={category.name} url={`https://www.sarvjagat.com/products/category/${slug}`} />
      <div className="container mx-auto px-4 max-w-full">
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
            {category.description || `Leading manufacturers, exporters, and wholesale suppliers of premium ${category.name}. Explore our energy-efficient, robust industrial solutions engineered for optimal performance, continuous reliability, and long service life.`}
          </p>
        </div>

        <CategoryClient products={products} categoryName={category.name} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const categories = await Category.find({}).select('slug').lean();
    return categories.map((c) => ({ slug: c.slug }));
  } catch (err) {
    console.error("Error generating static params for categories:", err);
    return [];
  }
}
