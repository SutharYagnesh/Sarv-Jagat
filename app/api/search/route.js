import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';

export const dynamic = 'force-dynamic';

function stripHtml(text) {
  if (!text) return '';
  return text
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/div>/gi, ' ')
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return NextResponse.json([]);
    }

    const regex = new RegExp(query.trim(), 'i');

    // Search Products
    const productsRaw = await Product.find({
      $and: [
        { status: { $regex: /^published$/i } },
        {
          $or: [
            { title: regex },
            { description: regex },
            { category: regex },
            { modelNumber: regex },
            { powerRating: regex },
            { pressureRating: regex },
            { airFlow: regex },
            { 'specifications.value': regex },
            { 'specifications.key': regex }
          ]
        }
      ]
    }).lean();

    const formattedProducts = productsRaw.map(p => ({
      id: p._id.toString(),
      type: 'product',
      title: p.title,
      description: stripHtml(p.description) || p.title,
      category: p.category || 'Product',
      image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.jpg',
      url: `/products/${p.slug}`,
      specifications: p.specifications ? p.specifications.reduce((acc, curr) => {
        if (curr.key && curr.value) acc[curr.key] = curr.value;
        return acc;
      }, {}) : {},
      price: p.price && Number(p.price) > 1 ? `₹ ${Number(p.price).toLocaleString('en-IN')}` : 'Ask for Price',
      date: p.createdAt
    }));

    // Search Blogs
    const blogsRaw = await Blog.find({
      $and: [
        { status: { $regex: /^published$/i } },
        {
          $or: [
            { title: regex },
            { excerpt: regex },
            { content: regex },
            { tags: regex },
            { category: regex }
          ]
        }
      ]
    }).lean();

    const formattedBlogs = blogsRaw.map(b => ({
      id: b._id.toString(),
      type: 'blog',
      title: b.title,
      description: stripHtml(b.excerpt || b.content || b.title),
      category: 'Blog Article',
      image: b.imageUrl || (b.images && b.images.length > 0 ? b.images[0] : '/placeholder.svg'),
      url: `/blog/${b.slug}`,
      specifications: {
        'Read Time': `${b.readTime || 5} min read`,
        'Category': b.category || 'General',
        'Tags': b.tags ? b.tags.join(', ') : 'None'
      },
      price: '',
      date: b.publishedAt || b.createdAt
    }));

    // Combine and sort by date (newest first)
    const combinedResults = [...formattedProducts, ...formattedBlogs].sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json(combinedResults);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
