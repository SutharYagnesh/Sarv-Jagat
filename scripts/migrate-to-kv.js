// Script to migrate blog posts from file system to Vercel KV
// Run this script after deploying to Vercel to migrate your existing blog posts

const fs = require('fs').promises;
const path = require('path');
const { kv } = require('@vercel/kv');

const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog', 'posts.json');
const KV_BLOG_KEY = 'blog_posts';

async function migrateBlogPosts() {
  try {
    console.log('Starting migration of blog posts to Vercel KV...');
    
    // Read blog posts from file system
    const data = await fs.readFile(BLOG_POSTS_FILE, 'utf8');
    const posts = JSON.parse(data);
    
    console.log(`Found ${posts.length} blog posts to migrate`);
    
    // Store blog posts in Vercel KV
    await kv.set(KV_BLOG_KEY, posts);
    
    console.log('Migration completed successfully!');
    
    // Verify migration
    const migratedPosts = await kv.get(KV_BLOG_KEY);
    console.log(`Verified ${migratedPosts.length} posts in KV storage`);
  } catch (error) {
    console.error('Error migrating blog posts:', error);
  }
}

migrateBlogPosts();