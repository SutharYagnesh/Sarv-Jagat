"use client"

import { motion } from "framer-motion"
import { Award, Users, Globe, Zap } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: "25+",
    label: "Years of Excellence",
    description: "Trusted industry experience",
  },
  {
    icon: Users,
    value: "500+",
    label: "Satisfied Clients",
    description: "Across multiple industries",
  },
  {
    icon: Globe,
    value: "15+",
    label: "States Served",
    description: "Pan-India presence",
  },
  {
    icon: Zap,
    value: "99.5%",
    label: "Uptime Rate",
    description: "Reliable performance",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
            Sarv Jagat Corporation's commitment to excellence has earned us the trust of companies across India. Here
            are the numbers that speak to our success and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="flex justify-center">
                  <div className="p-4 bg-primary-foreground/10 rounded-2xl">
                    <Icon className="h-12 w-12 text-primary-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold">{stat.value}</div>
                  <div className="text-xl font-semibold">{stat.label}</div>
                  <div className="text-primary-foreground/70">{stat.description}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
