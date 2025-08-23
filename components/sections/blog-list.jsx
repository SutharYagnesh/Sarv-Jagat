"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { BlogFilters } from "@/components/blog-filters"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function BlogList({ searchParams }) {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: searchParams?.search || "",
    tag: searchParams?.tag || "all",
    category: searchParams?.category || "all",
  })

  const postsPerPage = 6

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, filters])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      const data = await response.json()
      setPosts(data.posts || [])
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
    setCurrentPage(1)
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {currentPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="px-4 py-2 text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
