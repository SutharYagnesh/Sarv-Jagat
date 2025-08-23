import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Cog, Settings, Award, Phone, Gauge } from "lucide-react"
import Link from "next/link"

export default function SpecializedSolutionsPage() {
  const specializedSolutions = [
    {
      title: "Booster Compressors",
      description: "High-pressure booster systems for specialized applications up to 40 bar",
      features: ["Up to 40 Bar Output", "Multi-Stage Design", "Custom Configurations", "PET Applications"],
      applications: ["PET Bottle Manufacturing", "High Pressure Testing", "Gas Boosting", "Industrial Processes"],
      href: "/products/specialized",
    },
    {
      title: "Vacuum Pumps",
      description: "Industrial vacuum pumps for various vacuum applications and processes",
      features: ["High Vacuum Levels", "Oil-Free Options", "Continuous Operation", "Low Maintenance"],
      applications: ["Packaging Industry", "Material Handling", "Medical Suction", "Industrial Processes"],
      href: "/products/specialized",
    },
    {
      title: "Custom Engineered Systems",
      description: "Tailored compressed air solutions designed for specific customer requirements",
      features: ["Custom Design", "Application Specific", "Integrated Solutions", "Complete Systems"],
      applications: ["Unique Requirements", "Special Processes", "OEM Applications", "System Integration"],
      href: "/products/specialized",
    },
  ]

  const capabilities = [
    {
      icon: Cog,
      title: "Custom Engineering",
      description: "Tailored solutions designed to meet your specific application requirements",
    },
    {
      icon: Gauge,
      title: "High Pressure Systems",
      description: "Specialized high-pressure compressors for demanding applications",
    },
    {
      icon: Settings,
      title: "System Integration",
      description: "Complete turnkey solutions with integrated controls and accessories",
    },
    {
      icon: Award,
      title: "Expert Support",
      description: "Dedicated engineering support from design to commissioning",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Custom Solutions</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Specialized
              <span className="block text-red-400">Compressed Air Solutions</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Custom-engineered compressed air solutions including booster compressors, vacuum pumps, and specialized
              systems designed for unique industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/catalog">Download Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-gradient">Specialized Capabilities</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our expertise in delivering custom-engineered compressed air solutions for unique applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <capability.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{capability.title}</CardTitle>
                  <CardDescription>{capability.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Range Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-gradient">Specialized Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive range of specialized compressed air equipment for unique industrial requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {specializedSolutions.map((solution, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Applications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.applications.map((app, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <Link href={solution.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Need a Custom Compressed Air Solution?</h2>
            <p className="text-xl text-white/90">
              Our engineering team is ready to design and deliver specialized solutions for your unique requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Discuss Your Requirements
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
