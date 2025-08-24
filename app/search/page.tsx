

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductFilter from "@/components/search/product-filter"

export async function generateMetadata() {
  return {
    title: "Search Products | Sarv Jagat",
    description: "Search our comprehensive range of air compressors, dryers, and accessories. Find the perfect solution for your industrial needs.",
    keywords: ["air compressor search", "industrial equipment", "compressor finder", "Sarv Jagat products"],
    openGraph: {
      title: "Search Products | Sarv Jagat",
      description: "Search our comprehensive range of air compressors, dryers, and accessories.",
      url: "https://sarvjagat.com/search",
      siteName: "Sarv Jagat",
      images: [
        {
          url: "/og-search.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  }
}

// Mock search results data
const searchResults = [
  {
    id: "sj-fs-75",
    title: "SJ Fixed Speed Screw Compressor 75HP",
    category: "Screw Compressors",
    image: "/sj-fixed-speed-screw-compressor.png",
    description: "High-efficiency fixed speed screw compressor with advanced cooling system and digital controls.",
    specifications: {
      power: "75 HP",
      pressure: "8-13 Bar",
      capacity: "420 CFM",
      drive: "Direct Drive",
    },
    price: "Contact for Quote",
    url: "/products/screw/fixed-speed",
  },
  {
    id: "sj-vs-100",
    title: "SJ Variable Speed Screw Compressor 100HP",
    category: "Screw Compressors",
    image: "/sj-variable-speed-screw-compressor.png",
    description: "Energy-efficient VSD compressor with automatic speed adjustment and remote monitoring.",
    specifications: {
      power: "100 HP",
      pressure: "7-13 Bar",
      capacity: "560 CFM",
      drive: "Variable Speed",
    },
    price: "Contact for Quote",
    url: "/products/screw/variable-speed",
  },
  {
    id: "sj-piston-25",
    title: "SJ Two Stage Piston Compressor 25HP",
    category: "Piston Compressors",
    image: "/piston-compressor-range.png",
    description: "Robust two-stage piston compressor for high pressure applications.",
    specifications: {
      power: "25 HP",
      pressure: "10-16 Bar",
      capacity: "140 CFM",
      drive: "Belt Drive",
    },
    price: "Contact for Quote",
    url: "/products/piston/two-stage",
  },
  {
    id: "sj-oilfree-50",
    title: "SJ Oil-Free Screw Compressor 50HP",
    category: "Oil-Free Compressors",
    image: "/specialized-compressor-solutions.png",
    description: "Clean air solution for pharmaceutical and food processing applications.",
    specifications: {
      power: "50 HP",
      pressure: "7-10 Bar",
      capacity: "280 CFM",
      drive: "Direct Drive",
    },
    price: "Contact for Quote",
    url: "/products/oil-free",
  },
  {
    id: "sj-dryer-100",
    title: "SJ Refrigerated Air Dryer 100CFM",
    category: "Accessories",
    image: "/air-compressor-accessories.png",
    description: "High-efficiency refrigerated air dryer for moisture removal.",
    specifications: {
      power:"0",
      capacity: "100 CFM",
      dewPoint: "3°C",
      pressure: "16 Bar",
      cooling: "Air Cooled",
    },
    price: "Contact for Quote",
    url: "/products/accessories/air-dryers",
  },
  {
    id: "sj-tank-500",
    title: "SJ Air Receiver Tank 500L",
    category: "Accessories",
    image: "/air-compressor-accessories.png",
    description: "Vertical air receiver tank with safety valve and drain.",
    specifications: {
      power : "0",
      volume: "500 Liters",
      pressure: "16 Bar",
      material: "Carbon Steel",
      mounting: "Vertical",
    },
    price: "Contact for Quote",
    url: "/products/accessories/air-tanks",
  },
]

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredResults, setFilteredResults] = useState(searchResults)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

  // Filter results based on search query and filters
  useEffect(() => {
    let results = searchResults

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          Object.values(item.specifications).some((spec) => spec.toLowerCase().includes(query)),
      )
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([filterType, values]) => {
      if (values.length > 0 && filterType !== "search") {
        results = results.filter((item) => {
          switch (filterType) {
            case "productType":
              return values.some((value) => {
                switch (value) {
                  case "screw-compressor":
                    return item.category.includes("Screw")
                  case "piston-compressor":
                    return item.category.includes("Piston")
                  case "oil-free":
                    return item.category.includes("Oil-Free")
                  case "accessories":
                    return item.category === "Accessories"
                  default:
                    return false
                }
              })
            case "powerRange":
              return values.some((value) => {
                const power = Number.parseInt(item.specifications.power) || 0
                switch (value) {
                  case "1-5":
                    return power >= 1 && power <= 5
                  case "5-10":
                    return power > 5 && power <= 10
                  case "10-25":
                    return power > 10 && power <= 25
                  case "25-50":
                    return power > 25 && power <= 50
                  case "50-100":
                    return power > 50 && power <= 100
                  case "100+":
                    return power > 100
                  default:
                    return false
                }
              })
            default:
              return true
          }
        })
      }
    })

    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        results.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-desc":
        results.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "power-asc":
        results.sort((a, b) => {
          const powerA = a.specifications?.power ? Number.parseInt(a.specifications.power) || 0 : 0
          const powerB = b.specifications?.power ? Number.parseInt(b.specifications.power) || 0 : 0
          return powerA - powerB
        })
        break
      case "power-desc":
        results.sort((a, b) => {
          const powerA = a.specifications?.power ? Number.parseInt(a.specifications.power) || 0 : 0
          const powerB = b.specifications?.power ? Number.parseInt(b.specifications.power) || 0 : 0
          return powerB - powerA
        })
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredResults(results)
  }, [searchQuery, activeFilters, sortBy])

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters)
  }

  const ResultCard = ({ result, isListView = false }: { result: (typeof searchResults)[0]; isListView?: boolean }) => (
    <div
      className={`bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${isListView ? "flex" : ""}`}
    >
      <div className={`${isListView ? "w-48 flex-shrink-0" : "aspect-square"}`}>
        <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Badge variant="outline" className="mb-2">
              {result.category}
            </Badge>
            <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{result.description}</p>
        <div className={`grid gap-2 mb-4 ${isListView ? "grid-cols-2" : "grid-cols-1"}`}>
          {Object.entries(result.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-primary">{result.price}</span>
          <Button size="sm" onClick={() => (window.location.href = result.url)}>
            View Details
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
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="power-asc">Power (Low to High)</SelectItem>
                <SelectItem value="power-desc">Power (High to Low)</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground">
            {filteredResults.length} results found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <ProductFilter onFilterChange={handleFilterChange} className="w-80" />

          {/* Results Grid */}
          <div className="flex-1">
            {filteredResults.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredResults.map((result) => (
                  <ResultCard key={result.id} result={result} isListView={viewMode === "list"} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveFilters({})
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
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
