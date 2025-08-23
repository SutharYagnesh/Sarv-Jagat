import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Globe, Users } from "lucide-react"

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Head Office",
      details: [
        "Shade No-24, Vinayak Industrial Estate - 2",
        "Near Asudev Industrial Estate",
        "Kathwada-Singarva Road, Kathwada-GIDC",
        "Ahmedabad-382430, Gujarat, India",
      ],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        <a key="main" href="tel:+919157487233" className="hover:text-red-600">
          +91-9157487233 (Main)
        </a>,
        <a key="sales" href="tel:+919157487233" className="hover:text-red-600">
          +91-9157487233 (Sales)
        </a>,
        <a key="support" href="tel:+919157487233" className="hover:text-red-600">
          +91-9157487233 (Support)
        </a>,
      ],
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        <a key="contact" href="mailto:contact@sarvjagat.com" className="hover:text-red-600">
          contact@sarvjagat.com
        </a>,
        <a key="connect" href="mailto:connect@sarvjagat.com" className="hover:text-red-600">
          connect@sarvjagat.com
        </a>,
        <a key="care" href="mailto:care@sarvjagat.com" className="hover:text-red-600">
          care@sarvjagat.com
        </a>,
      ],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
        "Emergency Support: 24/7",
      ],
    },
  ]

  const quickStats = [
    { icon: Users, label: "Expert Engineers", value: "25+" },
    { icon: Globe, label: "States Served", value: "15+" },
    { icon: MapPin, label: "Service Centers", value: "5+" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactDetails.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <div className="space-y-1">
                    {item.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-gray-600 text-sm">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Why Choose Sarv Jagat?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-red-600">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Need Immediate Assistance?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Our technical support team is available for emergency air compressor situations and urgent repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="tel:+919157487233"
                className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Support
              </a>
              <a
                href="mailto:contact@sarvjagat.com"
                className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
