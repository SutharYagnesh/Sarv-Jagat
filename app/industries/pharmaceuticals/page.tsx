import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Shield, Beaker, Award, Phone, Droplets } from "lucide-react"
import Link from "next/link"

export default function PharmaceuticalsPage() {
  const applications = [
    {
      title: "Tablet Compression",
      description: "Clean, oil-free compressed air for pharmaceutical tablet manufacturing processes",
      requirements: ["Oil-Free Air", "Consistent Pressure", "Low Moisture", "Contamination-Free"],
      benefits: ["Product Quality", "Regulatory Compliance", "Process Reliability", "Reduced Waste"],
    },
    {
      title: "Cleanroom Applications",
      description: "Specialized air systems for maintaining cleanroom environments and standards",
      requirements: ["HEPA Filtration", "Precise Control", "Validated Systems", "Documentation"],
      benefits: ["Sterile Environment", "Quality Assurance", "Compliance", "Traceability"],
    },
    {
      title: "Packaging & Filling",
      description: "Reliable compressed air for pharmaceutical packaging and filling operations",
      requirements: ["Food Grade Air", "Stable Pressure", "Dry Air", "Continuous Operation"],
      benefits: ["Product Integrity", "Shelf Life", "Efficiency", "Reliability"],
    },
  ]

  const standards = [
    {
      icon: Shield,
      title: "FDA Compliance",
      description: "Systems designed to meet FDA requirements for pharmaceutical manufacturing",
    },
    {
      icon: Award,
      title: "GMP Standards",
      description: "Good Manufacturing Practice compliant compressed air solutions",
    },
    {
      icon: Beaker,
      title: "USP Standards",
      description: "United States Pharmacopeia compliant air quality for pharmaceutical use",
    },
    {
      icon: Droplets,
      title: "ISO 8573-1",
      description: "Certified air purity standards for pharmaceutical applications",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Pharmaceutical Industry</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Pharmaceutical
              <span className="block text-red-400">Compressed Air Solutions</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Specialized compressed air systems for pharmaceutical manufacturing, ensuring compliance with FDA, GMP,
              and USP standards for clean, contamination-free air supply.
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
                <Link href="/products/oil-free">View Oil-Free Systems</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Regulatory <span className="text-gradient">Compliance Standards</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our pharmaceutical compressed air systems meet the highest industry standards and regulatory requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((standard, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <standard.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{standard.title}</CardTitle>
                  <CardDescription>{standard.description}</CardDescription>
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
              Pharmaceutical <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive compressed air solutions for various pharmaceutical manufacturing processes and
              applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((application, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{application.title}</CardTitle>
                  <CardDescription>{application.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Requirements:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {application.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {application.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {benefit}
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
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Ensure Pharmaceutical Compliance?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation on pharmaceutical-grade compressed air systems that meet all regulatory
              requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Compliance Consultation
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/industries">View All Industries</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
