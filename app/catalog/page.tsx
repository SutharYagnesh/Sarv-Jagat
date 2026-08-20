import { FileText, Download, Eye, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import CatalogClient from "@/components/sections/catalog-client"
import connectDB from "@/lib/db"
import Catalog from "@/lib/models/Catalog"
import { generateMetadata } from './metadata'
export { generateMetadata }

async function getCatalogs() {
  try {
    await connectDB()
    const catalogs = await Catalog.find({ status: 'Published' }).sort({ order: 1 }).lean()
    return JSON.parse(JSON.stringify(catalogs))
  } catch (error) {
    console.error("Failed to fetch catalogs:", error)
    return []
  }
}

export default async function CatalogPage() {
  const catalogs = await getCatalogs();

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
          <CatalogClient catalogs={catalogs} />
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
