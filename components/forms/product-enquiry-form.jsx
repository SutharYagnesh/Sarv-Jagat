"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api-client"
import Link from "next/link"

export function ProductEnquiryForm({ product, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    quantity: "",
    message: `I'm interested in the ${product.name}. Please provide more information and pricing details.`,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const enquiryData = {
        ...formData,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        enquiryType: "product-enquiry",
      }

      const response = await apiClient.submitEnquiry(enquiryData)

      if (response.success) {
        toast({
          title: "Enquiry Submitted Successfully!",
          description: "Thank you for your interest. We'll contact you soon with detailed information.",
        })
        onClose()
      } else {
        throw new Error(response.error || "Failed to submit enquiry")
      }
    } catch (error) {
      console.error("Product enquiry error:", error)
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl">Product Enquiry</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-foreground">{product.name}</p>
          <p className="text-sm text-muted-foreground">{product.price}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" value={formData.company} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity Required</Label>
            <Input
              id="quantity"
              name="quantity"
              placeholder="e.g., 1 unit, 5 pieces"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Please provide any additional details about your requirements..."
            />
          </div>

          <Link href={"https://wa.me/message/QNU3M3AGOL3NH1"} target="_blank" rel="noopener noreferrer">
                      <Button type="submit"  size="lg" className="w-full bg-blue-300">
                        Submit Application
                      </Button>
                      </Link>
        </form>
      </CardContent>
    </Card>
  )
}
