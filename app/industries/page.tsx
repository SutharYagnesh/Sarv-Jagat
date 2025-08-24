import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Factory, Shield, Building2, Settings, Wrench, Mountain, Zap, Package, Beaker } from "lucide-react"
import Link from "next/link"

// Main industries page showcasing all sectors served by Sarv Jagat
export default function IndustriesPage() {
  // Industries with detailed applications based on provided product descriptions
  const industries = [
    {
      name: "Automotive Industry",
      description: "Comprehensive air solutions for automotive manufacturing, assembly, and service operations",
      image: "/sj-automotive-ind.jpg",
      icon: Factory,
      applications: [
        "Spray painting booths",
        "Pneumatic tools operation",
        "Car and bike assembly lines",
        "Tyre inflation and testing",
      ],
      products: ["Screw Compressors", "Oil-Free Systems", "High Pressure Units"],
      caseStudy: "Leading automotive manufacturer reduces energy costs by 35% with SJ VSD compressors",
      href: "/industries/automotive",
      stats: { companies: "500+", installations: "2000+", savings: "35%" },
    },
    {
      name: "Pharmaceuticals & Healthcare",
      description: "Clean, sterile compressed air solutions for pharmaceutical and medical applications",
      image: "/SJ-pharmaceutical-company-ind.jpg",
      icon: Shield,
      applications: [
        "Capsule filling machines",
        "Tablet compression and packaging",
        "Cleanroom pressure systems",
        "Fermentation and drying processes",
      ],
      products: ["Oil-Free Compressors", "Medical Grade Systems", "Cleanroom Solutions"],
      caseStudy: "Major pharma company achieves 99.9% uptime with SJ oil-free compressor systems",
      href: "/industries/pharmaceuticals",
      stats: { companies: "200+", installations: "800+", uptime: "99.9%" },
    },
    {
      name: "Food & Beverage",
      description: "Food-grade compressed air systems ensuring product safety and quality",
      image: "/sj-ind-food-processing-industry.jpg",
      icon: Package,
      applications: [
        "Pneumatic bottle filling",
        "Packing machines",
        "Nitrogen flushing and sealing",
        "Cleaning & sterilization",
      ],
      products: ["Oil-Free Systems", "Food Grade Filters", "Hygienic Design"],
      caseStudy: "Beverage giant improves production efficiency by 25% with SJ integrated systems",
      href: "/industries/food-beverage",
      stats: { companies: "300+", installations: "1200+", efficiency: "25%" },
    },
    {
      name: "Textile & Garment",
      description: "Reliable air systems for textile manufacturing and garment production",
      image: "/sj-textile-ind.jpg",
      icon: Settings,
      applications: [
        "Loom operations",
        "Pneumatic spindles & air jets",
        "Dyeing & printing machines",
        "Automated cutting systems",
      ],
      products: ["Variable Speed Compressors", "High Flow Systems", "Moisture Control"],
      caseStudy: "Textile manufacturer reduces downtime by 40% with SJ duplex compressor systems",
      href: "/industries/textile",
      stats: { companies: "400+", installations: "1500+", downtime: "40%" },
    },
    {
      name: "Metal & Fabrication",
      description: "Heavy-duty air solutions for metalworking and fabrication operations",
      image: "/sj-process implement-metal fabrication-ind.jpg",
      icon: Wrench,
      applications: [
        "CNC and VMC machinery",
        "Sandblasting & shot peening",
        "Plasma and laser cutting",
        "Pneumatic tools & automation",
      ],
      products: ["High Pressure Systems", "Multi-Stage Compressors", "Industrial Grade"],
      caseStudy: "Steel fabricator increases productivity by 30% with SJ high-pressure compressors",
      href: "/industries/metal-fabrication",
      stats: { companies: "600+", installations: "2500+", productivity: "30%" },
    },
    {
      name: "Construction & Infrastructure",
      description: "Mobile and stationary air solutions for construction and infrastructure projects",
      image: "/sj-ind-civil-infrastructure.jpg",
      icon: Building2,
      applications: [
        "Pneumatic drills and compactors",
        "Concrete sprayers",
        "Tunneling support systems",
        "Road construction equipment",
      ],
      products: ["Diesel Trolley Units", "Portable Compressors", "High Pressure Systems"],
      caseStudy: "Metro construction project completes 20% faster with SJ mobile compressor fleet",
      href: "/industries/construction",
      stats: { projects: "1000+", equipment: "5000+", faster: "20%" },
    },
    {
      name: "Mining & Quarry",
      description: "Rugged air compressor solutions for mining and quarrying operations",
      image: "/SJ-MINING-PHOTO.jpg",
      icon: Mountain,
      applications: [
        "Stone drilling & rock breaking",
        "Pneumatic drilling equipment",
        "Dust suppression systems",
        "Material handling automation",
      ],
      products: ["Tractor Driven Units", "High Pressure Systems", "Rugged Design"],
      caseStudy: "Quarry operation reduces fuel costs by 25% with SJ tractor-driven compressors",
      href: "/industries/mining",
      stats: { sites: "150+", equipment: "800+", savings: "25%" },
    },
    {
      name: "Electronics & Semiconductor",
      description: "Precision air systems for electronics manufacturing and semiconductor production",
      image: "/sj-semiconductor-ind.jpg",
      icon: Zap,
      applications: [
        "PCB cleaning and assembly",
        "SMT pick and place systems",
        "Clean room applications",
        "Precision pneumatic tools",
      ],
      products: ["Oil-Free Systems", "Ultra-Clean Air", "Precision Control"],
      caseStudy: "Electronics manufacturer achieves zero contamination with SJ oil-free systems",
      href: "/industries/electronics",
      stats: { companies: "250+", installations: "1000+", contamination: "0%" },
    },
    {
      name: "Plastic & PET Bottle",
      description: "Specialized air solutions for plastic manufacturing and PET bottle production",
      image: "/sj-ind-pet-water-bottle-production.jpg",
      icon: Package,
      applications: ["PET bottle blowing", "Injection molding", "Plastic extrusion", "Quality testing systems"],
      products: ["Booster Systems", "High Pressure Units", "Integrated Solutions"],
      caseStudy: "PET manufacturer increases output by 35% with SJ booster compressor systems",
      href: "/industries/plastic-pet",
      stats: { companies: "180+", installations: "600+", output: "35%" },
    },
    {
      name: "Chemical & Process",
      description: "Corrosion-resistant air systems for chemical and process industries",
      image: "/SJ-CHEMICAL-ind-oil-refinery-plant-tower-column-refinery-petrochemistry.jpg",
      icon: Beaker,
      applications: [
        "Pneumatic valve actuation",
        "Process automation",
        "Material transfer systems",
        "Reactor pressure control",
      ],
      products: ["Corrosion Resistant", "Explosion Proof", "Process Grade"],
      caseStudy: "Chemical plant improves safety and efficiency with SJ specialized compressors",
      href: "/industries/chemical",
      stats: { plants: "100+", installations: "400+", safety: "100%" },
    },
  ]

  // Industry statistics for credibility
  const overallStats = [
    { number: "10+", label: "Industries Served", icon: Factory },
    { number: "3000+", label: "Companies Trust Us", icon: Shield },
    { number: "15,000+", label: "Installations", icon: Settings },
    { number: "18+", label: "Years Experience", icon: Wrench },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Powering <span className="text-red-400">Every Industry</span>
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              From automotive manufacturing to pharmaceutical cleanrooms, Sarv Jagat delivers specialized compressed air
              solutions tailored to meet the unique demands of every industry sector.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {overallStats.map((stat, index) => (
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

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold heading-professional">
              Industries We <span className="text-gradient">Serve</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Discover how Sarv Jagat's specialized compressed air solutions are transforming operations across diverse
              industry sectors.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="product-card card-hover overflow-hidden">
                <div className="relative">
                  <img
                    src={industry.image || "/placeholder.svg"}
                    alt={`${industry.name} Air Compressor Solutions`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-full">
                      <industry.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-background text-foreground">SJ Solutions</Badge>
                  </div>
                </div>

                <CardHeader className="space-y-4">
                  <CardTitle className="text-2xl">{industry.name}</CardTitle>
                  <CardDescription className="text-professional text-base">{industry.description}</CardDescription>

                  {/* Key Statistics */}
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    {Object.entries(industry.stats).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                      </div>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Applications */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">Key Applications:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {industry.applications.slice(0, 4).map((app, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Products */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">Recommended Products:</div>
                    <div className="flex flex-wrap gap-2">
                      {industry.products.map((product, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Case Study */}
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-2">Success Story:</div>
                    <div className="text-sm text-muted-foreground italic">{industry.caseStudy}</div>
                  </div>

                  <Button asChild className="w-full btn-primary">
                    <Link href={industry.href}>
                      Explore {industry.name} Solutions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SJ for Your Industry */}
      <section className="py-20 industrial-section">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              Why Industries Choose <span className="text-gradient">Sarv Jagat</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Industry-specific expertise combined with world-class engineering and comprehensive support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Industry Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">
                  25+ years of specialized experience across diverse industrial sectors
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle>Custom Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">
                  Tailored compressor systems designed for specific industry requirements
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Wrench className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle>Complete Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">Installation, maintenance, and 24/7 technical support nationwide</p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-muted-foreground rounded-full flex items-center justify-center mb-4">
                  <Factory className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-professional">
                  Documented success stories with measurable improvements in efficiency
                </p>
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
              Ready to Transform Your Industry Operations?
            </h2>
            <p className="text-xl text-white/90 text-professional">
              Get industry-specific consultation and discover how Sarv Jagat's compressed air solutions can optimize
              your operations, reduce costs, and improve productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary text-lg px-8">
                Get Industry Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 bg-transparent"
              >
                Download Industry Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
