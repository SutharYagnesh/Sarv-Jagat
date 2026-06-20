import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Settings, Zap, Shield, Award, Phone } from "lucide-react"
import Link from "next/link"

export default function ScrewCompressorsPage() {
  const screwCompressors = [
    {
      title: "Fixed Speed Screw Compressors",
      description: "Reliable and efficient fixed speed rotary screw compressors for continuous operation",
      features: ["5-150 HP Range", "7-13 Bar Pressure", "Oil-Injected Design", "Robust Construction"],
      applications: ["Manufacturing", "Automotive", "Textile", "General Industry"],
      href: "/products/screw/fixed-speed",
    },
    {
      title: "Variable Speed (VSD) Compressors",
      description: "Energy-efficient variable speed drive compressors that adjust to demand",
      features: [
        "Energy Savings up to 35%",
        "Soft Start Technology",
        "Precise Pressure Control",
        "Reduced Maintenance",
      ],
      applications: ["Fluctuating Demand", "Energy Critical Applications", "24/7 Operations"],
      href: "/products/screw/variable-speed",
    },
    {
      title: "Oil-Free Screw Compressors",
      description: "Clean air solutions for critical applications requiring contamination-free air",
      features: ["100% Oil-Free Air", "ISO 8573-1 Class 0", "Food Grade Applications", "Pharmaceutical Grade"],
      applications: ["Food & Beverage", "Pharmaceuticals", "Electronics", "Medical"],
      href: "/products/oil-free",
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Energy Efficient",
      description: "Advanced rotor design and precision engineering for maximum efficiency",
    },
    {
      icon: Shield,
      title: "Reliable Operation",
      description: "Built for continuous duty with minimal maintenance requirements",
    },
    {
      icon: Settings,
      title: "Easy Maintenance",
      description: "User-friendly design with accessible service points",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "ISO 9001:2015 certified manufacturing with rigorous testing",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Screw Compressor Technology</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              High-Efficiency
              <span className="block text-red-400">Screw Air Compressors</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Advanced rotary screw compressor technology delivering reliable, efficient compressed air solutions for
              industrial applications from 5 HP to 150 HP.
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Choose <span className="text-gradient">Sarv Jagat Screw Compressors</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience superior performance, reliability, and efficiency with our advanced screw compressor
              technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
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
              Our <span className="text-gradient">Screw Compressor Range</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive range of rotary screw compressors designed for various industrial applications and
              requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {screwCompressors.map((compressor, index) => (
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
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Upgrade Your Compressed Air System?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation on the right screw compressor solution for your specific requirements.
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
