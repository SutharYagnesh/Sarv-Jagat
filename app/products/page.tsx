
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

import { metadata } from "./metadata"

import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"

// Main products catalog page with comprehensive product categories
export default async function ProductsPage() {
  await connectDB();
  const categoriesRaw = await Category.find({}).lean();
  const allProductsRaw = await Product.find({ status: 'Published' }).lean();

  const categories = JSON.parse(JSON.stringify(categoriesRaw));
  const allProducts = JSON.parse(JSON.stringify(allProductsRaw));

  // Build the list of categories and their associated products
  const productCategories = categories.map((cat) => {
    const catProducts = allProducts.filter(p => p.category === cat.name);
    return {
      title: cat.name,
      slug: cat.slug,
      products: catProducts.map(p => ({
        id: p._id,
        name: p.title,
        slug: p.slug,
        image: p.images?.[0] || "/placeholder.svg",
      }))
    }
  }).filter(cat => cat.products.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground">Products</span>
        </div>

        <div className="space-y-16">
          {productCategories.map((category, index) => (
            <section key={index} className="space-y-6 border-b pb-12 last:border-0">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-2xl font-semibold text-red-600">{category.title}</h2>
              </div>

              {/* Product Grid - 4 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.products.map((product, idx) => (
                  <Card key={idx} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                    {/* Image Section */}
                    <div className="relative aspect-square p-4 flex items-center justify-center bg-gray-50 border-b">
                      <Link href={`/products/${product.slug}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full object-contain mix-blend-multiply"
                        />
                      </Link>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <h3 className="font-medium text-sm text-center line-clamp-2 h-10">{product.name}</h3>

                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs px-2">
                          <Link href={`/contact`}>
                            Enquiry Now
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full text-xs px-2 border-slate-300">
                          <Link href={`/products/${product.slug}`}>
                            View More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* View More Products of Category Link */}
              <div className="text-center pt-4">
                <Link href={`/products/category/${category.slug}`} className="text-red-600 font-medium hover:underline">
                  View More
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
