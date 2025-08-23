"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpecsTable } from "@/components/specs-table"
import { ProductEnquiryForm } from "@/components/forms/product-enquiry-form"
import { Download, Share2, Heart, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

export function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)

  // Mock additional images for gallery
  const images = [product.image, product.image, product.image]

  const handleDownloadBrochure = () => {
    // Mock PDF download
    const link = document.createElement("a")
    link.href = "/placeholder-brochure.pdf"
    link.download = `${product.name}-brochure.pdf`
    link.click()
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.technology}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-primary">{product.price}</div>
              <div className="text-sm text-muted-foreground">Starting price</div>
            </div>

            {/* Key Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1" onClick={() => setShowEnquiryForm(true)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Request Quote
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownloadBrochure} className="flex-1 bg-transparent">
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </div>

            {/* Quick Specs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {product.capacity && (
                    <div>
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="ml-2 font-medium">{product.capacity}</span>
                    </div>
                  )}
                  {product.pressure && (
                    <div>
                      <span className="text-muted-foreground">Pressure:</span>
                      <span className="ml-2 font-medium">{product.pressure}</span>
                    </div>
                  )}
                  {product.power && product.power !== "N/A" && (
                    <div>
                      <span className="text-muted-foreground">Power:</span>
                      <span className="ml-2 font-medium">{product.power}</span>
                    </div>
                  )}
                  {product.technology && (
                    <div>
                      <span className="text-muted-foreground">Technology:</span>
                      <span className="ml-2 font-medium">{product.technology}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features & Benefits</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpecsTable specifications={product.specifications} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Features & Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.features?.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">{feature}</h4>
                          <p className="text-sm text-muted-foreground">
                            Advanced technology ensuring optimal performance and reliability.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Industry Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.industries?.map((industry, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-foreground mb-2 capitalize">{industry.replace("-", " & ")}</h4>
                        <p className="text-sm text-muted-foreground">
                          Ideal for {industry.replace("-", " and ")} industry applications.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Enquiry Form Modal */}
        {showEnquiryForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <ProductEnquiryForm product={product} onClose={() => setShowEnquiryForm(false)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
