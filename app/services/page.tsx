import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Wrench,
  Shield,
  Phone,
  Settings,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  Package,
} from "lucide-react"
import Link from "next/link"

export async function generateMetadata() {
  return {
    title: "Services | Sarv Jagat",
    description: "Explore Sarv Jagat's comprehensive services including installation, annual maintenance contracts (AMC), repair, technical support, and spare parts supply for air compressors.",
    keywords: ["air compressor services", "compressor maintenance", "compressor repair", "technical support", "spare parts", "AMC", "Sarv Jagat services"],
    openGraph: {
      title: "Services | Sarv Jagat",
      description: "Comprehensive services for air compressors: installation, maintenance, repair, and support.",
      url: "https://sarvjagat.com/services",
      siteName: "Sarv Jagat",
      images: [
        {
          url: "/og-services.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  }
}

// Main services page showcasing comprehensive support offerings
export default function ServicesPage() {
  // Service categories with detailed information
  const services = [
    {
      title: "Installation & Commissioning",
      description: "Professional installation and setup of air compressor systems by certified technicians",
      image: "/Installation & Commissioning.jpg",
      icon: Wrench,
      features: [
        "Site survey and planning",
        "Professional installation",
        "System commissioning",
        "Performance testing",
        "Operator training",
        "Documentation handover",
      ],
      benefits: [
        "Optimal system performance",
        "Reduced startup issues",
        "Proper system integration",
        "Warranty compliance",
      ],
      coverage: "Pan-India",
      timeline: "2-5 days",
      href: "/services/installation",
      color: "bg-primary",
    },
    {
      title: "Annual Maintenance Contract",
      description: "Comprehensive maintenance plans to ensure optimal performance and maximum uptime",
      image: "/sj-annual-management-contracts-obj.png",
      icon: Shield,
      features: [
        "Scheduled preventive maintenance",
        "Priority breakdown support",
        "Genuine spare parts included",
        "Performance monitoring",
        "Energy efficiency optimization",
        "Detailed service reports",
      ],
      benefits: ["Up to 99.5% uptime", "Extended equipment life", "Reduced operating costs", "Peace of mind"],
      coverage: "24/7 Support",
      timeline: "Annual Contract",
      href: "/services/amc",
      color: "bg-secondary",
    },
    {
      title: "Repair & Service",
      description: "Expert repair services and emergency breakdown support for all SJ compressor systems",
      image: "/sj-air-compressor-maintenance-service.jpg",
      icon: Settings,
      features: [
        "Emergency breakdown service",
        "Expert diagnosis",
        "Genuine spare parts",
        "On-site repairs",
        "Workshop overhauls",
        "Performance restoration",
      ],
      benefits: ["Minimal downtime", "Cost-effective repairs", "Restored performance", "Extended equipment life"],
      coverage: "All Over India",
      timeline: "Same day response",
      href: "/services/",
      color: "bg-accent",
    },
    {
      title: "Technical Support",
      description: "24/7 technical assistance and troubleshooting support from certified engineers",
      image: "/SJ-technical-support-center-customer-service.jpg",
      icon: Phone,
      features: [
        "24/7 helpline support",
        "Remote diagnostics",
        "Technical consultation",
        "Troubleshooting guidance",
        "Application support",
        "Training programs",
      ],
      benefits: ["Immediate assistance", "Expert guidance", "Reduced downtime", "Skill development"],
      coverage: "24/7 Availability",
      timeline: "Immediate response",
      href: "/services/technical-support",
      color: "bg-muted-foreground",
    },
    {
      title: "Spare Parts Supply",
      description: "Genuine spare parts and accessories for all SJ products with fast delivery",
      image: "/SJ-Spare Parts Supply.jpg",
      icon: Package,
      features: [
        "Genuine SJ spare parts",
        "Fast delivery network",
        "Online parts ordering",
        "Technical documentation",
        "Installation support",
        "Warranty coverage",
      ],
      benefits: ["Guaranteed compatibility", "Quick availability", "Competitive pricing", "Quality assurance"],
      coverage: "Pan-India Delivery",
      timeline: "24-48 hours",
      href: "/services/spare-parts",
      color: "bg-primary",
    },
    {
      title: "Energy Audit",
      description: "Comprehensive energy assessment and optimization recommendations for compressed air systems",
      image: "/sj-energy-audit.jpg",
      icon: TrendingUp,
      features: [
        "System energy analysis",
        "Efficiency assessment",
        "Cost-benefit analysis",
        "Optimization recommendations",
        "ROI calculations",
        "Implementation support",
      ],
      benefits: ["Reduced energy costs", "Improved efficiency", "Environmental benefits", "Quick ROI"],
      coverage: "Certified Auditors",
      timeline: "3-5 days",
      href: "/services/",
      color: "bg-secondary",
    },
  ]

  // Service statistics for credibility
  const serviceStats = [
    { number: "All Over India", label: "Service Available", icon: MapPin },
    { number: "24/7", label: "Technical Support", icon: Phone },
    { number: "99.5%", label: "Average Uptime", icon: Shield },
    { number: "2-4 hrs", label: "Response Time", icon: Clock },
  ]

  // Service packages
  const servicePackages = [
    {
      name: "Basic Service Package",
      description: "Essential maintenance and support for small installations",
      features: [
        "Quarterly maintenance visits",
        "Basic spare parts included",
        "Phone support during business hours",
        "Performance reports",
      ],
      price: "Starting from ₹50,000/year",
      suitable: "1-10 HP compressors",
    },
    {
      name: "Premium Service Package",
      description: "Comprehensive support for medium to large installations",
      features: [
        "Monthly maintenance visits",
        "All spare parts included",
        "24/7 phone support",
        "Priority breakdown service",
        "Energy efficiency monitoring",
        "Detailed analytics reports",
      ],
      price: "Starting from ₹1,00,000/year",
      suitable: "10-100 HP compressors",
      popular: true,
    },
    {
      name: "Enterprise Service Package",
      description: "Complete lifecycle support for large industrial installations",
      features: [
        "Bi-weekly maintenance visits",
        "All parts and consumables included",
        "Dedicated service engineer",
        "24/7 on-site support",
        "Predictive maintenance",
        "Performance guarantees",
        "Energy optimization",
      ],
      price: "Custom pricing",
      suitable: "100+ HP systems",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Comprehensive <span className="text-red-400">Service & Support</span>
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              Complete lifecycle support for your compressed air systems. From installation to maintenance, our expert
              team ensures optimal performance and maximum uptime for your operations.
            </p>
          </div>
        </div>
      </section>

      {/* Service Statistics */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceStats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary stats-counter">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold heading-professional">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Complete range of services to keep your compressed air systems running at peak performance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="product-card card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.title} Service`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`${service.color} text-white p-3 rounded-full`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background text-foreground">SJ Service</Badge>
                  </div>
                </div>

                <CardHeader className="space-y-4">
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-professional text-base">{service.description}</CardDescription>

                  {/* Service Details */}
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Coverage</div>
                      <div className="font-semibold text-primary text-sm">{service.coverage}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Timeline</div>
                      <div className="font-semibold text-primary text-sm">{service.timeline}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">Support</div>
                      <div className="font-semibold text-primary text-sm">Expert Team</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">Service Features:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">Key Benefits:</div>
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full btn-primary">
                    <Link href={service.href}>
                      Learn More About {service.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 industrial-section">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              Service <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Choose the right service package for your compressed air system requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {servicePackages.map((pkg, index) => (
              <Card key={index} className={`card-hover ${pkg.popular ? "ring-2 ring-primary" : ""}`}>
                <CardHeader className="text-center space-y-4">
                  {pkg.popular && <Badge className="bg-primary text-primary-foreground mx-auto">Most Popular</Badge>}
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-professional">{pkg.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                  <div className="text-sm text-muted-foreground">Suitable for: {pkg.suitable}</div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full ${pkg.popular ? "btn-primary" : "btn-primary"}`}>
                    Get Quote for {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SJ Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              Why Choose <span className="text-gradient">SJ Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Industry-leading service quality backed by 25+ years of experience and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Certified Technicians</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">Factory-trained and certified service engineers with deep expertise</p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle>Genuine Parts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">
                  Only genuine SJ spare parts ensuring optimal performance and warranty
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">Round-the-clock technical support and emergency breakdown service</p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-muted-foreground rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Pan-India Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">50+ service centers across India for quick response and support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold heading-professional">
              Ready to Experience World-Class Service?
            </h2>
            <p className="text-xl text-white/90 text-professional">
              Get in touch with our service experts to discuss your requirements and choose the right service package
              for your compressed air systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary text-black text-lg px-8">
                <Phone className="mr-2 h-5 w-5" />
                Call Service Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 bg-transparent"
              >
                Schedule Service Visit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
