import { BlogCard } from "@/components/blog-card"
import fs from "fs"
import path from "path"

async function getRelatedPosts(currentPost) {
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
      .filter((post) => post.status === "published" && post.id !== currentPost.id)

    // Find related posts based on tags and category
    const relatedPosts = posts
      .map((post) => {
        let score = 0
        if (post.category === currentPost.category) score += 3
        if (post.tags?.some((tag) => currentPost.tags?.includes(tag))) score += 2
        return { ...post, score }
      })
      .filter((post) => post.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    return relatedPosts
  } catch (error) {
    return []
  }
}

export async function RelatedPosts({ currentPost }) {
  const relatedPosts = await getRelatedPosts(currentPost)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Related Articles</h2>
          <p className="text-lg text-muted-foreground">Continue reading with these related posts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
