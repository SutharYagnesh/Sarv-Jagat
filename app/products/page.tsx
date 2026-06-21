
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, Filter, Settings, Zap, Shield, Wrench } from "lucide-react"
import Link from "next/link"
import ProductFilter from "@/components/search/product-filter"
import ProductCatalogClient from "@/components/sections/product-catalog-client"
import { TechnicalSpecs } from "@/components/sections/technical-specs"
import { CompressorComparison } from "@/components/sections/compressor-comparison"

import { metadata } from "./metadata"

import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"

// Main products catalog page with comprehensive product categories
export default async function ProductsPage() {
  await connectDB();
  const categoriesRaw = await Category.find({}).sort({ order: 1 }).lean();
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

        <ProductCatalogClient categories={productCategories} />
      </div>
    </div>
  )
}
