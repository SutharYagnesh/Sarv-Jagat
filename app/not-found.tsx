import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Package, Phone, FileText } from 'lucide-react'

export const metadata = {
  title: 'Page Not Found | Sarv Jagat Corporation',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <span className="text-6xl font-bold text-red-600 block mb-2">404</span>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8 text-sm">
          The page you requested could not be found or has been moved to a new URL. Explore our industrial compressor catalog or return to the homepage.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
            <Link href="/" className="flex items-center justify-center">
              <Home className="w-4 h-4 mr-2" /> Return to Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full border-gray-300">
            <Link href="/products" className="flex items-center justify-center">
              <Package className="w-4 h-4 mr-2" /> Browse Products
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full text-gray-600 hover:text-red-600">
            <Link href="/contact" className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" /> Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

