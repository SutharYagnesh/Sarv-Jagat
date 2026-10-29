'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, RotateCcw, Clock, CheckCircle2, Phone, Mail, MapPin, Handshake, FileCheck2, Scale } from "lucide-react";
import { useCompanyInfo } from "@/lib/useCompanyInfo";

export default function ReturnPolicyPage() {
  const companyInfo = useCompanyInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Return &amp; Warranty Policy</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 text-red-600 mb-3">
            <Scale className="w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full">
              Corporate &amp; B2B Assurance
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Industrial Warranty &amp; Return Policy
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            At <strong>{companyInfo.companyName}</strong>, our manufacturing process adheres to rigorous engineering benchmarks. All rotary screw compressors, piston compressors, refrigerated air dryers, and specialized compressed air assemblies are subjected to multi-stage factory load testing prior to commercial release. This policy governs all equipment returns, replacements, and service remediation on a <strong>warranty-based framework</strong> and through <strong>direct bilateral commercial consultation</strong>.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Warranty-Governed</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              All return, exchange, or parts replacement requests are administered strictly within the active timeline of the <strong>Manufacturer Warranty</strong> as defined in the commercial supply contract.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Handshake className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Bilateral Consultation</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Machinery resolutions are settled through <strong>direct technical dialogue</strong> between client engineers and our factory technical desk to ensure customized, amicable, and swift remediation.
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">OEM Factory Inspection</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Initial transit notifications must be placed within 14 calendar days of consignment arrival, with full OEM technical support available throughout the operational equipment lifecycle.
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              1. Warranty-Based Resolution &amp; Commercial Scope
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm">
              Because <strong>{companyInfo.companyName}</strong> supplies heavy capital machinery built to precise engineering specifications, standard commercial transactions are conducted on an institutional B2B contract basis:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>
                <strong>Warranty Timeline Administration:</strong> Any return, technical replacement, or component rectification is strictly governed by the product warranty period specified in the official Commercial Invoice / Purchase Order (typically 12 months from delivery or commissioning).
              </li>
              <li>
                <strong>Customer Consultation &amp; Mutual Accord:</strong> Outside standard manufacturing warranty clauses, any exceptional equipment return, modification, or commercial adjustment is carried out on the basis of <strong>direct discussion and mutual agreement</strong> between authorized corporate representatives.
              </li>
              <li>
                <strong>Technical Assessment:</strong> In lieu of immediate physical return, our dedicated field engineering team will first diagnose operating parameters, electrical stability, and pneumatic piping to resolve issues on-site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              2. Transit Inspection &amp; Notice Protocol
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-3">
              Consignments are transported under strict industrial packing standards. In the event of transit discrepancy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>The recipient must inspect the crating upon arrival and acknowledge any visible damage on the transport Lorry Receipt (LR) copy.</li>
              <li>Notice of transit impact or component omission should be lodged within <strong>48 hours to 14 calendar days</strong> of arrival via email or official helpline.</li>
              <li>Upon technical verification, replacement parts or corrective units are dispatched promptly, with freight managed per contract terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              3. Commercial Settlement &amp; Processing Timelines
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
              <li>When a physical return is mutually authorized, the equipment is received at our works for technical verification against operating guidelines.</li>
              <li>Upon completion of physical inspection, approved warranty credits or financial settlements are processed via official commercial banking channels (RTGS / NEFT) within <strong>5 to 7 business days</strong>.</li>
              <li>Customized plant installations engineered to bespoke facility drawings are subject to specific project contract terms agreed during bilateral negotiation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              4. Corporate Consultation &amp; Claims Desk
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              For any warranty clarification, technical consultation, or operational inquiry, please reach out to our corporate customer desk:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Direct Telephone Desk:</p>
                  <p>{companyInfo.primaryPhone} {companyInfo.secondaryPhone && `| ${companyInfo.secondaryPhone}`}</p>
                  <p className="text-xs text-gray-500">{companyInfo.workingHours || "Mon - Sat: 9:00 AM - 7:00 PM IST"}</p>
                </div>
              </div>

              <div className="p-4 bg-red-50/50 rounded border border-red-100 flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Corporate Email:</p>
                  <p>{companyInfo.primaryEmail}</p>
                  <p className="text-xs text-gray-500">Official technical &amp; commercial inquiries</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p>
                <strong>Works &amp; Factory Address:</strong> {companyInfo.address}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
