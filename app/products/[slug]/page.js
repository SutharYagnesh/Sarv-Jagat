export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { cache } from "react"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/sections/product-details"
import { RelatedProducts } from "@/components/sections/related-products"
import { ProductSchema } from "@/components/structured-data"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"

const formatProduct = (p, categorySlug = null) => {
  const plain = JSON.parse(JSON.stringify(p));
  const formattedSpecs = {};
  if (plain.specifications && Array.isArray(plain.specifications)) {
    plain.specifications.forEach(spec => {
      if (spec.key && spec.value) formattedSpecs[spec.key] = spec.value;
    });
  }
  const allProdImages = Array.from(new Set([
    ...(plain.images || []),
    plain.image
  ].filter(img => img && !img.includes('blob.vercel-storage'))));
  const primaryImage = allProdImages[0] || "/placeholder.jpg";

  return {
    ...plain,
    id: plain._id,
    name: plain.title,
    description: plain.description,
    image: primaryImage,
    images: allProdImages,
    features: [],
    specifications: formattedSpecs,
    categorySlug: categorySlug || (plain.category || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  };
};

const getProductData = cache(async (slug) => {
  try {
    await connectDB();
    const product = await Product.findOne({
      slug,
      status: { $regex: /^published$/i }
    }).lean();

    if (!product) return { product: null, relatedProducts: [] };

    let catSlug = null;
    if (product.category) {
      const catDoc = await Category.findOne({
        name: { $regex: new RegExp(`^\\s*${product.category.trim().replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\s*$`, 'i') }
      }).select('slug').lean();
      if (catDoc && catDoc.slug) catSlug = catDoc.slug;
    }

    const sameCat = await Product.find({
      category: product.category,
      slug: { $ne: slug },
      status: { $regex: /^published$/i }
    })
      .select('title slug category images image price modelNumber powerRating pressureRating airFlow specifications description order')
      .limit(3)
      .lean();

    let relatedRaw = sameCat || [];
    if (relatedRaw.length < 3) {
      const remaining = 3 - relatedRaw.length;
      const excludeSlugs = [slug, ...relatedRaw.map(r => r.slug)];
      const others = await Product.find({
        slug: { $nin: excludeSlugs },
        status: { $regex: /^published$/i }
      })
        .select('title slug category images image price modelNumber powerRating pressureRating airFlow specifications description order')
        .limit(remaining)
        .lean();
      relatedRaw = [...relatedRaw, ...(others || [])];
    }

    return {
      product: formatProduct(product, catSlug),
      relatedProducts: relatedRaw.map(p => formatProduct(p))
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { product: null, relatedProducts: [] };
  }
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product } = await getProductData(slug);

  if (!product) {
    return {
      title: "Product Not Found | Sarv Jagat - SJ",
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com";
  const canonicalUrl = `${siteUrl}/products/${product.slug}`;
  const brand = product.brand || 'Sarv Jagat - SJ';
  
  const title = product.seoTitle
    ? (product.seoTitle.includes('Sarv Jagat') ? product.seoTitle : `${product.seoTitle} | ${brand}`)
    : `${product.name} | ${brand}`;

  const description = product.seoDescription || product.description || 
    `Buy ${product.name} by ${brand}. High-performance industrial air compressor engineered for maximum reliability and efficiency.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: brand,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: `${product.name} - ${brand}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
    keywords: Array.isArray(product.seoKeywords) ? product.seoKeywords : (typeof product.seoKeywords === 'string' && product.seoKeywords ? product.seoKeywords.split(',') : [product.name, product.category, "Air Compressor", "Industrial Equipment", "Sarv Jagat", "SJ"]),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { product, relatedProducts } = await getProductData(slug);

  if (!product) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com";
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const categoryUrl = product.categorySlug ? `${siteUrl}/products/category/${product.categorySlug}` : `${siteUrl}/products`;

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
      ...(product.category ? [{
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": categoryUrl
      }] : []),
      {
        "@type": "ListItem",
        "position": product.category ? 4 : 3,
        "name": product.name,
        "item": productUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductSchema product={product} />
      <ProductDetails product={product} />
      <RelatedProducts relatedProducts={relatedProducts} />
    </>
  )
}
