'use client'
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  
  const [typeFilter, setTypeFilter] = useState({
    product: true,
    blog: true
  })

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery)
      fetchResults(initialQuery)
    } else {
      setResults([])
    }
  }, [initialQuery])

  const fetchResults = async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data)
      } else {
        setResults([])
      }
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const filteredResults = results.filter(r => {
    if (r.type === 'product' && !typeFilter.product) return false;
    if (r.type === 'blog' && !typeFilter.blog) return false;
    return true;
  })

  const ResultCard = ({ result, isListView = false }: { result: any; isListView?: boolean }) => (
    <div
      className={`bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${isListView ? "flex" : "flex flex-col"}`}
    >
      <div className={`${isListView ? "w-48 flex-shrink-0" : "aspect-video"}`}>
        <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Badge variant={result.type === 'blog' ? 'secondary' : 'default'} className="mb-2 uppercase text-xs">
              {result.type}
            </Badge>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{result.title}</h3>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{result.description}</p>
        
        {result.specifications && Object.keys(result.specifications).length > 0 && (
          <div className={`grid gap-2 mb-4 ${isListView ? "grid-cols-2" : "grid-cols-1"}`}>
            {Object.entries(result.specifications).slice(0, 3).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize truncate mr-2">{key.replace(/([A-Z])/g, " $1")}:</span>
                <span className="font-medium truncate">{value as string}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="font-semibold text-primary">{result.price}</span>
          <Button size="sm" onClick={() => (window.location.href = result.url)}>
            {result.type === 'blog' ? 'Read Article' : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Results</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </form>
            <div className="flex items-center gap-4">
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none h-10 px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none h-10 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground">
            {loading ? "Searching..." : `${filteredResults.length} results found${initialQuery ? ` for "${initialQuery}"` : ''}`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Simple Filter Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg border shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                <Filter className="h-5 w-5" />
                <h3 className="font-semibold">Filter Results</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Result Type</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-products" 
                        checked={typeFilter.product}
                        onCheckedChange={(checked) => setTypeFilter(prev => ({ ...prev, product: checked as boolean }))}
                      />
                      <Label htmlFor="filter-products" className="cursor-pointer">Products</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-blogs" 
                        checked={typeFilter.blog}
                        onCheckedChange={(checked) => setTypeFilter(prev => ({ ...prev, blog: checked as boolean }))}
                      />
                      <Label htmlFor="filter-blogs" className="cursor-pointer">Articles & Blogs</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-gray-500">Searching...</p>
              </div>
            ) : filteredResults.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredResults.map((result) => (
                  <ResultCard key={result.id} result={result} isListView={viewMode === "list"} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white border rounded-lg shadow-sm">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    router.push('/search')
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
