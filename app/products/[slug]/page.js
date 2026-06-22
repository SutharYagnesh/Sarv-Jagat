export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/sections/product-details"
import { RelatedProducts } from "@/components/sections/related-products"
import { ProductSchema } from "@/components/structured-data"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"

async function getProductData(slug) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug, status: "Published" }).lean();
    if (!product) return { product: null, relatedProducts: [] };

    let categorySlug = (product.category || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (product.category) {
      const categoryDoc = await Category.findOne({ name: product.category }).lean();
      if (categoryDoc && categoryDoc.slug) {
        categorySlug = categoryDoc.slug;
      }
    }

    const relatedProductsRaw = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      status: "Published"
    }).limit(3).lean();

    const formatProduct = (p, catSlug) => {
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
        categorySlug: catSlug || (plain.category || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-')
      };
    };

    return {
      product: formatProduct(product, categorySlug),
      relatedProducts: relatedProductsRaw.map(p => formatProduct(p))
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { product: null, relatedProducts: [] };
  }
}

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
      canonical: `https://sarvjagat.com/products/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.description,
      url: `https://sarvjagat.com/products/${product.slug}`,
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
