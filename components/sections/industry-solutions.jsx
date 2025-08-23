"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Factory, Car, Shirt, Coffee, Pill, Building } from "lucide-react"
import { motion } from "framer-motion"

const solutions = [
  {
    name: "Manufacturing",
    description:
      "Comprehensive compressed air solutions for production lines, assembly operations, and automated systems.",
    icon: Factory,
    href: "/solutions/manufacturing",
    features: ["Production Line Support", "Pneumatic Tools", "Assembly Automation", "Quality Control"],
  },
  {
    name: "Automotive",
    description: "Specialized air compressor systems for automotive manufacturing, painting, and service operations.",
    icon: Car,
    href: "/solutions/automotive",
    features: ["Paint Booth Systems", "Assembly Lines", "Tire Inflation", "Service Centers"],
  },
  {
    name: "Textile",
    description:
      "Reliable compressed air for textile manufacturing processes including spinning, weaving, and finishing.",
    icon: Shirt,
    href: "/solutions/textile",
    features: ["Spinning Operations", "Weaving Looms", "Dyeing Processes", "Finishing Systems"],
  },
  {
    name: "Food & Beverage",
    description: "Food-grade oil-free compressed air solutions meeting FDA standards for processing and packaging.",
    icon: Coffee,
    href: "/solutions/food-beverage",
    features: ["Food Processing", "Packaging Lines", "Bottling Operations", "Quality Control"],
  },
  {
    name: "Pharmaceutical",
    description: "Medical-grade clean air systems for pharmaceutical manufacturing and laboratory applications.",
    icon: Pill,
    href: "/solutions/pharmaceutical",
    features: ["Clean Room Systems", "Drug Manufacturing", "Laboratory Equipment", "Sterile Processing"],
  },
  {
    name: "Construction",
    description: "Portable and stationary air compressors for construction sites and infrastructure projects.",
    icon: Building,
    href: "/solutions/construction",
    features: ["Pneumatic Tools", "Concrete Operations", "Site Equipment", "Infrastructure Projects"],
  },
]

export function IndustrySolutions() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Industry-Specific Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sarv Jagat Corporation delivers tailored compressed air solutions designed to meet the unique requirements
            and challenges of diverse industries across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <motion.div
                key={solution.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{solution.name}</h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{solution.description}</p>

                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Key Applications:</h4>
                      <ul className="space-y-1">
                        {solution.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Link href={solution.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
