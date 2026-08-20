"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { openWhatsApp } from "@/lib/whatsapp"
import Link from "next/link"

export function AMCForm() {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    location: "",
    compressorType: "",
    power: "",
    package: "",
    requirements: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const text = `*New AMC Inquiry*\n\n*Company:* ${formData.company}\n*Contact Person:* ${formData.contact}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Location:* ${formData.location}\n*Compressor Type:* ${formData.compressorType}\n*Power Rating:* ${formData.power}\n*Preferred Package:* ${formData.package}\n*Requirements:* ${formData.requirements}`;
      openWhatsApp(text);

      toast({
        title: "Redirecting to WhatsApp",
        description: "Please send the message in WhatsApp to complete your AMC inquiry.",
      })

      // Reset form
      setFormData({
        company: "",
        contact: "",
        email: "",
        phone: "",
        location: "",
        compressorType: "",
        power: "",
        package: "",
        requirements: ""
      })
    } catch (error) {
      console.error("AMC form error:", error)
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-2xl text-center">AMC Inquiry Form</CardTitle>
        <CardDescription className="text-center">
          Get a customized maintenance contract proposal for your compressed air systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input id="company" value={formData.company} onChange={handleChange} placeholder="Enter your company name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person *</Label>
              <Input id="contact" value={formData.contact} onChange={handleChange} placeholder="Enter contact person name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input id="location" value={formData.location} onChange={handleChange} placeholder="City, State" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compressorType">Compressor Type</Label>
              <Select onValueChange={(val) => handleSelectChange('compressorType', val)} value={formData.compressorType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compressor type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screw">Screw Compressor</SelectItem>
                  <SelectItem value="piston">Piston Compressor</SelectItem>
                  <SelectItem value="oil-free">Oil-Free Compressor</SelectItem>
                  <SelectItem value="multiple">Multiple Types</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="power">Power Rating</Label>
              <Select onValueChange={(val) => handleSelectChange('power', val)} value={formData.power}>
                <SelectTrigger>
                  <SelectValue placeholder="Select power range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10hp">1-10 HP</SelectItem>
                  <SelectItem value="10-50hp">10-50 HP</SelectItem>
                  <SelectItem value="50-100hp">50-100 HP</SelectItem>
                  <SelectItem value="100hp+">100+ HP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="package">Preferred AMC Package</Label>
              <Select onValueChange={(val) => handleSelectChange('package', val)} value={formData.package}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AMC package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic AMC</SelectItem>
                  <SelectItem value="premium">Premium AMC</SelectItem>
                  <SelectItem value="enterprise">Enterprise AMC</SelectItem>
                  <SelectItem value="custom">Custom Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Additional Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Please describe your specific maintenance requirements, current issues, or any special considerations..."
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" className="btn-primary flex-1" disabled={isSubmitting}>
              <FileText className="mr-2 h-5 w-5" />
              {isSubmitting ? "Processing..." : "Get AMC Proposal"}
            </Button>
            <Button type="button" size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
              <Link href="tel:+919157487233">
                <Phone className="mr-2 h-5 w-5" />
                Call for Consultation
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
