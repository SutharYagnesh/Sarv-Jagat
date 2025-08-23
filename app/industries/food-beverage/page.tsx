import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Droplets, Shield, Award, Phone, Package } from "lucide-react"
import Link from "next/link"

export default function FoodBeveragePage() {
  const applications = [
    {
      title: "Food Processing & Packaging",
      description:
        "100% oil-free compressed air is essential for direct contact with food products, ensuring hygiene and preventing contamination in processing and packaging.",
      requirements: ["ISO 8573-1 Class 0 air", "Hygienic design", "Moisture-free", "Reliable supply"],
      products: ["Oil-Free Rotary Screw Compressors", "Oil-Free Scroll Compressors", "Sterile Filters"],
      benefits: ["Ensures food safety", "Maintains product integrity", "Meets regulatory standards"],
      icon: "/icons/food-processing.svg",
      image: "/applications/food-beverage/food-processing-packaging.jpg",
    },
    {
      title: "Beverage Production & Bottling",
      description:
        "High-quality compressed air is used for various stages in beverage production, including fermentation, carbonation, and bottle blowing.",
      requirements: ["Oil-free air", "Consistent pressure", "Dry air", "High purity"],
      products: ["High Pressure PET Compressors", "Oil-Free Piston Compressors", "Adsorption Dryers"],
      benefits: ["Optimizes bottling efficiency", "Ensures beverage quality", "Prevents contamination"],
      icon: "/icons/beverage-production.svg",
      image: "/applications/food-beverage/beverage-production-bottling.jpg",
    },
    {
      title: "Dairy & Brewing",
      description:
        "Clean and dry compressed air is vital for dairy processing, brewing, and fermentation, where product purity is paramount.",
      requirements: ["100% Oil-free air", "Sterile filtration", "Consistent dew point", "Reliable operation"],
      products: ["Oil-Free Rotary Screw Compressors", "Centrifugal Compressors", "Sterile Filters"],
      benefits: ["Prevents bacterial growth", "Ensures product purity", "Reduces spoilage"],
      icon: "/icons/dairy-brewing.svg",
      image: "/applications/food-beverage/dairy-brewing.jpg",
    },
    {
      title: "Pneumatic Conveying",
      description:
        "Used for safe and efficient transport of ingredients like sugar, flour, and grains in food and beverage manufacturing.",
      requirements: ["High volume air", "Contamination-free", "Energy efficient", "Low noise"],
      products: ["Low Pressure Blowers", "Rotary Screw Compressors", "Air Receivers"],
      benefits: ["Reduces manual handling", "Improves hygiene", "Increases operational efficiency"],
      icon: "/icons/conveying.svg",
      image: "/applications/food-beverage/pneumatic-conveying.jpg",
    },
  ]

  const standards = [
    {
      icon: Shield,
      title: "HACCP Compliance",
      description: "Hazard Analysis Critical Control Points compliant air systems",
    },
    {
      icon: Award,
      title: "FDA Approved",
      description: "Food and Drug Administration approved materials and designs",
    },
    {
      icon: Droplets,
      title: "Food Grade",
      description: "Food grade lubricants and materials for direct food contact",
    },
    {
      icon: Package,
      title: "Hygienic Design",
      description: "Easy-to-clean designs meeting food industry hygiene standards",
    },
  ]

  const caseStudies = [
    {
      company: "PureFoods Inc.",
      challenge:
        "PureFoods Inc., a leading organic food producer, faced challenges in maintaining consistent air purity for their sensitive processing lines, leading to potential contamination risks and compliance issues.",
      solution:
        "We implemented a state-of-the-art oil-free compressed air system, featuring multi-stage filtration and advanced moisture removal. This system was designed to meet ISO 8573-1 Class 0 air quality standards, ensuring 100% pure air for their production.",
      results:
        "PureFoods Inc. achieved full compliance with stringent food safety regulations, eliminated contamination risks, and significantly improved product shelf life. The new system also led to a 15% reduction in energy consumption due to optimized compressor efficiency.",
      savings: "20% reduction in product recalls and waste.",
      image: "/case-studies/food-beverage/purefoods-inc.jpg",
    },
    {
      company: "AquaVita Beverages",
      challenge:
        "AquaVita Beverages struggled with high energy costs and inconsistent air supply for their high-speed PET bottling lines, resulting in production bottlenecks and increased operational expenses.",
      solution:
        "We engineered a custom high-pressure PET compressor solution, incorporating energy-efficient variable speed drive technology and smart control systems. The installation included a robust air treatment package to ensure optimal air quality for bottling.",
      results:
        "AquaVita Beverages saw a remarkable 25% decrease in energy costs and a 10% increase in bottling line efficiency. The reliable air supply minimized downtime, allowing them to meet increased market demand and improve overall profitability.",
      savings: "$75,000 annual energy savings.",
      image: "/case-studies/food-beverage/aquavita-beverages.jpg",
    },
  ]

  const recommendedProducts = [
    {
      name: "Food-Grade Oil-Free Compressors",
      features: [
        "ISO 8573-1 Class 0 certified",
        "HACCP & FDA compliant",
        "Energy efficient VSD technology",
        "Hygienic stainless steel construction",
      ],
      powerRange: "7.5-350 HP",
      image: "/products/food-grade-compressors.jpg",
      href: "/products/food-grade-compressors",
    },
    {
      name: "High Pressure PET Bottle Blowers",
      features: [
        "Specialized for beverage bottling",
        "Precision pressure control",
        "Energy recovery systems",
        "Low maintenance design",
      ],
      powerRange: "15-500 HP",
      image: "/products/pet-bottle-blowers.jpg",
      href: "/products/pet-bottle-blowers",
    },
    {
      name: "Sterile Air Treatment Systems",
      features: [
        "Multi-stage filtration",
        "Bacterial removal 99.99%",
        "-70°F PDP for moisture control",
        "Automated monitoring",
      ],
      powerRange: "All capacities",
      image: "/products/sterile-air-systems.jpg",
      href: "/products/sterile-air-systems",
    },
    {
      name: "Dairy Processing Compressors",
      features: [
        "Specially designed for dairy applications",
        "Corrosion-resistant materials",
        "Easy cleaning access points",
        "Low noise operation",
      ],
      powerRange: "10-250 HP",
      image: "/products/dairy-processing-compressors.jpg",
      href: "/products/dairy-processing-compressors",
    },
  ]

  const industryStats = [
    {
      title: "Food Safety Compliance",
      value: "100%",
      description: "Achieve and maintain the highest food safety standards (HACCP, FDA, ISO 22000) with certified oil-free air.",
      icon: "/icons/compliance.svg",
    },
    {
      title: "Energy Cost Reduction",
      value: "Up to 30%",
      description: "Significant savings on operational costs through energy-efficient compressor technologies and optimized air systems.",
      icon: "/icons/energy-savings.svg",
    },
    {
      title: "Product Shelf Life Extension",
      value: "15%",
      description: "Extend the freshness and quality of perishable goods by preventing contamination from compressed air.",
      icon: "/icons/shelf-life.svg",
    },
    {
      title: "Production Uptime Improvement",
      value: "20%",
      description: "Minimize downtime and ensure continuous operation with reliable, robust, and low-maintenance air solutions.",
      icon: "/icons/uptime.svg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Food & Beverage Industry</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Food & Beverage
              <span className="block text-red-400">Compressed Air Solutions</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Food-grade compressed air systems designed for food processing, beverage production, and packaging
              applications with HACCP and FDA compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/products/oil-free">View Food Grade Systems</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Food Safety <span className="text-gradient">Standards</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our food and beverage compressed air systems meet the highest food safety standards and regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((standard, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <standard.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{standard.title}</CardTitle>
                  <CardDescription>{standard.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Food & Beverage <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive compressed air solutions for various food and beverage manufacturing processes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((application, index) => (
              <Card key={index} className="product-card card-hover">
                <CardHeader>
                  <CardTitle className="text-xl">{application.title}</CardTitle>
                  <CardDescription>{application.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Requirements:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {application.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-red-600" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {application.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Ensure Food Safety Compliance?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation on food-grade compressed air systems that meet all safety and quality standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Food Safety Consultation
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="/industries">View All Industries</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
