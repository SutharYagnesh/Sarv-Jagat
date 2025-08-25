import { PageHero } from "@/components/page-hero";
import { BlogContent } from "@/components/sections/blog-content";
import { RelatedPosts } from "@/components/sections/related-posts";
import { notFound } from "next/navigation";

async function getBlogPost(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found | Sarv Jagat Corporation Blog",
      description: "The requested blog post could not be found.",
    };
  }
  
  return {
    title: `${post.title} | Sarv Jagat Corporation Blog`,
    description: post.excerpt || `Read about ${post.title} on the Sarv Jagat Corporation blog.`,
    keywords: post.tags || [],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author?.name],
      tags: post.tags,
      images: [post.imageUrl || "/blog-default-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl || "/blog-default-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post || post.status !== "published") {
    notFound();
  }
  
  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <PageHero
        title={post.title}
        description={post.excerpt}
        breadcrumbItems={breadcrumbItems}
        backgroundImage={post.imageUrl}
      />
      <BlogContent post={post} />
      <RelatedPosts currentPost={post} />
    </>
  );
}