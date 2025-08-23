"use client"

const recommendationsData = {
  manufacturing: [
    {
      id: "sj-rc-10hp",
      name: "SJ-RC-10HP Two Stage Compressor",
      category: "reciprocating-compressors",
      capacity: "35 CFM",
      pressure: "175 PSI",
      power: "10 HP",
      price: "₹1,15,000",
      image: "/industrial-air-compressor.png",
      features: ["Continuous duty design", "Advanced cooling system", "Precision-balanced flywheel"],
      applications: ["Production lines", "Assembly operations", "Pneumatic tools"],
      rating: 4.8,
      recommended: "Most Popular",
    },
    {
      id: "sj-sc-15hp",
      name: "SJ-SC-15HP Rotary Screw Compressor",
      category: "screw-compressors",
      capacity: "60 CFM",
      pressure: "125 PSI",
      power: "15 HP",
      price: "₹2,25,000",
      image: "/industrial-air-compressor.png",
      features: ["Energy efficient", "Low maintenance", "Quiet operation"],
      applications: ["Heavy manufacturing", "Continuous operation", "Large facilities"],
      rating: 4.9,
      recommended: "Energy Efficient",
    },
  ],
  automotive: [
    {
      id: "sj-of-20hp",
      name: "SJ-OF-20HP Oil-Free Compressor",
      category: "oil-free-compressors",
      capacity: "80 CFM",
      pressure: "150 PSI",
      power: "20 HP",
      price: "₹3,50,000",
      image: "/industrial-air-compressor.png",
      features: ["100% oil-free air", "Food grade quality", "Advanced filtration"],
      applications: ["Paint booths", "Quality control", "Precision assembly"],
      rating: 4.7,
      recommended: "Premium Quality",
    },
  ],
  pharmaceutical: [
    {
      id: "sj-of-25hp",
      name: "SJ-OF-25HP Medical Grade Compressor",
      category: "oil-free-compressors",
      capacity: "100 CFM",
      pressure: "175 PSI",
      power: "25 HP",
      price: "₹4,75,000",
      image: "/industrial-air-compressor.png",
      features: ["Medical grade certification", "Ultra-clean air", "Redundant filtration"],
      applications: ["Pharmaceutical production", "Clean rooms", "Medical devices"],
      rating: 4.9,
      recommended: "Medical Grade",
    },
  ],
}

export default function ProductRecommendations({ industry = "manufacturing" }) {
  const products = recommendationsData[industry] || recommendationsData.manufacturing

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recommended Solutions for {industry.charAt(0).toUpperCase() + industry.slice(1)}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sarv Jagat Corporation's expertly selected air compressor solutions tailored for your industry requirements
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {product.recommended && (
                <div className="bg-primary text-white px-4 py-2 text-sm font-semibold">{product.recommended}</div>
              )}

              <div className="p-6">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold ml-1">{product.capacity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Pressure:</span>
                    <span className="font-semibold ml-1">{product.pressure}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Power:</span>
                    <span className="font-semibold ml-1">{product.power}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-semibold ml-1">⭐ {product.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Applications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors">
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom solution? Our experts are here to help.</p>
          <button className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary-dark transition-colors">
            Consult Our Experts
          </button>
        </div>
      </div>
    </section>
  )
}

export { ProductRecommendations }
