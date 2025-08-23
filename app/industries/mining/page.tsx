import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Factory, Wrench, Drill, Loader, AirVent, Hammer, Fuel, CloudOff } from "lucide-react"
import Link from "next/link"

// Mining & Quarry industry specific page with detailed applications and solutions
export default function MiningPage() {
  // Mining & Quarry applications based on product descriptions
  const applications = [
    {
      title: "Drilling & Blasting",
      description:
        "High-pressure compressed air for powering rock drills, blast hole drills, and pneumatic tools in mining and quarrying operations.",
      requirements: ["High pressure", "High volume", "Durability", "Reliability in harsh conditions"],
      products: ["High Pressure Screw Compressors", "Portable Diesel Compressors", "Booster Compressors"],
      benefits: ["Efficient rock excavation", "Faster drilling cycles", "Reduced operational costs"],
      icon: Drill,
      image: "/mining-drilling.png",
    },
    {
      title: "Material Handling & Conveying",
      description: "Compressed air for pneumatic conveying systems, material transport, and dust collection in mines and quarries.",
      requirements: ["Clean air", "Consistent pressure", "High flow rate", "Automation compatibility"],
      products: ["Fixed Speed Screw Compressors", "Variable Speed Drive Compressors", "Dust Collectors"],
      benefits: ["Efficient material movement", "Improved air quality", "Reduced manual labor"],
      icon: Loader,
      image: "/mining-material-handling.png",
    },
    {
      title: "Ventilation & Safety",
      description: "Reliable compressed air for mine ventilation systems, emergency breathing apparatus, and safety equipment.",
      requirements: ["High purity air", "Redundancy", "Remote monitoring", "Compliance with safety standards"],
      products: ["Oil-Free Compressors", "High Pressure Compressors", "Air Treatment Systems"],
      benefits: ["Enhanced worker safety", "Improved air quality in confined spaces", "Compliance with regulations"],
      icon: AirVent,
      image: "/mining-ventilation.png",
    },
    {
      title: "Crushing & Screening",
      description: "Robust compressed air for operating crushers, screens, and other processing equipment in quarry operations.",
      requirements: ["High pressure", "Continuous operation", "Durability", "Low maintenance"],
      products: ["Heavy-Duty Piston Compressors", "Fixed Speed Screw Compressors", "Air Receivers"],
      benefits: ["Efficient material processing", "Reduced wear and tear on equipment", "Consistent output"],
      icon: Hammer,
      image: "/mining-crushing.png",
    },
  ]

  // Case studies with real-world examples
  const caseStudies = [
    {
      company: "RockSolid Mining",
      challenge:
        "RockSolid Mining faced significant operational challenges due to frequent breakdowns of their drilling equipment and high energy consumption from their outdated compressed air systems in a remote, harsh environment.",
      solution:
        "We implemented a customized solution featuring high-pressure screw compressors and portable diesel compressors, designed for extreme conditions, ensuring consistent air supply and fuel efficiency.",
      results:
        "RockSolid Mining achieved a 25% increase in drilling efficiency, reduced fuel consumption by 15%, and extended the lifespan of their pneumatic tools by 30%, leading to substantial cost savings and improved productivity.",
      savings: "25% drilling efficiency increase",
      image: "/mining-casestudy-1.png",
    },
    {
      company: "QuarryKing Aggregates",
      challenge:
        "QuarryKing Aggregates struggled with inconsistent material processing and excessive dust generation in their crushing and screening operations, impacting product quality and worker safety.",
      solution:
        "We installed a robust fixed-speed screw compressor system with integrated air treatment and dust collection solutions, providing clean, high-volume air for their processing equipment and ventilation.",
      results:
        "QuarryKing Aggregates improved material consistency by 20%, reduced airborne dust by 40%, and enhanced overall plant safety, resulting in higher quality aggregates and a healthier working environment.",
      savings: "20% material consistency improvement",
      image: "/mining-casestudy-2.png",
    },
  ]

  const recommendedProducts = [
    {
      name: "High Pressure Screw Compressors",
      features: [
        "Designed for demanding drilling and blasting applications",
        "Robust construction for harsh mining environments",
        "High efficiency and reliability",
        "Available in various capacities",
      ],
      powerRange: "75 kW - 355 kW",
      image: "/high-pressure-screw-compressor.png",
      href: "/products/high-pressure-screw-compressors",
    },
    {
      name: "Portable Diesel Compressors",
      features: [
        "Excellent mobility for remote mining sites",
        "Reliable performance in extreme temperatures",
        "Fuel-efficient engines for extended operation",
        "Easy to maintain and service",
      ],
      powerRange: "50 CFM - 1600 CFM",
      image: "/portable-diesel-compressor.png",
      href: "/products/portable-diesel-compressors",
    },
    {
      name: "Booster Compressors",
      features: [
        "Increases existing air pressure for specialized tools",
        "Compact design for easy integration",
        "Ideal for deep drilling and high-pressure applications",
        "Enhances productivity and efficiency",
      ],
      powerRange: "15 kW - 45 kW",
      image: "/booster-compressor.png",
      href: "/products/booster-compressors",
    },
    {
      name: "Air Treatment Systems",
      features: [
        "Removes moisture, oil, and particulates from compressed air",
        "Protects pneumatic equipment and tools",
        "Ensures high air quality for safety and process needs",
        "Extends equipment lifespan",
      ],
      powerRange: "Various flow rates",
      image: "/air-treatment-system.png",
      href: "/products/air-treatment-systems",
    },
  ]

  // Industry statistics
  const industryStats = [
    {
      title: "Drilling Efficiency Increase",
      value: "25%",
      description: "Achieved with high-pressure and reliable compressed air systems.",
      icon: Drill,
    },
    {
      title: "Fuel Consumption Reduction",
      value: "15%",
      description: "Through optimized portable diesel compressors for remote sites.",
      icon: Fuel,
    },
    {
      title: "Tool Lifespan Extension",
      value: "30%",
      description: "Resulting from clean and dry air supply, reducing wear and tear.",
      icon: Wrench,
    },
    {
      title: "Dust Reduction",
      value: "40%",
      description: "Improved air quality and safety through effective dust collection systems.",
      icon: CloudOff,
    },
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
            <span className="text-slate-900">Mining & Quarry</span>
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
                  Mining & Quarry Industry <span className="text-gradient">Air Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Powering mining and quarry operations with robust, high-performance compressed air systems. From drilling to material handling, SJ delivers the durability and reliability the mining industry demands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Mining & Quarry Companies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">35%</div>
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get Mining & Quarry Solution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/SJ-MINING-PHOTO.jpg"
                alt="Mining operations with SJ Air Compressors"
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
                {/* <div className="font-medium">{stat.metric}</div> */}
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
              Comprehensive compressed air solutions for every aspect of mining and quarry operations.
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
              Real results from mining companies that chose SJ compressed air solutions.
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
                      {/* {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{result}</span>
                        </li>
                      ))} */}
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
              Specially selected SJ compressor systems optimized for mining & quarry industry requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  {/* <CardDescription className="text-professional">{product.description}</CardDescription> */}
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
              Get specialized consultation for your mining compressed air requirements. Our experts will design the
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
