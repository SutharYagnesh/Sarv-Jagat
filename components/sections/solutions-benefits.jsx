"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Zap, Shield, Wrench, TrendingUp, Clock } from "lucide-react"
import { motion } from "framer-motion"

const benefits = [
  {
    icon: Zap,
    title: "Energy Efficiency",
    description: "Advanced SJ compressors deliver up to 40% energy savings compared to conventional systems.",
  },
  {
    icon: Shield,
    title: "Reliability & Durability",
    description:
      "Built with premium components for continuous operation and minimal downtime in industrial environments.",
  },
  {
    icon: Wrench,
    title: "Easy Maintenance",
    description: "User-friendly design with accessible components and comprehensive maintenance support.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Modular systems that grow with your business needs and production requirements.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical support and emergency service across India.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "ISO certified manufacturing with rigorous testing and quality control processes.",
  },
]

export function SolutionsBenefits() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose Sarv Jagat Solutions?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive approach to compressed air solutions delivers measurable benefits that drive operational
            excellence and cost savings for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-primary/10 rounded-2xl">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
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
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Experience the Difference?</h3>
            <p className="text-muted-foreground mb-6">
              Join hundreds of satisfied customers who have transformed their operations with Sarv Jagat air compressor
              solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Satisfied Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">States Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
                <div className="text-sm text-muted-foreground">Uptime Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
