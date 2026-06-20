import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, CheckCircle, Shield, Clock, TrendingUp, Phone, Calendar, FileText } from "lucide-react"
import Link from "next/link"

// Annual Maintenance Contract (AMC) detailed page
export default function AMCPage() {
  // AMC packages with detailed features and pricing
  const amcPackages = [
    {
      name: "Basic AMC",
      description: "Essential maintenance for small compressor installations",
      price: "₹75,000 - ₹1,00,000",
      duration: "12 months",
      visits: "Quarterly (4 visits/year)",
      suitable: "1-10 HP compressors",
      features: [
        "Scheduled preventive maintenance",
        "Basic spare parts included",
        "Performance inspection",
        "Oil and filter changes",
        "Safety system checks",
        "Service reports",
        "Phone support during business hours",
        "Breakdown support (chargeable)",
      ],
      benefits: ["Reduced breakdown risk", "Extended equipment life", "Maintained efficiency", "Cost predictability"],
      color: "border-primary",
    },
    {
      name: "Premium AMC",
      description: "Comprehensive maintenance for medium to large installations",
      price: "₹1,50,000 - ₹2,50,000",
      duration: "12 months",
      visits: "Monthly (12 visits/year)",
      suitable: "10-100 HP compressors",
      popular: true,
      features: [
        "All Basic AMC features",
        "Monthly maintenance visits",
        "All consumables included",
        "Priority breakdown support",
        "24/7 technical helpline",
        "Energy efficiency monitoring",
        "Detailed analytics reports",
        "Performance optimization",
        "Predictive maintenance alerts",
        "Free breakdown repairs",
      ],
      benefits: ["Maximum uptime (99.5%+)", "Energy cost optimization", "Comprehensive coverage", "Peace of mind"],
      color: "border-secondary ring-2 ring-secondary",
    },
    {
      name: "Enterprise AMC",
      description: "Complete lifecycle support for large industrial installations",
      price: "Custom Pricing",
      duration: "12-36 months",
      visits: "Bi-weekly + On-demand",
      suitable: "100+ HP systems",
      features: [
        "All Premium AMC features",
        "Dedicated service engineer",
        "Bi-weekly maintenance visits",
        "All parts and consumables",
        "24/7 on-site support",
        "Performance guarantees",
        "Energy optimization programs",
        "Condition monitoring systems",
        "Customized service schedules",
        "Management reporting",
      ],
      benefits: ["Guaranteed performance", "Maximum ROI", "Complete peace of mind", "Strategic partnership"],
      color: "border-accent",
    },
  ]

  // AMC benefits and features
  const amcBenefits = [
    {
      title: "Maximized Uptime",
      description: "Preventive maintenance reduces unexpected breakdowns by up to 90%",
      icon: Clock,
      stat: "99.5%",
      statLabel: "Average Uptime",
    },
    {
      title: "Cost Savings",
      description: "Reduce total operating costs through optimized maintenance and energy efficiency",
      icon: TrendingUp,
      stat: "30%",
      statLabel: "Cost Reduction",
    },
    {
      title: "Extended Life",
      description: "Regular maintenance extends equipment life by 40-60%",
      icon: Shield,
      stat: "50%",
      statLabel: "Life Extension",
    },
    {
      title: "Performance Optimization",
      description: "Maintain peak efficiency and optimize energy consumption",
      icon: TrendingUp,
      stat: "15%",
      statLabel: "Energy Savings",
    },
  ]

  // What's included in AMC
  const amcIncludes = [
    {
      category: "Preventive Maintenance",
      items: [
        "Scheduled maintenance visits",
        "Oil and filter changes",
        "Belt tension adjustments",
        "Valve inspections",
        "Cooling system cleaning",
        "Safety system checks",
      ],
    },
    {
      category: "Parts & Consumables",
      items: [
        "Air filters",
        "Oil filters",
        "Separator elements",
        "Lubricating oils",
        "Gaskets and seals",
        "Minor spare parts",
      ],
    },
    {
      category: "Performance Monitoring",
      items: [
        "Pressure and temperature checks",
        "Vibration analysis",
        "Energy consumption monitoring",
        "Performance benchmarking",
        "Efficiency optimization",
        "Trend analysis",
      ],
    },
    {
      category: "Support Services",
      items: [
        "24/7 technical helpline",
        "Priority breakdown support",
        "Remote diagnostics",
        "Technical consultation",
        "Operator training",
        "Documentation updates",
      ],
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
            <Link href="/services" className="hover:text-red-600">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Annual Maintenance Contract</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-secondary text-secondary-foreground">Comprehensive Support</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold heading-professional">
                  Annual Maintenance <span className="text-gradient">Contract (AMC)</span>
                </h1>
                <p className="text-xl text-muted-foreground text-professional">
                  Ensure maximum uptime and optimal performance of your compressed air systems with our comprehensive
                  AMC packages. Preventive maintenance, genuine parts, and expert support - all in one contract.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">99.5%</div>
                  <div className="text-sm text-muted-foreground">Average Uptime</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">30%</div>
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-primary">
                  Get AMC Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/sj-annual-management-contracts-obj.png"
                alt="SJ Annual Maintenance Contract Service"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-xl">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMC Benefits */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold heading-professional">
              AMC <span className="text-gradient">Benefits</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Comprehensive maintenance contracts deliver measurable benefits for your operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amcBenefits.map((benefit, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <div className="text-3xl font-bold text-secondary">{benefit.stat}</div>
                  <div className="text-sm text-muted-foreground">{benefit.statLabel}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-professional">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              Choose Your <span className="text-gradient">AMC Package</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Select the right maintenance contract based on your compressor size and operational requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {amcPackages.map((pkg, index) => (
              <Card key={index} className={`card-hover ${pkg.color} ${pkg.popular ? "relative" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground px-4 py-2">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="space-y-4">
                  <CardTitle className="text-2xl text-center">{pkg.name}</CardTitle>
                  <CardDescription className="text-professional text-center">{pkg.description}</CardDescription>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>

                  {/* Package Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold">{pkg.duration}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Visits</div>
                      <div className="font-semibold">{pkg.visits}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Suitable for</div>
                    <div className="font-semibold text-primary">{pkg.suitable}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="font-semibold">Features Included:</div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="font-semibold">Key Benefits:</div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className={`w-full ${pkg.popular ? "btn-primary" : "border-t-cyan-600"}`}>
                    Get {pkg.name} Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 industrial-section">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold heading-professional">
              What's <span className="text-gradient">Included</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-professional">
              Comprehensive maintenance coverage for all aspects of your compressed air system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amcIncludes.map((category, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle className="text-xl text-center">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-professional">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Inquiry Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold heading-professional">
                Get Your <span className="text-gradient">AMC Quote</span>
              </h2>
              <p className="text-xl text-muted-foreground text-professional">
                Fill out the form below and our service experts will provide you with a customized AMC proposal.
              </p>
            </div>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-center">AMC Inquiry Form</CardTitle>
                <CardDescription className="text-center">
                  Get a customized maintenance contract proposal for your compressed air systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person *</Label>
                    <Input id="contact" placeholder="Enter contact person name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compressor-type">Compressor Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compressor type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="screw">Screw Compressor</SelectItem>
                        <SelectItem value="piston">Piston Compressor</SelectItem>
                        <SelectItem value="oil-free">Oil-Free Compressor</SelectItem>
                        <SelectItem value="multiple">Multiple Types</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="power">Power Rating</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select power range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10hp">1-10 HP</SelectItem>
                        <SelectItem value="10-50hp">10-50 HP</SelectItem>
                        <SelectItem value="50-100hp">50-100 HP</SelectItem>
                        <SelectItem value="100hp+">100+ HP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package">Preferred AMC Package</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AMC package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic AMC</SelectItem>
                        <SelectItem value="premium">Premium AMC</SelectItem>
                        <SelectItem value="enterprise">Enterprise AMC</SelectItem>
                        <SelectItem value="custom">Custom Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Additional Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Please describe your specific maintenance requirements, current issues, or any special considerations..."
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="btn-primary flex-1">
                    <FileText className="mr-2 h-5 w-5" />
                    Get AMC Proposal
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                    <Phone className="mr-2 h-5 w-5" />
                    Call for Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold heading-professional">Ready to Maximize Your Equipment Uptime?</h2>
            <p className="text-xl text-white/90 text-professional">
              Join thousands of satisfied customers who trust SJ AMC services for their compressed air systems. Get
              started with a comprehensive maintenance contract today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-secondary">
                <Phone className="mr-2 h-5 w-5" />
                Call AMC Team: +91-9876543210
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
              >
                Download AMC Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
