"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

const categories = [
  { value: "all", label: "All Categories" },
  { value: "compressors", label: "Air Compressors" },
  { value: "tools", label: "Pneumatic Tools" },
  { value: "dryers", label: "Dryers & Filters" },
  { value: "vacuum", label: "Vacuum Pumps" },
]

const technologies = [
  { value: "all", label: "All Technologies" },
  { value: "Rotary Screw", label: "Rotary Screw" },
  { value: "Twin Hammer", label: "Twin Hammer" },
  { value: "Refrigerated", label: "Refrigerated" },
]

export function ProductFilters({ filters, onFilterChange, productCount }) {
  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value })
  }

  const handleCategoryChange = (value) => {
    onFilterChange({ category: value })
  }

  const handleTechnologyChange = (value) => {
    onFilterChange({ technology: value })
  }

  const clearFilters = () => {
    onFilterChange({
      category: "all",
      technology: "all",
      capacity: "all",
      search: "",
    })
  }

  const hasActiveFilters = filters.category !== "all" || filters.technology !== "all" || filters.search !== ""

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Filter Products
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
            <Label htmlFor="search">Search Products</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or description..."
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
                <div key={category.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.value} id={category.value} />
                  <Label htmlFor={category.value} className="text-sm font-normal cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Technology Filter */}
          <div className="space-y-3">
            <Label>Technology</Label>
            <RadioGroup value={filters.technology} onValueChange={handleTechnologyChange}>
              {technologies.map((tech) => (
                <div key={tech.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={tech.value} id={tech.value} />
                  <Label htmlFor={tech.value} className="text-sm font-normal cursor-pointer">
                    {tech.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Results Count */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {productCount} product{productCount !== 1 ? "s" : ""} found
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
