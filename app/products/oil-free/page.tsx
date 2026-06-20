import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Droplets, Shield, Award, Phone, Beaker } from "lucide-react"
import Link from "next/link"

export default function OilFreeSystemsPage() {
  const oilFreeSystems = [
    {
      title: "Oil-Free Screw Compressors",
      description: "Advanced oil-free screw technology for critical applications",
      features: ["100% Oil-Free Air", "ISO 8573-1 Class 0", "Water Injection Cooling", "Low Maintenance"],
      applications: ["Food & Beverage", "Pharmaceuticals", "Electronics", "Medical Devices"],
      href: "/products/oil-free",
    },
    {
      title: "Oil-Free Piston Compressors",
      description: "Reliable oil-free reciprocating compressors for clean air applications",
      features: ["PTFE Coated Pistons", "Carbon Ring Seals", "Stainless Steel Valves", "Easy Maintenance"],
      applications: ["Laboratories", "Dental Clinics", "Food Processing", "Clean Rooms"],
      href: "/products/oil-free",
    },
    {
      title: "Medical Grade Systems",
      description: "Specialized oil-free systems for medical and healthcare applications",
      features: ["Medical Grade Certification", "Ultra-Clean Air", "Silent Operation", "Compact Design"],
      applications: ["Hospitals", "Dental Practices", "Medical Equipment", "Research Labs"],
      href: "/products/oil-free",
    },
  ]

  const benefits = [
    {
      icon: Droplets,
      title: "100% Oil-Free Air",
      description: "Guaranteed contamination-free compressed air for critical applications",
    },
    {
      icon: Shield,
      title: "Food Grade Safety",
      description: "Meets stringent food safety and pharmaceutical standards",
    },
    {
      icon: Beaker,
      title: "Laboratory Quality",
      description: "Ultra-clean air suitable for sensitive laboratory and research applications",
    },
    {
      icon: Award,
      title: "Certified Quality",
      description: "ISO 8573-1 Class 0 certification for the highest air purity standards",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Oil-Free Technology</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Contamination-Free
              <span className="block text-red-400">Oil-Free Air Systems</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Advanced oil-free compressed air solutions delivering 100% clean air for critical applications in food,
              pharmaceutical, medical, and electronics industries.
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
              Benefits of <span className="text-gradient">Oil-Free Air Systems</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the advantages of completely oil-free compressed air for your critical applications.
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
              Our <span className="text-gradient">Oil-Free System Range</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive range of oil-free compressed air systems for various critical applications and industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {oilFreeSystems.map((system, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{system.title}</CardTitle>
                  <CardDescription>{system.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {system.features.map((feature, idx) => (
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
                      {system.applications.map((app, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <Link href={system.href}>
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
            <h2 className="text-3xl lg:text-4xl font-bold">Need Clean, Oil-Free Compressed Air?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation on oil-free compressed air solutions for your critical applications.
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
