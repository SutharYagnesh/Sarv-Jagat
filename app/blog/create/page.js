import { PageHero } from "@/components/page-hero"
import { BlogCreateForm } from "@/components/forms/blog-create-form"

export const metadata = {
  title: "Share Your Industrial Insights | Sarv Jagat Corporation Blog",
  description:
    "Share your thoughts, experiences, and insights about industrial air compressors, compressed air applications, and manufacturing processes with the Sarv Jagat community.",
  openGraph: {
    title: "Share Your Industrial Insights | Sarv Jagat Corporation Blog",
    description:
      "Share your thoughts and insights about industrial air compressors and manufacturing processes with the community.",
    images: ["/blog-create-hero.png"],
  },
}

export default function BlogCreatePage() {
  const breadcrumbItems = [{ label: "Blog", href: "/blog" }, { label: "Share Your Insights" }]

  return (
    <>
      <PageHero
        title="Share Your Industrial Insights"
        description="Have valuable insights about air compressors, industrial applications, or manufacturing processes? Share your knowledge with the Sarv Jagat community and help fellow professionals."
        breadcrumbItems={breadcrumbItems}
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BlogCreateForm />
          </div>
        </div>
      </div>
    </>
  )
}
