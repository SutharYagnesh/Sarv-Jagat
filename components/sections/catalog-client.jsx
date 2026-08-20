'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Mail, Phone, Eye } from "lucide-react"
import { openWhatsApp } from "@/lib/whatsapp"

export default function CatalogClient({ catalogs }) {
  const [downloadForm, setDownloadForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
  })

  const handleDownloadSubmit = (e, fileUrl) => {
    e.preventDefault()
    if (fileUrl && fileUrl !== "#") {
      window.open(fileUrl, "_blank")
    }
  }

  const handleCustomRequest = (e) => {
    e.preventDefault();
    const text = `*New Custom Catalog Request*\n\n*Name:* ${downloadForm.name}\n*Email:* ${downloadForm.email}\n*Phone:* ${downloadForm.phone}\n*Company:* ${downloadForm.company}\n*Requirements:* ${downloadForm.interest}`;
    openWhatsApp(text);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const featuredCatalog = catalogs.length > 0 ? catalogs[0] : null;

  return (
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
            <Card key={catalog._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-blue-600" />
                </div>
                {catalog.category && (
                  <Badge variant="secondary" className="w-fit">
                    {catalog.category}
                  </Badge>
                )}
                <CardTitle className="text-xl mt-2">{catalog.title}</CardTitle>
                <CardDescription>{catalog.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <div className="font-medium">{formatFileSize(catalog.fileSize)}</div>
                    <div>Size</div>
                  </div>
                  <div>
                    <div className="font-medium">PDF</div>
                    <div>Format</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={(e) => handleDownloadSubmit(e, catalog.fileUrl)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={(e) => handleDownloadSubmit(e, catalog.fileUrl)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Catalog */}
        {featuredCatalog && (
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-bold mb-4">{featuredCatalog.title}</h4>
                  <p className="text-blue-100 mb-6">
                    {featuredCatalog.description || "Our most comprehensive catalog featuring the complete range of Sarv Jagat air compressor solutions."}
                  </p>
                  <div className="flex items-center gap-6 text-sm mb-6">
                    <div>
                      <div className="font-semibold">{formatFileSize(featuredCatalog.fileSize)}</div>
                      <div className="text-blue-200">High Quality</div>
                    </div>
                    <div>
                      <div className="font-semibold">PDF</div>
                      <div className="text-blue-200">Format</div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-blue-600"
                    onClick={(e) => handleDownloadSubmit(e, featuredCatalog.fileUrl)}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Featured Catalog
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
        )}
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
              <form className="space-y-6" onSubmit={handleCustomRequest}>
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
                  Request Custom Catalog via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
