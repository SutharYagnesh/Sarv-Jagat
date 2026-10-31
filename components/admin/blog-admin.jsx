"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogEditor } from "@/components/admin/blog-editor"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Copy,
  Search,
  ExternalLink,
  Check,
  RefreshCw,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function BlogAdmin() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [draggedIdx, setDraggedIdx] = useState(null)
  const [reordering, setReordering] = useState(false)
  const [reorderMessage, setReorderMessage] = useState("")
  const [cloningId, setCloningId] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog?includeUnpublished=true")
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Extract distinct categories
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))

  // Filter posts by search and category
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== "ALL" && post.category !== selectedCategory) {
      return false
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      const titleMatch = (post.title || "").toLowerCase().includes(q)
      const excerptMatch = (post.excerpt || "").toLowerCase().includes(q)
      const catMatch = (post.category || "").toLowerCase().includes(q)
      const tagsMatch = Array.isArray(post.tags) && post.tags.some((t) => t.toLowerCase().includes(q))
      return titleMatch || excerptMatch || catMatch || tagsMatch
    }
    return true
  })

  const getCategoryCount = (catName) => {
    return posts.filter((p) => p.category === catName).length
  }

  const handleCreatePost = () => {
    setEditingPost(null)
    setShowEditor(true)
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
    setShowEditor(true)
  }

  const handleDeletePost = async (postId, postTitle) => {
    if (!confirm(`Are you sure you want to delete "${postTitle || "this post"}"?`)) return

    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Post deleted successfully",
        })
        fetchPosts()
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    }
  }

  // Clone blog post
  const handleDuplicatePost = async (post) => {
    setCloningId(post.id)
    try {
      const res = await fetch(`/api/admin/blog/${post.id}/clone`, {
        method: "POST",
      })

      if (res.ok) {
        const cloned = await res.json()
        toast({
          title: "Post Cloned",
          description: `"${post.title}" copied as "${cloned.title}" in drafts.`,
        })
        await fetchPosts()
      } else {
        const err = await res.json().catch(() => ({}))
        toast({
          title: "Clone Failed",
          description: err.error || "Failed to clone blog post",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error while cloning post",
        variant: "destructive",
      })
    } finally {
      setCloningId(null)
    }
  }

  const handleToggleStatus = async (post) => {
    try {
      const newStatus = post.status === "published" ? "draft" : "published"
      const response = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Post ${newStatus === "published" ? "published" : "unpublished"} successfully`,
        })
        fetchPosts()
      } else {
        throw new Error("Failed to update post status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      })
    }
  }

  const handleSavePost = async (postData) => {
    try {
      const isEditing = editingPost !== null
      const url = isEditing ? `/api/blog/${editingPost.id}` : "/api/blog"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Post ${isEditing ? "updated" : "created"} successfully`,
        })
        setShowEditor(false)
        setEditingPost(null)
        fetchPosts()
      } else {
        throw new Error(`Failed to ${isEditing ? "update" : "create"} post`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingPost ? "update" : "create"} post`,
        variant: "destructive",
      })
    }
  }

  // Reordering Logic
  const saveNewOrder = async (newList) => {
    setReordering(true)
    setReorderMessage("")

    const updatedIds = newList.map((item, index) => ({ id: item.id, order: index }))

    setPosts((prev) => {
      const map = new Map(updatedIds.map((u) => [u.id, u.order]))
      const next = prev.map((p) => (map.has(p.id) ? { ...p, order: map.get(p.id) } : p))
      return next.sort((a, b) => (a.order || 0) - (b.order || 0))
    })

    try {
      const res = await fetch("/api/admin/blog/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedIds }),
      })

      if (res.ok) {
        setReorderMessage("Display order saved!")
        setTimeout(() => setReorderMessage(""), 3000)
      }
    } catch (err) {
      console.error("Failed to save blog order", err)
    } finally {
      setReordering(false)
    }
  }

  const handleDragStart = (idx) => {
    setDraggedIdx(idx)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetIdx) => {
    e.preventDefault()
    if (draggedIdx === null || draggedIdx === targetIdx) return

    const list = [...filteredPosts]
    const [draggedItem] = list.splice(draggedIdx, 1)
    list.splice(targetIdx, 0, draggedItem)

    setDraggedIdx(null)
    saveNewOrder(list)
  }

  const moveItem = (index, direction) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= filteredPosts.length) return

    const list = [...filteredPosts]
    const temp = list[index]
    list[index] = list[targetIndex]
    list[targetIndex] = temp

    saveNewOrder(list)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (showEditor) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
        <BlogEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => {
            setShowEditor(false)
            setEditingPost(null)
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" />
            Blog &amp; Supplied Items Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Organize case studies, customer installations, and news. Drag &amp; drop or use Up/Down arrows to control exact display sequence.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {reorderMessage && (
            <span className="text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-medium flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5 text-green-600" />
              {reorderMessage}
            </span>
          )}
          <Button onClick={handleCreatePost} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-1.5" />
            New Post
          </Button>
        </div>
      </div>

      {/* Category Tabs - Mobile Touch Scroll Friendly */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                selectedCategory === "ALL"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>All Posts</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === "ALL" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {posts.length}
              </span>
            </button>

            {categories.map((catName) => {
              const count = getCategoryCount(catName)
              const isSelected = selectedCategory === catName
              return (
                <button
                  key={catName}
                  onClick={() => setSelectedCategory(catName)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span>{catName}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Search Bar & Order Tip */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, category, excerpt or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span>
            Showing: <strong>{filteredPosts.length}</strong> posts
          </span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="text-slate-600">Drag handle (⋮⋮) or use (⬆ / ⬇) to reorder sequence</span>
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
          <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
          <p className="text-sm">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-16 text-center text-gray-500 bg-white border border-gray-200 rounded-xl space-y-3">
          <p className="text-base font-medium">No blog posts found.</p>
          <p className="text-xs text-gray-400">Click &quot;New Post&quot; above to create your first case study or news article.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post, idx) => (
            <Card
              key={post.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              className={`transition-all border border-gray-200 shadow-sm hover:shadow-md ${
                draggedIdx === idx ? "opacity-40 bg-gray-100" : "bg-white"
              }`}
            >
              <CardContent className="p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Section: Reorder Handle + Cover Image + Content */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Drag Handle & Up/Down Arrows */}
                    <div className="flex sm:flex-col items-center justify-center gap-1 text-gray-400 shrink-0 pt-1">
                      <span
                        className="cursor-grab active:cursor-grabbing hover:text-red-600 p-1 rounded"
                        title="Drag to reorder"
                      >
                        <GripVertical className="w-4 h-4" />
                      </span>
                      <div className="flex sm:flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => moveItem(idx, -1)}
                          disabled={idx === 0}
                          className="text-gray-400 hover:text-gray-700 disabled:opacity-20 p-1 sm:p-0.5 rounded"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(idx, 1)}
                          disabled={idx === filteredPosts.length - 1}
                          className="text-gray-400 hover:text-gray-700 disabled:opacity-20 p-1 sm:p-0.5 rounded"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Thumbnail Image */}
                    {post.imageUrl || post.coverImage ? (
                      <img
                        src={post.imageUrl || post.coverImage}
                        alt=""
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200 bg-white shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs shrink-0">
                        No img
                      </div>
                    )}

                    {/* Content Details */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                          {post.title}
                        </h3>
                        <Badge
                          variant={post.status === "published" ? "default" : "secondary"}
                          className={`text-[10px] ${
                            post.status === "published" ? "bg-green-600 text-white hover:bg-green-700" : ""
                          }`}
                        >
                          {post.status}
                        </Badge>
                        {post.category && (
                          <Badge variant="outline" className="text-[10px] bg-slate-50">
                            {post.category}
                          </Badge>
                        )}
                      </div>

                      {post.excerpt && (
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 pt-0.5">
                        {post.author?.name && <span>By {post.author.name}</span>}
                        <span>Published: {formatDate(post.publishedAt)}</span>
                        {post.readTime && <span>{post.readTime} min read</span>}
                      </div>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section: Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {/* View Live */}
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg border border-gray-200"
                      title="View Live Blog Post"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Clone Post */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicatePost(post)}
                      disabled={cloningId === post.id}
                      className="text-xs text-blue-700 border-blue-200 hover:bg-blue-50 px-2.5 py-1.5 h-auto flex items-center gap-1"
                      title="Duplicate/Clone this post"
                    >
                      {cloningId === post.id ? (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>Clone</span>
                    </Button>

                    {/* Publish / Unpublish Toggle */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(post)}
                      className="text-xs px-2.5 py-1.5 h-auto flex items-center gap-1"
                    >
                      {post.status === "published" ? (
                        <>
                          <EyeOff className="h-3.5 w-3.5 text-amber-600" />
                          <span>Unpublish</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5 text-green-600" />
                          <span>Publish</span>
                        </>
                      )}
                    </Button>

                    {/* Edit */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPost(post)}
                      className="text-xs text-indigo-700 border-indigo-200 hover:bg-indigo-50 px-2.5 py-1.5 h-auto flex items-center gap-1"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Button>

                    {/* Delete */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="text-xs text-red-600 border-red-200 hover:bg-red-50 p-2 h-auto"
                      title="Delete Post"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
