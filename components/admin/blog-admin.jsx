"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogEditor } from "@/components/admin/blog-editor"
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function BlogAdmin() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
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
        description: "Failed to fetch posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = () => {
    setEditingPost(null)
    setShowEditor(true)
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
    setShowEditor(true)
  }

  const handleDeletePost = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return


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
      const isEditing = editingPost !== null;
      const url = isEditing ? `/api/blog/${editingPost.id}` : "/api/blog";
      const method = isEditing ? "PUT" : "POST";

      let bodyContent;
      let headers = {};

      if (postData.imageFile) {
        const formData = new FormData();
        for (const key in postData) {
          if (key === 'imageFile') {
            formData.append('image', postData[key]);
          } else if (Array.isArray(postData[key])) {
            postData[key].forEach(item => formData.append(`${key}[]`, item));
          } else {
            formData.append(key, postData[key]);
          }
        }
        bodyContent = formData;
      } else {
        headers['Content-Type'] = 'application/json';
        bodyContent = JSON.stringify(postData);
      }

      const response = await fetch(url, {
        method,
        headers,
        body: bodyContent,
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (showEditor) {
    return (
      <div className="min-h-screen bg-gray-50">
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Administration</h1>
            <p className="text-muted-foreground">Manage your blog posts and content</p>
          </div>
          <Button onClick={handleCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                        {post.category && (
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>By {post.author?.name}</span>
                        <span>Published: {formatDate(post.publishedAt)}</span>
                        <span>Updated: {formatDate(post.updatedAt)}</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleToggleStatus(post)}>
                        {post.status === "published" ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
