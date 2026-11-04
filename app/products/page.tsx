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
import { fetchWithCache } from "@/lib/memoryCache"

export const revalidate = 60;

// Main products catalog page with comprehensive product categories synced to admin drag-and-drop order
export default async function ProductsPage() {
  const productCategories = await fetchWithCache('public_products_page', async () => {
    await connectDB();
    const categoriesRaw = await Category.find({}).sort({ order: 1, createdAt: 1 }).select('name slug order').lean();
    const allProductsRaw = await Product.find({ status: { $regex: /^published$/i } })
      .select('title slug category images order status')
      .sort({ order: 1, createdAt: -1 })
      .lean();

    const categories = JSON.parse(JSON.stringify(categoriesRaw));
    const allProducts = JSON.parse(JSON.stringify(allProductsRaw));

    // Build the list of categories and their associated products in exact drag-and-drop order
    return categories.map((cat: any) => {
      const catNameLower = (cat.name || '').trim().toLowerCase();
      const catProducts = allProducts
        .filter((p: any) => (p.category || '').trim().toLowerCase() === catNameLower)
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

      return {
        title: cat.name,
        slug: cat.slug,
        products: catProducts.map((p: any) => ({
          id: p._id,
          name: p.title,
          slug: p.slug,
          image: p.images?.[0] || "/placeholder.svg",
        })),
      };
    }).filter((cat: any) => cat.products.length > 0);
  }, 120);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-full">
      <div className="container mx-auto px-4 py-8 max-w-full overflow-x-hidden">
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
