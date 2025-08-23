"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, FileText, Wrench, CheckCircle, Headphones } from "lucide-react"
import { motion } from "framer-motion"

const processSteps = [
  {
    step: 1,
    icon: Phone,
    title: "Initial Consultation",
    description: "Contact our experts to discuss your compressed air requirements and operational needs.",
    duration: "30 minutes",
  },
  {
    step: 2,
    icon: FileText,
    title: "Site Assessment",
    description: "Our engineers conduct a thorough site survey to understand your specific application requirements.",
    duration: "1-2 days",
  },
  {
    step: 3,
    icon: Wrench,
    title: "Custom Solution Design",
    description: "We design a tailored compressed air system optimized for your industry and operational demands.",
    duration: "3-5 days",
  },
  {
    step: 4,
    icon: CheckCircle,
    title: "Installation & Commissioning",
    description: "Professional installation and system commissioning by our certified technicians.",
    duration: "1-3 days",
  },
  {
    step: 5,
    icon: Headphones,
    title: "Ongoing Support",
    description: "Comprehensive maintenance support and 24/7 technical assistance for optimal performance.",
    duration: "Ongoing",
  },
]

export function ProcessFlow() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Our Solution Process</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From initial consultation to ongoing support, we follow a proven process to deliver compressed air solutions
            that exceed your expectations and operational requirements.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop Flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center relative"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="absolute top-8 left-20 h-6 w-6 text-primary" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="flex justify-center">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        <div className="text-xs text-primary font-medium">{step.duration}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-foreground">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                          <div className="text-xs text-primary font-medium">{step.duration}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Contact our compressed air experts today for a free consultation and customized solution proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919157487233"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call +91-9157487233
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
