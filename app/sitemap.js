import allProducts from "@/data/products.json"
import fs from "fs"
import path from "path"
import products from "@/data/products.json"
import industries from "../data/industries.json"

async function getAllBlogPosts() {
  try {
    const blogDir = path.join(process.cwd(), "data", "blog")
    const files = fs.readdirSync(blogDir)
    const posts = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const filePath = path.join(blogDir, file)
        const fileContent = fs.readFileSync(filePath, "utf8")
        return JSON.parse(fileContent)
      })
      .filter((post) => post.status === "published")

    return posts
  } catch (error) {
    return []
  }
}

export default async function sitemap() {
  const baseUrl = "https://sarvjagat.com"
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
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
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]

  // Product pages
    const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: currentDate,
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
  const blogPosts = await getAllBlogPosts()
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
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
    lastModified: new Date(),
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
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));



  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
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