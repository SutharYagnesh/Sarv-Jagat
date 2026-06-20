"use client"

import { useState, useEffect } from "react"
import { Filter, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Product filter configuration
const filterConfig = {
  productType: {
    label: "Product Type",
    options: [
      { value: "screw-compressor", label: "Screw Compressors" },
      { value: "piston-compressor", label: "Piston Compressors" },
      { value: "oil-free", label: "Oil-Free Compressors" },
      { value: "booster", label: "Booster Compressors" },
      { value: "vacuum-pump", label: "Vacuum Pumps" },
      { value: "accessories", label: "Accessories" },
    ],
  },
  powerRange: {
    label: "Power Range (HP)",
    options: [
      { value: "1-5", label: "1-5 HP" },
      { value: "5-10", label: "5-10 HP" },
      { value: "10-25", label: "10-25 HP" },
      { value: "25-50", label: "25-50 HP" },
      { value: "50-100", label: "50-100 HP" },
      { value: "100+", label: "100+ HP" },
    ],
  },
  pressureRange: {
    label: "Pressure Range (Bar)",
    options: [
      { value: "7-8", label: "7-8 Bar" },
      { value: "8-10", label: "8-10 Bar" },
      { value: "10-13", label: "10-13 Bar" },
      { value: "13-16", label: "13-16 Bar" },
      { value: "16+", label: "16+ Bar" },
    ],
  },
  driveType: {
    label: "Drive Type",
    options: [
      { value: "direct-drive", label: "Direct Drive" },
      { value: "belt-drive", label: "Belt Drive" },
      { value: "variable-speed", label: "Variable Speed (VSD)" },
    ],
  },
  coolingType: {
    label: "Cooling Type",
    options: [
      { value: "air-cooled", label: "Air Cooled" },
      { value: "water-cooled", label: "Water Cooled" },
    ],
  },
  application: {
    label: "Application",
    options: [
      { value: "automotive", label: "Automotive" },
      { value: "pharmaceutical", label: "Pharmaceutical" },
      { value: "food-beverage", label: "Food & Beverage" },
      { value: "textile", label: "Textile" },
      { value: "metal-fabrication", label: "Metal Fabrication" },
      { value: "construction", label: "Construction" },
      { value: "general-industrial", label: "General Industrial" },
    ],
  },
  features: {
    label: "Features",
    options: [
      { value: "energy-efficient", label: "Energy Efficient" },
      { value: "low-noise", label: "Low Noise" },
      { value: "compact-design", label: "Compact Design" },
      { value: "easy-maintenance", label: "Easy Maintenance" },
      { value: "digital-control", label: "Digital Control" },
      { value: "remote-monitoring", label: "Remote Monitoring" },
    ],
  },
}

interface ProductFilterProps {
  onFilterChange?: (filters: Record<string, string[]>) => void
  className?: string
}

export default function ProductFilter({ onFilterChange, className }: ProductFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    productType: true,
    powerRange: true,
  })

  // Handle filter changes
  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev }
      if (!newFilters[category]) {
        newFilters[category] = []
      }

      if (checked) {
        newFilters[category] = [...newFilters[category], value]
      } else {
        newFilters[category] = newFilters[category].filter((v) => v !== value)
      }

      // Remove empty categories
      if (newFilters[category].length === 0) {
        delete newFilters[category]
      }

      return newFilters
    })
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({})
    setSearchQuery("")
  }

  // Remove specific filter
  const removeFilter = (category: string, value: string) => {
    handleFilterChange(category, value, false)
  }

  // Toggle section open/closed
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Notify parent of filter changes
  useEffect(() => {
    if (onFilterChange) {
      const filters = { ...selectedFilters }
      if (searchQuery.trim()) {
        filters.search = [searchQuery.trim()]
      }
      onFilterChange(filters)
    }
  }, [selectedFilters, searchQuery, onFilterChange])

  // Get total active filter count
  const activeFilterCount = Object.values(selectedFilters).reduce((sum, filters) => sum + filters.length, 0)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label htmlFor="product-search" className="text-sm font-medium mb-2 block">
          Search Products
        </Label>
        <Input
          id="product-search"
          placeholder="Search by name, model, or specification..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium">Active Filters ({activeFilterCount})</Label>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([category, values]) =>
              values.map((value) => {
                const categoryConfig = filterConfig[category as keyof typeof filterConfig]
                const option = categoryConfig?.options.find((opt) => opt.value === value)
                return (
                  <Badge key={`${category}-${value}`} variant="secondary" className="gap-1">
                    {option?.label || value}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(category, value)} />
                  </Badge>
                )
              }),
            )}
          </div>
        </div>
      )}

      {/* Filter Categories */}
      {Object.entries(filterConfig).map(([categoryKey, category]) => (
        <Collapsible key={categoryKey} open={openSections[categoryKey]} onOpenChange={() => toggleSection(categoryKey)}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-md">
            <Label className="text-sm font-medium cursor-pointer">{category.label}</Label>
            <ChevronDown className={`h-4 w-4 transition-transform ${openSections[categoryKey] ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2 ml-2">
            {category.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${categoryKey}-${option.value}`}
                  checked={selectedFilters[categoryKey]?.includes(option.value) || false}
                  onCheckedChange={(checked) => handleFilterChange(categoryKey, option.value, checked as boolean)}
                />
                <Label htmlFor={`${categoryKey}-${option.value}`} className="text-sm cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div className={`hidden lg:block ${className}`}>
        <div className="sticky top-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold">Filter Products</h3>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Products
              </SheetTitle>
              <SheetDescription>Refine your search to find the perfect air compressor</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
