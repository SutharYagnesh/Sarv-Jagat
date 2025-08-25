import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In-memory storage with 30-minute expiration
export let inMemoryBlogPosts = [
  {
    id: "1",
    title: "Understanding Industrial Air Compressors",
    slug: "understanding-industrial-air-compressors",
    excerpt: "A comprehensive guide to industrial air compressors and their applications.",
    content: "<p>Industrial air compressors are essential equipment in many manufacturing processes...</p>",
    author: "Sarv Jagat Team",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "published",
    imageUrl: "/sj-blog.png",
    tags: ["air compressors", "industrial", "manufacturing"],
    category: "Equipment"
  },
  {
    id: "2",
    title: "Maintenance Tips for Air Compressors",
    slug: "maintenance-tips-for-air-compressors",
    excerpt: "Essential maintenance practices to extend the life of your air compressor.",
    content: "<p>Regular maintenance is crucial for ensuring the longevity and efficiency of air compressors...</p>",
    author: "Sarv Jagat Team",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "published",
    imageUrl: "/sj-blog.png",
    tags: ["maintenance", "efficiency", "best practices"],
    category: "Maintenance"
  }
];

// Cleanup function to remove posts older than 30 minutes
function cleanupOldPosts() {
  const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
  inMemoryBlogPosts = inMemoryBlogPosts.filter(post => {
    // Skip cleanup for sample posts (id 1 and 2)
    if (post.id === "1" || post.id === "2") return true;
    
    // For dynamically created posts, check timestamp
    const postTimestamp = parseInt(post.id);
    return isNaN(postTimestamp) || postTimestamp > thirtyMinutesAgo;
  });
}

// Run cleanup every minute
setInterval(cleanupOldPosts, 60 * 1000);

// Check if running in Vercel production environment
const isVercelProduction = process.env.VERCEL_ENV === 'production';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    const blogData = {};

    for (const [key, value] of formData.entries()) {
      if (key !== 'image' && !key.endsWith('[]')) {
        blogData[key] = value;
      } else if (key.endsWith('[]')) {
        const baseKey = key.slice(0, -2);
        if (!blogData[baseKey]) {
          blogData[baseKey] = [];
        }
        blogData[baseKey].push(value);
      }
    }

    let imageUrl = null;
    if (image && image.name) {
      // Use local file system for image storage
        const buffer = Buffer.from(await image.arrayBuffer());
        const filename = `${Date.now()}-${image.name}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Save image to local filesystem
        const imagePath = path.join(uploadDir, filename);
        fs.writeFileSync(imagePath, buffer);
        imageUrl = `/uploads/${filename}`;
      }
    

    const newPost = { ...blogData, imageUrl, id: Date.now().toString() }; // Assign a unique ID

    // Add to in-memory array
    inMemoryBlogPosts.push(newPost);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error processing blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    
    // Filter out unpublished posts if not explicitly requested
    const filteredPosts = includeUnpublished 
      ? inMemoryBlogPosts 
      : inMemoryBlogPosts.filter(post => post.status === 'published');
      
    return NextResponse.json({ posts: filteredPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
