export const revalidate = 60;
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';
import BlogCatalogClient from '@/components/sections/blog-catalog-client';
import { fetchWithCache } from '@/lib/memoryCache';

export const metadata = {
  title: "Industrial Compressed Air Blog & Supplied Items | Sarv Jagat Corporation",
  description: "Read the latest news, case studies, and supplied industrial compressor installations from Sarv Jagat Corporation.",
  alternates: {
    canonical: "https://www.sarvjagat.com/blog",
  },
  openGraph: {
    title: "Industrial Compressed Air Blog & Supplied Items | Sarv Jagat Corporation",
    description: "Read the latest news, case studies, and supplied industrial compressor installations from Sarv Jagat Corporation.",
    url: "https://www.sarvjagat.com/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = await fetchWithCache('public_blog_page', async () => {
    await connectDB();
    const blogsRaw = await Blog.find({ status: { $regex: /^published$/i } })
      .select('title slug excerpt imageUrl images publishedAt author category readTime tags status order')
      .sort({ order: 1, publishedAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(blogsRaw));
  }, 120);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground">Blog</span>
        </div>

        <div className="space-y-16">
          <BlogCatalogClient blogs={blogs} />
        </div>
      </div>
    </div>
  )
}
