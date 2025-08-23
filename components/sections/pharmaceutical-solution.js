import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PharmaceuticalSolution() {
  const pharmaApplications = [
    {
      title: "Tablet Manufacturing",
      description: "Clean, oil-free compressed air for tablet pressing and coating operations",
      requirements: ["Class 0 oil-free", "Low dew point", "Sterile filtration"],
      pressure: "6-8 bar",
      standards: ["FDA CFR 21", "EU GMP", "ISO 8573-1"],
    },
    {
      title: "Liquid Filling",
      description: "Precise pneumatic control for sterile liquid filling and packaging",
      requirements: ["Sterile air", "Precise control", "No contamination"],
      pressure: "2-6 bar",
      standards: ["USP <1116>", "ISO 14644", "cGMP"],
    },
    {
      title: "Powder Handling",
      description: "Pneumatic conveying and processing of pharmaceutical powders",
      requirements: ["Explosion-proof", "Static elimination", "Dust-free"],
      pressure: "1-4 bar",
      standards: ["ATEX", "NFPA 61", "IEC 60079"],
    },
    {
      title: "Packaging Systems",
      description: "Automated packaging and sealing with pneumatic actuators",
      requirements: ["Consistent pressure", "Quick response", "Reliability"],
      pressure: "4-8 bar",
      standards: ["FDA 21 CFR", "ISO 11607", "ASTM F88"],
    },
  ]

  const complianceFeatures = [
    {
      title: "FDA Compliance",
      description: "All materials and components meet FDA requirements for pharmaceutical use",
      icon: "🏛️",
    },
    {
      title: "cGMP Standards",
      description: "Current Good Manufacturing Practice compliant design and documentation",
      icon: "📋",
    },
    {
      title: "Validation Support",
      description: "Complete IQ/OQ/PQ documentation and validation assistance",
      icon: "✅",
    },
    {
      title: "Traceability",
      description: "Full material traceability and certificate of compliance",
      icon: "📊",
    },
    {
      title: "Cleanroom Compatible",
      description: "Low particle generation suitable for cleanroom environments",
      icon: "🧪",
    },
    {
      title: "Sterile Air Quality",
      description: "Multiple filtration stages ensure sterile, contaminant-free air",
      icon: "🔬",
    },
  ]

  const airQualityStandards = {
    "ISO 8573-1 Class 1": {
      particles: "≤ 0.1 mg/m³",
      water: "≤ -70°C PDP",
      oil: "≤ 0.01 mg/m³",
    },
    "USP <1116>": {
      particles: "Grade A/B",
      water: "≤ -40°C PDP",
      oil: "Oil-free",
    },
    "FDA CFR 21": {
      particles: "HEPA filtered",
      water: "Controlled",
      oil: "Food grade",
    },
  }

  const systemComponents = [
    {
      component: "Oil-Free Compressors",
      description: "100% oil-free compression with no risk of contamination",
      features: ["Class 0 certification", "Low maintenance", "High efficiency"],
    },
    {
      component: "Advanced Filtration",
      description: "Multi-stage filtration including sterile and HEPA filters",
      features: ["0.01 micron filtration", "Sterile grade", "Validation ready"],
    },
    {
      component: "Desiccant Dryers",
      description: "Ultra-low dew point air drying for moisture-sensitive processes",
      features: ["-70°C dew point", "Regenerative", "Energy efficient"],
    },
    {
      component: "Monitoring Systems",
      description: "Continuous monitoring of air quality parameters",
      features: ["Real-time data", "Alarm systems", "Data logging"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Pharmaceutical Industry Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Delivering sterile, contamination-free compressed air solutions that meet the strictest pharmaceutical
            manufacturing standards and regulatory requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Compliance Consultation</Button>
            <Button variant="outline" size="lg">
              Download Validation Guide
            </Button>
          </div>
        </div>

        {/* Applications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pharmaceutical Applications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pharmaApplications.map((app, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{app.title}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-600">Operating Pressure: </span>
                      <span className="font-semibold text-blue-600">{app.pressure}</span>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {app.requirements.map((req, idx) => (
                          <Badge key={idx} variant="secondary">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Compliance Standards:</h4>
                      <div className="flex flex-wrap gap-2">
                        {app.standards.map((standard, idx) => (
                          <Badge key={idx} variant="outline" className="text-green-700 border-green-300">
                            {standard}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance Features */}
        <div className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regulatory Compliance Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceFeatures.map((feature, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Air Quality Standards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Air Quality Standards</h2>
          <Tabs defaultValue="iso" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="iso">ISO 8573-1</TabsTrigger>
              <TabsTrigger value="usp">USP &lt;1116&gt;</TabsTrigger>
              <TabsTrigger value="fda">FDA CFR 21</TabsTrigger>
            </TabsList>

            {Object.entries(airQualityStandards).map(([standard, specs]) => (
              <TabsContent key={standard} value={standard.toLowerCase().replace(/[^a-z]/g, "")}>
                <Card>
                  <CardHeader>
                    <CardTitle>{standard} Requirements</CardTitle>
                    <CardDescription>Air quality specifications for pharmaceutical applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Particles</h4>
                        <p className="text-blue-700 font-medium">{specs.particles}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Water Content</h4>
                        <p className="text-green-700 font-medium">{specs.water}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Oil Content</h4>
                        <p className="text-purple-700 font-medium">{specs.oil}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* System Components */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">System Components</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {systemComponents.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{item.component}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ensure Pharmaceutical Compliance</h2>
          <p className="text-xl mb-6 opacity-90">
            Get expert guidance on compressed air systems that meet all regulatory requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule Validation Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Download Compliance Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
