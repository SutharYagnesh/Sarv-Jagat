import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, RotateCcw, Clock, CheckCircle2, Phone, Mail, MapPin, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Return & Refund Policy | Sarv Jagat Corporation",
  description:
    "Official Return and Refund Policy of Sarv Jagat Corporation for industrial air compressors, screw compressors, refrigerated dryers, and spare parts. 14-day return window and 12-month manufacturer warranty.",
  alternates: {
    canonical: "https://www.sarvjagat.com/return-policy",
  },
  openGraph: {
    title: "Return & Refund Policy | Sarv Jagat Corporation",
    description:
      "Learn about Sarv Jagat Corporation's return window, warranty coverage, refund processing, and replacement guidelines.",
    url: "https://www.sarvjagat.com/return-policy",
    type: "website",
  },
}

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Return & Refund Policy</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 text-red-600 mb-3">
            <RotateCcw className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full">
              Customer Assurance
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Return, Refund & Warranty Policy
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            At <strong>Sarv Jagat Corporation</strong>, customer satisfaction, engineering precision, and long-term equipment reliability are our highest priorities. All our industrial air compressors, dryers, and genuine spares undergo rigorous factory testing before dispatch. This policy outlines our return, replacement, and refund terms in compliance with Indian consumer protection standards and Google Merchant policies.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">14-Day Return Window</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Notify us within 14 calendar days of receiving your equipment or components if there is any transit damage, manufacturing defect, or order discrepancy.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">12-Month Warranty</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              All complete air compressor systems carry an extensive 12-month manufacturer warranty covering manufacturing defects, rotary screw airends, and electrical motors.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">100% Free Replacements</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              If an item arrives damaged or defective from our factory, return freight and replacement shipments are provided at zero cost to the client.
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              1. Eligibility for Returns & Replacements
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              To be eligible for a return or exchange:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>The return request must be submitted within <strong>14 calendar days</strong> of equipment delivery.</li>
              <li>The equipment, machine, or part must be in its original packaging, unused, and include all accompanying accessories, documentation, user manuals, and warranty cards.</li>
              <li>Goods damaged due to improper on-site electrical wiring, incorrect lubrication, unauthorized tampering, or mishandling after delivery are not eligible for standard return, but remain eligible for paid service support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              2. Transit Damage & Defective Products
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">
              We take utmost care in industrial crating and packaging. However, if transit damage occurs:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>Please inspect the consignment upon receipt and note any physical package damage on the carrier delivery receipt (LR copy).</li>
              <li>Photograph or record video of the damaged area and notify our logistics team within <strong>48 hours</strong> at <strong>contact@sarvjagat.com</strong> or WhatsApp <strong>+91 91574 87233</strong>.</li>
              <li>Our technical engineer will inspect the claim, arrange reverse pickup at our expense, and dispatch an immediate replacement or required component.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              3. Refund Process & Timelines
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>Once the returned machinery or spare part is received at our Ahmedabad factory warehouse and inspected, we will notify you of the approval or rejection of your refund.</li>
              <li>Upon approval, refunds are credited directly via bank transfer (NEFT/RTGS/IMPS) or the original payment method within <strong>5 to 7 business days</strong>.</li>
              <li>For customized industrial engineering builds (e.g. customized multi-stage high-pressure compressors built to client-specific CAD specs), refunds are subject to agreed contract cancellation terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              4. Return Shipping Fees
            </h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm text-gray-700 space-y-2">
              <p><strong>Defective / Incorrect Delivery:</strong> Return freight is 100% free of charge and paid by Sarv Jagat Corporation.</p>
              <p><strong>Customer Discretionary Returns:</strong> For non-defective parts or client specification changes, the client is responsible for standard freight charges to our Ahmedabad works.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              5. How to Initiate a Return or Service Request
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Phone Support:</p>
                  <p>+91 91574 87233 / +91 91577 70753</p>
                  <p className="text-xs text-gray-500">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Email Support:</p>
                  <p>contact@sarvjagat.com</p>
                  <p className="text-xs text-gray-500">Expect a response within 2-4 business hours</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p>
                <strong>Factory Address:</strong> Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road, Kathwada-GIDC, Ahmedabad, Gujarat 382430, India.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

