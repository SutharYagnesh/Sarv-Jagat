'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, ShieldCheck, MapPin, Phone, Mail, Globe, PackageCheck, Anchor, CheckCircle2 } from "lucide-react";
import { useCompanyInfo } from "@/lib/useCompanyInfo";

export default function ShippingPolicyPage() {
  const companyInfo = useCompanyInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Shipping &amp; Logistics Policy</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 text-red-600 mb-3">
            <Truck className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full">
              Industrial Logistics &amp; Freight
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Industrial Logistics, Dispatch &amp; Freight Policy
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            <strong>{companyInfo.companyName}</strong> coordinates end-to-end industrial freight delivery for heavy rotary screw compressors, piston compressor systems, refrigerated air dryers, and air receiver assemblies across all domestic industrial zones and international export corridors. This policy outlines our dispatch commitments, transit schedules, and logistics handling.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Immediate Dispatch</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <strong>Dispatch on Material Availability Day</strong>: Consignments are handed over to freight logistics immediately upon completion of factory assembly, pressure testing, and quality clearance.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Truck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Pan-India Transit</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <strong>2 to 15 Working Days</strong>: Domestic road freight across India depending on geographical corridor, state borders, and industrial hub proximity.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Globe className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Worldwide Export</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              <strong>25 to 35 Working Days</strong>: Global maritime and multimodal export logistics, subject to destination port schedules and customs clearance.
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              1. Material Availability &amp; Dispatch Protocol
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm">
              Because industrial compressed air equipment consists of high-capacity motors, precision rotary screws, and pressurized vessels, shipments follow a structured production and dispatch protocol:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>
                <strong>Dispatch upon Material Readiness:</strong> Standard in-stock equipment and genuine spare parts are dispatched on the same day material is ready and cleared by quality assurance.
              </li>
              <li>
                <strong>Engineered-to-Order Machinery:</strong> For custom-engineered installations (e.g. high-pressure booster units or specialized multi-stage packages), dispatch is executed on the exact milestone date agreed upon in the commercial contract.
              </li>
              <li>
                <strong>Pre-Dispatch Inspection:</strong> Every unit undergoes continuous electrical amp-draw testing, vibration balancing, and pressure stability verification prior to crating.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              2. Domestic Transit Schedules (Pan-India: 2 to 15 Working Days)
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">
              Road transportation across India is managed in collaboration with established industrial transport networks (such as V-Trans, TCI Freight, Safexpress, or dedicated full-truckload carriers):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li><strong>Western Corridor (Gujarat, Maharashtra, Rajasthan, MP):</strong> 2 to 5 working days.</li>
              <li><strong>Northern Corridor (Delhi NCR, Haryana, Punjab, UP):</strong> 3 to 7 working days.</li>
              <li><strong>Southern Corridor (Karnataka, Tamil Nadu, Telangana, AP, Kerala):</strong> 4 to 9 working days.</li>
              <li><strong>Eastern &amp; Remote Industrial Zones:</strong> 6 to 15 working days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              3. International &amp; Worldwide Shipping (25 to 35 Working Days)
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">
              For export clients across the Middle East, Africa, Southeast Asia, and worldwide:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>Export consignments are securely packaged in ISPM-15 heat-treated wooden crates suitable for sea freight container loading.</li>
              <li>Typical worldwide transit requires <strong>25 to 35 working days</strong> from port loading to destination CFS / port of arrival, subject to shipping line transshipment and local customs protocols.</li>
              <li>Commercial export documentation (Bill of Lading, Certificate of Origin, Packing List, Commercial Invoice) is coordinated via authorized banking channels.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              4. Commercial Freight Terms &amp; Tracking
            </h2>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm text-gray-700 space-y-2">
              <p><strong>Freight Structure:</strong> As confirmed in the official commercial quotation (Ex-Works, Freight-Prepaid, or Freight-To-Pay as agreed per purchase order terms).</p>
              <p><strong>Transit Documentation:</strong> Consignment Lorry Receipt (LR) copy or Bill of Lading (BL) with carrier details is dispatched to the client immediately upon vehicle departure from our works.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              5. Logistics &amp; Dispatch Coordination Desk
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              For active consignment tracking, freight billing queries, or special vehicle un-loading arrangements:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Logistics Coordinator Desk:</p>
                  <p>{companyInfo.primaryPhone} {companyInfo.secondaryPhone && `| ${companyInfo.secondaryPhone}`}</p>
                  <p className="text-xs text-gray-500">{companyInfo.workingHours || "Mon - Sat: 9:00 AM - 7:00 PM IST"}</p>
                </div>
              </div>

              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Dispatch Email:</p>
                  <p>{companyInfo.supportEmail || companyInfo.primaryEmail}</p>
                  <p className="text-xs text-gray-500">Official consignment &amp; tracking communications</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p>
                <strong>Factory Dispatch Works:</strong> {companyInfo.address}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
