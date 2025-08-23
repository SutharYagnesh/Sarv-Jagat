import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Factory, Wrench, FlaskConical, Cpu, CircuitBoard, TestTube, TrendingUp, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"

// Electronics industry specific page with detailed applications and solutions
export default function ElectronicsPage() {
  // Electronics applications based on product descriptions
  const applications = [
    {
      title: "Cleanroom Environments",
      description: "Maintaining ultra-clean, particle-free air for sensitive manufacturing processes like wafer fabrication and assembly.",
      requirements: [
        "Class 0 oil-free air",
        "Precise humidity control",
        "Advanced filtration systems",
      ],
      products: [
        "Oil-Free Rotary Screw Compressors",
        "Heatless Desiccant Dryers",
        "High-Efficiency Particulate Filters",
      ],
      benefits: [
        "Prevention of product contamination",
        "Increased yield rates",
        "Compliance with industry standards",
      ],
      icon: FlaskConical,
      image: "/electronics-cleanroom.jpg",
    },
    {
      title: "Semiconductor Manufacturing",
      description: "Providing ultra-pure compressed air for etching, deposition, and cleaning processes in semiconductor fabrication.",
      requirements: [
        "Ultra-dry air (low dew point)",
        "Stable pressure and flow",
        "Absence of hydrocarbons and particles",
      ],
      products: [
        "Oil-Free Scroll Compressors",
        "Adsorption Dryers",
        "Activated Carbon Filters",
      ],
      benefits: [
        "Enhanced process precision",
        "Reduced defects in microchips",
        "Extended lifespan of sensitive equipment",
      ],
      icon: Cpu,
      image: "/electronics-semiconductor-manufacturing.jpg",
    },
    {
      title: "Electronic Component Assembly",
      description: "Powering precision tools, pick-and-place machines, and automated assembly lines with reliable compressed air.",
      requirements: [
        "Consistent, pulsation-free air",
        "Energy efficiency",
        "Low noise operation",
      ],
      products: [
        "Variable Speed Drive (VSD) Compressors",
        "Air Receivers",
        "Point-of-Use Filters",
      ],
      benefits: [
        "Improved assembly accuracy",
        "Reduced energy consumption",
        "Increased production throughput",
      ],
      icon: CircuitBoard,
      image: "/electronics-component-assembly.jpg",
    },
    {
      title: "Testing & Quality Control",
      description: "Supplying precise compressed air for leak testing, functional testing, and environmental chambers.",
      requirements: [
        "Accurate pressure regulation",
        "Reliable air supply",
        "Minimal vibration",
      ],
      products: [
        "Oil-Free Piston Compressors",
        "Membrane Dryers",
        "High Pressure Boosters",
      ],
      benefits: [
        "Accurate test results",
        "Enhanced product reliability",
        "Reduced testing cycle times",
      ],
      icon: TestTube,
      image: "/electronics-testing.jpg",
    },
  ]

  // Case studies with real-world examples
  const caseStudies = [
    {
      company: "Silicon Innovations Inc.",
      challenge: "Contamination in compressed air causing defects in semiconductor manufacturing and reducing yield.",
      solution: "Implemented SJ's ultra-clean, oil-free compressed air system with advanced filtration and drying.",
      results: ["Achieved a 95% reduction in contamination-related defects and a 15% increase in product yield."],
      savings: "₹2.5 Crore annually",
      image: "/case-study-silicon-innovations.jpg",
    },
    {
      company: "ElectroTech Solutions",
      challenge: "Inconsistent air pressure and quality affecting the precision of electronic component assembly.",
      solution: "Installed SJ's Variable Speed Drive (VSD) compressors and precise pressure regulation systems.",
      results: ["Improved assembly accuracy by 20%", "Reduced energy consumption by 30%", "Increased production throughput."],
      savings: "₹1.2 Crore annually",
      image: "/case-study-electrotech.jpg",
    },
  ]

  // Recommended products for Electronics industry
  const recommendedProducts = [
    {
      name: "Oil-Free Scroll Compressors",
      features: [
        "100% oil-free air for contamination-sensitive processes",
        "Extremely quiet operation, ideal for laboratory and cleanroom environments",
        "Low maintenance and energy-efficient",
        "Compact design for easy integration",
      ],
      powerRange: "0.75 kW - 22 kW",
      image: "/oil-free-scroll-compressor.png",
      href: "/products/oil-free-scroll-compressors",
    },
    {
      name: "Heatless Desiccant Dryers",
      features: [
        "Achieves ultra-low dew points for critical applications",
        "Ensures dry air for preventing moisture-related defects",
        "Reliable performance in continuous operation",
        "Available with various control options",
      ],
      powerRange: "10 CFM - 5000 CFM",
      image: "/heatless-desiccant-dryer.png",
      href: "/products/heatless-desiccant-dryers",
    },
    {
      name: "High-Efficiency Particulate Filters",
      features: [
        "Removes sub-micron particles, dust, and aerosols",
        "Essential for cleanroom and semiconductor manufacturing",
        "Protects sensitive electronic components",
        "Minimizes product contamination",
      ],
      powerRange: "Various flow rates",
      image: "/high-efficiency-particulate-filter.png",
      href: "/products/high-efficiency-particulate-filters",
    },
    {
      name: "Oil-Free Piston Compressors",
      features: [
        "Provides oil-free air for precision testing and control systems",
        "Durable and reliable for intermittent or continuous duty",
        "Low vibration and noise levels",
        "Suitable for various laboratory and industrial applications",
      ],
      powerRange: "0.5 kW - 15 kW",
      image: "/oil-free-piston-compressor.png",
      href: "/products/oil-free-piston-compressors",
    },
  ]

  const industryStats = [
    {
      title: "Yield Improvement",
      value: "15%",
      description: "Achieved through ultra-clean air, reducing defects in sensitive manufacturing.",
      icon: TrendingUp,
    },
    {
      title: "Contamination Reduction",
      value: "95%",
      description: "Ensured by advanced filtration and oil-free compressed air systems.",
      icon: ShieldCheck,
    },
    {
      title: "Energy Efficiency",
      value: "30%",
      description: "Savings from optimized compressed air systems for precision assembly.",
      icon: Zap,
    },
    {
      title: "Equipment Lifespan Extension",
      value: "25%",
      description: "Resulting from dry and particle-free air, protecting sensitive machinery.",
      icon: Wrench,
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-primary text-primary-foreground">Industry Leader</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold heading-professional">
                  Electronics & Semiconductor Industry <span className="text-gradient">Air Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Powering electronics & semiconductor manufacturing with reliable, efficient, and contamination-free compressed air systems. From cleanrooms to precision assembly, SJ delivers the precision and reliability electronics & semiconductor industry demands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Electronics & Semiconductor Companies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">35%</div>
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get Electronics & Semiconductor Solution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/sj-semiconductor-ind.jpg"
                alt="Electronics & Semiconductor Manufacturing with SJ Air Compressors"
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
              Electronics & Semiconductor <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Comprehensive compressed air solutions for every aspect of electronics & semiconductor manufacturing and service operations.
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
              Real results from electronics & semiconductor companies that chose SJ compressed air solutions.
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
              Specially selected SJ compressor systems optimized for electronics & semiconductor industry requirements.
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
            <h2 className="text-3xl font-bold heading-professional">Ready to Optimize Your Electronics & Semiconductor Operations?</h2>
            <p className="text-xl text-white/90 text-professional">
              Get specialized consultation for your electronics & semiconductor compressed air requirements. Our experts will design the
              perfect solution for your specific applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                
                Get Electronics & Semiconductor Consultation
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
    </>
  )
}
