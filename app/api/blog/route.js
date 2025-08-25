import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { dbConnect, BlogPost } from '../../../lib/dbConnect';

// Check if running in Vercel production environment
const isVercelProduction = process.env.VERCEL_ENV === 'production';

// Cleanup function to remove posts older than 30 minutes
async function cleanupOldPosts() {
  await dbConnect();
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  try {
    // Find posts that are not sample posts (id 1 and 2) and have expired
    const expiredPosts = await BlogPost.find({
      id: { $nin: ["1", "2"] },
      expiresAt: { $lt: thirtyMinutesAgo }
    });

    if (expiredPosts.length > 0) {
      const deletedCount = await BlogPost.deleteMany({
        _id: { $in: expiredPosts.map(post => post._id) }
      });
      console.log(`Cleaned up ${deletedCount.deletedCount} expired posts.`);
    }
  } catch (error) {
    console.error('Error during blog post cleanup:', error);
  }
}

// Run cleanup every minute
setInterval(cleanupOldPosts, 60 * 1000);

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
    

    await dbConnect();

    const newPost = {
      ...blogData,
      imageUrl,
      id: Date.now().toString(), // Assign a unique ID
      publishedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000) // Set expiration for 30 minutes from now
    };

    // Ensure author is an object
    if (typeof newPost.author === 'string') {
      try {
        newPost.author = JSON.parse(newPost.author);
      } catch (e) {
        console.error('Failed to parse author string:', e);
        // Fallback or error handling if author string is not valid JSON
        newPost.author = { name: newPost.author, email: '', company: '', avatar: '/placeholder-user.jpg' };
      }
    }

    await BlogPost.create(newPost);

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
    await dbConnect();
    let query = {};
    if (!includeUnpublished) {
      query.status = 'published';
    }
    const allPosts = await BlogPost.find(query).lean(); // .lean() for plain JavaScript objects

    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
