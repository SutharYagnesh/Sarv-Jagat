import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Blog from "@/lib/models/Blog"
import industries from "../data/industries.json"

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const baseUrl = "https://sarvjagat.com"
  const currentDate = new Date().toISOString()

  let products = []
  let blogs = []

  try {
    await connectDB()
    products = await Product.find({ status: "Published" }).select("slug updatedAt").lean()
    blogs = await Blog.find({ status: "published" }).select("slug updatedAt publishedAt").lean()
  } catch (error) {
    console.error("Failed to fetch products/blogs for sitemap", error)
  }

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt).toISOString() : currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Industry pages
  const industriesPages = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Blog pages
  const blogPages = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : (post.publishedAt ? new Date(post.publishedAt).toISOString() : currentDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  // Dynamically generate solution pages
  const solutionSlugs = [
    "automotive",
    "manufacturing",
    "pharmaceutical",
  ];
  const solutionPages = solutionSlugs.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamically generate service pages
  const serviceSlugs = [
    "installation",
    "amc",
    "technical-support",
    "spare-parts",
  ];
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 1,
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
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productPages,
    ...industriesPages,
    ...solutionPages,
    ...servicePages,
    ...blogPages,
  ];
}