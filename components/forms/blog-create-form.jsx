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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      const blogData = {
        ...formData,
        tags: tagsArray,
        status: "pending", // All user submissions start as pending for moderation
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        publishedAt: new Date().toISOString(),
        author: {
          name: formData.authorName,
          email: formData.authorEmail,
          company: formData.authorCompany,
        },
      }

      const response = await apiClient.createBlogPost(blogData)

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
            <Label htmlFor="excerpt">Brief Summary *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Write a brief summary of your article (2-3 sentences)"
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
              rows={12}
              placeholder="Share your insights, experiences, and knowledge about industrial air compressors, applications, maintenance tips, or industry best practices..."
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Submission Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• All submissions are reviewed before publication</li>
              <li>• Focus on industrial air compressors, compressed air applications, or manufacturing processes</li>
              <li>• Share practical insights, case studies, or technical knowledge</li>
              <li>• Use professional language and provide accurate information</li>
              <li>• Include specific examples or data when possible</li>
            </ul>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700">
            {isSubmitting ? "Submitting..." : "Submit Article for Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
