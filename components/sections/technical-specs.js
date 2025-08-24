import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TechnicalSpecs() {
  const specifications = {
    performance: [
      { parameter: "Working Pressure", value: "7 to 40 bar", unit: "bar" },
      { parameter: "Free Air Delivery", value: "0.5 to 500", unit: "m³/min" },
      { parameter: "Motor Power", value: "3 to 500", unit: "HP" },
      { parameter: "Efficiency", value: "Up to 95%", unit: "%" },
      { parameter: "Noise Level", value: "< 75", unit: "dB(A)" },
    ],
    construction: [
      { parameter: "Compressor Block", value: "Cast Iron", unit: "" },
      { parameter: "Cylinder Liner", value: "Centrifugally Cast", unit: "" },
      { parameter: "Piston", value: "Aluminum Alloy", unit: "" },
      { parameter: "Connecting Rod", value: "Drop Forged Steel", unit: "" },
      { parameter: "Crankshaft", value: "Forged Steel", unit: "" },
    ],
    environmental: [
      { parameter: "Operating Temperature", value: "-10 to +45", unit: "°C" },
      { parameter: "Ambient Humidity", value: "Up to 95%", unit: "RH" },
      { parameter: "Protection Class", value: "IP55", unit: "" },
      { parameter: "Vibration Level", value: "< 3.5", unit: "mm/s" },
      { parameter: "Cooling System", value: "Air/Water", unit: "" },
    ],
  }

  const certifications = [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "OHSAS 18001:2007",
    "CE Marking",
    "MSME Certification",
    "API Standards",
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Detailed technical specifications and performance parameters for our reciprocating air compressor range.
          </p>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Specifications</CardTitle>
                <CardDescription>Key performance parameters and operating ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Parameter</th>
                        <th className="text-left py-3 px-4 font-semibold">Range/Value</th>
                        <th className="text-left py-3 px-4 font-semibold">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specifications.performance.map((spec, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{spec.parameter}</td>
                          <td className="py-3 px-4 font-semibold text-blue-600">{spec.value}</td>
                          <td className="py-3 px-4 text-gray-600">{spec.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="construction">
            <Card>
              <CardHeader>
                <CardTitle>Construction Materials</CardTitle>
                <CardDescription>High-quality materials and components used in construction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Component</th>
                        <th className="text-left py-3 px-4 font-semibold">Material</th>
                        <th className="text-left py-3 px-4 font-semibold">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specifications.construction.map((spec, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{spec.parameter}</td>
                          <td className="py-3 px-4 font-semibold text-blue-600">{spec.value}</td>
                          <td className="py-3 px-4 text-gray-600">{spec.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Conditions</CardTitle>
                <CardDescription>Operating conditions and environmental specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Parameter</th>
                        <th className="text-left py-3 px-4 font-semibold">Range/Value</th>
                        <th className="text-left py-3 px-4 font-semibold">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specifications.environmental.map((spec, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900">{spec.parameter}</td>
                          <td className="py-3 px-4 font-semibold text-blue-600">{spec.value}</td>
                          <td className="py-3 px-4 text-gray-600">{spec.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Certifications & Standards</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
