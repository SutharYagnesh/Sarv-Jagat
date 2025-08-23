import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Phone, Clock, Users, Award, Headphones, Settings } from "lucide-react"
import Link from "next/link"

export default function TechnicalSupportPage() {
  const supportServices = [
    {
      title: "24/7 Helpline Support",
      description: "Round-the-clock technical assistance for urgent issues and emergency support",
      features: ["24/7 Availability", "Expert Technicians", "Remote Diagnostics", "Emergency Response"],
      benefits: ["Minimal Downtime", "Quick Resolution", "Expert Guidance", "Peace of Mind"],
    },
    {
      title: "On-Site Technical Support",
      description: "Field service engineers providing on-site troubleshooting and technical assistance",
      features: ["Certified Engineers", "Advanced Tools", "Comprehensive Diagnostics", "Repair Services"],
      benefits: ["Professional Service", "Accurate Diagnosis", "Quality Repairs", "System Optimization"],
    },
    {
      title: "Remote Monitoring",
      description: "Advanced remote monitoring systems for proactive maintenance and support",
      features: ["Real-time Monitoring", "Predictive Analytics", "Alert Systems", "Performance Reports"],
      benefits: ["Preventive Maintenance", "Reduced Downtime", "Cost Savings", "Performance Insights"],
    },
  ]

  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock technical support for critical operations and emergencies",
    },
    {
      icon: Users,
      title: "Expert Technicians",
      description: "Certified and experienced technicians with deep product knowledge",
    },
    {
      icon: Headphones,
      title: "Multi-Channel Support",
      description: "Phone, email, and online support channels for convenient assistance",
    },
    {
      icon: Award,
      title: "Guaranteed Response",
      description: "Guaranteed response times with service level agreements",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Technical Support</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              24/7 Expert
              <span className="block text-red-400">Technical Support</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive technical support services with 24/7 availability, expert technicians, and advanced remote
              monitoring to ensure optimal performance of your compressed air systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Support
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="tel:+919157487233">Call Now: +91-9157487233</Link>
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
              Support <span className="text-gradient">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the key features of our comprehensive technical support services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-hover">
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

      {/* Support Services Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-gradient">Support Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive technical support services designed to keep your compressed air systems running optimally.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {supportServices.map((service, index) => (
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

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Need <span className="text-gradient">Immediate Support?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our technical support team is available 24/7 to assist you with any issues or questions.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Phone className="h-12 w-12 mx-auto text-red-600" />
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>24/7 helpline for immediate assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href="tel:+919157487233">+91-9157487233</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Headphones className="h-12 w-12 mx-auto text-red-600" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Technical queries and documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <Link href="mailto:connect@sarvjagat.com">connect@sarvjagat.com</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Settings className="h-12 w-12 mx-auto text-red-600" />
                  <CardTitle>On-Site Service</CardTitle>
                  <CardDescription>Field engineers for complex issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <Link href="/contact">Schedule Visit</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Get Expert Technical Support Today</h2>
            <p className="text-xl text-white/90">
              Contact our technical support team for immediate assistance with your compressed air systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Contact Support
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
