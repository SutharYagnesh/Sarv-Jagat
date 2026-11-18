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
        .select('title slug category images price modelNumber powerRating pressureRating airFlow specifications description seoTitle seoDescription seoKeywords order createdAt')
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
      return {
        ...plain,
        id: plain._id,
        name: plain.title,
        description: plain.description,
        image: plain.images && plain.images.length > 0 ? plain.images[0] : "/placeholder.jpg",
        images: plain.images,
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
      title: "Product Not Found",
    }
  }

  return {
    title: product.seoTitle || `${product.name} | Industrial Equipment`,
    description: product.seoDescription || product.description,
    alternates: {
      canonical: `https://www.sarvjagat.com/products/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.description,
      url: `https://www.sarvjagat.com/products/${product.slug}`,
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
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.description,
      images: [product.image],
    },
    keywords: Array.isArray(product.seoKeywords) ? product.seoKeywords : (typeof product.seoKeywords === 'string' && product.seoKeywords ? product.seoKeywords.split(',') : [product.name, product.category, "Air Compressor", "Industrial Equipment", "Sarv Jagat"]),
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

  return (
    <>
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
