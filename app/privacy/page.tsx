import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, UserCheck, Mail, Phone } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy <span className="text-red-400">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how Sarv Jagat Corporation collects, uses, and protects your
              personal information.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-red-400" />
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
                  <Shield className="h-6 w-6 text-blue-600" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Sarv Jagat Corporation ("we," "our," or "us") is committed to protecting your privacy and ensuring the
                  security of your personal information. This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website, use our services, or interact with us.
                </p>
                <p>
                  By using our website or services, you consent to the data practices described in this Privacy Policy.
                  If you do not agree with the practices described in this policy, please do not use our website or
                  services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Eye className="h-6 w-6 text-blue-600" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                  <p className="text-gray-700 mb-3">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Company information and job title</li>
                    <li>Product inquiries and service requests</li>
                    <li>Communication preferences</li>
                    <li>Payment information for transactions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
                  <p className="text-gray-700 mb-3">
                    When you visit our website, we may automatically collect certain information:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website and search terms</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and fulfill orders</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Send product information and marketing communications</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and unauthorized access</li>
                  <li>Analyze website usage and performance</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Information Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Service Providers:</strong> We may share information with trusted third-party service
                    providers who assist us in operating our website and conducting business
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information when required by law or to protect
                    our rights and safety
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> Information may be transferred in connection with a merger,
                    acquisition, or sale of assets
                  </li>
                  <li>
                    <strong>Authorized Dealers:</strong> We may share relevant information with our authorized dealers
                    to provide you with local support
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Lock className="h-6 w-6 text-blue-600" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. These measures
                  include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Employee training on data protection practices</li>
                  <li>Secure data storage and backup systems</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we
                  strive to protect your information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Access:</strong> Request access to the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information, subject to legal
                    requirements
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Request a copy of your data in a structured format
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience and analyze
                  website usage. Cookies are small data files stored on your device. We use:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic website functionality
                  </li>
                  <li>
                    <strong>Analytics Cookies:</strong> Help us understand how visitors use our website
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can control cookie settings through your browser preferences. However, disabling certain cookies
                  may affect website functionality.
                </p>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                  requirements. We will notify you of any material changes by posting the updated policy on our website
                  and updating the "Last updated" date. Your continued use of our services after such changes
                  constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:privacy@sarvjagat.com" className="text-blue-600 hover:underline">
                        privacy@sarvjagat.com
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
