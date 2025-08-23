import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const BLOG_DIR = path.join(process.cwd(), "data", "blog")

// Get single blog post
export async function GET(request, { params }) {
  try {
    const filePath = path.join(BLOG_DIR, `${params.id}.json`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const post = JSON.parse(fileContent)

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// Update blog post
export async function PUT(request, { params }) {
  try {
    const postData = await request.json()
    const filePath = path.join(BLOG_DIR, `${params.id}.json`)

    // Validation
    if (!postData.title || !postData.slug || !postData.content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 })
    }

    // Check if post exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Update post data
    const updatedPost = {
      ...postData,
      id: params.id,
      updatedAt: new Date().toISOString(),
    }

    // Write to file
    try {
      fs.writeFileSync(filePath, JSON.stringify(updatedPost, null, 2))
      console.log(`[API] Updated blog post: ${params.id}`)

      return NextResponse.json({ post: updatedPost })
    } catch (writeError) {
      console.error("Failed to write blog post to file:", writeError)

      // Fallback notice for client
      return NextResponse.json(
        {
          error: "File write not available. Please use localStorage fallback.",
          fallback: true,
          post: updatedPost,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// Delete blog post
export async function DELETE(request, { params }) {
  try {
    const filePath = path.join(BLOG_DIR, `${params.id}.json`)

    // Check if post exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Delete file
    try {
      fs.unlinkSync(filePath)
      console.log(`[API] Deleted blog post: ${params.id}`)

      return NextResponse.json({ message: "Post deleted successfully" })
    } catch (deleteError) {
      console.error("Failed to delete blog post file:", deleteError)

      return NextResponse.json(
        {
          error: "File deletion not available. Please use localStorage fallback.",
          fallback: true,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
