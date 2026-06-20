import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Share2 } from "lucide-react"

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const category = await Category.findOne({ slug }).lean();

  if (!category) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${category.name} | Sarv Jagat Corporation`,
    description: `Leading Manufacturers, Exporters and Wholesaler of ${category.name} and related products.`,
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  await connectDB();
  
  const category = await Category.findOne({ slug }).lean();
  if (!category) {
    notFound();
  }

  const productsRaw = await Product.find({ category: category.name, status: "Published" }).lean();
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Header */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 mb-8">
          <h1 className="text-3xl font-serif text-gray-800 tracking-tight mb-4">{category.name}</h1>
          <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2 border-b border-gray-100 pb-4">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>&gt;</span>
            <Link href="/products" className="hover:text-red-600">Products</Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">{category.name}</span>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
            Leading Manufacturers, Exporters and Wholesaler of {products.map(p => p.title).join(", ")}. 
            Explore our extensive range of {category.name} designed for various industrial applications ensuring optimal performance and efficiency.
          </p>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-sm border border-gray-200 text-gray-500">
              No products found in this category.
            </div>
          ) : (
            products.map((product, idx) => {
              const image = product.images?.[0] || "/placeholder.svg";
              
              // Extract specs for quick table
              const formattedSpecs = {};
              if (product.specifications && Array.isArray(product.specifications)) {
                product.specifications.forEach(spec => {
                  if (spec.key && spec.value) formattedSpecs[spec.key] = spec.value;
                });
              }

              return (
                <div key={idx} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Image (4 cols) */}
                    <div className="lg:col-span-4 relative flex flex-col">
                      <div className="border rounded-sm p-4 flex items-center justify-center bg-white aspect-square relative hover:border-gray-300 transition-colors flex-1">
                        <img
                          src={image}
                          alt={product.title}
                          className="max-h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="mt-4 flex justify-center bg-gray-900 text-white py-2 text-sm cursor-pointer hover:bg-gray-800 rounded-sm font-medium transition-colors">
                        Hover to zoom
                      </div>
                    </div>

                    {/* Right: Details (8 cols) */}
                    <div className="lg:col-span-8">
                      <div className="flex justify-between items-start">
                        <Link href={`/products/${product.slug}`} className="hover:text-red-600 group">
                          <h2 className="text-2xl font-serif text-gray-800 group-hover:text-red-600 transition-colors tracking-tight mb-2">
                            {product.title}
                          </h2>
                        </Link>
                        <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors border border-gray-200">
                          <Share2 className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xl font-bold text-red-600">
                          {product.price ? `₹ ${product.price} / Piece` : "Price on Request"}
                        </span>
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-6 mb-6 font-medium shadow-sm">
                        Get Best Price
                      </Button>

                      <div className="py-2 border-t border-gray-100 mt-2">
                        <table className="w-full text-sm text-gray-700">
                          <tbody>
                            <tr className="border-b border-gray-50">
                              <td className="py-3 font-medium text-gray-500 w-1/3">Business Type</td>
                              <td className="py-3 font-semibold">Manufacturer, Exporter, Supplier</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                              <td className="py-3 font-medium text-gray-500">Compressor Type</td>
                              <td className="py-3 font-semibold">{product.technology || "Fixed Speed Rotary Screw Compressor"}</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                              <td className="py-3 font-medium text-gray-500">Model</td>
                              <td className="py-3 font-semibold">{product.modelNumber || "SJ Series"}</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                              <td className="py-3 font-medium text-gray-500">Power Rating</td>
                              <td className="py-3 font-semibold">{product.powerRating || "N/A"}</td>
                            </tr>
                            <tr className="border-b border-gray-50">
                              <td className="py-3 font-medium text-gray-500">Pressure Rating</td>
                              <td className="py-3 font-semibold">{product.pressureRating || "N/A"}</td>
                            </tr>
                            <tr>
                              <td className="py-3 font-medium text-gray-500">Air Delivery</td>
                              <td className="py-3 font-semibold">{product.airFlow || "N/A"}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-6 mt-4 border-t border-gray-100">
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-sm px-8 font-medium" asChild>
                          <a href="tel:+919157770753">
                            <Phone className="w-4 h-4 mr-2" />
                            Request to Call
                          </a>
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-8 font-medium shadow-sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Enquiry
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  )
}
