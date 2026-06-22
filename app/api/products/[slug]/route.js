import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const product = await Product.findOne({ slug, status: "Published" });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Find related products
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      status: "Published"
    }).limit(3).lean();

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
