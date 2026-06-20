'use client';
import { generateMetadata } from './metadata';
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  GraduationCap,
  Heart,
  Shield,
  Zap,
  Upload,
  Send,
  CheckCircle,
} from "lucide-react"

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    location: "",
    resume: null,
    coverLetter: "",
  })

  // Job openings data
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Sales Engineer",
      department: "Sales",
      location: "Mumbai, Delhi, Bangalore",
      type: "Full-time",
      experience: "5-8 years",
      salary: "₹8-12 LPA",
      description: "Lead sales initiatives for industrial air compressor solutions across key markets.",
      requirements: [
        "B.Tech in Mechanical/Electrical Engineering",
        "5+ years in industrial equipment sales",
        "Strong technical knowledge of compressed air systems",
        "Excellent communication and presentation skills",
        "Willingness to travel extensively",
      ],
      responsibilities: [
        "Develop and execute sales strategies for assigned territories",
        "Build relationships with key industrial clients",
        "Provide technical consultation to customers",
        "Achieve monthly and quarterly sales targets",
        "Collaborate with technical team for custom solutions",
      ],
    },
    {
      id: 2,
      title: "Service Technician",
      department: "Service",
      location: "Pan India",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹4-7 LPA",
      description: "Provide on-site installation, maintenance, and repair services for air compressors.",
      requirements: [
        "ITI/Diploma in Mechanical Engineering",
        "2+ years in compressor service/maintenance",
        "Knowledge of pneumatic systems",
        "Valid driving license",
        "Ability to work in industrial environments",
      ],
      responsibilities: [
        "Install and commission air compressor systems",
        "Perform preventive maintenance as per AMC schedules",
        "Diagnose and repair equipment failures",
        "Maintain service records and reports",
        "Provide technical training to customer operators",
      ],
    },
    {
      id: 3,
      title: "Design Engineer",
      department: "Engineering",
      location: "Pune",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹6-10 LPA",
      description: "Design and develop innovative compressed air solutions for various industrial applications.",
      requirements: [
        "B.Tech in Mechanical Engineering",
        "3+ years in product design/development",
        "Proficiency in CAD software (SolidWorks, AutoCAD)",
        "Knowledge of thermodynamics and fluid mechanics",
        "Experience with compressor technology preferred",
      ],
      responsibilities: [
        "Design custom compressed air systems",
        "Create technical drawings and specifications",
        "Collaborate with manufacturing team",
        "Conduct performance analysis and optimization",
        "Support sales team with technical proposals",
      ],
    },
    {
      id: 4,
      title: "Quality Control Inspector",
      department: "Quality",
      location: "Pune",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹3-5 LPA",
      description: "Ensure product quality through rigorous testing and inspection processes.",
      requirements: [
        "Diploma/B.Tech in Mechanical Engineering",
        "2+ years in quality control/inspection",
        "Knowledge of quality standards (ISO 9001)",
        "Experience with measuring instruments",
        "Attention to detail and analytical skills",
      ],
      responsibilities: [
        "Inspect incoming raw materials and components",
        "Conduct in-process and final product inspections",
        "Maintain quality records and documentation",
        "Identify and report quality issues",
        "Support continuous improvement initiatives",
      ],
    },
    {
      id: 5,
      title: "Digital Marketing Executive",
      department: "Marketing",
      location: "Mumbai",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹3-6 LPA",
      description: "Drive digital marketing initiatives to enhance brand presence and generate leads.",
      requirements: [
        "MBA/BBA in Marketing or related field",
        "1+ years in digital marketing",
        "Knowledge of SEO, SEM, social media marketing",
        "Experience with Google Analytics, AdWords",
        "Creative thinking and analytical skills",
      ],
      responsibilities: [
        "Develop and execute digital marketing campaigns",
        "Manage social media presence and content",
        "Optimize website for search engines",
        "Generate and nurture leads through digital channels",
        "Analyze campaign performance and ROI",
      ],
    },
    {
      id: 6,
      title: "HR Executive",
      department: "Human Resources",
      location: "Pune",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹4-6 LPA",
      description: "Support HR operations including recruitment, employee relations, and policy implementation.",
      requirements: [
        "MBA in HR or related field",
        "2+ years in HR operations",
        "Knowledge of labor laws and HR policies",
        "Strong interpersonal and communication skills",
        "Experience with HRIS systems preferred",
      ],
      responsibilities: [
        "Manage end-to-end recruitment process",
        "Handle employee onboarding and orientation",
        "Maintain employee records and documentation",
        "Support performance management processes",
        "Assist in policy development and implementation",
      ],
    },
  ]

  // Company benefits
  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Health & Wellness",
      description: "Comprehensive medical insurance for employee and family, annual health checkups",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
      title: "Learning & Development",
      description: "Technical training programs, certification courses, conference attendance",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Job Security",
      description: "Stable employment, performance-based growth, long-term career planning",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Performance Rewards",
      description: "Annual bonuses, recognition programs, performance incentives",
    },
  ]

  const handleApplicationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Application submitted:", applicationForm)
    alert("Application submitted successfully! We will contact you soon.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join <span className="text-red-400">Sarv Jagat</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Build your career with India's leading compressed air solutions provider. Grow with us and make a
              difference in industrial innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                <span>100+ Team Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-red-400" />
                <span>Multiple Openings</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-red-400" />
                <span>Growth Opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="benefits" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="benefits">Benefits & Culture</TabsTrigger>
              <TabsTrigger value="apply">Apply Now</TabsTrigger>
            </TabsList> 
            

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Why Work With Us?</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join a company that values your growth, well-being, and professional development
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-center mb-4">{benefit.icon}</div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Company Culture */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h4 className="text-3xl font-bold text-center mb-8">Our Culture</h4>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h5 className="text-xl font-semibold mb-3 text-red-400">Innovation</h5>
                    <p>We encourage creative thinking and innovative solutions to complex engineering challenges.</p>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold mb-3 text-red-400">Collaboration</h5>
                    <p>Teamwork and knowledge sharing are at the heart of everything we do.</p>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold mb-3 text-red-400">Excellence</h5>
                    <p>We strive for excellence in every project and continuously improve our processes.</p>
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div>
                <h4 className="text-2xl font-bold text-center mb-8">Additional Benefits</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "Flexible working hours",
                    "Work from home options",
                    "Employee referral bonus",
                    "Festival bonuses",
                    "Team outings and events",
                    "Professional development budget",
                    "Maternity/Paternity leave",
                    "Employee assistance program",
                    "Transportation allowance",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Apply Tab */}
            <TabsContent value="apply" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Apply for a Position</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ready to join our team? Fill out the application form below
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Job Application Form</CardTitle>
                    <CardDescription>
                      Please fill out all required fields. We'll review your application and get back to you soon.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleApplicationSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={applicationForm.name}
                            onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={applicationForm.email}
                            onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={applicationForm.phone}
                            onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="position">Position Applied For *</Label>
                          <Select
                            onValueChange={(value) => setApplicationForm({ ...applicationForm, position: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              {jobOpenings.map((job) => (
                                <SelectItem key={job.id} value={job.title}>
                                  {job.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="experience">Years of Experience *</Label>
                          <Select
                            onValueChange={(value) => setApplicationForm({ ...applicationForm, experience: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1">0-1 years</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-8">5-8 years</SelectItem>
                              <SelectItem value="8+">8+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="location">Preferred Location *</Label>
                          <Select
                            onValueChange={(value) => setApplicationForm({ ...applicationForm, location: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mumbai">Mumbai</SelectItem>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="bangalore">Bangalore</SelectItem>
                              <SelectItem value="pune">Pune</SelectItem>
                              <SelectItem value="chennai">Chennai</SelectItem>
                              <SelectItem value="hyderabad">Hyderabad</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="resume">Resume/CV *</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <Button type="button" variant="outline" className="flex items-center gap-2 bg-transparent">
                            <Upload className="h-4 w-4" />
                            Upload Resume
                          </Button>
                          <span className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="coverLetter">Cover Letter</Label>
                        <Textarea
                          id="coverLetter"
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                          value={applicationForm.coverLetter}
                          onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                          rows={6}
                        />
                      </div>

                    </form>
                      <Button type="submit" size="lg" className="w-full">
                        <Send className="h-5 w-5 mr-2" />
                        <a href="mailto:contact@sarvjagat.com" className="hover:underline">
                        Submit Application
                
                            </a>
                      </Button>
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
