import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Toaster } from "@/components/ui/toaster"
import {Analytics} from "@vercel/analytics/next"
export const metadata = {
  title: "Sarv Jagat Corporation | Premium Industrial Air Compressor Solutions",
  description:
    "Leading manufacturer of industrial air compressors, Refrigerated Air Dryers, and compressed air solutions. Trusted by industries worldwide. Contact us at +919157487233 or contact@sarvjagat.com",
  generator: "Next.js",
  metadataBase: new URL("https://sarvjagat.com"),
  keywords: {
  "compressors": [
    "industrial air compressor",
    "air compressor manufacturer in india",
    "best industrial air compressor",
    "reciprocating air compressor",
    "oil free air compressor",
    "lubricated air compressor",
    "screw air compressor",
    "rotary screw compressor",
    "variable speed screw compressor",
    "tractor mounted air compressor",
    "trolley mounted air compressor",
    "portable air compressor",
    "high pressure air compressor",
    "two stage air compressor",
    "multi stage air compressor",
    "pet air compressor",
    "booster air compressor",
    "diesel operated air compressor",
    "electric industrial air compressor",
    "silent air compressor",
    "medical air compressor",
    "hospital air compressor",
    "heavy duty air compressor",
    "water cooled air compressor",
    "air cooled air compressor",
    "vacuum pump manufacturer",
    "industrial compressor spare exporter",
    "low maintenance air compressor",
    "cast iron body air compressor",
    "high cfm air compressor",
    "energy efficient screw compressor",
    "smart screw air compressor",
    "durable reciprocating compressor"
  ],
  "dryers": [
    "air dryer for compressor",
    "compressed air dryer",
    "refrigerated air dryer",
    "heatless desiccant air dryer",
    "desiccant air dryer",
    "industrial air dryer manufacturer",
    "compressed air moisture remover",
    "high pressure air dryer",
    "energy efficient air dryer",
    "portable air dryer",
    "air dryer for pharmaceutical industry",
    "air dryer for food processing",
    "compressed air dryer exporter",
    "industrial air dryer india"
  ],
  "filters": [
    "compressed air filter",
    "industrial air filter",
    "oil removal air filter",
    "particulate air filter",
    "activated carbon air filter",
    "high efficiency air filter",
    "compressed air inline filter",
    "micro filter for air compressor",
    "dust removal air filter",
    "oil mist separator",
    "industrial air purification filter",
    "compressed air filtration system",
    "air compressor intake filter",
    "air compressor oil separator"
  ],
  "spares_and_accessories": [
    "air compressor spare parts",
    "screw compressor spares",
    "reciprocating compressor spares",
    "oil free compressor parts",
    "compressor valves",
    "compressor pistons",
    "compressor rings",
    "air filters for compressor",
    "oil filters for compressor",
    "separator filters",
    "genuine compressor spares",
    "aftermarket compressor parts",
    "air receiver tank",
    "compressed air pipeline accessories",
    "automatic drain valve"
  ],
  "applications": [
    "air compressor for manufacturing",
    "air compressor for cnc machines",
    "air compressor for vmc machines",
    "air compressor for sandblasting",
    "air compressor for rmc plant",
    "air compressor for construction",
    "air compressor for spray painting",
    "air compressor for tyre inflation",
    "air compressor for clean room",
    "oil free compressor for hospital",
    "air compressor for food industry",
    "air compressor for beverages",
    "air compressor for electronics",
    "air compressor for pcb assembly",
    "air compressor for oil and gas",
    "air compressor for drilling",
    "air compressor for mining",
    "air compressor for blasting",
    "air compressor for plastic industry",
    "air compressor for pet bottle blowing",
    "air compressor for textile industry",
    "compressed air solution for automotive"
  ],
  "location_based": [
    "air compressor manufacturer in ahmedabad",
    "air compressor manufacturer in gujarat",
    "air compressor supplier in india",
    "air compressor exporter worldwide",
    "best screw compressor manufacturer in india",
    "air compressor dealer in ahmedabad",
    "air compressor company in gujarat",
    "air compressor manufacturer in pune",
    "air compressor supplier in mumbai",
    "air compressor distributor in chennai",
    "air compressor exporter to uae",
    "air compressor supplier in africa",
    "air compressor exporter to middle east",
    "air compressor exporter to europe"
  ],
  "branded_keywords": [
    "sarv jagat air compressors",
    "sj air compressor manufacturer",
    "sarv jagat industrial compressors",
    "sj screw compressor",
    "sarv jagat reciprocating compressor",
    "sarv jagat oil free compressor",
    "sarv jagat pet compressor",
    "sarv jagat booster compressor",
    "sarv jagat vacuum pump",
    "sarv jagat air compressor exporter",
    "sarv jagat compressor spares",
    "sj brand screw air compressor",
    "sarv jagat compressed air solutions"
  ]
},
  authors: [{ name: "Sarv Jagat Corporation" }],
  creator: "Sarv Jagat Corporation",
  publisher: "Sarv Jagat Corporation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sarvjagat.com",
    title: "Sarv Jagat Corporation | Premium Industrial Air Compressor Solutions",
    description:
      "Leading manufacturer of industrial air compressors, pneumatic tools, and compressed air solutions. Trusted by industries worldwide. Contact us at +919157487233 or contact@sarvjagat.com",
    siteName: "Sarv Jagat Corporation",
    images: [
      {
        url: "/Sarv Jagat_Logo_Red_11.png",
        width: 1200,
        height: 630,
        alt: "Sarv Jagat Corporation - Industrial Air Compressor Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarv Jagat Corporation | Premium Industrial Air Compressor Solutions",
    description:
      "Leading manufacturer of industrial air compressors, pneumatic tools, and compressed air solutions. Trusted by industries worldwide. Contact us at +919157487233 or contact@sarvjagat.com",
    images: ["/og-image.jpg"],
    creator: "@sarvjagat",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Sarv Jagat_Logo_Red_11.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Sarv Jagat_Logo_Red_11.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Sarv Jagat_Logo_Red_11.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Analytics/>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  )
}
