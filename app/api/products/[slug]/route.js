import { NextResponse } from "next/server"
import products from "@/data/products.json"

export async function GET(request, { params }) {
  try {
    const product = products.find((p) => p.slug === params.slug)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Find related products
    const relatedProducts = products
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category || p.industries?.some((industry) => product.industries?.includes(industry))),
      )
      .slice(0, 3)

    const response = {
      product,
      relatedProducts,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
