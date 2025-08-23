"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Search data structure for comprehensive search across all content
const searchData = [
  // Products
  {
    id: "screw-fixed",
    title: "Fixed Speed Screw Compressors",
    category: "Products",
    url: "/products/screw/fixed-speed",
    description: "Reliable and efficient fixed speed screw air compressors for continuous operation",
  },
  {
    id: "screw-variable",
    title: "Variable Speed Screw Compressors",
    category: "Products",
    url: "/products/screw/variable-speed",
    description: "Energy-efficient VSD compressors with automatic speed adjustment",
  },
  {
    id: "piston-single",
    title: "Single Stage Piston Compressors",
    category: "Products",
    url: "/products/piston/single-stage",
    description: "Cost-effective single stage reciprocating compressors",
  },
  {
    id: "piston-two",
    title: "Two Stage Piston Compressors",
    category: "Products",
    url: "/products/piston/two-stage",
    description: "High pressure two stage piston compressors",
  },
  {
    id: "oil-free",
    title: "Oil-Free Compressors",
    category: "Products",
    url: "/products/oil-free",
    description: "Clean air solutions for pharmaceutical and food industries",
  },
  {
    id: "booster",
    title: "Booster Compressors",
    category: "Products",
    url: "/products/specialized/booster",
    description: "High pressure booster compressors for specialized applications",
  },
  {
    id: "vacuum-pumps",
    title: "Vacuum Pumps",
    category: "Products",
    url: "/products/specialized/vacuum-pumps",
    description: "Industrial vacuum pumps for various applications",
  },
  {
    id: "air-dryers",
    title: "Refrigerated Air Dryers",
    category: "Products",
    url: "/products/accessories/air-dryers",
    description: "Remove moisture from compressed air systems",
  },
  {
    id: "air-tanks",
    title: "Air Receiver Tanks",
    category: "Products",
    url: "/products/accessories/air-tanks",
    description: "Storage tanks for compressed air systems",
  },

  // Industries
  {
    id: "automotive",
    title: "Automotive Industry",
    category: "Industries",
    url: "/industries/automotive",
    description: "Compressed air solutions for automotive manufacturing",
  },
  {
    id: "pharmaceutical",
    title: "Pharmaceutical Industry",
    category: "Industries",
    url: "/industries/pharmaceutical",
    description: "Clean air solutions for pharmaceutical manufacturing",
  },
  {
    id: "food-beverage",
    title: "Food & Beverage",
    category: "Industries",
    url: "/industries/food-beverage",
    description: "Food grade compressed air systems",
  },
  {
    id: "textile",
    title: "Textile Industry",
    category: "Industries",
    url: "/industries/textile",
    description: "Air solutions for textile manufacturing processes",
  },
  {
    id: "metal-fabrication",
    title: "Metal & Fabrication",
    category: "Industries",
    url: "/industries/metal-fabrication",
    description: "Heavy duty compressors for metal working",
  },
  {
    id: "construction",
    title: "Construction",
    category: "Industries",
    url: "/industries/construction",
    description: "Portable and stationary compressors for construction",
  },
  {
    id: "mining",
    title: "Mining & Quarry",
    category: "Industries",
    url: "/industries/mining",
    description: "Robust compressors for mining operations",
  },
  {
    id: "electronics",
    title: "Electronics & Semiconductor",
    category: "Industries",
    url: "/industries/electronics",
    description: "Clean room compatible air systems",
  },

  // Services
  {
    id: "amc",
    title: "Annual Maintenance Contract",
    category: "Services",
    url: "/services/amc",
    description: "Comprehensive maintenance packages for air compressors",
  },
  {
    id: "installation",
    title: "Installation & Commissioning",
    category: "Services",
    url: "/services/installation",
    description: "Professional installation and setup services",
  },
  {
    id: "repair",
    title: "Repair & Service",
    category: "Services",
    url: "/services/repair",
    description: "24/7 repair and emergency service support",
  },
  {
    id: "spare-parts",
    title: "Spare Parts Supply",
    category: "Services",
    url: "/services/spare-parts",
    description: "Genuine spare parts and consumables",
  },
  {
    id: "energy-audit",
    title: "Energy Audit",
    category: "Services",
    url: "/services/energy-audit",
    description: "Optimize your compressed air system efficiency",
  },

  // Corporate
  {
    id: "about",
    title: "About Sarv Jagat",
    category: "Company",
    url: "/about",
    description: "Learn about our company history and mission",
  },
  {
    id: "careers",
    title: "Careers",
    category: "Company",
    url: "/careers",
    description: "Join our team of air compressor experts",
  },
  {
    id: "contact",
    title: "Contact Us",
    category: "Company",
    url: "/contact",
    description: "Get in touch with our sales and support team",
  },
  {
    id: "dealers",
    title: "Dealer Network",
    category: "Company",
    url: "/dealers",
    description: "Find authorized dealers and service centers",
  },
]

interface GlobalSearchProps {
  trigger?: React.ReactNode
}

export default function GlobalSearch({ trigger }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredResults, setFilteredResults] = useState(searchData)

  // Filter results based on search query and category
  useEffect(() => {
    let results = searchData

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter((item) => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
      )
    }

    setFilteredResults(results)
  }, [searchQuery, selectedCategory])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const categories = ["all", "Products", "Industries", "Services", "Company"]

  const handleResultClick = (url: string) => {
    setIsOpen(false)
    window.location.href = url
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSelectedCategory("all")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 bg-transparent"
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle>Search Sarv Jagat</DialogTitle>
        </DialogHeader>

        {/* Search Input and Filters */}
        <div className="px-6 pb-4">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, services, industries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="flex gap-2 mb-4">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchQuery}"
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Category: {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto px-6 pb-6">
          {filteredResults.length > 0 ? (
            <div className="space-y-2">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className="p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{result.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No results found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>

        {/* Search Tips */}
        <div className="px-6 py-3 border-t bg-muted/50">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 text-xs bg-background border rounded">⌘K</kbd> to search •
            <kbd className="px-1.5 py-0.5 text-xs bg-background border rounded ml-1">↵</kbd> to select •
            <kbd className="px-1.5 py-0.5 text-xs bg-background border rounded ml-1">Esc</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
