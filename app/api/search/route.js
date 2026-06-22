import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return NextResponse.json([]);
    }

    const regex = new RegExp(query, 'i');

    // Search Products
    const productsRaw = await Product.find({
      status: 'Published',
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { modelNumber: regex },
        { 'specifications.value': regex }
      ]
    }).lean();

    const formattedProducts = productsRaw.map(p => ({
      id: p._id.toString(),
      type: 'product',
      title: p.title,
      description: p.description,
      category: p.category || 'Product',
      image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.jpg',
      url: `/products/${p.slug}`,
      specifications: p.specifications ? p.specifications.reduce((acc, curr) => {
        if (curr.key && curr.value) acc[curr.key] = curr.value;
        return acc;
      }, {}) : {},
      price: p.price ? `₹ ${p.price}` : 'Price on Request',
      date: p.createdAt
    }));

    // Search Blogs
    const blogsRaw = await Blog.find({
      status: 'published',
      $or: [
        { title: regex },
        { excerpt: regex },
        { content: regex },
        { tags: regex },
        { category: regex }
      ]
    }).lean();

    const formattedBlogs = blogsRaw.map(b => ({
      id: b._id.toString(),
      type: 'blog',
      title: b.title,
      description: b.excerpt || b.title,
      category: 'Blog Article',
      image: b.imageUrl || '/placeholder.svg',
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
