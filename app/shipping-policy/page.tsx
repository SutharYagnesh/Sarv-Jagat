import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, ShieldCheck, MapPin, Phone, Mail, PackageCheck } from "lucide-react"

export const metadata = {
  title: "Shipping & Delivery Policy | Sarv Jagat Corporation",
  description:
    "Official Shipping & Logistics Policy of Sarv Jagat Corporation. Safe industrial packaging, pan-India delivery, handling times, freight insurance, and tracking.",
  alternates: {
    canonical: "https://www.sarvjagat.com/shipping-policy",
  },
  openGraph: {
    title: "Shipping & Delivery Policy | Sarv Jagat Corporation",
    description:
      "Safe industrial packaging, pan-India freight delivery, handling times, and tracking for Sarv Jagat air compressors.",
    url: "https://www.sarvjagat.com/shipping-policy",
    type: "website",
  },
}

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Shipping & Delivery Policy</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 text-red-600 mb-3">
            <Truck className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full">
              Industrial Logistics
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Shipping & Freight Delivery Policy
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            <strong>Sarv Jagat Corporation</strong> ships heavy industrial air compressors, variable speed screw compressors, refrigerated dryers, and replacement parts across all states and union territories in India, as well as international export destinations. We partner with reliable road logistics and freight carriers to guarantee secure, on-time delivery directly to your factory or workshop.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Handling Time</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <strong>1 to 3 Business Days</strong> for standard in-stock compressors, components, and air dryers to undergo pre-dispatch quality checks and crating.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Truck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Transit Time</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <strong>3 to 7 Business Days</strong> across India depending on the state, city industrial zone, and local freight logistics hub.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <PackageCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Free Freight Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Standard industrial delivery is free (0.00 INR freight) for complete compressor orders, as agreed in our quotation specifications.
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              1. Pan-India Delivery Coverage
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm">
              We ship to all major manufacturing and industrial centers including Gujarat, Maharashtra, Rajasthan, Karnataka, Tamil Nadu, Telangana, Delhi NCR, Uttar Pradesh, Punjab, Haryana, Madhya Pradesh, West Bengal, and beyond.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Deliveries are coordinated with registered transport companies (e.g. V-Trans, TCI Freight, Safexpress, ARC, or dedicated vehicle transport for bulk industrial orders).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              2. Industrial Packaging & Protection
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>Heavy equipment is securely bolted onto heavy-duty wooden skids / export-grade pallets.</li>
              <li>Moisture-resistant heavy poly wrapping and protective corner foam shield delicate gauge dials, panels, and painted sheet metal.</li>
              <li>Consignments are covered under marine/transit insurance to safeguard against transit hazards.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              3. Order Tracking & Dispatch Updates
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">
              Once your shipment leaves our factory in Ahmedabad:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>You receive a copy of the <strong>Lorry Receipt (LR)</strong>, carrier contact information, and estimated arrival window via email and WhatsApp.</li>
              <li>Our dispatch desk continuously monitors transit progress until safe unloading at your facility.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              4. Logistics Desk & Delivery Inquiries
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Dispatch Coordinator:</p>
                  <p>+91 91574 87233</p>
                  <p className="text-xs text-gray-500">Call for immediate LR / consignment tracking</p>
                </div>
              </div>

              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Dispatch Email:</p>
                  <p>contact@sarvjagat.com</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

