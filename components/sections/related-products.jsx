import { ProductCard } from "@/components/product-card"

export function RelatedProducts({ relatedProducts = [] }) {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Related Products</h2>
          <p className="text-lg text-muted-foreground">Discover other products that might interest you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
