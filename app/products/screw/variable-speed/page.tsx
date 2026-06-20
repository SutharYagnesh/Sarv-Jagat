import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Settings, Zap, TrendingDown, Gauge, Factory, Phone, Download } from "lucide-react"
import Link from "next/link"

// SJ Oil-Injected Variable Speed Drive (VSD) Screw Air Compressor page
export default function VariableSpeedScrewPage() {
  // Technical specifications based on provided product description
  const specifications = [
    { parameter: "Power Range", value: "10 HP to 200 HP" },
    { parameter: "Pressure Range", value: "7 bar to 16 bar" },
    { parameter: "Energy Savings", value: "Up to 35% vs Fixed Speed" },
    { parameter: "Airend Technology", value: "SJBrand Precision Screw Airend" },
    { parameter: "Drive System", value: "Built-In VFD Panel" },
    { parameter: "Control System", value: "Integrated PLC Controller" },
    { parameter: "Start Technology", value: "Soft Start Technology" },
    { parameter: "Operation", value: "Variable Load 7-16 Bar" },
  ]

  // Key technical highlights from product description
  const technicalHighlights = [
    {
      title: "Built-In VFD Panel",
      description: "Smart drive controller that adjusts RPM in real time based on load demand.",
      icon: Gauge,
    },
    {
      title: "Up to 35% Energy Saving",
      description: "Significant energy savings compared to fixed speed compressors over lifecycle.",
      icon: TrendingDown,
    },
    {
      title: "Soft Start Technology",
      description: "Reduces mechanical stress and extends component life significantly.",
      icon: Zap,
    },
    {
      title: "Integrated PLC Controller",
      description: "Advanced control with safety interlocks, alerts, and energy monitoring.",
      icon: Settings,
    },
  ]

  // Applications organized by industry from product description
  const applications = [
    {
      industry: "Packaging & Automation Plants",
      uses: ["Fluctuating loads from conveyor systems", "Intermittent tool actuation, pick & place units"],
      icon: Factory,
    },
    {
      industry: "Pharmaceuticals & Biotech",
      uses: [
        "Clean compressed air for capsule, tablet & syringe filling",
        "Reduces energy waste during idle machine times",
        "HVAC cleanroom pressure systems",
      ],
      icon: Settings,
    },
    {
      industry: "Food & Beverage Industry",
      uses: ["Packaging, sealing, bottling, washing systems", "Handles dynamic cycles in production lines"],
      icon: Factory,
    },
    {
      industry: "Electronics & Semiconductor",
      uses: [
        "Energy-efficient air for PCB cleaning, soldering, lab setups",
        "Moisture control and particle control systems",
      ],
      icon: Zap,
    },
  ]

  // Benefits from product description
  const benefits = [
    "Energy Savings of up to 35% on electricity",
    "Low Starting Current reduces stress on electrical infrastructure",
    "Designed and manufactured fully by Sarv Jagat in India",
    "Uses SJBrand Airend and VFD Control Logic",
    "Backed by ISO 9001:2015 compliance",
    "Technical support, spares & AMC available pan-India",
    "Available in base-mounted, tank-mounted, or full skid units",
  ]

  // Energy comparison data
  const energyComparison = [
    { load: "100%", fixedSpeed: "100%", vsd: "100%", savings: "0%" },
    { load: "75%", fixedSpeed: "95%", vsd: "75%", savings: "21%" },
    { load: "50%", fixedSpeed: "85%", vsd: "50%", savings: "41%" },
    { load: "25%", fixedSpeed: "75%", vsd: "25%", savings: "67%" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products/screw" className="hover:text-primary">
              Screw Compressors
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Variable Speed</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-secondary text-secondary-foreground">Energy Efficient</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold heading-professional">
                  SJ Variable Speed Drive <span className="text-gradient">(VSD)</span> Screw Air Compressor
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Built to intelligently match your air demand, saving energy and operating costs without compromising
                  performance. Uses Sarv Jagat's in-house engineered VSD technology to automatically vary motor speed
                  based on system air requirements.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Power Range</div>
                  <div className="text-xl font-bold text-primary">10-200 HP</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                  <div className="text-xl font-bold text-secondary">Up to 35%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Pressure Range</div>
                  <div className="text-xl font-bold text-primary">7-16 Bar</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Calculate Savings
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
                alt="SJ Variable Speed Drive Screw Air Compressor"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-xl">
                <div className="text-2xl font-bold">35%</div>
                <div className="text-sm">Energy Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Savings Highlight */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold heading-professional">
              Proven <span className="text-gradient">Energy Savings</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              VSD technology automatically adjusts compressor speed to match air demand, delivering significant energy
              savings compared to fixed speed compressors.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Energy Consumption Comparison</CardTitle>
              <CardDescription className="text-center">Power consumption at different load conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Load Condition</th>
                      <th className="text-center py-3 px-4">Fixed Speed</th>
                      <th className="text-center py-3 px-4">VSD</th>
                      <th className="text-center py-3 px-4">Energy Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {energyComparison.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{row.load}</td>
                        <td className="text-center py-3 px-4">{row.fixedSpeed}</td>
                        <td className="text-center py-3 px-4 text-primary font-semibold">{row.vsd}</td>
                        <td className="text-center py-3 px-4 text-secondary font-bold">{row.savings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
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
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Technical Specifications</CardTitle>
                  <CardDescription>
                    Detailed technical parameters for SJ Variable Speed Drive Screw Air Compressors
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

            <TabsContent value="benefits" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Why Choose SJ Variable Speed Compressors?</CardTitle>
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
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold heading-professional">Start Saving Energy Today</h2>
            <p className="text-xl text-white/90 text-professional">
              Calculate your potential energy savings with SJ Variable Speed Drive compressors. Our experts will help
              you determine the optimal solution for your application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                <Phone className="mr-2 h-5 w-5" />
                Get Energy Audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
              >
                Calculate ROI
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
