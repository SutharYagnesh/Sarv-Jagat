"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Award, Target, Eye, Heart, CheckCircle, Calendar, Phone, Mail } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Company milestones data
  const milestones = [
    { year: "2008", event: "Sarv Jagat founded with vision to provide quality compressed air solutions" },
    { year: "2011", event: "Launched first indigenous screw air compressor series" },
    { year: "2014", event: "Expanded to serve 500+ industrial clients across India" },
    { year: "2017", event: "Introduced oil-free compressor technology for pharmaceutical industry" },
    { year: "2020", event: "Achieved ISO 9001:2015 certification for quality management" },
    { year: "2022", event: "Launched energy-efficient VSD compressor range" },
    { year: "2025", event: "Serving 2000+ clients with 50+ product variants" },
  ]

  // Leadership team data
  const leadership = [
    {
      name: "Jay Suthar",
      position: "Managing Director & CEO",
      experience: "5+ years",
      expertise: "Industrial Engineering, Business Strategy",
      image: "/sj-jay.png",
    },
    {
      name: "Anil Suthar",
      position: "Technical Director",
      experience: "20+ years",
      expertise: "Compressor Technology, R&D",
      image: "/sj-anil.jpg",
    },
    {
      name: "Yagnesh Suthar",
      position: "Technologist",
      experience: "2+ years",
      expertise: "full-stack-developer ",
      image: "/yagnesh-tech-sj.jpg",
    },
  ]

  // Certifications and awards
  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management System", year: "2015" },
    { name: "ISO 14001:2015", description: "Environmental Management System", year: "2018" },
    { name: "OHSAS 18001", description: "Occupational Health & Safety", year: "2019" },
    { name: "CE Marking", description: "European Conformity Standards", year: "2020" },
  ]

  const awards = [
    { name: "Best Industrial Equipment Supplier", organization: "India Manufacturing Awards", year: "2023" },
    { name: "Excellence in Customer Service", organization: "Industrial Excellence Awards", year: "2022" },
    { name: "Innovation in Compressed Air Technology", organization: "Engineering Excellence Awards", year: "2021" },
    { name: "Sustainable Manufacturing Practices", organization: "Green Industry Awards", year: "2020" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-red-400">Sarv Jagat</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Pioneering compressed air solutions for over 25 years, serving industries across India with innovation,
              quality, and unwavering commitment to excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-400" />
                <span>Est. 2008</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                <span>2000+ Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-red-400" />
                <span>ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              {/* Mission, Vision, Values */}
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-l-4 border-l-blue-600">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Target className="h-8 w-8 text-blue-600" />
                      <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      To provide innovative, energy-efficient compressed air solutions that empower industries to
                      achieve operational excellence while contributing to sustainable manufacturing practices across
                      India.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-600">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Eye className="h-8 w-8 text-red-600" />
                      <CardTitle className="text-2xl">Our Vision</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      To be India's most trusted partner in compressed air technology, recognized for innovation,
                      quality, and customer-centric solutions that drive industrial growth and environmental
                      sustainability.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-600">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Heart className="h-8 w-8 text-green-600" />
                      <CardTitle className="text-2xl">Our Values</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Quality Excellence
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Customer Focus
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Innovation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Sustainability
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Integrity
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Company Stats */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-3xl font-bold text-center mb-8">Our Impact</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-red-400 mb-2">2000+</div>
                    <div className="text-lg">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-red-400 mb-2">50+</div>
                    <div className="text-lg">Product Variants</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-red-400 mb-2">15+</div>
                    <div className="text-lg">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-red-400 mb-2">15+</div>
                    <div className="text-lg">Industries Served</div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div>
                <h3 className="text-3xl font-bold text-center mb-8">Why Choose Sarv Jagat?</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Award className="h-8 w-8 text-blue-600" />,
                      title: "Quality Assurance",
                      description: "ISO certified manufacturing with rigorous quality control at every stage",
                    },
                    {
                      icon: <Users className="h-8 w-8 text-blue-600" />,
                      title: "Expert Team",
                      description: "100+ skilled engineers and technicians with decades of experience",
                    },
                    {
                      icon: <Building2 className="h-8 w-8 text-blue-600" />,
                      title: "Pan-India Presence",
                      description: "Service network across major industrial hubs in India",
                    },
                    {
                      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                      title: "Proven Track Record",
                      description: "15+ years of successful installations and satisfied customers",
                    },
                    {
                      icon: <Target className="h-8 w-8 text-blue-600" />,
                      title: "Custom Solutions",
                      description: "Tailored compressed air systems for specific industry requirements",
                    },
                    {
                      icon: <Phone className="h-8 w-8 text-blue-600" />,
                      title: "24/7 Support",
                      description: "Round-the-clock technical support and emergency service",
                    },
                  ].map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          {feature.icon}
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Our Journey</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From a small startup to India's trusted compressed air solutions provider
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-blue-200"></div>

                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <Badge variant="secondary" className="w-fit text-lg font-bold">
                            {milestone.year}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Leadership Tab */}
            <TabsContent value="leadership" className="space-y-8 ">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Leadership Team</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Meet the visionaries driving Sarv Jagat's success and innovation
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
                {leadership.map((leader, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow ">
                    <CardHeader>
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <Image
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-xl">{leader.name}</CardTitle>
                      <CardDescription className="text-blue-600 font-semibold">{leader.position}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>Experience:</strong> {leader.experience}
                        </p>
                        <p>
                          <strong>Expertise:</strong> {leader.expertise}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Certifications & Awards</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Recognition of our commitment to quality, safety, and excellence
                </p>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-2xl font-bold mb-6 text-center">Quality Certifications</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {certifications.map((cert, index) => (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <Badge variant="outline">{cert.year}</Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm">{cert.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h4 className="text-2xl font-bold mb-6 text-center">Industry Awards</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {awards.map((award, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Award className="h-8 w-8 text-yellow-600" />
                          <div>
                            <CardTitle className="text-lg">{award.name}</CardTitle>
                            <CardDescription>
                              {award.organization} - {award.year}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h3>
          <p className="text-xl mb-8">
            Join 2000+ satisfied customers who trust Sarv Jagat for their compressed air needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-blue-600">
              <Phone className="h-5 w-5 mr-2" />
              Contact Us Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Mail className="h-5 w-5 mr-2" />
              Request Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
