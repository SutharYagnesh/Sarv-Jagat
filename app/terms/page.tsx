import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, Shield, Mail, Phone } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of <span className="text-red-400">Service</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using Sarv Jagat Corporation's website and
              services.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Scale className="h-5 w-5 text-red-400" />
              <span>Last updated: January 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  These Terms of Service ("Terms") govern your use of the Sarv Jagat Corporation website and services.
                  By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part
                  of these terms, then you may not access our services.
                </p>
                <p>
                  Sarv Jagat Corporation reserves the right to modify these Terms at any time. We will notify users of
                  any material changes by posting the updated Terms on our website.
                </p>
              </CardContent>
            </Card>

            {/* Use of Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Use of Our Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Permitted Use</h3>
                  <p className="text-gray-700 mb-3">You may use our website and services for:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Browsing product information and specifications</li>
                    <li>Requesting quotes and technical information</li>
                    <li>Contacting our sales and support teams</li>
                    <li>Downloading catalogs and documentation</li>
                    <li>Accessing dealer and service center information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Prohibited Use</h3>
                  <p className="text-gray-700 mb-3">You agree not to:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Use our services for any unlawful purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our services</li>
                    <li>Copy, reproduce, or distribute our content without permission</li>
                    <li>Use automated systems to access our website</li>
                    <li>Submit false or misleading information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Products and Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Products and Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Information</h3>
                  <p className="text-gray-700">
                    We strive to provide accurate product information, specifications, and pricing. However, we reserve
                    the right to correct any errors, inaccuracies, or omissions and to change or update information at
                    any time without prior notice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Quotations and Pricing</h3>
                  <p className="text-gray-700">
                    All quotations are valid for 30 days unless otherwise specified. Prices are subject to change
                    without notice. Final pricing will be confirmed at the time of order placement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Warranty</h3>
                  <p className="text-gray-700">
                    Our products are covered by manufacturer's warranty as specified in individual product
                    documentation. Warranty terms and conditions are available upon request.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  The content on our website, including but not limited to text, graphics, logos, images, and software,
                  is the property of Sarv Jagat Corporation and is protected by copyright, trademark, and other
                  intellectual property laws.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>You may not reproduce, distribute, or create derivative works without written permission</li>
                  <li>Our trademarks and logos may not be used without express authorization</li>
                  <li>Product specifications and technical data are proprietary information</li>
                  <li>User-generated content remains your property but grants us usage rights</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  To the maximum extent permitted by law, Sarv Jagat Corporation shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Interruption of business operations</li>
                  <li>Cost of substitute goods or services</li>
                  <li>Any damages arising from use of our website or services</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Our total liability for any claim shall not exceed the amount paid by you for the specific product or
                  service giving rise to the claim.
                </p>
              </CardContent>
            </Card>

            {/* Privacy and Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                  Privacy and Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>We collect information necessary to provide our services</li>
                  <li>Personal data is processed in accordance with applicable laws</li>
                  <li>We implement appropriate security measures to protect your information</li>
                  <li>You have rights regarding your personal data as outlined in our Privacy Policy</li>
                </ul>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Governing Law and Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
                  arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of
                  the courts in Ahmedabad, Gujarat, India.
                </p>
                <p className="text-gray-700">
                  We will attempt to resolve any disputes through good faith negotiations before resorting to legal
                  proceedings.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your access to our services immediately, without prior notice, for any
                  reason, including breach of these Terms.
                </p>
                <p className="text-gray-700">
                  Upon termination, your right to use our services will cease immediately. All provisions of these Terms
                  that should survive termination shall remain in effect.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated through
                  our website or by email. Your continued use of our services after such changes constitutes acceptance
                  of the new Terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:legal@sarvjagat.com" className="text-blue-600 hover:underline">
                        legal@sarvjagat.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href="tel:+919157487233" className="text-blue-600 hover:underline">
                        +91-9157487233
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-gray-700">
                        Sarv Jagat Corporation
                        <br />
                        Shade No-24, Vinayak Industrial Estate - 2
                        <br />
                        Kathwada-GIDC, Ahmedabad-382430, Gujarat, India
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
