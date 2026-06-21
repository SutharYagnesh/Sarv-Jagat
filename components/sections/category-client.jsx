"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ShareButton } from "@/components/ui/share-button";
import { ProductEnquiryButtons } from "@/components/ui/product-enquiry-buttons";

export default function CategoryClient({ products, categoryName }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            type="text"
            placeholder={`Search ${categoryName}...`}
            className="pl-10 pr-4 py-6 rounded-full border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm border border-gray-200 text-gray-500">
          {searchTerm ? `No products found matching "${searchTerm}"` : "No products found in this category."}
        </div>
      ) : (
        filteredProducts.map((product, idx) => {
          const image = product.images?.[0] || "/placeholder.svg";

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
  );
}
