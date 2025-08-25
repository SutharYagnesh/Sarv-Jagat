import fs from 'fs/promises';
import path from 'path';
import { dbConnect, BlogPost } from '../lib/dbConnect.js';

const postsFilePath = path.join(process.cwd(), 'data', 'blog', 'posts.json');

async function migrateBlogPosts() {
  await dbConnect();
  console.log('Connected to MongoDB');

  try {
    const data = await fs.readFile(postsFilePath, 'utf8');
    const posts = JSON.parse(data);

    for (const post of posts) {
      // Check if post already exists to prevent duplicates on re-run
      const existingPost = await BlogPost.findOne({ id: post.id });
      if (!existingPost) {
        const newPost = {
          ...post,
          date: post.publishedAt, // Map publishedAt to date
          author: JSON.parse(post.author) // Parse author string to object
        };
        await BlogPost.create(newPost);
        console.log(`Migrated post: ${post.title}`);
      } else {
        console.log(`Post already exists, skipping: ${post.title}`);
      }
    }
    console.log('Blog post migration completed.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No posts.json found, skipping migration.');
    } else {
      console.error('Error during blog post migration:', error);
    }
  } finally {
    // Disconnect after migration if not in a persistent environment
    // mongoose.connection.close(); // Uncomment if you want to close connection immediately
  }
}

migrateBlogPosts();