import products from "@/data/products.json"
import fs from "fs"
import path from "path"
import products from "@/data/products.json"

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
  const baseUrl = "https://industrialcorp.com"
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

  return [...staticPages, ...productPages]
}

