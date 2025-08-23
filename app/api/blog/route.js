import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const BLOG_DIR = path.join(process.cwd(), "data", "blog")

// Ensure blog directory exists
function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

// Get all blog posts
export async function GET(request) {
  try {
    ensureBlogDir()

    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get("includeUnpublished") === "true"

    const files = fs.readdirSync(BLOG_DIR)
    const posts = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        try {
          const filePath = path.join(BLOG_DIR, file)
          const fileContent = fs.readFileSync(filePath, "utf8")
          return JSON.parse(fileContent)
        } catch (error) {
          console.error(`Error reading blog post ${file}:`, error)
          return null
        }
      })
      .filter((post) => post !== null)
      .filter((post) => includeUnpublished || post.status === "published")
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// Create new blog post
export async function POST(request) {
  try {
    ensureBlogDir()

    const postData = await request.json()

    // Validation
    if (!postData.title || !postData.slug || !postData.content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 })
    }

    // Generate ID if not provided
    const postId = postData.id || postData.slug
    const fileName = `${postId}.json`
    const filePath = path.join(BLOG_DIR, fileName)

    // Check if post already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post with this slug already exists" }, { status: 409 })
    }

    // Prepare post data
    const now = new Date().toISOString()
    const post = {
      id: postId,
      ...postData,
      publishedAt: postData.publishedAt || now,
      updatedAt: now,
    }

    // Write to file
    try {
      fs.writeFileSync(filePath, JSON.stringify(post, null, 2))
      console.log(`[API] Created blog post: ${postId}`)

      return NextResponse.json({ post }, { status: 201 })
    } catch (writeError) {
      console.error("Failed to write blog post to file:", writeError)

      // Fallback notice for client
      return NextResponse.json(
        {
          error: "File write not available. Please use localStorage fallback.",
          fallback: true,
          post,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
