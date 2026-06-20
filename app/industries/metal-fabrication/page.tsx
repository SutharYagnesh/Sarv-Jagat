import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Factory, Wrench, Car, Paintbrush, Phone } from "lucide-react"
import Link from "next/link"

// Automotive industry specific page with detailed applications and solutions
export default function MetalFabricationPage() {
  // Automotive applications based on product descriptions
  const applications = [
    {
      title: "CNC and VMC Machinery",
      description:
        "Precision compressed air for operating CNC and VMC machines, ensuring accuracy and smooth operation.",
      requirements: ["Clean, dry air", "Consistent pressure", "High flow rate", "Oil-free air (for some applications)"],
      products: ["Oil-Free Screw Compressors", "Refrigerated Air Dryers", "Precision Filters"],
      benefits: ["Enhanced machining accuracy", "Reduced tool wear", "Extended machine lifespan"],
      icon: Wrench,
      image: "/metal-cnc-vmc.png",
    },
    {
      title: "Sandblasting & Shot Peening",
      description: "Robust compressed air for surface preparation, cleaning, and strengthening metal components.",
      requirements: ["High pressure", "High volume", "Dry air", "Durability"],
      products: ["High Pressure Piston Compressors", "Desiccant Air Dryers", "Heavy-Duty Filters"],
      benefits: ["Efficient surface treatment", "Improved material strength", "Reduced processing time"],
      icon: Factory,
      image: "/metal-sandblasting.png",
    },
    {
      title: "Plasma and Laser Cutting",
      description: "Reliable compressed air for plasma and laser cutting operations, ensuring clean and precise cuts.",
      requirements: ["Clean, dry air", "Stable pressure", "High purity (for laser)", "Consistent flow"],
      products: ["Oil-Free Compressors", "High Pressure Screw Compressors", "Nitrogen Generators"],
      benefits: ["Superior cut quality", "Increased cutting speed", "Reduced dross and slag"],
      icon: Wrench,
      image: "/metal-cutting.png",
    },
    {
      title: "Pneumatic Tools & Automation",
      description: "Consistent compressed air for various pneumatic tools and automated systems in fabrication.",
      requirements: ["Stable pressure", "Reliable supply", "Clean air", "Energy efficiency"],
      products: ["Variable Speed Drive Compressors", "Air Receiver Tanks", "Inline Filters"],
      benefits: ["Optimized tool performance", "Reduced energy consumption", "Enhanced automation efficiency"],
      icon: Factory,
      image: "/metal-pneumatic-tools.png",
    },
  ]

  // Case studies with real-world examples
  const caseStudies = [
    {
      company: "Precision Metalworks",
      challenge:
        "Precision Metalworks struggled with inconsistent machining accuracy and frequent tool wear on their CNC machines due to contaminated compressed air, impacting product quality and increasing operational costs.",
      solution:
        "We installed an advanced oil-free compressed air system with integrated precision filters, providing a continuous supply of clean, dry air to their CNC and VMC machinery.",
      results:
        "Precision Metalworks achieved a 15% improvement in machining accuracy, extended tool life by 25%, and reduced maintenance costs by 20%, leading to higher quality products and increased profitability.",
      savings: "20% maintenance cost reduction",
      image: "/metal-casestudy-1.png",
    },
    {
      company: "Surface Solutions Inc.",
      challenge:
        "Surface Solutions Inc. faced challenges with inefficient sandblasting operations and inconsistent surface finishes due to inadequate air pressure and moisture in their compressed air supply.",
      solution:
        "We implemented a high-pressure piston compressor system combined with a desiccant air dryer, ensuring a powerful and dry air supply for their sandblasting and shot peening processes.",
      results:
        "Surface Solutions Inc. saw a 30% increase in sandblasting efficiency, achieved more consistent and superior surface finishes, and reduced abrasive material consumption by 10%.",
      savings: "30% efficiency increase",
      image: "/metal-casestudy-2.png",
    },
  ]

  // Recommended products for automotive industry
  const recommendedProducts = [
    {
      name: "Oil-Free Rotary Screw Compressors",
      features: [
        "100% oil-free air for critical applications",
        "Ensures product purity and prevents contamination",
        "Energy-efficient operation",
        "Reduced maintenance costs",
      ],
      powerRange: "15 kW - 250 kW",
      image: "/oil-free-rotary-screw-compressor.png",
      href: "/products/oil-free-rotary-screw-compressors",
    },
    {
      name: "High Pressure Piston Compressors",
      features: [
        "Ideal for sandblasting and shot peening",
        "Robust and durable design",
        "High pressure capability",
        "Reliable performance in demanding environments",
      ],
      powerRange: "2.2 kW - 15 kW",
      image: "/high-pressure-piston-compressor.png",
      href: "/products/high-pressure-piston-compressors",
    },
    {
      name: "Refrigerated Air Dryers",
      features: [
        "Removes moisture from compressed air",
        "Prevents corrosion and damage to equipment",
        "Ensures product quality",
        "Low pressure drop",
      ],
      powerRange: "10 CFM - 2000 CFM",
      image: "/refrigerated-air-dryer.png",
      href: "/products/refrigerated-air-dryers",
    },
    {
      name: "Precision Filters",
      features: [
        "Removes particulates, oil aerosols, and vapors",
        "Ensures high air purity for sensitive applications",
        "Protects downstream equipment",
        "Minimizes pressure drop",
      ],
      powerRange: "Various flow rates",
      image: "/precision-filters.png",
      href: "/products/precision-filters",
    },
  ]

  // Industry statistics
  const industryStats = [
    {
      title: "Machining Accuracy Improvement",
      value: "15%",
      description: "Achieved with clean, dry compressed air for CNC and VMC machines.",
      icon: Wrench,
    },
    {
      title: "Tool Life Extension",
      value: "25%",
      description: "Resulting from reduced contamination and consistent air quality.",
      icon: Wrench,
    },
    {
      title: "Energy Cost Reduction",
      value: "30%",
      description: "Through optimized compressed air systems and VSD technology.",
      icon: Factory,
    },
    {
      title: "Surface Finish Consistency",
      value: "Improved",
      description: "Ensured by high-quality, dry air for sandblasting and cutting.",
      icon: Wrench,
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
            <span className="text-slate-900">Metal & Fabrication</span>
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
                  Metal & Fabrication Industry <span className="text-gradient">Air Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Powering metalworking and fabrication with reliable, efficient, and robust compressed air
                  systems. From CNC machinery to plasma cutting, SJ delivers the precision and reliability metal & fabrication
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
                  Get Metal & Fabrication Solution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/sj-process implement-metal fabrication-ind.jpg"
                alt="Metal & Fabrication with SJ Air Compressors"
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
            <Badge className="bg-red-100 text-red-600">Applications</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold heading-professional">
              Key Applications in the <span className="text-gradient">Metal & Fabrication Industry</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-professional">
              Sarv Jagat provides tailored compressed air solutions for a wide range of applications within the
              metal & fabrication sector, ensuring optimal performance and efficiency.
            </p>
          </div>

          <Tabs defaultValue="spray-painting" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-4 h-auto">
              {applications.map((app, index) => (
                <TabsTrigger key={index} value={app.title.toLowerCase().replace(/ /g, "-")} className="py-3">
                  {app.icon && <app.icon className="mr-2 h-5 w-5" />}
                  {app.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {applications.map((app, index) => (
              <TabsContent key={index} value={app.title.toLowerCase().replace(/ /g, "-")} className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 heading-professional">{app.title}</h3>
                    <p className="text-muted-foreground mb-6 text-professional">{app.description}</p>

                    <div className="space-y-4 mb-6">
                      <h4 className="font-semibold text-lg">Key Requirements:</h4>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {app.requirements.map((req, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Recommended Products:</h4>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {app.products.map((prod, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            {prod}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <img src={app.image} alt={app.title} className="rounded-lg shadow-lg" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-600">Success Stories</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold heading-professional">
              Metal & Fabrication Industry <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-professional">
              Discover how Sarv Jagat has helped leading metal & fabrication companies achieve their operational goals with our
              advanced compressed air solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">{study.company}</CardTitle>
                  <CardDescription className="text-muted-foreground">Challenge: {study.challenge}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Solution:</h4>
                  <p className="text-muted-foreground mb-4">{study.solution}</p>
                  <h4 className="font-semibold mb-2">Results:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {/* {study.results.map((result, i) => (
                      <li key={i}>{result}</li>
                    ))} */}
                  </ul>
                  {study.savings && (
                    <div className="mt-4 text-right font-bold text-green-600">Savings: {study.savings}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-100 text-green-600">Products</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold heading-professional">
              Recommended Products for <span className="text-gradient">Metal & Fabrication</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-professional">
              Explore our range of high-performance compressed air systems specifically designed to meet the rigorous
              demands of the metal & fabrication industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map((product, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">{product.name}</CardTitle>
                  {/* <CardDescription className="text-muted-foreground">{product.description}</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="font-semibold">Power Range:</span> {product.powerRange}
                  </div>
                  <Button asChild className="mt-6 w-full">
                    <Link href={product.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Optimize Your Metal & Fabrication Operations?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Contact Sarv Jagat today for a customized compressed air solution tailored to your specific needs.
          </p>
          <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-200">
            <Phone className="mr-2 h-5 w-5" /> Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}