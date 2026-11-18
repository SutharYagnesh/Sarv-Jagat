import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Factory,Package, Wrench, Car, Paintbrush, Phone } from "lucide-react"
import Link from "next/link"
import ExploreProductsSection from "@/components/sections/explore-products"

export const revalidate = 3600;

export const metadata = {
  title: "Plastic & PET Bottle Blow Molding Air Compressors | Sarv Jagat - SJ",
  description: "High-pressure 40 bar oil-free PET bottle blowing compressors, injection molding systems, and extrusion compressed air solutions by Sarv Jagat - SJ.",
  alternates: {
    canonical: "https://www.sarvjagat.com/industries/plastic-pet",
  },
  openGraph: {
    title: "Plastic & PET Bottle Blow Molding Air Compressors | Sarv Jagat - SJ",
    description: "High-pressure 40 bar compressed air solutions for PET bottle blowing by Sarv Jagat - SJ.",
    url: "https://www.sarvjagat.com/industries/plastic-pet",
    siteName: "Sarv Jagat - SJ",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png", width: 1200, height: 630, alt: "Plastic PET Blow Molding Compressors - Sarv Jagat - SJ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plastic & PET Bottle Blow Molding Air Compressors | Sarv Jagat - SJ",
    description: "High-pressure compressed air systems for PET bottle blowing by Sarv Jagat - SJ.",
    images: ["https://www.sarvjagat.com/Sarv%20Jagat_Logo_Red_11.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

// Plastic industry specific page with detailed applications and solutions
export default async function PlasticPetPage() {
  // Plastic applications based on product descriptions
  const applications = [
    {
      title: "PET Bottle Blowing",
      description: "Providing ultra-high pressure, oil-free Pet for the precise and efficient blowing of PET bottles.",
      requirements: [
        "Ultra-high pressure (up to 40 bar)",
        "100% oil-free Pet (Class 0)",
        "Consistent flow and pressure stability",
      ],
      products: [
        "High Pressure PET Compressors",
        "Booster Compressors",
        "High Pressure Pet Dryers",
      ],
      benefits: [
        "Flawless bottle quality",
        "Increased production speed",
        "Reduced energy consumption",
      ],
      icon: Factory,
      image: "/sj-ind-pet-water-bottle-production.jpg",
    },
    {
      title: "Plastic Molding & Injection",
      description: "Supplying clean, dry compressed Pet for injection molding machines, ensuring product integrity and machine longevity.",
      requirements: [
        "Clean, dry Pet",
        "Stable pressure",
        "Energy efficiency",
      ],
      products: [
        "Oil-Free Rotary Screw Compressors",
        "Refrigerated Pet Dryers",
        "Precision Filters",
      ],
      benefits: [
        "Improved product finish",
        "Reduced mold wear",
        "Lower operational costs",
      ],
      icon: Factory,
      image: "/sj-ind-pet-water-bottle-production.jpg",
    },
    {
      title: "Pneumatic Conveying",
      description: "Utilizing compressed Pet for efficient and contamination-free transport of plastic pellets and raw materials.",
      requirements: [
        "Reliable Pet supply",
        "Consistent pressure",
        "Minimal moisture content",
      ],
      products: [
        "Low Pressure Rotary Screw Compressors",
        "Blower Systems",
        "Pet Receivers",
      ],
      benefits: [
        "Efficient material handling",
        "Prevention of material contamination",
        "Reduced manual labor",
      ],
      icon: Package,
      image: "/sj-ind-pet-water-bottle-production.jpg",
    },
    {
      title: "Recycling & Reprocessing",
      description: "Providing compressed Pet for sorting, cleaning, and shredding processes in plastic recycling facilities.",
      requirements: [
        "Durable compressors",
        "Energy-efficient operation",
        "Ability to handle dusty environments",
      ],
      products: [
        "Heavy-Duty Rotary Screw Compressors",
        "Cyclone Separators",
        "Industrial Filters",
      ],
      benefits: [
        "Optimized recycling efficiency",
        "Reduced waste",
        "Sustainable operations",
      ],
      icon: Factory,
      image: "/sj-ind-pet-water-bottle-production.jpg",
    },
  ]

  // Case studies with real-world examples
  const caseStudies = [
    {
      company: "BottleBlow Innovations",
      challenge: "High energy consumption and inconsistent bottle quality due to outdated compressed Pet systems.",
      solution: "Implemented SJ's high-pressure PET compressors with energy recovery systems.",
      results: "Reduced energy costs by 35%, improved bottle consistency by 20%, and increased production speed.",
      savings: "₹2.0 Crore annually",
      image: "/sj-ind-pet-water-bottle-production.jpg",
    },
    {
      company: "PolyMolding Solutions",
      challenge: "Moisture and oil in compressed Pet causing defects in plastic molded products and frequent machine breakdowns.",
      solution: "Installed SJ's oil-free rotary screw compressors with advanced Pet treatment systems.",
      results: "Achieved 99% reduction in product defects, extended mold lifespan by 25%, and reduced maintenance costs.",
      savings: "₹1.0 Crore annually",
      image: "/sj-ind-pet-water-bottle-production.jpg",
    },
  ]

  // Recommended products for Plastic industry
  const recommendedProducts = [
    {
      name: "High Pressure PET Compressors",
      features: [
        "Specifically designed for PET bottle blowing applications",
        "Delivers ultra-high pressure oil-free Pet",
        "Energy-efficient and reliable for continuous operation",
        "Available in various capacities to match production needs",
      ],
      powerRange: "15 kW - 400 kW",
      image: "/SJ_COM_MULTISTAGE_AIR-WATER COOLED_1.jpg",
      href: "/products/high-pressure-pet-compressors",
    },
    {
      name: "Oil-Free Rotary Screw Compressors",
      features: [
        "Provides 100% oil-free Pet for sensitive plastic molding processes",
        "Ensures product purity and prevents contamination",
        "Low maintenance and environmentally friendly",
        "Energy-efficient operation for reduced costs",
      ],
      powerRange: "15 kW - 250 kW",
      image: "/sj-p-screw.jpg",
      href: "/products/oil-free-rotary-screw-compressors",
    },
    {
      name: "High Pressure Pet Dryers",
      features: [
        "Removes moisture from high-pressure Pet for PET blowing",
        "Prevents condensation and ensures bottle clarity",
        "Designed for demanding industrial environments",
        "Available in various types including desiccant and refrigerated",
      ],
      powerRange: "10 CFM - 5000 CFM",
      image: "/sj-filter.png",
      href: "/products/high-pressure-Pet-dryers",
    },
    {
      name: "Pet Receivers",
      features: [
        "Stores compressed Pet to meet peak demands",
        "Stabilizes pressure for consistent production",
        "Reduces compressor cycling and extends lifespan",
        "Available in various sizes and pressure ratings",
      ],
      powerRange: "300 L - 10,000 L",
      image: "/sj-p-screw.jpg",
      href: "/products/Pet-receivers",
    },
  ]

  // Industry statistics
  const industryStats = [
    {
      title: "Energy Cost Reduction",
      value: "35%",
      description: "Achieved by optimizing high-pressure Pet systems for PET blowing.",
      icon: Wrench,
    },
    {
      title: "Bottle Quality Improvement",
      value: "20%",
      description: "Through consistent and oil-free compressed Pet supply.",
      icon: CheckCircle,
    },
    {
      title: "Production Speed Increase",
      value: "15%",
      description: "Due to reliable high-pressure Pet and reduced downtime.",
      icon: Factory,
    },
    {
      title: "Maintenance Cost Savings",
      value: "25%",
      description: "Resulting from extended equipment lifespan with clean, dry Pet.",
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
            <span className="text-slate-900">Plastic</span>
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
                  Plastic Industry <span className="text-gradient">Pet Solutions</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Powering plastic manufacturing with reliable, efficient, and contamination-free compressed pet
                  systems. From paint booths to assembly lines, SJ delivers the precision and reliability Plastic
                  industry demands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Plastic Companies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">35%</div>
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get Plastic Solution
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Download Case Studies
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/sj-ind-pet-water-bottle-production.jpg"
                alt="Plastic & PET Bottle Manufacturing with SJ Pet Compressors"
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
              Plastic <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Comprehensive compressed Pet solutions for every aspect of Plastic manufacturing and service
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
              Real results from Plastic companies that chose SJ compressed Pet solutions.
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

      {/* Explore our Products Section (6 Random Products) */}
      <ExploreProductsSection />

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold heading-professional">Ready to Optimize Your Plastic Operations?</h2>
            <p className="text-xl text-white/90 text-professional">
              Get specialized consultation for your Plastic compressed Pet requirements. Our experts will design the
              perfect solution for your specific applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                <Phone className="mr-2 h-5 w-5" />
                Get Plastic Consultation
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
