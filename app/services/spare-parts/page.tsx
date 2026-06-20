import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Package, Truck, Shield, Phone, Clock } from "lucide-react"
import Link from "next/link"

export default function SparePartsPage() {
  const partCategories = [
    {
      title: "Genuine OEM Parts",
      description: "Original equipment manufacturer parts ensuring perfect fit and performance",
      features: ["100% Genuine", "Perfect Fit", "Warranty Coverage", "Quality Assured"],
      benefits: ["Optimal Performance", "Reliability", "Longevity", "Warranty Protection"],
    },
    {
      title: "Maintenance Kits",
      description: "Complete maintenance kits with all necessary components for scheduled service",
      features: ["Complete Kits", "Service Intervals", "Quality Components", "Easy Installation"],
      benefits: ["Convenience", "Cost Effective", "Proper Maintenance", "Extended Life"],
    },
    {
      title: "Emergency Parts",
      description: "Critical spare parts for emergency repairs and urgent maintenance requirements",
      features: ["Fast Delivery", "Critical Components", "24/7 Availability", "Express Service"],
      benefits: ["Minimal Downtime", "Quick Repairs", "Emergency Support", "Business Continuity"],
    },
  ]

  const services = [
    {
      icon: Package,
      title: "Genuine Parts",
      description: "100% genuine OEM parts with manufacturer warranty and quality assurance",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick delivery service with express options for urgent requirements",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "All parts come with quality guarantee and manufacturer warranty",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock parts ordering and emergency parts supply service",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Spare Parts Supply</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Genuine
              <span className="block text-red-400">Spare Parts Supply</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive spare parts supply service with genuine OEM parts, fast delivery, and 24/7 availability to
              keep your compressed air systems running optimally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Order Parts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/catalog">Parts Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Parts Supply <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive spare parts supply services designed to keep your equipment running.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parts Categories Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-gradient">Parts Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive range of spare parts and maintenance components for all your compressed air equipment.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partCategories.map((category, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {category.features.map((feature, idx) => (
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
                      {category.benefits.map((benefit, idx) => (
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
            <h2 className="text-3xl lg:text-4xl font-bold">Need Spare Parts for Your Equipment?</h2>
            <p className="text-xl text-white/90">
              Contact our parts specialists for genuine spare parts with fast delivery and quality guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Order Parts Now
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
