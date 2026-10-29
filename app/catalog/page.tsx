'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Mail, Phone, Eye, RefreshCw, MessageSquare, Star, CheckCircle2 } from "lucide-react";
import { useCompanyInfo } from "@/lib/useCompanyInfo";

interface CatalogItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  pdfUrl: string;
  fileSize?: string;
  pages?: number;
  format?: string;
  isComprehensive?: boolean;
}

export default function CatalogPage() {
  const companyInfo = useCompanyInfo();
  const [catalogs, setCatalogs] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [downloadForm, setDownloadForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
  });

  useEffect(() => {
    fetch('/api/catalog')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setCatalogs(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to load catalogs', err))
      .finally(() => setLoading(false));
  }, []);

  const handleCustomCatalogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawPhone = (companyInfo.primaryPhone || '919157487233').replace(/[^0-9]/g, '');
    const text = `*Custom Catalog Request*\n\n*Name:* ${downloadForm.name}\n*Email:* ${downloadForm.email}\n*Company:* ${downloadForm.company}\n*Phone:* ${downloadForm.phone}\n*Requirements:* ${downloadForm.interest}`;
    window.open(`https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownload = (pdfUrl: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  const comprehensiveCatalog = catalogs.find((c) => c.isComprehensive) || (catalogs.length > 0 ? catalogs[0] : null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Product <span className="text-red-400">Catalogs</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Download comprehensive technical catalogs, engineering specifications, and documentation for {companyInfo.companyName} industrial compressed air solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-400" />
                <span>Detailed Specifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-red-400" />
                <span>Instant PDF Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-red-400" />
                <span>Latest Engineering Updates</span>
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
                <h3 className="text-3xl font-bold mb-4">Available Catalogs &amp; Brochures</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Browse and download our official product range documentation and engineering guides
                </p>
              </div>

              {loading ? (
                <div className="p-16 flex flex-col items-center justify-center gap-3 text-gray-500">
                  <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
                  <p>Loading available catalogs...</p>
                </div>
              ) : catalogs.length === 0 ? (
                <div className="bg-white border rounded-xl p-12 text-center max-w-2xl mx-auto shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Digital Catalogs Under Update</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Our technical engineering desk is currently revising our digital product brochures with the latest 2025/2026 machine specifications. In the meantime, you can request an instant customized catalog below, or contact our technical team directly.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/${(companyInfo.primaryPhone || '919157487233').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Sarv Jagat, please share your product catalog PDF.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium shadow-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Request Catalog on WhatsApp
                    </a>
                    <a
                      href={`tel:${companyInfo.primaryPhone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium shadow-sm transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Call {companyInfo.primaryPhone}
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catalogs.map((catalog) => (
                      <Card key={catalog._id} className="hover:shadow-lg transition-shadow flex flex-col justify-between">
                        <CardHeader>
                          <div className="relative h-44 bg-gradient-to-br from-blue-100 to-red-50 rounded-lg mb-4 flex items-center justify-center border">
                            <FileText className="h-16 w-16 text-red-600" />
                          </div>
                          <Badge variant="secondary" className="w-fit">
                            {catalog.category || 'General'}
                          </Badge>
                          <CardTitle className="text-xl mt-2">{catalog.title}</CardTitle>
                          {catalog.description && <CardDescription>{catalog.description}</CardDescription>}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 border-t pt-3">
                            <div>
                              <div className="font-medium text-gray-900">{catalog.pages || '-'}</div>
                              <div className="text-xs text-gray-500">Pages</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{catalog.fileSize || 'PDF'}</div>
                              <div className="text-xs text-gray-500">Size</div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{catalog.format || 'PDF'}</div>
                              <div className="text-xs text-gray-500">Format</div>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDownload(catalog.pdfUrl)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDownload(catalog.pdfUrl)} title="Preview in new tab">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Featured Comprehensive Main Catalog */}
                  {comprehensiveCatalog && (
                    <Card className="bg-gradient-to-r from-slate-900 via-blue-900 to-red-950 text-white shadow-xl mt-8">
                      <CardContent className="p-8">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/30 text-red-200 border border-red-400/40 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
                              <Star className="w-3.5 h-3.5 fill-red-400" />
                              Comprehensive Main Catalog
                            </span>
                            <h4 className="text-2xl md:text-3xl font-bold mb-4 font-serif">{comprehensiveCatalog.title}</h4>
                            <p className="text-slate-200 mb-6 text-sm leading-relaxed">
                              {comprehensiveCatalog.description ||
                                `Comprehensive catalog featuring the complete range of ${companyInfo.companyName} air compressor solutions, engineering specifications, pressure ratings, and application guidelines.`}
                            </p>
                            <div className="flex items-center gap-6 text-sm mb-6">
                              <div>
                                <div className="font-semibold text-white">{comprehensiveCatalog.pages || 'Full'} Pages</div>
                                <div className="text-slate-300 text-xs">Comprehensive</div>
                              </div>
                              <div>
                                <div className="font-semibold text-white">{comprehensiveCatalog.fileSize || 'PDF'}</div>
                                <div className="text-slate-300 text-xs">High Resolution</div>
                              </div>
                              <div>
                                <div className="font-semibold text-white">Latest Edition</div>
                                <div className="text-slate-300 text-xs">Verified OEM Specs</div>
                              </div>
                            </div>
                            <Button
                              size="lg"
                              className="bg-red-600 hover:bg-red-700 text-white shadow-lg"
                              onClick={() => handleDownload(comprehensiveCatalog.pdfUrl)}
                            >
                              <Download className="h-5 w-5 mr-2" />
                              Download Comprehensive Catalog
                            </Button>
                          </div>
                          <div className="text-center">
                            <div className="w-48 h-64 bg-white/10 rounded-lg flex items-center justify-center mx-auto border border-white/20 shadow-inner">
                              <FileText className="h-24 w-24 text-white/80" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            {/* Request Custom Catalog Tab */}
            <TabsContent value="request" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Request Custom Technical Catalog</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Need specific CFM/pressure parameters or customized plant documentation? Request a personalized brochure tailored to your facility.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Catalog Request Form</CardTitle>
                    <CardDescription>
                      Fill out the form below and our technical team will forward the appropriate engineering data sheets.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCustomCatalogSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={downloadForm.name}
                            onChange={(e) => setDownloadForm({ ...downloadForm, name: e.target.value })}
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={downloadForm.email}
                            onChange={(e) => setDownloadForm({ ...downloadForm, email: e.target.value })}
                            placeholder="corporate@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Company / Industry *</Label>
                          <Input
                            id="company"
                            required
                            value={downloadForm.company}
                            onChange={(e) => setDownloadForm({ ...downloadForm, company: e.target.value })}
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone / WhatsApp *</Label>
                          <Input
                            id="phone"
                            required
                            value={downloadForm.phone}
                            onChange={(e) => setDownloadForm({ ...downloadForm, phone: e.target.value })}
                            placeholder="+91-XXXXXXXXXX"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="interest">Equipment Interest / Required Air Flow (CFM / Bar)</Label>
                        <Input
                          id="interest"
                          value={downloadForm.interest}
                          onChange={(e) => setDownloadForm({ ...downloadForm, interest: e.target.value })}
                          placeholder="e.g. 50 HP Screw Compressor, 10 Bar, Refrigerated Air Dryer"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Catalog Request via WhatsApp
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
