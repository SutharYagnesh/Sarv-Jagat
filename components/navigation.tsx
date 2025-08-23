"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Search, Menu, X, Phone, Mail } from "lucide-react"
import GlobalSearch from "@/components/search/global-search"

// Professional navigation component for Sarv Jagat website
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Product categories based on the provided product descriptions
  const productCategories = [
    {
      title: "Screw Air Compressors",
      items: [
        { name: "Oil-Injected Fixed Speed", href: "/products/screw/fixed-speed" },
        { name: "Oil-Injected Variable Speed (VSD)", href: "/products/screw/variable-speed" },
        { name: "Oil-Free Screw Compressors", href: "/products/screw/oil-free" },
        { name: "Tank Mounted Screw", href: "/products/screw/tank-mounted" },
        { name: "Trolley Mounted Screw", href: "/products/screw/trolley-mounted" },
        { name: "Diesel Engine Trolley", href: "/products/screw/diesel-trolley" },
      ],
    },
    {
      title: "Reciprocating Piston Compressors",
      items: [
        { name: "Single Stage Piston", href: "/products/piston/single-stage" },
        { name: "Two Stage Piston", href: "/products/piston/two-stage" },
        { name: "Multi Stage High Pressure", href: "/products/piston/multi-stage" },
        { name: "Oil-Free Piston", href: "/products/piston/oil-free" },
        { name: "Duplex Twin Motor", href: "/products/piston/duplex" },
        { name: "Tractor Shaft Driven", href: "/products/piston/tractor-driven" },
      ],
    },
    {
      title: "Specialized Compressors",
      items: [
        { name: "Booster High Pressure", href: "/products/specialized/booster" },
        { name: "Vacuum Pumps", href: "/products/specialized/vacuum-pumps" },
        { name: "Fully Assembled Systems", href: "/products/specialized/assembled-systems" },
      ],
    },
    {
      title: "Accessories & Parts",
      items: [
        { name: "Air Receiver Tanks", href: "/products/accessories/tanks" },
        { name: "Refrigerated Air Dryers", href: "/products/accessories/dryers" },
        { name: "Air Filters & Carbon Towers", href: "/products/accessories/filters" },
        { name: "Spare Parts", href: "/products/accessories/spare-parts" },
      ],
    },
  ]

  // Industry applications based on reference websites
  const industries = [
    { name: "Automotive", href: "/industries/automotive" },
    { name: "Pharmaceuticals", href: "/industries/pharmaceuticals" },
    { name: "Food & Beverage", href: "/industries/food-beverage" },
    { name: "Textile & Garment", href: "/industries/textile" },
    { name: "Metal & Fabrication", href: "/industries/metal-fabrication" },
    { name: "Construction", href: "/industries/construction" },
    { name: "Mining & Quarry", href: "/industries/mining" },
    { name: "Electronics", href: "/industries/electronics" },
  ]

  // Services offered by the company
  const services = [
    { name: "Installation & Commissioning", href: "/services/installation" },
    { name: "Annual Maintenance Contract", href: "/services/amc" },
    { name: "Repair & Service", href: "/services/repair" },
    { name: "Spare Parts Supply", href: "/services/spare-parts" },
    { name: "Technical Support", href: "/services/technical-support" },
    { name: "Energy Audit", href: "/services/energy-audit" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top contact bar for professional appearance */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91-9876543210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@sarvjagat.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dealer-locator" className="hover:underline">
              Find Dealer
            </Link>
            <Link href="/careers" className="hover:underline">
              Careers
            </Link>
            <Link href="/support" className="hover:underline">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-bold text-xl">SJ</div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">SARV JAGAT</span>
              <span className="text-xs text-muted-foreground">Air Compressor Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Products Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] gap-3 p-6 md:grid-cols-2">
                    {productCategories.map((category) => (
                      <div key={category.title} className="space-y-3">
                        <h4 className="font-medium text-primary">{category.title}</h4>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li key={item.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm"
                                >
                                  {item.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Industries Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">Industries</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-6 md:grid-cols-2">
                    {industries.map((industry) => (
                      <NavigationMenuLink key={industry.name} asChild>
                        <Link
                          href={industry.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{industry.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Services Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-6">
                    {services.map((service) => (
                      <NavigationMenuLink key={service.name} asChild>
                        <Link
                          href={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{service.name}</div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Simple Links */}
              <NavigationMenuItem>
                <Link
                  href="/about"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  About Us
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <GlobalSearch />
            </div>
            <Button className="hidden md:flex btn-secondary">Get Quote</Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden bg-transparent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="space-y-4">
              <Link href="/products" className="block py-2 text-foreground hover:text-primary">
                Products
              </Link>
              <Link href="/industries" className="block py-2 text-foreground hover:text-primary">
                Industries
              </Link>
              <Link href="/services" className="block py-2 text-foreground hover:text-primary">
                Services
              </Link>
              <Link href="/about" className="block py-2 text-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="block py-2 text-foreground hover:text-primary">
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <div className="w-full">
                  <GlobalSearch
                    trigger={
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Search className="mr-2 h-4 w-4" />
                        Search Products
                      </Button>
                    }
                  />
                </div>
                <Button className="w-full btn-secondary">Get Quote</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
