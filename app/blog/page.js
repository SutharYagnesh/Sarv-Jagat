import { BlogList } from "@/components/sections/blog-list"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "Blog | Sarv Jagat Corporation - Industrial Air Compressor Insights",
  description:
    "Stay updated with the latest insights, trends, and news in industrial air compressors, compressed air technology, and equipment maintenance from Sarv Jagat Corporation experts.",
  openGraph: {
    title: "Blog | Sarv Jagat Corporation - Industrial Air Compressor Insights",
    description:
      "Stay updated with the latest insights, trends, and news in industrial air compressors, compressed air technology, and equipment maintenance.",
    images: ["/sarv-jagat-blog-hero.png"],
  },
}

export default function BlogPage({ searchParams }) {
  const breadcrumbItems = [{ label: "Blog" }]

  return (
    <>
      <PageHero
        title="Industrial Air Compressor Insights"
        description="Stay updated with the latest trends, insights, and best practices in industrial air compressors, compressed air technology, maintenance tips, and industry applications from Sarv Jagat Corporation experts."
        breadcrumbItems={breadcrumbItems}
      />
      <BlogList searchParams={searchParams} />
    </>
  )
}
