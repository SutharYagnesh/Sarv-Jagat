"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const defaultNavigation = {
  products: [
    {
      name: "Screw Air Compressors",
      href: "/products/screw",
      description: "High-efficiency rotary screw compressors",
    },
    { name: "Piston Compressors", href: "/products/piston", description: "Robust reciprocating compressors" },
    { name: "Oil-Free Systems", href: "/products/oil-free", description: "Contamination-free air solutions" },
    { name: "Specialized Solutions", href: "/products/specialized", description: "Custom engineered systems" },
  ],
  industries: [
    { name: "Automotive Industry", href: "/industries/automotive", description: "Comprehensive air solutions for automotive" },
    { name: "Pharmaceuticals & Healthcare", href: "/industries/pharmaceuticals", description: "Clean, sterile compressed air solutions" },
    { name: "Food & Beverage", href: "/industries/food-beverage", description: "Food-grade compressed air systems" },
    { name: "Textile & Garment", href: "/industries/textile", description: "Reliable air systems for textile" },
    { name: "Metal & Fabrication", href: "/industries/metal-fabrication", description: "Heavy-duty air solutions" },
    { name: "Construction & Infrastructure", href: "/industries/construction", description: "Mobile and stationary air solutions" },
    { name: "Mining & Quarry", href: "/industries/mining", description: "Rugged air compressor solutions" },
    { name: "Electronics & Semiconductor", href: "/industries/electronics", description: "Precision air systems" },
    { name: "Plastic & PET Bottle", href: "/industries/plastic-pet", description: "Specialized air solutions" },
    { name: "Chemical & Process", href: "/industries/chemical", description: "Corrosion-resistant air systems" },
  ],
  services: [
    { name: "Installation", href: "/services/installation", description: "Professional setup services" },
    { name: "AMC", href: "/services/amc", description: "Annual maintenance contracts" },
    { name: "Technical Support", href: "/services/technical-support", description: "24/7 expert assistance" },
    { name: "Spare Parts", href: "/services/spare-parts", description: "Genuine parts supply" },
  ],
  company: [
    { name: "About Us", href: "/about", description: "Our company story and values" },
    { name: "Careers", href: "/careers", description: "Join our growing team" },
    { name: "Contact", href: "/contact", description: "Get in touch with us" },
  ],
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navigation, setNavigation] = useState(defaultNavigation)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/categories');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setNavigation(prev => ({
              ...prev,
              products: data.map(c => ({
                name: c.name,
                href: `/products/category/${c.slug}`,
                description: c.description || `Explore our ${c.name} solutions`
              }))
            }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="bg-slate-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a href="tel:+919157487233" className="hover:text-red-400">
                📞 +91-9157487233
              </a>

            </div>
            <div className="flex items-center gap-2">
              <a href="mailto:connect@sarvjagat.com" className="hover:text-red-400">
                ✉️ connect@sarvjagat.com
              </a>
            </div>
          </div>
          
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarv%20Jagat_Logo_Red_11-pHspqmQqNQEdHljrRKg6n4A8tu4sYR.png"
              alt="Sarv Jagat Corporation Logo"
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900">SARV JAGAT</span>
              <span className="text-xs text-slate-600">Heart of Your Air Needs</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 text-slate-900 hover:text-red-600"
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/products">
                  <NavigationMenuTrigger className="text-slate-900 hover:text-red-600">Products</NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4 bg-white">
                    {navigation.products.map((item) => (
                      <NavigationMenuLink key={item.name} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-slate-100 hover:text-red-600 focus:bg-slate-100 focus:text-red-600"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-600">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/industries">
                  <NavigationMenuTrigger className="text-slate-900 hover:text-red-600">Industries</NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4 bg-white">
                    {navigation.industries.map((item) => (
                      <NavigationMenuLink key={item.name} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-slate-100 hover:text-red-600 focus:bg-slate-100 focus:text-red-600"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-600">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/services">
                  <NavigationMenuTrigger className="text-slate-900 hover:text-red-600">Services</NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4 bg-white">
                    {navigation.services.map((item) => (
                      <NavigationMenuLink key={item.name} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-slate-100 hover:text-red-600 focus:bg-slate-100 focus:text-red-600"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-600">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about">
                  <NavigationMenuTrigger className="text-slate-900 hover:text-red-600">Company</NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4 bg-white">
                    {navigation.company.map((item) => (
                      <NavigationMenuLink key={item.name} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-slate-100 hover:text-red-600 focus:bg-slate-100 focus:text-red-600"
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-600">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/blog"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 text-slate-900 hover:text-red-600"
                >
                  Blog
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-full focus:outline-none focus:border-red-500 w-48 transition-all bg-white text-slate-900"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </form>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <MobileNav navigation={navigation} onClose={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MobileNav({ navigation, onClose }) {
  const [openSections, setOpenSections] = useState({})
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      onClose()
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Link href="/" onClick={onClose} className="flex items-center space-x-3">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sarv%20Jagat_Logo_Red_11-pHspqmQqNQEdHljrRKg6n4A8tu4sYR.png"
          alt="Sarv Jagat Corporation Logo"
          className="h-8 w-8"
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-slate-900">SARV JAGAT</span>
          <span className="text-xs text-slate-600">Air Solutions</span>
        </div>
      </Link>

      <div className="space-y-4">
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            placeholder="Search site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:border-red-500 w-full"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </form>

        <Link href="/#hero" onClick={onClose} className="block py-2 text-slate-900 hover:text-red-600 font-medium">
          Home
        </Link>

        {Object.entries(navigation).map(([key, items]) => (
          <div key={key}>
            <button
              onClick={() => toggleSection(key)}
              className="flex w-full items-center justify-between py-2 text-left font-medium capitalize text-slate-900 hover:text-red-600"
            >
              {key}
              <ChevronDown className={cn("h-4 w-4", openSections[key] && "rotate-180")} />
            </button>
            {openSections[key] && (
              <div className="ml-4 space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 text-sm text-slate-600 hover:text-red-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <Link href="/blog" onClick={onClose} className="block py-2 font-medium text-slate-900 hover:text-red-600">
          Blog
        </Link>

        <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
          <Link href="/contact" onClick={onClose}>
            Get Quote
          </Link>
        </Button>
      </div>
    </div>
  )
}
