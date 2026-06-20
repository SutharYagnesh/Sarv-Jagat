"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Transform Your Operations?</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of satisfied customers who trust Sarv Jagat Corporation for their industrial air compressor
            needs. Get a personalized quote today and discover how we can optimize your compressed air operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 btn-secondary">
              <Link href="/contact">
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="tel:+919157487233">
                <Phone className="mr-2 h-5 w-5" />
                Call +91-9157487233
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/60">
              Need immediate assistance? Our air compressor experts are available 24/7 to help you find the right SJ
              solution for your industrial needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
