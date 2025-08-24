"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Rajesh Kumar",
    title: "Production Manager",
    company: "Gujarat Textiles Ltd.",
    content:
      "Sarv Jagat's reciprocating air compressors have transformed our textile production line. The SJ-RC series delivers consistent performance with excellent energy efficiency. Outstanding service support from the team.",
    rating: 5,
    image: "/placeholder.jpg",
  },
  {
    name: "Priya Sharma",
    title: "Plant Director",
    company: "AutoParts Manufacturing",
    content:
      "We've been using SJ screw compressors for over 3 years now. The reliability and low maintenance requirements have significantly improved our automotive assembly line productivity. Highly recommended.",
    rating: 5,
    image: "/placeholder.jpg",
  },
  {
    name: "Amit Patel",
    title: "Quality Control Manager",
    company: "Pharma Solutions India",
    content:
      "The oil-free compressors from Sarv Jagat ensure our pharmaceutical manufacturing meets the highest quality standards. Clean, reliable compressed air is critical for our processes.",
    rating: 5,
    image: "/placeholder.jpg",
  },
]

export function TestimonialsSection() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders across India have to say about Sarv Jagat
            Corporation's products and services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 space-y-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-muted-foreground leading-relaxed">"{testimonial.content}"</blockquote>

                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
