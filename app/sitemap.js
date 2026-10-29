import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Blog from "@/lib/models/Blog"
import Category from "@/lib/models/Category"
import Catalog from "@/lib/models/Catalog"
import industries from "../data/industries.json"

export const dynamic = 'force-dynamic';

function toAbsoluteUrl(url, baseUrl) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `${baseUrl}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com"
  const currentDate = new Date().toISOString()

  let products = []
  let blogs = []
  let categories = []
  let catalogs = []

  try {
    await connectDB()
    products = await Product.find({ status: "Published" })
      .select("slug updatedAt createdAt images")
      .lean()
    blogs = await Blog.find({ status: "published" })
      .select("slug updatedAt publishedAt createdAt imageUrl images")
      .lean()
    categories = await Category.find({})
      .select("slug updatedAt createdAt")
      .lean()
    catalogs = await Catalog.find({ status: "Published" })
      .select("slug updatedAt createdAt coverImage")
      .lean()
  } catch (error) {
    console.error("Failed to fetch data for sitemap", error)
  }

  // Core static pages with high-value images for Google Search & Google Lens indexing
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/Sarv%20Jagat_Logo_Red_11.png`,
        `${baseUrl}/logo.png`,
      ],
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dealers`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]

  // Product pages (High Priority for Google Search, Lens & Shopping) with image extensions
  const productPages = products.map((product) => {
    const rawImages = Array.isArray(product.images) ? product.images : [];
    const validImages = rawImages
      .map((img) => toAbsoluteUrl(img, baseUrl))
      .filter(Boolean);

    return {
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : product.createdAt
        ? new Date(product.createdAt).toISOString()
        : currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
      ...(validImages.length > 0 ? { images: validImages } : {}),
    };
  });

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/products/category/${category.slug}`,
    lastModified: category.updatedAt ? new Date(category.updatedAt).toISOString() : currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  // Blog pages (Supplied items & case studies - High Priority for Google Search, Images & Shopping)
  const blogPages = blogs.map((post) => {
    const rawList = [post.imageUrl, ...(Array.isArray(post.images) ? post.images : [])];
    const uniqueRaw = Array.from(new Set(rawList));
    const validImages = uniqueRaw
      .map((img) => toAbsoluteUrl(img, baseUrl))
      .filter(Boolean);

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      ...(validImages.length > 0 ? { images: validImages } : {}),
    };
  });

  // Industry pages
  const industriesPages = (industries || []).map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  // Solution pages
  const solutionSlugs = [
    "automotive",
    "manufacturing",
    "pharmaceutical",
  ]
  const solutionPages = solutionSlugs.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  // Service pages
  const serviceSlugs = [
    "installation",
    "amc",
    "technical-support",
    "spare-parts",
  ]
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...blogPages,
    ...industriesPages,
    ...solutionPages,
    ...servicePages,
  ]
}
