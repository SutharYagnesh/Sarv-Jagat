import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, Filter, Settings, Zap, Shield, Wrench } from "lucide-react"
import Link from "next/link"
import ProductFilter from "@/components/search/product-filter"
import { TechnicalSpecs } from "@/components/sections/technical-specs"
import { CompressorComparison } from "@/components/sections/compressor-comparison"

// Main products catalog page with comprehensive product categories
export default function ProductsPage() {
  // Product categories with detailed information from provided specifications
  const productCategories = [
    {
      title: "Screw Air Compressors",
      link:"products/screw",
      description: "High-efficiency rotary screw compressors for continuous industrial operations",
      image: "/sj-screw-assemble.png",
      powerRange: "10-200 HP",
      pressureRange: "7-16 Bar",
      applications: ["Continuous Operation", "Industrial Manufacturing", "High CFM Requirements"],
      products: [
        { name: "Oil-Injected Fixed Speed", href: "/products/screw/fixed-speed" },
        { name: "Variable Speed Drive (VSD)", href: "/products/screw/variable-speed" },
        { name: "Oil-Free Screw", href: "/products/oil-free" },
        { name: "Tank Mounted", href: "/products/screw/" },
        { name: "Trolley Mounted", href: "/products/screw/" },
        { name: "Diesel Engine Trolley", href: "/products/screw/" },
      ],
      icon: Settings,
      color: "bg-primary",
    },
    {
      title: "Reciprocating Piston Compressors",
      link:"products/piston",
      description: "Robust piston compressors for heavy-duty and intermittent applications",
      image: "/SJ_COM_MULTISTAGE_AIR-WATER COOLED_1.jpg",
      powerRange: "1-25 HP",
      pressureRange: "7-35 Bar",
      applications: ["Heavy Duty Operations", "High Pressure Applications", "Workshop Use"],
      products: [
        { name: "Single Stage Piston", href: "/products/piston/single-stage" },
        { name: "Two Stage Piston", href: "/products/piston/two-stage" },
        { name: "Multi Stage High Pressure", href: "/products/piston/multi-stage" },
        { name: "Oil-Free Piston", href: "/products/oil-free" },
        { name: "Duplex Twin Motor", href: "/products/piston" },
        { name: "Tractor Shaft Driven", href: "/products/piston" },
      ],
      icon: Wrench,
      color: "bg-secondary",
    },
    {
      title: "Specialized Compressors",
      link:"products/specialized",
      description: "Custom-engineered solutions for specific industrial requirements",
      image: "/SJ_COM_BOOSTER_DO NOT KNOW.jpg",
      powerRange: "7.5-30 HP",
      pressureRange: "20-40 Bar",
      applications: ["PET Bottle Blowing", "High Pressure Systems", "Vacuum Applications"],
      products: [
        { name: "Booster High Pressure", href: "/products/specialized" },
        { name: "Vacuum Pumps", href: "/products/specialized" },
        { name: "Fully Assembled Systems", href: "/products/specialized" },
      ],
      icon: Zap,
      color: "bg-accent",
    },
    {
      title: "Accessories & Components",
      link:"services/spare-parts",
      description: "Complete range of air treatment and storage accessories",
      image: "/sj-filter.png",
      powerRange: "All Sizes",
      pressureRange: "Up to 16 Bar",
      applications: ["Air Treatment", "Storage Solutions", "System Integration"],
      products: [
        { name: "Air Receiver Tanks", href: "/products/" },
        { name: "Refrigerated Air Dryers", href: "/products" },
        { name: "Air Filters & Carbon Towers", href: "/products" },
        { name: "Spare Parts", href: "/services/spare-parts" },
      ],
      icon: Shield,
      color: "bg-muted-foreground",
    },
  ]

  // Key features that apply across all product categories
  const keyFeatures = [
    "ISO 9001:2015 Certified Manufacturing",
    "SJBrand Precision Engineering",
    "Energy Efficient Designs",
    "24/7 Technical Support",
    "Pan-India Service Network",
    "Custom Solutions Available",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Complete Range of <span className="text-red-400">Air Compressors</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              From 1 HP to 200+ HP, discover our comprehensive range of air compressors engineered for reliability,
              efficiency, and performance across all industrial applications.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile Filter Button */}
            {/* <div className="lg:hidden">
              <ProductFilter />
            </div> */}

            {/* Quick Search and Sort */}
            {/* <div className="flex-1 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products by name, HP, or application..." className="pl-10 bg-background" />
                </div>
              </div>
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="w-[180px] bg-background">
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
                <Button asChild variant="outline" className="bg-background">
                  <Link href="/search">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Search
                  </Link>
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            {/* <ProductFilter className="w-80 hidden lg:block" /> */}

            {/* Product Categories Grid */}
            <div className="flex-1">
              <div className="grid lg:grid-cols-2 gap-12">
                {productCategories.map((category, index) => (
                  <Card key={index} className="product-card card-hover overflow-hidden">
                    <div className="relative">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <div className={`${category.color} text-white p-3 rounded-full`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-background text-foreground">SJBrand</Badge>
                      </div>
                    </div>

                    <CardHeader className="space-y-4">
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-professional text-base">{category.description}</CardDescription>

                      {/* Specifications */}
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Power Range</div>
                          <div className="font-semibold text-primary">{category.powerRange}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-muted-foreground">Pressure Range</div>
                          <div className="font-semibold text-primary">{category.pressureRange}</div>
                        </div>
                      </div>

                      {/* Applications */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Key Applications</div>
                        <div className="flex flex-wrap gap-2">
                          {category.applications.map((app, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Product List */}
                      <div className="space-y-3">
                        <div className="text-sm font-medium">Available Models:</div>
                        <div className="grid grid-cols-1 gap-2">
                          {category.products.map((product, idx) => (
                            <Link
                              key={idx}
                              href={product.href}
                              className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                            >
                              <span className="text-sm">{product.name}</span>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      <Button asChild className="w-full btn-primary">
                        <Link
                          href={`/${category.link}`}
                        >
                          View All {category.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       <TechnicalSpecs  />
      <CompressorComparison />

      {/* CTA Section */}
      
    </div>
  )
}
