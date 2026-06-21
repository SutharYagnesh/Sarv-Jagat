export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Blog from "@/lib/models/Blog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, Youtube, Instagram, Chrome } from "lucide-react";
import { ArticleSchema } from "@/components/structured-data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    return { title: "Blog Not Found" }
  }

  return {
    title: `${blog.title} | Sarv Jagat Corporation Blog`,
    description: blog.excerpt || blog.title,
    alternates: {
      canonical: `https://sarvjagat.com/blog/${slug}`,
    },
    openGraph: {
      title: `${blog.title} | Sarv Jagat Corporation`,
      description: blog.excerpt || blog.title,
      url: `https://sarvjagat.com/blog/${slug}`,
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt || blog.publishedAt,
      authors: [blog.author?.name || "Sarv Jagat"],
      images: blog.imageUrl ? [
        {
          url: blog.imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: blog.imageUrl ? [blog.imageUrl] : [],
    },
    keywords: blog.tags ? blog.tags : ["Air Compressors", "Industrial Blog", "Sarv Jagat"],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  await connectDB();
  
  const blogRaw = await Blog.findOne({ slug }).lean();
  if (!blogRaw) {
    notFound();
  }
  
  const blog = JSON.parse(JSON.stringify(blogRaw));

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <ArticleSchema post={blog} />
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>&gt;</span>
          <Link href="/blog" className="hover:text-red-600">Blog</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">{blog.title}</span>
        </div>

        {/* White container for the top section (Matching Product Details Theme) */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Image (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="border rounded-sm p-4 flex items-center justify-center bg-white aspect-square relative hover:border-gray-300 transition-colors overflow-hidden">
                <img
                  src={blog.imageUrl || "/placeholder.svg"}
                  alt={blog.title}
                  className="max-h-full object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Right: Details (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-2xl font-serif text-gray-800 tracking-tight">{blog.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-100">
                <BadgeItem icon={<Calendar className="w-4 h-4 mr-1 text-red-600" />} text={new Date(blog.publishedAt).toLocaleDateString()} />
                {blog.category && <BadgeItem icon={<Tag className="w-4 h-4 mr-1 text-red-600" />} text={blog.category} />}
              </div>

              {/* Quick Info Table */}
              <div className="py-2">
                <table className="w-full text-sm text-gray-700">
                  <tbody>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-500 w-1/3">Read Time</td>
                      <td className="py-3 font-semibold">{blog.readTime || 5} min read</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-500">Status</td>
                      <td className="py-3 font-semibold capitalize">{blog.status}</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-500">Tags</td>
                      <td className="py-3 font-semibold">
                        {blog.tags && blog.tags.length > 0 ? blog.tags.join(', ') : "None"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 items-center">
                <span className="font-medium text-gray-600 flex items-center"><Share2 className="w-4 h-4 mr-2"/> Follow Us:</span>
                <a href="https://www.facebook.com/share/1JEhBDE3mE/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full text-[#1877F2] border-[#1877F2] hover:bg-[#1877F2] hover:text-white">
                    <Facebook className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://twitter.com/sarvjagat" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full text-[#1DA1F2] border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://www.linkedin.com/company/sarvjagat/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full text-[#0A66C2] border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://www.youtube.com/@SarvJagat" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full text-[#FF0000] border-[#FF0000] hover:bg-[#FF0000] hover:text-white">
                    <Youtube className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://www.instagram.com/sarvjagat" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full text-[#E4405F] border-[#E4405F] hover:bg-[#E4405F] hover:text-white">
                    <Instagram className="w-4 h-4" />
                  </Button>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Google">
                  <Button variant="outline" size="icon" className="rounded-full text-[#DB4437] border-[#DB4437] hover:bg-[#DB4437] hover:text-white">
                    <Chrome className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Blog Content (Matching Product Description section) */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-serif text-gray-800 border-b border-gray-200 pb-4 mb-6">Article Overview</h2>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: blog.content }}>
          </div>

          {/* Media Section */}
          {(blog.images?.length > 0 || blog.instagramLink || blog.youtubeLink || (blog.videos && blog.videos.length > 0)) && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-serif text-gray-800 mb-6">Gallery & Media</h3>
              <div className="space-y-8">
                {blog.images && blog.images.length > 0 && (
                  <div>
                    <h4 className="text-lg font-serif text-gray-700 mb-4">Project Gallery</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {blog.images.map((img, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden border shadow-sm">
                          <img src={img} alt={`${blog.title} gallery image ${idx+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {blog.instagramLink && (
                  <div className="flex justify-center my-6">
                    <Button asChild className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white rounded-full px-8 py-6 text-lg font-medium shadow-md">
                      <a href={blog.instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Instagram className="w-5 h-5 mr-2" />
                        View Original Instagram Post
                      </a>
                    </Button>
                  </div>
                )}

                {blog.youtubeLink && (() => {
                  const match = blog.youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                  const videoId = match ? match[1] : null;
                  if (videoId) {
                    return (
                      <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border shadow-sm bg-black">
                        <iframe 
                          src={`https://www.youtube.com/embed/${videoId}`}
                          className="w-full h-full"
                          allowFullScreen
                          title={`${blog.title} YouTube Video`}
                        />
                      </div>
                    );
                  }
                  return null;
                })()}

                {blog.videos && blog.videos.length > 0 && blog.videos[0] && (
                  <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border shadow-sm bg-black">
                    <video 
                      src={blog.videos[0]} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-8 text-center mt-10">
             <h3 className="text-lg font-serif text-gray-800 mb-4">Interested in our Air Compressors?</h3>
             <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-10 py-6 text-lg font-medium shadow-sm">
                <Link href="/products">
                  Explore Products
                </Link>
             </Button>
          </div>
        </div>

      </div>
    </section>
  )
}

function BadgeItem({ icon, text }) {
  return (
    <div className="flex items-center text-sm font-medium text-gray-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
      {icon}
      {text}
    </div>
  )
}