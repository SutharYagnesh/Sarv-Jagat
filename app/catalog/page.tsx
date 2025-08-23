"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Mail, Phone, Eye } from "lucide-react"

export default function CatalogPage() {
  const [downloadForm, setDownloadForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
  })

  const catalogs = [
    {
      id: 1,
      title: "Complete Product Catalog 2024",
      description: "Comprehensive catalog featuring all Sarv Jagat air compressor products and specifications",
      pages: 120,
      size: "15.2 MB",
      format: "PDF",
      category: "Complete Range",
      image: "/catalog-complete.png",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1-_e_SCeR8ppQQ3bbThJkNeXHJS2U5mtt",
    },
    {
      id: 2,
      title: "Screw Air Compressors",
      description: "Detailed specifications and technical data for rotary screw compressors",
      pages: 45,
      size: "8.5 MB",
      format: "PDF",
      category: "Screw Compressors",
      image: "/catalog-screw.png",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Reciprocating Piston Compressors",
      description: "Complete range of single and multi-stage piston compressors",
      pages: 38,
      size: "6.8 MB",
      format: "PDF",
      category: "Piston Compressors",
      image: "/catalog-piston.png",
      downloadUrl: "#",
    },
    {
      id: 4,
      title: "Oil-Free Air Systems",
      description: "Contamination-free air solutions for critical applications",
      pages: 28,
      size: "4.2 MB",
      format: "PDF",
      category: "Oil-Free Systems",
      image: "/catalog-oilfree.png",
      downloadUrl: "#",
    },
    {
      id: 5,
      title: "Service & Maintenance Guide",
      description: "Comprehensive maintenance procedures and service schedules",
      pages: 65,
      size: "9.1 MB",
      format: "PDF",
      category: "Service",
      image: "/catalog-service.png",
      downloadUrl: "#",
    },
    {
      id: 6,
      title: "Spare Parts Catalog",
      description: "Complete spare parts listing with part numbers and specifications",
      pages: 85,
      size: "12.3 MB",
      format: "PDF",
      category: "Spare Parts",
      image: "/catalog-parts.png",
      downloadUrl: "#",
    },
  ]

  const handleDownloadSubmit = (e, catalogId) => {
    e.preventDefault()
    const catalog = catalogs.find((c) => c.id === catalogId)
    if (catalog && catalog.downloadUrl !== "#") {
      window.open(catalog.downloadUrl, "_blank")
    }
    alert("Thank you! Your download will begin shortly. We'll also send you updates about our latest products.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Product <span className="text-red-400">Catalogs</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Download comprehensive product catalogs, technical specifications, and documentation for all Sarv Jagat
              air compressor solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-400" />
                <span>Detailed Specifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-red-400" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-red-400" />
                <span>Latest Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="catalogs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="catalogs">Product Catalogs</TabsTrigger>
              <TabsTrigger value="request">Request Custom Catalog</TabsTrigger>
            </TabsList>

            {/* Catalogs Tab */}
            <TabsContent value="catalogs" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Available Catalogs</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Browse and download our comprehensive product catalogs and technical documentation
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {catalogs.map((catalog) => (
                  <Card key={catalog.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-blue-600" />
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {catalog.category}
                      </Badge>
                      <CardTitle className="text-xl">{catalog.title}</CardTitle>
                      <CardDescription>{catalog.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <div className="font-medium">{catalog.pages}</div>
                          <div>Pages</div>
                        </div>
                        <div>
                          <div className="font-medium">{catalog.size}</div>
                          <div>Size</div>
                        </div>
                        <div>
                          <div className="font-medium">{catalog.format}</div>
                          <div>Format</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={(e) => handleDownloadSubmit(e, catalog.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Featured Catalog */}
              <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h4 className="text-2xl font-bold mb-4">Complete Product Catalog 2024</h4>
                      <p className="text-blue-100 mb-6">
                        Our most comprehensive catalog featuring the complete range of Sarv Jagat air compressor
                        solutions, technical specifications, and application guidelines.
                      </p>
                      <div className="flex items-center gap-6 text-sm mb-6">
                        <div>
                          <div className="font-semibold">120 Pages</div>
                          <div className="text-blue-200">Comprehensive</div>
                        </div>
                        <div>
                          <div className="font-semibold">15.2 MB</div>
                          <div className="text-blue-200">High Quality</div>
                        </div>
                        <div>
                          <div className="font-semibold">2024 Edition</div>
                          <div className="text-blue-200">Latest</div>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="text-blue-600"
                        onClick={(e) => handleDownloadSubmit(e, 1)}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download Complete Catalog
                      </Button>
                    </div>
                    <div className="text-center">
                      <div className="w-48 h-64 bg-white/10 rounded-lg flex items-center justify-center mx-auto">
                        <FileText className="h-24 w-24 text-white/80" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Request Custom Catalog Tab */}
            <TabsContent value="request" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Request Custom Catalog</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Need specific product information or custom documentation? Request a personalized catalog tailored to
                  your requirements.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Custom Catalog Request</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll create a customized catalog based on your specific needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={downloadForm.name}
                            onChange={(e) => setDownloadForm({ ...downloadForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={downloadForm.email}
                            onChange={(e) => setDownloadForm({ ...downloadForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            value={downloadForm.company}
                            onChange={(e) => setDownloadForm({ ...downloadForm, company: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={downloadForm.phone}
                            onChange={(e) => setDownloadForm({ ...downloadForm, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="interest">Specific Requirements</Label>
                        <textarea
                          id="interest"
                          className="w-full p-3 border border-gray-300 rounded-md"
                          rows={4}
                          placeholder="Please describe your specific requirements, industry, application, or any particular products you're interested in..."
                          value={downloadForm.interest}
                          onChange={(e) => setDownloadForm({ ...downloadForm, interest: e.target.value })}
                        ></textarea>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <Mail className="h-5 w-5 mr-2" />
                        Request Custom Catalog
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Need More Information?</h3>
          <p className="text-xl mb-8">
            Our technical team is ready to help you choose the right air compressor solution for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:+919157487233">Call +91-9157487233</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:contact@sarvjagat.com">Email Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
