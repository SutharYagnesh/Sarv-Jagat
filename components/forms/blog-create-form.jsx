"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api-client"

export function BlogCreateForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    authorName: "",
    authorEmail: "",
    authorCompany: "",
  })
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const categories = [
    "Air Compressors",
    "Compressed Air Applications",
    "Maintenance & Service",
    "Energy Efficiency",
    "Industry Applications",
    "Technology Trends",
    "Case Studies",
    "Best Practices",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = new FormData()
      for (const key in formData) {
        if (key === "tags") {
          formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
            .forEach((tag) => data.append("tags[]", tag))
        } else {
          data.append(key, formData[key])
        }
      }
      if (image) {
        data.append("image", image)
      }

      // Add other necessary fields
      data.append("status", "published") // Set default status to published
      data.append(
        "slug",
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      )
      data.append("publishedAt", new Date().toISOString())
      data.append("readTime", Math.ceil(formData.content.split(" ").length / 200)) // Estimate read time based on 200 words per minute
      data.append(
        "author",
        JSON.stringify({
          name: formData.authorName,
          email: formData.authorEmail,
          company: formData.authorCompany,
          avatar: "/placeholder-user.jpg",
        }),
      )

      const response = await apiClient.createBlogPost(data)

      if (response.success || response.post) {
        toast({
          title: "Blog Post Submitted Successfully!",
          description: "Thank you for sharing your insights. Your post will be reviewed and published soon.",
        })

        // Reset form
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "",
          tags: "",
          authorName: "",
          authorEmail: "",
          authorCompany: "",
        })
      } else {
        throw new Error(response.error || "Failed to submit blog post")
      }
    } catch (error) {
      console.error("Blog creation error:", error)
      toast({
        title: "Error Submitting Post",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-red-600">Share Your Industrial Insights</CardTitle>
        <CardDescription>
          Help the industrial community by sharing your knowledge, experiences, and insights about air compressors,
          manufacturing processes, and industrial applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authorName">Your Name *</Label>
              <Input
                id="authorName"
                name="authorName"
                type="text"
                value={formData.authorName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorEmail">Email Address *</Label>
              <Input
                id="authorEmail"
                name="authorEmail"
                type="email"
                value={formData.authorEmail}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="authorCompany">Company/Organization</Label>
            <Input
              id="authorCompany"
              name="authorCompany"
              type="text"
              value={formData.authorCompany}
              onChange={handleChange}
              placeholder="Enter your company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Article Title *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter a compelling title for your article"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image</Label>
              <Input id="image" name="image" type="file" onChange={handleImageChange} accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Short Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A brief summary of your article (max 160 characters)"
                maxLength={160}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Article Content *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Write your full article here..."
                rows={15}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Blog Post"}
            </Button>


        </form>
      </CardContent>
    </Card>
  )
}
