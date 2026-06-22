"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Save, Eye } from "lucide-react"
import { RichTextEditor } from "@/components/admin/rich-text-editor"

export function BlogEditor({ post, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    images: [],
    instagramLink: "",
    category: "",
    tags: [],
    videos: [],
    youtubeLink: "",
    status: "draft",
    readTime: 5,
    author: {
      name: "Admin User",
      avatar: "/professional-woman-diverse.png",
      bio: "Content administrator",
    },
  })
  const [tagInput, setTagInput] = useState("")
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        tags: post.tags || [],
        images: post.images || [],
        instagramLink: post.instagramLink || "",
      })
    }
  }, [post])

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setFormData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a server or cloud storage
      // For now, we'll use a placeholder
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          coverImage: e.target?.result || "",
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length) {
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, e.target.result]
            }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Video size must be less than 5MB to save directly to the database.");
        return;
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          videos: [e.target?.result || ""],
        }))
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Helper to extract YouTube ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  }

  const handleSave = () => {
    const now = new Date().toISOString()
    const postData = {
      ...formData,
      id: post?.id || formData.slug,
      updatedAt: now,
      publishedAt: post?.publishedAt || now,
    }
    onSave(postData)
  }

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  useEffect(() => {
    const readTime = estimateReadTime(formData.content)
    setFormData((prev) => ({
      ...prev,
      readTime,
    }))
  }, [formData.content])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{post ? "Edit Post" : "Create New Post"}</h1>
          <p className="text-muted-foreground">Write and publish your blog content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setPreview(!preview)}>
            <Eye className="h-4 w-4 mr-2" />
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Post
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      {preview ? (
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              {formData.coverImage && (
                <img
                  src={formData.coverImage || "/placeholder.svg"}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">{formData.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{formData.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <span>By {formData.author.name}</span>
                  <span>{formData.readTime} min read</span>
                  <Badge variant="secondary">{formData.category}</Badge>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: formData.content }} />
              
              {/* Media Previews */}
              <div className="mt-8 space-y-6">
                {formData.youtubeLink && getYouTubeId(formData.youtubeLink) && (
                  <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden border shadow-sm">
                    <iframe 
                      src={`https://www.youtube.com/embed/${getYouTubeId(formData.youtubeLink)}`}
                      className="w-full h-full"
                      allowFullScreen
                      title="YouTube Preview"
                    />
                  </div>
                )}
                {formData.videos && formData.videos.length > 0 && formData.videos[0] && (
                  <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden border shadow-sm bg-black">
                    <video 
                      src={formData.videos[0]} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter post title..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                    placeholder="post-url-slug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(val) => handleChange("content", val)}
                    placeholder="Paste your formatted text here (from Word or Web)..."
                    rows={20}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use HTML tags for formatting. Estimated read time: {formData.readTime} minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Industry">Industry</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {formData.coverImage && (
                      <img
                        src={formData.coverImage || "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtubeLink">YouTube Link (Optional)</Label>
                  <Input
                    id="youtubeLink"
                    value={formData.youtubeLink || ""}
                    onChange={(e) => handleChange("youtubeLink", e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                  {formData.youtubeLink && getYouTubeId(formData.youtubeLink) && (
                    <div className="mt-2 aspect-video rounded overflow-hidden">
                      <iframe 
                        src={`https://www.youtube.com/embed/${getYouTubeId(formData.youtubeLink)}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagramLink">Instagram Reference Link (Optional)</Label>
                  <Input
                    id="instagramLink"
                    value={formData.instagramLink || ""}
                    onChange={(e) => handleChange("instagramLink", e.target.value)}
                    placeholder="https://www.instagram.com/p/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images (Optional)</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {formData.images && formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img src={img} className="w-full h-20 object-cover rounded border" alt="Gallery preview" />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Video Upload (Max 5MB)</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {formData.videos && formData.videos.length > 0 && formData.videos[0] && (
                      <video
                        src={formData.videos[0]}
                        className="w-full h-32 object-cover rounded bg-black"
                        controls
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
