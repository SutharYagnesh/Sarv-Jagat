export const revalidate = 120;
import { cache } from "react"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/sections/product-details"
import { RelatedProducts } from "@/components/sections/related-products"
import { ProductSchema } from "@/components/structured-data"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import { fetchWithCache } from "@/lib/memoryCache"

// Cached in RAM: Zero database calls during page renders, sub-millisecond response
const getAllPublishedCatalog = async () => {
  return await fetchWithCache('all_published_products_catalog', async () => {
    await connectDB();
    const [rawProducts, rawCategories] = await Promise.all([
      Product.find({ status: { $regex: /^published$/i } })
        .select('title slug category images image price modelNumber powerRating pressureRating airFlow specifications description seoTitle seoDescription seoKeywords order createdAt')
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      Category.find({}).select('name slug').lean(),
    ]);

    const catMap = {};
    (rawCategories || []).forEach(c => {
      if (c.name && c.slug) catMap[c.name.trim().toLowerCase()] = c.slug;
    });

    return {
      products: JSON.parse(JSON.stringify(rawProducts || [])),
      categoryMap: catMap,
    };
  }, 300);
};

const getProductData = cache(async (slug) => {
  try {
    const { products, categoryMap } = await getAllPublishedCatalog();
    const product = products.find((p) => p.slug === slug);
    if (!product) return { product: null, relatedProducts: [] };

    const catSlug =
      (product.category && categoryMap[product.category.trim().toLowerCase()]) ||
      (product.category || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Instant in-memory related products selection (< 0.01 ms)
    const sameCat = products.filter(
      (p) =>
        (p.category || '').trim().toLowerCase() === (product.category || '').trim().toLowerCase() &&
        p.slug !== slug
    );

    let relatedRaw = sameCat.slice().sort(() => 0.5 - Math.random()).slice(0, 3);
    if (relatedRaw.length < 3) {
      const remainingCount = 3 - relatedRaw.length;
      const excludeSlugs = new Set([slug, ...relatedRaw.map((r) => r.slug)]);
      const otherPool = products.filter((p) => !excludeSlugs.has(p.slug));
      const otherPicked = otherPool.slice().sort(() => 0.5 - Math.random()).slice(0, remainingCount);
      relatedRaw = [...relatedRaw, ...otherPicked];
    }

    const formatProduct = (p, overrideCatSlug) => {
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
        categorySlug: overrideCatSlug || (plain.category ? categoryMap[plain.category.trim().toLowerCase()] : null) || (plain.category || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
    };

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

export async function generateStaticParams() {
  try {
    await connectDB();
    const products = await Product.find({ status: { $regex: /^published$/i } })
      .select('slug')
      .lean();
    return products
      .filter((p) => p.slug && typeof p.slug === 'string')
      .map((p) => ({
        slug: p.slug.trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/gi, '').toLowerCase(),
      }));
  } catch (err) {
    console.error("Error generating static params for products:", err);
    return [];
  }
}
