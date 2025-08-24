"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Search,
  Filter,
  Users,
  Award,
  Handshake,
  Building2,
  Star,
  CheckCircle,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
export default function DealersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  // Dealer data
  const dealers = [
    {
      id: 1,
      name: "Mumbai Industrial Solutions",
      type: "Authorized Dealer",
      rating: 4.8,
      address: "Industrial Estate, Andheri East, Mumbai - 400069",
      city: "Mumbai",
      state: "Maharashtra",
      // phone: "+91 22 2821 4567",
      // email: "info@mumbaiindustrial.com",
      website: "www.mumbaiindustrial.com",
      specialties: ["Screw Compressors", "Service & Maintenance", "Spare Parts"],
      established: "2010",
      experience: "14+ years",
      serviceArea: "Mumbai, Thane, Navi Mumbai",
    },
    {
      id: 2,
      name: "Delhi Compressor Hub",
      type: "Premium Partner",
      rating: 4.9,
      address: " Industrial Area, Phase-II, Noida - 201305",
      city: "Delhi",
      state: "Delhi",
      // phone: "+91 11 4567 8901",
      // email: "sales@delhicompressor.com",
      website: "www.delhicompressor.com",
      specialties: ["All Products", "Custom Solutions", "Energy Audits"],
      established: "2008",
      experience: "16+ years",
      serviceArea: "Delhi NCR, Gurgaon, Faridabad",
    },
    {
      id: 3,
      name: "Bangalore Air Systems",
      type: "Authorized Dealer",
      rating: 4.7,
      address: "Industrial Layout, Peenya, Bangalore - 560058",
      city: "Bangalore",
      state: "Karnataka",
      // phone: "+91 80 2839 5678",
      // email: "contact@bangaloreair.com",
      website: "www.bangaloreair.com",
      specialties: ["Reciprocating Compressors", "Oil-Free Solutions", "AMC Services"],
      established: "2012",
      experience: "12+ years",
      serviceArea: "Bangalore, Mysore, Hubli",
    },
    {
      id: 4,
      name: "Chennai Pneumatic Solutions",
      type: "Service Partner",
      rating: 4.6,
      address: " Industrial Estate, Ambattur, Chennai - 600058",
      city: "Chennai",
      state: "Tamil Nadu",
      // phone: "+91 44 2674 5890",
      // email: "info@chennaipneumatic.com",
      website: "www.chennaipneumatic.com",
      specialties: ["Service & Repair", "Spare Parts", "Maintenance"],
      established: "2015",
      experience: "9+ years",
      serviceArea: "Chennai, Coimbatore, Madurai",
    },
    {
      id: 5,
      name: "Pune Industrial Equipment",
      type: "Premium Partner",
      rating: 4.9,
      address: "Industrial Area, Pimpri-Chinchwad, Pune - 411018",
      city: "Pune",
      state: "Maharashtra",
      // phone: "+91 20 2742 8901",
      // email: "sales@puneindustrial.com",
      website: "www.puneindustrial.com",
      specialties: ["All Products", "Technical Consultation", "Training"],
      established: "2005",
      experience: "19+ years",
      serviceArea: "Pune, Nashik, Aurangabad",
    },
    {
      id: 6,
      name: "Hyderabad Compressor Center",
      type: "Authorized Dealer",
      rating: 4.5,
      address: "Industrial Area, Kukatpally, Hyderabad - 500072",
      city: "Hyderabad",
      state: "Telangana",
      // phone: "+91 40 2345 6789",
      // email: "info@hyderabadcompressor.com",
      website: "www.hyderabadcompressor.com",
      specialties: ["Screw Compressors", "Accessories", "Installation"],
      established: "2013",
      experience: "11+ years",
      serviceArea: "Hyderabad, Warangal, Vijayawada",
    },
  ]

  // States and cities data
  const statesAndCities = {
    Maharashtra: ["Mumbai", "Pune", "Nashik", "Aurangabad", "Nagpur"],
    Delhi: ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad"],
    Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tirupur"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  }

  // Filter dealers based on search criteria
  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      searchQuery === "" ||
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.state.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesState = selectedState === "" || dealer.state === selectedState
    const matchesCity = selectedCity === "" || dealer.city === selectedCity

    return matchesSearch && matchesState && matchesCity
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dealer <span className="text-red-400">Network</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Find authorized Sarv Jagat dealers and service centers across India. Get expert support, genuine parts,
              and professional service from our trusted partners.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                <span>200+ Dealers</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-400" />
                <span>Pan-India Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-red-400" />
                <span>Certified Partners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="partnership" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="partnership">Become a Partner</TabsTrigger>
              <TabsTrigger value="network">Our Network</TabsTrigger>
              <TabsTrigger value="locator">Dealer Locator</TabsTrigger>
            </TabsList>

            {/* Dealer Locator Tab */}
            <TabsContent value="locator" className="space-y-8">
              {/* Search and Filter Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="h-6 w-6 text-blue-600" />
                    Find a Dealer Near You
                  </CardTitle>
                  <CardDescription>Search for authorized dealers and service centers in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="search">Search</Label>
                      <Input
                        id="search"
                        placeholder="Enter city, dealer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="allStates">All States</SelectItem>
                          {Object.keys(statesAndCities).map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        {/* <SelectContent>
                          <SelectItem value="allCities">All Cities</SelectItem>
                          {selectedState &&
                            statesAndCities[selectedState]?.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                        </SelectContent> */}
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Search Results ({filteredDealers.length} dealers found)</h3>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {filteredDealers.map((dealer) => (
                    <Card key={dealer.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{dealer.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant={dealer.type === "Premium Partner" ? "default" : "secondary"}
                                className={dealer.type === "Premium Partner" ? "bg-gold text-white" : ""}
                              >
                                {dealer.type}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{dealer.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                          <div>
                            <p className="text-gray-700">{dealer.address}</p>
                            <p className="text-sm text-gray-500">
                              {dealer.city}, {dealer.state}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {/* <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{dealer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{dealer.email}</span>
                          </div> */}
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <span>{dealer.website}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span>Est. {dealer.established}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {dealer.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">
                            <strong>Service Area:</strong> {dealer.serviceArea}
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <MapPin className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Network Overview Tab */}
            <TabsContent value="network" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Our Dealer Network</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Comprehensive coverage across India with certified partners providing expert service and support
                </p>
              </div>

              {/* Network Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                    <div className="text-gray-600">Authorized Dealers</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">28</div>
                    <div className="text-gray-600">States Covered</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                    <div className="text-gray-600">Cities Served</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-gray-600">Support Available</div>
                  </CardContent>
                </Card>
              </div>

              {/* Partner Types */}
              <div>
                <h4 className="text-2xl font-bold text-center mb-8">Partner Categories</h4>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Award className="h-12 w-12 text-gold mb-4" />
                      <CardTitle className="text-xl">Premium Partners</CardTitle>
                      <CardDescription>
                        Elite dealers with comprehensive product range and advanced technical capabilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Full product portfolio
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Custom solution design
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Energy audit services
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Advanced technical training
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Handshake className="h-12 w-12 text-blue-600 mb-4" />
                      <CardTitle className="text-xl">Authorized Dealers</CardTitle>
                      <CardDescription>
                        Certified dealers providing sales, installation, and basic service support
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Core product range
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Installation services
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Basic maintenance
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Spare parts supply
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Users className="h-12 w-12 text-green-600 mb-4" />
                      <CardTitle className="text-xl">Service Partners</CardTitle>
                      <CardDescription>
                        Specialized service centers focusing on maintenance, repair, and technical support
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Expert repair services
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          AMC management
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Emergency support
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Genuine spare parts
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Regional Coverage */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Regional Coverage</CardTitle>
                  <CardDescription className="text-center">
                    Our dealer network spans across all major industrial regions in India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { region: "North India", states: "Delhi, Punjab, Haryana, UP, Rajasthan", dealers: "45+" },
                      { region: "West India", states: "Maharashtra, Gujarat, MP, Goa", dealers: "60+" },
                      {
                        region: "South India",
                        states: "Karnataka, Tamil Nadu, Andhra Pradesh, Kerala",
                        dealers: "55+",
                      },
                      { region: "East India", states: "West Bengal, Odisha, Jharkhand, Bihar", dealers: "40+" },
                    ].map((region, index) => (
                      <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-semibold text-lg mb-2 text-blue-800">{region.region}</h5>
                        <p className="text-sm text-gray-600 mb-3">{region.states}</p>
                        <div className="text-2xl font-bold text-blue-600">{region.dealers}</div>
                        <div className="text-sm text-gray-500">Dealers</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Partnership Tab */}
            <TabsContent value="partnership" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Become a Sarv Jagat Partner</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join India's leading compressed air solutions network and grow your business with our support
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Partnership Benefits */}
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Why Partner with Us?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        {
                          icon: <Target className="h-6 w-6 text-blue-600" />,
                          title: "Market Leadership",
                          description:
                            "Associate with India's trusted compressed air solutions brand with 25+ years of excellence",
                        },
                        {
                          icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
                          title: "Business Growth",
                          description:
                            "Expand your business with our comprehensive product range and marketing support",
                        },
                        {
                          icon: <Award className="h-6 w-6 text-blue-600" />,
                          title: "Technical Training",
                          description: "Regular training programs to keep your team updated with latest technology",
                        },
                        {
                          icon: <Handshake className="h-6 w-6 text-blue-600" />,
                          title: "Ongoing Support",
                          description: "Dedicated support team for sales, technical, and marketing assistance",
                        },
                      ].map((benefit, index) => (
                        <div key={index} className="flex gap-4">
                          {benefit.icon}
                          <div>
                            <h4 className="font-semibold mb-1">{benefit.title}</h4>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Partnership Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Established business with industrial equipment experience
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Technical team with mechanical/electrical background
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Adequate showroom and service facility
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Financial capability for inventory investment
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Commitment to brand values and customer service
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Application Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Partnership Application</CardTitle>
                    <CardDescription>
                      Fill out the form below to start your journey as a Sarv Jagat partner
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="companyName">Company Name *</Label>
                          <Input id="companyName" required />
                        </div>
                        <div>
                          <Label htmlFor="contactPerson">Contact Person *</Label>
                          <Input id="contactPerson" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Business Address *</Label>
                        <Input id="address" required />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" required />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(statesAndCities).map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input id="pincode" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="experience">Years in Business *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="partnershipType">Preferred Partnership *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dealer">Authorized Dealer</SelectItem>
                              <SelectItem value="service">Service Partner</SelectItem>
                              <SelectItem value="premium">Premium Partner</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="currentBusiness">Current Business Focus</Label>
                        <Input id="currentBusiness" placeholder="e.g., Industrial equipment, HVAC, Pneumatic systems" />
                      </div>

                      <div>
                        <Label htmlFor="message">Additional Information</Label>
                        <textarea
                          id="message"
                          className="w-full p-3 border border-gray-300 rounded-md"
                          rows={4}
                          placeholder="Tell us about your business, target market, and why you want to partner with Sarv Jagat..."
                        ></textarea>
                      </div>
                    </form>
                        <Link href={"https://wa.me/message/QNU3M3AGOL3NH1"} target="_blank" rel="noopener noreferrer">
                      <Button type="submit"  size="lg" className="w-full">
                        Submit Application
                        
                      </Button>
                      </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
