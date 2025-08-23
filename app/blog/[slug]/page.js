import { notFound } from "next/navigation"
import { BlogPost } from "@/components/sections/blog-post"
import { RelatedPosts } from "@/components/sections/related-posts"
import fs from "fs"
import path from "path"
import { ArticleSchema } from "@/components/structured-data"

async function getBlogPost(slug) {
  try {
    const filePath = path.join(process.cwd(), "data", "blog", `${slug}.json`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContent)
  } catch (error) {
    return null
  }
}

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
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    return posts
  } catch (error) {
    return []
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | IndustrialCorp Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://industrialcorp.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://industrialcorp.com/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <ArticleSchema post={post} />
      <BlogPost post={post} />
      <RelatedPosts currentPost={post} />
    </>
  )
}
