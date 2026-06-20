"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Factory, Car, Shirt, Coffee } from "lucide-react"
import { motion } from "framer-motion"

const industries = [
  {
    name: "Manufacturing",
    description:
      "Comprehensive compressed air solutions for manufacturing operations including assembly lines, pneumatic tools, and production automation systems.",
    icon: Factory,
    href: "/solutions/manufacturing",
    image: "/placeholder.svg?key=mfg01",
    clients: "200+ Clients",
  },
  {
    name: "Automotive",
    description:
      "Specialized air compressor equipment for automotive manufacturing, painting booths, tire inflation, and service centers across India.",
    icon: Car,
    href: "/solutions/automotive",
    image: "/placeholder.svg?key=auto01",
    clients: "150+ Clients",
  },
  {
    name: "Textile",
    description:
      "Reliable compressed air solutions for textile manufacturing processes including spinning, weaving, dyeing, and finishing operations.",
    icon: Shirt,
    href: "/solutions/textile",
    image: "/placeholder.svg?key=text01",
    clients: "100+ Clients",
  },
  {
    name: "Food & Beverage",
    description:
      "Food-grade oil-free compressed air solutions for processing, packaging, bottling, and quality control operations meeting FDA standards.",
    icon: Coffee,
    href: "/solutions/food-beverage",
    image: "/placeholder.svg?key=food01",
    clients: "75+ Clients",
  },
]

export function IndustriesSection() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Industries We Serve</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trusted by leading companies across diverse industries in India. Our SJ air compressor solutions are
            tailored to meet the unique compressed air requirements of each sector with reliable performance and energy
            efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden card-hover">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative overflow-hidden">
                        <img
                          src={industry.image || "/placeholder.svg"}
                          alt={`${industry.name} - Sarv Jagat Air Compressor Solutions`}
                          className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-foreground">
                          {industry.clients}
                        </div>
                      </div>

                      <div className="p-8 flex flex-col justify-center space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">{industry.name}</h3>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{industry.description}</p>

                        <Button
                          asChild
                          variant="ghost"
                          className="self-start group-hover:bg-primary group-hover:text-primary-foreground transition-colors focus-professional"
                        >
                          <Link href={industry.href}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="btn-primary focus-professional">
            <Link href="/solutions">
              View All Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
