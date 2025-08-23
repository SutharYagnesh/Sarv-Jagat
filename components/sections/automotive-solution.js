import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AutomotiveSolution() {
  const automotiveApplications = [
    {
      title: "Vehicle Assembly Lines",
      description: "Pneumatic tools and automation systems for efficient vehicle production",
      requirements: ["High reliability", "Consistent pressure", "Oil-free air"],
      pressure: "6-8 bar",
      image: "automotive assembly line with pneumatic tools",
    },
    {
      title: "Paint Booths",
      description: "Clean, dry compressed air for high-quality automotive painting",
      requirements: ["Oil-free air", "Low moisture", "Particle filtration"],
      pressure: "2-4 bar",
      image: "automotive paint booth spray painting",
    },
    {
      title: "Tire Manufacturing",
      description: "Compressed air for tire molding and curing processes",
      requirements: ["High pressure", "Continuous operation", "Temperature control"],
      pressure: "10-25 bar",
      image: "tire manufacturing molding process",
    },
    {
      title: "Quality Testing",
      description: "Pneumatic testing equipment for safety and performance validation",
      requirements: ["Precise pressure control", "Clean air", "Reliable operation"],
      pressure: "1-10 bar",
      image: "automotive quality testing equipment",
    },
  ]

  const benefits = [
    {
      icon: "⚡",
      title: "Energy Efficiency",
      description: "Advanced compressor technology reduces energy consumption by up to 30%",
    },
    {
      icon: "🔧",
      title: "Low Maintenance",
      description: "Designed for continuous operation with minimal maintenance requirements",
    },
    {
      icon: "🎯",
      title: "Precise Control",
      description: "Advanced control systems ensure consistent pressure and flow rates",
    },
    {
      icon: "🛡️",
      title: "Reliability",
      description: "Built to automotive industry standards for maximum uptime",
    },
    {
      icon: "🌱",
      title: "Eco-Friendly",
      description: "Reduced emissions and environmental impact through efficient operation",
    },
    {
      icon: "📊",
      title: "Smart Monitoring",
      description: "IoT-enabled monitoring for predictive maintenance and optimization",
    },
  ]

  const caseStudy = {
    company: "Major Automotive OEM",
    challenge: "Needed reliable compressed air system for new assembly plant with 24/7 operation",
    solution: "Installed redundant rotary screw compressors with smart controls and air treatment",
    results: [
      "99.9% uptime achieved",
      "25% reduction in energy costs",
      "Improved product quality",
      "Reduced maintenance costs",
    ],
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Automotive Industry Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Powering the automotive industry with reliable, efficient compressed air solutions for manufacturing,
            assembly, and quality control processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Custom Solution</Button>
            <Button variant="outline" size="lg">
              Download Brochure
            </Button>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Automotive Applications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {automotiveApplications.map((app, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{app.title}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <img
                      src={`/abstract-geometric-shapes.png?height=200&width=400&query=${app.image}`}
                      alt={app.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Operating Pressure: </span>
                      <span className="font-semibold text-blue-600">{app.pressure}</span>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.requirements.map((req, idx) => (
                          <Badge key={idx} variant="secondary">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Automotive Solutions?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Success Story</CardTitle>
            <CardDescription className="text-center">
              How we helped a major automotive manufacturer optimize their compressed air system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{caseStudy.company}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Challenge:</h4>
                    <p className="text-gray-600">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Solution:</h4>
                    <p className="text-gray-600">{caseStudy.solution}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Results Achieved:</h4>
                <ul className="space-y-2">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-600">{result}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <img
                    src="/automotive-compressed-air.png"
                    alt="Automotive Manufacturing Plant"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Automotive Operations?</h2>
          <p className="text-xl mb-6 opacity-90">
            Let our experts design a custom compressed air solution for your facility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
