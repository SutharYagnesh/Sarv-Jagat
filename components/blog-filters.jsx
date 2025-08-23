"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

export function BlogFilters({ filters, onFilterChange, posts, resultCount }) {
  // Extract unique categories and tags from posts
  const categories = ["all", ...new Set(posts.map((post) => post.category).filter(Boolean))]
  const allTags = posts.flatMap((post) => post.tags || [])
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {})
  const popularTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value })
  }

  const handleCategoryChange = (value) => {
    onFilterChange({ category: value })
  }

  const handleTagClick = (tag) => {
    onFilterChange({ tag: filters.tag === tag ? "all" : tag })
  }

  const clearFilters = () => {
    onFilterChange({
      search: "",
      tag: "all",
      category: "all",
    })
  }

  const hasActiveFilters = filters.search !== "" || filters.tag !== "all" || filters.category !== "all"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Filter Posts
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Posts</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by title or content..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <Label>Category</Label>
            <RadioGroup value={filters.category} onValueChange={handleCategoryChange}>
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={category} />
                  <Label htmlFor={category} className="text-sm font-normal cursor-pointer capitalize">
                    {category === "all" ? "All Categories" : category}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Popular Tags */}
          <div className="space-y-3">
            <Label>Popular Tags</Label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(([tag, count]) => (
                <Badge
                  key={tag}
                  variant={filters.tag === tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag} ({count})
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {resultCount} post{resultCount !== 1 ? "s" : ""} found
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
