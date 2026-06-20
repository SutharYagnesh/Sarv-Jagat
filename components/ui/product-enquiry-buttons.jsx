"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { ProductEnquiryForm } from "@/components/forms/product-enquiry-form"

export function ProductEnquiryButtons({ product }) {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-xl font-bold text-red-600">
          {product.price ? `₹ ${product.price} / Piece` : "Price on Request"}
        </span>
        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-6 font-medium shadow-sm" onClick={() => setShowEnquiryForm(true)}>
          Get Best Price
        </Button>
      </div>

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

      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <ProductEnquiryForm product={product} onClose={() => setShowEnquiryForm(false)} />
          </div>
        </div>
      )}
    </>
  )
}
