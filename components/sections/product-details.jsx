"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductEnquiryForm } from "@/components/forms/product-enquiry-form"
import { Phone, Mail, Share2 } from "lucide-react"
import Link from "next/link"

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

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-red-600">Products</Link>
          <span>&gt;</span>
          <Link href={`/products/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:text-red-600">{product.category}</Link>
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
                <button className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <Share2 className="h-4 w-4 text-gray-600" />
                </button>
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
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-6 font-medium shadow-sm">
                  Get Best Price
                </Button>
              </div>

              {/* Quick Specs Table */}
              <div className="py-2">
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
                    <tr>
                      <td className="py-3 font-medium text-gray-500">Pressure Rating</td>
                      <td className="py-3 font-semibold">{product.pressureRating || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
                <button className="text-red-600 text-sm mt-3 hover:underline font-medium">Click to view more</button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-sm px-8 font-medium" asChild>
                  <a href="tel:+919157770753">
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
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-serif text-gray-800 border-b border-gray-200 pb-4 mb-6">Product Details</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 mb-8 border border-gray-200">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 w-1/4 border-r border-gray-200">Model</td>
                  <td className="py-3 px-4 w-1/4 border-r border-gray-200">{product.modelNumber || "N/A"}</td>
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 w-1/4 border-r border-gray-200">Manufacturer</td>
                  <td className="py-3 px-4 w-1/4">Sarv Jagat Corporation</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 border-r border-gray-200">Power Rating</td>
                  <td className="py-3 px-4 border-r border-gray-200">{product.powerRating || "N/A"}</td>
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 border-r border-gray-200">Pressure Rating</td>
                  <td className="py-3 px-4">{product.pressureRating || "N/A"}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 border-r border-gray-200">Air Delivery</td>
                  <td className="py-3 px-4 border-r border-gray-200">{product.airFlow || "N/A"}</td>
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 border-r border-gray-200">Stage</td>
                  <td className="py-3 px-4">{product.stage || "Single Stage"}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 border-r border-gray-200">Technology</td>
                  <td className="py-3 px-4 border-r border-gray-200">{product.technology || "Rotary Screw Mechanism"}</td>
                  <td className="py-3 px-4 bg-gray-50 font-medium text-gray-600 border-r border-gray-200">Cooling Type</td>
                  <td className="py-3 px-4">{product.coolingType || "Air Cooled"}</td>
                </tr>
              </tbody>
            </table>
          </div>

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

            {product.specifications && Object.keys(product.specifications).length > 0 && (
               <div className="mt-8">
                 <h4 className="font-semibold text-gray-800 mb-4 text-lg">Key Features:</h4>
                 <ul className="list-disc pl-5 text-gray-700 space-y-2">
                   {Object.entries(product.specifications).map(([key, value], idx) => (
                     <li key={idx}><strong className="font-medium">{key}:</strong> {value}</li>
                   ))}
                 </ul>
               </div>
            )}
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
