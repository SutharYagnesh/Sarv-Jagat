"use client"

import { useState, useEffect } from "react"

import { BlogFilters } from "@/components/blog-filters"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function BlogList({ search, tag, category }) {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: search || "",
    tag: tag || "all",
    category: category || "all",
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, filters])

  const fetchPosts = async () => {
    try {
      // Use window.location.origin for client components
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      const response = await fetch(`${baseUrl}/api/blog`)
      const data = await response.json()
      const sortedPosts = (data.posts || []).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      setPosts(sortedPosts)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (filters.search) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
          post.content.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.tag !== "all") {
      filtered = filtered.filter((post) => post.tags?.includes(filters.tag))
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((post) => post.category === filters.category)
    }

    setFilteredPosts(filtered)
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading posts...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BlogFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              posts={posts}
              resultCount={filteredPosts.length}
            />
          </div>

          {/* Posts Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {filters.category !== "all"
                  ? `${filters.category} Posts`
                  : filters.tag !== "all"
                    ? `Posts tagged "${filters.tag}"`
                    : "All Posts"}
              </h2>
              <p className="text-muted-foreground">
                {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No posts found matching your criteria.</p>
                <Button variant="outline" onClick={() => setFilters({ search: "", tag: "all", category: "all" })}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 mb-12">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-card p-6 rounded-lg shadow-md">
                      <a href={`/blog/${post.slug || post.id}`} className="block">
                        {post.imageUrl && (
                          <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
                        )}
                        <h3 className="text-3xl font-bold text-foreground mb-2 hover:text-primary transition-colors">{post.title}</h3>
                      </a>
                      <p className="text-muted-foreground text-sm mb-4">
                        By {post.author?.name || "Unknown Author"} on {new Date(post.publishedAt).toLocaleDateString()}
                        {post.readTime && ` • ${post.readTime} min read`}
                      </p>
                      <p className="mb-4">{post.excerpt}</p>
                      <a href={`/blog/${post.slug || post.id}`} className="text-primary font-medium hover:underline">Read more</a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
