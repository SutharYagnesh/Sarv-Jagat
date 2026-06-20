import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';

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
          <section className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-2xl font-semibold text-red-600">Latest Articles</h2>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No blog posts available at the moment.
              </div>
            ) : (
              /* Blog Grid - 4 Columns matching Product layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {blogs.map((blog, idx) => (
                  <Link key={idx} href={`/blog/${blog.slug}`} className="block group">
                    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 h-full">
                      {/* Image Section */}
                      <div className="relative aspect-square p-4 flex items-center justify-center bg-gray-50 border-b overflow-hidden group-hover:bg-gray-100 transition-colors">
                        <img
                          src={blog.imageUrl || "/placeholder.svg"}
                          alt={blog.title}
                          className="max-h-full object-contain w-full h-full"
                        />
                        {/* Optional side logo tag, similar to reference */}
                        {/* <div className="absolute left-2 top-0 bottom-0 flex items-center"> */}
                           {/* <div className="bg-black text-white text-xs font-bold px-1 py-4 uppercase tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}> */}
                            {/* Sarv Jagat */}
                          {/* </div> // */}
                        {/* </div> */}
                      </div>

                      {/* Content Section */}
                      <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 font-medium">{new Date(blog.publishedAt).toLocaleDateString()}</p>
                          <h3 className="font-medium text-sm line-clamp-2 h-10 group-hover:text-red-600 transition-colors">{blog.title}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 mt-auto pt-2">
                          <Button asChild className="w-full bg-slate-900 group-hover:bg-red-600 text-white text-xs px-2 transition-colors">
                            <span>Read Article</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
