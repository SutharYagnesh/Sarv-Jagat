import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Zap, Settings, Gauge } from "lucide-react"

export function ProductCard({ product }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "compressors":
        return <Zap className="h-4 w-4" />
      case "tools":
        return <Settings className="h-4 w-4" />
      case "dryers":
        return <Gauge className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category) => {
    switch (category) {
      case "compressors":
        return "Air Compressor"
      case "tools":
        return "Pneumatic Tool"
      case "dryers":
        return "Air Treatment"
      case "vacuum":
        return "Vacuum Pump"
      default:
        return "Industrial Equipment"
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {getCategoryIcon(product.category)}
              <span className="ml-1">{getCategoryLabel(product.category)}</span>
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="default" className="bg-primary text-primary-foreground">
              {product.price}
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {product.capacity && (
              <div>
                <span className="text-muted-foreground">Capacity:</span>
                <span className="ml-1 font-medium">{product.capacity}</span>
              </div>
            )}
            {product.technology && (
              <div>
                <span className="text-muted-foreground">Technology:</span>
                <span className="ml-1 font-medium">{product.technology}</span>
              </div>
            )}
            {product.pressure && (
              <div>
                <span className="text-muted-foreground">Pressure:</span>
                <span className="ml-1 font-medium">{product.pressure}</span>
              </div>
            )}
            {product.power && product.power !== "N/A" && (
              <div>
                <span className="text-muted-foreground">Power:</span>
                <span className="ml-1 font-medium">{product.power}</span>
              </div>
            )}
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {product.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{product.features.length - 2} more
                </Badge>
              )}
            </div>
          )}

          <Button
            asChild
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Link href={`/products/${product.slug}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
