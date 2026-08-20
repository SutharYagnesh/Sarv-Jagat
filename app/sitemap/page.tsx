import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Package, Building2, Wrench, Users, FileText, Phone, Mail, Archive, Layers, Tag } from "lucide-react"
import connectDB from "@/lib/db"
import Category from "@/lib/models/Category"
import Product from "@/lib/models/Product"
import Blog from "@/lib/models/Blog"

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return {
    title: "Sitemap | Sarv Jagat",
    description: "Navigate through all pages and sections of the Sarv Jagat Corporation website. Find exactly what you're looking for.",
    keywords: ["sitemap", "website structure", "navigation", "Sarv Jagat pages"],
    openGraph: {
      title: "Sitemap | Sarv Jagat",
      description: "Complete website structure and navigation for Sarv Jagat Corporation.",
      url: "https://sarvjagat.com/sitemap",
      siteName: "Sarv Jagat",
      images: [
        {
          url: "/og-sitemap.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  }
}

export default async function SitemapPage() {
  await connectDB()

  const [products, categories, blogs] = await Promise.all([
    Product.find({ status: 'Published' }).select('title slug category').sort({ createdAt: -1 }).lean(),
    Category.find({ status: 'Published' }).select('name slug').sort({ name: 1 }).lean(),
    Blog.find({ status: 'Published' }).select('title slug').sort({ createdAt: -1 }).lean(),
  ])

  const productChildren = products.length > 0 
    ? products.map(p => ({ title: p.title, href: `/products/${p.slug}` }))
    : []
    
  const categoryChildren = categories.length > 0 
    ? categories.map(c => ({ title: c.name, href: `/products/category/${c.slug}` }))
    : []

  const blogChildren = blogs.length > 0
    ? blogs.map(b => ({ title: b.title, href: `/blog/${b.slug}` }))
    : []

  const siteStructure = [
    {
      title: "Main Pages",
      icon: <Home className="h-5 w-5" />,
      href: "/",
      description: "Main sections of the Sarv Jagat Corporation website",
      children: [
        { title: "Home", href: "/" },
        { title: "About Us", href: "/about" },
        { title: "Products", href: "/products" },
        { title: "Services", href: "/services" },
        { title: "Industries", href: "/industries" },
        { title: "Catalog", href: "/catalog" },
        { title: "Blog", href: "/blog" },
        { title: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Product Categories",
      icon: <Tag className="h-5 w-5" />,
      href: "/products",
      description: "Browse our products by category",
      children: categoryChildren,
    },
    {
      title: "All Products",
      icon: <Package className="h-5 w-5" />,
      href: "/products",
      description: "Complete range of air compressor products",
      children: productChildren,
    },
    {
      title: "Industries",
      icon: <Building2 className="h-5 w-5" />,
      href: "/industries",
      description: "Industry-specific air compressor solutions",
      children: [
        { title: "Automotive Industry", href: "/industries/automotive" },
        { title: "Pharmaceuticals & Healthcare", href: "/industries/pharmaceuticals" },
        { title: "Food & Beverage", href: "/industries/food-beverage" },
        { title: "Textile & Garment", href: "/industries/textile" },
        { title: "Metal & Fabrication", href: "/industries/metal-fabrication" },
        { title: "Construction & Infrastructure", href: "/industries/construction" },
        { title: "Mining & Quarry", href: "/industries/mining" },
        { title: "Electronics & Semiconductor", href: "/industries/electronics" },
        { title: "Plastic & PET Bottle", href: "/industries/plastic-pet" },
        { title: "Chemical & Process", href: "/industries/chemical" },
      ],
    },
    {
      title: "Services",
      icon: <Wrench className="h-5 w-5" />,
      href: "/services",
      description: "Comprehensive service and support offerings",
      children: [
        { title: "Installation", href: "/services/installation" },
        { title: "AMC", href: "/services/amc" },
        { title: "Technical Support", href: "/services/technical-support" },
        { title: "Spare Parts", href: "/services/spare-parts" },
      ],
    },
    {
      title: "Company",
      icon: <Users className="h-5 w-5" />,
      href: "/about",
      description: "About Sarv Jagat Corporation",
      children: [
        { title: "About Us", href: "/about" },
        { title: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Resources & Legal",
      icon: <FileText className="h-5 w-5" />,
      href: "/catalog",
      description: "Documentation and resources",
      children: [
        { title: "Product Catalogs", href: "/catalog" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "Recent Blogs",
      icon: <FileText className="h-5 w-5" />,
      href: "/blog",
      description: "Read our latest articles and updates",
      children: blogChildren,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Site <span className="text-red-400">Map</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate through all pages and sections of the Sarv Jagat Corporation website. Find exactly what you're
              looking for.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-red-400" />
              <span>Complete website structure and navigation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteStructure.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                      {section.icon}
                    </div>
                    <Link href={section.href} className="hover:text-blue-600 transition-colors">
                      {section.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {section.children && (
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {section.children.map((child, childIndex) => (
                        <div key={childIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          <Link
                            href={child.href}
                            className="text-gray-700 hover:text-blue-600 transition-colors text-sm line-clamp-1"
                          >
                            {child.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button asChild variant="outline" size="sm">
                      <Link href={section.href}>Visit Section</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Need Help Finding Something?</h3>
                <p className="text-blue-100 mb-6">
                  Can't find what you're looking for? Our team is here to help you navigate our website and find the
                  right solutions.
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
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
