import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';
import BlogCatalogClient from '@/components/sections/blog-catalog-client';

export const metadata = {
  title: "Blog | Sarv Jagat Corporation",
  description: "Read the latest news, articles, and insights from Sarv Jagat Corporation.",
};

export default async function BlogPage() {
  await connectDB();
  const blogsRaw = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(blogsRaw));

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
