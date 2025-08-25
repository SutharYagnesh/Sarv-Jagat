import { BlogList } from "@/components/sections/blog-list"
import { PageHero } from "@/components/page-hero"

export async function generateMetadata() {
  let posts = [];
  try {
    // For server components, we need to use an absolute URL with the host
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // Skip metadata fetching if no base URL is available in server component
    if (baseUrl) {
      const response = await fetch(`${baseUrl}/api/blog`);
      const data = await response.json();
      posts = data.posts || [];
    }
  } catch (error) {
    console.error("Failed to fetch posts for metadata:", error);
  }

  const allKeywords = Array.from(new Set(posts.flatMap(post => post.tags || [])));
  const combinedDescription = posts.map(post => post.excerpt).join(" ").substring(0, 160);

  return {
    title: "Blog | Sarv Jagat Corporation - Industrial Air Compressor Insights",
    description: combinedDescription || "Stay updated with the latest insights, trends, and news in industrial air compressors, compressed air technology, and equipment maintenance from Sarv Jagat Corporation experts.",
    keywords: allKeywords.length > 0 ? allKeywords : [
      "industrial air compressor", "compressed air technology", "equipment maintenance",
      "air compressor insights", "industrial news", "Sarv Jagat Corporation blog"
    ],
    openGraph: {
      title: "Blog | Sarv Jagat Corporation - Industrial Air Compressor Insights",
      description: combinedDescription || "Stay updated with the latest insights, trends, and news in industrial air compressors, compressed air technology, and equipment maintenance.",
      images: ["/sarv-jagat-blog-hero.png"],
    },
  };
}

export default async function BlogPage({ searchParams }) {
  const { search, tag, category } = await searchParams || {};
  const breadcrumbItems = [{ label: "Blog" }]

  return (
    <>
      <PageHero
        title="Industrial Air Compressor Insights"
        description="Stay updated with the latest trends, insights, and best practices in industrial air compressors, compressed air technology, maintenance tips, and industry applications from Sarv Jagat Corporation experts."
        breadcrumbItems={breadcrumbItems}
      />
      <BlogList search={search} tag={tag} category={category} />
    </>
  )
}
