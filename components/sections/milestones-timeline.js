import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Award, Rocket } from "lucide-react"

export function MilestonesTimeline() {
  const milestones = [
    {
      year: "1974",
      title: "Company Founded",
      description: "Started as a small workshop in Mumbai with a vision to revolutionize industrial manufacturing.",
      icon: Rocket,
      highlight: true,
    },
    {
      year: "1982",
      title: "First Major Contract",
      description: "Secured our first major industrial contract, establishing credibility in the market.",
      icon: Award,
    },
    {
      year: "1995",
      title: "International Expansion",
      description: "Expanded operations to Southeast Asia, marking our entry into international markets.",
      icon: MapPin,
    },
    {
      year: "2001",
      title: "ISO Certification",
      description: "Achieved ISO 9001:2000 certification, demonstrating our commitment to quality standards.",
      icon: Award,
      highlight: true,
    },
    {
      year: "2008",
      title: "Technology Innovation",
      description: "Launched our first smart industrial equipment line with IoT capabilities.",
      icon: Rocket,
    },
    {
      year: "2015",
      title: "Global Presence",
      description: "Established operations in 20+ countries with regional service centers worldwide.",
      icon: MapPin,
      highlight: true,
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Implemented Industry 4.0 solutions and launched our digital platform for remote monitoring.",
      icon: Rocket,
    },
    {
      year: "2024",
      title: "Sustainable Future",
      description: "Committed to carbon-neutral operations and launched our green technology initiative.",
      icon: Award,
      highlight: true,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">50 Years of Innovation & Growth</h2>
            <p className="text-lg text-gray-600">
              From humble beginnings to global leadership, explore the key milestones that shaped our company.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-200 hidden md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="hidden md:flex w-16 h-16 bg-white border-4 border-red-200 rounded-full items-center justify-center flex-shrink-0 relative z-10">
                      <Icon className={`w-6 h-6 ${milestone.highlight ? "text-red-600" : "text-gray-600"}`} />
                    </div>

                    {/* Content */}
                    <Card className={`flex-1 ${milestone.highlight ? "ring-2 ring-red-100" : ""}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant={milestone.highlight ? "default" : "secondary"} className="bg-red-600">
                                {milestone.year}
                              </Badge>
                              <div className="md:hidden">
                                <Icon className={`w-5 h-5 ${milestone.highlight ? "text-red-600" : "text-gray-600"}`} />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-red-50 border-red-100">
              <CardContent className="p-8">
                <Calendar className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking Ahead</h3>
                <p className="text-gray-600 leading-relaxed">
                  As we continue our journey, we remain committed to innovation, sustainability, and excellence. Our
                  vision for the next 50 years includes pioneering new technologies, expanding our global reach, and
                  creating solutions that will shape the future of industrial manufacturing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
