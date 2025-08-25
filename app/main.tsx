import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CheckCircle,
  Factory,
  Wrench,
  Shield,
  Award,
  Users,
  MapPin,
  Phone,
  Settings,
  Building2,
} from "lucide-react"
import Link from "next/link"
import WhatsAppButton from "@/components/whatsapp-button"
import { OrganizationSchema } from "@/components/structured-data"

// Main homepage component for Sarv Jagat Air Compressor website
export default function HomePage() {
  // Company statistics for credibility
  const stats = [
    { number: "18+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Happy Customers", icon: Users },
    { number: "25+", label: "Service Support", icon: MapPin },
    { number: "24/7", label: "Technical Help", icon: Phone },
  ]

  // Featured product categories with descriptions from the provided data
  const featuredProducts = [
    {
      title: "Screw Air Compressors",
      description: "High-efficiency oil-injected & oil-free screw compressors for continuous industrial operations",
      image: "/sj-p-screw.jpg",
      features: ["Fixed & Variable Speed", "Oil-Free Options", "10-200 HP Range", "7-16 Bar Pressure"],
      href: "/products/screw",
    },
    {
      title: "Reciprocating Piston Compressors",
      description: "Robust single, two & multi-stage piston compressors for heavy-duty applications",
      image: "/SJ_COM_MULTISTAGE_AIR-WATER COOLED_1.jpg",
      features: ["Single & Multi-Stage", "High Pressure Options", "1-30 HP Range", "Oil-Free Available"],
      href: "/products/piston",
    },
    {
      title: "Specialized Solutions",
      description: "Booster compressors, vacuum pumps, and custom-engineered air solutions",
      image: "/SJ_COM_BOOSTER_DO NOT KNOW.jpg",
      features: ["Booster Systems", "Vacuum Pumps", "Custom Solutions", "High Pressure"],
      href: "/products/specialized",
    },
  ]

  // Industry applications based on the provided product descriptions
  const industries = [
    {
      name: "Pharmaceuticals",
      description: "Cleanroom air, tablet compression, packaging, sterile environments",
      icon: Shield,
      applications: ["Cleanroom Systems", "Tablet Production", "Packaging Lines", "Sterile Air"],
    },
    {
      name: "Food & Beverage",
      description: "Packaging, bottling, pneumatic conveyors, nitrogen flushing",
      icon: Building2,
      applications: ["Bottling Lines", "Packaging Systems", "Food Processing", "Quality Control"],
    },
    {
      name: "Automotive",
      description: "Spray painting, pneumatic tools, assembly lines, tire inflation",
      icon: Factory,
      applications: ["Paint Booths", "Assembly Lines", "Pneumatic Tools", "Quality Testing"],
    },
    {
      name: "Textile & Garment",
      description: "Loom operations, air jets, dyeing machines, automated systems",
      icon: Settings,
      applications: ["Loom Operations", "Air Jets", "Dyeing Process", "Automation"],
    }
  ]

  // Service offerings
  const services = [
    {
      title: "Installation & Commissioning",
      description: "Professional installation and setup of air compressor systems",
      icon: Wrench,
    },
    {
      title: "Annual Maintenance Contract",
      description: "Comprehensive maintenance plans to ensure optimal performance",
      icon: Shield,
    },
    {
      title: "Technical Support",
      description: "24/7 technical assistance and troubleshooting support",
      icon: Phone,
    },
    {
      title: "Spare Parts Supply",
      description: "Genuine spare parts and accessories for all SJ products",
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
        <OrganizationSchema />
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20 lg:py-32"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-600 text-white">Trusted Since 2008</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold">
                  Powering Industries with
                  <span className="block text-red-400">Reliable Air Solutions</span>
                </h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  Sarv Jagat delivers world-class air compressors, from 1 HP to 300+ HP, engineered for continuous
                  operation across diverse industrial applications.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8">
                  <Link href="/products">
                    View Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 bg-transparent"
                >
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>

              {/* Key features */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-400" />
                  <span>ISO 9001:2015 & CE Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-400" />
                  <span>24/7 Technical Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-400" />
                  <span>Pan-India Service Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-400" />
                  <span>Energy Efficient Solutions</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* hero Section Photo */}
              <img
                src="/sj-main-page.png"
                alt="Sarv Jagat Air Compressor Manufacturing Facility"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-lg shadow-xl">
                <div className="text-3xl font-bold text-red-600">18+</div>
                <div className="text-sm text-slate-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center space-y-4`}>
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Our <span className="text-red-600">Product Range</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive air compressor solutions engineered for reliability, efficiency, and performance across all
              industrial applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-t-lg mx-auto">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="  h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-600 text-white">SJ Brand</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-red-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    <Link href={product.href}>
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Industries We <span className="text-red-600">Serve</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by leading companies across diverse industries for reliable compressed air solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <industry.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{industry.name}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {industry.applications.map((app, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground">
                        • {app}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
              <Link href="/industries">
                View All Industries
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Comprehensive <span className="text-red-600">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete lifecycle support from installation to maintenance, ensuring optimal performance of your air
              compressor systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold heading-professional">Ready to Power Your Industry?</h2>
            <p className="text-xl text-white/90 text-professional">
              Get expert consultation and customized air compressor solutions for your specific requirements. Our
              technical team is ready to help you choose the right system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8">
                <a href="tel:+919157770753" className="hover:underline">
                               Get Free Consultation
                  <Phone className="ml-2 h-5 w-5" />
                            </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 bg-transparent"
              >
                <Link href="/catalog">Download Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <WhatsAppButton />
    </div>
  )
}
