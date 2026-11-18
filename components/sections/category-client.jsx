"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function CategoryClient({ products = [], categoryName = "Products" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = (products || []).filter(product =>
    (product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.modelNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.powerRating || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSearching = searchTerm.trim().length > 0;
  const visibleProducts = isSearching ? filteredProducts : filteredProducts.slice(0, visibleCount);
  const hasMore = !isSearching && filteredProducts.length > visibleCount;

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-6 px-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder={`Search in ${categoryName}...`}
            className="pl-10 pr-4 py-6 rounded-full border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Product count indicator */}
      <div className="flex items-center justify-between border-b pb-3 text-sm text-gray-600">
        <span>
          Showing <strong className="text-gray-900">{visibleProducts.length}</strong> of{" "}
          <strong className="text-gray-900">{filteredProducts.length}</strong> product{filteredProducts.length === 1 ? "" : "s"}
        </span>
        <a
          href={`https://wa.me/919157487233?text=${encodeURIComponent(`Hello Sarv Jagat team, I want to inquire about ${categoryName} models.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1 text-xs sm:text-sm"
        >
          <span>Quick WhatsApp Enquiry</span> &rarr;
        </a>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm border border-gray-200 text-gray-500">
          <p className="text-base font-medium">
            {searchTerm ? `No products found matching "${searchTerm}"` : `No products currently listed under ${categoryName}.`}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            New products are updated regularly. Contact our team for customized configurations.
          </p>
          <Button asChild className="mt-4 bg-red-600 hover:bg-red-700 text-white">
            <Link href="/contact">Inquire for Custom Models</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {visibleProducts.map((product, idx) => {
              const productImg = (product.images && product.images.length > 0 && !product.images[0].includes('blob.vercel-storage'))
                ? product.images[0]
                : (product.image && !product.image.includes('blob.vercel-storage') ? product.image : "/placeholder.svg");

              return (
                <Card
                  key={product._id || product.slug || idx}
                  className="flex flex-col hover:shadow-lg transition-shadow duration-300 w-full max-w-full overflow-hidden border border-gray-200"
                >
                  <div className="relative aspect-square p-4 flex items-center justify-center bg-gray-50 border-b">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                    >
                      <img
                        src={productImg}
                        alt={product.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                        className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform hover:scale-105 duration-200"
                      />
                    </Link>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <Link href={`/products/${product.slug}`} className="hover:text-red-600 transition-colors">
                        <h3 className="font-medium text-sm text-center line-clamp-2 h-10 break-words text-gray-900">
                          {product.title}
                        </h3>
                      </Link>
                      {(product.powerRating || product.pressureRating) && (
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-1 text-[11px] text-gray-500">
                          {product.powerRating && (
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                              {product.powerRating}
                            </span>
                          )}
                          {product.pressureRating && (
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                              {product.pressureRating}
                            </span>
                          )}
                          {product.airFlow && (
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                              {product.airFlow}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
                      <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs px-2">
                        <Link href={`/contact?product=${encodeURIComponent(product.title)}`}>
                          Enquiry Now
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full text-xs px-2 border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                        <Link href={`/products/${product.slug}`}>View More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {hasMore && (
            <div className="text-center pt-6 px-2">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-medium px-4 sm:px-8 py-2.5 h-auto whitespace-normal max-w-full text-xs sm:text-sm text-center leading-relaxed"
                onClick={() => setVisibleCount((prev) => prev + 12)}
              >
                Load More {categoryName} ({filteredProducts.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
