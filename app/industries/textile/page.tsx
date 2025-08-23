import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Wind, Zap, Award, Phone, Settings } from "lucide-react"
import Link from "next/link"

export default function TextilePage() {
  const applications = [
    {
      title: "Air Jet Looms",
      description:
        "High-pressure, clean, and dry compressed air is essential for the efficient operation of air jet looms, ensuring high weaving speeds and fabric quality.",
      requirements: ["High pressure", "Oil-free air", "Dry air", "Consistent flow"],
      products: ["High Pressure Compressors", "Adsorption Dryers", "Precision Filters"],
      benefits: ["Increased weaving speed", "Reduced fabric defects", "Lower maintenance for looms"],
      icon: "/icons/loom.svg",
      image: "/applications/textile/air-jet-looms.jpg",
    },
    {
      title: "Spinning & Texturizing",
      description:
        "Compressed air is used in various spinning processes, including open-end spinning and texturizing, to create high-quality yarns.",
      requirements: ["Stable pressure", "Clean air", "Energy efficiency", "Reliability"],
      products: ["Rotary Screw Compressors", "Refrigerated Air Dryers", "Line Filters"],
      benefits: ["Improved yarn quality", "Reduced energy consumption", "Consistent production"],
      icon: "/icons/spinning.svg",
      image: "/applications/textile/spinning-texturizing.jpg",
    },
    {
      title: "Dyeing & Finishing",
      description:
        "Clean and oil-free compressed air is critical for various dyeing, printing, and finishing processes to ensure color consistency and fabric quality.",
      requirements: ["Oil-free air", "Dry air", "Precise pressure control", "Contamination-free"],
      products: ["Oil-Free Scroll Compressors", "Membrane Dryers", "Sterile Filters"],
      benefits: ["Flawless color application", "Prevention of fabric stains", "Enhanced product appeal"],
      icon: "/icons/dyeing.svg",
      image: "/applications/textile/dyeing-finishing.jpg",
    },
    {
      title: "Pneumatic Conveying",
      description:
        "Used for transporting raw materials like cotton, synthetic fibers, and finished products within the textile mill.",
      requirements: ["High volume air", "Reliable operation", "Energy efficiency", "Low noise"],
      products: ["Centrifugal Compressors", "Low Pressure Blowers", "Air Receivers"],
      benefits: ["Efficient material handling", "Reduced labor costs", "Improved plant cleanliness"],
      icon: "/icons/conveying.svg",
      image: "/applications/textile/pneumatic-conveying.jpg",
    },
  ]

  const caseStudies = [
    {
      company: "WeaveMaster Textiles",
      challenge: "Frequent breakdowns of air jet looms due to inconsistent air quality and pressure.",
      solution: "Installed SJ High Pressure Compressors with advanced filtration and adsorption dryers, ensuring stable and clean air supply.",
      results: "Reduced loom downtime by 40% and improved fabric quality, leading to a 15% increase in production efficiency.",
      savings: "Annual savings of ₹12 Lakhs from reduced maintenance and increased output.",
      image: "/case-studies/textile-weavemaster.jpg",
    },
    {
      company: "DyeTech Solutions",
      challenge: "Oil contamination in compressed air causing defects and color inconsistencies in dyed fabrics.",
      solution: "Implemented SJ 100% Oil-Free Compressors and sterile filters for all dyeing and finishing processes.",
      results: "Eliminated fabric contamination, resulting in zero defects related to air quality and a 20% improvement in color consistency.",
      savings: "Saved ₹8 Lakhs annually in reduced rework and material waste.",
      image: "/case-studies/textile-dyetech.jpg",
    },
  ];

  const benefits = [
    {
      icon: Wind,
      title: "High Air Flow",
      description: "High volume air supply for demanding textile manufacturing processes",
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      description: "Energy-efficient compressors to reduce operational costs in textile production",
    },
    {
      icon: Settings,
      title: "Process Integration",
      description: "Seamless integration with textile machinery and production systems",
    },
    {
      icon: Award,
      title: "Proven Reliability",
      description: "Reliable compressed air systems trusted by textile manufacturers worldwide",
    },
  ]

  const recommendedProducts = [
    {
      name: "High Pressure Compressors",
      description: "Essential for air jet looms, providing the high pressure and consistent flow required for efficient weaving.",
      features: ["Up to 40 bar pressure", "Energy-efficient", "Reliable operation"],
      powerRange: "15-75 HP",
      image: "/products/high-pressure-compressor.png",
      href: "/products/high-pressure-compressors",
    },
    {
      name: "Oil-Free Rotary Screw Compressors",
      description: "Delivers 100% oil-free air, crucial for preventing contamination in dyeing, finishing, and spinning processes.",
      features: ["ISO 8573-1 Class 0 certified", "Low maintenance", "Quiet operation"],
      powerRange: "15-300 HP",
      image: "/products/oil-free-rotary-screw-compressor.png",
      href: "/products/oil-free-compressors",
    },
    {
      name: "Adsorption Dryers",
      description: "Ensures ultra-dry air with very low dew points, vital for preventing moisture-related issues in textile production.",
      features: ["Pressure dew point -40°C to -70°C", "Energy saving options", "Compact design"],
      powerRange: "Various",
      image: "/products/adsorption-dryer.png",
      href: "/products/air-dryers",
    },
    {
      name: "Centrifugal Compressors",
      description: "Provides large volumes of oil-free air for major textile mills and pneumatic conveying systems.",
      features: ["High flow rates", "Exceptional efficiency", "Minimal vibration"],
      powerRange: "200-2000 HP",
      image: "/products/centrifugal-compressor.png",
      href: "/products/centrifugal-compressors",
    },
  ];

  const industryStats = [
    {
      metric: "Production Efficiency Increase",
      value: "15%+",
      description: "Through optimized air supply for looms and spinning machines",
      icon: "/icons/efficiency.svg",
    },
    {
      metric: "Energy Cost Reduction",
      value: "25%+",
      description: "With energy-efficient compressors and smart controls",
      icon: "/icons/energy-savings.svg",
    },
    {
      metric: "Fabric Quality Improvement",
      value: "20%+",
      description: "By ensuring oil-free and dry air for dyeing and finishing",
      icon: "/icons/quality.svg",
    },
    {
      metric: "Downtime Reduction",
      value: "30%+",
      description: "Due to reliable compressed air systems and proactive maintenance",
      icon: "/icons/downtime.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-red-600 text-white">Textile Industry</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Textile Manufacturing
              <span className="block text-red-400">Compressed Air Solutions</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Specialized compressed air systems for textile manufacturing including weaving, spinning, dyeing, and
              finishing operations with reliable, high-volume air supply.
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
                <Link href="/products/screw">View Screw Compressors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
  

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Textile Industry <span className="text-gradient">Benefits</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the advantages of our compressed air solutions specifically designed for textile manufacturing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
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
              Textile <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive compressed air solutions for various textile manufacturing processes and operations.
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
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Optimize Your Textile Production?</h2>
            <p className="text-xl text-white/90">
              Get expert consultation on compressed air systems designed specifically for textile manufacturing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">
                  Get Textile Consultation
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
