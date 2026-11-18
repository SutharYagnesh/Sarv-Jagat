
'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Headphones, Building2, Users, Wrench } from "lucide-react"
import Link from "next/link"
import { useCompanyInfo } from "@/lib/useCompanyInfo"

export default function ContactPage() {
  const companyInfo = useCompanyInfo()
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiry: "",
    message: "",
    preferredContact: "",
  })

  const offices = [
    {
      name: `Head Office - ${companyInfo.city || 'Ahmedabad'}`,
      address: companyInfo.address,
      phone: companyInfo.primaryPhone,
      email: companyInfo.primaryEmail,
      hours: companyInfo.workingHours || "Mon-Sat: 9:00 AM - 6:00 PM",
      type: "headquarters",
    },
    {
      name: "Mumbai Branch",
      address: "Unit 12, Industrial Estate, Andheri East, Mumbai - 400069, Maharashtra",
      phone: "+91-9157487233",
      email: "contact@sarvjagat.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
      type: "branch",
    },
    {
      name: "Delhi Branch",
      address: "B-45, Industrial Area, Phase-II, Noida - 201305, Uttar Pradesh",
      phone: "+91-9157487233",
      email: "contact@sarvjagat.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
      type: "branch",
    },
    {
      name: "Bangalore Branch",
      address: "No. 78, Industrial Layout, Peenya, Bangalore - 560058, Karnataka",
      phone: "+91-9157487233",
      email: "contact@sarvjagat.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
      type: "branch",
    },
  ]

  const rawPhone = (companyInfo.primaryPhone || '+919157487233').replace(/[^0-9]/g, '')

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-red-600" />,
      title: "Phone Support",
      description: "Direct engineering & sales hotline",
      contact: companyInfo.primaryPhone,
      action: "Call Now",
      href: `tel:${companyInfo.primaryPhone.replace(/[^0-9+]/g, '')}`,
    },
    {
      icon: <Mail className="h-8 w-8 text-red-600" />,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      contact: companyInfo.primaryEmail,
      action: "Send Email",
      href: `mailto:${companyInfo.primaryEmail}`,
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-red-600" />,
      title: "WhatsApp Chat",
      description: "Instant support via WhatsApp",
      contact: "Available 24/7",
      action: "Start Chat",
      href: `https://wa.me/${rawPhone}`,
    },
    {
      icon: <Headphones className="h-8 w-8 text-red-600" />,
      title: "Technical Helpline",
      description: "Expert technical assistance",
      contact: companyInfo.secondaryPhone || companyInfo.primaryPhone,
      action: "Get Help",
      href: `tel:${(companyInfo.secondaryPhone || companyInfo.primaryPhone).replace(/[^0-9+]/g, '')}`,
    },
  ]

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const text = `*New Contact Message*\n\n*Name:* ${contactForm.name}\n*Email:* ${contactForm.email}\n*Phone:* ${contactForm.phone}\n*Company:* ${contactForm.company}\n*Inquiry Type:* ${contactForm.inquiry}\n*Preferred Contact:* ${contactForm.preferredContact}\n*Message:* ${contactForm.message}`;
      const url = `https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");

      alert("Redirecting to WhatsApp. Please send the message to complete your inquiry.")
      setContactForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        inquiry: "",
        message: "",
        preferredContact: "",
      })
    } catch (error) {
      alert("There was an error submitting your form. Please try again or contact us directly.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact <span className="text-red-400">Sarv Jagat</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our experts for compressed air solutions, technical support, or any inquiries. We're
              here to help you 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-400" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-400" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-400" />
                <span>Worldwide Reach & Global Export</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="contact">Contact Form</TabsTrigger>
              <TabsTrigger value="support">Support Center</TabsTrigger>
            </TabsList>

            {/* Contact Form Tab */}
            <TabsContent value="contact" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Send us a Message</CardTitle>
                      <CardDescription>
                        Fill out the form below and our team will get back to you within 24 hours
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleContactSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              value={contactForm.phone}
                              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="company">Company Name</Label>
                            <Input
                              id="company"
                              value={contactForm.company}
                              onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="inquiry">Inquiry Type *</Label>
                            <Select onValueChange={(value) => setContactForm({ ...contactForm, inquiry: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="product">Product Information</SelectItem>
                                <SelectItem value="quote">Request Quote</SelectItem>
                                <SelectItem value="service">Service Support</SelectItem>
                                <SelectItem value="technical">Technical Support</SelectItem>
                                <SelectItem value="dealer">Dealer Inquiry</SelectItem>
                                <SelectItem value="career">Career Opportunities</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                            <Select
                              onValueChange={(value) => setContactForm({ ...contactForm, preferredContact: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select contact method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="phone">Phone Call</SelectItem>
                                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                <SelectItem value="visit">Site Visit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            placeholder="Please provide details about your inquiry, requirements, or any specific questions..."
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            rows={6}
                            required
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white mt-6">
                          Send Message via WhatsApp
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                    <div className="space-y-4">
                      {contactMethods.map((method, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              {method.icon}
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1">{method.title}</h4>
                                <p className="text-gray-600 mb-2">{method.description}</p>
                                <p className="font-medium text-red-600 mb-3">{method.contact}</p>
                                <Button asChild variant="outline" size="sm">
                                  <a
                                    href={method.href}
                                    target={method.href.startsWith("http") ? "_blank" : undefined}
                                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  >
                                    {method.action}
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Quick Contact Info */}
                  <Card className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-4">Emergency Support</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-red-200" />
                          <div>
                            <p className="font-semibold">24/7 Emergency Hotline</p>
                            <a href="tel:+919157770753" className="hover:underline">
                              +91-9157770753
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-red-200" />
                          <div>
                            <p className="font-semibold">Emergency Email</p>
                            <a href="mailto:contact@sarvjagat.com" className="hover:underline">
                              contact@sarvjagat.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Google Verified Merchant & Customer Reviews */}
                  <Card className="border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">Google Customer Reviews</h4>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-green-100 text-green-800">
                              Verified
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            Official Google Merchant Center Participant (ID: 5892979250) for verified buyer feedback and industrial supply reliability.
                          </p>
                          <a 
                            href="https://www.google.com/search?q=Sarv+Jagat+Corporation+Ahmedabad" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 hover:underline"
                          >
                            View Google Profile &amp; Reviews &rarr;
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>



            {/* Support Center Tab */}
            <TabsContent value="support" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Support Center</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get the help you need with our comprehensive support services
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Technical Support */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Wrench className="h-12 w-12 text-red-600 mb-4" />
                    <CardTitle className="text-xl">Technical Support</CardTitle>
                    <CardDescription>Expert technical assistance for all your compressor needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-semibold">Available Services:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Installation guidance</li>
                        <li>• Troubleshooting support</li>
                        <li>• Performance optimization</li>
                        <li>• Maintenance scheduling</li>
                      </ul>
                    </div>
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <a href={`tel:${(companyInfo.secondaryPhone || companyInfo.primaryPhone).replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Technical Support
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Sales Support */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-12 w-12 text-red-600 mb-4" />
                    <CardTitle className="text-xl">Sales Support</CardTitle>
                    <CardDescription>Get expert advice on choosing the right compressor solution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-semibold">Available Services:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Product consultation</li>
                        <li>• Custom quotations</li>
                        <li>• Site surveys</li>
                        <li>• Energy audits</li>
                      </ul>
                    </div>
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <a href={`mailto:${companyInfo.primaryEmail}`} className="flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Sales Team
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Service Support */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Headphones className="h-12 w-12 text-red-600 mb-4" />
                    <CardTitle className="text-xl">Service Support</CardTitle>
                    <CardDescription>Comprehensive after-sales service and maintenance support</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-semibold">Available Services:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• AMC management</li>
                        <li>• Spare parts supply</li>
                        <li>• Emergency repairs</li>
                        <li>• Preventive maintenance</li>
                      </ul>
                    </div>
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <a href={`tel:${companyInfo.primaryPhone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Schedule Service
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        question: "What is your response time for technical support?",
                        answer:
                          "We provide 24/7 technical support with response times of 2 hours for critical issues and 24 hours for general inquiries.",
                      },
                      {
                        question: "Do you provide on-site installation services?",
                        answer:
                          "Yes, we provide complete installation, commissioning, and technical setup services by our certified technicians and authorized global support partners worldwide.",
                      },
                      {
                        question: "What warranty do you offer on your products?",
                        answer:
                          "We offer comprehensive warranty coverage: 1 years on screw compressors, 1 year on reciprocating compressors, and 6 months on accessories.",
                      },
                      {
                        question: "How can I schedule preventive maintenance?",
                        answer:
                          "You can schedule maintenance through our AMC program by calling our service hotline or using our online service portal.",
                      },
                    ].map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
