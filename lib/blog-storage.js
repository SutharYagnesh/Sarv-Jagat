import fs from 'fs/promises';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'data', 'blog', 'posts.json');

export async function readBlogPosts() {
  try {
    const data = await fs.readFile(postsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, return an empty array
      return [];
    }
    throw error;
  }
}

export async function writeBlogPosts(posts) {
  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
}