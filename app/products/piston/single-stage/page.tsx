import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Wrench, Zap, Shield, Phone, Settings } from "lucide-react"
import Link from "next/link"

export default function SingleStagePistonPage() {
  const specifications = [
    { label: "Power Range", value: "1 HP to 10 HP" },
    { label: "Pressure Range", value: "Up to 8 Bar (116 PSI)" },
    { label: "Air Delivery", value: "3 to 35 CFM" },
    { label: "Cooling", value: "Air Cooled" },
    { label: "Drive Type", value: "Belt Driven / Direct Driven" },
    { label: "Tank Options", value: "50L to 500L" },
  ]

  const models = [
    {
      model: "SJ-SS-1HP",
      power: "1 HP",
      pressure: "8 Bar",
      airDelivery: "3.5 CFM",
      tankSize: "50L",
      applications: ["Small Workshop", "Home Garage", "Light Duty"],
    },
    {
      model: "SJ-SS-3HP",
      power: "3 HP",
      pressure: "8 Bar",
      airDelivery: "12 CFM",
      tankSize: "150L",
      applications: ["Medium Workshop", "Automotive Service", "General Use"],
    },
    {
      model: "SJ-SS-5HP",
      power: "5 HP",
      pressure: "8 Bar",
      airDelivery: "18 CFM",
      tankSize: "300L",
      applications: ["Industrial Use", "Manufacturing", "Heavy Workshop"],
    },
    {
      model: "SJ-SS-10HP",
      power: "10 HP",
      pressure: "8 Bar",
      airDelivery: "35 CFM",
      tankSize: "500L",
      applications: ["Large Industrial", "Production Line", "Heavy Duty"],
    },
  ]

  const features = [
    {
      icon: Wrench,
      title: "Simple Design",
      description: "Single stage compression for reliable and efficient operation",
    },
    {
      icon: Shield,
      title: "Cast Iron Construction",
      description: "Heavy-duty cast iron cylinder and head for durability",
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      description: "Optimized compression ratio for maximum efficiency",
    },
    {
      icon: Settings,
      title: "Easy Maintenance",
      description: "Simple design allows for easy servicing and maintenance",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Single Stage Technology</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Single Stage
              <span className="block text-red-400">Piston Compressors</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Reliable single stage reciprocating compressors perfect for general industrial applications, workshops,
              and automotive service centers.
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
              Key <span className="text-red-600">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Engineered for reliability and performance in demanding applications.
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

      {/* Specifications Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Technical <span className="text-red-600">Specifications</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Single Stage Piston Compressor Specifications</CardTitle>
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Available <span className="text-red-600">Models</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of single stage piston compressors to match your specific requirements.
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
                      <span className="text-sm text-muted-foreground">Tank Size:</span>
                      <span className="text-sm font-medium">{model.tankSize}</span>
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
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Choose Your Single Stage Compressor?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation to select the perfect single stage piston compressor for your application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Free Consultation
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/products/piston/two-stage">View Two Stage Models</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
