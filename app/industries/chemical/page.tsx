import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Factory, Wrench, Car, Paintbrush } from "lucide-react"
import Link from "next/link"

// Chemical & Process industry specific page with detailed applications and solutions
export default function ChemicalPage() {
  // Chemical & Process applications based on product descriptions
  const applications = [
      {
        title: "Pneumatic Conveying",
        description:
          "Efficient and reliable compressed air for transporting powders, granules, and other bulk materials in chemical processes.",
        requirements: ["High pressure", "Consistent flow", "Oil-free air (for sensitive materials)", "Reliability"],
        products: ["High Pressure Compressors", "Rotary Screw Compressors", "Air Receivers"],
        benefits: ["Reduced material handling costs", "Improved safety", "Minimized product contamination"],
        icon: "/icons/conveying.svg",
        image: "/applications/chemical/pneumatic-conveying.jpg",
      },
      {
        title: "Instrumentation Air",
        description:
          "Ultra-clean and dry compressed air for precise control of pneumatic instruments, valves, and actuators.",
        requirements: ["Oil-free air", "Pressure dew point -40°C or lower", "Particulate-free", "Stable pressure"],
        products: ["Oil-Free Scroll Compressors", "Adsorption Dryers", "Precision Filters"],
        benefits: ["Accurate process control", "Reduced instrument maintenance", "Prevention of system corrosion"],
        icon: "/icons/instrumentation.svg",
        image: "/applications/chemical/instrumentation-air.jpg",
      },
      {
        title: "Process Air",
        description:
          "Contamination-free compressed air for direct contact with products, agitation, oxidation, and fermentation processes.",
        requirements: ["100% Oil-free air", "High purity", "Consistent quality", "Reliable supply"],
        products: ["Oil-Free Rotary Screw Compressors", "Centrifugal Compressors", "Sterile Filters"],
        benefits: ["Ensures product integrity", "Prevents batch contamination", "Meets regulatory standards"],
        icon: "/icons/process-air.svg",
        image: "/applications/chemical/process-air.jpg",
      },
      {
        title: "Nitrogen Generation",
        description:
          "Compressed air supply for on-site nitrogen generation, used for inerting, blanketing, and purging.",
        requirements: ["Stable pressure", "Consistent flow", "Dry air", "Energy efficiency"],
        products: ["Rotary Screw Compressors", "Membrane Nitrogen Generators", "PSA Nitrogen Generators"],
        benefits: ["Cost-effective nitrogen supply", "Increased safety", "Reduced reliance on cylinders"],
        icon: "/icons/nitrogen-generation.svg",
        image: "/applications/chemical/nitrogen-generation.jpg",
      },
    ];

  // Case studies with real-world examples
    const caseStudies = [
      {
        company: "ChemCorp Solutions",
        challenge: "Ensuring consistent purity of process air for sensitive chemical reactions",
        solution: "Implemented SJ 100% Oil-Free Compressors with multi-stage filtration and adsorption dryers.",
        results: "Achieved ISO 8573-1 Class 0 air quality, eliminating contamination risks and improving product yield by 15%.",
        savings: "Reduced product wastage and compliance costs by ₹20 Lakhs annually.",
        image: "/case-studies/chemical-plant-purity.jpg",
      },
      {
        company: "ProcessFlow Innovations",
        challenge: "High energy consumption and frequent breakdowns in pneumatic conveying systems.",
        solution: "Replaced old fixed-speed compressors with SJ Variable Speed Drive (VSD) Compressors and optimized air distribution.",
        results: "Reduced energy costs by 35% and increased system uptime by 90%, leading to smoother material handling.",
        savings: "Annual energy savings of ₹18 Lakhs and significant reduction in maintenance expenses.",
        image: "/case-studies/chemical-conveying-efficiency.jpg",
      },
    ];

  // Recommended products for Chemical & Process industry
    const recommendedProducts = [
      {
        name: "Oil-Free Rotary Screw Compressors",
        description: "Provides 100% oil-free air crucial for sensitive chemical processes and instrumentation.",
        features: ["ISO 8573-1 Class 0 certified", "High efficiency", "Low maintenance"],
        powerRange: "15-300 HP",
        image: "/products/oil-free-rotary-screw-compressor.png",
        href: "/products/oil-free-compressors",
      },
      {
        name: "High Pressure Compressors",
        description: "Ideal for pneumatic conveying and other applications requiring high pressure air.",
        features: ["Up to 40 bar pressure", "Robust design", "Continuous operation"],
        powerRange: "15-75 HP",
        image: "/products/high-pressure-compressor.png",
        href: "/products/high-pressure-compressors",
      },
      {
        name: "Adsorption Dryers",
        description: "Ensures ultra-dry air with pressure dew points as low as -70°C, essential for instrumentation and process air.",
        features: ["Low dew point", "Energy saving options", "Reliable performance"],
        powerRange: "Various",
        image: "/products/adsorption-dryer.png",
        href: "/products/air-dryers",
      },
      {
        name: "Centrifugal Compressors",
        description: "Offers large volumes of oil-free air for major chemical plants and continuous processes.",
        features: ["High flow rates", "Exceptional efficiency", "Minimal vibration"],
        powerRange: "200-2000 HP",
        image: "/products/centrifugal-compressor.png",
        href: "/products/centrifugal-compressors",
      },
    ];

  // Industry statistics
  const industryStats = [
      {
        metric: "Purity Achievement",
        value: "ISO Class 0",
        description: "For critical process air applications",
        icon: "/icons/purity.svg",
      },
      {
        metric: "Energy Savings",
        value: "30%+",
        description: "Average with VSD and oil-free systems",
        icon: "/icons/energy-savings.svg",
      },
      {
        metric: "Uptime Improvement",
        value: "99.9%",
        description: "Ensured by robust and reliable solutions",
        icon: "/icons/uptime.svg",
      },
      {
        metric: "Maintenance Cost Reduction",
        value: "25%",
        description: "Through extended service intervals and fewer breakdowns",
        icon: "/icons/maintenance.svg",
      },
    ];

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
            <span className="text-slate-900">Chemical & Process</span>
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
                  Chemical & Process Industry <span className="text-gradient">Air Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Powering chemical and process manufacturing with reliable, efficient, and contamination-free compressed air
                  systems. From pneumatic conveying to instrumentation, SJ delivers the precision and reliability chemical and process
                  industry demands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Chemical & Process Companies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">35%</div>
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get Chemical & Process Solution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/SJ-CHEMICAL-ind-oil-refinery-plant-tower-column-refinery-petrochemistry.jpg"
                alt="Chemical & Process Manufacturing with SJ Air Compressors"
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
              Chemical & Process <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Comprehensive compressed air solutions for every aspect of chemical and process manufacturing and service
              operations.
            </p>
          </div>

          <Tabs defaultValue="painting" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="pneumatic-conveying">Pneumatic Conveying</TabsTrigger>
              <TabsTrigger value="instrumentation-air">Instrumentation Air</TabsTrigger>
              <TabsTrigger value="process-air">Process Air</TabsTrigger>
              <TabsTrigger value="nitrogen-generation">Nitrogen Generation</TabsTrigger>
            </TabsList>

            {applications.map((app, index) => (
              <TabsContent key={index} value={app.title.toLowerCase().replace(/ /g, "-")} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <app.icon/>
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
                      {/* {study.requirements.map((result, idx) => (
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
            <h2 className="text-3xl font-bold heading-professional">Ready to Optimize Your Chemical & Process Operations?</h2>
            <p className="text-xl text-white/90 text-professional">
              Get specialized consultation for your chemical and process compressed air requirements. Our experts will design the
              perfect solution for your specific applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                {/* <Phone className="mr-2 h-5 w-5" /> */}
                Get Chemical & Process Consultation
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
