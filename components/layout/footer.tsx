import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Phone, Mail, MapPin, ArrowRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const productLinks = [
    { name: "Screw Compressors", href: "/products/screw" },
    { name: "Piston Compressors", href: "/products/piston" },
    { name: "Oil-Free Systems", href: "/products/oil-free" },
    { name: "Specialized Solutions", href: "/products/specialized" },
    { name: "Refrigerated Air Dryers", href: "/products" },
  ]

  const industryLinks = [
    { name: "Automotive", href: "/industries/automotive" },
    { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
    { name: "Food & Beverage", href: "/industries/food-beverage" },
    { name: "Textile", href: "/industries/textile" },
    { name: "Metal & Fabrication", href: "/industries/metal-fabrication" },
    { name: "Construction & Infrastructure", href: "/industries/construction" },
    { name: "Mining & Quarry", href: "/industries/mining" },
    { name: "Electronics & Semiconductor", href: "/industries/electronics" },
    { name: "Plastic & PET Bottle", href: "/industries/plastic-pet" },
    { name: "Chemical & Process", href: "/industries/chemical" },
  ]

  const serviceLinks = [
    { name: "Installation", href: "/services/installation" },
    { name: "AMC", href: "/services/amc" },
    { name: "Technical Support", href: "/services/technical-support" },
    { name: "Spare Parts", href: "/services/spare-parts" },
  ]

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Dealers", href: "/dealers" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Stay Updated with Sarv Jagat</h3>
              <p className="text-slate-300">
                Get the latest updates on new products, industry insights, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
                <a href="mailto:contact@sarvjagat.com" className="hover:underline">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
            
                            </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarv%20Jagat_Logo_Red_11-8HaQnVr31xklzE7FwiaKSujTe7UnXM.png"
                alt="Sarv Jagat Corporation Logo"
                className="h-12 w-12"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">SARV JAGAT</span>
                <span className="text-sm text-slate-400">Heart of Your Air Needs</span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Leading manufacturer of industrial air compressors with 25+ years of excellence. We deliver reliable,
              energy-efficient compressed air solutions across diverse industries.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-400" />
                <a href="tel:+919157487233" className="hover:text-red-400">
                  +91-9157487233
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-400" />
                <a href="mailto:contact@sarvjagat.com" className="hover:text-red-400">
                  contact@sarvjagat.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-400 mt-1" />
                <span>
                  Vinayak Industrial Estate - 2<br />
                  Kathwada-GIDC, Ahmedabad-382430, Gujarat, India
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/share/1JEhBDE3mE/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/sarvjagat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/sarvjagat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@SarvJagat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/sarvjagat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 hover:text-red-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Industries</h4>
            <ul className="space-y-2">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-300 hover:text-red-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Company */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Services</h4>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-300 hover:text-red-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Company</h4>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-300 hover:text-red-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">© {currentYear} Sarv Jagat Corporation. All rights reserved.</div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-slate-400 hover:text-red-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
