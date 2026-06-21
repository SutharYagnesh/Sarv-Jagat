"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export default function ProductCatalogClient({ categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCounts, setVisibleCounts] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.slug]: 4 }), {})
  );

  const handleViewMore = (slug) => {
    setVisibleCounts(prev => ({ ...prev, [slug]: (prev[slug] || 4) + 4 }));
  };

  const filteredCategories = categories.map(cat => {
    const filteredProducts = cat.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, products: filteredProducts };
  }).filter(cat => cat.products.length > 0);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-6 rounded-full border-gray-200 shadow-sm focus:border-red-500 focus:ring-red-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-16">
        {filteredCategories.map((category, index) => {
          const isSearching = searchTerm.trim().length > 0;
          const displayCount = isSearching ? category.products.length : visibleCounts[category.slug];
          const visibleProducts = category.products.slice(0, displayCount);
          const hasMore = !isSearching && category.products.length > visibleCounts[category.slug];

          return (
            <section key={index} className="space-y-6 border-b pb-12 last:border-0">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-2xl font-semibold text-red-600">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product, idx) => (
                  <Card key={idx} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-square p-4 flex items-center justify-center bg-gray-50 border-b">
                      <Link href={`/products/${product.slug}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full object-contain mix-blend-multiply"
                        />
                      </Link>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <h3 className="font-medium text-sm text-center line-clamp-2 h-10">{product.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs px-2">
                          <Link href={`/contact`}>Enquiry Now</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full text-xs px-2 border-slate-300">
                          <Link href={`/products/${product.slug}`}>View More</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {hasMore && (
                <div className="text-center pt-4">
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-medium px-8"
                    onClick={() => handleViewMore(category.slug)}
                  >
                    Load More {category.title}
                  </Button>
                </div>
              )}
            </section>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p>No products found matching &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
