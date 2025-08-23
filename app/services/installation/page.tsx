import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Wrench, Users, Award, Phone, Settings } from "lucide-react"
import Link from "next/link"

export default function InstallationPage() {
  const services = [
    {
      title: "Site Survey & Planning",
      description: "Comprehensive site assessment and installation planning for optimal compressor placement",
      features: ["Site Assessment", "Load Calculation", "Layout Design", "Infrastructure Planning"],
      benefits: ["Optimal Performance", "Future Expansion", "Cost Efficiency", "Compliance"],
    },
    {
      title: "Professional Installation",
      description: "Expert installation by certified technicians ensuring proper setup and commissioning",
      features: ["Certified Technicians", "Quality Installation", "Safety Compliance", "Testing & Commissioning"],
      benefits: ["Reliable Operation", "Warranty Protection", "Safety Assurance", "Performance Guarantee"],
    },
    {
      title: "System Integration",
      description: "Complete system integration with existing infrastructure and control systems",
      features: ["Control Integration", "Piping Systems", "Electrical Connections", "Monitoring Setup"],
      benefits: ["Seamless Operation", "Centralized Control", "Efficiency Optimization", "Remote Monitoring"],
    },
  ]

  const process = [
    {
      icon: Users,
      title: "Consultation",
      description: "Initial consultation to understand your requirements and site conditions",
    },
    {
      icon: Settings,
      title: "Planning",
      description: "Detailed planning and design of the installation layout and specifications",
    },
    {
      icon: Wrench,
      title: "Installation",
      description: "Professional installation by certified technicians with quality assurance",
    },
    {
      icon: Award,
      title: "Commissioning",
      description: "Complete system testing, commissioning, and performance verification",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Installation Services</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Professional
              <span className="block text-red-400">Installation & Commissioning</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Expert installation services ensuring optimal performance, safety, and reliability of your compressed air
              systems with certified technicians and comprehensive support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Schedule Installation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Installation <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our systematic approach ensures professional installation with optimal performance and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-gradient">Installation Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive installation services covering all aspects of compressed air system setup and commissioning.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((benefit, idx) => (
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
            <h2 className="text-3xl lg:text-4xl font-bold">Ready for Professional Installation?</h2>
            <p className="text-xl text-white/90">
              Get expert installation services from certified technicians ensuring optimal performance and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Schedule Installation
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
