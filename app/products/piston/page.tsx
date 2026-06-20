import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Wrench, Zap, Shield, Award, Phone } from "lucide-react"
import Link from "next/link"

export default function PistonCompressorsPage() {
  const pistonCompressors = [
    {
      title: "Single Stage Piston Compressors",
      description: "Robust single stage reciprocating compressors for general industrial applications",
      features: ["1-10 HP Range", "Up to 8 Bar Pressure", "Air Cooled Design", "Low Maintenance"],
      applications: ["Small Workshops", "Automotive Service", "General Manufacturing", "Construction"],
      href: "/products/piston/single-stage",
    },
    {
      title: "Two Stage Piston Compressors",
      description: "High-efficiency two stage compressors for demanding applications",
      features: ["5-25 HP Range", "Up to 14 Bar Pressure", "Intercooler Design", "Heavy Duty Construction"],
      applications: ["Industrial Manufacturing", "Heavy Machinery", "Mining Operations", "Large Workshops"],
      href: "/products/piston/two-stage",
    },
    {
      title: "High Pressure Multi-Stage",
      description: "Multi-stage compressors for high pressure applications up to 40 bar",
      features: ["Up to 40 Bar Pressure", "Multi-Stage Design", "PET Bottle Applications", "Custom Configurations"],
      applications: ["PET Bottle Manufacturing", "High Pressure Testing", "Specialized Applications"],
      href: "/products/piston/multi-stage",
    },
  ]

  const advantages = [
    {
      icon: Wrench,
      title: "Proven Technology",
      description: "Time-tested reciprocating technology with decades of reliable operation",
    },
    {
      icon: Shield,
      title: "Robust Construction",
      description: "Heavy-duty cast iron construction built to withstand demanding conditions",
    },
    {
      icon: Zap,
      title: "High Pressure Capability",
      description: "Capable of delivering high pressures for specialized applications",
    },
    {
      icon: Award,
      title: "Cost Effective",
      description: "Lower initial investment with excellent return on investment",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Reciprocating Technology</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Heavy-Duty
              <span className="block text-red-400">Piston Air Compressors</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Robust reciprocating piston compressors delivering reliable compressed air solutions for demanding
              industrial applications from 1 HP to 25 HP.
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

      {/* Advantages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Advantages of <span className="text-gradient">Piston Compressors</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover why reciprocating piston compressors remain the preferred choice for many industrial
              applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <advantage.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                  <CardDescription>{advantage.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-gradient">Piston Compressor Range</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete range of reciprocating piston compressors for various pressure requirements and applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pistonCompressors.map((compressor, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{compressor.title}</CardTitle>
                  <CardDescription>{compressor.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {compressor.features.map((feature, idx) => (
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
                      {compressor.applications.map((app, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <Link href={compressor.href}>
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
            <h2 className="text-3xl lg:text-4xl font-bold">Need a Reliable Piston Compressor?</h2>
            <p className="text-xl text-white/90">
              Get expert advice on selecting the right piston compressor for your specific application requirements.
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
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
