import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import Product from "@/lib/models/Product"
import Category from "@/lib/models/Category"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { ProductEnquiryButtons } from "@/components/ui/product-enquiry-buttons"
import { ShareButton } from "@/components/ui/share-button"

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
                      <Link href={`/products/${product.slug}`} className="border rounded-sm p-4 flex items-center justify-center bg-white aspect-square relative hover:border-gray-300 hover:shadow-md transition-all flex-1 cursor-pointer">
                        <img
                          src={image}
                          alt={product.title}
                          className="max-h-full object-contain mix-blend-multiply"
                        />
                      </Link>
                      <a href={`https://wa.me/919157487233?text=${encodeURIComponent(`I want more photos of ${product.title}`)}`} target="_blank" rel="noopener noreferrer" className="mt-4 flex justify-center bg-gray-900 text-white py-2 text-sm cursor-pointer hover:bg-gray-800 rounded-sm font-medium transition-colors">
                        Contact for more photos
                      </a>
                    </div>

                    {/* Right: Details (8 cols) */}
                    <div className="lg:col-span-8">
                      <div className="flex justify-between items-start">
                        <Link href={`/products/${product.slug}`} className="hover:text-red-600 group">
                          <h2 className="text-2xl font-serif text-gray-800 group-hover:text-red-600 transition-colors tracking-tight mb-2">
                            {product.title}
                          </h2>
                        </Link>
                        <ShareButton 
                          title={product.title} 
                          text={`Check out ${product.title} from Sarv Jagat Corporation`} 
                          url={`/products/${product.slug}`} 
                        />
                      </div>

                      <ProductEnquiryButtons product={product} />
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
