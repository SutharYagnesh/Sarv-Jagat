"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductEnquiryForm } from "@/components/forms/product-enquiry-form"
import { Phone, Mail, Share2 } from "lucide-react"
import Link from "next/link"
import { ShareButton } from "@/components/ui/share-button"

export function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)

  const images = product.images?.length > 0 ? product.images : ["/placeholder.svg"];

  // Helper to extract YouTube ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const specs = [];
  if (Array.isArray(product.specifications)) {
    specs.push(...product.specifications.filter(s => s.key && s.value));
  } else if (product.specifications && typeof product.specifications === 'object') {
    specs.push(...Object.entries(product.specifications).map(([key, value]) => ({ key, value })));
  }

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-red-600">Products</Link>
          <span>&gt;</span>
          <Link href={`/products/category/${(product.category || 'uncategorized').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:text-red-600">{product.category || 'Uncategorized'}</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* White container for the top section */}
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Images (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="border rounded-sm p-4 flex items-center justify-center bg-white aspect-square relative hover:border-gray-300 transition-colors">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="max-h-full object-contain mix-blend-multiply"
                />
                <ShareButton 
                  title={product.name}
                  text={`Check out ${product.name} from Sarv Jagat Corporation`}
                  url={`/products/${product.slug}`}
                  className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`border rounded-sm p-1 flex-shrink-0 w-20 h-20 flex items-center justify-center transition-all ${selectedImage === idx ? 'border-red-600 ring-1 ring-red-600' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx+1}`} className="max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-2xl font-serif text-gray-800 tracking-tight">{product.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-100">
                <span className="text-xl font-bold text-red-600">
                  {product.price ? `₹ ${product.price} / Piece` : "Price on Request"}
                </span>
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-6 font-medium shadow-sm" onClick={() => setShowEnquiryForm(true)}>
                  Get Best Price
                </Button>
              </div>

              {/* Quick Specs Table */}
              <div className="py-2">
                {specs.length > 0 ? (
                  <>
                    <table className="w-full text-sm text-gray-700">
                      <tbody>
                        {specs.slice(0, 5).map((spec, idx) => (
                          <tr key={idx} className="border-b border-gray-50">
                            <td className="py-3 font-medium text-gray-500 w-1/3">{spec.key}</td>
                            <td className="py-3 font-semibold">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="text-red-600 text-sm mt-3 hover:underline font-medium" onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('product-details-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}>Click to view more</button>
                  </>
                ) : null}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-sm px-8 font-medium" asChild>
                  <a href="tel:+919157487233">
                    <Phone className="w-4 h-4 mr-2" />
                    Request to Call
                  </a>
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-8 font-medium shadow-sm" onClick={() => setShowEnquiryForm(true)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Enquiry
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Product Details & Description */}
        <div id="product-details-section" className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-serif text-gray-800 border-b border-gray-200 pb-4 mb-6">Product Details</h2>
          
          {specs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700 mb-8 border border-gray-200">
                <tbody>
                  {Array.from({ length: Math.ceil(specs.length / 2) }).map((_, rowIndex) => {
                    const idx1 = rowIndex * 2;
                    const idx2 = rowIndex * 2 + 1;
                    const spec1 = specs[idx1];
                    const spec2 = specs[idx2];
                    return (
                      <tr key={rowIndex} className="border-b border-gray-200">
                        <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 w-1/4 border-r border-gray-200">{spec1.key}</td>
                        <td className={`py-3 px-4 w-1/4 ${spec2 ? 'border-r border-gray-200' : ''}`}>{spec1.value}</td>
                        {spec2 ? (
                          <>
                            <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 w-1/4 border-r border-gray-200">{spec2.key}</td>
                            <td className="py-3 px-4 w-1/4">{spec2.value}</td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 w-1/4 border-r border-gray-200"></td>
                            <td className="py-3 px-4 w-1/4"></td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mb-8">No detailed specifications available.</p>
          )}

          <div className="text-center mb-10">
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-10 py-6 text-lg font-medium shadow-sm" onClick={() => setShowEnquiryForm(true)}>
              Yes! I am interested
            </Button>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-serif text-red-600 mb-4">{product.name}</h3>
            <p className="text-gray-700 whitespace-pre-line mb-8 leading-relaxed">
              {product.description}
            </p>


          </div>

          {/* Media Section */}
          {product.youtubeLink && getYouTubeId(product.youtubeLink) && (
            <div className="mt-10 pt-8 border-t border-gray-200">
               <h3 className="text-xl font-serif text-gray-800 mb-6">Product Video</h3>
               <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border shadow-sm bg-black">
                  <iframe 
                    src={`https://www.youtube.com/embed/${getYouTubeId(product.youtubeLink)}`}
                    className="w-full h-full"
                    allowFullScreen
                    title={`${product.name} Video`}
                  />
               </div>
            </div>
          )}
        </div>

        {/* Enquiry Form Modal */}
        {showEnquiryForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
              <ProductEnquiryForm product={product} onClose={() => setShowEnquiryForm(false)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
