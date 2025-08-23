"use client"

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
export default function ContactPage() {
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
      name: "Head Office - Ahmedabad",
      address:
        "Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India",
      phone: "+91-9157487233",
      email: "contact@sarvjagat.com",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
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

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-red-600" />,
      title: "Phone Support",
      description: "24/7 technical support hotline",
      contact: "+91-9157487233",
      action: "Call Now",
      href: "tel:+919157487233",
    },
    {
      icon: <Mail className="h-8 w-8 text-red-600" />,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      contact: "contact@sarvjagat.com",
      action: "Send Email",
      href: "mailto:contact@sarvjagat.com",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-red-600" />,
      title: "WhatsApp Chat",
      description: "Instant support via WhatsApp",
      contact: "Available 24/7",
      action: "Start Chat",
      href: "https://wa.me/919157487233",
    },
    {
      icon: <Headphones className="h-8 w-8 text-red-600" />,
      title: "Technical Helpline",
      description: "Expert technical assistance",
      contact: "+91-9157487233",
      action: "Get Help",
      href: "tel:+919157487233",
    },
  ]

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      })

      if (response.ok) {
        alert("Thank you for your inquiry! We will contact you within 24 hours.")
        setContactForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          inquiry: "",
          message: "",
          preferredContact: "",
        })
      } else {
        throw new Error("Failed to submit form")
      }
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
                <span>Pan-India Presence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="contact">Contact Form</TabsTrigger>
              <TabsTrigger value="locations">Our Locations</TabsTrigger>
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

                        <Link href={"https://wa.me/message/QNU3M3AGOL3NH1"} target="_blank" rel="noopener noreferrer">
                        <Button type="submit"  size="lg" className="w-full bg-red-500">
                        Submit Application
                      </Button>
                       </Link>
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
                            <a href="tel:+919157487233" className="hover:underline">
                              +91-9157487233
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
                </div>
              </div>
            </TabsContent>

            {/* Locations Tab */}
            <TabsContent value="locations" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Our Locations</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Visit our offices across India for personalized service and support
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {offices.map((office, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-red-600" />
                            {office.name}
                          </CardTitle>
                          {office.type === "headquarters" && (
                            <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                              Head Office
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                        <p className="text-gray-700">{office.address}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <a href={`tel:${office.phone}`} className="text-gray-700 hover:text-red-600">
                          {office.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-red-600">
                          {office.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <p className="text-gray-700">{office.hours}</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a href={`tel:${office.phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Service Coverage Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Service Coverage</CardTitle>
                  <CardDescription className="text-center">
                    We provide comprehensive service coverage across India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-8 text-center">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-blue-800">North India</h4>
                        <p className="text-gray-700">Delhi, Punjab, Haryana, Rajasthan, UP, Uttarakhand</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-blue-800">West India</h4>
                        <p className="text-gray-700">Maharashtra, Gujarat, Goa, MP, Chhattisgarh</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-blue-800">South India</h4>
                        <p className="text-gray-700">Karnataka, Tamil Nadu, Andhra Pradesh, Kerala, Telangana</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Technical Support
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
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Sales Team
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
                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Schedule Service
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
                          "Yes, we provide complete installation and commissioning services by our certified technicians across India.",
                      },
                      {
                        question: "What warranty do you offer on your products?",
                        answer:
                          "We offer comprehensive warranty coverage: 2 years on screw compressors, 1 year on reciprocating compressors, and 6 months on accessories.",
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
