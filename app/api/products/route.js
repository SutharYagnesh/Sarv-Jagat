import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const technology = searchParams.get("technology")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit")

    let query = {};
    const andConditions = [{ status: { $regex: /^published$/i } }];

    if (category && category !== "all") {
      andConditions.push({ category: category });
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      andConditions.push({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { modelNumber: searchRegex }
        ]
      });
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    let productsQuery = Product.find(query).select('-specifications -description').lean().sort({ createdAt: -1 });

    if (limit) {
      const limitNum = Number.parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        productsQuery = productsQuery.limit(limitNum);
      }
    }

    const filteredProducts = await productsQuery;
    const total = await Product.countDocuments(query);

    const response = {
      products: filteredProducts,
      total: total,
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
