import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Phone, Settings, Factory, Gauge } from "lucide-react"
import Link from "next/link"

export default function MultiStagePistonPage() {
  const specifications = [
    { label: "Power Range", value: "10 HP to 50 HP" },
    { label: "Pressure Range", value: "Up to 40 Bar (580 PSI)" },
    { label: "Air Delivery", value: "35 to 150 CFM" },
    { label: "Stages", value: "3 to 4 Stage Compression" },
    { label: "Cooling", value: "Multi-Stage Intercooling" },
    { label: "Applications", value: "PET Bottle, High Pressure Testing" },
  ]

  const models = [
    {
      model: "SJ-MS-10HP",
      power: "10 HP",
      pressure: "30 Bar",
      airDelivery: "35 CFM",
      stages: "3 Stage",
      applications: ["PET Bottle Manufacturing", "High Pressure Testing", "Specialized Applications"],
    },
    {
      model: "SJ-MS-20HP",
      power: "20 HP",
      pressure: "35 Bar",
      airDelivery: "70 CFM",
      stages: "3 Stage",
      applications: ["Large PET Production", "Industrial Testing", "Research Applications"],
    },
    {
      model: "SJ-MS-30HP",
      power: "30 HP",
      pressure: "40 Bar",
      airDelivery: "105 CFM",
      stages: "4 Stage",
      applications: ["Heavy Duty PET", "Continuous High Pressure", "Industrial Processing"],
    },
    {
      model: "SJ-MS-50HP",
      power: "50 HP",
      pressure: "40 Bar",
      airDelivery: "150 CFM",
      stages: "4 Stage",
      applications: ["Large Scale Production", "Continuous Operation", "Heavy Industrial"],
    },
  ]

  const features = [
    {
      icon: Gauge,
      title: "Ultra High Pressure",
      description: "Capable of delivering pressures up to 40 Bar for specialized applications",
    },
    {
      icon: Shield,
      title: "Multi-Stage Cooling",
      description: "Advanced intercooling between stages for optimal efficiency and reliability",
    },
    {
      icon: Zap,
      title: "Maximum Efficiency",
      description: "Multi-stage compression provides the highest efficiency for high pressure applications",
    },
    {
      icon: Settings,
      title: "Custom Configuration",
      description: "Tailored solutions for specific pressure and flow requirements",
    },
  ]

  const applications = [
    {
      title: "PET Bottle Manufacturing",
      description: "High pressure air for PET bottle blowing machines",
      pressure: "30-40 Bar",
      icon: Factory,
    },
    {
      title: "High Pressure Testing",
      description: "Pressure testing of components and systems",
      pressure: "20-40 Bar",
      icon: Gauge,
    },
    {
      title: "Industrial Processing",
      description: "Specialized industrial processes requiring high pressure air",
      pressure: "25-35 Bar",
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Multi-Stage Technology</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              High Pressure
              <span className="block text-red-400">Multi-Stage Compressors</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Ultra-high pressure multi-stage reciprocating compressors designed for specialized applications requiring
              pressures up to 40 Bar.
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
                <Link href="/products/piston">Back to Piston Range</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ultra High Pressure <span className="text-red-600">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced multi-stage compression technology for the most demanding high-pressure applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Specialized <span className="text-red-600">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Multi-stage compressors are designed for specific high-pressure industrial applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                    <app.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{app.title}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                  <Badge className="bg-red-600 text-white">{app.pressure}</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Technical <span className="text-red-600">Specifications</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Stage Piston Compressor Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium">{spec.label}:</span>
                      <span className="text-red-600 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Available <span className="text-red-600">Models</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of multi-stage piston compressors for ultra-high pressure applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">{model.model}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Power:</span>
                      <span className="text-sm font-medium">{model.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pressure:</span>
                      <span className="text-sm font-medium">{model.pressure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Air Delivery:</span>
                      <span className="text-sm font-medium">{model.airDelivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Stages:</span>
                      <span className="text-sm font-medium">{model.stages}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-2">Applications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {model.applications.map((app, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
            <h2 className="text-3xl lg:text-4xl font-bold">Need Ultra High Pressure Solutions?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation for your specialized high-pressure air compressor requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Custom Quote
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
