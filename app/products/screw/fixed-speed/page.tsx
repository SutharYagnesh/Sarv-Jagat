import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Settings, Zap, Shield, Wrench, Factory, Phone, Download } from "lucide-react"
import Link from "next/link"

// SJ Oil-Injected Fixed Speed Screw Air Compressor detailed product page
export default function FixedSpeedScrewPage() {
  // Technical specifications based on provided product description
  const specifications = [
    { parameter: "Power Range", value: "10 HP to 200 HP" },
    { parameter: "Pressure Range", value: "7 bar to 16 bar" },
    { parameter: "Airend Technology", value: "SJBrand Precision Screw Airend" },
    { parameter: "Motor Type", value: "Heavy-Duty TEFC Motors" },
    { parameter: "Cooling System", value: "Advanced Oil & Air Coolers" },
    { parameter: "Control Panel", value: "Smart Controls with Fault Indicators" },
    { parameter: "Construction", value: "Rigid Base Frame with Anti-Vibration Mounts" },
    { parameter: "Lubrication", value: "Oil-Injected System" },
  ]

  // Key technical highlights from product description
  const technicalHighlights = [
    {
      title: "SJBrand Precision Airend",
      description: "Developed with tight clearances and balanced rotors to ensure maximum efficiency and long life.",
      icon: Settings,
    },
    {
      title: "Heavy-Duty TEFC Motors",
      description: "Designed for continuous operation even in high-temperature environments.",
      icon: Zap,
    },
    {
      title: "Advanced Cooling System",
      description: "Efficient oil & air coolers for low operating temperature and extended component life.",
      icon: Shield,
    },
    {
      title: "User-Friendly Control Panel",
      description: "Smart controls with fault indicators, pressure display, and safety interlocks.",
      icon: Wrench,
    },
  ]

  // Applications organized by industry from product description
  const applications = [
    {
      industry: "Automotive Industry",
      uses: [
        "Spray painting booths",
        "Pneumatic tools operation",
        "Car and bike assembly lines",
        "Tyre inflation and testing",
      ],
      icon: Factory,
    },
    {
      industry: "Metal & Fabrication",
      uses: ["CNC and VMC machinery", "Sandblasting & shot peening", "Plasma and laser cutting machines"],
      icon: Wrench,
    },
    {
      industry: "Pharmaceuticals & Cleanrooms",
      uses: [
        "Capsule filling machines",
        "Tablet compression and packaging",
        "Pressure differential systems for cleanrooms",
        "Fermentation and drying processes",
      ],
      icon: Shield,
    },
    {
      industry: "Food & Beverage Processing",
      uses: [
        "Pneumatic bottle filling",
        "Packing machines",
        "Nitrogen flushing and sealing lines",
        "Cleaning & sterilization",
      ],
      icon: Factory,
    },
    {
      industry: "Textile & Garment Manufacturing",
      uses: ["Loom operations", "Pneumatic spindles & air jets", "Dyeing & printing machines"],
      icon: Settings,
    },
    {
      industry: "Construction & Infrastructure",
      uses: ["Pneumatic drills and compactors", "Concrete sprayers", "Tunneling support systems"],
      icon: Factory,
    },
  ]

  // Benefits from product description
  const benefits = [
    "100% SJBrand design, engineering & manufacturing",
    "Supported by ISO 9001:2015 certified quality systems",
    "Energy-efficient and cost-effective for stable air demand",
    "After-sales support, AMC, and spares across India",
    "Proven in rugged field conditions across industries",
    "Ready for 24x7 operation with reliable air delivery",
  ]

  // Available configurations
  const configurations = [
    { name: "Base Mounted", description: "Standard floor-mounted configuration" },
    { name: "Tank Mounted", description: "Integrated with horizontal air receiver tank" },
    { name: "With Air Dryer", description: "Complete system with refrigerated air dryer" },
    { name: "Custom Skid", description: "Customized mounting and piping solutions" },
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
            <Link href="/products" className="hover:text-red-600">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products/screw" className="hover:text-red-600">
              Screw Compressors
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Fixed Speed</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-primary text-primary-foreground">SJBrand Technology</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold heading-professional">
                  SJ Oil-Injected <span className="text-gradient">Fixed Speed</span> Screw Air Compressor
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Built for long-lasting, efficient, and consistent industrial air supply. Powered by our in-house
                  developed SJBrand precision screw airend technology, optimized for continuous-duty performance in
                  tough environments.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Power Range</div>
                  <div className="text-2xl font-bold text-primary">10-200 HP</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Pressure Range</div>
                  <div className="text-2xl font-bold text-primary">7-16 Bar</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="mr-2 h-5 w-5" />
                  Download Datasheet
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/sj-screw-assemble.png"
                alt="SJ Fixed Speed Screw Air Compressor"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-xl">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Operation Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="configurations">Configurations</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {technicalHighlights.map((highlight, index) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <highlight.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl">{highlight.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-professional text-base">{highlight.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Why Choose SJ Fixed Speed Compressors?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-professional">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Technical Specifications</CardTitle>
                  <CardDescription>
                    Detailed technical parameters for SJ Fixed Speed Screw Air Compressors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b">
                        <span className="font-medium">{spec.parameter}</span>
                        <span className="text-primary font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Options Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {configurations.map((config, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <div className="font-medium mb-2">{config.name}</div>
                        <div className="text-sm text-muted-foreground">{config.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {applications.map((app, index) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                          <app.icon className="h-6 w-6 text-secondary-foreground" />
                        </div>
                        <CardTitle className="text-xl">{app.industry}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {app.uses.map((use, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-professional">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="configurations" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {configurations.map((config, index) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <CardTitle className="text-xl">{config.name}</CardTitle>
                      <CardDescription className="text-professional">{config.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full btn-primary">
                        Get Configuration Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold heading-professional">Ready to Upgrade Your Air System?</h2>
            <p className="text-xl text-white/90 text-professional">
              Get expert consultation and customized quotation for SJ Fixed Speed Screw Air Compressors tailored to your
              specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                <Phone className="mr-2 h-5 w-5" />
                Call Technical Expert
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
              >
                Request Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold heading-professional">Related Products</h2>
            <p className="text-muted-foreground">Explore other SJ screw compressor solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Variable Speed Drive (VSD)</CardTitle>
                <CardDescription>Energy-efficient VFD controlled screw compressors</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full btn-primary">
                  <Link href="/products/screw/variable-speed">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Oil-Free Screw</CardTitle>
                <CardDescription>100% oil-free compressed air solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full btn-primary">
                  <Link href="/products/screw/oil-free">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Tank Mounted</CardTitle>
                <CardDescription>All-in-one compact screw compressor systems</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full btn-primary">
                  <Link href="/products/screw/tank-mounted">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
