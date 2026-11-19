export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';
import BlogCatalogClient from '@/components/sections/blog-catalog-client';

export const metadata = {
  title: "Industrial Compressed Air Blog & Case Studies | Sarv Jagat - SJ",
  description: "Read the latest engineering articles, energy efficiency guides, case studies, and supplied industrial compressor installations from Sarv Jagat - SJ.",
  keywords: [
    "Industrial Air Compressor Blog",
    "Compressed Air Case Studies",
    "Screw Compressor Maintenance",
    "VFD Energy Saving",
    "Sarv Jagat",
    "SJ"
  ],
  alternates: {
    canonical: "https://www.sarvjagat.com/blog",
  },
  openGraph: {
    title: "Industrial Compressed Air Blog & Case Studies | Sarv Jagat - SJ",
    description: "Read the latest engineering articles, case studies, and supplied industrial compressor installations from Sarv Jagat - SJ.",
    url: "https://www.sarvjagat.com/blog",
    siteName: "Sarv Jagat - SJ",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png",
        width: 1200,
        height: 630,
        alt: "Sarv Jagat - SJ Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Compressed Air Blog & Case Studies | Sarv Jagat - SJ",
    description: "Read the latest engineering articles and installations from Sarv Jagat - SJ.",
    images: ["https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function BlogPage() {
  await connectDB();
  const blogsRaw = await Blog.find({ status: { $regex: /^published$/i } })
    .select('title slug excerpt imageUrl images publishedAt author category readTime tags status order')
    .sort({ order: 1, publishedAt: -1 })
    .lean();
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
