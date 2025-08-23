import { NextResponse } from "next/server"
import products from "@/data/products.json"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const technology = searchParams.get("technology")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit")

    let filteredProducts = [...products]

    // Filter by category
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    // Filter by technology
    if (technology && technology !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.technology === technology)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.features?.some((feature) => feature.toLowerCase().includes(searchLower)),
      )
    }

    // Apply limit
    if (limit) {
      const limitNum = Number.parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredProducts = filteredProducts.slice(0, limitNum)
      }
    }

    // Add metadata
    const response = {
      products: filteredProducts,
      total: filteredProducts.length,
      filters: {
        category,
        technology,
        search,
        limit,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
