import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ReciprocatingCompressors() {
  const compressorModels = [
    {
      model: "EG-15R",
      power: "15 HP",
      pressure: "175 PSI",
      capacity: "60 CFM",
      features: ["Oil-free operation", "Low maintenance", "Energy efficient"],
    },
    {
      model: "EG-25R",
      power: "25 HP",
      pressure: "200 PSI",
      capacity: "100 CFM",
      features: ["Heavy-duty design", "Automatic controls", "Quiet operation"],
    },
    {
      model: "EG-50R",
      power: "50 HP",
      pressure: "250 PSI",
      capacity: "200 CFM",
      features: ["Industrial grade", "Remote monitoring", "High efficiency"],
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reciprocating Air Compressors</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our reciprocating compressors deliver reliable, efficient compressed air solutions for a wide range of
            industrial applications. Built with precision engineering and designed for durability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {compressorModels.map((compressor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">{compressor.model}</CardTitle>
                <CardDescription>{compressor.power} Reciprocating Compressor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Power:</span>
                    <span className="font-semibold">{compressor.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Pressure:</span>
                    <span className="font-semibold">{compressor.pressure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold">{compressor.capacity}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-gray-900">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {compressor.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">View Specifications</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Reciprocating Compressors?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Proven reliability with over 50 years of engineering excellence
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Energy-efficient design reduces operating costs
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Low maintenance requirements minimize downtime
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  Comprehensive warranty and service support
                </li>
              </ul>
            </div>
            <div className="text-center">
              <img
                src="/placeholder-kd5bp.png"
                alt="Reciprocating Air Compressor"
                className="rounded-lg shadow-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
