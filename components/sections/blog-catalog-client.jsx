"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export default function BlogCatalogClient({ blogs }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-6 rounded-full border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold text-red-600">Latest Articles</h2>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? `No articles found matching "${searchTerm}"` : "No blog posts available at the moment."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBlogs.map((blog, idx) => (
              <Link key={idx} href={`/blog/${blog.slug}`} className="block group">
                <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="relative aspect-square p-4 flex items-center justify-center bg-gray-50 border-b overflow-hidden group-hover:bg-gray-100 transition-colors">
                    <img
                      src={blog.imageUrl || "/placeholder.svg"}
                      alt={blog.title}
                      className="max-h-full object-contain w-full h-full"
                    />
                  </div>

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
  );
}
