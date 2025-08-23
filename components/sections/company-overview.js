import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Users, Globe } from "lucide-react"

export function CompanyOverview() {
  const highlights = [
    {
      icon: Award,
      title: "Industry Pioneer",
      description: "25+ years of excellence in industrial air compressor manufacturing",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "50+ skilled engineers and technicians across India",
    },
    {
      icon: Globe,
      title: "Pan-India Reach",
      description: "Serving customers across 15+ states with reliable service network",
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "ISO certified with rigorous quality standards and testing",
    },
  ]

  const values = [
    "Innovation & Technology",
    "Customer-Centric Approach",
    "Sustainable Manufacturing",
    "Continuous Improvement",
    "Safety First Culture",
    "Reliable Service Support",
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Story
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building Industrial Excellence Since 1999
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded with a vision to provide reliable compressed air solutions to Indian industries, Sarv Jagat
              Corporation has grown from a small workshop in Gujarat to a trusted name in industrial air compressors.
              Our commitment to innovation, quality, and customer satisfaction has driven us to develop cutting-edge air
              compression technologies that power industries across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                        <p className="text-gray-600 text-sm">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Core Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 mb-8">
              Today, we continue to push the boundaries of compressed air technology, always staying true to our
              founding principles of quality, innovation, and customer success. Every SJ compressor is built with
              precision and tested for reliability.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">States Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
