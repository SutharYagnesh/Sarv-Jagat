import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';

export default async function ExploreProductsSection({ className = '' }) {
  let products = [];

  try {
    await connectDB();
    const raw = await Product.aggregate([
      { $match: { status: 'Published' } },
      { $sample: { size: 6 } },
    ]);
    products = JSON.parse(JSON.stringify(raw));
  } catch (error) {
    console.error('Failed to aggregate random products in ExploreProductsSection:', error);
    try {
      const fallback = await Product.find({ status: 'Published' }).limit(6).lean();
      products = JSON.parse(JSON.stringify(fallback));
    } catch (err) {
      console.error('Product fallback error:', err);
    }
  }

  if (!products || products.length === 0) {
    return null;
  }

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').trim();
  };

  return (
    <section className={`py-16 md:py-20 bg-gray-50/70 border-t ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center space-y-3 mb-12">
          <Badge className="bg-red-600 text-white hover:bg-red-700">Industrial Portfolio</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Explore our <span className="text-red-600">Products</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover our high-efficiency industrial screw air compressors, oil-free systems, and air treatment solutions engineered for maximum performance, continuous duty, and reduced operating costs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const image = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg';
            const plainDesc = stripHtml(product.description);

            return (
              <Card
                key={product._id}
                className="flex flex-col bg-white hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative aspect-4/3 p-4 flex items-center justify-center bg-gray-50/60 border-b overflow-hidden">
                  <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-red-600 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-red-100">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[48px]">
                    <Link href={`/products/${product.slug}`}>{product.title}</Link>
                  </CardTitle>
                  {plainDesc && (
                    <CardDescription className="line-clamp-2 text-xs sm:text-sm text-gray-600 mt-1">
                      {plainDesc}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-5 pt-0 mt-auto">
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white text-xs px-2 shadow-xs">
                      <Link href="/contact">Enquiry Now</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full text-xs px-2 border-slate-300 hover:bg-slate-50">
                      <Link href={`/products/${product.slug}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50 font-semibold px-8">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

