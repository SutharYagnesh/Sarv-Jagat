import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Zap, Shield, Phone, Settings, Thermometer } from "lucide-react"
import Link from "next/link"

export default function TwoStagePistonPage() {
  const specifications = [
    { label: "Power Range", value: "5 HP to 25 HP" },
    { label: "Pressure Range", value: "Up to 14 Bar (203 PSI)" },
    { label: "Air Delivery", value: "18 to 90 CFM" },
    { label: "Cooling", value: "Air Cooled with Intercooler" },
    { label: "Drive Type", value: "Belt Driven" },
    { label: "Tank Options", value: "300L to 1000L" },
  ]

  const models = [
    {
      model: "SJ-TS-5HP",
      power: "5 HP",
      pressure: "14 Bar",
      airDelivery: "18 CFM",
      tankSize: "300L",
      applications: ["Industrial Manufacturing", "Heavy Workshop", "Production Line"],
    },
    {
      model: "SJ-TS-10HP",
      power: "10 HP",
      pressure: "14 Bar",
      airDelivery: "35 CFM",
      tankSize: "500L",
      applications: ["Large Industrial", "Manufacturing Plant", "Heavy Machinery"],
    },
    {
      model: "SJ-TS-15HP",
      power: "15 HP",
      pressure: "14 Bar",
      airDelivery: "55 CFM",
      tankSize: "750L",
      applications: ["Heavy Industrial", "Mining Operations", "Large Manufacturing"],
    },
    {
      model: "SJ-TS-25HP",
      power: "25 HP",
      pressure: "14 Bar",
      airDelivery: "90 CFM",
      tankSize: "1000L",
      applications: ["Heavy Duty Industrial", "Continuous Operation", "Large Scale Production"],
    },
  ]

  const features = [
    {
      icon: Thermometer,
      title: "Intercooler Design",
      description: "Advanced intercooling system for maximum efficiency and lower operating temperatures",
    },
    {
      icon: Shield,
      title: "Heavy Duty Construction",
      description: "Robust cast iron construction designed for continuous heavy-duty operation",
    },
    {
      icon: Zap,
      title: "High Efficiency",
      description: "Two-stage compression delivers superior efficiency and higher pressures",
    },
    {
      icon: Settings,
      title: "Advanced Controls",
      description: "Sophisticated control systems for optimal performance and protection",
    },
  ]

  const advantages = [
    "Higher pressure capability up to 14 Bar",
    "Better efficiency compared to single stage",
    "Lower operating temperatures with intercooling",
    "Suitable for continuous duty applications",
    "Reduced power consumption per CFM",
    "Longer service life due to lower compression ratios per stage",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Two Stage Technology</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Two Stage
              <span className="block text-red-400">Piston Compressors</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              High-efficiency two stage reciprocating compressors with intercooling for demanding industrial
              applications requiring higher pressures and continuous operation.
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
              Advanced <span className="text-red-600">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Engineered with advanced two-stage compression technology for superior performance.
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

      {/* Advantages Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Why Choose <span className="text-red-600">Two Stage?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Two stage piston compressors offer significant advantages over single stage units for demanding
                applications.
              </p>
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span>{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/two-stage-piston-compressor.png"
                alt="Two Stage Piston Compressor"
                className="rounded-lg shadow-xl"
              />
            </div>
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
                <CardTitle>Two Stage Piston Compressor Specifications</CardTitle>
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
              Choose from our range of two stage piston compressors for high-pressure applications.
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
            <h2 className="text-3xl lg:text-4xl font-bold">Need High Pressure Air Solutions?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation to select the perfect two stage piston compressor for your high-pressure
              applications.
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
                <Link href="/products/piston/multi-stage">View Multi-Stage Models</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
