export const revalidate = 60;
import { cache } from "react"
import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import Link from "next/link"
import CategoryClient from "@/components/sections/category-client"
import { ItemListSchema } from "@/components/structured-data"
import { fetchWithCache } from "@/lib/memoryCache"

const getCategoryBySlug = cache(async (slug: string) => {
  return await fetchWithCache(`category_doc_${slug}`, async () => {
    await connectDB();
    return await Category.findOne({ slug }).lean();
  }, 120);
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | Sarv Jagat - SJ" }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com";
  const canonicalUrl = category.canonicalUrl || `${siteUrl}/products/category/${slug}`;
  
  const title = category.seoTitle
    ? (category.seoTitle.includes('Sarv Jagat') ? category.seoTitle : `${category.seoTitle} | Sarv Jagat - SJ`)
    : `${category.name} | Sarv Jagat - SJ`;

  const description = category.seoDescription || category.description || 
    `Leading manufacturers, exporters and wholesale suppliers of premium ${category.name}. Explore high-efficiency industrial air compressor solutions by Sarv Jagat - SJ.`;

  const keywords = Array.isArray(category.seoKeywords) && category.seoKeywords.length > 0
    ? category.seoKeywords
    : [category.name, "Air Compressors", "Industrial Air Compressors", "Manufacturer", "Exporter", "Wholesaler", "Sarv Jagat", "SJ"];

  const ogImageUrl = category.ogImage || `${siteUrl}/Sarv%20Jagat_Logo_Red_11.png`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Sarv Jagat - SJ",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${category.name} - Sarv Jagat - SJ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const products = await fetchWithCache(`category_products_${slug}`, async () => {
    await connectDB();
    const escapedName = category.name.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const productsRaw = await Product.find({ 
      category: { $regex: new RegExp(`^${escapedName}$`, 'i') }, 
      status: { $regex: /^published$/i } 
    })
      .select('title slug category images order status price modelNumber powerRating pressureRating airFlow')
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(productsRaw));
  }, 120);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com";
  const categoryUrl = `${siteUrl}/products/category/${slug}`;

  // JSON-LD Breadcrumb Schema for Google Rich Results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${siteUrl}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": categoryUrl
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 overflow-x-hidden max-w-full">
      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ItemListSchema items={products} categoryName={category.name} url={categoryUrl} />

      <div className="container mx-auto px-4 max-w-full">
        {/* Breadcrumb & Category Header */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 mb-8">
          <h1 className="text-3xl font-serif text-gray-800 tracking-tight mb-4">{category.name}</h1>
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6 flex items-center space-x-2 border-b border-gray-100 pb-4">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/products" className="hover:text-red-600 transition-colors">Products</Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">{category.name}</span>
          </nav>

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
    return categories.map((c: any) => ({ slug: c.slug }));
  } catch (err) {
    console.error("Error generating static params for categories:", err);
    return [];
  }
}
