import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Factory, Wrench, Mountain, Clock, Rocket, DollarSign } from "lucide-react"
import Link from "next/link"

// Construction & Infrastructure industry specific page with detailed applications and solutions
export default function ConstructionPage() {
  // Construction & Infrastructure applications based on product descriptions
  const applications = [
    {
      title: "Heavy Equipment Operation",
      description:
        "Reliable compressed air for operating heavy machinery, pneumatic tools, and construction equipment on-site.",
      requirements: ["High pressure", "High flow rate", "Durability", "Portability"],
      products: ["Portable Diesel Compressors", "High Pressure Piston Compressors", "Air Receiver Tanks"],
      benefits: ["Consistent power for tools", "Reduced downtime", "Enhanced operational efficiency"],
      icon: Wrench,
      image: "/construction-heavy-equipment.png",
    },
    {
      title: "Concrete Batching & Mixing",
      description: "Precise compressed air for automated concrete batching plants, ensuring consistent mix quality.",
      requirements: ["Clean, dry air", "Stable pressure", "Continuous operation", "Automation compatibility"],
      products: ["Fixed Speed Screw Compressors", "Refrigerated Air Dryers", "Inline Filters"],
      benefits: ["Accurate material proportioning", "Improved concrete quality", "Reduced waste"],
      icon: Factory,
      image: "/construction-concrete-mixing.png",
    },
    {
      title: "Road Construction & Paving",
      description: "Robust compressed air for road rollers, asphalt pavers, and pneumatic road breaking tools.",
      requirements: ["High impact power", "Reliability in harsh conditions", "Fuel efficiency", "Low maintenance"],
      products: ["Portable Diesel Compressors", "High Pressure Compressors", "Air Tools"],
      benefits: ["Faster project completion", "Durable equipment performance", "Cost-effective operation"],
      icon: Mountain,
      image: "/construction-road-paving.png",
    },
    {
      title: "Tunneling & Mining Support",
      description: "Powerful compressed air for drilling, ventilation, and material handling in tunneling and mining.",
      requirements: ["Extreme pressure", "High volume", "Safety features", "Remote operation"],
      products: ["High Pressure Screw Compressors", "Booster Compressors", "Specialized Air Treatment"],
      benefits: ["Efficient excavation", "Improved air quality in confined spaces", "Enhanced safety"],
      icon: Mountain,
      image: "/construction-tunneling.png",
    },
  ]

  // Case studies with real-world examples
  const caseStudies = [
    {
      company: "MegaBuild Construction",
      challenge:
        "MegaBuild Construction faced frequent breakdowns of their pneumatic tools and heavy equipment on remote construction sites due to unreliable and contaminated compressed air supply, leading to project delays and increased maintenance costs.",
      solution:
        "We deployed a fleet of robust portable diesel compressors with integrated air treatment systems, ensuring a consistent supply of clean, dry air even in harsh outdoor conditions.",
      results:
        "MegaBuild Construction reduced equipment downtime by 30%, improved project completion times by 15%, and significantly lowered their operational expenses by extending the lifespan of their tools.",
      savings: "30% equipment downtime reduction",
      image: "/construction-casestudy-1.png",
    },
    {
      company: "Urban Infrastructure Developers",
      challenge:
        "Urban Infrastructure Developers struggled with inconsistent concrete quality and increased material waste in their batching plants due to fluctuating air pressure and moisture in their compressed air system.",
      solution:
        "We installed a centralized fixed-speed screw compressor system with advanced refrigerated air dryers and precision filters, providing stable and clean air for their automated batching processes.",
      results:
        "Urban Infrastructure Developers achieved a 20% improvement in concrete consistency, reduced material waste by 10%, and enhanced overall plant efficiency, leading to higher quality structures and cost savings.",
      savings: "20% concrete consistency improvement",
      image: "/construction-casestudy-2.png",
    },
  ]

  // Recommended products for Construction & Infrastructure industry
  const recommendedProducts = [
    {
      name: "Portable Diesel Compressors",
      features: [
        "Designed for rugged construction environments",
        "High mobility and easy transport",
        "Reliable power for pneumatic tools and equipment",
        "Fuel-efficient operation",
      ],
      powerRange: "50 CFM - 1600 CFM",
      image: "/portable-diesel-compressor.png",
      href: "/products/portable-diesel-compressors",
    },
    {
      name: "High Pressure Piston Compressors",
      features: [
        "Ideal for heavy-duty applications like road breaking and drilling",
        "Robust and durable construction",
        "High pressure capability for demanding tasks",
        "Long service life",
      ],
      powerRange: "2.2 kW - 15 kW",
      image: "/high-pressure-piston-compressor.png",
      href: "/products/high-pressure-piston-compressors",
    },
    {
      name: "Refrigerated Air Dryers",
      features: [
        "Removes moisture from compressed air",
        "Prevents corrosion and damage to pneumatic equipment",
        "Ensures consistent air quality for sensitive processes",
        "Low pressure drop",
      ],
      powerRange: "10 CFM - 2000 CFM",
      image: "/refrigerated-air-dryer.png",
      href: "/products/refrigerated-air-dryers",
    },
    {
      name: "Air Receivers",
      features: [
        "Stores compressed air to meet peak demands",
        "Stabilizes air pressure and reduces compressor cycling",
        "Available in various sizes to suit project needs",
        "Enhances system efficiency and longevity",
      ],
      powerRange: "300 L - 10,000 L",
      image: "/air-receiver.png",
      href: "/products/air-receivers",
    },
  ]

  const industryStats = [
    {
      "title": "Equipment Uptime Improvement",
      "value": "30%",
      "description": "Achieved through reliable and clean compressed air supply on construction sites.",
      "icon": "Clock"
    },
    {
      "title": "Project Completion Time Reduction",
      "value": "15%",
      "description": "Resulting from efficient heavy equipment operation and pneumatic tool performance.",
      "icon": "Rocket"
    },
    {
      "title": "Concrete Consistency Improvement",
      "value": "20%",
      "description": "Ensured by stable and precise compressed air for batching plants.",
      "icon": "Factory"
    },
    {
      "title": "Operational Cost Savings",
      "value": "25%",
      "description": "Through extended tool lifespan and reduced maintenance due to clean air.",
      "icon": "DollarSign"
    }
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
            <span className="text-slate-900">Construction & Infrastructure</span>
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
                  Construction & Infrastructure Industry <span className="text-gradient">Air Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  The construction and infrastructure industry is the backbone of modern development, constantly building and expanding the world around us. At Sarv-Jagat, we understand the unique demands of this dynamic sector, from heavy-duty equipment operation to precise material handling. Our compressed air solutions are engineered to meet the diverse needs of construction and infrastructure projects, ensuring efficiency, reliability, and robust performance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Construction & Infrastructure Companies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">35%</div>
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get Construction & Infrastructure Solution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/sj-ind-civil-infrastructure.jpg"
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
              Construction & Infrastructure <span className="text-gradient">Applications</span>
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
              Construction & Infrastructure Case Studies
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
              Recommended Construction & Infrastructure Products
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
