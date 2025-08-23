"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, TrendingUp, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"

const caseStudiesData = {
  manufacturing: [
    {
      title: "Gujarat Textiles Ltd. - Production Line Optimization",
      industry: "Textile Manufacturing",
      challenge: "Inconsistent compressed air supply causing production delays and quality issues.",
      solution: "Installed SJ-RC-10HP two-stage reciprocating compressor with backup system.",
      results: [
        { icon: TrendingUp, metric: "35%", description: "Increase in production efficiency" },
        { icon: Clock, metric: "90%", description: "Reduction in downtime" },
        { icon: Zap, metric: "25%", description: "Energy cost savings" },
      ],
      testimonial:
        "The SJ compressor system has transformed our production line. We've seen significant improvements in both efficiency and reliability.",
      client: "Rajesh Kumar, Production Manager",
    },
    {
      title: "AutoParts Manufacturing - Assembly Line Enhancement",
      industry: "Automotive Manufacturing",
      challenge: "Multiple small compressors causing maintenance issues and energy inefficiency.",
      solution: "Centralized system with SJ-SC-15HP rotary screw compressor and distribution network.",
      results: [
        { icon: TrendingUp, metric: "40%", description: "Improvement in assembly speed" },
        { icon: Clock, metric: "80%", description: "Reduction in maintenance time" },
        { icon: Zap, metric: "30%", description: "Lower energy consumption" },
      ],
      testimonial:
        "Sarv Jagat's centralized solution eliminated our compressed air problems and significantly reduced our operational costs.",
      client: "Priya Sharma, Plant Director",
    },
  ],
  automotive: [
    {
      title: "Premier Auto Service Center - Service Bay Upgrade",
      industry: "Automotive Service",
      challenge: "Inadequate air pressure for pneumatic tools and painting operations.",
      solution: "SJ-RC-7.5HP two-stage compressor with dedicated lines for different applications.",
      results: [
        { icon: TrendingUp, metric: "50%", description: "Faster service completion" },
        { icon: Clock, metric: "95%", description: "Tool reliability improvement" },
        { icon: Zap, metric: "20%", description: "Energy efficiency gain" },
      ],
      testimonial:
        "Our service quality has improved dramatically with consistent air pressure. Customer satisfaction is at an all-time high.",
      client: "Amit Patel, Service Manager",
    },
  ],
  pharmaceutical: [
    {
      title: "Pharma Solutions India - Clean Room Implementation",
      industry: "Pharmaceutical Manufacturing",
      challenge: "Need for oil-free compressed air meeting FDA standards for drug manufacturing.",
      solution: "SJ-OF-10HP oil-free compressor system with advanced filtration and monitoring.",
      results: [
        { icon: TrendingUp, metric: "100%", description: "FDA compliance achievement" },
        { icon: Clock, metric: "99.9%", description: "System uptime reliability" },
        { icon: Zap, metric: "15%", description: "Operational cost reduction" },
      ],
      testimonial:
        "The oil-free system from Sarv Jagat ensures our pharmaceutical processes meet the highest quality standards.",
      client: "Dr. Meera Singh, Quality Director",
    },
  ],
}

export function CaseStudies({ industry = "manufacturing" }) {
  const studies = caseStudiesData[industry] || caseStudiesData.manufacturing

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how Sarv Jagat air compressor solutions have transformed operations for companies across India,
            delivering measurable improvements in efficiency and reliability.
          </p>
        </motion.div>

        <div className="space-y-12">
          {studies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Content Section */}
                    <div className="lg:col-span-2 p-8 space-y-6">
                      <div className="space-y-4">
                        <Badge variant="outline" className="text-primary border-primary">
                          {study.industry}
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground">{study.title}</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Challenge:</h4>
                          <p className="text-muted-foreground">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Solution:</h4>
                          <p className="text-muted-foreground">{study.solution}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <blockquote className="text-muted-foreground italic mb-2">"{study.testimonial}"</blockquote>
                        <cite className="text-sm font-medium text-foreground">— {study.client}</cite>
                      </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-primary/5 p-8 space-y-6">
                      <h4 className="font-semibold text-foreground text-lg">Results Achieved:</h4>
                      <div className="space-y-4">
                        {study.results.map((result, idx) => {
                          const Icon = result.icon
                          return (
                            <div key={idx} className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-primary">{result.metric}</div>
                                <div className="text-sm text-muted-foreground">{result.description}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="btn-primary">
            <Link href="/contact">
              Start Your Success Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
