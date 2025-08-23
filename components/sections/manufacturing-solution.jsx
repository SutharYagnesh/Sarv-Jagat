"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Factory, Cog, Zap, Shield, TrendingUp, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const applications = [
  {
    icon: Factory,
    title: "Production Lines",
    description: "Reliable compressed air for automated production systems and assembly operations.",
    features: ["Conveyor Systems", "Pneumatic Actuators", "Quality Control", "Material Handling"],
  },
  {
    icon: Cog,
    title: "Pneumatic Tools",
    description: "Power pneumatic tools and equipment for manufacturing and assembly processes.",
    features: ["Impact Wrenches", "Spray Guns", "Sanders & Grinders", "Nail Guns"],
  },
  {
    icon: Zap,
    title: "Process Automation",
    description: "Support automated manufacturing processes with consistent compressed air supply.",
    features: ["Robotic Systems", "CNC Machines", "Packaging Equipment", "Testing Systems"],
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Reliability",
    description: "99.5% uptime with robust SJ compressors designed for continuous industrial operation.",
  },
  {
    icon: TrendingUp,
    title: "Efficiency",
    description: "Up to 40% energy savings with advanced compression technology and smart controls.",
  },
  {
    icon: CheckCircle,
    title: "Quality",
    description: "Consistent air quality meeting manufacturing standards for precision operations.",
  },
]

export function ManufacturingSolution() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Manufacturing Applications
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sarv Jagat air compressors power diverse manufacturing operations with reliable, efficient compressed air
              solutions tailored for industrial environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {applications.map((application, index) => {
              const Icon = application.icon
              return (
                <motion.div
                  key={application.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{application.title}</h3>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{application.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Key Applications:</h4>
                        <ul className="space-y-1">
                          {application.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Manufacturing Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our manufacturing solutions deliver measurable improvements in productivity, efficiency, and operational
              reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <Card className="border-0 shadow-md text-center h-full">
                    <CardContent className="p-6 space-y-4">
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
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Optimize Your Manufacturing Operations</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ready to improve your manufacturing efficiency with reliable compressed air solutions? Our experts are
              here to help you select the right SJ compressor system for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/contact">
                  Get Manufacturing Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">View SJ Compressors</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
