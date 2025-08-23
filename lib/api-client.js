// Client-side API utilities with localStorage fallback

class ApiClient {
  constructor() {
    this.baseUrl = "/api"
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Blog API methods with localStorage fallback
  async getBlogPosts(includeUnpublished = false) {
    try {
      return await this.request(`/blog?includeUnpublished=${includeUnpublished}`)
    } catch (error) {
      // Fallback to localStorage
      const posts = this.getBlogPostsFromStorage()
      return { posts: includeUnpublished ? posts : posts.filter((p) => p.status === "published") }
    }
  }

  async createBlogPost(postData) {
    try {
      return await this.request("/blog", {
        method: "POST",
        body: JSON.stringify(postData),
      })
    } catch (error) {
      if (error.message.includes("localStorage fallback")) {
        // Use localStorage fallback
        return this.saveBlogPostToStorage(postData)
      }
      throw error
    }
  }

  async updateBlogPost(id, postData) {
    try {
      return await this.request(`/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify(postData),
      })
    } catch (error) {
      if (error.message.includes("localStorage fallback")) {
        // Use localStorage fallback
        return this.updateBlogPostInStorage(id, postData)
      }
      throw error
    }
  }

  async deleteBlogPost(id) {
    try {
      return await this.request(`/blog/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      if (error.message.includes("localStorage fallback")) {
        // Use localStorage fallback
        return this.deleteBlogPostFromStorage(id)
      }
      throw error
    }
  }

  // localStorage fallback methods
  getBlogPostsFromStorage() {
    try {
      const posts = localStorage.getItem("blog_posts")
      return posts ? JSON.parse(posts) : []
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return []
    }
  }

  saveBlogPostToStorage(postData) {
    try {
      const posts = this.getBlogPostsFromStorage()
      const newPost = {
        ...postData,
        id: postData.id || postData.slug,
        publishedAt: postData.publishedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      posts.push(newPost)
      localStorage.setItem("blog_posts", JSON.stringify(posts))

      return { post: newPost }
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      throw new Error("Failed to save post to localStorage")
    }
  }

  updateBlogPostInStorage(id, postData) {
    try {
      const posts = this.getBlogPostsFromStorage()
      const index = posts.findIndex((p) => p.id === id)

      if (index === -1) {
        throw new Error("Post not found")
      }

      posts[index] = {
        ...postData,
        id,
        updatedAt: new Date().toISOString(),
      }

      localStorage.setItem("blog_posts", JSON.stringify(posts))

      return { post: posts[index] }
    } catch (error) {
      console.error("Error updating in localStorage:", error)
      throw new Error("Failed to update post in localStorage")
    }
  }

  deleteBlogPostFromStorage(id) {
    try {
      const posts = this.getBlogPostsFromStorage()
      const filteredPosts = posts.filter((p) => p.id !== id)

      localStorage.setItem("blog_posts", JSON.stringify(filteredPosts))

      return { message: "Post deleted successfully" }
    } catch (error) {
      console.error("Error deleting from localStorage:", error)
      throw new Error("Failed to delete post from localStorage")
    }
  }

  // Other API methods
  async getProducts(filters = {}) {
    const params = new URLSearchParams(filters)
    return await this.request(`/products?${params}`)
  }

  async getProduct(slug) {
    return await this.request(`/products/${slug}`)
  }

  async getDealers(filters = {}) {
    const params = new URLSearchParams(filters)
    return await this.request(`/dealers?${params}`)
  }

  async getJobs(filters = {}) {
    const params = new URLSearchParams(filters)
    return await this.request(`/jobs?${params}`)
  }

  async getJob(id) {
    return await this.request(`/jobs/${id}`)
  }

  async submitContact(formData) {
    return await this.request("/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    })
  }

  async submitEnquiry(enquiryData) {
    return await this.request("/enquiry", {
      method: "POST",
      body: JSON.stringify(enquiryData),
    })
  }

  async subscribeNewsletter(email) {
    return await this.request("/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
