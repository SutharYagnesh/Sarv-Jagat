"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Zap, Wrench, Filter, Wind } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Reciprocating Air Compressors",
    description:
      "High-performance reciprocating piston air compressors for industrial applications. Available in single and two-stage configurations.",
    icon: Zap,
    href: "/products/reciprocating-compressors",
    image: "/placeholder.jpg",
    stats: "3HP - 30HP Range",
    models: "SJ-RC Series",
  },
  {
    name: "Screw Air Compressors",
    description: "Energy-efficient rotary screw compressors designed for continuous operation and maximum reliability.",
    icon: Wind,
    href: "/products/screw-compressors",
    image: "/placeholder.jpg",
    stats: "5HP - 100HP Range",
    models: "SJ-SC Series",
  },
  {
    name: "Oil-Free Compressors",
    description:
      "Clean air solutions for pharmaceutical, food processing, and sensitive applications requiring oil-free compressed air.",
    icon: Filter,
    href: "/products/oil-free-compressors",
    image: "/placeholder.jpg",
    stats: "Medical Grade Air",
    models: "SJ-OF Series",
  },
  {
    name: "Vacuum Pumps",
    description: "Industrial vacuum pumps and systems for packaging, material handling, and manufacturing processes.",
    icon: Wrench,
    href: "/products/vacuum-pumps",
    image: "/two-stage-piston-compressor.png",
    stats: "Multiple Configurations",
    models: "SJ-VP Series",
  },
]

export function ProductCategoriesSection() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Sarv Jagat Product Range</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive range of industrial air compressors and compressed air solutions designed to meet the diverse
            needs of modern manufacturing, automotive, textile, and pharmaceutical industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={`${category.name} - ${category.models}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {category.stats}
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 text-primary px-2 py-1 rounded text-xs font-semibold">
                        {category.models}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{category.description}</p>

                      <Button
                        asChild
                        variant="ghost"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Link href={category.href}>
                          View SJ Models
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
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
          <Button asChild size="lg">
            <Link href="/products">
              View All SJ Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
