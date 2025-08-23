import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Factory, Wrench, Car, Paintbrush } from "lucide-react"
import Link from "next/link"

// Automotive industry specific page with detailed applications and solutions
export default function AutomotivePage() {
  // Automotive applications based on product descriptions
  const applications = [
    {
      title: "Spray Painting Booths",
      description:
        "High-quality, oil-free compressed air for automotive paint applications ensuring perfect finish quality",
      requirements: ["Oil-free air", "Consistent pressure", "Moisture-free", "High flow rate"],
      products: ["Oil-Free Screw Compressors", "Refrigerated Air Dryers", "Multi-stage Filtration"],
      benefits: ["Perfect paint finish", "Reduced defects", "Lower rework costs"],
      icon: Paintbrush,
      image: "/automotive-spray-painting.png",
    },
    {
      title: "Pneumatic Tools Operation",
      description: "Reliable compressed air for pneumatic tools, impact wrenches, and assembly line equipment",
      requirements: ["Stable pressure", "High CFM", "Clean air", "Continuous operation"],
      products: ["Fixed Speed Screw Compressors", "Air Receiver Tanks", "Inline Filters"],
      benefits: ["Consistent tool performance", "Reduced maintenance", "Higher productivity"],
      icon: Wrench,
      image: "/automotive-pneumatic-tools.png",
    },
    {
      title: "Assembly Line Operations",
      description: "Automated pneumatic systems for car and bike assembly lines with precise control",
      requirements: ["Variable demand", "Quick response", "Energy efficiency", "Reliability"],
      products: ["Variable Speed Drive Compressors", "Smart Control Systems", "Duplex Systems"],
      benefits: ["Energy savings up to 35%", "Reduced downtime", "Flexible operation"],
      icon: Factory,
      image: "/automotive-assembly-line.png",
    },
    {
      title: "Tire Inflation & Testing",
      description: "High-pressure air systems for tire inflation, testing, and quality control processes",
      requirements: ["High pressure capability", "Accurate control", "Safety systems", "Fast filling"],
      products: ["Multi-stage High Pressure Compressors", "Booster Systems", "Pressure Control Valves"],
      benefits: ["Faster testing cycles", "Improved safety", "Accurate pressure control"],
      icon: Car,
      image: "/automotive-tire-testing.png",
    },
  ]

  // Case studies with real-world examples
  const caseStudies = [
    {
      company: "Leading Auto Manufacturer",
      challenge: "High energy costs and frequent compressor breakdowns affecting production",
      solution: "Installed SJ Variable Speed Drive compressors with smart control systems",
      results: ["35% reduction in energy costs", "99.5% uptime achieved", "ROI within 18 months"],
      savings: "₹25 Lakhs annually",
    },
    {
      company: "Premium Car Paint Shop",
      challenge: "Paint defects due to oil contamination and moisture in compressed air",
      solution: "Implemented SJ Oil-Free compressors with advanced filtration and dryers",
      results: ["Zero oil contamination", "95% reduction in paint defects", "Improved customer satisfaction"],
      savings: "₹15 Lakhs in rework costs",
    },
    {
      company: "Two-Wheeler Assembly Plant",
      challenge: "Inconsistent air pressure affecting pneumatic tool performance",
      solution: "Deployed SJ Duplex compressor system with large air receiver tanks",
      results: ["Stable air pressure", "40% reduction in tool maintenance", "20% increase in productivity"],
      savings: "₹12 Lakhs annually",
    },
  ]

  // Recommended products for automotive industry
  const recommendedProducts = [
    {
      name: "SJ Oil-Free Screw Compressors",
      description: "Perfect for paint booths and sensitive applications requiring contamination-free air",
      features: ["100% oil-free", "Class 0 air quality", "Energy efficient", "Low maintenance"],
      powerRange: "10-200 HP",
      href: "/products",
    },
    {
      name: "SJ Variable Speed Drive Compressors",
      description: "Ideal for assembly lines with varying air demand, providing significant energy savings",
      features: ["Up to 35% energy savings", "Smart load matching", "Soft start technology", "Remote monitoring"],
      powerRange: "10-200 HP",
      href: "/products/screw/variable-speed",
    },
    {
      name: "SJ High Pressure Systems",
      description: "Specialized for tire testing and high-pressure applications in automotive testing",
      features: ["Up to 40 bar pressure", "Safety systems", "Precise control", "Reliable operation"],
      powerRange: "15-30 HP",
      href: "/products",
    },
  ]

  // Industry statistics
  const industryStats = [
    { metric: "Automotive Companies", value: "500+", description: "Trust SJ compressors" },
    { metric: "Installations", value: "2000+", description: "Across India" },
    { metric: "Energy Savings", value: "35%", description: "Average with VSD systems" },
    { metric: "Uptime", value: "99.5%", description: "Average system availability" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-slate-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-slate-600">
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/industries" className="hover:text-red-600">
              Industries
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Automotive</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-primary text-primary-foreground">Industry Leader</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold heading-professional">
                  Automotive Industry <span className="text-gradient">Air Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Powering automotive manufacturing with reliable, efficient, and contamination-free compressed air
                  systems. From paint booths to assembly lines, SJ delivers the precision and reliability automotive
                  industry demands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Automotive Companies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">35%</div>
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get Automotive Solution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/sj-automotive-ind.jpg"
                alt="Automotive Manufacturing with SJ Air Compressors"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-xl">
                <div className="text-2xl font-bold">99.5%</div>
                <div className="text-sm">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Statistics */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industryStats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary stats-counter">{stat.value}</div>
                <div className="font-medium">{stat.metric}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              Automotive <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Comprehensive compressed air solutions for every aspect of automotive manufacturing and service
              operations.
            </p>
          </div>

          <Tabs defaultValue="painting" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="painting">Paint Booths</TabsTrigger>
              <TabsTrigger value="tools">Pneumatic Tools</TabsTrigger>
              <TabsTrigger value="assembly">Assembly Lines</TabsTrigger>
              <TabsTrigger value="testing">Tire Testing</TabsTrigger>
            </TabsList>

            {applications.map((app, index) => (
              <TabsContent key={index} value={app.title.toLowerCase().split(" ")[0]} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <app.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold">{app.title}</h3>
                    </div>

                    <p className="text-lg text-muted-foreground text-professional">{app.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Requirements:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {app.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span className="text-sm">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Recommended Products:</h4>
                        <div className="flex flex-wrap gap-2">
                          {app.products.map((product, idx) => (
                            <Badge key={idx} variant="secondary">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {app.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <img src={app.image || "/placeholder.svg"} alt={app.title} className="rounded-lg shadow-xl" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 industrial-section">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Real results from automotive companies that chose SJ compressed air solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{study.company}</CardTitle>
                  <CardDescription className="text-professional">{study.challenge}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Solution:</h4>
                    <p className="text-sm text-professional">{study.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-secondary">Results:</h4>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="text-sm font-medium text-primary">Annual Savings:</div>
                    <div className="text-lg font-bold text-primary">{study.savings}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              Recommended <span className="text-gradient">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Specially selected SJ compressor systems optimized for automotive industry requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="text-professional">{product.description}</CardDescription>
                  <div className="pt-2">
                    <Badge className="bg-primary text-primary-foreground">{product.powerRange}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full btn-primary">
                    <Link href={product.href}>
                      View Product Details
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
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold heading-professional">Ready to Optimize Your Automotive Operations?</h2>
            <p className="text-xl text-white/90 text-professional">
              Get specialized consultation for your automotive compressed air requirements. Our experts will design the
              perfect solution for your specific applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                {/* <Phone className="mr-2 h-5 w-5" /> */}
                Get Automotive Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
              >
                Schedule Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
