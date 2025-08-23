import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function CompressorComparison() {
  const compressorTypes = [
    {
      type: "Reciprocating",
      description: "Positive displacement compressors using pistons",
      advantages: [
        "High pressure capability",
        "Excellent for intermittent use",
        "Lower initial cost",
        "Simple maintenance",
      ],
      applications: ["Automotive service", "Small workshops", "Pneumatic tools", "Paint spraying"],
      pressureRange: "7-40 bar",
      capacityRange: "0.5-50 m³/min",
      efficiency: "85-90%",
      bestFor: "Small to medium applications",
    },
    {
      type: "Rotary Screw",
      description: "Continuous operation with twin rotating screws",
      advantages: ["Continuous duty cycle", "Quiet operation", "Compact design", "Oil-free options available"],
      applications: ["Manufacturing plants", "Food processing", "Pharmaceutical", "Electronics"],
      pressureRange: "5-13 bar",
      capacityRange: "1-500 m³/min",
      efficiency: "90-95%",
      bestFor: "Continuous industrial use",
    },
    {
      type: "Centrifugal",
      description: "Dynamic compressor using rotating impellers",
      advantages: ["Very high capacity", "Oil-free air", "Low maintenance", "Smooth operation"],
      applications: ["Large industrial plants", "Power generation", "Chemical processing", "Steel production"],
      pressureRange: "1-8 bar",
      capacityRange: "50-5000 m³/min",
      efficiency: "80-85%",
      bestFor: "High volume applications",
    },
  ]

  const comparisonMatrix = [
    { feature: "Initial Cost", reciprocating: "Low", rotaryScrew: "Medium", centrifugal: "High" },
    { feature: "Operating Cost", reciprocating: "Medium", rotaryScrew: "Low", centrifugal: "Low" },
    { feature: "Maintenance", reciprocating: "High", rotaryScrew: "Medium", centrifugal: "Low" },
    { feature: "Noise Level", reciprocating: "High", rotaryScrew: "Low", centrifugal: "Medium" },
    { feature: "Duty Cycle", reciprocating: "Intermittent", rotaryScrew: "Continuous", centrifugal: "Continuous" },
    { feature: "Pressure Range", reciprocating: "High", rotaryScrew: "Medium", centrifugal: "Low" },
  ]

  const getColorClass = (value) => {
    switch (value.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      case "continuous":
        return "bg-blue-100 text-blue-800"
      case "intermittent":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Compressor Technology Comparison</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare different compressor technologies to find the best solution for your specific application
            requirements.
          </p>
        </div>

        {/* Compressor Type Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {compressorTypes.map((compressor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">{compressor.type}</CardTitle>
                <CardDescription>{compressor.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Pressure:</span>
                    <p className="font-semibold">{compressor.pressureRange}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Capacity:</span>
                    <p className="font-semibold">{compressor.capacityRange}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Efficiency:</span>
                    <p className="font-semibold">{compressor.efficiency}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Best For:</span>
                    <p className="font-semibold text-xs">{compressor.bestFor}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Advantages:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {compressor.advantages.map((advantage, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Applications:</h4>
                  <div className="flex flex-wrap gap-1">
                    {compressor.applications.map((app, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Matrix */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Feature Comparison Matrix</CardTitle>
            <CardDescription>Side-by-side comparison of key features across compressor types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold">Reciprocating</th>
                    <th className="text-center py-3 px-4 font-semibold">Rotary Screw</th>
                    <th className="text-center py-3 px-4 font-semibold">Centrifugal</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={getColorClass(row.reciprocating)}>{row.reciprocating}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={getColorClass(row.rotaryScrew)}>{row.rotaryScrew}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={getColorClass(row.centrifugal)}>{row.centrifugal}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing the Right Compressor?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our technical experts can help you select the optimal compressor technology based on your specific
            requirements, operating conditions, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Contact Our Experts</Button>
            <Button variant="outline" size="lg">
              Download Comparison Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
